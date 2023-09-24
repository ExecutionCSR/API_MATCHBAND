import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../database/prisma";
import axios from "axios";


export async function usersRoutes(fastify: FastifyInstance) {
    let userDataSchema = z.object({
        email: z.string().email(),
        senha: z.string(),
        nome: z.string(),
        dataNascimento: z.coerce.date().nullable(),
        celular: z.string().nullable(),
        sobremim: z.string().nullable(),
        redeSocialId: z.string(),
        status: z.number(),
    }),
        userSearchSchema = z.object({
            id: z.string().or(z.number())
        });
    fastify.post('/user/auth', async (request) => {
        const createuserBody = z.object({
            access_token: z.string(),
        });

        const { access_token } = createuserBody.parse(request.body)

        const userResponse = await axios('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }),
            userData = userResponse

        const userInfoShcema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url()
        }),
            userInfo = userInfoShcema.parse(userData);

        let usuario = await prisma.usuarios.findUnique({
            where: {
                redeSocialId: userInfo.id
            }
        });

        return usuario;
        /*
        if (!usuario) {
            usuario = await prisma.usuarios.create({
                data: {
                    redeSocialId: userInfo.id,
                    nome: userInfo.name,
                    email: userInfo.email,
                    //avatarUrl: userInfo.picture
                }
            })
        }
        */

        /*const token = fastify.jwt.sign({
            name: usuario.nome,
            //avatarUrl: usuario.avatarUrl
        }, {
            sub: usuario.email,
            expiresIn: "8 days"
        })

        return { token }*/
    });
    fastify.get('/users/:id', async (request) => {
        let userData = request.params,
            userInfo = userSearchSchema.parse(userData);

        const user = await prisma.usuarios.findUnique({
            where: {
                id: Number(userInfo.id)
            }
        });
        return user;
    });
    fastify.put('/users/:id', async (request) => {
        let userDataSearch = request.params,
            userData = request.body,
            userDataInfo = userDataSchema.partial().parse(userData),
            userSearchInfo = userSearchSchema.parse(userDataSearch);

        const user = prisma.usuarios.update({
            where: {
                id: Number(userSearchInfo.id)
            },
            data: userDataInfo
        });

        return user;
    });
    fastify.delete('/users/:id', async (request) => {
        let userData = request.params,
            usernfo = userSearchSchema.parse(userData);

        return await prisma.usuarios.delete({
            where: {
                id: Number(usernfo.id)
            }
        });
    });
    fastify.post('/users', async (request) => {
        let userBody = request.body,
            userData = userDataSchema.parse(userBody);

        const user = await prisma.usuarios.create({data: userData});

        return user;
    });
};
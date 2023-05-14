import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../database/prisma";

export async function usersRoutes(fastify: FastifyInstance) {
    let userDataSchema = z.object({
        email: z.string().email(),
        senha: z.string(),
        nome: z.string(),
        data_nascimento: z.coerce.date().nullable(),
        celular: z.string().nullable(),
        sobremim: z.string().nullable(),
        redeSocialId: z.string(),
    }),
        userSearchSchema = z.object({
            id: z.string().or(z.number()).nullable()
        });
    fastify.post('/users', async (request) => {
        let userData = request.body,
            userInfo = userDataSchema.parse(userData),
            user = await prisma.usuarios.findUnique({
                where: {
                    email: userInfo.email
                }
            });

        if (!user) {
            user = await prisma.usuarios.create({
                data: userInfo
            });
        };
        return user;
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
            userDataInfo = userDataSchema.parse(userData),
            userSearchInfo = userSearchSchema.parse(userDataSearch);

        const user = prisma.usuarios.update({
            where: {
                id: Number(userSearchInfo.id)
            },
            data: userDataInfo
        })
    });
    fastify.delete('/users/:id', async (request) => {
        let userData = request.params,
            usernfo = userSearchSchema.parse(userData);

        return await prisma.usuarios.delete({
            where: {
                id: Number(usernfo.id)
            }
        })
    })
}

import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../database/prisma";
import axios from "axios";


export async function postRoutes(fastify: FastifyInstance) {
    const postSearchSchema = z.object({
        id: z.string().or(z.number())
    }),
        postsSchema = z.object({
            idUsuario: z.number(),
            conteudo: z.string().max(500),
            likes: z.number().default(0),
            compartilhamento: z.number().default(0),
            ameis: z.number().default(0),
            links: z.string().max(500),
            tags: z.string().max(500),
            dataPostagem: z.coerce.date().default(new Date()),
            status: z.number().default(1)
        })
    fastify.get('/posts/:id', async (request) => {
        let postParams = request.params,
            postInfo = postSearchSchema.parse(postParams);

        const post = await prisma.postagem.findUnique({
            where: {
                id: Number(postInfo.id)
            }
        });
        return post;
    });
    fastify.post('/posts', async (request) => {
        let postBody = request.body,
            postData = postsSchema.parse(postBody);

        const post = await prisma.postagem.create({ data: postData });
        return post;
    });
    fastify.get('/posts/timeline', async (request) => {
        const timeline = await prisma.postagem.findMany({
            where: {
                status: 1
            }
        })
        return timeline;
    })
}
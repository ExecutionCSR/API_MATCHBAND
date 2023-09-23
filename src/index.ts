import Fastify from "fastify";
import { usersRoutes } from "./controllers/usuarios.controller";
import jwt from "@fastify/jwt";
import cors from '@fastify/cors';
import { postRoutes } from "./controllers/posts.controller";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CS_CODE } = process.env
async function bootstrap() {
    const fastify = Fastify({
        logger: true
    });
    await fastify.register(cors, {
        origin: true
    })
    await fastify.register(jwt, {
        secret: CS_CODE
    });

    fastify.get('/', () => {
        return "pai online";
    });
    /*fastify.all('*', () => {
        return "nao encontrada";
    });*/

    fastify.register(usersRoutes);
    fastify.register(postRoutes);
    await fastify.listen({ port: 3001 });
};

bootstrap();
import Fastify from "fastify";
import { usersRoutes } from "./controllers/usuarios.controller";
import jwt from "@fastify/jwt";
import cors from '@fastify/cors';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
async function bootstrap() {
    const fastify = Fastify({
        logger: true
    });
    await fastify.register(cors, {
        origin: true
    })
    await fastify.register(jwt,{
        secret:process.env.CS_CODE
    });

    fastify.get('/', () => {
        return "pai online";
    });
    fastify.all('*', (req) => {
        return "nao encontrada";
    });

    fastify.register(usersRoutes);
    await fastify.listen({ port: 3001 });
};

bootstrap();
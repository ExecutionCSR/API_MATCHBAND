import Fastify from "fastify";
import { usersRoutes } from "./controllers/usuarios.controller";
import jwt from "@fastify/jwt";
import cors from '@fastify/cors';
import { postRoutes } from "./controllers/posts.controller";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CS_CODE, PORT } = process.env

const fastify = Fastify({
    logger: true
});
fastify.register(cors, {
    origin: true
})
fastify.register(jwt, {
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
fastify.listen({ host: "0.0.0.0", port: PORT || 3001 }).then(() => {
    console.log('https port:')
})

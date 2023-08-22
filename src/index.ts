import Fastify from "fastify";
import { usersRoutes } from "./controllers/usuarios.controller";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
async function bootstrap() {
    const fastify = Fastify({
        logger: true
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
import Fastify from "fastify";
import { usersRoutes } from "./controllers/usuarios.controller";
import passport from "passport";
import { google } from "googleapis";
//import cors from '@fastify/cors';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
async function bootstrap() {
    const fastify = Fastify({
        logger: true
    });

    new google.auth.OAuth2
    /*await fastify.register(cors, {
         origin: true
     })*/
    passport.initialize()
    //fastify.register(passport.initialize());
    fastify.register(passport.session());
    fastify.get('/', () => {
        return "pai online";
    });
    fastify.all('*', (req) => {
        return "nao encontrada";
    });

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj: object, cb) {
        cb(null, obj);
    });

    fastify.register(usersRoutes);
    await fastify.listen({ port: 3001 });
};

bootstrap();
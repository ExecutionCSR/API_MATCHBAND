import Fastify from "fastify";
import { usersRoutes } from "./controllers/usuarios.controller";

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    });

    fastify.get('/', () => {
        return "pai online";
    });

    fastify.register(usersRoutes)
    await fastify.listen({ port: 3001,/*host:'0.0.0.0'*/ });
}


bootstrap();
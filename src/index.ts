import Fastify from "fastify";
import { usersRoutes } from "./controllers/usuarios.controller";

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    });

    fastify.get('/', () => {
        return "pai online";
    });
    fastify.all('*',(req)=>{
        return "nao encontrada";
    });

    fastify.register(usersRoutes);
    await fastify.listen({ port: 3001});
};

bootstrap();
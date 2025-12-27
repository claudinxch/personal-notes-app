import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

export default fp(async (app) => {
  app.register(jwt, {
    secret: app.config.JWT_SECRET,
    sign: {
      expiresIn: '7d'
    }
  });
});
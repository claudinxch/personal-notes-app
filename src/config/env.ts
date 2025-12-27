import fp from "fastify-plugin";
import env from "@fastify/env";

export default fp(async (app) => {
  await app.register(env, {
    dotenv: true,
    schema: {
      type: "object",
      required: ["DATABASE_URL", "JWT_SECRET"],
      properties: {
        DATABASE_URL: { type: "string" },
        JWT_SECRET: { type: "string" },
        PORT: { type: "string" },
      },
    },
  });
});

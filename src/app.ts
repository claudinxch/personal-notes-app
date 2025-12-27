import Fastify from "fastify";
import envPlugin from "./config/env";
import jwtPlugin from "./plugins/jwt";

// modules
import authRoutes from "./modules/auth/routes";
import notesRoutes from "./modules/notes/routes";
import { db } from "./config/db";


export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(envPlugin);
  await app.register(jwtPlugin);

  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(notesRoutes, { prefix: "/notes" });

  app.decorate("db", db);

  return app;
}

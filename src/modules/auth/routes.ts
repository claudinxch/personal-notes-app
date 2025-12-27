import type { FastifyInstance } from "fastify";
import { AuthService } from "./service";
import { loginSchema, registerSchema } from "./schema";

export default async function authRoutes(app: FastifyInstance) {
  const authService = new AuthService()

  app.post("/signup", async (request, reply) => {
    const body = registerSchema.parse(request.body)
    const user = await authService.registerUser(app, body)
    return reply.code(201).send(user)
  })

  app.post("/login", async (request, reply) => {
    const body = loginSchema.parse(request.body)
    const user = await authService.loginUser(app, body)
    return reply.code(200).send(user)
  })

  app.get("/health", async () => {
    return { auth: "ok" };
  });

}
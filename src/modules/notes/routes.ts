import type { FastifyInstance } from "fastify";
import { createNoteSchema } from "./schema";
import { NotesRepository } from "./repository";
import { authenticateUser } from "../../middleware/auth";

export default async function notesRoutes(app: FastifyInstance) {
  // const noteService = new NotesService();
  const noteService = new NotesRepository();

  app.post("/", { preHandler: [authenticateUser] }, async (request, reply) => {
    const body = createNoteSchema.parse(request.body)
    const note = await noteService.createNote(request.user!.userId, body)

    return reply.code(201).send(note);
  })

  app.get("/health", async () => {
    return { notes: "ok" };
  });
}
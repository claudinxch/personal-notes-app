import type { FastifyInstance } from "fastify";
import { createNoteSchema, updateNoteSchema } from "./schema";
import { authenticateUser } from "../../middleware/auth";
import { NotesService } from "./service";
import { uuidParamSchema } from "../../types/uuid";
import { request } from "node:http";

export default async function notesRoutes(app: FastifyInstance) {
  const notesService = new NotesService();

  app.post("/", { preHandler: [authenticateUser] }, async (request, reply) => {
    const body = createNoteSchema.parse(request.body)
    const note = await notesService.createNote(request.user!.userId, body)
    return reply.code(201).send(note);
  })

  app.get("/", { preHandler: [authenticateUser] }, async (request, reply) => {
    const notes = await notesService.getNotesByUser(request.user!.userId)
    return reply.code(200).send(notes)
  })

  app.get("/:noteId", { preHandler: [authenticateUser] }, async (request, reply) => {
    const { noteId } = uuidParamSchema.parse(request.params)
    const note = await notesService.getNoteById(noteId, request.user!.userId)
    return reply.code(200).send(note)
  })

  app.get("/deleted", { preHandler: [authenticateUser] }, async (request, reply) => {
    const deletedNotes = await notesService.getSoftDeletedNotes(request.user!.userId)
    return reply.code(200).send(deletedNotes)
  })

  app.put("/:noteId", { preHandler: [authenticateUser] }, async (request, reply) => {
    const { noteId } = uuidParamSchema.parse(request.params)
    const payload = updateNoteSchema.parse(request.body)
    const updatedNote = await notesService.updateNote(noteId, request.user!.userId, payload)
    return reply.code(200).send(updatedNote)
  })

  app.delete("/:noteId", { preHandler: [authenticateUser] }, async (request, reply) => {
    const { noteId } = uuidParamSchema.parse(request.params)
    const deletedNote = await notesService.deleteNote(noteId, request.user!.userId)
    return reply.code(200).send(deletedNote)
  })

  app.post("/:noteId/restore", { preHandler: [authenticateUser] }, async (request, reply) => {
    const { noteId } = uuidParamSchema.parse(request.params)
    const restoredNote = await notesService.restoreNote(noteId, request.user!.userId)
    return reply.code(200).send(restoredNote)
  })

  app.get("/health", async () => {
    return { notes: "ok" };
  });
}
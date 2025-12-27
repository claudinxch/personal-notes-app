import { z } from "zod"
import type { createNoteSchema, noteSchema, updateNoteSchema } from "./schema"

export type Note = z.infer<typeof noteSchema>

export type CreateNote = z.infer<typeof createNoteSchema>

export type UpdateNote = z.infer<typeof updateNoteSchema>

export type NoteWithTags = Note & {
    tags: string[]
}
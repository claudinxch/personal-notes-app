import { uuid, z } from "zod"

export const noteSchema = z.object({
    id: z.uuid(),
    userId: z.uuid(),
    title: z.string().min(1).max(50),
    content: z.string().min(1),
    isDeleted: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
})

export const createNoteSchema = z.object({
    title: z.string().min(1).max(50),
    content: z.string().min(1),
    tags: z.array(z.string()).optional()
})

export const updateNoteSchema = z.object({
    title: z.string().min(1).max(50).optional(),
    content: z.string().min(1).optional(),
    tags: z.array(z.string()).optional()
})
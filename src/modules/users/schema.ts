import { z } from "zod"

export const userSchema = z.object({
    id: z.uuid(),
    email: z.email(),
    password: z.string(),
    name: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deactivatedAt: z.date().nullable(),
})

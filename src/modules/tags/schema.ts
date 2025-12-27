import { z } from "zod"

export const tagSchema = z.object({
    id: z.uuid(),
    userId: z.uuid(),
    name: z.string().min(1),
    createdAt: z.date()
})
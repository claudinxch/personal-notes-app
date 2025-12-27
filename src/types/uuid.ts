import { z } from "zod";

export const uuidParamSchema = z.object({ noteId: z.uuid() })

export type UuidParam = z.infer<typeof uuidParamSchema>
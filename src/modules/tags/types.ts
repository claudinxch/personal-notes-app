import { z } from "zod"
import type { tagSchema } from "./schema"

export type Tag = z.infer<typeof tagSchema>
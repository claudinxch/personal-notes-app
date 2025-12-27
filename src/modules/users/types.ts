import { z } from "zod"
import type { userSchema } from "./schema"

export type User = z.infer<typeof userSchema>
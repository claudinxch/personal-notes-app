import { z } from "zod"
import type { loginSchema, registerSchema } from "./schema"
import type { User } from "../users/types"

export type AuthResponse = {
    user: Omit<User, 'password'>
    token: string
}

export type JWTPayload = {
    userId: string
    email: string
}

export type Register = z.infer<typeof registerSchema>
export type Login = z.infer<typeof loginSchema>
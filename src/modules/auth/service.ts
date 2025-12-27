import { UserRepository } from "../users/repository";
import { comparePassword, hashPassword } from "../../utils/password";
import { BadRequestError, ConflictError, InternalServerError, UnauthorizedError } from "../../utils/errors";
import type { AuthResponse, Login, Register } from "./types";
import type { FastifyInstance } from "fastify";

export class AuthService {
    constructor(private repo = new UserRepository()) {}

    registerUser = async (app: FastifyInstance, payload: Register): Promise<AuthResponse> => {
        const { email, name, password } = payload
        const existing = await this.repo.findUserByEmail(email)
    
        if (existing.length > 0) {
            throw new ConflictError("Email already in use");
        }

        const hashedPassword = await hashPassword(password)

        const user = await this.repo.createUser({
            email,
            name,
            password: hashedPassword
        })

        const { password: _, ...userWithoutPassword } = user

        const token = app.jwt.sign({ userId: user.id, email })

        return {
            user: userWithoutPassword,
            token: token
        }
    }

    loginUser = async (app: FastifyInstance, payload: Login): Promise<AuthResponse> => {
        const { email, password } = payload
        const [user] = await this.repo.findUserByEmail(email)
        if(!user) throw new UnauthorizedError('Invalid credentials')
        
        const { password: hashedPassword, ...userWithoutPassword } = user

        const matches = await comparePassword(password, hashedPassword)
        if(!matches) throw new UnauthorizedError('Invalid credentials')

        const token = app.jwt.sign({ userId: user.id, email })

        return {
            user: userWithoutPassword,
            token: token
        }
    }
}
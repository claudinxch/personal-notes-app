import type { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../utils/errors";

export const authenticateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const authorization = request.headers.authorization
    
    if (!authorization) throw new UnauthorizedError("No token provided")
    if (!authorization.startsWith('Bearer ')) throw new UnauthorizedError("Invalid token format")
    
    const token = authorization.split(' ')[1]

    if (!token) throw new UnauthorizedError("No token provided")

    try {
        const payload = request.server.jwt.verify(token)
        request.user = payload
    } catch (error) {
        throw new UnauthorizedError('Invalid or expired token')
    }
}
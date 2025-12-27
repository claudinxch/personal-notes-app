import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      DATABASE_URL: string;
      JWT_SECRET: string;
      PORT: string;
    };
  }
  interface FastifyRequest {
    user?: JWTPayload
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JWTPayload
    user: JWTPayload
  }
}
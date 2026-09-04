import helmet from "@fastify/helmet";
import { FastifyInstance } from "fastify";

export async function registerHelmet(app: FastifyInstance): Promise<void> {
  await app.register(helmet);
}

import { FastifyInstance } from "fastify";

export async function healthRoutes(
  app: FastifyInstance
): Promise<void> {
  app.get("/health/live", async () => {
    return {
      status: "ok"
    };
  });

  app.get("/health/ready", async () => {
    return {
      status: "ready"
    };
  });
}
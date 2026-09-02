import { FastifyInstance } from "fastify";

export async function healthRoutes(
  app: FastifyInstance
): Promise<void> {
  app.get("/health/live", async () => {
    return {
      status: "ok"
    };
  });

  app.get("/health/ready", async (_request, reply) => {
    try {
      await app.prisma.$queryRaw`SELECT 1`;

      return {
        status: "ready",
        dependencies: {
          postgres: "up"
        }
      };
    } catch (error) {
      app.log.error(
        error,
        "Readiness check failed"
      );

      return reply.status(503).send({
        status: "not_ready",
        dependencies: {
          postgres: "down"
        }
      });
    }
  });
}
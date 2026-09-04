import Fastify from "fastify";
import type { FastifyBaseLogger } from "fastify";

import { logger } from "./lib/logger.js";
import { registerErrorHandler } from "./errors/error-handler.js";
import { registerCors } from "./plugins/cors.js";
import { registerHelmet } from "./plugins/helmet.js";
import prismaPlugin from "./plugins/prisma.js";
import { healthRoutes } from "./routes/health.routes.js";

export function buildApp() {
  const app = Fastify({
    loggerInstance: logger as FastifyBaseLogger,

    genReqId: () => {
      return crypto.randomUUID();
    },
  });

  registerErrorHandler(app);

  app.register(registerCors);
  app.register(registerHelmet);

  app.register(prismaPlugin);

  app.register(healthRoutes);

  return app;
}

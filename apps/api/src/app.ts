import Fastify from "fastify";

import { logger } from "./lib/logger.js";
import { registerErrorHandler } from "./errors/error-handler.js";
import { registerCors } from "./plugins/cors.js";
import { registerHelmet } from "./plugins/helmet.js";
import { healthRoutes } from "./routes/health.routes.js";

export function buildApp() {
  const app = Fastify({
    loggerInstance: logger,

    genReqId: () => {
      return crypto.randomUUID();
    }
  });

  registerErrorHandler(app);

  app.register(registerCors);
  app.register(registerHelmet);

  app.register(healthRoutes);

  return app;
}
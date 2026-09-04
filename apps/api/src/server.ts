import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = buildApp();

const start = async (): Promise<void> => {
  try {
    await app.listen({
      host: env.HOST,
      port: env.PORT,
    });

    app.log.info(
      {
        host: env.HOST,
        port: env.PORT,
      },
      "API server started",
    );
  } catch (error) {
    app.log.fatal(error, "Failed to start server");

    process.exit(1);
  }
};

const shutdown = async (signal: string): Promise<void> => {
  app.log.info({ signal }, "Shutdown signal received");

  try {
    await app.close();

    app.log.info("Application shutdown complete");

    process.exit(0);
  } catch (error) {
    app.log.error(error, "Error during shutdown");

    process.exit(1);
  }
};

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

await start();

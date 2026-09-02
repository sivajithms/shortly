import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = buildApp();

const start = async (): Promise<void> => {
  try {
    await app.listen({
      host: env.HOST,
      port: env.PORT
    });

    app.log.info(
      {
        host: env.HOST,
        port: env.PORT
      },
      "API server started"
    );
  } catch (error) {
    app.log.fatal(error, "Failed to start server");

    process.exit(1);
  }
};

await start();
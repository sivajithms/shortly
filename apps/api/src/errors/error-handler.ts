import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { AppError } from "./app-error.js";

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler(
    (
      error: FastifyError | AppError,
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      request.log.error(
        {
          err: error,
          requestId: request.id,
        },
        "Request failed",
      );

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          error: {
            code: error.code,
            message: error.message,
            requestId: request.id,
          },
        });
      }

      if (error.validation) {
        return reply.status(400).send({
          error: {
            code: "VALIDATION_ERROR",
            message: error.message,
            requestId: request.id,
          },
        });
      }

      return reply.status(500).send({
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
          requestId: request.id,
        },
      });
    },
  );
}

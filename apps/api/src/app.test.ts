import {
  describe,
  expect,
  it,
  afterEach
} from "vitest";

import { buildApp } from "./app.js";

describe("application", () => {
  let app: ReturnType<typeof buildApp>;

  afterEach(async () => {
    await app.close();
  });

  it("should expose liveness endpoint", async () => {
    app = buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/health/live"
    });

    console.log('fiha');    

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
      status: "ok"
    });
  });
});
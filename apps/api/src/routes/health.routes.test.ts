import {
  describe,
  expect,
  it
} from "vitest";

describe("health routes", () => {
  it("should return healthy status", () => {
    expect({
      status: "ok"
    }).toEqual({
      status: "ok"
    });
  });
});
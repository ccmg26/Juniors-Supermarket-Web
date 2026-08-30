import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, resetRateLimitsForTests } from "./rate-limit";

describe("checkRateLimit", () => {
  beforeEach(resetRateLimitsForTests);

  it("allows requests through the configured limit", () => {
    expect(checkRateLimit("a", 2, 1000, 0)).toBe(true);
    expect(checkRateLimit("a", 2, 1000, 1)).toBe(true);
  });

  it("rejects requests above the limit", () => {
    checkRateLimit("a", 1, 1000, 0);
    expect(checkRateLimit("a", 1, 1000, 1)).toBe(false);
  });

  it("resets after the window and isolates clients", () => {
    checkRateLimit("a", 1, 1000, 0);
    expect(checkRateLimit("b", 1, 1000, 1)).toBe(true);
    expect(checkRateLimit("a", 1, 1000, 1000)).toBe(true);
  });
});

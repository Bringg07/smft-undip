import { describe, expect, it } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("mengizinkan request pertama", () => {
    const result = rateLimit(`test:1:${Date.now()}`, 5, 1000);
    expect(result.ok).toBe(true);
  });

  it("menolak saat melebihi limit", () => {
    const key = `test:limit:${Date.now()}`;
    for (let i = 0; i < 3; i++) {
      expect(rateLimit(key, 3, 1000).ok).toBe(true);
    }
    const blocked = rateLimit(key, 3, 1000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("mereset setelah window berakhir", async () => {
    const key = `test:reset:${Date.now()}`;
    expect(rateLimit(key, 2, 50).ok).toBe(true);
    expect(rateLimit(key, 2, 50).ok).toBe(true);
    expect(rateLimit(key, 2, 50).ok).toBe(false);

    // Tunggu window berakhir (50ms) lalu request baru harus diizinkan.
    await new Promise((r) => setTimeout(r, 80));
    expect(rateLimit(key, 2, 50).ok).toBe(true);
  });

  it("memisahkan bucket per key", () => {
    const a = `test:sep:a:${Date.now()}`;
    const b = `test:sep:b:${Date.now()}`;
    rateLimit(a, 1, 1000);
    expect(rateLimit(a, 1, 1000).ok).toBe(false);
    expect(rateLimit(b, 1, 1000).ok).toBe(true);
  });
});

/**
 * Rate limiter sederhana dalam memori (per-proses).
 * Cukup untuk deployment satu instance; untuk multi-instance
 * sebaiknya diganti dengan penyimpanan bersama (mis. Redis).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 menit

export function rateLimit(
  key: string,
  limit = 5,
  windowMs: number = WINDOW_MS
): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();

  // Pangkas entri yang sudah kedaluwarsa agar memori tidak membengkak.
  if (store.size > 500) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  const bucket = store.get(key);

  if (!bucket || now > bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }
  return { ok: true };
}

/** Ambil IP klien dari header proxy (Neon/Vercel biasanya memakai x-forwarded-for). */
export function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

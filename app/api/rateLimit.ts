// Minimal in-memory, fixed-window rate limiter shared by the public API
// routes. Serverless caveat: the map lives per warm instance, so limits are
// per-instance and reset on cold starts — good enough to blunt bursts and
// casual abuse without adding an external store. Swap for a Redis/Upstash
// limiter if traffic ever justifies it.

type Window = { start: number; count: number };
const buckets = new Map<string, Window>();
const MAX_BUCKETS = 10_000;

export function clientIp(request: Request): string {
  // Vercel / most proxies put the real client first in x-forwarded-for.
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  // Opportunistic cleanup so the map can't grow without bound.
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, w] of buckets) if (now - w.start > windowMs) buckets.delete(k);
  }
  const w = buckets.get(key);
  if (!w || now - w.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return false;
  }
  w.count += 1;
  return w.count > limit;
}

// Cross-origin browsers always send Origin on POST. Same-origin requests may
// omit it; only reject when an Origin IS present and clearly foreign.
export function foreignOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return !(
      host === "www.etiatech.com" ||
      host === "etiatech.com" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".vercel.app") // preview deployments
    );
  } catch {
    return true;
  }
}

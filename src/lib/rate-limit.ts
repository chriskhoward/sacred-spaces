// Simple in-memory rate limiter for serverless environments.
// Note: on Vercel each cold start gets its own Map, so this provides
// baseline per-instance protection. For stricter guarantees, upgrade
// to Upstash Redis (@upstash/ratelimit).

const rateMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Returns true if the request is within the rate limit, false if blocked.
 * @param key   Unique identifier (e.g. IP address or user ID)
 * @param limit Max requests allowed in the window
 * @param windowMs Window duration in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

/**
 * Simple in-memory rate limiter.
 * Limits submissions per IP hash to prevent abuse.
 *
 * NOTE: In-memory store resets on server restart.
 * For production at scale, consider Vercel KV or Upstash Redis.
 * For DM2's volume (<100 leads/month), in-memory is sufficient.
 */

const store = new Map<string, { count: number; resetAt: number }>();

const MAX_REQUESTS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  // Clean expired entries periodically
  if (store.size > 1000) {
    for (const [key, val] of store) {
      if (val.resetAt < now) store.delete(key);
    }
  }

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, retryAfterMs: 0 };
}

import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { getAdminUser, getAdminUserById, seedInitialAdminFromEnv, verifyPassword } from './users';

export { ADMIN_COOKIE_NAME, ADMIN_SESSION_TTL_SECONDS } from './constants';
import { ADMIN_SESSION_TTL_SECONDS } from './constants';

/**
 * Admin session token (HMAC-signed cookie).
 *
 * Format:  base64url(payload).base64url(signature)
 * Payload: JSON { v: 2, sub: <admin_users.id>, iat: <unix>, exp: <unix> }
 *
 * The token is symmetric and stateless on the HMAC side, but verification
 * additionally consults `admin_users.sessions_invalidated_at` so a
 * password change immediately invalidates every cookie issued before it.
 *
 * Rotating ADMIN_SESSION_SECRET also invalidates every existing session
 * (intentional — emergency cutoff).
 */

interface SessionPayload {
  v: 2;
  sub: string;
  iat: number;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'ADMIN_SESSION_SECRET must be set and at least 32 chars long',
    );
  }
  return secret;
}

/** Returns true if admin session signing is configured. */
export function isAdminAuthConfigured(): boolean {
  try {
    return Boolean(getSecret());
  } catch {
    return false;
  }
}

function base64urlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input;
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64urlDecode(input: string): Buffer {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = padded.length % 4 === 0 ? 0 : 4 - (padded.length % 4);
  return Buffer.from(padded + '='.repeat(padLen), 'base64');
}

function sign(data: string): string {
  return base64urlEncode(
    createHmac('sha256', getSecret()).update(data).digest(),
  );
}

/** Compare two strings without leaking timing differences. */
function constantTimeStringEq(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/**
 * Validate a candidate password against the persisted admin user. If
 * `admin_users` is empty AND the legacy ADMIN_BLOG_PASSWORD env var is
 * set, this seeds the initial row using the env value (one-shot
 * bootstrap). Returns the admin user id on success, null otherwise.
 */
export async function verifyAdminCredentials(
  candidate: string,
): Promise<string | null> {
  if (typeof candidate !== 'string' || candidate.length === 0) return null;

  // Bootstrap path: empty DB + env vars present → create the admin row
  // using the env password. Subsequent calls go through the DB only.
  let user = await getAdminUser();
  if (!user) {
    user = await seedInitialAdminFromEnv();
    if (!user) return null;
  }

  return verifyPassword(candidate, user.passwordHash) ? user.id : null;
}

/** Issue a new signed session token for the given admin user id. */
export function createSessionToken(userId: string): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    v: 2,
    sub: userId,
    iat: now,
    exp: now + ADMIN_SESSION_TTL_SECONDS,
  };
  const payloadEncoded = base64urlEncode(JSON.stringify(payload));
  const signature = sign(payloadEncoded);
  return `${payloadEncoded}.${signature}`;
}

/**
 * Validate a session token. Returns the payload if valid, null otherwise.
 * Now async: also checks the user's sessions_invalidated_at so a password
 * change immediately invalidates every cookie issued before it.
 *
 * Catches all errors silently so a missing ADMIN_SESSION_SECRET or a
 * transient DB hiccup never escapes as a 500 — the caller treats null as
 * "not authenticated" and redirects.
 */
export async function verifySessionToken(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadEncoded, signature] = parts;

    const expected = sign(payloadEncoded);
    if (!constantTimeStringEq(signature, expected)) return null;

    const json = base64urlDecode(payloadEncoded).toString('utf8');
    const payload = JSON.parse(json) as Partial<SessionPayload>;
    if (
      payload?.v !== 2 ||
      typeof payload.sub !== 'string' ||
      payload.sub.length === 0 ||
      typeof payload.exp !== 'number' ||
      typeof payload.iat !== 'number'
    ) {
      return null;
    }
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;

    // Cross-check that the user still exists and that the session was
    // not invalidated after this token was issued.
    const user = await getAdminUserById(payload.sub);
    if (!user) return null;
    const invalidatedAt = Math.floor(
      new Date(user.sessionsInvalidatedAt).getTime() / 1000,
    );
    if (Number.isFinite(invalidatedAt) && payload.iat <= invalidatedAt) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// In-memory rate limiter for the login endpoint and password-reset
// requests. Per-process, suitable for low admin traffic. Resets on cold
// start. 5 events per 15 minutes per IP.
// ---------------------------------------------------------------------------

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

export function checkLoginRateLimit(ipKey: string): {
  allowed: boolean;
  retryAfterMs: number;
} {
  const now = Date.now();
  const windowStart = now - ATTEMPT_WINDOW_MS;
  const recent = (attempts.get(ipKey) || []).filter((t) => t > windowStart);

  if (recent.length >= MAX_ATTEMPTS) {
    const retryAfterMs = recent[0] + ATTEMPT_WINDOW_MS - now;
    return { allowed: false, retryAfterMs: Math.max(0, retryAfterMs) };
  }
  return { allowed: true, retryAfterMs: 0 };
}

export function recordLoginAttempt(ipKey: string): void {
  const now = Date.now();
  const windowStart = now - ATTEMPT_WINDOW_MS;
  const recent = (attempts.get(ipKey) || []).filter((t) => t > windowStart);
  recent.push(now);
  attempts.set(ipKey, recent);
}

export function clearLoginAttempts(ipKey: string): void {
  attempts.delete(ipKey);
}

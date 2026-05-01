import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

export { ADMIN_COOKIE_NAME, ADMIN_SESSION_TTL_SECONDS } from './constants';
import { ADMIN_SESSION_TTL_SECONDS } from './constants';

/**
 * Admin session token (HMAC-signed cookie).
 *
 * Format:  base64url(payload).base64url(signature)
 * Payload: JSON { v: 1, sub: 'admin', iat: <unix>, exp: <unix> }
 *
 * The token is symmetric and stateless. The server validates by recomputing
 * the HMAC with ADMIN_SESSION_SECRET and checking that exp > now. Rotating
 * ADMIN_SESSION_SECRET invalidates all existing sessions (intentional).
 */

interface SessionPayload {
  v: 1;
  sub: 'admin';
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

function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_BLOG_PASSWORD;
  if (!pw || pw.length < 8) return null;
  return pw;
}

/** Returns true if admin auth is fully configured (password + secret). */
export function isAdminAuthConfigured(): boolean {
  try {
    return Boolean(getAdminPassword()) && Boolean(getSecret());
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
    // Run a constant-time op anyway to avoid even length-leak timing.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/** Validate the password against ADMIN_BLOG_PASSWORD. */
export function verifyAdminPassword(candidate: string): boolean {
  const real = getAdminPassword();
  if (!real || typeof candidate !== 'string') return false;
  return constantTimeStringEq(candidate, real);
}

/** Issue a new signed session token, valid for ADMIN_SESSION_TTL_SECONDS. */
export function createSessionToken(): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    v: 1,
    sub: 'admin',
    iat: now,
    exp: now + ADMIN_SESSION_TTL_SECONDS,
  };
  const payloadEncoded = base64urlEncode(JSON.stringify(payload));
  const signature = sign(payloadEncoded);
  return `${payloadEncoded}.${signature}`;
}

/**
 * Validate a session token. Returns the payload if valid, null otherwise.
 * Catches all errors silently — including a missing ADMIN_SESSION_SECRET
 * (which would throw inside sign()). Returning null means "not
 * authenticated" and lets callers redirect cleanly instead of throwing
 * a 500 that could leak environment state in the response body.
 */
export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
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
      payload?.v !== 1 ||
      payload.sub !== 'admin' ||
      typeof payload.exp !== 'number' ||
      typeof payload.iat !== 'number'
    ) {
      return null;
    }
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// In-memory rate limiter for the login endpoint.
// Per-process, suitable for small admin login traffic. Resets on cold start.
// 5 failed attempts per 15 minutes per IP.
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

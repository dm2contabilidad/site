import 'server-only';
import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';
import { requireAdminClient } from '@/lib/supabase-admin';

/**
 * Admin user store + password hashing + password-reset tokens.
 *
 * - Passwords are hashed with scrypt (built into node:crypto, no
 *   external deps). The hash is self-describing so the parameters can
 *   be upgraded without breaking existing rows: parse the prefix to
 *   pick the right comparison settings.
 * - Reset tokens are 32 random bytes, base64url-encoded. Only the
 *   SHA-256 hash of the token is stored in the DB. Tokens expire after
 *   RESET_TTL_MS and are single-use.
 * - All DB access uses the service-role client (bypasses RLS); the
 *   `admin_users` and `admin_password_resets` tables have no policies
 *   for anon/authenticated, so a leaked anon key cannot read them.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  passwordUpdatedAt: string;
  sessionsInvalidatedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminUserRow {
  id: string;
  email: string;
  password_hash: string;
  password_updated_at: string;
  sessions_invalidated_at: string;
  created_at: string;
  updated_at: string;
}

function mapAdminUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    passwordUpdatedAt: row.password_updated_at,
    sessionsInvalidatedAt: row.sessions_invalidated_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ---------------------------------------------------------------------------
// Password hashing — scrypt, self-describing format.
// "scrypt$N=16384,r=8,p=1$<saltB64>$<hashB64>"
// ---------------------------------------------------------------------------

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_KEYLEN = 64;
const SCRYPT_SALT_BYTES = 16;

export function hashPassword(plain: string): string {
  if (typeof plain !== 'string' || plain.length === 0) {
    throw new Error('hashPassword: empty password');
  }
  const salt = randomBytes(SCRYPT_SALT_BYTES);
  const hash = scryptSync(plain, salt, SCRYPT_KEYLEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
  return `scrypt$N=${SCRYPT_N},r=${SCRYPT_R},p=${SCRYPT_P}$${salt.toString('base64')}$${hash.toString('base64')}`;
}

export function verifyPassword(plain: string, stored: string): boolean {
  if (typeof plain !== 'string' || typeof stored !== 'string') return false;
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'scrypt') return false;

  // Parse params, falling back to defaults if a value is missing or malformed.
  const params = Object.fromEntries(
    parts[1].split(',').map((kv) => {
      const [k, v] = kv.split('=');
      return [k, Number.parseInt(v, 10)];
    }),
  );
  const N = Number.isFinite(params.N) ? params.N : SCRYPT_N;
  const r = Number.isFinite(params.r) ? params.r : SCRYPT_R;
  const p = Number.isFinite(params.p) ? params.p : SCRYPT_P;

  const salt = Buffer.from(parts[2], 'base64');
  const expected = Buffer.from(parts[3], 'base64');

  let derived: Buffer;
  try {
    derived = scryptSync(plain, salt, expected.length, { N, r, p });
  } catch {
    return false;
  }
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

// ---------------------------------------------------------------------------
// Token helpers (reset)
// ---------------------------------------------------------------------------

const RESET_TOKEN_BYTES = 32;
const RESET_TTL_MS = 30 * 60 * 1000; // 30 minutes

function base64url(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function sha256Hex(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function generateResetToken(): { plain: string; hash: string } {
  const plain = base64url(randomBytes(RESET_TOKEN_BYTES));
  const hash = sha256Hex(plain);
  return { plain, hash };
}

export function hashResetToken(plain: string): string {
  return sha256Hex(plain);
}

// ---------------------------------------------------------------------------
// DB access
// ---------------------------------------------------------------------------

/**
 * Returns the single admin user, or null when the table is empty.
 * The current product has exactly one admin (single-tenant blog), so
 * the lookup is intentionally not by email — the login form only asks
 * for a password. The email field is still required at row level for
 * the reset flow.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const client = requireAdminClient();
  const { data, error } = await client
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return mapAdminUser(data as AdminUserRow);
}

export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  const client = requireAdminClient();
  const { data, error } = await client
    .from('admin_users')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error || !data) return null;
  return mapAdminUser(data as AdminUserRow);
}

/**
 * Update password and bump sessions_invalidated_at so any cookie issued
 * before this moment is rejected by verifySessionToken.
 */
export async function updateAdminPassword(
  userId: string,
  newPlain: string,
): Promise<{ ok: boolean; error?: string }> {
  if (newPlain.length < 8) {
    return { ok: false, error: 'A nova senha deve ter ao menos 8 caracteres.' };
  }
  const client = requireAdminClient();
  const now = new Date().toISOString();
  const { error } = await client
    .from('admin_users')
    .update({
      password_hash: hashPassword(newPlain),
      password_updated_at: now,
      sessions_invalidated_at: now,
    })
    .eq('id', userId);
  if (error) return { ok: false, error: 'Falha ao atualizar a senha.' };
  return { ok: true };
}

/**
 * If admin_users is empty AND ADMIN_BLOG_PASSWORD + ADMIN_EMAIL env
 * vars are set, create the initial admin row. Used the very first
 * time the system runs against a fresh DB.
 *
 * Returns the seeded user, or null when the conditions are not met
 * (DB already has an admin, or env vars are absent).
 */
export async function seedInitialAdminFromEnv(): Promise<AdminUser | null> {
  const existing = await getAdminUser();
  if (existing) return existing;

  const password = process.env.ADMIN_BLOG_PASSWORD;
  const email = process.env.ADMIN_EMAIL;
  if (!password || password.length < 8 || !email) return null;

  const client = requireAdminClient();
  const { data, error } = await client
    .from('admin_users')
    .insert({
      email,
      password_hash: hashPassword(password),
    })
    .select('*')
    .single();
  if (error || !data) return null;
  return mapAdminUser(data as AdminUserRow);
}

// ---------------------------------------------------------------------------
// Password reset tokens
// ---------------------------------------------------------------------------

export interface CreatedReset {
  token: string;       // plaintext to put in the email link
  expiresAt: string;   // ISO
}

export async function createPasswordReset(
  userId: string,
  ipKey: string | null,
): Promise<CreatedReset | null> {
  const client = requireAdminClient();
  const { plain, hash } = generateResetToken();
  const expiresAt = new Date(Date.now() + RESET_TTL_MS).toISOString();
  const ipHash = ipKey ? sha256Hex(ipKey) : null;

  const { error } = await client.from('admin_password_resets').insert({
    user_id: userId,
    token_hash: hash,
    expires_at: expiresAt,
    ip_hash: ipHash,
  });
  if (error) return null;
  return { token: plain, expiresAt };
}

/**
 * Validate a token. Returns the user_id when the token exists, has
 * not been used, has not expired. Does NOT mark it consumed — the
 * caller must call markResetConsumed once the password update succeeds.
 */
export async function findValidReset(token: string): Promise<string | null> {
  if (typeof token !== 'string' || token.length < 16) return null;
  const client = requireAdminClient();
  const tokenHash = sha256Hex(token);
  const { data, error } = await client
    .from('admin_password_resets')
    .select('id,user_id,expires_at,used_at')
    .eq('token_hash', tokenHash)
    .maybeSingle();
  if (error || !data) return null;
  if (data.used_at) return null;
  if (new Date(data.expires_at).getTime() <= Date.now()) return null;
  return data.user_id as string;
}

export async function markResetConsumed(token: string): Promise<void> {
  const client = requireAdminClient();
  const tokenHash = sha256Hex(token);
  await client
    .from('admin_password_resets')
    .update({ used_at: new Date().toISOString() })
    .eq('token_hash', tokenHash)
    .is('used_at', null);
}

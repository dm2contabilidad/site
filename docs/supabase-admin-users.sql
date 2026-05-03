-- =============================================
-- DM2 Contabilidade — Admin Users + Password Resets
-- Run this in the Supabase SQL Editor.
-- Idempotent: safe to re-run.
--
-- Replaces the old "single password in env var" flow with a real
-- DB-backed admin user. Passwords are stored as scrypt hashes
-- (computed in Node, never plain text). Password reset uses a
-- single-use token whose plaintext is emailed to the admin and whose
-- SHA-256 hash is stored here.
--
-- Both tables are protected by RLS that denies all client access.
-- The application reads/writes them only via the SUPABASE_SERVICE_ROLE_KEY
-- (which bypasses RLS).
-- =============================================

-- 1. admin_users -----------------------------------------------------

CREATE TABLE IF NOT EXISTS admin_users (
  id                       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email                    TEXT NOT NULL UNIQUE,
  password_hash            TEXT NOT NULL,
  -- Bumped on every password change. Also bumped manually if you ever
  -- need to force-logout all sessions for a user (e.g. suspected leak).
  -- Sessions whose iat <= sessions_invalidated_at are rejected.
  password_updated_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  sessions_invalidated_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at               TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at               TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email
  ON admin_users (lower(email));

-- 2. admin_password_resets -------------------------------------------

CREATE TABLE IF NOT EXISTS admin_password_resets (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  -- SHA-256 hash of the random token sent to the admin. Plain token is
  -- never stored anywhere — leaking this table does NOT leak any usable
  -- reset link.
  token_hash   TEXT NOT NULL UNIQUE,
  created_at   TIMESTAMPTZ DEFAULT now() NOT NULL,
  expires_at   TIMESTAMPTZ NOT NULL,
  -- NULL = unused. Set to now() the moment the token is consumed; the
  -- consume helper rejects tokens with non-NULL used_at, enforcing
  -- single-use.
  used_at      TIMESTAMPTZ,
  -- Hashed IP of the client that requested the reset. Useful for audit
  -- without storing the raw IP.
  ip_hash      TEXT
);

CREATE INDEX IF NOT EXISTS idx_admin_password_resets_user_id
  ON admin_password_resets (user_id);
CREATE INDEX IF NOT EXISTS idx_admin_password_resets_expires_at
  ON admin_password_resets (expires_at);

-- 3. updated_at trigger ----------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS admin_users_updated_at ON admin_users;
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 4. RLS — deny all client access ------------------------------------
-- No SELECT / INSERT / UPDATE / DELETE policies for anon or authenticated
-- means: from a browser, these tables look empty and reject all writes.
-- The Next.js server actions read/write them with the service role key
-- (which bypasses RLS), so admin auth still works.

ALTER TABLE admin_users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_password_resets     ENABLE ROW LEVEL SECURITY;

-- Drop any policies that may exist from previous experimentation, so
-- the deny-all stance is unambiguous.
DROP POLICY IF EXISTS admin_users_no_anon       ON admin_users;
DROP POLICY IF EXISTS admin_resets_no_anon      ON admin_password_resets;

-- =============================================
-- Notes:
--
-- - First-time bootstrap: the application has a one-shot path that, if
--   admin_users is empty AND ADMIN_BLOG_PASSWORD env var is set AND
--   ADMIN_EMAIL env var is set, creates the initial admin row using
--   the env password (hashed, never stored plain). After that, password
--   changes go through the reset flow and the env var is no longer
--   consulted.
--
-- - Password storage format: "scrypt$N=16384,r=8,p=1$<base64-salt>$<base64-hash>"
--   A versioned, self-describing format so future hash upgrades are
--   straightforward (parse first segment).
--
-- - Reset tokens: 32 random bytes, base64url encoded. The plaintext
--   travels only in the email; the DB stores SHA-256(plaintext).
--   Default expiry: 30 minutes. Single-use enforced by used_at check.
-- =============================================

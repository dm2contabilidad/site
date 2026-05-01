/**
 * Edge-safe constants for the admin module.
 *
 * Kept in a separate file so the Edge middleware can import the cookie
 * name without pulling in node:crypto from auth.ts (the Edge runtime
 * does not support node:crypto).
 */

export const ADMIN_COOKIE_NAME = 'dm2_admin_session';
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

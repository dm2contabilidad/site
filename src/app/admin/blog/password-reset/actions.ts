'use server';

import { headers } from 'next/headers';
import { checkLoginRateLimit, recordLoginAttempt } from '@/lib/admin/auth';
import {
  createPasswordReset,
  findValidReset,
  getAdminUser,
  markResetConsumed,
  updateAdminPassword,
} from '@/lib/admin/users';
import { sendPasswordResetEmail } from '@/lib/email';

/**
 * Server actions for the admin password-reset flow.
 *
 * - requestPasswordResetAction: rate-limited per IP, always responds
 *   with the same generic success message so the page never reveals
 *   whether the admin user exists.
 * - resetPasswordAction: validates the token, checks single-use and
 *   expiry, persists the new password (which also bumps
 *   sessions_invalidated_at, killing every existing session).
 */

function ipKeyFromHeaders(h: Headers): string {
  return (
    h.get('x-forwarded-for')?.split(',')[0]?.trim()
    || h.get('x-real-ip')
    || 'unknown'
  );
}

function siteOrigin(h: Headers): string {
  // NEXT_PUBLIC_SITE_URL is the source of truth in prod.
  // In dev it may be unset; fall back to the request host for the link.
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (env) return env;
  const host = h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'http';
  return host ? `${proto}://${host}` : 'http://localhost:3000';
}

export async function requestPasswordResetAction(): Promise<{
  ok: boolean;
  error?: string;
}> {
  const h = await headers();
  const ipKey = ipKeyFromHeaders(h);

  const rate = checkLoginRateLimit(ipKey);
  if (!rate.allowed) {
    const minutes = Math.ceil(rate.retryAfterMs / 60_000);
    return {
      ok: false,
      error: `Muitas tentativas. Tente novamente em ${minutes} minuto${minutes > 1 ? 's' : ''}.`,
    };
  }
  // Count this attempt regardless of outcome so a script cannot enumerate.
  recordLoginAttempt(ipKey);

  const user = await getAdminUser();
  if (!user) {
    // Generic success: never tell the caller whether the admin row
    // exists. The infra is silently a no-op until the SQL is run.
    return { ok: true };
  }

  const reset = await createPasswordReset(user.id, ipKey);
  if (!reset) return { ok: true }; // generic: don't surface DB hiccups

  const origin = siteOrigin(h);
  const resetUrl = `${origin}/admin/blog/password-reset/confirm?token=${encodeURIComponent(reset.token)}`;

  // Fire-and-forget the email. We don't surface SMTP failure to the
  // caller — keeping the response generic. The transporter logs the
  // failure server-side for ops.
  await sendPasswordResetEmail({
    to: user.email,
    resetUrl,
    expiresAt: new Date(reset.expiresAt),
  });

  return { ok: true };
}

export async function resetPasswordAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string; fieldError?: string }> {
  const token = String(formData.get('token') || '');
  const password = String(formData.get('password') || '');
  const confirm = String(formData.get('confirm') || '');

  if (!token || token.length < 16) {
    return { ok: false, error: 'Link inválido ou expirado.' };
  }
  if (password.length < 8) {
    return {
      ok: false,
      fieldError: 'A nova senha deve ter ao menos 8 caracteres.',
    };
  }
  if (password.length > 256) {
    return { ok: false, fieldError: 'Senha muito longa.' };
  }
  if (password !== confirm) {
    return { ok: false, fieldError: 'A confirmação não coincide.' };
  }

  const userId = await findValidReset(token);
  if (!userId) {
    return { ok: false, error: 'Link inválido ou expirado.' };
  }

  const result = await updateAdminPassword(userId, password);
  if (!result.ok) {
    return { ok: false, error: result.error ?? 'Não foi possível atualizar a senha.' };
  }

  // Mark consumed only after the password update succeeds; if anything
  // upstream fails, the user can retry the same link until expiry.
  await markResetConsumed(token);

  return { ok: true };
}

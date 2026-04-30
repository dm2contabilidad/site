/**
 * Cloudflare Turnstile verification (server-side).
 *
 * The client-side widget generates a token that must be verified
 * by calling Cloudflare's siteverify endpoint from a Server Action.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileResult {
  success: boolean;
  'error-codes'?: string[];
}

/**
 * Verify a Turnstile token server-side.
 * Returns true if the token is valid, false otherwise.
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn('[Turnstile] TURNSTILE_SECRET_KEY not set — skipping verification in development');
    return process.env.NODE_ENV === 'development';
  }

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    });

    const result: TurnstileResult = await response.json();
    return result.success;
  } catch (error) {
    console.error('[Turnstile] Verification failed:', error);
    return false;
  }
}

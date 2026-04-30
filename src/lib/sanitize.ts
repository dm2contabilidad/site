/**
 * Input sanitization utilities.
 * Applied server-side before database insertion.
 */

/** Strip HTML tags from a string */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/** Normalize a Brazilian phone number to digits only */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/** Sanitize a text field: strip HTML, trim whitespace */
export function sanitizeText(input: string | undefined | null): string | null {
  if (!input) return null;
  const cleaned = stripHtml(input).trim();
  return cleaned || null;
}

/** Create a SHA-256 hash (for IP hashing — LGPD compliance) */
export async function hashValue(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

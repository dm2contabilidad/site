/**
 * UTM capture and persistence.
 *
 * Reads UTM parameters from the URL on first load,
 * stores them in sessionStorage, and provides a getter
 * for attaching to lead submissions.
 */

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

type UTMKey = (typeof UTM_KEYS)[number];

export type UTMData = Partial<Record<UTMKey, string>>;

const STORAGE_KEY = 'dm2_utms';
const REFERRER_KEY = 'dm2_referrer';

/** Capture UTMs from URL and referrer. Call once on page load. */
export function captureUTMs() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const hasUTMs = UTM_KEYS.some((key) => params.has(key));

  if (hasUTMs) {
    const utms: UTMData = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utms[key] = value;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
  }

  // Capture referrer only on first load
  if (!sessionStorage.getItem(REFERRER_KEY) && document.referrer) {
    sessionStorage.setItem(REFERRER_KEY, document.referrer);
  }
}

/** Get stored UTMs for lead submission */
export function getUTMs(): UTMData {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/** Get the original referrer */
export function getReferrer(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(REFERRER_KEY);
}

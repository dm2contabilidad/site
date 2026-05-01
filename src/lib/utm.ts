/**
 * Marketing attribution capture and persistence.
 *
 * Reads UTM parameters, ad-platform click IDs (gclid / fbclid), the
 * referrer and the landing page on first load, stores them in
 * sessionStorage and provides getters for attaching to lead submissions.
 *
 * The session-scoped storage means a single visit keeps its first-touch
 * attribution even as the user navigates internally; a new tab/session
 * starts fresh, which is the correct semantic for ad campaign tracking.
 */

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

const CLICK_ID_KEYS = ['gclid', 'fbclid'] as const;

type UTMKey = (typeof UTM_KEYS)[number];
type ClickIdKey = (typeof CLICK_ID_KEYS)[number];

export type UTMData = Partial<Record<UTMKey, string>>;
export type ClickIdData = Partial<Record<ClickIdKey, string>>;

const STORAGE_KEY = 'dm2_utms';
const CLICK_IDS_KEY = 'dm2_click_ids';
const REFERRER_KEY = 'dm2_referrer';
const LANDING_PAGE_KEY = 'dm2_landing_page';

/**
 * Capture UTMs, click IDs, referrer and landing page from the URL on first
 * load of the session. Subsequent calls are no-ops for already-captured
 * keys (first-touch attribution).
 */
export function captureUTMs() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

  // UTMs — overwrite if a new set is present (last-touch among campaigns
  // within the same session is acceptable; full first-touch would require
  // localStorage).
  const hasUTMs = UTM_KEYS.some((key) => params.has(key));
  if (hasUTMs) {
    const utms: UTMData = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utms[key] = value;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
  }

  // Click IDs — same semantics as UTMs.
  const hasClickIds = CLICK_ID_KEYS.some((key) => params.has(key));
  if (hasClickIds) {
    const clickIds: ClickIdData = {};
    for (const key of CLICK_ID_KEYS) {
      const value = params.get(key);
      if (value) clickIds[key] = value;
    }
    sessionStorage.setItem(CLICK_IDS_KEY, JSON.stringify(clickIds));
  }

  // Referrer — only the very first load of the session
  if (!sessionStorage.getItem(REFERRER_KEY) && document.referrer) {
    sessionStorage.setItem(REFERRER_KEY, document.referrer);
  }

  // Landing page — first URL the user hit in the session, full URL with
  // query string. Distinct from origem_pagina which is set at submit time.
  if (!sessionStorage.getItem(LANDING_PAGE_KEY)) {
    sessionStorage.setItem(LANDING_PAGE_KEY, window.location.href);
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

/** Get stored ad-platform click IDs (gclid / fbclid) */
export function getClickIds(): ClickIdData {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(CLICK_IDS_KEY);
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

/** Get the landing page (first URL hit in the session, with query string) */
export function getLandingPage(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(LANDING_PAGE_KEY);
}

/**
 * Analytics helpers for GA4 and Meta Pixel.
 * Scripts are loaded via next/script in the root layout.
 * These helpers provide typed event dispatching.
 */

// ---------------------------------------------------------------------------
// GA4
// ---------------------------------------------------------------------------

type GA4EventParams = Record<string, string | number | boolean | undefined>;

/** Send a custom event to Google Analytics 4 */
export function trackEvent(eventName: string, params?: GA4EventParams) {
  if (typeof window === 'undefined') return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.('event', eventName, params);
}

/** Pre-defined events matching the event matrix */
export const analytics = {
  formStart: (location: string) =>
    trackEvent('form_start', { form_location: location }),

  formSubmit: (location: string, service?: string) =>
    trackEvent('form_submit', { form_location: location, service }),

  ctaClick: (text: string, location: string) =>
    trackEvent('cta_click', { cta_text: text, cta_location: location }),

  whatsappClick: (location: string) =>
    trackEvent('whatsapp_click', { page_location: location }),

  phoneClick: () =>
    trackEvent('phone_click'),

  blogRead: (slug: string) =>
    trackEvent('blog_read', { article_slug: slug }),
};

// ---------------------------------------------------------------------------
// Meta Pixel
// ---------------------------------------------------------------------------

type MetaEventParams = Record<string, string | number | boolean | undefined>;

/** Send a standard or custom event to Meta Pixel */
export function trackMetaEvent(eventName: string, params?: MetaEventParams) {
  if (typeof window === 'undefined') return;
  const w = window as Window & { fbq?: (...args: unknown[]) => void };
  w.fbq?.('track', eventName, params);
}

export const metaPixel = {
  lead: () => trackMetaEvent('Lead'),
  contact: () => trackMetaEvent('Contact'),
  completeRegistration: () => trackMetaEvent('CompleteRegistration'),
};

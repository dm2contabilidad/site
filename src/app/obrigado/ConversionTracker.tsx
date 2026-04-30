'use client';

import { useEffect, useRef } from 'react';
import { trackEvent, trackMetaEvent } from '@/lib/analytics';

/**
 * Fires conversion events once when the /obrigado page loads.
 * GA4: 'conversion' event
 * Meta Pixel: 'CompleteRegistration' event
 */
export function ConversionTracker() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    trackEvent('conversion', { page: '/obrigado' });
    trackMetaEvent('CompleteRegistration');
  }, []);

  return null;
}

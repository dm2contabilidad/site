'use client';

import { useEffect, useState } from 'react';

/**
 * Renders the current year resolved on the client. Avoids the year being
 * frozen at the time of the last static build — useful in the footer
 * copyright line so the range stays accurate even if the site is not
 * redeployed for a long period.
 *
 * Initial render uses the server-side year (matches SSR markup), then
 * useEffect updates to the client's year after hydration. If they match
 * (the common case), no visible change; if they differ, the footer
 * silently updates.
 */
export function DynamicYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}

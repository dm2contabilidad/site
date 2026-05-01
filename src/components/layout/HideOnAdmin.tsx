'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Hides its children whenever the current pathname is under /admin.
 *
 * Used in the root layout to suppress the public Header and Footer on
 * admin pages without changing the route segment structure or moving
 * files into a route group.
 */
export function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}

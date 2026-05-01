import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { logoutAction } from './actions';

/**
 * Admin layout — minimal chrome, no public Header/Footer, robots noindex.
 *
 * Shows a thin top bar with a "back to public site" link and a logout
 * button when the user is authenticated. Renders bare children for the
 * login page (no top bar visible there because no session yet, but the
 * top bar is conditional on isAdminAuthenticated() returning true).
 */

export const metadata: Metadata = {
  title: 'Admin · Blog · DM2 Contabilidade',
  description: 'Painel administrativo do blog DM2 Contabilidade',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {authed && (
        <header className="border-b border-neutral-200 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 min-w-0">
              <Link
                href="/admin/blog"
                className="text-sm font-semibold text-navy-900 hover:text-navy-800 truncate"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Admin · Blog DM2
              </Link>
              <nav className="hidden sm:flex items-center gap-4 text-sm">
                <Link href="/admin/blog" className="text-neutral-700 hover:text-navy-900">
                  Posts
                </Link>
                <Link href="/admin/blog/new" className="text-neutral-700 hover:text-navy-900">
                  Novo post
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link
                href="/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-navy-900"
                aria-label="Abrir blog público em nova aba"
              >
                Ver blog ↗
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-medium border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">{children}</main>
    </div>
  );
}

import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/admin/constants';

/**
 * Edge middleware for the admin blog area.
 *
 * Cheap UX gate only — it checks cookie *presence*, not the HMAC signature
 * (the Edge runtime doesn't share node:crypto with the rest of the auth
 * helpers, and reimplementing the verifier with Web Crypto would duplicate
 * the logic). The authoritative check is `isAdminAuthenticated()` called
 * from every admin page and server action, which validates the HMAC and
 * the expiry. Defense-in-depth: redirects fail fast for unauthenticated
 * users, and any forged cookie that passes this layer is still rejected
 * at the page/action level.
 *
 * Also bounces an authenticated user away from /admin/blog/login back to
 * the dashboard.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasCookie = Boolean(request.cookies.get(ADMIN_COOKIE_NAME)?.value);

  // The login page is publicly reachable; everyone else needs the cookie.
  const isLoginPage = pathname === '/admin/blog/login';

  if (!hasCookie && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/blog/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  if (hasCookie && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/blog';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

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

  // Public admin pages: login + the password-reset request page + the
  // confirm page reached from the email link. Everything else needs a
  // cookie.
  const isPublicAuthPage =
    pathname === '/admin/blog/login'
    || pathname === '/admin/blog/password-reset'
    || pathname === '/admin/blog/password-reset/confirm';

  if (!hasCookie && !isPublicAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/blog/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  // We intentionally do NOT bounce a request with a cookie away from
  // the login page here. A cookie may be HMAC-valid but
  // semantically stale (e.g. issued under an older session schema, or
  // the user was deleted). If we bounced based on cookie presence
  // alone, and the dashboard then rejected that cookie, we'd loop
  // forever. The login page itself runs the full async check
  // (isAdminAuthenticated) and redirects to the dashboard when the
  // session is genuinely valid.

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

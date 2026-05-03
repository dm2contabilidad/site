import 'server-only';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifySessionToken } from './auth';

/**
 * Read and validate the admin session cookie. Returns true if a valid,
 * non-expired session is present.
 *
 * Server-only. Used by admin pages and server actions to gate access in
 * addition to the middleware (defense in depth — middleware can be skipped
 * by misconfigured matchers; this check cannot).
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);
  return payload !== null;
}

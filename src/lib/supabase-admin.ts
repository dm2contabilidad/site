import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Admin Supabase client — uses the SERVICE ROLE KEY and bypasses RLS.
 *
 * Server-only by import. Never bundle into a client component. Use only
 * inside server actions, route handlers, or server components that are
 * themselves protected by the admin auth middleware.
 *
 * Required env vars (server-side only):
 *   NEXT_PUBLIC_SUPABASE_URL       — same project URL as the public client
 *   SUPABASE_SERVICE_ROLE_KEY      — service role key (NEVER prefix NEXT_PUBLIC_)
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin: SupabaseClient | null =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;

export function requireAdminClient(): SupabaseClient {
  if (!supabaseAdmin) {
    throw new Error(
      'Admin Supabase client not configured. Set SUPABASE_SERVICE_ROLE_KEY in .env.local',
    );
  }
  return supabaseAdmin;
}

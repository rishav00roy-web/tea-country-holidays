import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lnrkqyxiwbkvkazyzcbe.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client authenticated with the service role key.
 * The service role key bypasses Row Level Security entirely, so this
 * function must NEVER be called from a "use client" component and must
 * NEVER have its result exposed to the browser.
 *
 * Only call this from inside a "use server" Server Action, and only
 * AFTER requireAdmin() (see lib/require-admin.ts) has already confirmed
 * the caller is a signed-in admin. requireAdmin() is what actually keeps
 * writes safe; this client is what actually performs them once that
 * check has passed — it is not a substitute for the check.
 *
 * Setup: add SUPABASE_SERVICE_ROLE_KEY as a server-only environment
 * variable in your hosting provider (e.g. Vercel Project Settings ->
 * Environment Variables). Get the value from Supabase Dashboard ->
 * Project Settings -> API -> service_role key. Do NOT prefix it with
 * NEXT_PUBLIC_ — that would ship it to the browser.
 */
export function createAdminClient() {
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Add it as a server-only env var " +
      "(get it from Supabase Dashboard > Project Settings > API > service_role) " +
      "so admin writes can be enforced server-side instead of relying on the " +
      "browser anon key."
    );
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

import { createClient } from "@/lib/supabase-server";

export class NotAdminError extends Error {
  constructor(message = "Not authorized") {
    super(message);
    this.name = "NotAdminError";
  }
}

/**
 * Re-checks admin status server-side. Call this as the FIRST line of
 * every admin Server Action (create/update/delete/publish/etc).
 *
 * Why this is necessary even though app/(admin)/layout.tsx already checks
 * is_admin: the layout check only gates whether the admin PAGE renders.
 * A Server Action is its own server-side entry point — it can be invoked
 * directly (e.g. via a forged form POST or a replayed request) without
 * ever rendering the layout that guards it. Without this check, admin
 * pages behave like any client component that trusts the browser's anon
 * key + whatever RLS policy is (or isn't) configured on the table.
 *
 * This does not replace correct RLS policies in Supabase — it's a second,
 * independent layer so a write is never gated by only one check.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new NotAdminError("You must be signed in.");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", session.user.id)
    .single();

  if (error || !profile?.is_admin) {
    throw new NotAdminError("You do not have admin access.");
  }

  return session.user;
}

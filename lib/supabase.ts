import { createBrowserClient as createSupabaseBrowserClient, createServerClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lnrkqyxiwbkvkazyzcbe.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10';

export function createBrowserClient() {
  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createBrowserClient()

export async function createClient() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method can be called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
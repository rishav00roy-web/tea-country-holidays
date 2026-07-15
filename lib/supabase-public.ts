import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lnrkqyxiwbkvkazyzcbe.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10';

/**
 * A purely public Supabase client that does NOT read cookies.
 * Use this in Server Components for public pages to avoid opting the page into dynamic rendering.
 * This allows Vercel to cache the page via Incremental Static Regeneration (ISR).
 */
export const createPublicClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    }
  });
};

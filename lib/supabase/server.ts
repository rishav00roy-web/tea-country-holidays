import { createClient as createSupabaseClient } from '../supabase'

export async function createClient() {
  return createSupabaseClient()
}

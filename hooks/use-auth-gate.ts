"use client"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { openWhatsApp } from "@/lib/whatsapp"

export function useAuthGate() {
  const router = useRouter()

  const gatedWhatsApp = async (message: string, redirectPath?: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      const redirect = redirectPath || (typeof window !== "undefined" ? window.location.pathname : "/")
      router.push(`/login?redirect=${encodeURIComponent(redirect)}&reason=quote`)
      return
    }
    openWhatsApp(message)
  }

  return { gatedWhatsApp }
}

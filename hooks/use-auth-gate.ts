"use client"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { openWhatsApp } from "@/lib/whatsapp"

export function useAuthGate() {
  const router = useRouter()

  /**
   * gatedWhatsApp — checks session first, then opens WhatsApp.
   * Uses window.location.href (not window.open) so browsers don't block it
   * as a popup even after an async Supabase call.
   */
  const gatedWhatsApp = async (message: string, redirectPath?: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      const redirect = redirectPath || (typeof window !== "undefined" ? window.location.pathname : "/")
      router.push(`/login?redirect=${encodeURIComponent(redirect)}&reason=quote`)
      return
    }
    // Use location.href so navigation is user-initiated and bypasses popup blockers
    const encoded = encodeURIComponent(message)
    window.location.href = `https://wa.me/918826048272?text=${encoded}`
  }

  return { gatedWhatsApp, openWhatsApp }
}


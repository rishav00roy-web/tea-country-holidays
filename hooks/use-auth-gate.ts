"use client"
// supabase imported dynamically to optimize bundle load size
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
    const { supabase } = await import("@/lib/supabase")
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      const redirect = redirectPath || (typeof window !== "undefined" ? window.location.pathname : "/")
      router.push(`/login?redirect=${encodeURIComponent(redirect)}&reason=quote`)
      return
    }
    // Use location.href so navigation is user-initiated and bypasses popup blockers
    let whatsapp = "918826048272";
    try {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "whatsapp")
        .single();
      if (data?.value) {
        whatsapp = data.value;
      }
    } catch (err) {
      console.warn("Failed to fetch whatsapp setting in auth gate, using default:", err);
    }

    const encoded = encodeURIComponent(message)
    window.location.href = `https://wa.me/${whatsapp}?text=${encoded}`
  }

  return { gatedWhatsApp, openWhatsApp }
}


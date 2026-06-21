"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { openWhatsApp } from "@/lib/whatsapp"

export function useAuthGate() {
  const supabase = createClientComponentClient()
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

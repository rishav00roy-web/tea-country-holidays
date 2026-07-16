export const WHATSAPP_NUMBER = "918826048272"

export async function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message)
  let whatsapp = WHATSAPP_NUMBER
  try {
    const { createBrowserClient } = await import("./supabase")
    const supabase = createBrowserClient()
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "whatsapp")
      .single()
    if (data?.value) {
      whatsapp = data.value
    }
  } catch (err) {
    console.warn("Failed to fetch whatsapp setting in openWhatsApp, using default:", err)
  }
  window.open(`https://wa.me/${whatsapp}?text=${encoded}`, "_blank")
}

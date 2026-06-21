export const WHATSAPP_NUMBER = "918826048272"

export function openWhatsApp(message: string) {
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank")
}

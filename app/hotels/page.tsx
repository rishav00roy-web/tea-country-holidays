import type { Metadata } from "next"
import HotelsContent from "./hotels-content"

export const metadata: Metadata = {
  title: "Book Hotels & Resorts | Tea Country Holidays",
  description: "Find and book premium hotels, boutique luxury stays, and heritage tea estate bungalows at exclusive rates. Curated accommodation by experts.",
  keywords: ["hotel bookings Guwahati", "luxury resorts Northeast India", "tea bungalow stay Assam", "Srinagar hotels", "Bali resorts booking"],
  alternates: {
    canonical: "/hotels",
  },
}

export default function HotelsPage() {
  return <HotelsContent />
}

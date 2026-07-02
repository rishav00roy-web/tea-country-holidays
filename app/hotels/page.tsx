import type { Metadata } from "next"
import { createClient } from "@/lib/supabase-server"
import HotelsContent, { Hotel, fallbackHotels } from "./hotels-content"

export const metadata: Metadata = {
  title: "Book Hotels & Resorts | Tea Country Holidays",
  description: "Find and book premium hotels, boutique luxury stays, and heritage tea estate bungalows at exclusive rates. Curated accommodation by experts.",
  keywords: ["hotel bookings Guwahati", "luxury resorts Northeast India", "tea bungalow stay Assam", "Srinagar hotels", "Bali resorts booking"],
  alternates: {
    canonical: "/hotels",
  },
}

export const dynamic = "force-dynamic";

interface HotelsPageProps {
  searchParams: Promise<{
    city?: string
    checkin?: string
    checkout?: string
    guests?: string
  }>
}

export default async function HotelsPage({ searchParams }: HotelsPageProps) {
  const resolvedSearchParams = await searchParams
  const cityParam = resolvedSearchParams.city || ""
  const checkinParam = resolvedSearchParams.checkin || ""
  const checkoutParam = resolvedSearchParams.checkout || ""
  const guestsParam = resolvedSearchParams.guests || "2"

  let hotels: Hotel[] = fallbackHotels;
  let fetchError = false;
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("hotels")
      .select("*")
      .eq("published", true)

    if (!error && data && data.length > 0) {
      hotels = data as unknown as Hotel[];
    } else if (error) {
      console.warn("Failed to fetch hotels from Supabase, using fallback hotels:", error.message)
      fetchError = true;
    }
  } catch (e) {
    console.error("Error connecting to Supabase or fetching hotels:", e)
    fetchError = true;
  }

  return (
    <HotelsContent
      initialHotels={hotels}
      cityParam={cityParam}
      checkinParam={checkinParam}
      checkoutParam={checkoutParam}
      guestsParam={guestsParam}
      fetchError={fetchError}
    />
  )
}

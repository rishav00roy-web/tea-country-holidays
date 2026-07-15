import type { Metadata } from "next"
import { Suspense } from "react"
import { createPublicClient } from "@/lib/supabase-public"
import { fallbackPackages } from "@/lib/packages-data"
import HolidaysContent from "./holidays-content"

export const metadata: Metadata = {
  title: "Holiday Packages & Tours | Tea Country Holidays",
  description: "Explore custom domestic and international holiday tour packages. Adventure, honeymoon, pilgrimage, and beach tours from Guwahati, Assam. Expert travel planning since 2014.",
  keywords: ["holiday packages", "Northeast India tours", "Shillong tour package", "Meghalaya travel agency", "Tawang tour", "Kaziranga package"],
  alternates: {
    canonical: "/holidays",
  },
}

export const revalidate = 3600;

export default async function HolidaysPage() {
  let packages = fallbackPackages;
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      
    if (!error && data && data.length > 0) {
      packages = data as unknown as typeof fallbackPackages;
    } else if (error) {
      console.warn("Failed to fetch packages from Supabase, using fallback packages:", error.message)
    }
  } catch (e) {
    console.error("Error connecting to Supabase or fetching packages:", e)
  }

  return (
    <Suspense fallback={<div>Loading packages...</div>}>
      <HolidaysContent initialPackages={packages} />
    </Suspense>
  )
}

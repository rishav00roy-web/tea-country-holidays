import type { Metadata } from "next"
import FlightsContent from "./flights-content"

export const metadata: Metadata = {
  title: "Book Flight Tickets | Tea Country Holidays",
  description: "Get the best domestic and international flight fares. Hassle-free flight ticket bookings managed end-to-end by our Guwahati team.",
  keywords: ["flight booking Guwahati", "cheap flights Northeast", "airline tickets Assam", "Guwahati to Delhi flight", "domestic flight offers"],
  alternates: {
    canonical: "/flights",
  },
}

export const dynamic = "force-dynamic";

interface FlightsPageProps {
  searchParams: Promise<{
    from?: string
    to?: string
    date?: string
    travellers?: string
    type?: string
  }>
}

export default async function FlightsPage({ searchParams }: FlightsPageProps) {
  const resolvedSearchParams = await searchParams
  const fromParam = resolvedSearchParams.from || ""
  const toParam = resolvedSearchParams.to || ""
  const dateParam = resolvedSearchParams.date || ""
  const travellersParam = resolvedSearchParams.travellers || "1 Traveller"
  const typeParam = resolvedSearchParams.type || "one-way"

  return (
    <FlightsContent
      fromParam={fromParam}
      toParam={toParam}
      dateParam={dateParam}
      travellersParam={travellersParam}
      typeParam={typeParam}
    />
  )
}

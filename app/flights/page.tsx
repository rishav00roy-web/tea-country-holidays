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

export default function FlightsPage() {
  return <FlightsContent />
}

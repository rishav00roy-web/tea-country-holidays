import type { Metadata } from "next"
import EventsContent from "./events-content"

export const metadata: Metadata = {
  title: "Destination Weddings & Corporate Retreats in Assam | Tea Country Holidays",
  description: "Plan destination weddings, corporate retreats, private parties & bespoke group tours with Tea Country Holidays, Assam's premier event travel specialist led by Manami.",
  keywords: ["event planning Guwahati", "destination wedding Assam", "corporate retreats Northeast India", "private parties booking", "custom trip organiser"],
  alternates: {
    canonical: "/events",
  },
}

export default function EventsPage() {
  return <EventsContent />
}

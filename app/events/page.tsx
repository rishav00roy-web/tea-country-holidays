import type { Metadata } from "next"
import EventsContent from "./events-content"

export const metadata: Metadata = {
  title: "Custom Events & Destination Celebrations | Tea Country Holidays",
  description: "Plan bespoke weddings, corporate retreats, and private celebrations in premium locations like heritage tea bungalows and luxury resorts.",
  keywords: ["event planning Guwahati", "destination wedding Assam", "corporate retreats Northeast India", "private parties booking", "custom trip organiser"],
}

export default function EventsPage() {
  return <EventsContent />
}

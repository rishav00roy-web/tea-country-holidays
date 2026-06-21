import type { Metadata } from "next"
import RailwaysContent from "./railways-content"

export const metadata: Metadata = {
  title: "IRCTC Train Ticket Bookings | Tea Country Holidays",
  description: "Book train tickets easily. We handle IRCTC availability check, tatkal bookings, and confirmation for your trips from Guwahati and rest of India.",
  keywords: ["train ticket booking Guwahati", "IRCTC booking agent Assam", "railway ticket reservation", "tatkal train tickets online", "Guwahati to Delhi train booking"],
}

export default function RailwaysPage() {
  return <RailwaysContent />
}

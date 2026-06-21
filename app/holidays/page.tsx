import type { Metadata } from "next"
import HolidaysContent from "./holidays-content"

export const metadata: Metadata = {
  title: "Holiday Packages & Tours | Tea Country Holidays",
  description: "Explore custom domestic and international holiday tour packages. Adventure, honeymoon, pilgrimage, and beach tours from Guwahati, Assam. Expert travel planning since 2014.",
  keywords: ["holiday packages", "Northeast India tours", "Shillong tour package", "Meghalaya travel agency", "Tawang tour", "Kaziranga package"],
}

export default function HolidaysPage() {
  return <HolidaysContent />
}

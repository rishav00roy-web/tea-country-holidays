import type { Metadata } from "next"
import HolidaysContent from "./holidays-content"

export const metadata: Metadata = {
  title: "Holiday Packages & Tours | Tea Country Holidays",
  description: "Explore custom domestic and international holiday tour packages. Adventure, honeymoon, pilgrimage, and beach tours from Guwahati, Assam. Expert travel planning since 2014.",
  keywords: ["holiday packages", "Northeast India tours", "Shillong tour package", "Meghalaya travel agency", "Tawang tour", "Kaziranga package"],
}

export interface HolidaysPageProps {
  searchParams: Promise<{ destination?: string }>
}

export default async function HolidaysPage({ searchParams }: HolidaysPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialDestination = resolvedSearchParams.destination || "";

  return <HolidaysContent initialDestination={initialDestination} />
}

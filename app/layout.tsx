import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import StickyCTA from "@/components/sticky-cta";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TeaCountryHolidays | Go anywhere to refresh life",
  description: "Northeast India's #1 Travel Partner. Holidays, Hotels, Flights, Transfers, Cruises & Visa from Guwahati, Assam. Expert travel planning since 2014.",
  keywords: ["travel agency Guwahati", "Northeast India tours", "Meghalaya packages", "Bhutan tours", "Sikkim packages"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans text-brand-ink antialiased bg-brand-floral min-h-screen flex flex-col overflow-x-hidden max-w-full">
        {children}
        <StickyCTA />
      </body>
    </html>
  );
}

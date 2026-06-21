import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TeaCountryHolidays | Go anywhere to refresh life",
  description: "Northeast India's #1 Travel Partner. Holidays, Hotels, Flights, Transfers, Cruises & Visa from Guwahati, Assam. Expert travel planning since 2014.",
  keywords: ["travel agency Guwahati", "Northeast India tours", "Meghalaya packages", "Bhutan tours", "Sikkim packages"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="font-sans text-brand-ink antialiased bg-brand-floral min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

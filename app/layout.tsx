import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import StickyCTA from "@/components/sticky-cta";
import { WhatsAppButton } from "@/components/whatsapp-button";
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
  metadataBase: new URL("https://teacountryholidays.com"),
  title: "Tea Country Holidays — Northeast India Tours",
  description: "Northeast India's #1 Travel Partner. Crafted boutique holidays, hotels, flights, and customized tours across Assam, Meghalaya, Arunachal, and Bhutan since 2014.",
  keywords: ["travel agency Guwahati", "Northeast India tours", "Meghalaya packages", "Bhutan tours", "Sikkim packages"],
  openGraph: {
    title: "Tea Country Holidays — Northeast India Tours",
    description: "Northeast India's #1 Travel Partner. Crafted boutique holidays, hotels, flights, and customized tours across Assam, Meghalaya, Arunachal, and Bhutan since 2014.",
    url: "https://teacountryholidays.com",
    siteName: "Tea Country Holidays",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tea Country Holidays - Northeast India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans text-brand-ink antialiased bg-brand-floral min-h-screen flex flex-col overflow-x-hidden max-w-full">
        {children}
        <StickyCTA />
        <WhatsAppButton />
      </body>
    </html>
  );
}

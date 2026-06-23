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

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://teacountryholidays.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
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
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://lnrkqyxiwbkvkazyzcbe.supabase.co" crossOrigin="anonymous" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tea Country Holidays — Northeast India Tours" />
        <meta name="twitter:description" content="Northeast India's #1 Travel Partner. Crafted boutique holidays since 2014." />
      </head>
      <body className="font-sans text-brand-ink antialiased bg-brand-floral min-h-screen flex flex-col overflow-x-hidden max-w-full">
        {children}
        <StickyCTA />
        <WhatsAppButton />
      </body>
    </html>
  );
}

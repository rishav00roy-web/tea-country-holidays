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

// Hardcoded production URL — never changes between deploys
const siteUrl = "https://tea-country-holidays.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: "Tea Country Holidays — Northeast India Tours",
  description:
    "Northeast India's #1 Travel Partner. Crafted boutique holidays, hotels, flights, and customized tours across Assam, Meghalaya, Arunachal, and Bhutan since 2014.",
  keywords: [
    "travel agency Guwahati",
    "Northeast India tours",
    "Meghalaya packages",
    "Bhutan tours",
    "Sikkim packages",
  ],
  openGraph: {
    title: "Tea Country Holidays — Northeast India Tours",
    description:
      "Northeast India's #1 Travel Partner. Crafted boutique holidays, hotels, flights, and customized tours across Assam, Meghalaya, Arunachal, and Bhutan since 2014.",
    url: siteUrl,
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
  twitter: {
    card: "summary_large_image",
    title: "Tea Country Holidays — Northeast India Tours",
    description:
      "Northeast India's #1 Travel Partner. Crafted boutique holidays since 2014.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <meta charSet="utf-8" />
        {/* Unsplash images — preconnect cuts DNS+TLS time */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Wikipedia images */}
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        {/* Supabase — preconnect for faster data fetch */}
        <link
          rel="preconnect"
          href="https://lnrkqyxiwbkvkazyzcbe.supabase.co"
          crossOrigin="anonymous"
        />
        {/* NOTE: fonts.googleapis.com preconnect removed — 
            next/font/google self-hosts fonts, Google servers 
            are never contacted at runtime */}
      </head>
      <body className="font-sans text-brand-ink antialiased bg-brand-floral min-h-screen flex flex-col overflow-x-hidden max-w-full">
        {children}
        <StickyCTA />
        <WhatsAppButton />
      </body>
    </html>
  );
}

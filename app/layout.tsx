import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import StickyCTA from "@/components/sticky-cta";
import { WhatsAppButton } from "@/components/whatsapp-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollRevealInit from "@/components/scroll-reveal-init";
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
  title: "Tea Country Holidays | Best Travel Agency in Assam | Tour Packages Northeast India",
  description:
    "Tea Country Holidays — Assam's trusted IATA-accredited travel agency offering curated tour packages across Northeast India, Rajasthan, Kerala, Ladakh, Goa, Kashmir & international destinations. Founded by Manami in Guwahati.",
  keywords: [
    "travel agency Guwahati",
    "Northeast India tours",
    "Meghalaya packages",
    "Bhutan tours",
    "Sikkim packages",
  ],
  openGraph: {
    title: "Tea Country Holidays | Best Travel Agency in Assam | Tour Packages Northeast India",
    description:
      "Tea Country Holidays — Assam's trusted IATA-accredited travel agency offering curated tour packages across Northeast India, Rajasthan, Kerala, Ladakh, Goa, Kashmir & international destinations. Founded by Manami in Guwahati.",
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
    title: "Tea Country Holidays | Best Travel Agency in Assam | Tour Packages Northeast India",
    description:
      "Tea Country Holidays — Assam's trusted IATA-accredited travel agency offering curated tour packages across Northeast India, Rajasthan, Kerala, Ladakh, Goa, Kashmir & international destinations. Founded by Manami in Guwahati.",
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
        {/* Preload custom brand fonts to prevent FOIT/FOUT */}
        <link rel="preload" href="/fonts/KentishVol1.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/KentishVol2.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        {/* Unsplash images — preconnect cuts DNS+TLS time */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Wikipedia images */}
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        {/* Supabase preconnect removed — data fetching is server-side only;
            a client preconnect gives no benefit and triggers Lighthouse warning */}
        {/* NOTE: fonts.googleapis.com preconnect removed —
            next/font/google self-hosts fonts, Google servers
            are never contacted at runtime */}
      </head>
      <body className="font-sans text-brand-ink antialiased bg-brand-floral min-h-screen flex flex-col overflow-x-hidden max-w-full">
        <Navbar />
        {children}
        <Footer />
        <StickyCTA />
        <WhatsAppButton />
        <ScrollRevealInit />
      </body>
    </html>
  );
}

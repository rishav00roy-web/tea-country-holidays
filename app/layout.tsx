import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import FloatingActionBar from "@/components/FloatingActionBar";
import ChatWidget from "@/components/ChatWidget";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterVisibility from "@/components/footer-visibility";
import ScrollRevealInit from "@/components/scroll-reveal-init";
import CookieBanner from "@/components/cookie-banner";
import { getSiteSettings } from "@/lib/site-settings";
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

const kentish = localFont({
  src: [
    {
      path: "../public/Fonts/KentishVol1.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/KentishVol2.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kentish",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${kentish.variable} scroll-smooth`}
    >
      <head>
        <meta charSet="utf-8" />
        {/* Wikipedia images */}
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        {/* Supabase preconnect removed — data fetching is server-side only;
            a client preconnect gives no benefit and triggers Lighthouse warning */}
        {/* NOTE: fonts.googleapis.com preconnect removed —
            next/font/google self-hosts fonts, Google servers
            are never contacted at runtime */}
      </head>
      <body className="font-sans text-brand-ink antialiased bg-brand-floral min-h-screen flex flex-col max-w-full">
        <div className="flex flex-col flex-1 overflow-x-hidden">
        <Navbar whatsapp={settings.whatsapp} phone={settings.phone} />
        {children}
        <FooterVisibility>
          <Footer phone={settings.phone} address={settings.address} />
        </FooterVisibility>
        <FloatingActionBar whatsapp={settings.whatsapp} phone={settings.phone} />
        <ChatWidget />
        <ScrollRevealInit />
        <CookieBanner />
        </div>
      </body>
    </html>
  );
}

import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "lnrkqyxiwbkvkazyzcbe.supabase.co" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
    // Prefer AVIF (smallest), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 30 days
    minimumCacheTTL: 2592000,
    // Breakpoints that Next.js uses to choose srcset widths.
    // Keep this tight — only widths we actually use.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Suppress the lockfile warning
  turbopack: {
    root: __dirname,
  },
  deploymentId: process.env.VERCEL_DEPLOYMENT_ID,
  experimental: {
    // Tree-shake named imports from these packages automatically.
    // No code changes needed in components — Next.js rewrites the imports
    // at build time so only the icons/components actually used are bundled.
    optimizePackageImports: [
      "lucide-react",
      "react-fast-marquee",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://*.vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://images.unsplash.com https://plus.unsplash.com https://lnrkqyxiwbkvkazyzcbe.supabase.co https://*.googleusercontent.com https://ui-avatars.com https://upload.wikimedia.org; connect-src 'self' https://lnrkqyxiwbkvkazyzcbe.supabase.co wss://lnrkqyxiwbkvkazyzcbe.supabase.co https://vercel.live https://*.vercel.live; font-src 'self' data:; frame-src 'self'; media-src 'self';"
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ];
  }
};

export default withBundleAnalyzer(nextConfig);

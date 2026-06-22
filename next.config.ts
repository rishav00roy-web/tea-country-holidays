import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lnrkqyxiwbkvkazyzcbe.supabase.co" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
    // Prefer AVIF (smallest), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 7 days (reduces repeated origin requests)
    minimumCacheTTL: 604800,
    // Breakpoints that Next.js uses to choose srcset widths.
    // Keep this tight — only widths we actually use.
    deviceSizes: [390, 640, 750, 1080, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
  // Suppress the lockfile warning
  turbopack: {
    root: __dirname,
  },
  deploymentId: process.env.VERCEL_DEPLOYMENT_ID,
};

export default nextConfig;

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
};

export default withBundleAnalyzer(nextConfig);

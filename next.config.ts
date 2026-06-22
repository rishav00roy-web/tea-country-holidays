import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lnrkqyxiwbkvkazyzcbe.supabase.co" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 1080, 1920],
  },
  // Suppress the lockfile warning
  turbopack: {
    root: __dirname,
  },
  deploymentId: process.env.VERCEL_DEPLOYMENT_ID,
};

export default nextConfig;

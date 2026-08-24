import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'nutristar.in' },
      { protocol: 'https', hostname: 'videos.pexels.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
};

export default nextConfig;

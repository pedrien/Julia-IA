import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Increase Server Actions payload limit to avoid 413 errors (default is 1MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // crossOrigin: "anonymous",
};

export default nextConfig;

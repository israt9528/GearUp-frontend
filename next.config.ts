import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Note: If your backend sends image URLs from Cloudinary or S3,
      // you will need to add those hostnames here later!
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Calidades permitidas para next/image (Next 16 las exige explícitas).
    qualities: [75, 90],
  },
};

export default nextConfig;

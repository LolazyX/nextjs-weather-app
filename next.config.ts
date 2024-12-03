import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    customKey: 'my-value',
  },
};

export default nextConfig;

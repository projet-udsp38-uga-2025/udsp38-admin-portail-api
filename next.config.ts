import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: isDevelopment ? 'http' : 'https',
        hostname: process.env.NEXT_PUBLIC_APP_URL ?? 'localhost',
        port: isDevelopment ? (process.env.PORT ?? '3000') : '',
        pathname: '/api/images/**',
      },
    ],
  },
};

export default nextConfig;
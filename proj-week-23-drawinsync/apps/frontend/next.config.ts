import type { NextConfig } from "next";
import { checkEnvVars } from "./lib/checkEnv"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    HTTP_SERVER_URL: process.env.HTTP_SERVER_URL,
    WS_SERVER_URL: process.env.WS_SERVER_URL
  }
};

export default nextConfig;

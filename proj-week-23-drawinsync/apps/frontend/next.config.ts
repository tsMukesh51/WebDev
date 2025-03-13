import type { NextConfig } from "next";
import { checkEnvVars } from "./lib/checkEnv"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

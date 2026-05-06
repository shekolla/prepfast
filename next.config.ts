import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // generates static files in ./out
  trailingSlash: true, // ensures /topics/python/ works on any static host
};

export default nextConfig;

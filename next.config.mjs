/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Change to false for production
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig

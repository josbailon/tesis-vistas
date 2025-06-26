/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
  },
  experimental: {
    // Remove appDir as it's no longer needed in Next.js 14
  },
}

export default nextConfig

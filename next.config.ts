import type { NextConfig } from 'next'

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true // Ignore ESLint errors during build
  }
}
initOpenNextCloudflareForDev()

export default nextConfig

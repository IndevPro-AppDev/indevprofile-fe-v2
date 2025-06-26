import type { NextConfig } from 'next'

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true // Ignore ESLint errors during build
  }
}
initOpenNextCloudflareForDev()

export default nextConfig

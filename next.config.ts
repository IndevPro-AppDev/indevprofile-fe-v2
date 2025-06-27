import createNextIntlPlugin from 'next-intl/plugin'

import type { NextConfig } from 'next'

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const withNextIntl = createNextIntlPlugin()

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

export default withNextIntl(nextConfig)

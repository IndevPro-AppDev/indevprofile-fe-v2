import type { NextConfig } from 'next'

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true // Ignore ESLint errors during build
  }
}

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
})

initOpenNextCloudflareForDev()

export default withNextIntl(nextConfig)

import type { NextConfig } from 'next'

const isCI = process.env.CI === 'true'

const nextConfig: NextConfig = {
  ...(isCI && {
    output: 'export',
    basePath: '/carlwin-martirez',
    assetPrefix: '/carlwin-martirez',
  }),
  images: {
    domains: [],
    unoptimized: true,
  },
}

export default nextConfig

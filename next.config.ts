import type { NextConfig } from 'next'

const isCI = process.env.CI === 'true'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  ...(isCI && { output: 'export' }),
  basePath,
  assetPrefix: basePath,
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
}

export default nextConfig

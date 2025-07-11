import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
    }
    return config
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'apriniageosat.co.id', 'placeholder.svg'],
  },
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['pg', 'ioredis'],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    NEXT_PUBLIC_MEILISEARCH_HOST: process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
    NEXT_PUBLIC_MEILISEARCH_API_KEY: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
  },
}

export default nextConfig

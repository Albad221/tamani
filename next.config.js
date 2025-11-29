/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'ui-avatars.com'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost:5000', 'flagcdn.com', 'upload.wikimedia.org'],
  },
}

module.exports = nextConfig

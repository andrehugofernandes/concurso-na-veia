/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['isomorphic-dompurify', 'jsdom']
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
};

nextConfig.typescript = Object.assign(nextConfig.typescript || {}, { ignoreBuildErrors: true });
nextConfig.eslint = Object.assign(nextConfig.eslint || {}, { ignoreDuringBuilds: true });
module.exports = nextConfig;

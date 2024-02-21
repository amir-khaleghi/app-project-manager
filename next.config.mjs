/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },

  experimental: {
    serverComponentsExternalPackages: ['bcrypt'],
  },
};

export default nextConfig;

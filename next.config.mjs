/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '57899',
            pathname: '/api/**',
          },
        ],
      },
};

export default nextConfig;

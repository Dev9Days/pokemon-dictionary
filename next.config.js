/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  // env: {
  //   BASE_URL: process.env.BASE_URL,
  // },
  images: {
    domains: ['raw.githubusercontent.com', 'localhost'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

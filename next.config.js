/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => [{ source: '/', destination: '/restaurants', permanent: true }],
};

module.exports = nextConfig;

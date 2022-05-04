const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/campaigns',
        locale: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: ['assets.myhearty.my', 'loremflickr.com', 'fakeimg.pl'],
  },
  experimental: {
    externalDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/campaigns',
        locale: false,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

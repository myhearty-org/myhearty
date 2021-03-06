const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: ['assets.myhearty.my', 'loremflickr.com'],
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;

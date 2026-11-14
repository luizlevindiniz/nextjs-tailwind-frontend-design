/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
  },
  turbopack: {
    rules: {
      '*.svg': {
        condition: { not: { query: /[?&]url(?=&|$)/ } },
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              dimensions: false,
              titleProp: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

module.exports = nextConfig;

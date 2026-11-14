/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

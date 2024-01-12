// next.config.js
module.exports = {
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  output: 'standalone',
  images: {
    domains: ["storage.googleapis.com"],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.googleusercontent.com',
    }],
  },
};

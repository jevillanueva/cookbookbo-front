// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
});
module.exports = withPWA({
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
});

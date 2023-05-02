// next.config.js
module.exports = {
  output: 'standalone',
  images: {
    domains: ["storage.googleapis.com"],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.googleusercontent.com',
    }],
  },
};

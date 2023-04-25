// next.config.js
module.exports = {
  images: {
    domains: ["storage.googleapis.com"],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.googleusercontent.com',
    }],
  },
};

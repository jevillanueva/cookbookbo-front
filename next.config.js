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
  publicRuntimeConfig: {
    // remove private variables from processEnv
    processEnv: Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.includes('NEXT_PUBLIC_')
      )
    ),
  },
};

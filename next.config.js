/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // config of image allowed all host name 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],   
  }
}

module.exports = nextConfig

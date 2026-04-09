/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.bizgrow-holdings.com',
      },
    ],
  },
};

export default nextConfig;
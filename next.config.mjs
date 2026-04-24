/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    // Ismein script, images (CloudFront), aur connection domains sab allowed hain
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.endorsal.io; style-src 'self' 'unsafe-inline' https://cdn.endorsal.io https://fonts.googleapis.com; img-src 'self' https://cms.bizgrow-holdings.com https://cdn.endorsal.io https://*.cloudfront.net data: blob:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://cdn.endorsal.io https://*.endorsal.io;"
  }
];

const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.bizgrow-holdings.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.endorsal.io',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
    ],
  },
  // Ye function security headers ko apply karega
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
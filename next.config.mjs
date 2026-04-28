/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), xr-spatial-tracking=(self 'https://challenges.cloudflare.com')",
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; " +
           "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://va.vercel-scripts.com https://cdn.endorsal.io; " +
           "style-src 'self' 'unsafe-inline' https://cdn.endorsal.io https://fonts.googleapis.com; " +
           "img-src 'self' https://cms.bizgrow-holdings.com https://cdn.endorsal.io https://*.cloudfront.net https://www.google.com data: blob:; " +
           "font-src 'self' https://fonts.gstatic.com data:; " +
           "connect-src 'self' https://cdn.endorsal.io https://*.endorsal.io https://va.vercel-scripts.com; " +
           "frame-src 'self' https://www.google.com https://challenges.cloudflare.com blob:; " +
           "base-uri 'self'; " +
           "form-action 'self';" 
           // 🚨 'require-trusted-types-for' aur 'trusted-types' yahan se hata diye gaye hain
  }
];
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.bizgrow-holdings.com",
      },
      {
        protocol: "https",
        hostname: "cdn.endorsal.io",
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
    ],
  },
  // Security headers ko apply karne ke liye function
  async headers() {
    return [
      {
        source: "/:path*", // Tamam paths ke liye
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
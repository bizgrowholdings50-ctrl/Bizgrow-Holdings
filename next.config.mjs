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
  // 🚀 FIX 1: Cross-Origin-Opener-Policy (COOP) header added for Lighthouse pass
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  // 🚀 FIX 2: Corrected Permissions-Policy format (Removed parser error)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), xr-spatial-tracking=*",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; " +
      // 🔹 FIX: script-src mein Microsoft Clarity ke domains (https://www.clarity.ms aur https://*.clarity.ms) add kar diye hain
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://va.vercel-scripts.com https://cdn.endorsal.io https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms; " +
      "style-src 'self' 'unsafe-inline' https://cdn.endorsal.io https://fonts.googleapis.com; " +
      // 🔹 FIX: img-src mein Google user avatar host aur Clarity tracking pixel add kiya hai
      "img-src 'self' https://cms.bizgrow-holdings.com https://cdn.endorsal.io https://*.cloudfront.net https://www.google.com https://lh3.googleusercontent.com https://www.google-analytics.com https://*.google-analytics.com https://c.bing.com data: blob:; " +
      "font-src 'self' https://fonts.gstatic.com data:; " +
      // 🔹 FIX: connect-src mein Supabase, Clarity aur analytics endpoints whitelist kar diye hain
      "connect-src 'self' https://cdn.endorsal.io https://*.endorsal.io https://va.vercel-scripts.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://*.supabase.co https://*.supabase.in https://c.bing.com; " +
      "frame-src 'self' https://www.google.com https://challenges.cloudflare.com blob:; " +
      "base-uri 'self'; " +
      "form-action 'self';",
  },
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
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // Redirects section
  async redirects() {
    return [
      {
        source: "/our-services/private-security-startup/",
        destination: "/private-security-startup/",
        permanent: true,
      },
      {
        source: "/our-services/internal-audit/",
        destination: "/internal-audit/",
        permanent: true,
      },
      {
        source: "/why-iso-9001-matters-for-uk-business-quality-and-growth/",
        destination: "/iso-9001-matters-for-uk-business/",
        permanent: true,
      },
      {
        source: "/top-security-companies-trusted-protection-for-every-business/",
        destination: "/top-security-companies/",
        permanent: true,
      },
      {
        source: '/why-iso-9001-matters-for-uk-business-quality-and-growth',
        destination: '/iso-9001-matters-for-uk-business/',
        permanent: true,
      },
      {
        source: '/could-iso-45001-enhance-workplace-safety-and-compliance',
        destination: '/could-iso-45001-enhance-workplace-safety/',
        permanent: true,
      },

      {
        source: "/why-clients-trust-iso-14001-certified-suppliers-in-the-uk/",
        destination: "/why-clients-trust-iso-14001-certified/",
        permanent: true,
      },
      {
        source: "/cop119-compliance-guide-for-uk-security-businesses-requirements-and-benefits/  ",
        destination: "/cop119-compliance-guide/",
        permanent: true,
      },
      {
        source: "/what-is-safe-contractor-accreditation-and-why-is-it-important/",
        destination: "/what-is-safe-contractor-accreditation/",
        permanent: true,
      },

      {
        source: "/terms/",
        destination: "/terms-and-conditions/",
        permanent: true,
      },
      {
        source: "/iso-14001-requirements/",
        destination: "/our-services/iso-14001/",
        permanent: true,
      },
      { source: "/contact/", destination: "/contact-us/", permanent: true },
      {
        source:
          "/could-iso-45001-be-the-solution-for-enhanced-workplace-safety-and-regulatory-compliance/",
        destination:
          "/could-iso-45001-enhance-workplace-safety-and-compliance/",
        permanent: true,
      },
      {
        source: "/category/cop-119/",
        destination: "/blogs/category/cop-119/",
        permanent: true,
      },
      {
        source: "/the-future-of-security-compliance-begins-with-cop-119/",
        destination: "/future-of-security-compliance/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/internal-audit/",
        destination: "/internal-audit/",
        permanent: true,
      },
      {
        source: "/web-and-digital-marketing-solutions/",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/constructionline-rejections-the-top-mistakes-uk-contractors-keep-repeating/",
        destination: "/constructionline-rejections-uk-contractors-repeat/",
        permanent: true,
      },
      {
        source:
          "/the-complete-guide-to-acs-accreditation-for-security-businesses-in-the-uk/",
        destination: "/acs-accreditation-for-security-businesses/",
        permanent: true,
      },
      {
        source:
          "/is-iso-45001-the-essential-solution-for-enhanced-workplace-safety-and-compliance/",
        destination:
          "/could-iso-45001-enhance-workplace-safety-and-compliance/",
        permanent: true,
      },
      {
        source:
          "/how-internal-audits-strengthen-compliance-and-operational-efficiency/",
        destination: "/how-do-internal-audits-enhance-compliance-efficiency/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/iso-45001/",
        destination: "/our-services/iso-45001/",
        permanent: true,
      },
      {
        source:
          "/the-key-business-advantages-of-achieving-chas-accreditation-in-the-uk/",
        destination: "/benefits-of-achieving-chas-accreditation/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/sia-acs/",
        destination: "/our-services/sia-acs/",
        permanent: true,
      },
      {
        source:
          "/the-business-benefits-of-becoming-an-sia-approved-contractor/",
        destination:
          "/business-benefits-of-becoming-an-sia-approved-contractor/",
        permanent: true,
      },
      {
        source: "/our-services/constructionline/compliance-consultancies/",
        destination: "/our-services/constructionline/",
        permanent: true,
      },
      {
        source: "/interal-audit/",
        destination: "/internal-audit/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/bs7858-screening-vetting/",
        destination: "/our-services/bs7858-screening-vetting/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/iso-14001/",
        destination: "/our-services/iso-14001/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/iso-9001/",
        destination: "/our-services/iso-9001/",
        permanent: true,
      },
      {
        source: "/constructionline/",
        destination: "/our-services/constructionline/",
        permanent: true,
      },
      {
        source:
          "/bs-7858-the-complete-guide-to-security-screening-vetting-in-the-uk/",
        destination: "/bs-7858-the-complete-guide/",
        permanent: true,
      },
      {
        source:
          "/chas-accreditation-the-smart-route-to-safer-and-more-credible-business-operations/",
        destination:
          "/chas-accreditation-a-smart-way-to-safer-business-operations/",
        permanent: true,
      },
      {
        source: "/nasdu/",
        destination: "/our-services/nasdu/",
        permanent: true,
      },
      {
        source: "/smas-accreditation/",
        destination: "/our-services/smas-accreditation/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/chas-scheme/",
        destination: "/our-services/chas-scheme/",
        permanent: true,
      },
      {
        source: "/cyber-essentials/",
        destination: "/our-services/cyber-essentials/",
        permanent: true,
      },
      {
        source:
          "/how-cop-119-helps-security-businesses-maintain-high-standards-in-the-uk/",
        destination:
          "/cop-119-helps-security-businesses-maintain-high-standards/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/cop-119-labour-provision/",
        destination: "/our-services/cop-119-labour-provision/",
        permanent: true,
      },
      {
        source: "/compliance-consultancies/safe-contractor/",
        destination: "/our-services/safe-contractor/",
        permanent: true,
      },
      { source: "/careers/", destination: "/contact-us/", permanent: true },
      {
        source: "/category/iso-certification/",
        destination: "/our-services/iso-9001/",
        permanent: true,
      },
      {
        source:
          "/the-role-of-iso-14001-environmental-management-system-in-chemical-industries/",
        destination: "/iso-14001-consulting-services/",
        permanent: true,
      },
      {
        source:
          "/sheq-management-system-safety-health-environment-and-quality-explained/",
        destination: "/sheq-management-system-explained/",
        permanent: true,
      },
      { source: "/home/", destination: "/", permanent: true },
      {
        source: "/privacy-policy-bizgrow-holdings-ltd/",
        destination: "/privacy-policy/",
        permanent: true,
      },
      {
        source: "/iso-certification/",
        destination: "/our-services/iso-9001/",
        permanent: true,
      },
      {
        source:
          "/without-safecontractor-accreditation-your-business-is-invisible-to-uk-buyers/",
        destination:
          "/without-safecontractor-your-business-is-invisible-to-uk-buyers/",
        permanent: true,
      },
    ];
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

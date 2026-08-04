const baseUrl = "https://bizgrow-holdings.com";

const organizationRef = {
  "@type": "Organization",
  "name": "BizGrow Holdings Ltd",
  "url": baseUrl,
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BizGrow Holdings Ltd",
  "url": baseUrl,
  "logo": "https://bizgrow-holdings.com/logo.webp",
  "legalName": "BizGrow Holdings Ltd",
  "telephone": "+44 7898 205035",
  "email": "info@bizgrow-holdings.co.uk",
  "sameAs": [
    "https://www.facebook.com/bizgrowholdings",
    "https://www.instagram.com/bizgrowholdingltd/",
    "https://www.linkedin.com/company/bizgrowholdings/",
    "https://www.youtube.com/@bizgrowholdings",
    "https://www.tiktok.com/@bizgrow.holdings.ltd"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "CEME Campus, Marsh Way",
    "addressLocality": "London",
    "postalCode": "RM13 8EU",
    "addressCountry": "GB"
  },
  "description": "BizGrow Holdings is a UK compliance consultancy and IT services provider helping security businesses achieve ISO, ACS, certification, and digital growth.",
};

export const itServicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Managed IT Services & Web Development",
  "url": `${baseUrl}/it-services`,
  "serviceType": "Web development, technical SEO, managed IT services, cyber security and Microsoft 365 support for UK organisations",
  "provider": organizationRef,
  "areaServed": "United Kingdom",
  "description": "BizGrow Holdings delivers managed IT services, web development, and SEO for UK businesses, with secure infrastructure and compliance-focused digital growth.",
};

export const consultancyServicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Compliance Consultancies for UK Security Businesses",
  "url": `${baseUrl}/compliance-consultancies`,
  "serviceType": "UK security accreditation consultancy for SIA ACS, SafeContractor, ISO and corporate compliance",
  "provider": organizationRef,
  "areaServed": "United Kingdom",
  "description": "BizGrow Holdings provides compliance consultancy for UK security companies, specialising in SIA ACS, SafeContractor and audit-ready management systems.",
};

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "url": `${baseUrl}/about-us`,
  "name": "About BizGrow Holdings",
  "description": "About page for BizGrow Holdings, the UK compliance consultancy and certification specialist for security and corporate businesses.",
  "mainEntity": organizationRef,
};

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": `${baseUrl}/contact-us`,
  "name": "Contact BizGrow Holdings",
  "description": "Contact page for BizGrow Holdings with UK office contact details, phone, email and address.",
  "contactType": "Customer Service",
  "telephone": "+44 7898 205035",
  "email": "info@bizgrow-holdings.co.uk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "CEME Campus, Marsh Way",
    "addressLocality": "London",
    "postalCode": "RM13 8EU",
    "addressCountry": "GB"
  },
  "mainEntity": organizationRef,
};

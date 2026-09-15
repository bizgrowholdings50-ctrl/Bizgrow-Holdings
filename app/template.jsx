"use client";

import { usePathname } from "next/navigation";
import CinematicTransition from "@/components/CinematicTransition";

export default function Template({ children }) {
  const pathname = usePathname();

  const getTransitionDetails = (path) => {
    // ==========================================
    // HOME
    // ==========================================
    if (path === "/") {
      return {
        title: "BizGrow",
        subtitle: "Holdings",
        bg: "/growth-s.jpg",
      };
    }

    // ==========================================
    // IT SERVICES
    // ==========================================
    if (path.includes("it-services")) {
      return {
        title: "IT",
        subtitle: "Services",
        bg: "/it-hero.jpg",
      };
    }

    // ==========================================
    // SIA ACS
    // ==========================================
    if (path.includes("/our-services/sia-acs") || path.includes("/sia-acs")) {
      return {
        title: "SIA ACS",
        subtitle: "Accreditation",
        bg: "/sia-acs-hero.jpg",
      };
    }

    // ==========================================
    // SECURITY / VETTING SERVICES
    // ==========================================
    if (
      path.includes("cop-119") ||
      path.includes("nasdu") ||
      path.includes("bs-10119") ||
      path.includes("bs7858") ||
      path.includes("bs-7499") ||
      path.includes("bs-10800")
    ) {
      const securityServices = {
        "cop-119": {
          title: "COP 119",
          subtitle: "Compliance",
          bg: "/cop119-hero.jpg",
        },

        nasdu: {
          title: "NASDU",
          subtitle: "Accreditation",
          bg: "/Who.jpg",
        },

        "bs-10119": {
          title: "BS 10119",
          subtitle: "Security Management",
          bg: "/bs10119-h.jpg",
        },

        bs7858: {
          title: "BS 7858",
          subtitle: "Screening",
          bg: "/bs7858-hero.webp",
        },

        "bs-7499": {
          title: "BS 7499",
          subtitle: "Security Services",
          bg: "/guarding-hero.jpg",
        },

        "bs-10800": {
          title: "BS 10800",
          subtitle: "Security Management",
          bg: "/bs10800-hero.jpg",
        },
      };

      const matchedService = Object.keys(securityServices).find((slug) =>
        path.includes(slug),
      );

      return (
        securityServices[matchedService] || {
          title: "Security",
          subtitle: "Compliance",
          bg: "/images/service-security.jpg",
        }
      );
    }

    // ==========================================
    // ISO / QUALITY & MANAGEMENT
    // ==========================================
    if (
      path.includes("iso-9001") ||
      path.includes("iso-14001") ||
      path.includes("iso-45001") ||
      path.includes("iso-27001") ||
      path.includes("quality-management")
    ) {
      const isoServices = {
        "iso-9001": {
          title: "ISO 9001",
          subtitle: "Quality Management",
          bg: "/iso-9001-hero.jpg",
        },
        "iso-14001": {
          title: "ISO 14001",
          subtitle: "Environmental Management",
          bg: "/iso-14001-hero.jpg", // Yahan apna exact image path dein
        },
        "iso-45001": {
          title: "ISO 45001",
          subtitle: "Health & Safety",
          bg: "/iso-45001-hero.jpg", // Yahan apna exact image path dein
        },
        "iso-27001": {
          title: "ISO 27001",
          subtitle: "Information Security",
          bg: "/iso-27001-hero.jpg", // Yahan apna exact image path dein
        },
      };

      const matchedService = Object.keys(isoServices).find((slug) =>
        path.includes(slug),
      );

      return (
        isoServices[matchedService] || {
          title: "ISO",
          subtitle: "Management Systems",
          bg: "/images/service-iso.jpg",
        }
      );
    }

    // ==========================================
    // HEALTH & SAFETY
    // ==========================================
    if (
      path.includes("safecontractor") ||
      path.includes("constructionline") ||
      path.includes("smas") ||
      path.includes("chas") ||
      path.includes("health-safety")
    ) {
      const healthSafetyServices = {
        safecontractor: {
          title: "SafeContractor",
          subtitle: "Accreditation",
          bg: "/Constructions.jpg",
        },

        constructionline: {
          title: "Constructionline",
          subtitle: "Compliance",
          bg: "/h.jpg",
        },

        smas: {
          title: "SMAS",
          subtitle: "Accreditation",
          bg: "/smas-h.jpg",
        },

        chas: {
          title: "CHAS",
          subtitle: "Health & Safety",
          bg: "/chas-hero.jpg",
        },
      };

      const matchedService = Object.keys(healthSafetyServices).find((slug) =>
        path.includes(slug),
      );

      return (
        healthSafetyServices[matchedService] || {
          title: "Health & Safety",
          subtitle: "Compliance",
          bg: "/images/service-health-safety.jpg",
        }
      );
    }
    // ==========================================
    // CYBER SECURITY
    // ==========================================
    if (
      path.includes("cyber-essentials") ||
      path.includes("cyber-security") ||
      path.includes("cybersecurity")
    ) {
      const isPlus = path.includes("plus");

      return {
        title: isPlus ? "Cyber Essentials" : "Cyber Security",
        subtitle: isPlus ? "Plus" : "Protection",
        bg: isPlus
          ? "/cyber-plus-hero-org.jpg"
          : "/cyber-hero.jpg",
      };
    }
    // ==========================================
    // ABOUT
    // ==========================================
    if (path.includes("/about")) {
      return {
        title: "About",
        subtitle: "BizGrow",
        bg: "/about-hero.webp",
      };
    }

    // ==========================================
    // PRIMARY CONTENT PAGES
    // ==========================================
    const pageHeroes = [
      ["compliance-consultancies", "Compliance", "Consultancies", "/compliance-hero-bg.jpg"],
      ["corporate-training-and-coaching", "Corporate", "Training", "/training-hero.jpg"],
      ["customer-services", "Customer", "Services", "/customer-hero.webp"],
      ["faqs", "Frequently Asked", "Questions", "/faq-hero.jpg"],
      ["internal-audit", "Internal Audit", "Services", "/audit-hero.jpg"],
      ["our-mission", "Our", "Mission", "/our-mission.webp"],
      ["private-security-startup", "Private Security", "Startup", "/security-startup-hero.jpg"],
      ["qms-software", "QMS Software", "Solutions", "/qms-bg.jpg"],
      ["discount-offers", "Discount", "Offers", "/discount_offer1.jpg"],
      ["privacy-policy", "Privacy", "Policy", "/h.png"],
      ["terms-and-conditions", "Terms", "Conditions", "/h.png"],
      ["uks-private-security-directory", "Private Security", "Directory", "/private-security-hero.jpg"],
    ];

    const matchedPage = pageHeroes.find(([slug]) => path.includes(slug));
    if (matchedPage) {
      const [, title, subtitle, bg] = matchedPage;
      return { title, subtitle, bg };
    }

    // ==========================================
    // TESTIMONIALS
    // ==========================================
    if (path.includes("testimonials")) {
      return {
        title: "Client",
        subtitle: "Reviews",
        bg: "/reviews-bg.jpg",
      };
    }

    // ==========================================
    // BLOG / INSIGHTS
    // ==========================================
    if (
      path.includes("/blogs") ||
      path.includes("/blog") ||
      path.includes("/insights")
    ) {
      return {
        title: "Insights",
        subtitle: "& Advice",
        
      };
    }

    // ==========================================
    // CONTACT
    // ==========================================
    if (path.includes("/contact") || path.includes("/contact-us")) {
      return {
        title: "Get In",
        subtitle: "Touch",
        bg: "/10 Ways.jpg",
      };
    }

    // ==========================================
    // REFERRAL PROGRAM
    // ==========================================
    if (path.includes("referral-program")) {
      return {
        title: "Referral",
        subtitle: "Programme",
        bg: "/pkg-hero-1.jpg",
      };
    }

    // ==========================================
    // SERVICES LANDING PAGE
    // ==========================================
    if (path === "/our-services" || path === "/our-services/") {
      return {
        title: "Our",
        subtitle: "Services",
        bg: "/h.png",
      };
    }

    // ==========================================
    // TRAINING MOMENTS
    // ==========================================
    if (path.includes("training-moments")) {
      return {
        title: "Training",
        subtitle: "Moments",
        bg: "/w2.webp",
      };
    }

    // ==========================================
    // GENERIC SERVICE FALLBACK
    // ==========================================
    if (path.includes("/our-services/")) {
      const segments = path.split("/").filter(Boolean);
      const lastSegment = segments[segments.length - 1] || "service";

      const formatted = lastSegment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const words = formatted.split(" ");

      return {
        title: words[0] || "BizGrow",
        subtitle: words.slice(1).join(" ") || "Compliance",
        bg: "/service-security.jpg",
      };
    }

    // ==========================================
    // GENERAL FALLBACK
    // ==========================================
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "BizGrow";

    const formatted = lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const words = formatted.split(" ");

    return {
      title: words[0] || "BizGrow",
      subtitle: words.slice(1).join(" ") || "Excellence",
      bg: "/images/default-bg.jpg",
    };
  };

  const { title, subtitle, bg } = getTransitionDetails(pathname);

  return (
    <div key={pathname}>
      <CinematicTransition
        key={pathname}
        title={title}
        subtitle={subtitle}
        bgImage={bg}
      />

      {children}
    </div>
  );
}

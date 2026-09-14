"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CinematicTransition from "@/components/CinematicTransition";

export default function Template({ children }) {
  const pathname = usePathname();
  const [introFinished, setIntroFinished] = useState(false);

  /*
   * Reset the transition whenever the route changes.
   */
  useEffect(() => {
    setIntroFinished(false);
  }, [pathname]);

  const getTransitionDetails = (path) => {
    // ==========================================
    // HOME
    // ==========================================
    if (path === "/") {
      return {
        title: "BizGrow",
        subtitle: "Holdings",
        bg: "/bizgrow-hero-home.jpg",
      };
    }

    // ==========================================
    // IT SERVICES
    // ==========================================
    if (path.includes("it-services")) {
      return {
        title: "IT",
        subtitle: "Services",
        bg: "/service-it.jpg",
      };
    }

    // ==========================================
    // SIA ACS
    // ==========================================
    if (path.includes("/our-services/sia-acs") || path.includes("/sia-acs")) {
      return {
        title: "SIA ACS",
        subtitle: "Accreditation",
        bg: "/Bizgrow-SIA.jpg",
      };
    }

    // ==========================================
    // SECURITY / VETTING SERVICES
    // ==========================================
    if (
      path.includes("cop-119") ||
      path.includes("nasdu") ||
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

        bs7858: {
          title: "BS 7858",
          subtitle: "Screening",
          bg: "/Bizgrow-BS7858.jpg",
        },

        "bs-7499": {
          title: "BS 7499",
          subtitle: "Security Services",
          bg: "/Bizgrow-BS7499.jpg",
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
        bg: "/growth-s.jpg",
      };
    }

    // ==========================================
    // TESTIMONIALS
    // ==========================================
    if (path.includes("testimonials")) {
      return {
        title: "Client",
        subtitle: "Reviews",
        bg: "/images/testimonials-bg.jpg",
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
        bg: "/images/blog-bg.jpg",
      };
    }

    // ==========================================
    // CONTACT
    // ==========================================
    if (path.includes("/contact") || path.includes("/contact-us")) {
      return {
        title: "Get In",
        subtitle: "Touch",
        bg: "/images/contact-bg.jpg",
      };
    }

    // ==========================================
    // REFERRAL PROGRAM
    // ==========================================
    if (path.includes("referral-program")) {
      return {
        title: "Referral",
        subtitle: "Programme",
        bg: "/images/referral-bg.jpg",
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
      {!introFinished && (
        <CinematicTransition
          key={pathname}
          title={title}
          subtitle={subtitle}
          bgImage={bg}
          onComplete={() => setIntroFinished(true)}
        />
      )}

      <div
        className={`transition-opacity duration-700 ${
          introFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

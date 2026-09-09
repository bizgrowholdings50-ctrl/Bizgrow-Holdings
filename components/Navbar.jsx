"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";

import {
  Home,
  UserRound,
  MonitorCog,
  BriefcaseBusiness,
  GraduationCap,
  MessageSquareQuote,
  Newspaper,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Users,
  Award,
  Leaf,
  HeartPulse,
  Construction,
  Dog,
  Lock,
  Globe,
  Fingerprint,
  Search,
  ShieldAlert,
  FileCheck,
  Building2,
  ShieldQuestion,
  BadgeCheck,
  ScanEye,
  Menu,
  X,
} from "lucide-react";

/* =========================================================
   SERVICE CATEGORIES
   UK COMPLIANCE / CONSULTANCY STRUCTURE
========================================================= */

const categories = [
  {
    id: "security",
    number: "01",
    eyebrow: "Security & Accreditation",
    title: "Security Accreditation",
    description:
      "Build credibility, strengthen your operations and meet recognised UK security standards.",
    icon: ShieldQuestion,

    services: [
      {
        title: "SIA ACS",
        description:
          "Approved Contractor Scheme consultancy for security companies.",
        href: "/our-services/sia-acs",
        icon: ShieldCheck,
      },
      {
        title: "BS 7858",
        description: "Personnel screening and vetting for the security sector.",
        href: "/our-services/bs7858-screening-vetting",
        icon: Search,
      },
      {
        title: "BS 7499",
        description: "Static guarding and mobile patrol services standard.",
        href: "/our-services/bs-7499",
        icon: ShieldAlert,
      },
      {
        title: "BS 10800",
        description: "Framework for the provision of security services.",
        href: "/our-services/bs-10800",
        icon: Globe,
      },
      {
        title: "NASDU",
        description: "Compliance support for security dog operations.",
        href: "/our-services/nasdu",
        icon: Dog,
      },
      {
        title: "COP 119",
        description:
          "Labour provision requirements within the security sector.",
        href: "/our-services/cop-119-labour-provision",
        icon: Users,
      },
    ],
  },

  {
    id: "management",
    number: "02",
    eyebrow: "ISO & Management Systems",
    title: "ISO Consultancy",
    description:
      "Implement practical management systems that improve consistency, performance and business confidence.",
    icon: BadgeCheck,

    services: [
      {
        title: "ISO 9001",
        description: "Quality Management Systems for operational excellence.",
        href: "/our-services/iso-9001",
        icon: Award,
      },
      {
        title: "ISO 14001",
        description: "Environmental management systems for sustainable growth.",
        href: "/our-services/iso-14001",
        icon: Leaf,
      },
      {
        title: "ISO 45001",
        description: "Occupational health and safety management systems.",
        href: "/our-services/iso-45001",
        icon: HeartPulse,
      },
    ],
  },

  {
    id: "health",
    number: "03",
    eyebrow: "Health, Safety & Contractors",
    title: "Health & Safety",
    description:
      "Strengthen contractor credentials and prepare your organisation for recognised UK H&S accreditation.",
    icon: Construction,

    services: [
      {
        title: "CHAS Scheme",
        description: "Contractors Health and Safety Assessment Scheme support.",
        href: "/our-services/chas-scheme",
        icon: FileCheck,
      },
      {
        title: "SafeContractor",
        description: "Health and safety accreditation for UK contractors.",
        href: "/our-services/safe-contractor",
        icon: ShieldCheck,
      },
      {
        title: "Constructionline",
        description: "Gold and Silver membership audit preparation.",
        href: "/our-services/constructionline",
        icon: Construction,
      },
      {
        title: "SMAS",
        description: "SSIP health and safety accreditation support.",
        href: "/our-services/smas-accreditation",
        icon: Building2,
      },
    ],
  },

  {
    id: "cyber",
    number: "04",
    eyebrow: "Digital Security",
    title: "Cyber Security",
    description:
      "Demonstrate that your organisation takes cyber security and digital risk seriously.",
    icon: ScanEye,

    services: [
      {
        title: "Cyber Essentials",
        description: "Protection against common cyber security threats.",
        href: "/our-services/cyber-essentials",
        icon: Lock,
      },
      {
        title: "Cyber Essentials Plus",
        description:
          "Enhanced cyber security with independent technical verification.",
        href: "/our-services/cyber-essentials-plus",
        icon: Fingerprint,
      },
    ],
  },
];

/* =========================================================
   ORIGINAL NAVIGATION ORDER
========================================================= */

const navigation = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "About",
    href: "/about-us",
    icon: UserRound,
  },
  {
    label: "IT Solutions",
    href: "/it-services",
    icon: MonitorCog,
  },
  {
    label: "Workshop Training",
    href: "/training-moments",
    icon: GraduationCap,
  },
  {
    label: "Testimonials",
    href: "/testimonials-reviews",
    icon: MessageSquareQuote,
  },
  {
    label: "Blogs",
    href: "/blogs",
    icon: Newspaper,
  },
];

const ease = [0.22, 1, 0.36, 1];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const pathname = usePathname();
  const normalizePath = (path) => path.replace(/\/$/, "") || "/";
  const currentPath = normalizePath(pathname);

  const [mounted, setMounted] = useState(false);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  const closeTimer = useRef(null);

  /* -------------------------------------------------------
     MOUNT
  ------------------------------------------------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* -------------------------------------------------------
     BODY LOCK
  ------------------------------------------------------- */

  useEffect(() => {
    if (!mounted) return;

    // NOTE: locking on documentElement (html), not body, to avoid
    // creating a new containing block on body that breaks
    // position: sticky / fixed elsewhere on the page.
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen, mounted]);

  /* -------------------------------------------------------
     ESCAPE
  ------------------------------------------------------- */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* -------------------------------------------------------
     CLEANUP TIMER
  ------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  if (!mounted) return null;

  /* -------------------------------------------------------
     SERVICES HOVER
  ------------------------------------------------------- */

  const openServices = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }

    setServicesOpen(true);
  };

  const closeServices = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    closeTimer.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  /* -------------------------------------------------------
     MOBILE CLOSE
  ------------------------------------------------------- */

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileActiveCategory(null);
  };

  const selectedCategory = categories[activeCategory];
  const isServicesActive = pathname?.startsWith("/our-services");

  return (
    <>
      {/* ===================================================
          MAIN NAVBAR
      ==================================================== */}

      <header
        className="
          fixed
          top-4
          left-0
          right-0
          z-[100]
          px-3
          sm:px-5
          xl:px-6
        "
      >
        <nav
          className="
            mx-auto
            max-w-[1440px]
            h-[68px]
            px-3
            sm:px-4
            lg:px-5
            flex
            items-center
            justify-between
            gap-3
            bg-white/[0.96]
            backdrop-blur-2xl
            border
            border-black/[0.1]
            rounded-full
            shadow-[0_18px_55px_rgba(18,6,106,0.11)]
          "
        >
          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            className="
              shrink-0
              flex
              items-center
              pl-2
              pr-3
              lg:pr-5
            "
          >
            <Image
              src="/bizgrow_logo.png"
              alt="BizGrow Holdings Logo"
              width={110}
              height={40}
              priority
              style={{
                width: "auto",
                height: "auto",
              }}
              className="
                w-auto
                h-[38px]
                object-contain
              "
            />
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================== */}

          <div
            className="
              hidden
              xl:flex
              items-center
              justify-center
              flex-1
            "
          >
            <div className="flex items-center gap-1">
              <PremiumNavLink
                item={navigation[0]}
                isActive={pathname === navigation[0].href}
              />

              <PremiumNavLink
                item={navigation[1]}
                isActive={pathname === navigation[1].href}
              />

              <PremiumNavLink
                item={navigation[2]}
                isActive={pathname === navigation[2].href}
              />

              {/* =================================================
                  SERVICES
              ================================================== */}

              <div
                className="
                  relative
                  h-[58px]
                  flex
                  items-center
                "
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onFocus={openServices}
                  className={`
                    group
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    h-[54px]
                    min-w-[72px]
                    px-3
                    rounded-2xl
                    transition-all
                    duration-300
                    ${
                      isServicesActive || servicesOpen
                        ? "bg-[#12066a]/[0.06]"
                        : "hover:bg-black/[0.03]"
                    }
                  `}
                >
                  {(isServicesActive || servicesOpen) && (
                    <span
                      className="
                        absolute
                        inset-0
                        rounded-2xl
                        border-2
                        border-[#997819]
                        shadow-[0_0_0_4px_rgba(153,120,25,0.08)]
                      "
                    />
                  )}

                  <span
                    className={`
                      relative
                      z-10
                      flex
                      items-center
                      gap-1
                      transition-all
                      duration-300
                      ${
                        isServicesActive || servicesOpen
                          ? "text-[#12066a] scale-110"
                          : "text-[#997819] group-hover:text-[#12066a]"
                      }
                    `}
                  >
                    <BriefcaseBusiness
                      size={20}
                      strokeWidth={isServicesActive || servicesOpen ? 2.2 : 1.8}
                    />
                    <ChevronDown
                      size={12}
                      className={`
                        transition-transform
                        duration-300
                        ${servicesOpen ? "rotate-180" : ""}
                      `}
                    />
                  </span>

                  <span
                    className={`
                      relative
                      z-10
                      text-[10px]
                      font-bold
                      tracking-wide
                      transition-colors
                      duration-300
                      ${
                        isServicesActive || servicesOpen
                          ? "text-[#12066a]"
                          : "text-black/70 text-[10px]  text-[9.5px] font-bold group-hover:text-[#12066a]/70"
                      }
                    `}
                  >
                    Services
                  </span>
                </button>

                {/* =================================================
                    PREMIUM MEGA MENU
                ================================================== */}

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 12,
                        scale: 0.985,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 8,
                        scale: 0.985,
                      }}
                      transition={{
                        duration: 0.24,
                        ease,
                      }}
                      onMouseEnter={openServices}
                      onMouseLeave={closeServices}
                      className="
                        absolute
                        top-[calc(100%+3px)]
                        left-1/2
                        -translate-x-1/2
                        w-[900px]
                        overflow-clip
                        bg-white
                        rounded-[28px]
                        border
                        border-black/[0.08]
                        shadow-[0_35px_100px_rgba(18,6,106,0.18)]
                      "
                    >
                      {/* TOP ACCENT */}

                      <div
                        className="
                          h-[3px]
                          bg-gradient-to-r
                          from-[#12066a]
                          via-[#997819]
                          to-[#12066a]
                        "
                      />

                      <div className="grid grid-cols-[290px_1fr]">
                        {/* =================================================
                            LEFT CATEGORY PANEL
                        ================================================== */}

                        <div
                          className="
                            bg-[#faf9f7]
                            border-r
                            border-black/[0.07]
                            p-6
                          "
                        >
                          <div className="px-2 pt-1 pb-6">
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                mb-3
                              "
                            >
                              <span
                                className="
                                  w-5
                                  h-px
                                  bg-[#997819]
                                "
                              />

                              <span
                                className="
                                  text-[9px]
                                  uppercase
                                  tracking-[0.22em]
                                  font-bold
                                  text-[#997819]
                                "
                              >
                                Our expertise
                              </span>
                            </div>

                            <h3
                              className="
                                text-[25px]
                                leading-none
                                font-semibold
                                tracking-[-0.045em]
                                text-[#12066a]
                              "
                            >
                              Compliance,
                              <br />
                              done properly.
                            </h3>

                            <p
                              className="
                                mt-3
                                text-[11px]
                                leading-[1.65]
                                text-black/60
                                max-w-[220px]
                              "
                            >
                              Specialist consultancy supporting UK businesses
                              across accreditation, management and compliance.
                            </p>
                          </div>

                          {/* CATEGORY LIST */}

                          <LayoutGroup id="navbar-categories">
                            <div className="space-y-1">
                              {categories.map((category, index) => {
                                const Icon = category.icon;

                                const isActive = activeCategory === index;

                                return (
                                  <button
                                    key={category.id}
                                    type="button"
                                    onMouseEnter={() =>
                                      setActiveCategory(index)
                                    }
                                    onFocus={() => setActiveCategory(index)}
                                    className={`
                                        group
                                        relative
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        p-3
                                        rounded-2xl
                                        text-left
                                        transition-all
                                        duration-200
                                        ${
                                          isActive
                                            ? "bg-[#12066a] text-white shadow-[0_9px_24px_rgba(18,6,106,0.15)]"
                                            : "text-black/65 hover:bg-white hover:text-[#12066a]"
                                        }
                                      `}
                                  >
                                    {/* ACTIVE GOLD BAR (plain CSS, no layoutId) */}

                                    {isActive && (
                                      <span
                                        className="
                                            absolute
                                            left-0
                                            top-3
                                            bottom-3
                                            w-[3px]
                                            rounded-r-full
                                            bg-[#997819]
                                            transition-all
                                            duration-200
                                          "
                                      />
                                    )}

                                    <span
                                      className={`
                                          shrink-0
                                          w-9
                                          h-9
                                          rounded-xl
                                          flex
                                          items-center
                                          justify-center
                                          border
                                          transition-all
                                          duration-200
                                          ${
                                            isActive
                                              ? "bg-white/[0.10] border-white/[0.10] text-[#997819]"
                                              : "bg-white border-black/[0.06] text-[#12066a]"
                                          }
                                        `}
                                    >
                                      <Icon size={16} strokeWidth={1.6} />
                                    </span>

                                    <span className="flex-1 min-w-0">
                                      <span
                                        className={`
                                            block
                                            text-[11.5px]
                                            font-bold
                                            leading-tight
                                            ${
                                              isActive
                                                ? "text-white"
                                                : "text-black/75"
                                            }
                                          `}
                                      >
                                        {category.title}
                                      </span>

                                      <span
                                        className={`
                                            block
                                            mt-1
                                            text-[8px]
                                            uppercase
                                            tracking-[0.10em]
                                            ${
                                              isActive
                                                ? "text-white/40"
                                                : "text-black/30"
                                            }
                                          `}
                                      >
                                        {category.eyebrow}
                                      </span>
                                    </span>

                                    <ChevronRight
                                      size={14}
                                      className={`
                                          shrink-0
                                          transition-all
                                          duration-200
                                          ${
                                            isActive
                                              ? "text-[#997819] translate-x-0"
                                              : "text-black/15 -translate-x-1"
                                          }
                                        `}
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </LayoutGroup>

                          {/* VIEW ALL */}

                          <Link
                            href="/our-services"
                            onClick={() => setServicesOpen(false)}
                            className="
                              group
                              mt-5
                              pt-5
                              border-t
                              border-black/[0.07]
                              flex
                              items-center
                              justify-between
                              px-2
                            "
                          >
                            <span>
                              <span
                                className="
                                  block
                                  text-[10px]
                                  font-bold
                                  uppercase
                                  tracking-[0.11em]
                                  text-[#12066a]
                                "
                              >
                                View all services
                              </span>

                              <span
                                className="
                                  block
                                  mt-1
                                  text-[8px]
                                  text-black/30
                                "
                              >
                                Explore our full consultancy offering
                              </span>
                            </span>

                            <span
                              className="
                                w-8
                                h-8
                                rounded-full
                                flex
                                items-center
                                justify-center
                                border
                                border-[#997819]/30
                                text-[#997819]
                                transition-all
                                duration-300
                                group-hover:bg-[#997819]
                                group-hover:text-white
                                group-hover:border-[#997819]
                              "
                            >
                              <ArrowUpRight size={14} />
                            </span>
                          </Link>
                        </div>

                        {/* =================================================
                            RIGHT SERVICES PANEL
                        ================================================== */}

                        <div
                          className="
                            p-8
                            bg-white
                          "
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedCategory.id}
                              initial={{
                                opacity: 0,
                                x: 10,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              exit={{
                                opacity: 0,
                                x: -7,
                              }}
                              transition={{
                                duration: 0.18,
                                ease,
                              }}
                            >
                              {/* HEADER */}

                              <div
                                className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-6
                                  pb-6
                                  border-b
                                  border-black/[0.07]
                                "
                              >
                                <div>
                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-2
                                      mb-2.5
                                    "
                                  >
                                    <span
                                      className="
                                        text-[9px]
                                        font-bold
                                        tracking-[0.18em]
                                        uppercase
                                        text-[#997819]
                                      "
                                    >
                                      {selectedCategory.number}
                                    </span>

                                    <span className="w-8 h-px bg-black/[0.10]" />

                                    <span
                                      className="
                                        text-[8px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.16em]
                                        text-black/30
                                      "
                                    >
                                      UK Compliance
                                    </span>
                                  </div>

                                  <h3
                                    className="
                                      text-[26px]
                                      leading-none
                                      font-semibold
                                      tracking-[-0.045em]
                                      text-[#12066a]
                                    "
                                  >
                                    {selectedCategory.title}
                                  </h3>

                                  <p
                                    className="
                                      mt-3
                                      max-w-[490px]
                                      text-[11px]
                                      leading-[1.65]
                                      text-black/60
                                    "
                                  >
                                    {selectedCategory.description}
                                  </p>
                                </div>

                                <div
                                  className="
                                    hidden
                                    sm:block
                                    text-[68px]
                                    leading-none
                                    font-bold
                                    tracking-[-0.10em]
                                    text-[#12066a]/[0.045]
                                    select-none
                                  "
                                >
                                  {selectedCategory.number}
                                </div>
                              </div>

                              {/* SERVICES */}

                              <div
                                className={`
                                  grid
                                  ${
                                    selectedCategory.services.length > 4
                                      ? "grid-cols-2"
                                      : "grid-cols-1"
                                  }
                                  gap-x-8
                                  mt-2
                                `}
                              >
                                {selectedCategory.services.map((service) => {
                                  const Icon = service.icon;

                                  return (
                                    <Link
                                      key={service.href}
                                      href={service.href}
                                      onClick={() => setServicesOpen(false)}
                                      className="
                                          group
                                          relative
                                          flex
                                          items-center
                                          gap-3.5
                                          py-4
                                          border-b
                                          border-black/[0.065]
                                        "
                                    >
                                      {/* ICON */}

                                      <span
                                        className="
                                            shrink-0
                                            w-9
                                            h-9
                                            rounded-xl
                                            flex
                                            items-center
                                            justify-center
                                            bg-[#12066a]/[0.045]
                                            border
                                            border-[#12066a]/[0.05]
                                            text-[#12066a]
                                            transition-all
                                            duration-300
                                            group-hover:bg-[#12066a]
                                            group-hover:text-white
                                            group-hover:border-[#12066a]
                                            group-hover:shadow-[0_6px_16px_rgba(18,6,106,0.16)]
                                          "
                                      >
                                        <Icon size={15} strokeWidth={1.6} />
                                      </span>

                                      {/* TEXT */}

                                      <span
                                        className="
                                            min-w-0
                                            flex-1
                                          "
                                      >
                                        <span
                                          className="
                                              flex
                                              items-center
                                              justify-between
                                              gap-2
                                            "
                                        >
                                          <span
                                            className="
                                                text-[11.5px]
                                                font-bold
                                                text-black/75
                                                group-hover:text-[#12066a]
                                                transition-colors
                                                duration-200
                                              "
                                          >
                                            {service.title}
                                          </span>

                                          <ArrowUpRight
                                            size={12}
                                            className="
                                                shrink-0
                                                text-[#997819]
                                                opacity-0
                                                -translate-x-1
                                                translate-y-1
                                                group-hover:opacity-100
                                                group-hover:translate-x-0
                                                group-hover:translate-y-0
                                                transition-all
                                                duration-250
                                              "
                                          />
                                        </span>

                                        <span
                                          className="
                                              block
                                              mt-1
                                              text-[11px]
                                              leading-[1.5]
                                              text-black/55
                                              group-hover:text-black/65
                                              transition-colors
                                            "
                                        >
                                          {service.description}
                                        </span>
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* BOTTOM NOTE */}

                              <div
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  gap-4
                                  pt-5
                                "
                              >
                                <span
                                  className="
                                    text-[8px]
                                    uppercase
                                    tracking-[0.15em]
                                    font-semibold
                                    text-black/25
                                  "
                                >
                                  Professional consultancy
                                </span>

                                <span
                                  className="
                                    flex
                                    items-center
                                    gap-1.5
                                    text-[8px]
                                    uppercase
                                    tracking-[0.12em]
                                    font-bold
                                    text-[#12066a]/50
                                  "
                                >
                                  UK wide support
                                  <span className="w-1 h-1 rounded-full bg-[#997819]" />
                                </span>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* REMAINING NAV */}

              <PremiumNavLink
                item={navigation[3]}
                isActive={pathname === navigation[3].href}
              />

              <PremiumNavLink
                item={navigation[4]}
                isActive={pathname === navigation[4].href}
              />

              <PremiumNavLink
                item={navigation[5]}
                isActive={pathname === navigation[5].href}
              />
            </div>
          </div>

          {/* =================================================
              CONTACT
          ================================================== */}

          <Link
            href="/contact-us"
            className="
              hidden
              xl:flex
              shrink-0
              group
              items-center
              gap-2
              h-[48px]
              px-5
              rounded-full
              bg-[#12066a]
              text-white
              transition-all
              duration-300
              hover:bg-[#997819]
              hover:shadow-[0_9px_28px_rgba(18,6,106,0.23)]
            "
          >
            <span
              className="
                text-[10.5px]
                font-bold
                uppercase
                tracking-[0.09em]
              "
            >
              Contact Us
            </span>

            <ArrowUpRight
              size={15}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </Link>

          {/* =================================================
              MOBILE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            className="
              xl:hidden
              shrink-0
              w-11
              h-11
              rounded-full
              flex
              items-center
              justify-center
              bg-[#12066a]/[0.06]
              text-[#12066a]
              transition-all
              duration-300
              hover:bg-[#12066a]
              hover:text-white
            "
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                z-[105]
                bg-[#12066a]/30
                backdrop-blur-sm
                xl:hidden
              "
              onClick={closeMobile}
            />

            {/* PANEL */}

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.38,
                ease,
              }}
              className="
                fixed
                top-0
                right-0
                bottom-0
                z-[110]
                w-full
                max-w-[430px]
                bg-[#faf9f7]
                overflow-y-auto
                xl:hidden
              "
            >
              {/* MOBILE HEADER */}

              <div
                className="
                  sticky
                  top-0
                  z-20
                  h-[76px]
                  px-6
                  flex
                  items-center
                  justify-between
                  bg-white/[0.96]
                  backdrop-blur-xl
                  border-b
                  border-black/[0.07]
                "
              >
                <Link href="/" onClick={closeMobile}>
                  <Image
                    src="/bizgrow_logo.png"
                    alt="BizGrow Holdings"
                    width={110}
                    height={40}
                    priority
                    className="w-auto h-[35px]"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeMobile}
                  className="
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-[#12066a]
                    text-white
                  "
                  aria-label="Close navigation"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 py-8">
                {/* INTRO */}

                <div className="mb-8">
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mb-3
                    "
                  >
                    <span className="w-5 h-px bg-[#997819]" />

                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.22em]
                        font-bold
                        text-[#997819]
                      "
                    >
                      Navigation
                    </span>
                  </div>

                  <h2
                    className="
                      text-3xl
                      font-semibold
                      tracking-[-0.045em]
                      leading-[1.05]
                      text-[#12066a]
                    "
                  >
                    Everything your
                    <br />
                    business needs.
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-[310px]
                      text-[11px]
                      leading-[1.65]
                      text-black/40
                    "
                  >
                    Specialist UK compliance and consultancy support for growing
                    businesses.
                  </p>
                </div>

                {/* FIRST THREE */}

                <div className="border-t border-black/[0.08]">
                  {navigation.slice(0, 3).map((item) => {
                    const Icon = item.icon;

                    return (
                      <MobileLink
                        key={item.href}
                        item={item}
                        Icon={Icon}
                        isActive={currentPath === normalizePath(item.href)}
                        onClick={closeMobile}
                      />
                    );
                  })}
                </div>

                {/* MOBILE SERVICES */}

                <div className="border-b border-black/[0.08]">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((current) => !current)}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      py-4
                    "
                  >
                    <span
                      className="
                        w-9
                        h-9
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        bg-[#12066a]
                        text-white
                      "
                    >
                      <BriefcaseBusiness size={16} strokeWidth={1.7} />
                    </span>

                    <span
                      className="
                        flex-1
                        text-left
                        text-[15px]
                        font-semibold
                        text-black/80
                      "
                    >
                      Services
                    </span>

                    <ChevronDown
                      size={17}
                      className={`
                        text-[#12066a]
                        transition-transform
                        duration-300
                        ${mobileServicesOpen ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.28,
                          ease,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4">
                          {categories.map((category, index) => {
                            const Icon = category.icon;

                            const isOpen = mobileActiveCategory === index;

                            return (
                              <div
                                key={category.id}
                                className="
                                    border-t
                                    border-black/[0.07]
                                  "
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMobileActiveCategory(
                                      isOpen ? null : index,
                                    )
                                  }
                                  className="
                                      w-full
                                      flex
                                      items-center
                                      gap-3
                                      rounded-xl
                                      px-2
                                      py-3
                                      text-left
                                      transition-colors duration-200
                                      hover:bg-black/[0.03]
                                    "
                                >
                                  <span
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        ${
                                          isOpen
                                            ? "bg-[#12066a] text-white"
                                            : "border border-[#997819]/25 bg-[#997819]/[0.10] text-[#12066a]"
                                        }
                                      `}
                                  >
                                    <Icon size={14} />
                                  </span>

                                  <span
                                    className="
                                        flex-1
                                            flex-1
                                            text-left
                                      "
                                      >
                                        <span className="block text-[14px] font-bold leading-tight text-black">
                                          {category.title}
                                        </span>
                                        <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.12em] text-[#997819]">
                                          {category.eyebrow}
                                        </span>
                                  </span>

                                  <ChevronDown
                                        size={17}
                                    className={`
                                        text-black/55
                                        transition-transform
                                        duration-300
                                        ${isOpen ? "rotate-180" : ""}
                                      `}
                                  />
                                </button>

                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{
                                        height: 0,
                                        opacity: 0,
                                      }}
                                      animate={{
                                        height: "auto",
                                        opacity: 1,
                                      }}
                                      exit={{
                                        height: 0,
                                        opacity: 0,
                                      }}
                                      transition={{
                                        duration: 0.25,
                                        ease,
                                      }}
                                      className="overflow-hidden"
                                    >
                                      <div
                                        className="
                                            ml-11
                                            mr-1
                                            pb-4
                                            space-y-1.5
                                          "
                                      >
                                        {category.services.map((service) => {
                                          const ServiceIcon = service.icon;

                                          return (
                                            <Link
                                              key={service.href}
                                              href={service.href}
                                              onClick={closeMobile}
                                              className="
                                                    group flex items-center gap-3
                                                    rounded-xl border border-[#12066a]/[0.12]
                                                    bg-[#faf9f7] px-3 py-2.5
                                                    text-[13px] text-black
                                                    shadow-[0_2px_10px_rgba(18,6,106,0.04)]
                                                    transition-all duration-200
                                                    hover:-translate-y-0.5 hover:border-[#997819]/30
                                                    hover:text-[#12066a] hover:shadow-[0_6px_16px_rgba(18,6,106,0.08)]
                                                  "
                                            >
                                              <span
                                                className="
                                                  flex h-8 w-8 shrink-0 items-center justify-center
                                                  rounded-lg border border-[#997819]/35 bg-[#997819]/[0.16] text-[#997819]
                                                  transition-colors duration-200
                                                  group-hover:bg-[#12066a] group-hover:text-white
                                                "
                                              >
                                                <ServiceIcon size={16} strokeWidth={2} />
                                              </span>

                                              <span className="flex-1 font-semibold leading-tight">
                                                {service.title}
                                              </span>

                                              <ArrowUpRight
                                                size={12}
                                                className="
                                                      shrink-0 text-black/45
                                                      transition-all duration-200
                                                      group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                                                      group-hover:text-[#997819]
                                                    "
                                              />
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}

                          <Link
                            href="/our-services"
                            onClick={closeMobile}
                            className="
                              mt-3
                              flex
                              items-center
                              justify-between
                              px-4
                              py-3.5
                              rounded-xl
                              bg-[#12066a]
                              text-white
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.1em]
                            "
                          >
                            View all services
                            <ArrowUpRight size={15} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* REMAINING NAV */}

                <div>
                  {navigation.slice(3).map((item) => {
                    const Icon = item.icon;

                    return (
                      <MobileLink
                        key={item.href}
                        item={item}
                        Icon={Icon}
                        isActive={currentPath === normalizePath(item.href)}
                        onClick={closeMobile}
                      />
                    );
                  })}
                </div>

                {/* CONTACT */}

                <Link
                  href="/contact-us"
                  onClick={closeMobile}
                  className="
                    group
                    mt-8
                    flex
                    items-center
                    justify-between
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    bg-[#12066a]
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#997819]
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                    "
                  >
                    Contact Us
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </Link>

                {/* MOBILE FOOTER DETAIL */}

                <div
                  className="
                    mt-8
                    pt-5
                    border-t
                    border-black/[0.07]
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.14em]
                      font-semibold
                      text-black/25
                    "
                  >
                    UK Compliance Consultancy
                  </span>

                  <span
                    className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#997819]
                    "
                  />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   DESKTOP NAV ITEM — Pinterest-style icon-top, active border/glow
========================================================= */

/* =========================================================
   DESKTOP NAV ITEM — Water-fill effect on active
========================================================= */

function PremiumNavLink({ item, isActive }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="
        group
        relative
        flex
        flex-col
        items-center
        justify-center
        gap-0.5
        h-[52px]
        min-w-[64px]
        px-4
        py-2
        rounded-full
        overflow-hidden
        transition-colors
        duration-300
      "
    >
      {/* Border appears only while hovering. */}
      <span
        className={`
          absolute
          inset-0
          rounded-full
          border-2
          transition-colors
          duration-300
          pointer-events-none
          z-20
          border-transparent group-hover:border-[#997819]/40
        `}
      />

      {/* Hover-only subtle tint */}
      <span
        className="
          absolute inset-0 rounded-full z-0
          bg-black/[0.03] opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Icon */}
      <span
        className={`
          relative
          z-10
          transition-all
          duration-300
          text-[#997819] group-hover:text-[#12066a]
        `}
      >
        <Icon
          size={19}
          strokeWidth={1.8}
          fill="none"
        />
      </span>

      {/* Label */}
      <span
        className={`
          relative
          z-10
          text-[9.5px]
          font-bold
          tracking-wide
          whitespace-nowrap
          transition-colors
          duration-300
          text-black/70 group-hover:text-[#12066a]/70
        `}
      >
        {item.label}
      </span>
    </Link>
  );
}
/* =========================================================
   MOBILE LINK
========================================================= */

function MobileLink({ item, Icon, isActive, onClick }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="
        group
        flex
        items-center
        gap-4
        py-4
        border-b
        border-black/[0.08]
      "
    >
      <span
        className={`
          w-9
          h-9
          rounded-xl
          flex
          items-center
          justify-center
          transition-all
          duration-300
          ${
            isActive
              ? "bg-[#12066a] text-white"
              : "bg-[#12066a]/[0.05] text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white"
          }
        `}
      >
        <Icon size={16} strokeWidth={1.7} />
      </span>

      <span
        className={`
          flex-1
          text-[15px]
          font-semibold
          transition-colors
          ${
            isActive
              ? "text-[#12066a]"
              : "text-black/75 group-hover:text-[#12066a]"
          }
        `}
      >
        {item.label}
      </span>

      <ChevronRight
        size={16}
        className="
          text-black/20
          group-hover:text-[#997819]
          group-hover:translate-x-0.5
          transition-all
        "
      />
    </Link>
  );
}

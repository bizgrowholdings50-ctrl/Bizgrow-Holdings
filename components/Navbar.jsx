"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import {
  ShieldCheck,
  Users,
  HardHat,
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
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  if (!mounted) return null;

  const services = [
    {
      title: "SIA ACS",
      description: "Approved Contractor Scheme consultancy for security firms.",
      href: "/our-services/sia-acs",
      icon: <ShieldCheck />,
    },
    {
      title: "COP 119",
      description: "Code of Practice for labour provision in security sectors.",
      href: "/our-services/cop-119-labour-provision",
      icon: <Users />,
    },
    {
      title: "SAFE CONTRACTOR",
      description: "Health & Safety accreditation for UK contractors.",
      href: "/our-services/safe-contractor",
      icon: <HardHat />,
    },
    {
      title: "ISO 9001",
      description: "Quality Management Systems for operational excellence.",
      href: "/our-services/iso-9001",
      icon: <Award />,
    },
    {
      title: "ISO 14001",
      description: "Environmental Management Standards for sustainable growth.",
      href: "/our-services/iso-14001",
      icon: <Leaf />,
    },
    {
      title: "ISO 45001",
      description: "Occupational Health and Safety management systems.",
      href: "/our-services/iso-45001",
      icon: <HeartPulse />,
    },
    {
      title: "ConstructionLine",
      description: "Gold & Silver membership audit support for construction.",
      href: "/our-services/constructionline",
      icon: <Construction />,
    },
    {
      title: "NASDU",
      description: "National Association of Security Dog Users compliance.",
      href: "/our-services/nasdu",
      icon: <Dog />,
    },
    {
      title: "SMAS",
      description: "Worksafe accreditation for SSIP H&S compliance.",
      href: "/our-services/smas-accreditation",
      icon: <Building2 />,
    },
    {
      title: "Cyber Essentials",
      description: "Basic protection against common cyber threats.",
      href: "/our-services/cyber-essentials",
      icon: <Lock />,
    },
    {
      title: "Cyber Essentials Plus",
      description: "Verified technical audit for enhanced cyber security.",
      href: "/our-services/cyber-essentials-plus",
      icon: <Fingerprint />,
    },
    {
      title: "CHAS SCHEME",
      description: "Contractors Health and Safety Assessment Scheme.",
      href: "/our-services/chas-scheme",
      icon: <FileCheck />,
    },
    {
      title: "BS 10800",
      description: "Standard for the provision of security services.",
      href: "/our-services/bs-10800",
      icon: <Globe />,
    },
    {
      title: "BS 7858",
      description: "Vetting and screening of personnel in security.",
      href: "/our-services/bs7858-screening-vetting",
      icon: <Search />,
    },
    {
      title: "BS 7499",
      description: "Static guarding and mobile patrol services code.",
      href: "/our-services/bs-7499",
      icon: <ShieldAlert />,
    },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about-us" },
    { label: "IT Solutions", href: "/it-services" },
  ];

  return (
    <nav className="fixed top-6 inset-x-0 mx-4 xl:mx-auto rounded-4xl max-w-7xl z-[100] bg-white/95 backdrop-blur-xl border border-[#12066a] shadow-[0_8px_30px_-8px_rgba(18,6,106,0.25)] mt-0 pt-0 transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex py-3 items-center justify-between">
          <Link href="/" className="transition-transform duration-300 hover:scale-[1.03]">
            <Image
              src="/bizgrow_logo.png"
              alt="BizGrow Holdings Logo"
              width={110}
              height={40}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden xl:flex items-center gap-10 text-sm font-semibold text-black">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 transition-colors duration-300 hover:text-[#997819]"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#997819] transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Link href="/our-services">
                <button
                  className="group relative flex items-center gap-1 py-1 text-black hover:text-[#997819] outline-none transition-colors duration-300"
                  aria-expanded={open}
                  aria-haspopup="true"
                >
                  Services
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#997819] transition-all duration-300 ease-out group-hover:w-full" />
                </button>
              </Link>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 w-[720px] rounded-2xl bg-white/98 backdrop-blur-xl border border-black/10 shadow-[0_25px_60px_-15px_rgba(18,6,106,0.35)] overflow-hidden"
                  >
                    {/* Subtle top accent */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-[#12066a] via-[#997819] to-[#12066a]" />

                    <div className="grid grid-cols-3 gap-2 p-4">
                      {services.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.02 }}
                        >
                          <Link
                            href={s.href}
                            className="group/item flex gap-4 p-3 rounded-xl hover:bg-[#12066a]/5 transition-colors duration-200"
                          >
                            <div className="shrink-0 w-9 h-9 rounded-lg bg-[#12066a]/8 text-[#12066a] flex items-center justify-center text-lg transition-all duration-300 group-hover/item:bg-[#12066a] group-hover/item:text-white group-hover/item:scale-110">
                              {s.icon}
                            </div>
                            <div>
                              <h4 className="text-black text-sm font-semibold group-hover/item:text-[#12066a] transition-colors duration-200">
                                {s.title}
                              </h4>
                              <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                                {s.description}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/training-moments"
              className="group relative py-1 transition-colors duration-300 hover:text-[#997819]"
            >
              Workshop Training
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#997819] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
            <Link
              href="/testimonials-reviews"
              className="group relative py-1 transition-colors duration-300 hover:text-[#997819]"
            >
              Testimonials
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#997819] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>

            <Link
              href="/blogs"
              className="group relative py-1 transition-colors duration-300 hover:text-[#997819]"
            >
              Blogs
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#997819] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </div>

          {/* THEME & MOBILE BUTTON */}
          <div className="flex items-center gap-4">
            <Link href="/contact-us" className="hidden md:block">
              <button className="group relative overflow-hidden text-white font-semibold border border-[#997819] bg-[#12066a] px-6 py-2.5 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-[#12066a]/30 active:scale-95">
                <span className="relative z-10">Contact Us</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </button>
            </Link>

            {/* Morphing hamburger / close icon */}
            <button
              aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden relative w-9 h-9 mx-2 flex items-center justify-center"
            >
              <span
                className={`absolute h-[2px] w-6 bg-black rounded-full transition-all duration-300 ${
                  mobileOpen ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-black rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-6 bg-black rounded-full transition-all duration-300 ${
                  mobileOpen ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 w-full h-screen bg-white z-[60] overflow-y-auto outline-none shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 sticky top-0 bg-[#12066a] z-10">
                <Image
                  src="/logo.webp"
                  alt="BizGrow Digital Logo"
                  width={100}
                  height={35}
                  style={{ width: "auto", height: "auto" }}
                />
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="relative w-9 h-9 flex items-center justify-center text-white transition-transform duration-300 hover:rotate-90"
                >
                  <span className="absolute h-[2px] w-6 bg-white rounded-full rotate-45" />
                  <span className="absolute h-[2px] w-6 bg-white rounded-full -rotate-45" />
                </button>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                }}
                className="px-6 py-8 pb-12 flex flex-col space-y-6"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between text-xl font-medium text-black py-1 transition-colors duration-200 hover:text-[#997819]"
                  >
                    Home
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </Link>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href="/about-us"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between text-xl font-medium text-black py-1 transition-colors duration-200 hover:text-[#997819]"
                  >
                    About
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </Link>
                </motion.div>

                {/* Services Section */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="space-y-4"
                >
                  <button
                    aria-label="Toggle services list"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex justify-between items-center text-xl font-medium text-black py-1"
                  >
                    Services
                    <span
                      className={`text-[#12066a] transition-transform duration-300 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col space-y-1 pl-4 border-l-2 border-[#12066a]/10"
                      >
                        {services.map((service, i) => (
                          <Link
                            key={i}
                            href={service.href}
                            onClick={() => setMobileOpen(false)}
                            className="group flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 transition-colors duration-200"
                          >
                            <div className="shrink-0 w-8 h-8 rounded-lg bg-[#12066a]/8 text-[#12066a] flex items-center justify-center text-base transition-all duration-300 group-hover:bg-[#12066a] group-hover:text-white">
                              {service.icon}
                            </div>
                            <span className="text-black text-base font-semibold group-hover:text-[#12066a] transition-colors duration-200">
                              {service.title}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href="/blogs"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between text-xl font-medium text-black py-1 transition-colors duration-200 hover:text-[#997819]"
                  >
                    Blogs
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </Link>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="pt-2"
                >
                  <Link
                    href="/contact-us"
                    onClick={() => setMobileOpen(false)}
                    className="group relative overflow-hidden flex items-center justify-center w-full text-white font-semibold border border-[#997819] bg-[#12066a] px-6 py-3.5 rounded-2xl transition-all duration-300 active:scale-95"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
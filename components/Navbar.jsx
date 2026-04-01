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

  return (
    // Nav tag ki classes mein ye change karein
    <nav className="fixed top-4 inset-x-0 mx-2 md:mx-auto rounded-2xl max-w-7xl z-[100] bg-white backdrop-blur-md border border-[#12066a] shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex py-3 items-center justify-between">
          <Link href="/">
            <Image
              src="/bizgrow_logo.png"
              alt="BizGrow Holdings Logo"
              width={110}
              height={40}
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-black">
            <Link href="/" className="hover:text-[#997819] transition">
              Home
            </Link>
            <Link href="/about-us" className="hover:text-[#997819] transition">
              About
            </Link>

            <Link
              href="/our-mission"
              className="hover:text-[#997819] transition"
            >
              Our Mission
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Link href="/our-services">
                <button
                  className=" flex items-center gap-1 text-black hover:text-[#997819] outline-none"
                  aria-expanded={open}
                  aria-haspopup="true"
                >
                  Services
                  <svg
                    className={`w-4 h-4 transition-transform ${
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
                </button>
              </Link>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 w-[720px] rounded-2xl bg-white  backdrop-blur-xl border border-black shadow-2xl"
                  >
                    <div className="grid grid-cols-3 gap-2 p-4">
                      {services.map((s, i) => (
                        <Link
                          key={i}
                          href={s.href}
                          className="group flex gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
                        >
                          <div className="text-[#12066a] text-lg mt-1">
                            {s.icon}
                          </div>
                          <div>
                            <h4 className="text-black text-sm font-semibold group-hover:text-[#12066a]">
                              {s.title}
                            </h4>
                            <p className="text-[10px] text-gray-500 leading-tight">
                              {s.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/training-moments"
              className="hover:text-[#997819]  transition"
            >
              Workshop Training 
            </Link>
            <Link
              href="/testimonials-reviews"
              className="hover:text-[#997819]  transition"
            >
              Testimonials
            </Link>

            <Link href="/blogs" className="hover:text-[#997819] transition">
              Blogs
            </Link>
          </div>

          {/* THEME & MOBILE BUTTON */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-white font-semibold border border-[#997819] bg-[#12066a] px-3 py-1.5 rounded-2xl">
              <Link href="/contact-us">Contact Us</Link>
            </button>
            <button
              aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-black text-2xl mx-4 p-2"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-screen bg-white z-[60] overflow-y-auto outline-none"
          >
            <div className="flex items-center justify-between  px-6 h-16 border-b border-white/10 sticky top-0 bg-[#12066a] z-10">
              <Image
                src="/logo.webp"
                alt="BizGrow Digital Logo"
                width={100}
                height={35}
              />
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-white text-3xl"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-8 pb-12 flex flex-col space-y-6">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-medium text-black"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-medium text-black"
              >
                About
              </Link>

              {/* Services Section */}
              <div className="space-y-4">
                <button
                  aria-label="Toggle services list"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex justify-between items-center text-xl font-medium text-black"
                >
                  Services
                  <span
                    className={`text-[#12066a] transition-transform ${
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
                      className="flex flex-col space-y-2 pl-4 border-l border-gray-200"
                    >
                      {services.map((service, i) => (
                        <Link
                          key={i}
                          href={service.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="text-[#12066a] text-lg">
                            {service.icon}
                          </div>
                          <span className="text-black text-base font-semibold">
                            {service.title}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/blogs"
                onClick={() => setMobileOpen(false)}
                className="text-xl font-medium text-black"
              >
                Blogs
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

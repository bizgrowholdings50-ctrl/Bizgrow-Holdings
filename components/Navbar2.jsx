"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Menu as MenuIcon, Facebook, Instagram, Linkedin, 
  ChevronDown, ShieldCheck, Globe, Lock, HardHat, FileCheck, Search, Users, Dog 
} from "lucide-react";
import Link from "next/link";

// 🔹 Services Data for Mega Menu
const megaMenuServices = [
  { 
    cat: "Security Standards", 
    items: [
      { t: "SIA ACS", d: "Approved Contractor Scheme", icon: <ShieldCheck size={18}/> },
      { t: "COP 119", d: "Labour provision in security", icon: <Users size={18}/> },
      { t: "NASDU", d: "Security Dog Users compliance", icon: <Dog size={18}/> },
      { t: "BS 10800", d: "Provision of security services", icon: <Globe size={18}/> },
    ]
  },
  { 
    cat: "ISO Certifications", 
    items: [
      { t: "ISO 9001", d: "Quality Management Systems", icon: <FileCheck size={18}/> },
      { t: "ISO 14001", d: "Environmental Standards", icon: <Globe size={18}/> },
      { t: "ISO 45001", d: "Health and Safety Systems", icon: <ShieldCheck size={18}/> },
    ]
  },
  { 
    cat: "Cyber & Compliance", 
    items: [
      { t: "Cyber Essentials", d: "Protection against cyber threats", icon: <Lock size={18}/> },
      { t: "Cyber Essentials Plus", d: "Verified technical audit", icon: <ShieldCheck size={18}/> },
      { t: "ConstructionLine", d: "Gold & Silver membership", icon: <HardHat size={18}/> },
      { t: "BS 7858", d: "Vetting & screening of personnel", icon: <Search size={18}/> },
    ]
  }
];

// 🔹 Navigation Links for Overlay Menu
const navLinks = [
  { title: "HOME", href: "/" },
  { title: "ABOUT US", href: "/about" },
  { title: "OUR MISSION", href: "/mission" },
  { title: "BLOGS", href: "/blogs" },
  { title: "CONTACT", href: "/contact" },
];

// 🔹 Animation Variants
const containerVariants = {
  open: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const linkVariants = {
  open: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  closed: { y: 20, opacity: 0 },
};

export default function Navbar2() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <>
      {/* 🔹 MAIN DESKTOP NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[80] bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          {/* Logo Placeholder */}
          <Link href="/" className="font-black text-2xl text-[#12066a] tracking-tighter">
            ICCS<span className="text-[#997819]">.</span>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.slice(0, 3).map((link) => (
              <Link key={link.title} href={link.href} className="font-bold text-sm text-[#12066a] hover:text-[#997819] transition-colors uppercase tracking-widest">
                {link.title}
              </Link>
            ))}

            {/* 🔹 Mega Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 font-bold text-sm text-[#12066a] hover:text-[#997819] transition-colors uppercase tracking-widest py-8">
                Services <ChevronDown size={14} className={`transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMegaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-[850px] bg-white rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-gray-100 p-10 z-[100]"
                  >
                    <div className="grid grid-cols-3 gap-10">
                      {megaMenuServices.map((group, idx) => (
                        <div key={idx} className="space-y-6">
                          <h4 className="text-[#997819] font-black text-[10px] uppercase tracking-[0.3em] border-b border-gray-100 pb-2">{group.cat}</h4>
                          <div className="space-y-4">
                            {group.items.map((item, i) => (
                              <Link key={i} href="#" className="flex items-start gap-3 group/item">
                                <div className="mt-0.5 p-1.5 rounded-lg bg-gray-50 text-[#12066a] group-hover/item:bg-[#12066a] group-hover/item:text-white transition-all">{item.icon}</div>
                                <div>
                                  <div className="font-bold text-[#12066a] text-[13px] group-hover/item:text-[#997819] transition-colors">{item.t}</div>
                                  <p className="text-[10px] text-gray-400 leading-tight">{item.d}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(3).map((link) => (
              <Link key={link.title} href={link.href} className="font-bold text-sm text-[#12066a] hover:text-[#997819] transition-colors uppercase tracking-widest">
                {link.title}
              </Link>
            ))}
          </div>

          {/* 🔹 Unique Menu Button (Trigger for Overlay) */}
          <button
            onClick={() => setIsOverlayOpen(true)}
            className="bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform shadow-lg group"
          >
            <span className="font-bold tracking-widest text-[10px] uppercase">MENU</span>
            <MenuIcon size={18} />
          </button>
        </div>
      </nav>

      {/* 🔹 FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] p-4 md:p-10 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black w-full max-w-5xl h-auto min-h-[550px] rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button onClick={() => setIsOverlayOpen(false)} className="absolute top-8 right-10 text-white flex items-center gap-3 hover:text-[#997819] transition-colors z-50">
                <span className="font-bold tracking-widest text-xs">CLOSE</span>
                <X size={24} />
              </button>

              {/* Left Section: Branding & Info */}
              <div className="flex-1 p-12 md:p-20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
                <div className="space-y-8">
                  <div className="text-[#997819] font-black text-3xl italic">ICCS.</div>
                  <div className="text-gray-400 text-xs uppercase tracking-[0.2em] space-y-4">
                    <p className="text-white font-bold tracking-widest">BIZGROW HOLDINGS LTD</p>
                    <p>London, United Kingdom</p>
                    <p className="text-[#997819]">info@iccs-uk.com</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-12">
                  {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-[#997819] transition-all cursor-pointer border border-white/10">
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Section: Animated Nav Links */}
              <div className="flex-1 p-12 md:p-20 flex flex-col justify-center bg-[#0a0a0a]">
                <motion.nav variants={containerVariants} initial="closed" animate="open" exit="closed" className="flex flex-col gap-6">
                  {navLinks.map((link, idx) => (
                    <motion.div key={idx} variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOverlayOpen(false)}
                        className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter hover:text-[#997819] transition-all duration-300"
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
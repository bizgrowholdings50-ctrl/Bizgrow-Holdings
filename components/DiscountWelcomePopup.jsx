"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const GOLD = "#997819";
const GOLD_LIGHT = "#d9b568";
const NAVY_DEEP = "#0c0546";

/* =========================================================
   POPUP ENTRANCE
========================================================= */

const containerVariants = {
  hidden: {
    y: 90,
    opacity: 0,
    scale: 0.94,
    filter: "blur(8px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    y: 45,
    opacity: 0,
    scale: 0.96,
    filter: "blur(6px)",
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const DiscountWelcomePopup = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isPopupHovered, setIsPopupHovered] = useState(false);
  
  // 180 = BACK, 0 = FRONT
  const [cardRotation, setCardRotation] = useState(180);
  const [introFinished, setIntroFinished] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const cardRef = useRef(null);

  /* =========================================================
     MOUSE TILT
  ========================================================= */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-40, 40], [7, -7]), {
    stiffness: 180,
    damping: 22,
    mass: 0.7,
  });

  const rotateY = useSpring(useTransform(mx, [-40, 40], [-7, 7]), {
    stiffness: 180,
    damping: 22,
    mass: 0.7,
  });

  const glareX = useTransform(mx, [-40, 40], [0, 100]);
  const glareY = useTransform(my, [-40, 40], [0, 100]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(280px circle at ${gx}% ${gy}%, ${GOLD}22, transparent 65%)`
  );

  /* =========================================================
     SHOW POPUP CHECK (ONLY EXCLUDED ROUTES ARE BLOCKED)
     NOTE: This should run only on the initial full page load, not
     on every Next.js client-side navigation.
  ========================================================= */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const excludedPages = [
      "/admin",
      "/admin/",
      "/auth",
      "/auth/",
      "/login",
      "/login/",
      "/signin",
      "/signin/",
      "/sign-in",
      "/sign-in/",
      "/signup",
      "/signup/",
      "/sign-up",
      "/sign-up/",
      "/onboarding",
      "/onboarding/",
      "/referral",
      "/referral/",
      "/referral-program",
      "/referral-program/",
      "/dashboard",
      "/dashboard/",
      "/client",
      "/client/",
      "/partner",
      "/partner/",
    ];

    const normalizedPath = pathname?.toLowerCase() || "";
    const isExcluded = excludedPages.some((route) => {
      const normalizedRoute = route.toLowerCase();
      return (
        normalizedPath === normalizedRoute ||
        normalizedPath.startsWith(`${normalizedRoute}/`)
      );
    });

    if (isExcluded) {
      setShowWelcomePopup(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 180) {
        setShowWelcomePopup(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (window.scrollY > 180) {
      setShowWelcomePopup(true);
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     CARD INTRO FLIP & NUMBER DELAY
  ========================================================= */
  useEffect(() => {
    if (!showWelcomePopup) return;

    setCardRotation(180);
    setIntroFinished(false);

    const flipTimer = setTimeout(() => {
      setCardRotation(0);
    }, 1000);

    const finishTimer = setTimeout(() => {
      setIntroFinished(true);
    }, 3500);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(finishTimer);
    };
  }, [showWelcomePopup]);

  /* =========================================================
     AUTO CLOSE AFTER INACTIVITY
  ========================================================= */
  useEffect(() => {
    if (!showWelcomePopup || isPopupHovered) return;

    const inactivityTimer = setTimeout(() => {
      setShowWelcomePopup(false);
    }, 6500);

    return () => clearTimeout(inactivityTimer);
  }, [showWelcomePopup, isPopupHovered]);

  /* =========================================================
     MOUSE MOVEMENT & CLOSE / NAVIGATION
  ========================================================= */
  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  const handlePointerLeave = () => {
    mx.set(0);
    my.set(0);
    setIsPopupHovered(false);
  };

  const dismissPopup = () => {
    setShowWelcomePopup(false);
  };

  const handleClosePopup = (e) => {
    e?.stopPropagation();
    dismissPopup();
  };

  // Front button (Detail Page)
  const handleLearnMoreNavigation = (e) => {
    e?.stopPropagation();
    dismissPopup();
    router.push("/discount-offers");
  };

  // Back button (Direct Claim Modal)
  const handleClaimNavigation = (e) => {
    e?.stopPropagation();
    dismissPopup();
    router.push("/discount-offers?openClaim=true");
  };

  const handleCardFlip = () => {
    if (!introFinished) return;
    setCardRotation((current) => (current === 0 ? 180 : 0));
  };

  return (
    <AnimatePresence>
      {showWelcomePopup && (
        <motion.div
          ref={cardRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onPointerMove={handlePointerMove}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setIsPopupHovered(true);
          }}
          onPointerLeave={handlePointerLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1400,
          }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-[420px] z-[10000]"
        >
          <div className="relative w-full" style={{ perspective: "1700px" }}>
            <motion.div
              initial={{ rotateY: 180 }}
              onClick={handleCardFlip}
              animate={{ rotateY: cardRotation }}
              transition={{
                duration: introFinished ? 0.8 : 2.2,
                ease: introFinished ? [0.16, 1, 0.3, 1] : [0.16, 1, 0.2, 1],
              }}
              className="relative w-full cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* ================= FRONT SIDE ================= */}
              <div
                className="relative w-full"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  pointerEvents: cardRotation === 0 ? "auto" : "none",
                }}
              >
                <div className="relative rounded-[2.2rem] p-[1.5px] overflow-hidden">
                  <div
                    className="absolute inset-0 animate-[spin_6s_linear_infinite]"
                    style={{
                      background: `conic-gradient(from 0deg, ${GOLD}, transparent 30%, ${GOLD} 60%, transparent 90%, ${GOLD})`,
                    }}
                  />
                  <div
                    className="relative rounded-[2.15rem] p-5 sm:p-6 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
                    style={{ backgroundColor: NAVY_DEEP }}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0.6 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                      className="absolute inset-0 rounded-[2.15rem] pointer-events-none"
                      style={{ border: `1px solid ${GOLD}` }}
                    />

                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: glareBackground }}
                    />

                    <div
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                      style={{ backgroundColor: `${GOLD}30` }}
                    />
                    <div
                      className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                      style={{ backgroundColor: "#12066a" }}
                    />

                    <span
                      className="absolute top-6 left-16 w-1 h-1 rounded-full animate-ping"
                      style={{ backgroundColor: GOLD }}
                    />
                    <span className="absolute top-14 left-28 w-1 h-1 bg-white/50 rounded-full animate-pulse" />

                    <motion.button
                      variants={itemVariants}
                      onClick={handleClosePopup}
                      aria-label="Close popup"
                      className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-[#997819] hover:text-[#0c0546] text-white/40 rounded-full transition-all duration-300 cursor-pointer z-20"
                    >
                      <X size={15} />
                    </motion.button>

                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div variants={itemVariants} className="relative shrink-0">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 0, 0.7],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-2xl border"
                          style={{ borderColor: `${GOLD}66` }}
                        />
                        <motion.div
                          initial={{ rotate: -25, scale: 0.5 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            delay: 0.65,
                            type: "spring",
                            stiffness: 300,
                            damping: 14,
                          }}
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${GOLD}40, ${GOLD}08)`,
                            border: `1px solid ${GOLD}55`,
                            color: GOLD_LIGHT,
                          }}
                        >
                          <Sparkles size={22} />
                        </motion.div>
                      </motion.div>

                      <div className="flex-1">
                        <motion.div
                          variants={itemVariants}
                          className="relative inline-block overflow-hidden mb-2"
                        >
                          <span
                            className="font-black uppercase tracking-[0.25em] text-[9px]"
                            style={{ color: GOLD_LIGHT }}
                          >
                            𝟏𝟏.𝟏𝟏 𝐒𝐀𝐋𝐄
                          </span>
                        </motion.div>

                        <motion.h3
                          variants={itemVariants}
                          className="text-lg sm:text-2xl font-black uppercase tracking-tight leading-[1.18] mb-2"
                        >
                          <span
                            className="block text-white"
                          >
                            BS 10119 &amp; ISO
                          </span>
                          <span className="block text-[#997819]">COMPLIANCE</span>
                          <span className="block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD_LIGHT}, #fff2a8)` }}>
                            SUPPORT, NOW 25% OFF!
                          </span>
                        </motion.h3>

                     

                        <motion.button
                          variants={itemVariants}
                          onClick={handleLearnMoreNavigation}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="relative inline-flex mt-3 items-center justify-center gap-2.5 py-3 px-7 font-black uppercase tracking-widest text-[11px] rounded-xl overflow-hidden group cursor-pointer"
                          style={{
                            backgroundColor: GOLD,
                            boxShadow: `0 10px 30px -8px ${GOLD}99`,
                          }}
                        >
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                          <span className="relative z-10 text-white">
                            Learn More Details
                          </span>
                          <ArrowRight
                            size={14}
                            className="relative z-10 group-hover:translate-x-1 text-white transition-transform duration-300"
                          />
                        </motion.button>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-6 text-[7px] uppercase tracking-[0.25em] text-white pointer-events-none">
                      Tap card to flip
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= BACK SIDE ================= */}
              <div
                className="absolute inset-0 w-full"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  pointerEvents: cardRotation === 180 ? "auto" : "none",
                }}
              >
                <div className="relative rounded-[2.2rem] p-[1.5px] overflow-hidden h-full">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD}, ${GOLD}40, ${GOLD}, ${GOLD_LIGHT})`,
                    }}
                  />
                  <div
                    className="relative h-full min-h-[220px] rounded-[2.15rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
                    style={{
                      background: `
                        radial-gradient(circle at 20% 20%, ${GOLD}16, transparent 30%),
                        radial-gradient(circle at 85% 80%, #12066a 0%, transparent 35%),
                        ${NAVY_DEEP}
                      `,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.035]"
                      style={{
                        backgroundImage: `
                          linear-gradient(${GOLD} 1px, transparent 1px),
                          linear-gradient(90deg, ${GOLD} 1px, transparent 1px)
                        `,
                        backgroundSize: "22px 22px",
                      }}
                    />
                    <div
                      className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl"
                      style={{ backgroundColor: `${GOLD}18` }}
                    />
                    <div className="relative z-10 h-full min-h-[220px] flex flex-col justify-between p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{
                              border: `1px solid ${GOLD}66`,
                              background: `${GOLD}12`,
                            }}
                          >
                            <ShieldCheck
                              size={18}
                              style={{ color: GOLD_LIGHT }}
                            />
                          </div>
                          <div>
                            <p
                              className="text-[10px] font-black uppercase tracking-[0.25em]"
                              style={{ color: GOLD_LIGHT }}
                            >
                              BizGrow Holdings
                            </p>
                            <p className="text-[7px] uppercase tracking-[0.2em] text-white/90 mt-0.5">
                              Compliance Specialists
                            </p>
                          </div>
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.25em] text-[#997819] font-bold">
                          Premium Offer
                        </span>
                      </div>
                      <div className="py-4">
                        <div
                          className="h-[1px] w-full"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#997819] mb-2">
                          𝟏𝟏.𝟏𝟏 𝐒𝐀𝐋𝐄
                        </p>
                        <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight leading-[1.18]">
                          <span className="block text-white">BS 10119 &amp; ISO COMPLIANCE</span>
                          
                          <span
                            className="block bg-clip-text text-transparent"
                            style={{
                              backgroundImage: `linear-gradient(90deg, ${GOLD_LIGHT}, #fff2a8)`,
                            }}
                          >
                            SUPPORT, NOW 25% OFF!
                          </span>
                        </h3>
                        <div className="mt-3 max-w-md text-xs text-white/70 leading-relaxed">
                        
                          
                         
                        </div>
                      </div>

                      <div className="mt-0">
                        <motion.button
                          onClick={handleClaimNavigation}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black uppercase tracking-widest text-[11px] transition-colors duration-300 cursor-pointer"
                          style={{
                            backgroundColor: GOLD_LIGHT,
                            color: NAVY_DEEP,
                            boxShadow: `0 8px 20px -8px ${GOLD}99`,
                          }}
                        >
                          Claim Discount Now
                          <ArrowRight size={14} />
                        </motion.button>

                    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <style jsx>{`
            @keyframes goldShift {
              0% {
                background-position: 0% center;
              }
              100% {
                background-position: 200% center;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscountWelcomePopup;
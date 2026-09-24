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
   COUNT UP
========================================================= */

function useCountUp(target, start, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf;
    let startTime;

    const tick = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min(1, (t - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

const DiscountWelcomePopup = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [numberStarted, setNumberStarted] = useState(false);
  
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

    const countTimer = setTimeout(() => {
      setNumberStarted(true);
    }, 2200);

    const finishTimer = setTimeout(() => {
      setIntroFinished(true);
    }, 3500);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(countTimer);
      clearTimeout(finishTimer);
    };
  }, [showWelcomePopup]);

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

  const percent = useCountUp(25, numberStarted, 1000);

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
          onPointerLeave={handlePointerLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1400,
          }}
          className="fixed bottom-6 right-6 left-6 sm:left-auto sm:max-w-md z-[10000]"
        >
          <div className="relative w-full" style={{ perspective: "1800px" }}>
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
                    className="relative rounded-[2.15rem] p-6 sm:p-8 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
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
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
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
                            Limited Discount Offer!
                          </span>
                        </motion.div>

                        <motion.h3
                          variants={itemVariants}
                          className="text-lg sm:text-2xl font-black uppercase tracking-tight leading-snug mb-2 text-white"
                        >
                          Get{" "}
                          <span
                            className="bg-clip-text text-transparent bg-[length:200%_auto] animate-[goldShift_4s_linear_infinite]"
                            style={{
                              backgroundImage: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_LIGHT})`,
                            }}
                          >
                            {percent}% Off
                          </span>{" "}
                          Compliance Bundles
                        </motion.h3>

                        <motion.p
                          variants={itemVariants}
                          className="text-white/50 text-xs sm:text-sm font-medium leading-relaxed mb-6"
                        >
                          Save on Health & Safety Compliance Bundles. Get
                          SSIP-ready with{" "}
                          <span className="text-[#997819] font-bold">CHAS</span>
                          ,{" "}
                          <span className="text-[#997819] font-bold">SMAS</span>
                          ,{" "}
                          <span className="text-[#997819] font-bold">
                            SafeContractor
                          </span>{" "}
                          &{" "}
                          <span className="text-[#997819] font-bold">
                            Constructionline
                          </span>
                          .
                        </motion.p>

                        <motion.button
                          variants={itemVariants}
                          onClick={handleLearnMoreNavigation}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="relative inline-flex items-center justify-center gap-2.5 py-3.5 px-7 font-black uppercase tracking-widest text-[11px] rounded-xl overflow-hidden group cursor-pointer"
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
                    className="relative h-full min-h-[250px] rounded-[2.15rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
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
                    <div className="relative z-10 h-full min-h-[250px] flex flex-col justify-between p-7 sm:p-8">
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
                      <div className="flex items-end justify-between gap-6">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#997819] mb-2">
                            Exclusive
                          </p>
                          <p className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                            Compliance
                          </p>
                          <p
                            className="text-xl sm:text-2xl font-black uppercase tracking-tight"
                            style={{ color: GOLD_LIGHT }}
                          >
                            Savings
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className="text-4xl font-black leading-none"
                            style={{ color: GOLD_LIGHT }}
                          >
                            25%
                          </div>
                          <p className="text-[11px] uppercase tracking-[0.25em] font-black text-[#997819] mt-1">
                            Discount
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <motion.button
                          onClick={handleClaimNavigation}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 py-3 mb-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-colors duration-300 cursor-pointer"
                          style={{
                            backgroundColor: GOLD_LIGHT,
                            color: NAVY_DEEP,
                            boxShadow: `0 8px 20px -8px ${GOLD}99`,
                          }}
                        >
                          Claim Discount Now
                          <ArrowRight size={14} />
                        </motion.button>

                        <div className="flex items-center justify-between">
                          <span className="text-[8px] uppercase tracking-[0.2em] text-white/60">
                            Tap card to flip back
                          </span>
                          <span
                            className="text-[9px] uppercase tracking-[0.2em]"
                            style={{ color: `${GOLD_LIGHT}` }}
                          >
                            BizGrow
                          </span>
                        </div>
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
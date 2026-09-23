"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
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

const containerVariants = {
  hidden: {
    y: 160,
    opacity: 0,
    scale: 0.82,
    rotateX: -18,
    filter: "blur(12px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20,
      mass: 0.9,
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
  exit: {
    y: 60,
    opacity: 0,
    scale: 0.9,
    filter: "blur(6px)",
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants = {
  hidden: { y: 22, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

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
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

const DiscountWelcomePopup = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [numberStarted, setNumberStarted] = useState(false);
  const router = useRouter();
  const cardRef = useRef(null);

  // 3D tilt + glare, driven by pointer position relative to the card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-40, 40], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-40, 40], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });
  const glareX = useTransform(mx, [-40, 40], [0, 100]);
  const glareY = useTransform(my, [-40, 40], [0, 100]);
  const glareBackground = useTransform([glareX, glareY], ([gx, gy]) =>
    `radial-gradient(280px circle at ${gx}% ${gy}%, ${GOLD}22, transparent 65%)`
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcomePopup(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showWelcomePopup) return;
    const t = setTimeout(() => setNumberStarted(true), 550);
    return () => clearTimeout(t);
  }, [showWelcomePopup]);

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

  const handleClosePopup = () => setShowWelcomePopup(false);
  const handleClaimNavigation = () => {
    setShowWelcomePopup(false);
    router.push("/discount-offers");
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
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="fixed bottom-6 right-6 left-6 sm:left-auto sm:max-w-md z-[10000]"
        >
          <div className="relative rounded-[2.2rem] p-[1.5px] overflow-hidden">
            {/* Rotating gold border */}
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
              {/* One-time entrance shockwave */}
              <motion.div
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="absolute inset-0 rounded-[2.15rem] pointer-events-none"
                style={{ border: `1px solid ${GOLD}` }}
              />

              {/* Cursor-tied glare */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ background: glareBackground }}
              />

              {/* Ambient glow blobs */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: `${GOLD}30` }}
              />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#12066a] rounded-full blur-3xl pointer-events-none" />

              {/* Floating sparkle particles */}
              <span
                className="absolute top-6 left-16 w-1 h-1 rounded-full animate-ping"
                style={{ backgroundColor: GOLD }}
              />
              <span className="absolute top-14 left-28 w-1 h-1 bg-white/50 rounded-full animate-pulse" />

              {/* Close button */}
              <motion.button
                variants={itemVariants}
                onClick={handleClosePopup}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-[#997819] hover:text-[#0c0546] text-white/40 rounded-full transition-all duration-300 cursor-pointer z-20"
              >
                <X size={15} />
              </motion.button>

              <div className="flex items-start gap-4 relative z-10">
                {/* Icon: pulse ring + spring pop-in */}
                <motion.div variants={itemVariants} className="relative shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
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
                      delay: 0.4,
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
                  {/* Shimmer tag */}
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

                  {/* Headline with count-up number */}
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
                  Save on Health & Safety Compliance Bundles. Get SSIP-ready with CHAS, SMAS, SafeContractor & Constructionline.
                  </motion.p>

                  {/* CTA: shine sweep + hover lift + tap feedback */}
                  <motion.button
                    variants={itemVariants}
                    onClick={handleClaimNavigation}
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
            </div>
          </div>

          <style jsx>{`
            @keyframes shimmer {
              100% {
                transform: translateX(100%);
              }
            }
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
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

/* =========================================================
   WATER-FILL NAV ITEM
   Liquid rises from bottom with a wavy top edge when
   active. Wave keeps gently animating while filled.
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
      {/* Static border, always same shape, just color shifts */}
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
          ${
            isActive
              ? "border-[#997819]"
              : "border-transparent group-hover:border-[#997819]/40"
          }
        `}
      />

      {/* ===== WATER FILL LAYER ===== */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-0 pointer-events-none"
        initial={false}
        animate={{
          height: isActive ? "100%" : "0%",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden" }}
      >
        {/* Wave SVG sits at the top edge of the fill, animates sideways */}
        <motion.div
          className="absolute left-0 right-0"
          style={{ top: -14, height: 20 }}
          animate={{ x: isActive ? [0, -60, 0] : 0 }}
          transition={{
            duration: 3.5,
            ease: "linear",
            repeat: isActive ? Infinity : 0,
          }}
        >
          <svg
            width="200%"
            height="20"
            viewBox="0 0 240 20"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path
              d="M0 10 Q 15 0 30 10 T 60 10 T 90 10 T 120 10 T 150 10 T 180 10 T 210 10 T 240 10 V20 H0 Z"
              fill="rgba(153,120,25,0.14)"
            />
          </svg>
        </motion.div>

        {/* Solid fill body beneath the wave */}
        <div
          className="absolute inset-x-0 bottom-0 top-[6px]"
          style={{ background: "rgba(153,120,25,0.10)" }}
        />
      </motion.div>

      {/* Hover-only subtle tint (before active fill takes over) */}
      {!isActive && (
        <span
          className="
            absolute inset-0 rounded-full z-0
            bg-black/[0.03] opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
          "
        />
      )}

      {/* Icon */}
      <span
        className={`
          relative
          z-10
          transition-all
          duration-300
          ${
            isActive
              ? "text-[#997819]"
              : "text-black/40 group-hover:text-[#12066a]"
          }
        `}
      >
        <Icon
          size={19}
          strokeWidth={isActive ? 2.4 : 1.8}
          fill={isActive ? "currentColor" : "none"}
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
          ${
            isActive
              ? "text-[#12066a]"
              : "text-black/40 group-hover:text-[#12066a]/70"
          }
        `}
      >
        {item.label}
      </span>
    </Link>
  );
}

export default PremiumNavLink;
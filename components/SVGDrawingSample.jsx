"use client";
import React from "react";
import { motion } from "framer-motion";

const SVGDrawingSample = () => {
  // SVG path animation variants
  const pathVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0 
    },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 2.5, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-[#0c0546] rounded-[2rem] border border-[#997819]/30 shadow-2xl">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#997819"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-24 h-24 mb-4"
      >
        {/* Example: A Shield Icon Path */}
        <motion.path
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        />
      </motion.svg>

      <span className="text-white/80 font-black uppercase tracking-[0.25em] text-[10px]">
        Cinematic Line-Art Drawing
      </span>
    </div>
  );
};

export default SVGDrawingSample;
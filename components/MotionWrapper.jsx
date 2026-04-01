"use client";

import { motion } from "framer-motion";

export default function FadeIn({ children, delay = 0, direction = "up", duration = 0.5, className = "" }) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <div className={`w-full overflow-x-clip ${className}`}> 
      <motion.div
        className="h-full w-full"
        initial={{ 
          opacity: 0, 
          x: directions[direction].x, 
          y: directions[direction].y 
        }}
        whileInView={{ 
          opacity: 1, 
          x: 0, 
          y: 0 
        }}
        // 🔹 once: false (Reverse scroll par bhi chalega)
        // 🔹 margin: "-10%" (Screen ke 10% andar aate hi trigger hoga)
        // 🔹 amount: "some" (Ye sab se best hai bade contents ke liye)
        viewport={{ once: false, margin: "-10%", amount: "some" }}
        transition={{ 
          duration: duration, 
          delay: delay, 
          ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic-bezier for smoother feel
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
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
        // 🔹 CHANGE: once ko false kar diya taake har baar view hone par trigger ho
        // 🔹 TIP: amount: 0.2 add kiya hai taake jab card 20% nazar aaye tabhi animation start ho (ziyada smooth lagta hai)
        viewport={{ once: false, margin: "-50px", amount: 0.2 }}
        transition={{ 
          duration: duration, 
          delay: delay, 
          ease: "easeOut" 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
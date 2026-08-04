"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const cursorRefs = useRef({ dot: null, ring: null });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    cursorRefs.current = { dot: dotRef.current, ring: ringRef.current };
    const { dot, ring } = cursorRefs.current;

    const xDotSetter = gsap.quickSetter(dot, "x", "px");
    const yDotSetter = gsap.quickSetter(dot, "y", "px");
    const xRingSetter = gsap.quickSetter(ring, "x", "px");
    const yRingSetter = gsap.quickSetter(ring, "y", "px");

    let isHidden = false;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Smooth movement
      xDotSetter(clientX);
      yDotSetter(clientY);
      gsap.to(ring, { x: clientX, y: clientY, duration: 0.5, ease: "power3.out" });

      // TEXT DETECTION (Heading & Paragraph focused)
      const target = document.elementFromPoint(clientX, clientY);
      
      // Sirf text elements par hide hoga
      const isText = target?.matches('h1, h2, h3, h4, h5, h6, p, span, li, a');

      if (isText && !isHidden) {
        isHidden = true;
        gsap.to([dot, ring], { opacity: 0, duration: 0.3, ease: "power2.out" });
      } else if (!isText && isHidden) {
        isHidden = false;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* 🔹 Will-change property se performance best ho jati hai */}
      <div
        ref={dotRef}
        className="hidden lg:block fixed top-0 left-0 w-2 h-2 bg-[#997819] rounded-full pointer-events-none z-[10000] will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="hidden lg:block fixed top-0 left-0 w-7 h-7 border-2 border-[#997819] rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
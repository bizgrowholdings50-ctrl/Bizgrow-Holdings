"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    // 🔹 QuickSetter for Performance (Better than gsap.to in mousemove)
    const xDotSetter = gsap.quickSetter(dot, "x", "px");
    const yDotSetter = gsap.quickSetter(dot, "y", "px");
    const xRingSetter = gsap.quickSetter(ring, "x", "px");
    const yRingSetter = gsap.quickSetter(ring, "y", "px");

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Dot - Instant follow
      xDotSetter(clientX);
      yDotSetter(clientY);

      // Ring - Smooth follow with Lag
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onMouseEnter = () => {
      setIsHovering(true);
      gsap.to(ring, { 
        scale: 2.5, 
        backgroundColor: "rgba(153, 120, 25, 0.1)", // Light Gold tint
        borderColor: "transparent",
        duration: 0.3 
      });
      gsap.to(dot, { scale: 0, duration: 0.2 }); // Dot chupa dein
    };

    const onMouseLeave = () => {
      setIsHovering(false);
      gsap.to(ring, { 
        scale: 1, 
        backgroundColor: "transparent", 
        borderColor: "#997819", 
        duration: 0.3 
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", moveCursor);

    // Target links, buttons and our custom 'View' areas
    const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, .project-card');
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Small Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#997819] rounded-full pointer-events-none z-[10000] "
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Main Interactive Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 border-2 border-[#997819] rounded-full pointer-events-none z-[9999] flex items-center justify-center "
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* Ring ke andar agar text dikhana ho (e.g. View) */}
        {isHovering && (
           <span className="text-[4px] font-black text-white uppercase tracking-tighter">View</span>
        )}
      </div>
    </>
  );
}
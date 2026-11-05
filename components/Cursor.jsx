"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function CustomCursor() {
  const pathname = usePathname();

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isScorecardPage = normalizedPath === "/scorecard" || normalizedPath.startsWith("/scorecard/");

  useEffect(() => {
    // /scorecard/ jaise trailing-slash URLs par bhi custom cursor disable rahega
    if (isScorecardPage) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDotSetter = gsap.quickSetter(dot, "x", "px");
    const yDotSetter = gsap.quickSetter(dot, "y", "px");

    let isHidden = false;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      xDotSetter(clientX);
      yDotSetter(clientY);
      gsap.to(ring, { x: clientX, y: clientY, duration: 0.5, ease: "power3.out" });

      const target = document.elementFromPoint(clientX, clientY);
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
  }, [pathname, isScorecardPage]);

  // Scorecard page aur uske nested URLs par cursor elements render nahi honge
  if (isScorecardPage) {
    return null;
  }

  return (
    <>
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
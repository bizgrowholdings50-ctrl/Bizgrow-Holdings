// components/CinematicTransition.jsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function CinematicTransition({
  title = "BizGrow",
  subtitle = "",
  bgImage,
  bgVideo,
  onComplete,
}) {
  const containerRef = useRef(null);
  const maskTextRef = useRef(null);

  // 🔹 Dynamic Font-Size Logic (Character count ke hisab se text fit hoga)
  const fullText = `${title} ${subtitle}`.trim();

  const getFontSize = (text) => {
    const len = text.length;
    if (len > 30) return "50";
    if (len > 22) return "65";
    if (len > 16) return "80";
    if (len > 12) return "95";
    return "110";
  };

  const calculatedFontSize = getFontSize(fullText);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    gsap.set(containerRef.current, { opacity: 1, display: "block" });

    // Exact original setup & animation (No positional changes)
    gsap.set(maskTextRef.current, {
      transformOrigin: "50% 50%",
      scale: 0.7,
      opacity: 1,
    });

    tl.to(maskTextRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    })
      .to({}, { duration: 0.1 })
      .to(maskTextRef.current, {
        scale: 50,
        duration: 0.7,
        ease: "power3.inOut",
      })
      .set(containerRef.current, { opacity: 0, display: "none" });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
      // 🔹 JERK FIX: reload/first-paint par overlay default HIDDEN rahega (opacity 0),
      // jab tak JS (useLayoutEffect) synchronously ise "opacity:1" na kar de.
      // Animation ka koi step/value/origin nahi chera — sirf visibility gate hai.
      style={{ opacity: 0 }}
    >
      <svg
        viewBox="0 0 1600 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <mask
            id="wordRevealMask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1600"
            height="500"
          >
            {/* White area = Dark Blue Overlay visible */}
            <rect x="0" y="0" width="1600" height="500" fill="white" />

            {/* Pure Black Text = Pure Cutout Hole (Auto Dynamic Font Size) */}
            <text
              ref={maskTextRef}
              x="800"
              y="280"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="900"
              fontSize={calculatedFontSize}
              letterSpacing="-2"
              fill="black"
              style={{ textTransform: "uppercase" }}
            >
              {fullText}
            </text>
          </mask>
        </defs>

        {/* 🔹 Base Layer: Whole Screen Par Mild White Lighting Tint */}
        <rect x="0" y="0" width="1600" height="500" fill="#ffffff" fillOpacity="0.25" />

        {/* Masked Blue Overlay */}
        <g mask="url(#wordRevealMask)">
          {bgVideo && (
            <foreignObject x="0" y="0" width="1600" height="500">
              <video
                xmlns="http://www.w3.org/1999/xhtml"
                src={bgVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.5)" }}
              />
            </foreignObject>
          )}
          {bgImage && (
            <image
              href={bgImage}
              x="0"
              y="0"
              width="1600"
              height="500"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: "brightness(0.5)" }}
            />
          )}
          <rect
            x="0"
            y="0"
            width="1600"
            height="500"
            fill="#12066a"
            fillOpacity={bgImage || bgVideo ? 0.7 : 0.95}
          />
        </g>
      </svg>
    </div>
  );
}
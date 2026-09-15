// components/CinematicTransition.jsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CinematicTransition({
  title = "BizGrow",
  subtitle = "Holdings",
  bgImage,
  bgVideo,
  onComplete,
}) {
  const containerRef = useRef(null);
  const maskTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    gsap.set(containerRef.current, { opacity: 1, display: "block" });

    // Text cutout start se hi opacity: 1 rahega taake peeche wala page foran visible rahe
    gsap.set(maskTextRef.current, {
      transformOrigin: "50% 50%",
      scale: 0.7,
      opacity: 1,
    });

    tl.to(maskTextRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    })
      .to({}, { duration: 0.1 })
      // Zoom through hole — smoothly reveals the page behind
      .to(maskTextRef.current, {
        scale: 50,
        duration: 0.8,
        ease: "power3.inOut",
      })
      .set(containerRef.current, { opacity: 0, display: "none" });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
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
            {/* White area = Overlay visible | Black text = Transparent hole showing page behind */}
            <rect x="0" y="0" width="1600" height="500" fill="white" />
            <text
              ref={maskTextRef}
              x="800"
              y="280"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="900"
              fontSize="100"
              letterSpacing="-4"
              fill="black"
              stroke="white"      
              strokeWidth="4"     
              style={{ textTransform: "uppercase" }}
            >
              {title} {subtitle}
            </text>
          </mask>
        </defs>

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
              style={{ filter: "brightness(0.2)" }}
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
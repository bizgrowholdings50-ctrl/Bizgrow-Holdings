// components/CinematicTransition.jsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CinematicTransition({
  title = "BizGrow",
  subtitle = "Holdings",
  bgImage,
  onComplete,
}) {
  const containerRef = useRef(null);
  const wordRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    gsap.set(wordRef.current, {
      scale: 0.5,
      opacity: 0,
    });

    gsap.set(containerRef.current, {
      opacity: 1,
    });

    if (bgRef.current) {
      gsap.set(bgRef.current, {
        scale: 1.1,
        opacity: 0.5,
      });
    }

    tl.to(wordRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })

      .to(wordRef.current, {
        scale: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut",
      })
      .to(
        bgRef.current,
        {
          scale: 1.05,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        },
        "<0.15",
      )
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#12066a] overflow-hidden pointer-events-none"
    >
      {bgImage && (
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center brightness-50 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />
      )}

      <div className="absolute inset-0 bg-[#12066a]/40 z-[1]" />

      <div className="relative z-10 flex items-center justify-center text-center px-4">
        <h1
          ref={wordRef}
          className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase select-none drop-shadow-2xl"
        >
          {title} <span className="text-[#997819]">{subtitle}</span>
        </h1>
      </div>
    </div>
  );
}

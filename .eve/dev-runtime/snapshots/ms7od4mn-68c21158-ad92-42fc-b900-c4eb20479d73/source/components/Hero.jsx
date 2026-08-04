"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-[65vh] md:h-[100dvh] w-full overflow-hidden bg-[#12066a]">
      {/* Video Container */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          // 🚀 FIX: 'object-contain' use karne se video kategi nahi, puri fit aayegi.
          // 'bg-black' ya 'bg-[#12066a]' add karein taake edges empty na lagun.
          className="h-full w-full object-contain md:object-cover bg-[#12066a]"
        >
          <source src="/video/hero-vid.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay - Isko thora clean rakha hai taake video nazar aaye */}
      <div className="absolute inset-0 z-10 bg-[#12066a]/40 md:bg-[#12066a]/30 backdrop-blur-[0px]" />

      {/* Content Area - Khali rakha hai jaisa aapne kaha */}
      <div className="relative z-20 flex h-full items-center justify-center">
        {/* Agar yahan kuch nahi likhna toh ye section empty rahay ga */}
      </div>
    </section>
  );
};

export default HeroSection;

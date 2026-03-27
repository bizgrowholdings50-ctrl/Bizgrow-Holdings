"use client"; // <--- Ye line lazmi add karein

import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#12066a]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        // Ab ye function error nahi dega
        onError={(e) => console.error("Video path issue or format not supported", e)}
      >
        <source src="/video/hero-vid.mp4" type="video/mp4" />
        <img src="/h.png" alt="Fallback" className="h-full w-full object-cover" />
      </video>

      {/* Overlay aur Content */}
      <div className="absolute inset-0 z-10 bg-[#12066a]/70 backdrop-blur-[1px]" />

      <div className="relative z-20 flex h-full items-center justify-center">
       
      </div>
    </section>
  );
};

export default HeroSection;
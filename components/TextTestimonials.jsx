"use client";
import React from "react";

const TestimonialGrid = () => {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Heading Section --- */}
        <div className="mb-12 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <span className="h-[2px] w-12 bg-[#997819]" />
            <span className="text-[#997819] font-bold text-xs uppercase tracking-[0.4em]">
              Testimonials
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-[#12066a] uppercase tracking-tighter leading-tight">
            Trusted <span className="text-[#997819]">Partnerships</span>
          </h2>
        </div>

        {/* --- Endorsal Widget Area --- */}
        <div className="w-full min-h-[400px] flex items-center justify-center">
          <div 
            id="ndrsl-69ea3a3db6d2e62a3435f8b3" 
            className="ndrsl-widget w-full"
          ></div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialGrid;
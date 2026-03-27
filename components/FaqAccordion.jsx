"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import FadeIn from "@/components/MotionWrapper";

const FaqAccordion = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex flex-col gap-4">
      {faqData.map((faq, index) => {
        const isActive = activeIndex === index;
        return (
          <FadeIn key={index} direction="up" delay={index * 0.05}>
            <div 
              className={`transition-all duration-500 rounded-[2rem] border overflow-hidden ${
                isActive 
                ? 'bg-[#12066a] border-[#997819] shadow-2xl scale-[1.01]' 
                : 'bg-white border-zinc-200 hover:border-[#997819]/50 shadow-sm'
              }`}
            >
              <button 
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left outline-none"
              >
                <span className={`text-xs md:text-sm font-black uppercase tracking-widest transition-colors duration-300 leading-tight ${
                  isActive ? 'text-white' : 'text-[#12066a]'
                }`}>
                  {faq.q}
                </span>
                <div className={`shrink-0 ml-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  isActive ? 'bg-[#997819] text-white rotate-180 shadow-[0_0_20px_rgba(153,120,25,0.4)]' : 'bg-zinc-100 text-[#12066a]'
                }`}>
                  {isActive ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8">
                  <div className="pt-6 border-t border-white/10">
                    <p className={`text-sm md:text-base leading-relaxed font-medium ${isActive ? 'text-blue-100/70' : 'text-zinc-500'}`}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
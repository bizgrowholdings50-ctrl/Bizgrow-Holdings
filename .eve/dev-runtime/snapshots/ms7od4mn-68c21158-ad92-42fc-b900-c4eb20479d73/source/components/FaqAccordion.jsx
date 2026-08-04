"use client";
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Award, Shield, ShieldAlert, BadgeCheck } from 'lucide-react';
import FadeIn from "@/components/MotionWrapper";


// Premium Categories configuration explicitly matching your questions
const categories = [
  { id: "all", name: "All Questions", icon: HelpCircle },
  { id: "iso", name: "ISO Standards & Audits", icon: Award },
  { id: "sia-acs", name: "SIA ACS & BS Standards", icon: Shield }, // Relevant to your exact questions
  { id: "ssip-health", name: "CHAS, SMAS & SSIP", icon: ShieldAlert }, // Grouped by scheme type
  { id: "compliance", name: "Cyber & Labour Compliance", icon: BadgeCheck },
];
const FaqAccordion = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Dynamic Client-side Filtering Mapped precisely to New FAQ Data
  const filteredFaqData = faqData.filter((faq) => {
    if (activeCategory === "all") return true;
    const questionText = faq.q.toLowerCase();

    if (activeCategory === "iso") {
      return questionText.includes("iso") || questionText.includes("audit");
    }
    
    if (activeCategory === "security") {
      return (
        questionText.includes("security") ||
        questionText.includes("dog") ||
        questionText.includes("nasdu") ||
        questionText.includes("acs") ||
        questionText.includes("bs ") ||
        questionText.includes("screening") ||
        questionText.includes("vetting")
      );
    }
    
    if (activeCategory === "health") {
      return (
        questionText.includes("smas") ||
        questionText.includes("chas") ||
        questionText.includes("safecontractor") ||
        questionText.includes("constructionline")
      );
    }
    
    if (activeCategory === "compliance") {
      return (
        questionText.includes("cyber") ||
        questionText.includes("contractor") ||
        questionText.includes("compliance") ||
        questionText.includes("cop 119")
      );
    }
    return true;
  });
  // Category change hone par purana open accordion collapse karne ke liye
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveIndex(null); 
  };

  return (
    <div className="w-full flex flex-col gap-10">
      
      {/* 🌟 Premium Category Filter Tab Bar */}
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto w-full mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-[11px] border transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${
                isActive
                  ? "bg-[#12066a] text-white border-[#12066a] shadow-xl shadow-[#12066a]/10"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-[#997819]/50 hover:text-[#997819]"
              }`}
            >
              <Icon size={14} className={isActive ? "text-[#997819]" : "text-zinc-400"} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 📝 Accordion Main List Container */}
      <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full transition-all duration-500">
        {filteredFaqData.length > 0 ? (
          filteredFaqData.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <FadeIn key={`${activeCategory}-${index}`} direction="up" delay={index * 0.04}>
                <div 
                  className={`transition-all duration-500 rounded-[2rem] border overflow-hidden ${
                    isActive 
                      ? 'bg-[#12066a] border-[#997819] shadow-2xl scale-[1.01]' 
                      : 'bg-white border-zinc-200 hover:border-[#997819]/40 shadow-sm'
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
                        <div className={`text-sm md:text-base leading-relaxed font-medium ${isActive ? 'text-blue-100/70' : 'text-zinc-500'}`}>
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })
        ) : (
          <p className="text-center text-zinc-400 py-12 text-sm font-medium">No questions found under this category.</p>
        )}
      </div>

    </div>
  );
};

export default FaqAccordion;

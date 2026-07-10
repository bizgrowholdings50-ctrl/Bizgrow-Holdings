"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/MotionWrapper";

// Hum 'faqs', 'title', aur 'subtitle' ko as a prop accept kar rahe hain
const ServicesFaq = ({ faqs = [], title = "FAQs", subtitle = "Questions & Answers" }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Agar galti se kisi page par data pass na ho, to crash na ho
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
              {subtitle}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter">
              {title}
            </h2>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#12066a] group-hover:text-[#997819] transition-colors">
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-[#997819] transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-zinc-600 font-medium leading-relaxed border-t border-zinc-100 mt-2">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesFaq;
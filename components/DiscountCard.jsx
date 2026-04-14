"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import FadeIn from "./MotionWrapper";
import Link from 'next/link';

const DiscountCard = ({ offer }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 🔹 LENIS & MAIN SCROLL LOCK
  useEffect(() => {
    const html = document.documentElement;
    if (isDetailOpen) {
      // Lenis ko batane ke liye ke main scroll rokh de
      html.setAttribute('data-lenis-prevent', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      html.removeAttribute('data-lenis-prevent');
      document.body.style.overflow = 'unset';
    }
    return () => {
      html.removeAttribute('data-lenis-prevent');
      document.body.style.overflow = 'unset';
    };
  }, [isDetailOpen]);

  return (
    <>
      <FadeIn direction="up">
        <div className="group bg-white rounded-[2.5rem] p-3 border border-zinc-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 flex flex-col h-full">
          
          <div onClick={() => setIsDetailOpen(true)} className="relative h-[400px] w-full rounded-[2rem] overflow-hidden cursor-pointer">
            <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-[550px] object-cover object-fill transition-transform duration-1000 group-hover:scale-110" />
            
            {/* 🔹 FIX: Agar discount empty ya 0 hai toh kuch b show nahi hoga */}
            {offer.discount && parseInt(offer.discount) > 0 && (
              <div className="absolute top-4 left-4 bg-[#B54118] text-white px-4 py-1.5 rounded-full font-black text-[9px] tracking-[0.2em] uppercase shadow-lg">
                SAVE {offer.discount}%
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-[#12066a] text-xl font-black uppercase tracking-tighter mb-2 leading-none">{offer.title}</h3>
            <p className="text-zinc-500 text-xs font-medium mb-6 line-clamp-2">{offer.shortDesc}</p>

            <div className="mt-auto flex gap-2">
              <button onClick={() => setIsDetailOpen(true)} className="flex-1 py-4 border border-zinc-200 text-[#12066a] font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-zinc-50 transition-all">
                View Details
              </button>
              <Link href="/contact-us" className="relative group/btn overflow-hidden flex-[1.6] py-4 bg-[#997819] text-white font-black uppercase tracking-widest text-[9px] rounded-xl transition-all shadow-md flex items-center justify-center">
                <span className="relative z-40 flex items-center gap-2 group-hover/btn:text-[#12066a] transition-colors duration-500">Claim Now <ArrowRight size={14} /></span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 z-30" />
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 🔹 MODAL */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-[#000B25]/90 backdrop-blur-md" onClick={() => setIsDetailOpen(false)} />
          
          <div className="relative bg-white w-full max-w-6xl h-full max-h-[85vh] rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/20">
            
            <button onClick={() => setIsDetailOpen(false)} className="absolute top-6 right-6 z-50 p-2.5 bg-zinc-100 hover:bg-red-500 hover:text-white rounded-full transition-all">
              <X size={20} />
            </button>

            {/* LEFT: IMAGE */}
            <div className="md:w-[45%] bg-[#0f0f0f] flex items-center justify-center overflow-hidden h-64 md:h-auto">
               <img src={offer.image} className="w-full h-full object-contain md:object-cover" alt="Flyer" />
            </div>

            {/* RIGHT: DETAILS AREA */}
            <div className="md:w-[55%] flex flex-col bg-white overflow-hidden h-full">
              {/* 🔹 data-lenis-prevent yahan modal ke andr scrolling allow karega */}
              <div 
                data-lenis-prevent 
                className="p-8 md:p-14 overflow-y-auto flex-grow custom-scrollbar"
              >
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">BizGrow Exclusive</span>
                <h2 className="text-[#12066a] text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                  {offer.title}
                </h2>
                
                <div className="w-16 h-1 bg-[#997819] mb-8" />
                
                <div className="text-zinc-600 text-base md:text-lg leading-relaxed font-medium whitespace-pre-line mb-10">
                  {offer.fullDetail}
                </div>

                {offer.sections && offer.sections.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    <h4 className="text-[#12066a] font-black uppercase text-xs tracking-widest mb-4">{section.heading}</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-zinc-500 text-sm font-semibold">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#997819]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Starting Price</p>
                  <p className="text-[#12066a] text-3xl font-black tracking-tighter">£{offer.price}<span className="text-sm font-bold opacity-40 ml-1">/Month</span></p>
                </div>
                <Link href="/contact-us" className="bg-[#12066a] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#997819] transition-all shadow-lg flex items-center justify-center gap-3">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barik premium scrollbar jo andr scrollable feel dega */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #997819;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default DiscountCard;
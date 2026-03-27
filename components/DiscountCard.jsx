"use client";
import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, X, Info } from 'lucide-react';
import FadeIn from "./MotionWrapper";

const DiscountCard = ({ offer }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <FadeIn direction="up">
        <div className="group bg-white border border-zinc-200 rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
          {/* Image & Discount Badge */}
          <div className="relative h-64 overflow-hidden">
            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12066a] via-transparent to-transparent opacity-80" />
            <div className="absolute top-6 right-6 bg-[#997819] text-white px-5 py-2 rounded-full font-black text-xs tracking-widest uppercase">
              SAVE {offer.discount}%
            </div>
          </div>

          <div className="p-10 flex-grow flex flex-col">
            <h3 className="text-[#12066a] text-3xl font-black uppercase tracking-tighter mb-2">{offer.title}</h3>
            <p className="text-zinc-500 text-sm mb-6 leading-relaxed line-clamp-2">{offer.shortDesc}</p>

            {/* Quick List */}
            <div className="space-y-3 mb-8">
              {offer.sections[0].items.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-600 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} className="text-[#997819]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <button 
                onClick={() => setIsDetailOpen(true)}
                className="w-full py-4 border-2 border-[#12066a] text-[#12066a] font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-[#12066a] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Info size={14} /> View Full Details
              </button>
              
              <button className="w-full py-4 bg-[#997819] text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-[#12066a] transition-all flex items-center justify-center gap-2">
                Claim Offer <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 🔹 DETAIL MODAL / DRAWER */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#12066a]/90 backdrop-blur-md" onClick={() => setIsDetailOpen(false)} />
          <FadeIn direction="up" className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-[#997819] font-black uppercase tracking-widest text-[10px]">Offer Details</span>
                  <h2 className="text-[#12066a] text-4xl font-black uppercase tracking-tighter mt-2">{offer.title}</h2>
                </div>
                <button onClick={() => setIsDetailOpen(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="prose prose-zinc max-w-none">
                <p className="text-zinc-600 text-lg leading-relaxed whitespace-pre-line font-medium">
                  {offer.fullDetail}
                </p>
              </div>

              <div className="mt-10 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-[#12066a] font-black uppercase text-xs tracking-widest mb-2">How to redeem:</p>
                <p className="text-zinc-500 text-sm font-medium">Click the claim button or contact us at <span className="text-[#12066a] font-bold">info@bizgrow-holdings.com</span> with the offer code: <span className="text-[#997819] font-bold">{offer.id}</span></p>
              </div>
            </div>
          </FadeIn>
        </div>
      )}
    </>
  );
};
export default DiscountCard;
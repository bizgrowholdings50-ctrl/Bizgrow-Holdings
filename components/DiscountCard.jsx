"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, X, CheckCircle, Loader2 } from "lucide-react";
import FadeIn from "./MotionWrapper";
import Link from "next/link";

const DiscountCard = ({ offer }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  // 🔹 LENIS & MAIN SCROLL LOCK
  useEffect(() => {
    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const lenis = window.lenis || window.__lenis;

    if (isDetailOpen || isClaimOpen) {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      lenis?.stop();
    } else {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      lenis?.start();
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      lenis?.start();
    };
  }, [isDetailOpen, isClaimOpen]);

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/claim-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          offerTitle: offer.title,
          offerPrice: offer.price,
          discount: offer.discount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FadeIn direction="up">
        <div className="group bg-white w-sm rounded-[2.5rem] p-3 border border-zinc-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 flex flex-col h-full">
          {/* 🔹 Fixed Aspect Ratio & Contain for Image */}
          <div
            onClick={() => setIsDetailOpen(true)}
            className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden cursor-pointer bg-white flex items-center justify-center p-4 border border-zinc-100 shadow-inner"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
            />

            {offer.discount && parseInt(offer.discount) > 0 && (
              <div className="absolute top-4 left-4 bg-[#12066a] text-white px-4 py-1.5 rounded-full font-black text-[9px] tracking-[0.2em] uppercase shadow-lg z-10">
                SAVE {offer.discount}%
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => setIsDetailOpen(true)}
                className="flex-1 py-4 border border-zinc-200 text-[#12066a] font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-zinc-50 transition-all cursor-pointer"
              >
                View Details
              </button>
              <button
                onClick={() => setIsClaimOpen(true)}
                className="relative group/btn overflow-hidden flex-[1.6] py-4 bg-[#12066a] text-white font-black uppercase tracking-widest text-[9px] rounded-xl transition-all shadow-md flex items-center justify-center cursor-pointer"
              >
                <span className="relative z-40 flex items-center gap-2 group-hover/btn:text-white transition-colors duration-500">
                  Claim Now <ArrowRight size={14} />
                </span>
                <div className="absolute inset-0 bg-[#997819] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 z-30" />
              </button>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 🔹 DETAIL MODAL */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-[1000] flex h-[100dvh] items-center justify-center overflow-hidden overscroll-none bg-[#000B25]/20 p-3 md:p-8">
          <div
            className="absolute inset-0 bg-[#000B25]/90 backdrop-blur-md"
            onClick={() => setIsDetailOpen(false)}
          />

          <div className="relative flex h-[min(820px,calc(100dvh-1.5rem))] w-full max-w-6xl min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:h-[min(820px,calc(100dvh-4rem))] md:flex-row md:rounded-[3.5rem]">
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-6 right-6 z-50 p-2.5 bg-zinc-100 hover:bg-red-500 hover:text-white rounded-full transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* LEFT: IMAGE */}
            <div className="h-56 shrink-0 bg-[#0f0f0f] md:h-auto ">
              <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black/20 ">
                <img
                  src={offer.image}
                  className="w-full h-full object-contain"
                  alt="Flyer"
                />
              </div>
            </div>

            {/* RIGHT: DETAILS AREA */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white md:w-[55%]">
              <div
                data-lenis-prevent
                data-modal-scroll
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-7 pr-5 [scrollbar-gutter:stable] md:p-14 md:pr-10 custom-scrollbar"
              >
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">
                  BizGrow Exclusive
                </span>
                <h2 className="text-[#12066a] text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                  {offer.title}
                </h2>

                <div className="w-16 h-1 bg-[#997819] mb-8" />

                <div className="text-zinc-600 text-base md:text-lg leading-relaxed font-medium whitespace-pre-line mb-10">
                  {offer.fullDetail}
                </div>

                {offer.sections &&
                  offer.sections.map((section, idx) => (
                    <div key={idx} className="mb-6">
                      <h4 className="text-[#12066a] font-black uppercase text-xs tracking-widest mb-4">
                        {section.heading}
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-zinc-500 text-sm font-semibold"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#997819]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>

              {/* FOOTER */}
              <div className="flex shrink-0 items-center justify-between gap-5 border-t border-zinc-100 bg-zinc-50 p-6 md:p-8">
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                    Starting Price
                  </p>
                  <p className="text-[#12066a] text-3xl font-black tracking-tighter">
                    £{offer.price}
                    <span className="text-sm font-bold opacity-40 ml-1">
                      /Month
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsDetailOpen(false);
                    setIsClaimOpen(true);
                  }}
                  className="bg-[#12066a] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#997819] transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                >
                  Claim Offer <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 CLAIM NOW FORM MODAL */}
      {isClaimOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#000B25]/90 backdrop-blur-md"
            onClick={() => setIsClaimOpen(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl p-8 border border-white/20 z-10">
            <button
              onClick={() => setIsClaimOpen(false)}
              className="absolute top-6 right-6 p-2 bg-zinc-100 hover:bg-red-500 hover:text-white rounded-full transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-[#12066a] text-2xl font-black uppercase tracking-tight mb-2">
                  Offer Claimed!
                </h3>
                <p className="text-zinc-500 text-sm mb-6">
                  Thank you. Our sales team has received your request for{" "}
                  <span className="font-bold text-[#12066a]">{offer.title}</span> and will get in touch with you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsClaimOpen(false);
                  }}
                  className="bg-[#12066a] text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit}>
                <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-[9px] block mb-1">
                  Instant Claim
                </span>
                <h2 className="text-[#12066a] text-2xl font-black uppercase tracking-tighter mb-2">
                  {offer.title}
                </h2>
                <p className="text-zinc-400 text-xs mb-6 font-medium">
                  Fill in your details below to lock in this exclusive offer.
                </p>

                {errorMsg && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium focus:outline-none focus:border-[#12066a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@company.co.uk"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium focus:outline-none focus:border-[#12066a]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="07898..."
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium focus:outline-none focus:border-[#12066a]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="BizGrow Ltd"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium focus:outline-none focus:border-[#12066a]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-4 bg-[#997819] hover:bg-[#12066a] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      Submit Claim Request <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

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
"use client";

import { useState } from "react";
import { Gift, ShieldCheck, Building2, CheckCircle2, FileText as FormInput, PhoneCall } from "lucide-react";
import ReferredClientForm from "./ReferredClientForm"; // Apne path ke mutabiq adjust karein

const NAVY = "#12066a";
const GOLD = "#997819";

export default function ReferredLandingContent({ referrerName, referralCode }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="space-y-8">
      {/* =====================================================
          DARK HERO — referred visitor landing (Submit hone par hide ho jayega)
      ===================================================== */}
      {!isSubmitted && (
        <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen min-h-[85vh] lg:h-screen flex items-center justify-center px-6 overflow-hidden bg-[#0c0442]">
          {/* Ambient glow accents */}
          <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#997819]/15 blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#3d2d91]/30 blur-[130px] pointer-events-none" />

          {/* --- Decorative Watermark Text --- */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
            <span className="text-[18vw] sm:text-[16vw] font-black uppercase leading-none text-white/[0.05] tracking-tighter select-none whitespace-nowrap">
              Welcome
            </span>
          </div>

          {/* --- Content Layer --- */}
          <div className="max-w-4xl mt-10 mx-auto text-center relative z-10 space-y-7 py-12">
            <div className="inline-flex items-center gap-2.5 rounded-full pl-3 pr-5 py-2 bg-white/10 border border-white/15 backdrop-blur-sm shadow-lg">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-[#997819]">
                <Gift className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
                Welcome — You&apos;ve Been Invited by{" "}
                {referrerName || "a Bizgrow Partner"}
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 text-[#997819]">
              <span className="h-px w-10 bg-[#997819]/50" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                The Standard In Compliance
              </span>
              <span className="h-px w-10 bg-[#997819]/50" />
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Save 5% on 1st Compliance
              <br />
              Service. Choose your service and
              <span className="italic font-serif font-medium text-[#c9a44a]">
                {" "}
                unlock your discount.
              </span>
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                <span className="text-sm sm:text-base font-bold text-white">
                  5% Off First Service
                </span>
              </div>

              <div className="inline-flex items-center gap-2 bg-white text-[#12066a] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xl">
                Minimum Qualifying Value: £650
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- Why Choose Us Section (Submit hone par hide ho jayega) --- */}
      {!isSubmitted && (
        <section className="text-center space-y-8 max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#997819]">
              Why Partner With Us
            </span>
            <h2
              className="text-2xl sm:text-3xl font-black"
              style={{ color: NAVY }}
            >
              Why Businesses Choose BizGrow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Feature 1 */}
            <div className="relative p-6 rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 shadow-sm space-y-3 group hover:border-[#997819]/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#997819]/10 text-[#997819] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Expert Compliance Support
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Practical guidance from experienced compliance specialists.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative p-6 rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 shadow-sm space-y-3 group hover:border-[#997819]/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Industry-Focused
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Support designed for UK security businesses.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative p-6 rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 shadow-sm space-y-3 group hover:border-[#997819]/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#997819]/10 text-[#997819] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">
                End-to-End Guidance
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                From choosing the right accreditation to completing the process.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Steps + Form Section */}
      <div className="text-center max-w-4xl mx-auto space-y-8">
        {!isSubmitted && (
          <>
            <div className="pt-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#997819]">
                Simple Steps
              </span>

              <h3
                className="text-2xl sm:text-3xl font-black tracking-tight mt-1"
                style={{ color: NAVY }}
              >
                Three steps to your discount
              </h3>
            </div>

            {/* Chevron Arrow Process Flow Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 max-w-3xl mx-auto text-left pt-2 relative">
              {/* STEP 1 */}
              <div className="relative group">
                <div
                  className="hidden md:block absolute -inset-x-1 -bottom-2 top-2 rounded-r-xl opacity-20 -z-10 transition-transform group-hover:translate-x-1"
                  style={{ backgroundColor: GOLD }}
                />
                <div className="bg-white border border-slate-200 p-5 space-y-2.5 shadow-sm transition-all relative z-10 md:[clip-path:polygon(0%_0%,_88%_0%,_100%_50%,_88%_100%,_0%_100%)] md:pr-10">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${GOLD}15`,
                        color: GOLD,
                      }}
                    >
                      Step 01
                    </span>
                    <FormInput className="w-5 h-5 text-[#997819]" />
                  </div>
                  <p className="text-xs font-black text-slate-800">
                    Choose your service
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed pr-2">
                    Fill in the form below with the service you need.
                  </p>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="relative group md:-ml-4">
                <div
                  className="hidden md:block absolute -inset-x-1 -bottom-2 top-2 rounded-r-xl opacity-20 -z-10 transition-transform group-hover:translate-x-1"
                  style={{ backgroundColor: NAVY }}
                />
                <div className="bg-slate-50 border border-slate-200 p-5 space-y-2.5 shadow-sm transition-all relative z-20 md:[clip-path:polygon(0%_0%,_88%_0%,_100%_50%,_88%_100%,_0%_100%,_12%_50%)] md:pl-9 md:pr-10">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: NAVY }}
                    >
                      Step 02
                    </span>
                    <PhoneCall
                      className="w-5 h-5"
                      style={{ color: NAVY }}
                    />
                  </div>
                  <p className="text-xs font-black text-slate-800">
                    Speak With BizGrow
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed pr-2">
                    A BizGrow specialist will contact you to complete your service.
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="relative group md:-ml-4">
                <div
                  className="hidden md:block absolute -inset-x-1 -bottom-2 top-2 rounded-r-xl opacity-20 -z-10 transition-transform group-hover:translate-x-1"
                  style={{ backgroundColor: GOLD }}
                />
                <div className="bg-white border border-slate-200 p-5 space-y-2.5 shadow-sm transition-all relative z-30 md:[clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_0%_100%,_12%_50%)] md:pl-9">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${GOLD}15`,
                        color: GOLD,
                      }}
                    >
                      Step 03
                    </span>
                    <Gift className="w-5 h-5 text-[#997819]" />
                  </div>
                  <p className="text-xs font-black text-slate-800">
                    Avail Your Discount
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Once your qualifying purchase is confirmed, you'll get your 5% discount applied.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Form Container with onSuccess callback */}
        <div className="pt-6 max-w-xl mx-auto">
          <ReferredClientForm
            referrerName={referrerName}
            referrerCode={referralCode}
            onSuccess={() => setIsSubmitted(true)}
          />
        </div>
      </div>
    </div>
  );
}
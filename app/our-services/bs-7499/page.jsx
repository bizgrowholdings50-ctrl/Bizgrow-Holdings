import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Building2,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  PhoneCall,
  ArrowRight,
  UserCheck,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import ServicesFaq from "@/components/ServicesFaq";

export const metadata = {
  title: "BS 7499 Certification for Static Guarding | BizGrow Holdings",
  description:
    "Get BS 7499 certification for static guarding services in the UK. BizGrow Holdings helps security companies achieve full compliance.",
};

const bs7499Data = [
  {
    q: "What is BS 7499, and why is it important for security companies?",
    a: "BS 7499 is the British Standard for static guarding and mobile patrol services in the security industry. It's important because it sets benchmarks for service quality, staff competency, and operational procedures. Certification helps security companies win contracts and demonstrate professional credibility.",
  },
  {
    q: "What are common mistakes businesses make when implementing BS 7499?",
    a: "Common mistakes include incomplete documentation, inconsistent staff training records, and poor risk assessment processes. Businesses often overlook regular internal audits needed to maintain compliance. Rushing implementation without expert guidance frequently leads to audit failures.",
  },
  {
    q: "How can I prepare my business for a BS 7499 assessment or audit?",
    a: "Start by conducting a thorough gap analysis against the standard's requirements. Ensure all policies, training records, and operational procedures are properly documented and up to date. Partnering with a compliance consultant helps identify weak areas before the official audit.",
  },
  {
    q: "What are the key requirements of BS 7499?",
    a: "BS 7499 requires documented operational procedures, trained and vetted security personnel, and robust quality management systems. Organisations must also demonstrate effective incident reporting and client communication processes. Regular internal audits are needed to maintain ongoing compliance.",
  },
];

const BS7499Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (BizGrow Signature Style) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/guarding-hero.jpg" // Image of a professional security guard at a high-end site
            alt="BS 7499 Static Site Guarding Standard"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Tactical Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[10rem] md:text-[16rem] font-black text-white/[0.08] leading-none uppercase tracking-tighter">
            GUARDING
          </span>
        </div>

        <div className="max-w-7xl mt-10 mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                Static Guarding & Mobile Patrols
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter uppercase">
                BS 7499 <br />
                <span className="text-[#997819]">Code of Practice.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <p className="mt-10 text-blue-100/80 text-lg md:text-xl max-w-2xl leading-relaxed font-medium ">
                "The British Standard for professional static guarding services
                establishes best practices for the management and delivery of
                manned security operations."
              </p>
            </FadeIn>
            <FadeIn direction="right" duration="1.0">
              <Link href="/contact-us">
                <button className="relative z-10 bg-[#997819] text-white px-16 py-6 my-4 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-3xl">
                  Book a Consultation
                </button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. THE BIZGROW ADVANTAGE (Why Us) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:w-1/2">
            <FadeIn direction="right">
              <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter mb-6 leading-tight">
                Why <span className="text-[#997819]">BS 7499 </span> Standard
                Matters
              </h2>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                BS 7499 helps security companies put clear systems in place for
                managing static guarding services. It can help businesses
                maintain consistent procedures, clear responsibilities, proper
                records and effective supervision.
              </p>
            </FadeIn>
          </div>

          {/* Right Column (Elite Card Design) */}
          <div className="lg:w-1/2 w-full">
            <FadeIn direction="left" delay={0.3}>
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-100 relative overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#12066a]" />

                <h3 className="text-2xl font-bold mb-6 text-[#12066a] tracking-tight">
                  It Can Help You
                </h3>

                <ul className="space-y-4 text-sm md:text-base text-slate-700">
                  {[
                    "Run your security operations more smoothly",
                    "Give guards clear instructions",
                    "Manage and supervise your security staff",
                    "Keep important records organised",
                    "Show clients that your business is well managed",
                    "Deliver a more consistent security service",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3.5">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#12066a] text-white flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
                        ✓
                      </span>
                      <span className="leading-relaxed font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 3. WHO NEEDS THIS SECTION (Minimalist / Non-Card Style) */}
      <section className="py-14 bg-slate-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <FadeIn direction="right">
                <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-xs mb-3 block">
                  Target Audience
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tight ">
                  Who <span className="text-[#997819]">Needs</span> This?
                </h2>
              </FadeIn>
            </div>
          </div>

          {/* Clean Row Layout instead of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-slate-200">
            {[
              {
                title: "Static",
                sub: "guarding companies",
                desc: "For operations deploying fixed-position security personnel across corporate or industrial properties.",
              },
              {
                title: "Manned",
                sub: "guarding businesses",
                desc: "For enterprises managing active security workforces, scheduling, and standard operating procedures.",
              },
              {
                title: "Security",
                sub: "firms serving client sites",
                desc: "For providers delivering verified accountability and structured oversight directly to client locations.",
              },
            ].map((item, index) => (
              <FadeIn key={index} direction="up" delay={index * 0.15}>
                <div className="group relative flex flex-col justify-between h-full">
                  <div>
                    {/* Subtle top indicator line */}
                    <div className="w-8 h-1 bg-[#12066a] group-hover:w-full group-hover:bg-[#997819] transition-all duration-500 mb-6" />

                    <h3 className="text-2xl md:text-3xl font-black text-[#12066a] mb-1 tracking-tight">
                      {item.title}
                    </h3>
                    <span className="text-[#997819] font-bold text-sm tracking-wide uppercase block mb-4">
                      {item.sub}
                    </span>
                    <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. WHAT BS 7499 ASSESSORS FOCUS ON */}
      <section className="py-14 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn direction="up">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-100 relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#997819]" />

              {/* Header Content */}
              <div className="mb-10">
                <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-xs mb-2 block">
                  Compliance Audit
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tight ">
                  What BS 7499 Assessors Focus On
                </h2>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    title: "Site Instructions",
                    desc: "Clear operational guidelines for every site.",
                  },
                  {
                    title: "Staff Vetting & Training",
                    desc: "Rigorous background checks and proper licensing.",
                  },
                  {
                    title: "Daily Operations",
                    desc: "Seamless execution and monitoring of guard duties.",
                  },
                  {
                    title: "Record Keeping",
                    desc: "Accurate logging of incidents, patrols, and handovers.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-[#997819]/40 hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#12066a] text-white group-hover:bg-[#997819] flex items-center justify-center text-sm font-black transition-colors duration-300 shadow-sm">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-bold text-[#12066a] text-base mb-0.5 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 5. BS 7499 vs BS 10800 (Comparison) WITH PARALLAX */}
      <section
        className="py-24 relative overflow-hidden min-h-[600px] flex justify-center items-center bg-fixed bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/comparison.png')" }} // 👈 Apni image ka path yahan dalein
      >
        {/* Overlay: Image ke upar dark layer taaki text saaf nazar aaye */}
        {/* 'bg-[#12066a]/90' opacity control karega, z-0 par */}
        <div className="absolute inset-0 bg-[#12066a]/70 backdrop-blur-[1px] z-0"></div>

        <div className="max-w-7xl px-6 relative z-10">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-6xl text-center font-black tracking-tighter  mb-12">
              The Scope <span className="text-[#997819]">Difference.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* BS 10800 Card */}
            <FadeIn direction="left" delay={0.2}>
              <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md h-full">
                <h3 className="text-white font-black text-2xl mb-6 tracking-tighter uppercase">
                  BS 10800
                </h3>
                <p className="text-blue-100/70 text-sm font-medium leading-relaxed">
                  Top-level management framework that oversees all security
                  services provided by an organisation.
                </p>
              </div>
            </FadeIn>

            {/* BS 7499 Card (Highlighted) */}
            <FadeIn direction="right" delay={0.4}>
              <div className="p-12 bg-[#997819] rounded-[3rem] text-white shadow-2xl h-full flex flex-col justify-center">
                <h3 className="font-black text-2xl mb-6 uppercase tracking-tighter">
                  BS 7499
                </h3>
                <p className="font-bold text-sm leading-relaxed italic">
                  Specific "On-Ground" operational code of practice specifically
                  for static and mobile guarding activities.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 6 FINAL SECTION: CERTIFICATION JOURNEY */}
      <section className="py-20 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Left Content Column */}
            <div className="lg:w-1/2">
              <FadeIn direction="right">
                <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter  leading-[0.9] mb-10">
                  Get Certified
                  <span className="text-[#997819] ml-2">With BizGrow.</span>
                </h2>
                <p className="text-zinc-600 font-medium text-lg leading-relaxed mb-8">
                  Achieving BS 7499 certification strengthens the credibility
                  and operational standards of your security company. We provide
                  expert guidance to help organisations implement the necessary
                  processes for compliant static guarding operations.
                </p>
                <p className="text-zinc-700 font-medium text-md leading-relaxed mb-10 border-l-2 border-[#997819] pl-6">
                  "Our team supports security companies throughout the journey
                  from gap analysis to final audit preparation ensuring you meet
                  recognised UK security standards with confidence."
                </p>

                {/* Micro-Stats or Highlights */}
                <div className="flex gap-10">
                  <div>
                    <h3 className="text-3xl font-black text-[#12066a]">100%</h3>
                    <p className="text-xs uppercase tracking-widest font-bold text-[#997819]">
                      Compliance
                    </p>
                  </div>
                  <div className="w-[1px] bg-zinc-200" />
                  <div>
                    <h3 className="text-3xl font-black text-[#12066a]">
                      Expert
                    </h3>
                    <p className="text-xs uppercase tracking-widest font-bold text-[#997819]">
                      Gap Analysis
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Visual Journey Steps */}
            <div className="lg:w-1/2 w-full">
              <div className="space-y-4">
                {[
                  {
                    step: "Phase 01",
                    title: "Gap Analysis",
                    desc: "Identifying shortcomings in your current static guarding protocols.",
                  },
                  {
                    step: "Phase 02",
                    title: "Documentation",
                    desc: "Developing site-specific Assignment Instructions and core policies.",
                  },
                  {
                    step: "Phase 03",
                    title: "Operational Readiness",
                    desc: (
                      <>
                        <Link
                          href="/training-moments"
                          className="text-[#997819] font-bold"
                        >
                          Training
                        </Link>{" "}
                        personnel and aligning on-ground activities with BS
                        7499.
                      </>
                    ),
                  },
                  {
                    step: "Phase 04",
                    title: "Audit Preparation",
                    desc: "Final review to ensure your business is ready for UK certification.",
                  },
                ].map((item, idx) => (
                  <FadeIn key={idx} direction="left" delay={idx * 0.1}>
                    <div className="group bg-white p-8 rounded-[2rem] border border-zinc-200 hover:border-[#997819] transition-all duration-500 flex items-center gap-8">
                      <div className="text-4xl font-black text-zinc-400 group-hover:text-[#997819] transition-colors">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#997819]">
                          {item.step}
                        </span>
                        <h3 className="text-[#12066a] font-black uppercase text-sm tracking-tighter mt-1">
                          {item.title}
                        </h3>
                        <p className="text-zinc-500 text-xs mt-2 font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 7. FAQ SECTION */}

      <ServicesFaq
        faqs={bs7499Data}
        title={
          <>
            BS 7499 <span className="text-[#997819]">FAQ's</span>
          </>
        }
        subtitle="Questions & Answers"
      />

      {/* 🔹 8. CALL TO ACTION (Fixed Parallax Style) */}
      <section className="py-14 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto relative rounded-[4rem] overflow-hidden shadow-3xl group">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/guarding-cta.jpg')" }}
          >
            <div className="absolute inset-0 bg-[#12066a]/85 mix-blend-multiply" />
          </div>

          <div className="relative z-10 p-12 md:p-24 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-10  leading-[0.9]">
              Standardise Your <br />
              <span className="text-[#997819]">Guarding Operations.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/contact-us"
                className="relative group/btn overflow-hidden inline-flex items-center justify-center gap-2 md:gap-3 bg-[#997819] text-white 
  px-6 py-5 md:px-16 md:py-6 rounded-2xl font-black uppercase 
  tracking-[0.05em] md:tracking-[0.3em] text-[10px] md:text-xs 
  transition-all duration-700 shadow-2xl active:scale-95 w-full sm:w-auto text-center"
              >
                <span className="relative z-40 flex items-center justify-center gap-2 md:gap-3 transition-colors duration-700 group-hover/btn:text-[#12066a] whitespace-nowrap">
                  Audit My Operations
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-2 transition-transform duration-500"
                  />
                </span>

                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 ease-out z-30" />
              </Link>
              <a
                href="tel:+447898205035"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white 
  px-6 py-5 md:px-8 md:py-6 rounded-2xl font-black uppercase 
  tracking-[0.05em] md:tracking-[0.15em] text-[10px] md:text-xs 
  flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              >
                {/* Yahan 'size' prop ko fix rakhein aur 'className' se styling manage karein */}
                <PhoneCall className="w-3.5 h-3.5 md:w-4.5 md:h-4.5" />
                <span className="whitespace-nowrap">Call Consultant</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BS7499Page;

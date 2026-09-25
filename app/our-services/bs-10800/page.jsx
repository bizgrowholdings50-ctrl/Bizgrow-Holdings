import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Users,
  Search,
  Scale,
  Building2,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  ClipboardList,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";
import ServicesFaq from "@/components/ServicesFaq";

import { createOpenGraph } from "@/lib/openGraphMetadata";

export const metadata = {
  title: "BS 10800 Certification Services | Business Support UK",
  description:
    "BizGrow Holdings helps UK businesses achieve BS 10800 certification to strengthen business continuity and improve audit readiness.",
  openGraph: createOpenGraph("/our-services/bs-10800/", "/bs10800-hero.jpg"),
};

const bs10800Data = [
  {
    q: "What is BS 10800, and why is it important for security companies?",
    a: "BS 10800 is a British Standard covering business continuity for security operations. It helps your business stay operational during disruption, which strengthens client trust and supports wider certifications like SIA ACS.",
  },
  {
    q: "What are common mistakes businesses make when implementing BS 10800?",
    a: "Many businesses write a continuity plan but never test it, leave staff unaware of their roles, or fail to update the plan as operations change. A plan only works if your team actually knows how to use it.",
  },
  {
    q: "How can I prepare my business for a BS 10800 assessment or audit?",
    a: "Start with a proper gap analysis against BS 10800 requirements. Then build your continuity plan, train your staff, and run an internal audit before your official assessment date.",
  },
  {
    q: "What are the key requirements of BS 10800?",
    a: "Core requirements include a documented continuity plan, clear roles and responsibilities, tested emergency response procedures, and proper records of recovery actions.",
  },
  {
    q: "Can a consultant help my business prepare for BS 10800?",
    a: "Yes. A consultant can run your gap analysis, build your documentation, train your team, and guide you through the review process, so you approach it with confidence.",
  },
];

const BS10800Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (Signature BizGrow Style) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bs10800-hero.jpg"
            alt="BS 10800 Security Standard UK"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Prominent Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[10rem] md:text-[15rem] font-black text-white/10 leading-none uppercase tracking-tighter">
            SAFETY
          </span>
        </div>

        <div className="max-w-7xl mt-10 mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-sm md:text-xs">
                British Standard for Security SERVICES
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-3xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter uppercase">
                BS 10800
                <span className="text-[#997819]"> Code of Practice.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-3 text-blue-100/70 text-xl md:text-xl max-w-2xl leading-relaxed font-medium ">
                The British Standard that helps security companies keep running
                smoothly, even when something goes wrong, whether that's a
                system failure, staff shortage, or unexpected emergency.
              </p>
            </FadeIn>

            <FadeIn direction="right" duration="1.0">
              <Link href="/contact-us">
                <button className="relative z-10 bg-[#997819] text-white px-14 py-5 my-4 rounded-3xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-3xl">
                  Book a Consultation
                </button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className="relative py-24 bg-white text-slate-900 overflow-hidden">
        {/* Background Glow / Elite Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#997819]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Why It Matters */}
            <FadeIn className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#997819]/10 border border-[#997819]/30 text-[#997819] text-sm font-medium">
                <svg
                  className="w-4 h-4 text-[#997819]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>British Standard Compliance</span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-[#12066a] leading-snug">
                Why BS 10800 <br />
                <span className="text-[#997819]">Standard Matters</span>
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                BS 10800 helps security companies put clear systems in place for
                managing disruption. It can help businesses maintain continuous
                service, clear responsibilities, proper records, and effective
                recovery, even when something goes wrong.
              </p>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#12066a] hover:bg-[#0b0342] text-white font-medium transition-all shadow-lg shadow-[#12066a]/20"
                >
                  Get Compliant Today
                </Link>
              </div>
            </FadeIn>

            {/* Right Column: How It Helps You (Cards Grid) */}
            <FadeIn delay={0.2} className="lg:col-span-7">
              <div className="bg-slate-50 border border-[#997819]/30 p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-semibold text-[#12066a] mb-6 border-b border-[#997819]/20 pb-4">
                  How It Helps You
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Keep your operations running during disruption",
                    "Give staff clear roles during an incident",
                    "Manage communication and escalation properly",
                    "Keep important records organised",
                    "Show clients that your business is genuinely resilient",
                    "Deliver a more consistent security service, no matter what happens",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#997819]/50 transition-all shadow-sm group"
                    >
                      <svg
                        className="w-5 h-5 text-[#997819] shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-slate-700 font-medium leading-snug">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="relative py-28 bg-white text-slate-900 overflow-hidden">
        {/* Background Sophisticated Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#12066a]/5 to-[#997819]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <FadeIn className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5  text-[#997819] text-xs font-semibold tracking-wider uppercase">
              <span className="w-10 h-[0.7]  bg-[#997819]"></span>
              <span>Enterprise Fit</span>
              <span className="w-10 h-[0.7]  bg-[#997819]"></span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#12066a]">
              Built for These <span className="text-[#997819]">Businesses</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Designed specifically for security operators and contract holders
              where absolute operational resilience is non-negotiable.
            </p>
          </FadeIn>

          {/* 3-Column Elite Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Multi-Site Security Operators",
                description:
                  "If you run security across several client sites, this standard helps you stay in control when something goes wrong at any one of them.",
                tag: "Operational Control",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                ),
              },
              {
                title: "Growing Security Businesses",
                description:
                  "If you're scaling up, this standard proves your business can handle more without losing reliability.",
                tag: "Scalability & Trust",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                ),
              },
              {
                title: "High-Stakes Contract Holders",
                description:
                  "If one bad incident could cost you a major contract, this standard helps you protect it by keeping your service running through disruption.",
                tag: "Risk Mitigation",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
              },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.15} className="h-full">
                <div className="h-full bg-white border border-slate-200/80 hover:border-[#997819]/60 p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#997819]/10 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
                  {/* Top Elite Gold Accent Bar on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#997819] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Top row: Icon & Tag */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#12066a] text-[#997819] flex items-center justify-center shadow-lg shadow-[#12066a]/20 group-hover:scale-110 group-hover:bg-[#997819] group-hover:text-white transition-all duration-300">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {item.icon}
                        </svg>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium tracking-wide group-hover:bg-[#997819]/10 group-hover:text-[#997819] transition-colors">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#12066a] mb-4 tracking-tight group-hover:text-[#997819] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom interactive indicator */}
                  <div className="pt-8 mt-8 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#12066a] group-hover:text-[#997819] transition-colors">
                    <span>Verified Compliance Standard</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="relative py-28 bg-white text-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <FadeIn className="max-w-3xl mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5  text-[#997819] text-xs font-semibold tracking-wider uppercase">
              <span className="w-10 h-[0.7] bg-[#997819]"></span>
              <span>Audit & Verification</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#12066a]">
              What Gets Checked During{" "}
              <span className="text-[#997819]">Assessment</span>
            </h2>
            <p className="text-slate-600 mt-3 text-lg">
              Here’s what gets evaluated during your assessment to make sure
              your security operations stay solid when unexpected challenges
              hit.
            </p>
          </FadeIn>

          {/* Minimalist Editorial Grid (No Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {[
              {
                number: "01",
                title: "Your Continuity Plan",
                description:
                  "A clear, written plan for what to do when disruption hits.",
              },
              {
                number: "02",
                title: "Who's Responsible for What",
                description:
                  "Clear roles during an incident, so nobody's left guessing.",
              },
              {
                number: "03",
                title: "How You Respond to Emergencies",
                description:
                  "Tested steps for communication and escalation when it matters.",
              },
              {
                number: "04",
                title: "How You Recover and Record It",
                description:
                  "Proper records of what happened and how you fixed it.",
              },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.1} className="h-full">
                <div className="relative pl-8 border-l-2 border-[#997819]/40 space-y-3">
                  <span className="text-xs font-bold text-[#997819] tracking-widest uppercase">
                    Requirement {item.number}
                  </span>
                  <h3 className="text-2xl font-bold text-[#12066a] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
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
                  The overall plan. It covers how your whole business stays
                  running during disruption, across every service you provide.
                </p>
              </div>
            </FadeIn>

            {/* BS 7499 Card (Highlighted) */}
            <FadeIn direction="right" delay={0.4}>
              <div className="p-12 bg-[#997819] rounded-[3rem] text-white shadow-2xl h-full flex flex-col justify-center">
                <h3 className="font-black text-2xl mb-6 uppercase tracking-tighter">
                  BS 7499
                </h3>
                <p className="font-bold text-sm leading-relaxed ">
                  The day-to-day rules. It covers how your guards actually
                  operate on site, in normal working conditions.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* 6 Our Process */}
      <section className="relative py-18 bg-white text-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <FadeIn className="max-w-3xl mb-14 space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#997819]/10 border border-[#997819]/30 text-[#997819] text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#997819]"></span>
              <span>End-to-End Execution</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mt-3 font-extrabold tracking-tight text-[#12066a]">
              How BizGrow <span className="text-[#997819]">Helps You</span>
            </h2>
            <p className="text-slate-600 mt-4 text-lg">
              A clear, stress-free roadmap that takes your security operations
              from initial assessment straight to official certification.
            </p>
          </FadeIn>

          {/* Elite 4-Step Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Check",
                description:
                  "We assess your current setup and flag every gap against BS 10800.",
                focus: "Initial Audit",
              },
              {
                step: "02",
                title: "Prepare",
                description:
                  "We build your continuity plan and train your team on their roles.",
                focus: "System Setup",
              },
              {
                step: "03",
                title: "Fix",
                description:
                  "We close any remaining gaps before your assessment date.",
                focus: "Gap Closure",
              },
              {
                step: "04",
                title: "Certify",
                description:
                  "We support you through final review, so you're genuinely ready for certification.",
                focus: "Final Review",
              },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.15} className="h-full">
                <div className="h-full bg-slate-50/60 border border-slate-200/80 hover:border-[#997819]/60 p-8 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-[#997819]/10 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
                  {/* Top Elite Gold Accent Bar on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#997819] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Step Number & Focus Tag */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-3xl font-extrabold text-[#12066a]/20 group-hover:text-[#997819] transition-colors">
                        {item.step}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium tracking-wide group-hover:bg-[#997819]/10 group-hover:text-[#997819] group-hover:border-[#997819]/30 transition-colors">
                        {item.focus}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#12066a] mb-4 tracking-tight group-hover:text-[#997819] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Status Indicator */}
                  <div className="pt-6 mt-8 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-[#12066a] group-hover:text-[#997819] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#997819]"></span>
                    <span>BizGrow Managed Phase</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ServicesFaq
        faqs={bs10800Data}
        title={
          <>
            BS 10800 <span className="text-[#997819]">FAQ's</span>
          </>
        }
        subtitle="Questions & Answers"
      />
      {/* 🔹 7. CALL TO ACTION (Fixed Background / Parallax Style) */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto relative rounded-[4rem] overflow-hidden shadow-3xl group">
          {/* --- FIXED BACKGROUND LAYER --- */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: "url('/bs10800-cta.jpg')",
            }}
          >
            {/* Deep Overlay: Text readability ke liye zaroori hai */}
            <div className="absolute inset-0 bg-[#12066a]/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#12066a]/40" />
          </div>

          {/* --- CONTENT LAYER --- */}
          <div className="relative z-10 p-12 md:p-24 text-center flex flex-col items-center">
            {/* Background Watermark Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-black text-white/[0.03] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
              BIZGROW
            </div>

            <FadeIn direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-10 uppercase relative z-10 leading-[1]">
                Get
                <span className="text-[#997819]"> BS 10800 Support </span> with
                BizGrow Holdings
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <p className="text-blue-100/80 mb-12 font-medium max-w-2xl mx-auto text-lg md:text-xl ">
                If your business wants to protect itself from disruption, build
                resilience, and demonstrate professional continuity planning, BS
                10800 is the right choice.
              </p>
            </FadeIn>
            <Link
              href="/contact"
              className="relative group/btn inline-flex items-center justify-center gap-3 bg-[#997819] text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs shadow-2xl active:scale-95 overflow-hidden isolate"
            >
              {/* Text & Icon */}
              <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover/btn:text-white">
                Get Expert Consultancy
                <ArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-500" />
              </span>

              {/* Circle reveal white background - no seams, no corner mismatch */}
              <span
                className="absolute inset-0 bg-white transition-[clip-path] duration-700 ease-out"
                style={{
                  clipPath: "circle(0% at 50% 50%)",
                }}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BS10800Page;

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  HardHat,
  Construction,
  Trophy,
  ShieldCheck,
  Target,
  FileSearch,
  ArrowUpRight,
  Award,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "ConstructionLine Certification Consultant | BizGrow Holdings",
  description:
    "Get ConstructionLine Certification with BizGrow Holdings Ltd. Build Trust, Win Contracts, and Grow your UK Construction Business",
};

const ConstructionlinePage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* 🔹 1. HERO SECTION (Site-Engineered Look) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden ">
        <div className="absolute inset-0 z-0">
          <Image
            src="/h.jpg"
            alt="Construction Site"
            fill
            className="object-cover  transition-all duration-1000"
            priority
          />
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-3 bg-[#997819]/20 border border-[#997819]/30 px-4 py-2 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#997819] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#997819]"></span>
                </span>
                <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-[10px]">
                  UK Procurement Ready
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                CONSTRUCTION <br />
                <span className="text-[#997819]">LINE.</span>
              </h1>

              <p className="mt-10 text-blue-100/60 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
                Unlock the UK's largest procurement network. We handle your
                Silver, Gold, or Platinum membership from audit to approval.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. THE TIER SELECTOR (Unique Horizontal Card Design) */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase">
              Pick Your <br />{" "}
              <span className="text-[#997819]">Membership.</span>
            </h2>
            <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">
              Tailored Support for every level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                level: "Silver",
                desc: <>PAS91 <Link href="compliance-consultancies/" className="text-[#997819] font-bold">Compliance</Link> & Basic PQQ Support</>,
                icon: <Construction />,
              },
              {
                level: "Gold",
                desc: <>Full <Link href="https://bizgrow-holdings.com/key-components-of-health-and-safety-policy/" className="text-[#997819] font-bold">Health & Safety</Link>, Quality & Environmental Compliance</>,
                icon: <Trophy />,
              },
              {
                level: "Platinum",
                desc: "Maximum Audit Readiness & Supply Chain Confidence",
                icon: <ShieldCheck />,
              },
            ].map((tier, i) => (
              <div
                key={i}
                className="group p-10 bg-white rounded-[2rem] border border-zinc-100 hover:border-[#997819] transition-all duration-500 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-zinc-300 group-hover:text-[#997819]/10 transition-colors">
                  <span className="text-8xl font-black leading-none italic">
                    {i + 1}
                  </span>
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all duration-500 mb-8">
                    {tier.icon}
                  </div>
                  <h3 className="text-3xl font-black text-[#12066a] mb-2">
                    {tier.level}
                  </h3>
                  <p className="text-zinc-700 font-medium text-sm">
                    {tier.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 3. LEVELS EXPLAINED (Clean Single Row Layout) */}
      <section className="py-14 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* --- Header Row (Heading & Intro) --- */}
          <div className="max-w-7xl  mb-16">
            <FadeIn direction="up">
              {/* Container ko center karne ke liye flex aur text-center add kiya hai */}
              <div className="text-center max-w-7xl mx-auto mb-16">
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                  Membership Insight
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                  Constructionline <br />
                  <span className="text-[#997819]">Levels Explained</span>
                </h2>
                <p className="text-zinc-600 md:mx-30 text-lg  font-medium leading-relaxed">
                  <Link href="https://bizgrow-holdings.com/get-constructionline-accreditation-its-requirements/" className="text-[#997819] font-bold">Constructionline</Link> offers different levels to match your
                  business size, risk profile, and buyer requirements. Choosing
                  the right level helps you qualify for the right contracts,
                  without overcomplicating compliance.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* --- Cards Row (All 3 in one line) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: "Silver",
                subtitle: "PAS91 & Basic PQQ",
                desc: "Ideal for SMEs and subcontractors starting or targeting lower-risk projects where basic pre-qualification is required.",
                icon: <ShieldCheck size={24} />,
                accent: "border-zinc-200",
              },
              {
                level: "Gold",
                subtitle: "Full H&S, Quality & Environment",
                desc: "Best for growing businesses bidding for higher-value contracts that demand strong H&S, Quality, and Environmental systems.",
                icon: <Award size={24} />,
                accent: "border-[#997819]/30",
              },
              {
                level: "Platinum",
                subtitle: "Maximum Audit & Supply Chain Trust",
                desc: <>Designed for established companies working with major buyers who require enhanced <Link href="/interal-audit" className="text-[#997819] font-bold">audits</Link> and highest level of assurance.</>,
                icon: <Briefcase size={24} />,
                accent: "border-[#12066a]/30",
              },
            ].map((detail, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                <div
                  className={`h-full p-10 rounded-[3rem] bg-zinc-50 border ${detail.accent} group hover:bg-[#12066a] transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 flex flex-col`}
                >
                  {/* Level Title */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#997819] group-hover:bg-[#997819] group-hover:text-white transition-all duration-500 shadow-sm">
                      {detail.icon}
                    </div>
                    <h3 className="text-2xl font-black text-[#12066a] group-hover:text-white transition-colors">
                      {detail.level}
                    </h3>
                  </div>

                  {/* Subtitle */}
                  <span className="text-[#997819] font-bold text-sm uppercase tracking-wider mb-4 block">
                    {detail.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-zinc-500 font-medium leading-relaxed group-hover:text-blue-100/70 transition-colors">
                    {detail.desc}
                  </p>

                  {/* Subtle Arrow Decorative */}
                  <div className="mt-auto pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-px bg-white/10 mb-4" />
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                      Learn More
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* 🔹 4. WHY IT MATTERS (Blueprint Split Layout) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* 🔹 flex-col-reverse added for mobile, lg:flex-row remains for desktop */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
            {/* 🔹 Image Container (Now goes bottom on mobile) */}
            <div className="lg:w-1/2 relative w-full mt-12 lg:mt-0">
              <div className="absolute -inset-4 bg-zinc-100 rounded-[3.5rem] md:rounded-[4rem] -rotate-3" />
              <div className="relative rounded-[3.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                <Image
                  src="/blueprint-work.jpg"
                  width={600}
                  height={700}
                  alt="Reasons to Choose Constructionline - BizGrow Holdings Ltd"
                  className="object-cover w-full h-[500px] md:h-[700px]"
                />
              </div>
            </div>

            {/* 🔹 Content Container (Now stays top on mobile) */}
            <div className="lg:w-1/2">
              <h3 className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6">
                Market Authority
              </h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#12066a] tracking-tighter leading-none">
                Reasons to Choose
                <span className="text-[#997819] block mt-2">
                  {" "}
                  Constructionline
                </span>
              </h2>
              <p className="py-6 text-zinc-600 leading-relaxed">
                <Link href="https://bizgrow-holdings.com/9-construction-safety-certifications-every-workplace-needs/" className="text-[#997819] font-bold">Constructionline</Link> is a trusted prequalification platform that
                helps construction businesses prove their compliance,
                credibility, and capability to buyers across the UK. It
                simplifies the tendering process and increases your visibility
                to top contractors and public sector clients.
              </p>

              <p className="font-bold text-xl md:text-2xl py-2 text-black mb-6">
                Why choose Constructionline?
              </p>

              <div className="space-y-8">
                {[
                  {
                    t: "Recognised by UK Buyers",
                    d: "Widely accepted by contractors and public sector organisations across the UK.",
                  },
                  {
                    t: "Faster Tender Access",
                    d: "Meet prequalification requirements once and apply for multiple opportunities with ease.",
                  },
                  {
                    t: "Compliance Made Simple",
                    d: <>Covers key areas like PAS91, <Link href="https://bizgrow-holdings.com/is-your-security-business-losing-work-without-constructionline/" className="text-[#997819] font-bold">Health & Safety</Link>, and financial checks.</>,
                  },
                  {
                    t: "Boosts Business Credibility",
                    d: "Shows buyers that your business meets industry standards and best practices.",
                  },
                  {
                    t: "More Opportunities, Less Hassle",
                    d: "Reduces paperwork while increasing your chances of winning contracts.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="shrink-0 w-2 h-2 rounded-full bg-[#997819] mt-3 group-hover:scale-150 transition-transform" />
                    <div>
                      <h3 className="font-black text-[#12066a] text-lg uppercase leading-tight mb-1">
                        {item.t}
                      </h3>
                      <p className="text-zinc-500 font-medium leading-snug">
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. PROCUREMENT METRICS (Dark Dashboard Style) */}
      <section className="py-24 bg-[#12066a] mx-6 rounded-[4rem] my-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { n: "2,500+", t: "Active Buyers" },
              { n: "45k+", t: "Registered Firms" },
              { n: "£1Bn+", t: "Contract Value" },
              { n: "100%", t: "Audit Support" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center md:text-left border-l border-white/10 pl-8"
              >
                <h5 className="text-5xl font-black text-white tracking-tighter mb-2">
                  {stat.n}
                </h5>
                <p className="text-[#997819] font-black uppercase tracking-widest text-[10px]">
                  {stat.t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 6. OUR PROCESS (Refined Left-Aligned Stepper) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT SIDE: STEPS */}
            <div className="relative">
              <FadeIn direction="right">
                <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-[0.9] py-6 uppercase">
                  Benefits for Your <br />
                  <span className="text-[#997819]">Business</span>
                </h2>
              </FadeIn>
              <FadeIn direction="right">
                <p>
                  Whether you’re a contractor, subcontractor, or client, you
                  will all benefit from <Link href="https://bizgrow-holdings.com/constructionline-rejections-uk-contractors-repeat/" className="text-[#997819] font-bold">ConstructionLine certification</Link>:
                </p>
              </FadeIn>
              <div className="space-y-10 relative">
                {/* Vertical line connecting numbers */}
                <div className="absolute left-6 top-10 bottom-10 w-px bg-zinc-100 z-0 hidden md:block" />

                {/* --- SECTION: CONTRACTORS --- */}
                <div className="mb-14">
                  <h3 className="text-[#997819] font-black text-sm uppercase tracking-[0.3em] my-6 md:ml-20">
                    For Contractors
                  </h3>
                  {[
                    "Win contracts more easily",
                    "Be recognised as an approved and trustworthy business",
                    "Bidding is more straightforward, saving you time and money.",
                  ].map((item, i) => (
                    <FadeIn key={i} delay={i * 0.1} direction="up">
                      <div className="flex items-start gap-8 group relative z-10 mb-10 last:mb-0">
                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[#12066a] font-black text-xl group-hover:bg-[#12066a] group-hover:text-white transition-all duration-500 shadow-sm">
                          0{i + 1}
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="flex items-center gap-4 mb-2">
                            <h4 className="font-black text-[#12066a] uppercase text-base tracking-tight">
                              {item.split(" ").slice(0, 2).join(" ")}{" "}
                              {/* Pehle 2 words heading */}
                            </h4>
                            <div className="h-px flex-1 bg-zinc-100 group-hover:bg-[#997819]/30 transition-all duration-500" />
                          </div>
                          <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-md italic">
                            {item}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {/* --- SECTION: CLIENTS --- */}
                <div>
                  <h3 className="text-[#997819] font-black text-sm uppercase tracking-[0.3em] my-4 md:ml-20">
                    For Clients
                  </h3>
                  {[
                    "Work with an approved, verified, and high-quality contractor",
                    "Lower your risk by working with compliant partners",
                    "Easier project management and confidence with your suppliers.",
                  ].map((item, i) => (
                    <FadeIn key={i + 3} delay={i * 0.1} direction="up">
                      <div className="flex items-start gap-8 group relative z-10 mb-10 last:mb-0">
                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[#12066a] font-black text-xl group-hover:bg-[#997819] group-hover:text-white transition-all duration-500 shadow-sm">
                          0{i + 4}
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="flex items-center gap-4 mb-2">
                            <h4 className="font-black text-[#12066a] uppercase text-base tracking-tight">
                              {item.split(" ").slice(0, 2).join(" ")}
                            </h4>
                            <div className="h-px flex-1 bg-zinc-100 group-hover:bg-[#997819]/30 transition-all duration-500" />
                          </div>
                          <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-md italic">
                            {item}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: VISUAL ELEMENT */}
            <div className="sticky top-32">
              <div className="bg-[#12066a] rounded-[3.5rem] p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="aspect-[4/5]  w-full bg-zinc-900 rounded-[3rem] overflow-hidden relative">
                  <Image
                    src="/construction-process.jpg"
                    fill
                    className="object-cover opacity-50 group-hover:scale-110 transition-transform  duration-[2s]"
                    alt="Benefits for Constructionline - BizGrow Holdings Ltd"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Animated Target Radar */}
                      <div className="absolute inset-0 rounded-full bg-[#997819]/20 animate-ping" />
                      <div className="w-28 h-28 bg-[#997819]/90 backdrop-blur-sm rounded-full flex items-center justify-center relative z-10 border-4 border-white/20">
                        <Target className="text-white" size={44} />
                      </div>
                    </div>
                  </div>
                  {/* Bottom Label Overlay */}
                  <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                    <p className="text-white font-black uppercase tracking-widest text-[10px]">
                      Project Milestone Tracker
                    </p>
                    <div className="h-1 w-full bg-white/20 mt-3 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-[#997819] animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 7. TECHNICAL CHECKLIST (Minimalist Strip) */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-16 gap-y-10">
          {[
            "Financial Records",
            "H&S Policies",
            "Anti-Bribery Policy",
            "Modern Slavery Statement",
            "Equal Ops",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <ArrowUpRight className="text-[#997819]" size={16} />
              <span className="font-black uppercase tracking-tighter text-[11px] text-[#12066a]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 8. CTA SECTION (Rebuilt for Stable Parallax) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Container */}
          <div className="relative group overflow-hidden rounded-[3.5rem] p-10 md:p-24 shadow-2xl flex flex-col items-center text-center bg-[#12066a]">
            {/* 🔹 background-attachment: fixed replacement for stability */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 bg-cover bg-center "
                style={{
                  backgroundImage: "url('/constructionline-cta.jpg')",
                  backgroundAttachment: "fixed", // Standard fallback
                  height: "100%",
                  width: "100%",
                }}
              />
              {/* Dark Overlays */}
              <div className="absolute inset-0 bg-[#12066a]/50 mix-blend-multiply z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#12066a] via-transparent to-[#12066a]/20 z-20" />
            </div>

            {/* Content Area */}
            <div className="relative z-30 w-full max-w-4xl flex flex-col items-center">
              <FadeIn direction="up">
                <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-10">
                  Ready for Tier-1 Work
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-normal leading-[0.85] mb-8 uppercase">
                  Next
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37] inline-block mt-2 ml-3">
                    Step.
                  </span>
                </h2>
                <p className="text-white font-bold text-xl">
                  For further Information please contact us
                </p>
              </FadeIn>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
                <FadeIn direction="up" delay={0.2}>
                  <Link href="/contact-us">
                  <button className="relative group/btn overflow-hidden w-full sm:w-64 bg-[#997819] text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(153,120,25,0.4)]">
                    <span className="relative z-40 group-hover/btn:text-[#12066a] transition-colors duration-500">
                      Contact US Now
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
                  </button>
                  </Link>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConstructionlinePage;

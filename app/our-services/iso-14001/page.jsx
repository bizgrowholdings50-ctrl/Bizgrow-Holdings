import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  Leaf,
  Globe,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Recycle,
  Wind,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "ISO 14001 Certification UK | Environmental Management System",
  description:
    "Achieve ISO 14001 Certification with BizGrow Holdings, helping UK businesses stay compliant, reduce impact, and strengthen sustainability.",
};

const ISO14001Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (BizGrow Branding) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/iso-14001-hero.jpg"
            alt="ISO 14001 Certification"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[10rem] md:text-[15rem] font-black text-white/[0.04] leading-none uppercase tracking-tighter">
            ISO-14001
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                Environmental Management System
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-5xl md:text-6xl font-black text-white mt-2 md:mt-6 leading-[1.1] tracking-tighter">
                ISO 14001 <br />
                <span className="text-[#997819]">
                  Environmental Management System (EMS)
                </span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-10 text-blue-100/60 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium">
                "ISO 14001 certification with{" "}
                <Link
                  href="https://bizgrow-holdings.com/"
                  className="text-[#997819] font-bold"
                >
                  BizGrow Holdings
                </Link>{" "}
                enhances credibility, supports tender opportunities, and shows
                commitment to environmental responsibility."
              </p>
            </FadeIn>

            <FadeIn direction="right" duration="1.0">
              <div className="mt-4 md:mt-12 w-32 h-2 bg-[#997819] rounded-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. THE ECO-GRID (Layout Changed to 3-Columns staggered) */}
      <section className="py-22 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-5xl font-black text-[#12066a] tracking-tighter">
                Beyond <br />{" "}
                <span className="text-[#997819]">
                  Environmental Compliance.
                </span>
              </h2>
              <p className="text-zinc-500 font-medium">
                <Link
                  href="https://bizgrow-holdings.com/iso-14001-consulting-services/"
                  className="text-[#997819] font-bold"
                >
                  ISO 14001
                </Link>{" "}
                helps UK businesses reduce their environmental impact, improve
                operational efficiency, and strengthen regulatory compliance.
              </p>
              <div className="h-64 bg-[#12066a] rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden relative">
                <Wind
                  className="text-[#997819] absolute -right-4 -top-4 opacity-20"
                  size={150}
                />
                <span className="text-white font-black text-2xl relative z-10 uppercase italic">
                  Net Zero <br /> Strategy
                </span>
                <p className="text-white">
                  Create a measurable environmental management framework for
                  carbon reduction and sustainability goals.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                {
                  t: "Cost Reduction",
                  d: "Identify waste, reduce energy use, and improve resource management to lower costs and boost efficiency.",
                  icon: <Recycle />,
                  bg: "bg-white",
                },
                {
                  t: "Legal Protection",
                  d: (
                    <>
                      Ensure{" "}
                      <Link
                        href="https://bizgrow-holdings.com/compliance-consultancies/"
                        className="text-[#997819] font-bold"
                      >
                        compliance
                      </Link>{" "}
                      with UK environmental legislation to minimise penalties,
                      enforcement, and reputational risks.
                    </>
                  ),
                  icon: <ShieldCheck />,
                  bg: "bg-white",
                },
                {
                  t: "Resource Efficiency",
                  d: "Implement systems to better manage materials, suppliers, and environmental risks.",
                  icon: <Globe />,
                  bg: "bg-[#997819] text-white",
                },
                {
                  t: "Market Trust",
                  d: "Enhance credibility in tenders and contracts needing eco-friendly suppliers",
                  icon: <Leaf />,
                  bg: "bg-white",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-10 rounded-[3rem] ${item.bg} shadow-sm hover:shadow-xl transition-all duration-500`}
                >
                  <div
                    className={`mb-6 ${
                      i === 2 ? "text-white" : "text-[#997819]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">
                    {item.t}
                  </h3>
                  <p className="opacity-70 font-medium">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 NEW SECTION: ISO 14001 Certification Process */}
      <section className="py-22 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content: Text & Header */}
            <div>
              <FadeIn direction="right">
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                  How it works
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-tight mb-8">
                  ISO 14001 <br />
                  <span className="text-[#997819]">Certification Process.</span>
                </h2>
                <p className="text-zinc-600 text-lg font-medium leading-relaxed mb-8">
                  At{" "}
                  <Link
                    href="https://bizgrow-holdings.com/about-us/"
                    className="text-[#997819] font-bold"
                  >
                    BizGrow Holdings
                  </Link>
                  , we have streamlined the ISO 14001 certification process,
                  making it structured, easy to understand, and totally aligned
                  with UK environmental standards.
                </p>
                <div className="bg-[#12066a]/5 border-l-4 border-[#997819] p-6 rounded-r-2xl">
                  <p className="text-[#12066a] font-bold italic">
                    "Achieve certification and create a framework for a culture
                    of environmental responsibility and continuous improvement."
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Right Content: The Process Steps */}
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Gap Analysis",
                  desc: (
                    <>
                      Our experts assess your existing environmental activity
                      and compare this against the{" "}
                      <Link
                        href="https://bizgrow-holdings.com/why-clients-trust-iso-14001-certified-suppliers-in-the-uk/"
                        className="text-[#997819] font-bold"
                      >
                        ISO 14001
                      </Link>{" "}
                      standard to identify improvements.
                    </>
                  ),
                  icon: <BarChart3 size={24} />,
                },
                {
                  step: "02",
                  title: "Development & Implementation",
                  desc: (
                    <>
                      We create all necessary documents and policies using the
                      intuitive{" "}
                      <Link
                        href="https://bizgrow-holdings.com/qms-software/"
                        className="text-[#997819] font-bold"
                      >
                        BizGrow QMS
                      </Link>{" "}
                      System and embed them into your culture.
                    </>
                  ),
                  icon: <ShieldCheck size={24} />,
                },
                {
                  step: "03",
                  title: "Certification",
                  desc: "An external certified auditor will check your compliance and approve certification, proving your commitment to sustainability.",
                  icon: <CheckCircle2 size={24} />,
                },
              ].map((item, idx) => (
                <FadeIn key={idx} direction="left" delay={idx * 0.2}>
                  <div className="group relative bg-zinc-50 hover:bg-[#12066a] p-8 rounded-[2.5rem] transition-all duration-500 border border-zinc-100 hover:border-[#12066a] shadow-sm hover:shadow-2xl">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-inner flex items-center justify-center text-[#997819] group-hover:bg-[#997819] group-hover:text-white transition-all duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-[#997819] font-black text-xs tracking-widest uppercase opacity-60 group-hover:text-white/60">
                          Step {item.step}
                        </span>
                        <h3 className="text-2xl font-black text-[#12066a] group-hover:text-white mb-3 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-zinc-500 group-hover:text-blue-100/70 font-medium text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    {/* Hover Decoration */}
                    <div className="absolute top-6 right-8 text-6xl font-black text-[#12066a]/5 group-hover:text-white/5 transition-colors">
                      {item.step}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 3. FEATURE SPLIT (Refined) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
            <div className="lg:w-1/2">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                Authority
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                Supply Chain <br />{" "}
                <span className="text-[#997819]">Advantage.</span>
              </h2>
              <div className="border-l-8 border-[#997819] pl-8 py-4">
                <p className="text-xl text-zinc-600 font-bold italic leading-relaxed">
                  "Many UK contractors now require{" "}
                  <Link
                    href="/iso-14001-requirements"
                    className="text-[#997819] hover:underline"
                  >
                    ISO 14001
                  </Link>{" "}
                  certification as a condition for tender eligibility.
                  Environmental compliance has become a key supply chain
                  requirement."
                </p>
              </div>
              {/* Fixed empty bg class and added Link wrapper */}
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-4 font-black uppercase tracking-widest text-sm text-[#12066a] hover:text-[#997819] transition-colors group"
              >
                Enhance your supply chain today
                <CheckCircle2
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </Link>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="w-full relative aspect-square bg-[#12066a] rounded-[4rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                <Image
                  src="/supply-chain.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-80 scale-110"
                  alt="UK business professionals discussing environmental supply chain compliance"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 4. DOCUMENTATION (Corrected Heading Hierarchy) */}
      <section className="py-32 bg-[#12066a] text-white rounded-[5rem] mx-4 my-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-10">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              What’s Included in{" "}
              <span className="text-[#997819]">ISO 14001?</span>
            </h2>
            <p className="my-4 text-blue-100/60 max-w-2xl">
              The framework enables UK businesses to manage and improve
              environmental performance through these core pillars:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              "Environmental Policy",
              "Planning & Objectives",
              "Implementation & Operational Control",
              "Performance Evaluation",
              "Legal & Regulatory Compliance",
              "Management Review",
            ].map((doc, idx) => (
              <div key={idx} className="group cursor-default">
                <span className="text-[#997819] font-black text-xs block mb-2 opacity-80">
                  0{idx + 1}
                </span>
                <div className="h-px bg-white/20 w-full mb-6 group-hover:bg-[#997819] group-hover:w-full transition-all duration-500" />
                <h4 className="text-xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {doc}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. CTA SECTION (With Compulsory Background Image) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative group overflow-hidden rounded-[3.5rem] p-10 md:p-24 shadow-2xl flex flex-col items-center text-center">
            {/* 🖼️ COMPULSORY BACKGROUND IMAGE - REFINED FOR VISIBILITY */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/iso-14001-cta.jpg"
                alt="ISO 14001 environmental management consultation CTA"
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Branding Overlay - Sligthly reduced opacity to let the image breathe */}
              <div className="absolute inset-0 bg-[#12066a]/70 mix-blend-multiply z-10" />

              {/* Gradient to ensure text is readable but image is still visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12066a] via-[#12066a]/40 to-transparent z-20" />
            </div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
              <FadeIn direction="up">
                <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] md:text-xs bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-10">
                  Global Sustainability Standard
                </span>

                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-8">
                  Ready to Strengthen Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37] inline-block mt-2">
                    Environmental Strategy?
                  </span>
                </h2>

                <p className="text-blue-100/60 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                  Our ISO 14001 consultancy supports UK businesses in reducing
                  environmental risk, improving operational efficiency, and
                  strengthening tender competitiveness
                </p>
              </FadeIn>

              {/* 🔘 COMPACT BUTTONS GRID */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                <FadeIn direction="up" delay={0.2}>
                  <Link href="/contact">
                    <button className="relative group/btn overflow-hidden w-full sm:w-64 bg-[#997819] text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(153,120,25,0.4)]">
                      <span className="relative z-10 group-hover/btn:text-[#12066a] transition-colors duration-500">
                        Start your ISO 14001 journey today
                      </span>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0" />
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

export default ISO14001Page;

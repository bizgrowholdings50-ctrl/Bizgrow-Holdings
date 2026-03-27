import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Users,
  FileCheck,
  Search,
  Award,
  ArrowRight,
  ShieldAlert,
  BarChart,
  ClipboardList,
  Briefcase,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "SIA ACS Certification | BizGrow Holdings Ltd ",
  description:
    "Achieve SIA ACS certification with BizGrow Holdings. Elevate your UK security business with Compliance, Trusted Standards, & Excellence. ",
};

const SIAACSPage = () => {
  return (
    <main className="bg-white text-zinc-900">
      {/* 🔹 1. HERO SECTION (Consistent with About/Home) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* 🔹 Step 1: Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/sia-acs-hero.jpg" // Is page ke liye specific image
            alt="SIA ACS - BizGrow Holdings Ltd"
            fill
            className="object-cover"
            priority
          />
          {/* Black Overlay Effect for Text Readability */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
        </div>

        {/* 🔹 Step 3: Large Watermark Text (Middle Layer) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <h2 className="text-[12rem] md:text-[25rem] font-black text-white/[0.12] leading-none uppercase tracking-tighter">
            ACS
          </h2>
        </div>

        {/* 🔹 Step 4: Actual Content (Top Layer) */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                UK SECURITY COMPLIANCE EXPERTS
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-4xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                SIA ACS <br />
                <span className="text-[#997819]">Certification</span> Excellence
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-8 text-blue-100/80 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium">
                BizGrow Holdings provides specialist SIA ACS consultancy
                services designed to help UK security businesses meet assessment
                criteria, improve operational performance, and achieve
                successful accreditation.
              </p>
            </FadeIn>

            {/* Signature Decor Line */}
            <FadeIn direction="right" duration="1.0">
              <div className="mt-12 w-32 h-2 bg-[#997819] rounded-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. DEEP INTRO PARAGRAPH (SEO & Authority) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <FadeIn direction="right">
                <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter mb-8">
                  Excellence in the{" "}
                  <span className="text-[#997819]">
                    Approved Contractor Scheme
                  </span>
                </h2>
                <div className="space-y-6 text-zinc-600 text-lg leading-relaxed font-medium">
                  <p>
                    The Security Industry Authority (SIA) Approved Contractor
                    Scheme (ACS) represents the highest standard of operational
                    competence for UK security providers. At BizGrow Holdings,
                    we guide security companies through every stage of the ACS
                    accreditation process, ensuring full alignment with the SIA
                    Self-Assessment Workbook (SAW) and performance indicators.
                    Our consultancy is built on structured compliance
                    implementation, not generic templates. We integrate robust
                    management systems across recruitment, vetting, training,
                    supervision, and financial governance to help you meet all
                    88 ACS assessment indicators and achieve strong, audit-ready
                    outcomes.
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-4 bg-[#12066a] p-10 rounded-[3rem] border border-zinc-100 shadow-sm ">
              <h4 className="text-white font-black uppercase tracking-widest text-md mb-6">
                ACS Compliance Focus Areas:
              </h4>
              <ul className="space-y-4">
                {[
                  "Self-Assessment Workbook (SAW) preparation ",
                  "Performance Indicator alignment (88 criteria) ",
                  "Workforce screening compliance",
                  "Risk management systems ",
                  "Internal audit & improvement planning ",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-white font-bold"
                  >
                    <CheckCircle2 size={18} className="text-[#997819]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. THE 8 CORE CRITERIA (Technical Depth) */}
      <section className="py-12 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                The Audit Framework
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter ">
                The 8 Core Pillars of{" "}
                <span className="text-[#997819]">SIA ACS Compliance </span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                t: "Strategic Direction",
                d: "Clear governance, defined objectives, and structured policies aligned with ACS requirements.",
              },
              {
                t: "Service Delivery ",
                d: "Consistent operational standards focused on performance and client satisfaction. ",
              },
              {
                t: "Commercial Integrity ",
                d: "Transparent contracts, ethical marketing, and compliant procurement practices.",
              },
              {
                t: "Financial Stability",
                d: "Proven financial control, tax compliance, and business continuity planning. ",
              },
              {
                t: "Operational Resource Management",
                d: "Ensuring effective deployment of personnel, equipment control, and structured risk management systems. ",
              },
              {
                t: "Workforce Compliance ",
                d: "Embedding BS 7858 vetting, structured training programmes, and competency monitoring across all operational roles.",
              },
              {
                t: "Leadership & Accountability ",
                d: "Establishing executive oversight, management accountability, and continuous performance review mechanisms. ",
              },
              {
                t: "Client Experience & Continuous Improvement ",
                d: "Implementing complaint handling, client feedback, and corrective actions for continuous improvement. ",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="relative group p-8 bg-white border border-zinc-200 rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl"
              >
                {/* 🟦 Background Sliding Layer (Left to Right) */}
                <div className="absolute inset-0 bg-[#12066a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />

                {/* Content Layer (z-10) */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Title - Turns Gold on Hover */}
                  <h4 className="text-xl font-black text-[#12066a] mb-3 group-hover:text-[#997819] transition-colors duration-500 uppercase tracking-tighter leading-tight">
                    {pillar.t}
                  </h4>

                  {/* Description - Turns White on Hover */}
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover:text-blue-100/70 transition-colors duration-500">
                    {pillar.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. ADVANTAGES SECTION (Clean Centered Layout) */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#997819]/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          {/* --- Centered Header Row --- */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                Competitive Edge
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                Advantages of Being <br />
                <span className="text-[#997819]">SIA ACS Approved</span>
              </h2>
              <p className="text-zinc-600 text-lg font-medium leading-relaxed">
                Accreditation under the SIA ACS provides security companies with
                a powerful benchmark for credibility, building lasting
                confidence among high-tier clients and stakeholders across the
                UK.
              </p>
            </FadeIn>
          </div>

          {/* --- Advantages Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Legal Compliance",
                desc: "Demonstrate full alignment with UK laws, ensuring professional accountability and regulatory adherence.",
                icon: <ShieldCheck className="text-[#997819]" size={28} />,
              },
              {
                title: "Operational Excellence",
                desc: "Leverage industry best practices to streamline operations, maintain consistency, and deliver top-tier results.",
                icon: <TrendingUp className="text-[#997819]" size={28} />,
              },
              {
                title: "Access to Contracts",
                desc: "Unlock premium government and private sector tenders that strictly require SIA ACS approval.",
                icon: <Briefcase className="text-[#997819]" size={28} />,
              },
              {
                title: "Reduction in Risk",
                desc: "Mitigate legal and operational liabilities by embedding audited compliance into your core business model.",
                icon: <ShieldAlert className="text-[#997819]" size={28} />,
              },
              {
                title: "Credibility & Trust",
                desc: "Provide tangible proof of quality, giving clients complete confidence in your security services.",
                icon: <Award className="text-[#997819]" size={28} />,
              },
              {
                title: "Improved Credibility",
                desc: "Public recognition as an SIA ACS-approved service demonstrates credibility as a respected and trusted UK security service provider. ",
                icon: <CheckCircle2 className="text-[#997819]" size={28} />,
              },
            ].map((adv, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                <div className="group p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 transition-all duration-500 hover:bg-[#12066a] hover:shadow-[0_40px_80px_-15px_rgba(18,6,106,0.3)] hover:-translate-y-3 h-full flex flex-col items-center text-center">
                  {/* Icon Container with subtle animation */}
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8  group-hover:rotate-[10deg] transition-all duration-500">
                    <div className="group-hover:text-white transition-colors duration-500">
                      {adv.icon}
                    </div>
                  </div>

                  <h4 className="text-2xl font-black text-[#12066a] mb-4 group-hover:text-white transition-colors tracking-tight">
                    {adv.title}
                  </h4>

                  <p className="text-zinc-500 font-medium leading-relaxed group-hover:text-blue-100/70 transition-colors">
                    {adv.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. OUR PROCESS (Roadmap) */}
      <section className="py-32 bg-[#12066a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10 leading-none">
                Our ACS Success <br />
                <span className="text-[#997819]">Framework.</span>
              </h2>
              <div className="space-y-12">
                {[
                  {
                    n: "01",
                    t: "Compliance Assessment ",
                    d: "We evaluate your current systems against the SIA ACS Self-Assessment Workbook requirements. ",
                  },
                  {
                    n: "02",
                    t: "System Development ",
                    d: "We structure policies, procedures, and evidence to meet ACS performance indicators.",
                  },
                  {
                    n: "03",
                    t: "Operational Integration",
                    d: "We embed compliance into recruitment, vetting, training, and service delivery processes. ",
                  },
                  {
                    n: "04",
                    t: "Audit Readiness Review ",
                    d: "We conduct a full pre-assessment review to ensure confident, assessor-ready performance.",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-4xl font-black text-white group-hover:text-[#997819] transition-colors duration-500">
                      {step.n}
                    </span>
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-tight">
                        {step.t}
                      </h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10">
                <Image
                  src="/methodology.jpg"
                  alt="SIA ACS compliance framework for the UK  "
                  fill
                  className="object-cover opacity-50 shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12066a]/80 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <p className="text-[#997819] font-black uppercase tracking-widest text-xs mb-2">
                    Did you know?
                  </p>
                  <p className="text-sm font-medium">
                    High-scoring ACS accreditation strengthens operational
                    credibility and enhances contract-winning potential across
                    UK security sectors.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 6. PRICING & CALL TO ACTION (CTA) */}
      <section className="py-22 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black text-[#12066a] tracking-tighter">
              Ready to Elevate Your
              <span className="text-[#997819]">ACS Score?</span>
            </h2>
            <p className="mt-4 text-zinc-500 text-sm font-medium">
              Tailored consultancy designed around your company structure and
              operational scope.
            </p>
          </div>

          {/* Background Image Container */}
          <div className="bg-[#12066a] p-12 md:p-32 rounded-[4rem] text-center text-white relative overflow-hidden group shadow-2xl">
            {/* 🔹 Step 1: Background Image with Parallax (No Scaling) */}
            <div
              className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/secure.jpg')", // Aapka image path
                backgroundAttachment: "fixed", // 👈 Yeh parallax create karega bina scale kiye
              }}
            />

            {/* 🔹 Step 2: Dark Overlay to keep text readable */}
            <div className="absolute inset-0 bg-[#12066a]/30 z-0" />

            {/* 🔹 Step 3: Decorative Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#997819] rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity z-10"></div>

            {/* Content Layer (z-10) */}
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black mb-8 tracking-tighter uppercase">
                Achieve SIA ACS Accreditation with Confidence
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button className="px-12 py-6 bg-[#997819] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-2xl active:scale-95">
                  Book ACS Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SIAACSPage;

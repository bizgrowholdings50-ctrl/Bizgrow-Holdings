import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import ServicesFaq from "@/components/ServicesFaq";
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  ShieldAlert,
  Briefcase,
  Layers,
  ListChecks,
  Clock,
  Building2,
  Gavel,
  HardHat,
  RefreshCcw,
  UserCheck,
  HeartPulse,
  GraduationCap,
  WalletCards,
  Settings2,
  ClipboardCheck,
  MessageSquareText,
  ArrowRight,
  FileText,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "SIA ACS Certification | BizGrow Holdings Ltd",
  description:
    "Achieve SIA ACS certification with BizGrow Holdings. Elevate your UK security business with Compliance, Trusted Standards, & Excellence.",
};

const siaAcsData = [
  {
    q: "Can a consultant help with SIA ACS preparation and compliance?",
    a: "Yes, a specialist consultant like BizGrow Holdings can guide your security business through every stage of SIA ACS preparation, from gap analysis and documentation to internal audits and assessment day support. They know exactly what SIA assessors look for and make sure your business is fully ready before the assessment takes place. Working with an experienced consultant significantly reduces the risk of failing and speeds up the entire process.",
  },
  {
    q: "What is the SIA Approved Contractor Scheme (ACS)?",
    a: "The SIA Approved Contractor Scheme is a voluntary quality standard for private security companies in the UK, managed by the Security Industry Authority. It assesses businesses against 78 achievement indicators covering staff vetting, training, health and safety, financial management, and operational procedures. Achieving ACS approval places your company on the official SIA register, which is checked by clients, government buyers, and large procurement teams before awarding security contracts.",
  },
  {
    q: "What are the benefits of becoming an SIA-approved contractor?",
    a: "The benefits of becoming an SIA-approved contractor include improved credibility, access to higher-value contracts, and increased client confidence. It also strengthens your business systems, operational processes, and competitive position within the UK security industry.",
  },
  {
    q: "What documents are required for an SIA ACS assessment?",
    a: "You will need a signed health and safety policy, staff vetting records confirming BS 7858 screening, SIA licence records for all operational staff and directors, training and competence evidence, financial accounts, and a quality management policy. You will also need documented operational procedures, complaint handling systems, and evidence of regular management reviews. All documents must be current, properly maintained, and specific to your actual business operations rather than generic templates.",
  },
];

const stats = [
  {
    icon: <Layers size={26} />,
    value: "Criteria ",
    label: "78 KPIs assessed during the process",
  },
  {
    icon: <FileText size={26} />,
    value: "Direct Contract",
    label: "At least one direct active contract required to apply.",
  },

  {
    icon: <Clock size={26} />,
    value: "Preparation",
    label: "2 to 4 Months Typical time needed before assessment",
  },
];

const SIAACSPage = () => {
  return (
    <main className="bg-white text-zinc-900">
      {/* 🔹 1. HERO SECTION */}
      <section className="relative h-screen texct  w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sia-acs-hero.jpg"
            alt="Professional SIA ACS Certification Consultancy UK"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
        </div>

        {/* Large Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[12rem] md:text-[25rem] font-black text-white/[0.12] leading-none uppercase tracking-tighter">
            ACS
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:mt-10 relative z-20 w-full">
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
              <p className="mt-8 text-blue-100/80 text-lg  max-w-2xl leading-relaxed font-medium">
                A recognised quality standard for UK private security companies,
                run by the Security Industry Authority. It shows your business
                meets recognised standards in staff checks, training, and daily
                operations, backed by real proof, not just paperwork.
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
      {/* 🔹 2. STATS STRIP (overlapping the hero) */}
      <section className="relative z-30 px-6 -mt-20 md:-mt-14">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-zinc-100 grid grid-cols-1 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-zinc-100">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-8 md:p-10 flex flex-col items-center text-center gap-3"
                >
                  <div className="text-[#997819]">{s.icon}</div>
                  <p className="text-[#12066a] font-black text-lg md:text-xl tracking-tight leading-tight">
                    {s.value}
                  </p>
                  <p className="text-zinc-500 text-xs md:text-sm font-medium leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 3. DEEP INTRO & FOCUS AREAS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <FadeIn direction="right">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12066a] tracking-tight mb-8 leading-[1.15]">
                  Why This Certificate{" "}
                  <span className="text-[#997819]">Matters</span>
                </h2>
                <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed font-medium">
                  <p>
                    SIA ACS approval puts your business on the SIA's official
                    list. Clients and government buyers check this list before
                    they hire a security company.
                  </p>
                  <p>
                    Without it, you could lose contracts to companies that
                    already hold ACS, even if your work is just as good. Clients
                    simply can't trust what they can't verify.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5 bg-[#12066a] p-8 md:p-10 rounded-[2.5rem] border border-zinc-100 shadow-xl">
              <h3 className="text-white font-black uppercase tracking-widest text-sm md:text-md mb-6">
                ACS Compliance Focus Areas:
              </h3>
              <ul className="space-y-4" role="list">
                {[
                  "Self-Assessment Workbook (SAW) preparation",
                  "Performance Indicator alignment (78 criteria)",
                  "Workforce screening compliance",
                  {
                    text: "Risk management systems",
                    link: "https://bizgrow-holdings.com/what-does-rams-stand-for/",
                  },
                  {
                    text: "Internal audit",
                    link: "https://bizgrow-holdings.com/our-services/internal-audit/",
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-white font-bold leading-tight"
                  >
                    <CheckCircle2
                      size={22}
                      className="text-[#997819] flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-base md:text-lg">
                      {typeof item === "string" ? (
                        item
                      ) : (
                        <Link
                          href={item.link}
                          className="hover:text-[#997819] transition-colors"
                        >
                          {item.text}
                        </Link>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 3. THE 8 CORE CRITERIA */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <div className="flex items-center justify-center gap-4 w-fit mx-auto mb-4">
                {/* Left Line */}
                <span className="w-10 h-0.5 bg-[#997819]" />

                {/* Text (Hata dein block class ko taake break na ho) */}
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs">
                  THE BUSINESS ADVANTAGE
                </span>

                {/* Right Line */}
                <span className="w-10 h-0.5 bg-[#997819]" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter">
                With SIA ACS,{" "}
                <span className="text-[#997819]">Your Business Gets:</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                t: "More Trust",
                d: "Proof that your staff, systems, and training meet a real national standard",
              },
              {
                t: "Bigger Contracts",
                d: "Many governments and corporate tenders ask for ACS as a basic requirement",
              },
              {
                t: "Fewer Client Worries",
                d: "Clients know your checks and training are real, not just promises",
              },
              {
                t: "An Edge Over Competitors",
                d: "Not every security company has ACS, so it helps you stand out",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="relative group p-8 bg-white border border-zinc-200 rounded-3xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-[#12066a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-[#12066a] mb-3 group-hover:text-[#997819] transition-colors duration-500 uppercase">
                    {pillar.t}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium group-hover:text-blue-100/70 transition-colors duration-500">
                    {pillar.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* =========================================================
    1. WHO NEEDS SIA ACS & WHAT ACTIVITIES IT COVERS
========================================================= */}
      <section className="relative overflow-hidden bg-slate-50 py-24 md:py-32">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#997819]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4">
                <span className="w-10 h-[2px]  bg-[#997819]" />
                <span className="text-[#997819]  font-black uppercase tracking-[0.3em] text-xs">
                  Compliance & Scope Architecture
                </span>
                <span className="w-10 h-[2px]  bg-[#997819]" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tight leading-[1.1]">
                Who Needs <span className="text-[#997819]">SIA ACS</span> &{" "}
                <br className="hidden sm:inline" />
                For What Activities?
              </h2>
            </FadeIn>
          </div>

          {/* PART 1: WHO NEEDS THIS? (2 High-Impact Bento Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                tag: "PRIMARY TARGET",
                icon: Building2,
                title: "Security Companies",
                desc: "Security companies going for Approved Contractor status to establish market leadership and compliance trust.",
              },
              {
                tag: "TENDER & BIDDING",
                icon: Gavel,
                title: "Bidding Businesses",
                desc: "Businesses bidding for lucrative government or private sector tenders that strictly mandate ACS accreditation.",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                  <div className="relative group bg-white rounded-3xl p-8 md:p-10 border border-[#12066a]/10 shadow-[0_10px_40px_rgba(18,6,106,0.04)] hover:shadow-[0_20px_60px_rgba(18,6,106,0.08)] transition-all duration-500 overflow-hidden flex flex-col justify-between">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#12066a]/[0.02] via-transparent to-[#997819]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-[#12066a] text-[#997819] flex items-center justify-center shadow-lg shadow-[#12066a]/20 group-hover:scale-110 transition-transform duration-500">
                          <Icon size={28} strokeWidth={1.8} />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-[#997819] font-bold uppercase bg-[#997819]/10 px-3 py-1 rounded-full">
                          {card.tag}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-[#12066a] tracking-tight mb-4">
                        {card.title}
                      </h3>

                      <p className="text-slate-600 text-base leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>

                    {/* Bottom decorative border line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#997819] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* PART 2: WHAT ACTIVITIES DOES IT COVER? (Immersive Dark/Navy Box) */}
          <FadeIn direction="up">
            <div className="relative bg-[#12066a] rounded-3xl p-8 md:p-14 text-white shadow-2xl overflow-hidden">
              {/* Background decorative shapes */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#997819]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Info Column */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[#997819] font-mono text-xs uppercase tracking-[0.3em] font-bold block">
                    Service Scope Breakdown
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                    What Activities Does It Cover?
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed">
                    SIA ACS doesn’t approve your whole business at once.
                    Instead, it approves{" "}
                    <span className="text-[#997819] font-bold">
                      one service at a time
                    </span>
                    .
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 font-medium ">
                    "You only get approved for the exact services you actually
                    provide."
                  </div>
                </div>

                {/* Right 6 Services Grid Column */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Security guarding",
                    "Door supervision",
                    "Cash and valuables in transit",
                    "Close protection",
                    "Key holding",
                    "CCTV",
                  ].map((service, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-3.5 bg-white hover:bg-white p-4 rounded-xl border border-white/10 hover:border-white transition-all duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#997819] group-hover:scale-125 transition-transform shrink-0" />
                      <span className="text-[#12066a] group-hover:text-[#997819] font-bold text-sm tracking-wide transition-colors">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* =========================================================
    2. WHAT GETS CHECKED DURING ASSESSMENT
========================================================= */}
      <section className="relative overflow-hidden bg-black py-24 md:py-32">
        {/* Background Image with Cinematic Overlay & Custom Linear Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/path-to-your-assessment.jpg" // Yahan apni pasand ki background image ka path dein
            alt="Assessment Background"
            fill
            sizes="100vw"
            className="object-cover object-center attachment-fixed opacity-80"
          />
          {/* Soft Light & Deep Linear Color Overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-[#12066a] via-[#12066a]/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#12066a] via-[#12066a]/60 to-[#12066a]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="flex flex-col justify-between text-center items-center  mb-16 gap-6">
            <div>
              <div className="inline-flex items-center  gap-2 px-3.5 py-1.5 rounded-full  mb-4">
                <span className="w-10 h-0.5 bg-[#997819] " />
                <span className="text-[#997819]  font-black uppercase tracking-[0.3em] text-xs">
                  Audit Criteria Breakdown
                </span>
                <span className="w-10 h-0.5 bg-[#997819] " />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
                What Gets Checked
                <span className="text-[#997819] ml-2">During Assessment</span>
              </h2>
            </div>
            <p className="text-slate-300 text-base max-w-lg text-center font-light leading-relaxed">
              Our comprehensive evaluation ensures your security operations
              align strictly with SIA ACS and regulatory standards.
            </p>
          </div>

          {/* Modern Bento Grid Layout over Background Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: UserCheck,
                title: "Staff vetting and BS 7858 screening compliance",
                desc: "Rigorous background checks and employment history verification for personnel.",
                featured: true,
              },
              {
                icon: ShieldCheck,
                title: "SIA licence verification for staff and directors",
                desc: "Validating active licenses across all operational levels and leadership.",
                featured: false,
              },
              {
                icon: HeartPulse,
                title: "Health and safety policies and procedures",
                desc: "Comprehensive safety standards to protect workforce and client sites.",
                featured: false,
              },
              {
                icon: GraduationCap,
                title: "Training and competence records",
                desc: "Up-to-date professional development logs and certification tracking.",
                featured: false,
              },
              {
                icon: WalletCards,
                title: "Financial stability and business continuity",
                desc: "Assessing fiscal health, risk mitigation, and long-term operational resilience.",
                featured: true,
              },
              {
                icon: Settings2,
                title: "Operational procedures and service delivery",
                desc: "Standard operating workflows ensuring consistent execution on the ground.",
                featured: false,
              },
              {
                icon: ClipboardCheck,
                title: "Management reviews and corrective actions",
                desc: "Internal auditing protocols and systematic quality improvement frameworks.",
                featured: false,
              },
              {
                icon: MessageSquareText,
                title: "Client feedback and complaint handling systems",
                desc: "Structured channels for addressing client queries and service adjustments.",
                featured: false,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              const isFeatured = item.featured;

              return (
                <FadeIn
                  key={item.title}
                  direction="up"
                  delay={(index % 3) * 0.08}
                >
                  <div
                    className={`group relative h-full rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between overflow-hidden backdrop-blur-xl border ${
                      isFeatured
                        ? "bg-gradient-to-br from-white/[0.12] to-white/[0.04] border-[#997819]/50 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                        : "bg-white/[0.05] border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                    } hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]`}
                  >
                    {/* Glow overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#997819]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      {/* Top Row: Icon & Index Number */}
                      <div className="flex items-center justify-between mb-8 relative z-10">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
                            isFeatured
                              ? "bg-[#997819] text-white shadow-[#997819]/30 scale-105"
                              : "bg-white/10 border border-white/15 text-[#997819] group-hover:bg-[#997819] group-hover:text-white"
                          }`}
                        >
                          <Icon size={26} strokeWidth={1.8} />
                        </div>
                        <span className="font-mono text-sm font-bold tracking-[0.2em] text-white/40 group-hover:text-[#997819] transition-colors">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="relative z-10 text-xl font-bold leading-snug text-white mb-3 group-hover:text-[#997819] transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="relative z-10 text-slate-300 text-sm leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom decorative gold line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#997819] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
    3. HOW WE WORK WITH YOU
========================================================= */}
      <section className="relative overflow-hidden bg-[#f8f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                OUR PROCESS
              </span>

              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter">
                How We Work <span className="text-[#997819]">With You</span>
              </h2>
            </FadeIn>
          </div>

          {/* Process */}
          <div className="relative">
            {/* Desktop connecting lines */}
            <div className="absolute left-[8%] right-[8%] top-[35px] hidden h-px bg-[#12066a]/15 lg:block" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Eligibility & Route",
                  text: "We check that you meet SIA criteria and help you choose the standard or passport route.",
                },
                {
                  number: "02",
                  title: "Workbook & Evidence",
                  text: "We help complete your self-assessment workbook and close any evidence gaps.",
                },
                {
                  number: "03",
                  title: "Internal Audit",
                  text: "We run Internal  audit under real conditions, so nothing catches you off guard.",
                },
                {
                  number: "04",
                  title: "Assessment Support",
                  text: "We support you on assessment day and help you handle any follow-up actions.",
                },
              ].map((step) => (
                <div key={step.number} className="group relative">
                  {/* Step number */}
                  <div className="relative z-10 mb-7 flex h-[70px] w-[70px] items-center justify-center rounded-full border border-[#997819]/50 bg-[#f8f8fa] font-serif text-xl font-bold text-[#12066a] transition-all duration-300 group-hover:border-[#997819] group-hover:bg-[#12066a] group-hover:text-white">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="border-l-2 border-[#12066a]/10 pl-6 transition-colors duration-300 group-hover:border-[#997819]">
                    <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#12066a]">
                      {step.title}
                    </h3>

                    <p className="text-[15px] leading-7 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-14 flex flex-col gap-5 rounded-2xl bg-[#12066a] px-7 py-6 md:mt-20 md:flex-row md:items-center md:justify-between md:px-9">
            <div>
              <p className="text-lg font-semibold text-white">
                Ready to prepare for your ACS assessment?
              </p>

              <p className="mt-1 text-sm text-white/65">
                Get practical support from eligibility through assessment.
              </p>
            </div>

            <a
              href="/contact-us"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#997819] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#997819]/90 hover:gap-3"
            >
              Get Started
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      {/* 🔹 5. OUR PROCESS
      <section className="py-32 bg-[#12066a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-none">
                Our ACS Success <br />{" "}
                <span className="text-[#997819]">Framework.</span>
              </h2>
              <div className="space-y-12">
                {[
                  "Compliance Assessment",
                  "System Development",
                  "Operational Integration",
                  "Audit Readiness",
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-4xl font-black text-white group-hover:text-[#997819] transition-colors">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step}</h3>
                      <p className="text-white/70 text-sm">
                        Professional structuring to meet performance indicators.
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
                  alt="SIA ACS compliance framework methodology"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-50"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section> */}

      <ServicesFaq
        faqs={siaAcsData}
        title={
          <>
            SIA ACS <span className="text-[#997819]">FAQ's</span>
          </>
        }
        subtitle="Questions & Answers"
      />
      {/* 🔹 6. CTA SECTION */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto bg-[#12066a] p-12 md:p-24 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase">
              Ready to Elevate Your{" "}
              <span className="text-[#997819]">ACS Score?</span>
            </h2>
            <Link
              href="/contact-us"
              className="bg-[#997819] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#12066a] transition-all inline-block"
            >
              Book ACS Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SIAACSPage;

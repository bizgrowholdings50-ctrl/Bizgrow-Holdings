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
import ServicesFaq from "@/components/ServicesFaq";

import { createOpenGraph } from "@/lib/openGraphMetadata";

export const metadata = {
  title: "ConstructionLine Certification Consultant | BizGrow Holdings",
  description:
    "Get ConstructionLine Certification with BizGrow Holdings Ltd. Build Trust, Win Contracts, and Grow your UK Construction Business",
  openGraph: createOpenGraph(
    "/our-services/constructionline/",
    "/constructionline-service.jpg",
  ),
};

const constructionlineData = [
  {
    q: "How to get Constructionline accreditation?",
    a: "Register your business on the Constructionline portal, choose the appropriate membership level based on your business size and the contracts you want to win, and complete the PAS 91-aligned questionnaire covering health and safety, financial standing, insurance, and management policies. Upload all required supporting documents through the portal and respond promptly to any queries raised by the Constructionline assessor during the review process. BizGrow Holdings supports UK businesses through the full Constructionline accreditation process, from document preparation to successful approval.",
  },
  {
    q: "Is Constructionline worth it?",
    a: "Yes, for most UK contractors and service businesses, Constructionline accreditation is well worth the investment, since it opens access to over 2,500 buyers including NHS trusts, local authorities, and major principal contractors who use the platform to find verified suppliers. It removes the need to complete repeated pre-qualification questionnaires for different clients, saving significant time and administrative effort across the year. Gold membership in particular aligns with the Common Assessment Standard, which is now required by many tier-one contractors as a minimum supply chain compliance standard.",
  },
  {
    q: "Can a Constructionline consultant help with registration and compliance?",
    a: "Yes, a specialist consultant can significantly speed up your Constructionline application by reviewing your existing documents, identifying gaps, and building the policies and procedures needed to meet the requirements of your chosen membership level. They know exactly what Constructionline assessors look for and can prepare a complete, accurate submission that avoids the common mistakes that cause delays and rejections. BizGrow Holdings supports UK businesses through the full Constructionline registration and compliance process as part of their wider accreditation consultancy service.",
  },
  {
    q: "What documents are required for a Constructionline application?",
    a: "You will need a signed and dated health and safety policy reviewed within the last twelve months, relevant risk assessments and method statements specific to your actual work activities, staff training and competence records, and valid public liability and employers' liability insurance certificates. At Gold level, you will also need an environmental management policy, a quality management policy or documented procedures, an equality and diversity policy, and a modern slavery statement. All documents must be current, consistent with your application, and specific to your business rather than generic templates.",
  },
];

const ConstructionlinePage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* 🔹 1. HERO SECTION (Site-Engineered Look) */}
      <section className="relative h-screen w-full flex items-center text-center overflow-hidden">
        {/* Background Image & Dark Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/h.jpg"
            alt="Construction Site"
            fill
            className="object-cover transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10" />
        </div>

        {/* Content Container with Staggered Upward Animations */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="flex flex-col items-center">
            {/* 1. SSIP Badge */}
            <FadeIn direction="up" duration="0.6">
              <div className="inline-flex items-center gap-3 bg-[#997819]/20 border border-[#997819]/30 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#997819] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#997819]"></span>
                </span>
                <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">
                  SSIP Standard
                </span>
              </div>
            </FadeIn>

            {/* 2. Heading */}
            <FadeIn direction="up" duration="0.8" delay="0.2">
              <h1 className="text-6xl  font-black text-white leading-[1.1] tracking-tighter drop-shadow-md">
                Constructionline Health & <br />
                <span className="text-[#997819]">
                  Safety Pre-Qualification .
                </span>
              </h1>
            </FadeIn>

            {/* 3. Paragraph */}
            <FadeIn direction="up" duration="0.9" delay="0.4">
              <p className="mt-6 text-blue-100 text-lg max-w-2xl text-center mx-auto font-medium leading-relaxed drop-shadow">
                Constructionline is a UK pre-qualification and procurement
                service for construction, security, cleaning, and supply chain
                businesses. It brings your financial standing, insurance, and
                health and safety credentials into one assessed profile that
                buyers and main contractors trust, helping you qualify for
                tenders faster.
              </p>
            </FadeIn>

            {/* 4. CTA Button */}
            <FadeIn direction="up" duration="1.0" delay="0.6">
              <div className="mt-8">
                <Link href="/contact-us">
                  <button className="relative z-10 bg-[#997819] text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-2xl cursor-pointer">
                    Book a Consultation
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. THE TIER SELECTOR (Unique Horizontal Card Design)
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
                desc: (
                  <>
                    PAS91{" "}
                    <Link
                      href="compliance-consultancies/"
                      className="text-[#997819] font-bold"
                    >
                      Compliance
                    </Link>{" "}
                    & Basic PQQ Support
                  </>
                ),
                icon: <Construction />,
              },
              {
                level: "Gold",
                desc: (
                  <>
                    Full{" "}
                    <Link
                      href="https://bizgrow-holdings.com/key-components-of-health-and-safety-policy/"
                      className="text-[#997819] font-bold"
                    >
                      Health & Safety
                    </Link>
                    , Quality & Environmental Compliance
                  </>
                ),
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
      </section> */}

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
                  <Link
                    href="https://bizgrow-holdings.com/get-constructionline-accreditation-its-requirements/"
                    className="text-[#997819] font-bold"
                  >
                    Constructionline
                  </Link>{" "}
                  offers different levels to match your business size, risk
                  profile, and buyer requirements. Choosing the right level
                  helps you qualify for the right contracts, without
                  overcomplicating compliance.
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
                desc: (
                  <>
                    Designed for established companies working with major buyers
                    who require enhanced{" "}
                    <Link
                      href="/interal-audit"
                      className="text-[#997819] font-bold"
                    >
                      audits
                    </Link>{" "}
                    and highest level of assurance.
                  </>
                ),
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

      {/* 🔹 4. WHY IT MATTERS (Unique Premium White Background with Scroll Animations) */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background glow matching brand accents */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#997819]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#12066a]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            {/* 🔹 Left Column: Immersive Image with Glass Blur Badge & Animation */}
            <div className="lg:w-1/2 relative w-full">
              <FadeIn direction="up" duration="0.8">
                <div className="relative rounded-4xl overflow-hidden shadow-2xl border border-slate-100 group">
                  <Image
                    src="/blueprint-work.jpg"
                    width={600}
                    height={600}
                    alt="Reasons to Choose Constructionline - BizGrow Holdings Ltd"
                    className="object-cover w-full h-[500px] md:h-[600px] transform group-hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Gradient Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                  {/* Floating Glassmorphic Blur Card */}
                  <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white font-black mb-1.5">
                      Verified Excellence
                    </p>
                    <p className="text-sm text-white font-semibold leading-relaxed">
                      Streamlining UK compliance and pre-qualification with
                      precision standards.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* 🔹 Right Column: Editorial Numbered Grid with Staggered Animations */}
            <div className="lg:w-1/2">
              {/* Badge & Title */}
              <FadeIn direction="up" duration="0.6">
                <div className="inline-flex items-center gap-2 bg-[#997819]/10 border border-[#997819]/30 px-4 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#997819]" />
                  <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-[10px]">
                    Market Authority
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tight leading-[1.1] mb-6">
                  Reasons to Choose
                  <span className="text-[#997819] block mt-1">
                    Constructionline
                  </span>
                </h2>
              </FadeIn>

              {/* Paragraph */}
              <FadeIn direction="up" duration="0.7" delay="0.1">
                <p className="text-zinc-600 leading-relaxed font-medium mb-10 text-base">
                  <Link
                    href="https://bizgrow-holdings.com/9-construction-safety-certifications-every-workplace-needs/"
                    className="text-[#997819] font-bold hover:underline"
                  >
                    Constructionline
                  </Link>{" "}
                  is a trusted prequalification platform that helps construction
                  businesses prove their compliance, credibility, and capability
                  to buyers across the UK, simplifying tenders and expanding
                  public sector reach.
                </p>
              </FadeIn>

              {/* Modern 2-Column Numbered Features Grid with Staggered Delay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    num: "01",
                    t: "Recognised by UK Buyers",
                    d: "Widely accepted by major contractors and public sector organisations.",
                  },
                  {
                    num: "02",
                    t: "Faster Tender Access",
                    d: "Meet prequalification requirements once and apply seamlessly.",
                  },
                  {
                    num: "03",
                    t: "Compliance Made Simple",
                    d: (
                      <>
                        Covers PAS91,{" "}
                        <Link
                          href="https://bizgrow-holdings.com/is-your-security-business-losing-work-without-constructionline/"
                          className="text-[#997819] font-bold hover:underline"
                        >
                          Health & Safety
                        </Link>
                        , and financial checks.
                      </>
                    ),
                  },
                  {
                    num: "04",
                    t: "Boosts Credibility",
                    d: "Proves your business meets industry standards and best practices.",
                  },
                ].map((item, idx) => (
                  <FadeIn
                    key={idx}
                    direction="up"
                    duration="0.8"
                    delay={0.2 + idx * 0.1}
                  >
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-[#997819]/40 hover:bg-white hover:shadow-md transition-all duration-300 group h-full">
                      <span className="text-xs font-black text-[#997819] tracking-widest block mb-2">
                        {item.num}
                      </span>
                      <h3 className="font-black text-[#12066a] text-base uppercase tracking-wide mb-1 group-hover:text-[#997819] transition-colors">
                        {item.t}
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">
                        {item.d}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 HOW BIZGROW SUPPORTS YOU (Connected Enterprise Pipeline Layout) */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#997819]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center  mx-auto mb-20">
            <FadeIn direction="up" duration="0.6">
              <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tight leading-[1.1]">
                How BizGrow
                <span className="text-[#997819]  ml-2">Supports You</span>
              </h2>
            </FadeIn>
          </div>

          {/* Connected Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:block absolute top-[45px] left-12 right-12 h-[2px] bg-gradient-to-r from-[#12066a]/20 via-[#997819]/40 to-[#12066a]/20 z-0" />

            {[
              {
                num: "01",
                t: "Review",
                d: "We check your business against Constructionline requirements and tell you what’s needed.",
              },
              {
                num: "02",
                t: "Prepare",
                d: "We help you gather and organise your financial, insurance, and health and safety documents.",
              },
              {
                num: "03",
                t: "Apply",
                d: "We complete your profile and submit it correctly, so you get verified faster.",
              },
              {
                num: "04",
                t: "Renew",
                d: "We manage your annual renewal so your membership never lapses.",
              },
            ].map((step, idx) => (
              <FadeIn
                key={idx}
                direction="up"
                duration="0.8"
                delay={0.15 * idx}
              >
                <div className="relative z-10 p-8 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-100 hover:shadow-2xl hover:border-[#997819]/50 transition-all duration-500 group h-full flex flex-col justify-between">
                  <div>
                    {/* Floating Number Badge with Glow */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#12066a] text-white flex items-center justify-center font-black text-lg tracking-wider shadow-md group-hover:bg-[#997819] transition-colors duration-500">
                        {step.num}
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#997819]/40 group-hover:bg-[#997819] group-hover:scale-150 transition-all duration-300" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-[#12066a] uppercase tracking-wide mb-3 group-hover:text-[#997819] transition-colors">
                      {step.t}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                      {step.d}
                    </p>
                  </div>

                  {/* Subtle Active Indicator line at the bottom */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#997819] transition-colors">
                    <span>Stage {step.num} of 04</span>
                    <span>→</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ServicesFaq
        faqs={constructionlineData}
        title={
          <>
            ConstructionLine <span className="text-[#997819]">FAQ's</span>
          </>
        }
        subtitle="Questions & Answers"
      />

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
              <div className="absolute inset-0 bg-[#12066a]/70 mix-blend-multiply z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#12066a] via-transparent to-[#12066a]/20 z-20" />
            </div>

            {/* Content Area */}
            <div className="relative z-30 w-full max-w-4xl flex flex-col items-center">
              <FadeIn direction="up">
                <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-10">
                  Ready for Tier-1 Work
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-normal leading-[0.85] mb-8 ">
                  Next
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37] inline-block mt-2 ml-3">
                    Step
                  </span>
                </h2>
                <p className="text-white text-lg">
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

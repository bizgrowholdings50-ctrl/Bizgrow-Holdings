import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  HardHat,
  FileText,
  ClipboardCheck,
  CheckCircle2,
  ArrowRight,
  Construction,
  CheckCheck,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Get SafeContractor Certified: Health & Safety UK Standards",
  description:
    "Get SafeContractor certified and ensure your UK business meets top health & safety standards, boosting credibility and opportunities.",
};
const SafeContractorPage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (Consistent Signature Style) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Step 1: Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Constructions.jpg" // Health & Safety / Site Inspection focused image
            alt="SafeContractor Accreditation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
        </div>

        {/* Step 2: Large Watermark Text (Middle Layer) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[10rem] md:text-[12rem] font-black text-white/[0.05] leading-none uppercase tracking-tighter text-center">
            SAFE <br className="md:hidden" /> CONTRACTOR
          </span>
        </div>

        {/* Step 3: Actual Content (Top Layer) */}
        <div className="max-w-7xl mx-auto px-6 mt-10 relative z-20 w-full">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                Health & Safety Excellence
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-4xl md:text-7xl font-black text-white mt-2 leading-[1.1] tracking-tighter">
                SafeContractor <br />
                <span className="text-[#997819]">Accreditation</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-2 text-blue-100/80 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
                Achieve SafeContractor accreditation with expert support from
                <Link href="/" className="text-[#997819] font-bold ml-1">
                  BizGrow Holdings
                </Link>
                . We help UK businesses meet health and safety standards and win
                more contracts with confidence.
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

      {/* 🔹 2. WHY IT MATTERS (Depth Content) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                SafeContractor Accreditation for <br />{" "}
                <span className="text-[#997819]">UK Security</span>
              </h2>
              <div className="space-y-6 text-zinc-500 text-md leading-relaxed font-medium">
                <p>
                  The SafeContractor Scheme is one of the UK’s most trusted
                  <Link
                    href="https://bizgrow-holdings.com/key-components-of-health-and-safety-policy/"
                    className="text-[#997819] font-bold ml-1"
                  >
                    health and safety
                  </Link>{" "}
                  accreditation programs, designed to help businesses show their
                  commitment to safe and compliant workplaces. It is especially
                  valuable for industries that work in high-risk environments,
                  such as construction, manufacturing, facilities management,
                  and{" "}
                  <Link
                    href="https://bizgrow-holdings.com/our-services/private-security-startup/"
                    className="text-[#997819] font-bold mr-1"
                  >
                    private security
                  </Link>
                  services.
                </p>
                <p>
                  With{" "}
                  <Link
                    href="https://bizgrow-holdings.com/safecontractor-what-your-uk-business-needs-to-know/"
                    className="text-[#997819] font-bold"
                  >
                    SafeContractor
                  </Link>{" "}
                  accreditation, a business proves it has strong health and
                  safety policies, procedures, and systems to protect employees,
                  subcontractors, and clients. When businesses meet these
                  standards, they can comply with UK safety legislation, inspire
                  confidence in their clients and partners, and present
                  themselves as professional, trustworthy, and safety-focused
                  businesses in the UK.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="p-10 bg-[#12066a] rounded-[3rem] border border-zinc-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-[#997819] opacity-10">
                  <Construction size={120} />
                </div>
                <h3 className="text-xl font-black text-white mb-6">
                  Accreditation Benefits:
                </h3>
                <ul className="space-y-4">
                  {[
                    <>
                      Win more contracts by proving your business meets
                      recognised{" "}
                      <Link
                        href="https://bizgrow-holdings.com/8-tips-to-secure-safecontractor-accreditation/"
                        className="text-[#997819] font-bold inline hover:underline"
                      >
                        UK health and safety
                      </Link>{" "}
                      standards.
                    </>,
                    "Build stronger credibility with clients and contractors across the UK.",
                    "Improve health & safety compliance through structured risk management.",
                    "Speed up tender approvals, as many buyers require SafeContractor accreditation.",
                    "Increase client trust by demonstrating professional safety standards.",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-zinc-400 font-bold leading-relaxed"
                    >
                      <CheckCircle
                        size={18}
                        className="text-[#997819] mt-1 shrink-0"
                      />
                      {/* 🔹 Span add karne se text flow natural rahega */}
                      <span className="block text-left">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 3. OUR AUDIT PREP PILLARS WITH PARALLAX & SLIDE EFFECT */}
      <section className="relative py-32 overflow-hidden">
        {/* 🖼️ Section Background Parallax Layer */}
        <div
          className="absolute inset-0 z-0 bg-[#12066a] bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url('/audit-prep-bg.jpg')", // Replace with your image path
            backgroundAttachment: "fixed",
          }}
        />

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-[#12066a]/80 z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-[#997819] uppercase">
                Services that SafeContractor Provides
              </h2>
              <p className="text-zinc-300 max-w-2xl mx-auto font-medium">
                Our{" "}
                <Link
                  href="https://bizgrow-holdings.com/check-if-a-contractor-has-safecontractor-accreditation/"
                  className="text-[#997819] font-bold"
                >
                  SafeContractor
                </Link>{" "}
                Services address the highest-risk sectors in the UK and assist
                businesses in obtaining safety{" "}
                <Link
                  href="https://bizgrow-holdings.com/compliance-consultancies/"
                  className="text-[#997819] font-bold"
                >
                  compliance
                </Link>{" "}
                with confidence.
              </p>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                t: "Construction Safety Compliance",
                d: "Ensure building contractors and site contractors meet UK safety regulations and industry best practices",
                icon: <FileText className="w-10 h-10" />,
              },
              {
                t: "Facilities Management Safety",
                d: (
                  <>
                    Assist facility service providers in establishing effective{" "}
                    <Link
                      href="https://bizgrow-holdings.com/why-safe-contractor-certification-is-essential-for-uk-contractors-and-suppliers/"
                      className="text-[#997819] font-bold"
                    >
                      health and safety
                    </Link>{" "}
                    systems in a range of workspaces, including offices,
                    warehouses, and construction sites
                  </>
                ),
                icon: <HardHat className="w-10 h-10" />,
              },
              {
                t: "Transport, Logistics & Supply Chain Safety",
                d: "Helping logistics and transport operators implement safe systems of work for employees and contractors.",
                icon: <ClipboardCheck className="w-10 h-10" />,
              },
            ].map((pillar, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.2} className="h-full">
                {/* 🟦 Sliding Glass Card */}
                <div className="relative group h-full p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 cursor-pointer shadow-2xl flex flex-col">
                  {/* Background Sliding Layer (Left to Right) */}
                  <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out z-0" />

                  {/* Content Layer (z-10) */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Container */}
                    <div className="text-[#997819] mb-8 group-hover:text-[#12066a] group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                      {pillar.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight text-white group-hover:text-[#12066a] transition-colors duration-500 uppercase">
                      {pillar.t}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 group-hover:text-zinc-600 font-medium leading-relaxed flex-grow transition-colors duration-500">
                      {pillar.d}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* 🔹 NEW SECTION: THE ASSESSMENT PROCESS (Steps) */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs">
                Our Workflow
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter mt-4">
                3 Steps to Accreditation.
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                t: "Gap Analysis",
                d: "We review your current systems and identify missing requirements needed for accreditation.",
              },
              {
                step: "02",
                t: "Documentation & Submission",
                d: "We prepare and organise all required policies and documents before submitting your application.",
              },
              {
                step: "03",
                t: "Liaison & Approval",
                d: "We communicate with the accreditation body and support you until final approval is achieved.",
              },
            ].map((item, idx) => (
              <FadeIn
                key={idx}
                direction="up"
                delay={idx * 0.2}
                className="h-full"
              >
                <div className="relative h-full p-10 bg-white rounded-[2rem] shadow-sm border border-[#12066a] group hover:-translate-y-2 transition-all duration-500 flex flex-col justify-start">
                  {/* Step Number Background */}
                  <span className="text-7xl font-black text-zinc-100 absolute top-6 right-8 group-hover:text-[#997819]/10 transition-colors pointer-events-none">
                    {item.step}
                  </span>

                  {/* Content Wrapper */}
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-black text-[#12066a] mb-4 uppercase tracking-tight">
                      {item.t}
                    </h3>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                      {item.d}
                    </p>
                  </div>

                  {/* Subtle Bottom Accent on Hover */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#997819] group-hover:w-1/2 transition-all duration-500 rounded-full" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 NEW SECTION: INDUSTRIES COVERED (Responsive Optimized) */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className="bg-[#12066a] rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 overflow-hidden relative shadow-2xl"
            style={{
              backgroundImage: 'url("/sf.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[#12066a]/90 z-0" />

            <div className="relative z-20 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* TEXT CONTENT */}
              <div>
                <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6 md:mb-8 uppercase">
                  Why Choose SafeContractor <br />{" "}
                  <span className="text-[#997819]">Accreditation.</span>
                </h2>
                <p className="text-blue-100/70 text-base md:text-lg font-medium mb-8 md:mb-10 leading-relaxed">
                  Choosing{" "}
                  <Link
                    href="#"
                    className="text-[#997819] font-bold hover:underline"
                  >
                    SafeContractor
                  </Link>{" "}
                  shows your commitment to professional standards and client
                  confidence. It helps your business stand out in the
                  competitive UK market.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Accreditation Support",
                    "Documentation Assistance",
                    "Gap Analysis Guidance",
                    "Fast Track Approvals",
                    "Tender Readiness",
                    "Ongoing Compliance Monitoring",
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-white/90 font-bold text-sm"
                    >
                      <div className="w-2 h-2 bg-[#997819] rounded-full shrink-0"></div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* STATS GRID - Now responsive */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-3 md:space-y-4">
                  <div className="aspect-square bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 flex items-center justify-center p-4 text-center">
                    <p className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest">
                      100% Approval Rate
                    </p>
                  </div>
                  <div className="aspect-[3/4] bg-[#997819] rounded-2xl md:rounded-3xl flex items-center justify-center p-6">
                    <ShieldCheck
                      size={40}
                      className="md:size-[60px] text-white opacity-80"
                    />
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 mt-0 md:pt-8">
                  <div className="aspect-[3/4] bg-white/10 rounded-2xl md:rounded-3xl border border-white/10 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-[#997819] font-black text-4xl md:text-7xl leading-none mb-2">
                      500+
                    </p>
                    <p className="text-white/80 text-[9px] md:text-[10px] uppercase font-black tracking-tighter">
                      Audits Passed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 4. CALL TO ACTION (CTA) */}
      <section className="py-24 bg-white px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter">
              Ready to <span className="text-[#997819]">Get Approved?</span>
            </h2>
            <p className="mt-4 text-zinc-500 font-medium">
              "Join the elite list of safety-conscious contractors in the UK."
            </p>
          </div>

          <div
            className="p-12 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden group shadow-2xl bg-[#12066a]"
            style={{
              backgroundImage: 'url("/10-ways-bg.jpg")', // Consistent CTA background
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="absolute inset-0 bg-[#12066a]/90 z-0" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black mb-8 tracking-tighter">
                Get Your SafeContractor Seal This Month
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact-us"
                  className="relative group/btn overflow-hidden inline-flex items-center justify-center px-12 py-6 bg-[#997819] text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all duration-500 shadow-2xl active:scale-95"
                >
                  {/* Layer 1: The Text (Top Layer) */}
                  <span className="relative z-40 transition-colors duration-500 group-hover/btn:text-[#12066a]">
                    Start My Assessment
                  </span>

                  {/* Layer 2: The Animated Background (Middle Layer) */}
                  <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
                </Link>
                <Link href="https://bizgrow-holdings.com/safe-contractor-checklist/">
                  <button className="px-12 py-6 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all">
                    View H&S Checklist
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SafeContractorPage;

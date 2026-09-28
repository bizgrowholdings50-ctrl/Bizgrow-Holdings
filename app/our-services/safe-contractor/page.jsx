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
import ServicesFaq from "@/components/ServicesFaq";

import { createOpenGraph } from "@/lib/openGraphMetadata";

export const metadata = {
  title: "Get SafeContractor Certified: Health & Safety UK Standards",
  description:
    "Get SafeContractor certified and ensure your UK business meets top health & safety standards, boosting credibility and opportunities.",
  openGraph: createOpenGraph(
    "/our-services/safe-contractor/",
    "/safe-contractor-hero.jpg",
  ),
};

const safeContractorData = [
  {
    q: "How do I apply for SafeContractor accreditation?",
    a: "Register your business on the SafeContractor portal, complete the health and safety assessment questionnaire, and upload your supporting documents, including your health and safety policy, risk assessments, training records, and insurance certificates. A SafeContractor assessor reviews your submission and may request further evidence before making a decision. Ensuring all documents are up to date and business-specific before submission significantly reduces delays.",
  },
  {
    q: "Who needs SafeContractor accreditation in the UK?",
    a: "Any UK business working as a contractor or subcontractor in construction, facilities management, security, cleaning, or maintenance should consider SafeContractor accreditation. Many local authorities, NHS trusts, and large private sector companies require it before adding a supplier to their approved lists. Without it, businesses can be excluded from tenders before their capability is even considered.",
  },
  {
    q: "How to check if a contractor is certified as safe in the UK?",
    a: "You can verify a contractor's SafeContractor status directly through the SafeContractor online portal by searching their business name or registration number. The result confirms whether their accreditation is currently active, expired, or suspended. Buyers and procurement teams should always carry out this check before engaging any contractor.",
  },
  {
    q: "How to get SafeContractor accreditation?",
    a: "Gather all required health and safety documentation, including a signed policy, relevant risk assessments, staff training records, and valid insurance certificates, then register on the SafeContractor portal and submit everything for assessor review. Many UK businesses use a compliance consultant like BizGrow Holdings to prepare documents properly and avoid common mistakes. This approach significantly improves the chances of passing the first time without unnecessary delays.",
  },
];
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
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[1px]" />
        </div>

        {/* Step 2: Large Watermark Text (Middle Layer) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[10rem] md:text-[12rem] font-black text-white/[0.05] leading-none uppercase tracking-tighter text-center">
            SAFE <br className="md:hidden" /> CONTRACTOR
          </span>
        </div>

        {/* Step 3: Actual Content (Top Layer) */}
        <div className="max-w-7xl mx-auto px-6 mt-26 relative z-20 w-full">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                SSIP Standard
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-4xl md:text-7xl font-black text-white mt-2 leading-[1.1] tracking-tighter">
                SafeContractor Health & <br />
                <span className="text-[#997819]"> Safety Accreditation</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-2 text-blue-100/80 text-lg  max-w-2xl leading-relaxed font-medium">
                A recognised health and safety accreditation for UK
                construction, security, cleaning, and supply chain contractors,
                run by Alcumus under the SSIP umbrella. It shows your business
                meets recognised standards, validated by documented evidence and
                a formal assessment process.
              </p>
            </FadeIn>

            <FadeIn direction="right" duration="1.0">
              <Link href="/contact-us">
                <button className="relative z-10 bg-[#997819] text-white px-16 py-6 my-4 rounded-full font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-3xl">
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
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                Why It Matters for
                <span className="text-[#997819] ml-1">Your Business</span>
              </h2>
              <div className="space-y-6 text-zinc-500 text-md leading-relaxed font-medium">
                <p>
                  The SafeContractor Scheme is a widely recognised health and
                  safety accreditation programme, especially valuable in
                  high-risk industries such as construction, manufacturing,
                  facilities management, and private security.
                </p>
                <p>
                  With SafeContractor accreditation, your business shows it has
                  strong safety policies and systems to protect employees,
                  subcontractors, and clients. It helps you support UK safety
                  compliance, build client confidence, and present your business
                  as professional and safety-focused.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="p-10 bg-[#12066a] rounded-[3rem] border border-zinc-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-[#997819] opacity-10">
                  <Construction size={120} />
                </div>
                <h3 className="text-2xl font-black text-white mb-6">
                  Accreditation Benefits:
                </h3>
                <ul className="space-y-4">
                  {[
                    <>
                      Win more contracts by proving your business meets
                      recognised{" "}
                      <Link
                        href="https://bizgrow-holdings.com/8-tips-to-secure-safecontractor-accreditation/"
                        className="text-[#d4af37] font-bold inline hover:underline"
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
                      className="flex items-start gap-3 text-zinc-300 font-bold leading-relaxed"
                    >
                      <CheckCircle
                        size={18}
                        className="text-[#d4af37] mt-1 shrink-0"
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
        <div className="absolute inset-0 bg-[#12066a]/90 z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
                Industries We Support With SafeContractor
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
                t: "Security Businesses",
                d: "We help security companies put strong health and safety systems in place and prepare for SafeContractor accreditation.",
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
                    <p className="text-zinc-200 group-hover:text-zinc-500 font-medium leading-relaxed flex-grow transition-colors duration-500">
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

      {/* 🔹 5. OUR PROVEN TRACK RECORD & SCOPE */}
      <section className="py-12  bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className="bg-[#12066a] rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 overflow-hidden relative shadow-2xl isolate"
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
                <span className="text-[#997819] font-black uppercase tracking-[0.35em] text-xs block mb-3">
                  Proven Support
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6 md:mb-8">
                  Why Partner With <br />
                  <span className="text-[#997819]">BizGrow Holdings.</span>
                </h2>
                <p className="text-blue-100/70 text-base md:text-lg font-medium mb-8 md:mb-10 leading-relaxed">
                  We handle the heavy lifting of compliance so your team can
                  stay focused on operations. Our specialists work directly
                  alongside you to ensure your documentation aligns cleanly with
                  Alcumus standards.
                </p>

                {/* 🔹 Realistic & Professional Value Points (No Guarantees / Over-claims) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Dedicated Health & Safety Advisor",
                    "Bespoke Safety Documentation",
                    "Assessor Query Management",
                    "Fast-Track Audit Prep",
                    "Tender & PQQ Alignment",
                    "Annual Renewal Support",
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-white/90 font-bold text-sm text-nowrap"
                    >
                      <div className="w-2 h-2  bg-[#997819] rounded-full shrink-0"></div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-3 md:space-y-4">
                  <div className="aspect-video bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 flex items-center justify-center p-4 text-center backdrop-blur-sm">
                    <p className="text-white font-black text-xs md:text-sm uppercase tracking-widest leading-snug">
                      100% Approval <br />
                      <span className="text-[#997819]">Rate</span>
                    </p>
                  </div>
                  <div className="aspect-video bg-[#997819] rounded-2xl md:rounded-3xl flex items-center justify-center p-6 shadow-xl">
                    <ShieldCheck
                      size={40}
                      className="md:size-[60px] text-white opacity-90"
                    />
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 mt-0 md:pt-8">
                  <div className="aspect-video bg-white/10 rounded-2xl md:rounded-3xl border border-white/10 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm">
                    <p className="text-[#997819] font-black text-4xl md:text-7xl leading-none mb-2">
                      120+
                    </p>
                    <p className="text-white/80 text-[9px] md:text-[10px] uppercase font-black tracking-widest">
                      Audits Passed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ServicesFaq
        faqs={safeContractorData}
        title={
          <>
            Safe Contractor <span className="text-[#997819]">FAQ's</span>
          </>
        }
        subtitle="Questions & Answers"
      />
      {/* 🔹 7. CALL TO ACTION (CTA) */}
      <section className="py-14 bg-white px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] text-center text-white relative overflow-hidden group shadow-2xl bg-[#12066a] isolate"
            style={{
              backgroundImage: 'url("/10-ways-bg.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-[#12066a]/90 z-0" />

            {/* Card Body */}
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-[#997819] font-black uppercase tracking-[0.35em] text-xs block mb-4">
                Take The Next Step
              </span>

              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter leading-[1.1]">
                Ready to Secure Your <br />
                <span className="text-[#997819]">
                  SafeContractor Accreditation?
                </span>
              </h2>

              <p className="text-blue-100/80 font-medium text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Get your business audit-ready without the hassle. Speak with our
                UK health & safety specialists today to evaluate your
                documentation.
              </p>

              {/* Buttons Group */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                {/* Primary CTA (Glitch-Free Safari Hover) */}
                <Link
                  href="/contact-us"
                  className="relative group/btn overflow-hidden isolate inline-flex items-center justify-center px-10 py-5 bg-[#997819] text-white font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all duration-500 shadow-2xl active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-[#12066a]">
                    Start Your Assessment
                  </span>
                  <div className="absolute inset-0 bg-white rounded-2xl translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0 transform-gpu" />
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="https://bizgrow-holdings.com/safe-contractor-checklist/"
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
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

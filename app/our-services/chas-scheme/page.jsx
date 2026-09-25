import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import ServicesFaq from "@/components/ServicesFaq";
import {
  HardHat,
  ShieldCheck,
  Search, // FileSearch ki jagah Search zyada stable hai
  CheckCircle2,
  Construction,
  ClipboardCheck,
  TriangleAlert, // SafetyCone ki jagah TriangleAlert (Construction vibe ke liye best hai)
  Users,
  ArrowRight, // Users2 ki jagah Users
} from "lucide-react";
import Link from "next/link";

import { createOpenGraph } from "@/lib/openGraphMetadata";

export const metadata = {
  title: "CHAS Scheme | BizGrow Holdings | Health & Safety Approval",
  description:
    "Achieve CHAS Scheme approval with BizGrow Holdings. We help UK businesses meet compliance, health, & safety standards with ease.",
  openGraph: createOpenGraph("/our-services/chas-scheme/", "/chas-hero.jpg"),
};

const chasData = [
  {
    q: "How to get CHAS certification in the UK?",
    a: "To get CHAS certification, you must register on the CHAS portal, complete a health and safety assessment questionnaire, and submit supporting evidence including your health and safety policy, risk assessments, training records, and valid insurance certificates. A CHAS assessor reviews your submission and may request additional information before making a decision.",
  },
  {
    q: "How do I apply for CHAS accreditation?",
    a: "Start by registering your business on the CHAS online portal and selecting the appropriate membership level for your business size and sector. Complete the assessment questionnaire covering health and safety management, risk assessments, training, and insurance, then upload all required supporting documents. Once submitted, a CHAS assessor reviews everything and contacts you if further evidence is needed before issuing your certificate.",
  },
  {
    q: "What are the common reasons a CHAS application is rejected?",
    a: "The most common reasons include an unsigned or outdated health and safety policy, risk assessments that are clearly generic and not relevant to your actual work activities, and insurance certificates that have expired or show insufficient levels of cover. Missing training records, no evidence of accident reporting procedures, and failure to demonstrate access to a competent health and safety adviser are also frequent causes of rejection.",
  },
  {
    q: "What are the benefits of CHAS accreditation for contractors?",
    a: "The benefits of CHAS accreditation include proving your business meets recognised UK health and safety standards and improving your chances of winning public and private sector contracts. It also strengthens your health and safety systems, builds client confidence, and reduces the need for repeated pre-qualification questionnaires.",
  },
];
const CHASSchemePage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (Prominent Safety Vibe) */}
      <section className="relative h-screen text-center w-full flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/chas-hero.jpg"
            alt="CHAS Accreditation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        {/* Prominent Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <p className="text-[10rem] md:text-[15rem] font-black text-white/[0.05] leading-none uppercase tracking-tighter">
            SAFETY
          </p>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl mx-auto">
            {/* 1. Subtitle Badge */}
            <FadeIn direction="up" duration={0.5} delay={0.2}>
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm inline-block mb-3">
                SSIP Standard
              </span>
            </FadeIn>

            {/* 2. Main Heading */}
            <FadeIn direction="up" duration={0.6} delay={0.4}>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-4">
                CHAS <span className="text-[#997819]">Recognised</span> Health &
                Safety Compliance.
              </h1>
            </FadeIn>

            {/* 3. Description Paragraph */}
            <FadeIn direction="up" duration={0.6} delay={0.6}>
              <p className="my-4 text-blue-100/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                A recognised health and safety standard for UK construction,
                security, cleaning, and supply chain contractors, run under the
                SSIP (Safety Schemes in Procurement) umbrella. It shows your
                business meets recognised health and safety standards backed by
                real evidence, not just paperwork.
              </p>
            </FadeIn>

            {/* 4. CTA Button */}
            <FadeIn direction="up" duration={0.6} delay={0.8}>
              <div className="mt-6">
                <Link href="/contact-us">
                  <button className="relative z-10 bg-[#997819] text-white px-12 md:px-16 py-5 md:py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#0c0546] transition-all duration-500 shadow-2xl hover:scale-105 cursor-pointer">
                    Book a Consultation
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. BEYOND COMPLIANCE (Asymmetric Layout) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* 🔹 Left Sticky Column */}
            <div className="lg:w-1/3 sticky top-32">
              <FadeIn direction="right" duration={0.6}>
                <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none">
                  The <span className="text-[#997819]">Safety</span> <br />{" "}
                  Standard.
                </h2>
              </FadeIn>

              <FadeIn direction="right" duration={0.6} delay={0.2}>
                <p className="mt-8 text-zinc-500 font-medium text-lg leading-relaxed">
                  CHAS accreditation demonstrates that your organisation meets
                  recognised{" "}
                  <Link
                    href="https://bizgrow-holdings.com/key-components-of-health-and-safety-policy/"
                    className="text-[#997819] hover:underline font-bold"
                  >
                    UK health and safety
                  </Link>{" "}
                  compliance standards, strengthening trust with contractors,
                  clients, and procurement teams.
                </p>
              </FadeIn>
            </div>

            {/* 🔹 Right Grid Cards */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  t: "SSIP Recognition",
                  d: (
                    <>
                      CHAS is part of the SSIP{" "}
                      <Link
                        href="https://bizgrow-holdings.com/rules-requirements-for-ssip/"
                        className="text-[#997819] dark-card-link font-bold"
                      >
                        (Safety Schemes in Procurement)
                      </Link>{" "}
                      framework, helping businesses demonstrate verified health
                      and safety compliance across the UK supply chain.
                    </>
                  ),
                  icon: <ShieldCheck className="w-8 h-8" />,
                },
                {
                  t: "STAND OUT FROM COMPETITORS",
                  d: (
                    <>
                      Many businesses in your industry still don't hold CHAS,
                      giving you a clear edge when it counts.
                    </>
                  ),
                  icon: <Search className="w-8 h-8" />,
                },
                {
                  t: "CONTRACT OPPORTUNITIES",
                  d: (
                    <>
                      <Link
                        href="https://bizgrow-holdings.com/chas-assessment-criteria-registration-renewal/"
                        className="text-[#997819] dark-card-link font-bold"
                      >
                        CHAS
                      </Link>{" "}
                      certification helps businesses qualify for tenders,
                      contracts, and supplier frameworks requiring verified
                      health and safety standards.
                    </>
                  ),
                  icon: <ClipboardCheck className="w-8 h-8" />,
                },
                {
                  t: "WORKPLACE SAFETY COMPLIANCE",
                  d: "Show commitment to protecting employees, contractors, and site operations through structured health and safety management.",
                  icon: <Users className="w-8 h-8" />,
                },
              ].map((item, i) => {
                const isDark = i % 2 !== 0;

                return (
                  <FadeIn
                    key={i}
                    direction="up"
                    duration={0.6}
                    delay={0.15 * i + 0.1}
                  >
                    <div
                      className={`h-full p-10 rounded-[2.5rem] ${
                        isDark
                          ? "bg-[#12066a] text-white"
                          : "bg-zinc-50 text-zinc-900"
                      } transition-all hover:-translate-y-2 duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between`}
                    >
                      <div>
                        <div className="mb-6 text-[#997819]">{item.icon}</div>
                        <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">
                          {item.t}
                        </h3>
                      </div>
                      <p
                        className={`${
                          isDark ? "text-blue-100/80" : "text-zinc-500"
                        } font-medium leading-relaxed`}
                      >
                        {item.d}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. CORE AUDIT AREAS (3-Column Grid) */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* 🔹 Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn direction="up" duration={0.5}>
              <span className="text-[#997819] font-black uppercase tracking-[0.35em] text-xs md:text-sm block mb-3">
                Core Assessment Scope
              </span>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tight uppercase">
                What is included in the{" "}
                <span className="text-[#997819]">CHAS Certification UK?</span>
              </h2>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <div className="w-16 h-1 bg-[#997819] mx-auto mt-4 rounded-full" />
            </FadeIn>
          </div>

          {/* 🔹 3-Column Animated Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Health and Safety Policy",
              "Organisational Structure",
              "Risk Assessments (RAMS)",
              "Training and Competence",
              "Safe Work Practices",
              "Accident and Incident Reporting",
              "Emergency Planning",
              "Compliance with Legal Requirements",
              "Managing Subcontractors",
            ].map((item, idx) => (
              <FadeIn
                key={idx}
                direction="up"
                duration={0.5}
                delay={0.07 * idx + 0.1}
              >
                <div className="h-full bg-white p-7 rounded-3xl border border-zinc-200 flex items-center gap-4 hover:border-[#997819] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  {/* Animated Check Icon Wrapper */}
                  <div className="w-10 h-10 rounded-2xl bg-[#997819]/10 flex items-center justify-center shrink-0 group-hover:bg-[#997819] transition-colors duration-300">
                    <CheckCircle2
                      size={20}
                      className="text-[#997819] group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  <span className="font-black text-[#12066a] uppercase text-xs tracking-wider leading-snug">
                    {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. CHAS TIERS (New Comparison Layout)
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-[0.9] mb-8 uppercase">
                Benefits of <br />{" "}
                <span className="text-[#997819]">CHAS Certification</span>
              </h2>
              <div className="space-y-6">
                <p className="text-zinc-500 font-medium">
                  Achieving{" "}
                  <Link
                    href="https://bizgrow-holdings.com/what-is-chas-certification/"
                    className="text-[#997819] font-bold"
                  >
                    CHAS Certification
                  </Link>{" "}
                  UK proves an organisation’s commitment to working conditions
                  that are safe, compliant, and sustainable. There are several
                  primary benefits to that accreditation:
                </p>
                <ul className="space-y-4">
                  {[
                    "Greater Health and Safety Standards",
                    "Full Legal Compliance",
                    "Increased Business Reputation",
                    "Simple Prequalification",
                  ].map((tier, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 font-black text-[#12066a] uppercase text-sm italic border-b pb-2"
                    >
                      <TriangleAlert className="text-[#997819]" size={16} />{" "}
                      {tier}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <div className="relative">
              <div className="p-2 bg-zinc-100 rounded-[3.5rem]">
                <Image
                  src="/safety-onsite.jpg"
                  alt="Benefits of CHAS Certification - BizGrow Holdings Ltd"
                  width={600}
                  height={500}
                  className="rounded-[3rem] object-cover h-[400px]"
                />
              </div>
              <div className="absolute -bottom-10 left-10 bg-[#997819] p-8 rounded-[2rem] text-white shadow-2xl hidden md:block">
                <p className="text-5xl font-black">100%</p>
                <p className="text-xs font-bold uppercase tracking-widest">
                  Audit Pass Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* 🔹 5. CHAS SUBMISSION PROCESS */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* 🔹 Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn direction="up" duration={0.5}>
              <span className="text-[#997819] font-black uppercase tracking-[0.35em] text-xs md:text-sm block mb-3">
                Our Process
              </span>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tight uppercase">
                How We Support You
              </h2>
            </FadeIn>

            <FadeIn direction="up" duration={0.6} delay={0.2}>
              <div className="w-16 h-1 bg-[#997819] mx-auto mt-4 rounded-full" />
            </FadeIn>
          </div>

          {/* 🔹 Process Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                t: "COMPLIANCE REVIEW",
                d: (
                  <>
                    Assess your existing health & safety policies and
                    documentation to identify gaps against{" "}
                    <Link
                      href="https://bizgrow-holdings.com/common-chas-assessment-standards/"
                      className="text-[#997819] group-hover:text-[#d9b568] font-bold transition-colors"
                    >
                      CHAS accreditation requirements
                    </Link>
                    .
                  </>
                ),
              },
              {
                n: "02",
                t: "Documentation & Evidence",
                d: (
                  <>
                    Develop and update required policies,{" "}
                    <Link
                      href="https://bizgrow-holdings.com/what-does-rams-stand-for/"
                      className="text-[#997819] group-hover:text-[#d9b568] font-bold transition-colors"
                    >
                      risk assessments
                    </Link>
                    , and safety procedures needed for CHAS compliance.
                  </>
                ),
              },
              {
                n: "03",
                t: "CHAS PORTAL SUBMISSION",
                d: "Prepare and manage the CHAS application submission, ensuring documentation meets the required assessment standards.",
              },
              {
                n: "04",
                t: "CERTIFICATION APPROVAL",
                d: (
                  <>
                    Support you through the final review process until your
                    organisation successfully achieves{" "}
                    <Link
                      href="https://bizgrow-holdings.com/chas-accreditation-a-smart-way-to-safer-business-operations/"
                      className="text-[#997819] group-hover:text-[#d9b568] font-bold transition-colors"
                    >
                      CHAS accreditation
                    </Link>
                    .
                  </>
                ),
              },
            ].map((step, i) => (
              <FadeIn
                key={i}
                direction="up"
                duration={0.6}
                delay={0.15 * i + 0.2}
              >
                <div className="h-full p-8 bg-white flex flex-col justify-between rounded-[2rem] border border-zinc-100 hover:bg-[#12066a] group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  <div>
                    <span className="text-5xl font-black text-[#997819]/20 group-hover:text-[#d9b568] transition-colors duration-500 block">
                      {step.n}
                    </span>
                    <span className="text-xl font-black text-[#12066a] group-hover:text-white mt-6 mb-3 uppercase tracking-tighter block">
                      {step.t}
                    </span>
                  </div>
                  <p className="text-zinc-600 group-hover:text-white/80 text-sm font-medium leading-relaxed transition-colors duration-500 mt-2">
                    {step.d}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 6. DATA DRIVEN SAFETY */}
      <section className="py-32 bg-[#12066a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/build.jpg')] bg-black bg-cover bg-fixed opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          {/* Animated Icon Container */}
          <FadeIn direction="up" duration={0.5}>
            <div className="w-20 h-20 rounded-full bg-[#997819]/60 border border-[#997819]/30 flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
              <Construction className="text-[#997819]" size={38} />
            </div>
          </FadeIn>

          {/* Section Heading */}
          <FadeIn direction="up" duration={0.6} delay={0.2}>
            <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8">
              Build with <span className="text-[#997819]">Confidence.</span>
            </h3>
          </FadeIn>

          {/* Quote Paragraph */}
          <FadeIn direction="up" duration={0.6} delay={0.4}>
            <p className="max-w-2xl mx-auto text-blue-100/80 font-medium text-lg md:text-xl italic mb-10 leading-relaxed">
              “{" "}
              <Link
                href="https://bizgrow-holdings.com/benefits-of-achieving-chas-accreditation/"
                className="text-[#997819] hover:text-[#d9b568] font-black transition-colors"
              >
                CHAS accreditation
              </Link>{" "}
              demonstrates your commitment to health and safety compliance,
              helping UK contractors strengthen credibility and secure more
              business opportunities.”
            </p>
          </FadeIn>

          {/* 🔹 Prominent Rounded-Full CTA Button */}
          <FadeIn direction="up" duration={0.6} delay={0.6}>
            <Link href="/contact-us">
              <button className="inline-flex items-center gap-3 bg-[#997819] text-white px-10 md:px-14 py-5 rounded-full font-black uppercase tracking-[0.25em] text-xs md:text-sm hover:bg-white hover:text-[#0c0546] transition-all duration-500 shadow-2xl hover:scale-105 cursor-pointer">
                Get CHAS Certified Now
                <ArrowRight size={18} />
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>

      <ServicesFaq
        faqs={chasData}
        title={
          <>
            CHAS <span className="text-[#997819]">FAQ's</span>
          </>
        }
        subtitle="Questions & Answers"
      />

      {/* 🔹 7. CTA (Signature Style) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-12 md:p-24 rounded-[4rem] bg-[#12066a] relative overflow-hidden group shadow-2xl text-center flex flex-col items-center">
            <div className="absolute inset-0 bg-[url('/chas-cta.png')] bg-no-repeat bg-cover bg-fixed opacity-40 pointer-events-none" />
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10  relative z-10">
              Get Your <br />{" "}
              <span className="text-[#997819]">CHAS Accreditation.</span>
            </h2>
          <Link
  href="/contact-us"
  className="relative group/btn inline-flex w-full max-w-full items-center justify-center bg-[#997819] text-white px-4 py-5 sm:w-auto sm:px-16 sm:py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs text-center leading-relaxed whitespace-normal transition-all duration-500 hover:bg-white hover:text-[#0c0546] active:scale-95 cursor-pointer shadow-lg"
>
  <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-[#0c0546]">
    START YOUR CHAS APPLICATION
  </span>

</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CHASSchemePage;

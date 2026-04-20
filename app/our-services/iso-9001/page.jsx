import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  CheckCircle2,
  BarChart3,
  Settings2Icon,
  TrendingUp,
  Activity,
  RefreshCw,
  Users,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "ISO 9001 Certification UK | BizGrow Holdings",
  description:
    "Achieve ISO 9001 certification with BizGrow Holdings. Expert guidance, audits & compliance support for UK businesses.",
};

const ISO9001Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (Custom Scales) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/iso-9001-hero.jpg"
            alt="ISO 9001 Certification"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Step 2: Watermark Text (Requested Scale: 15rem) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <h2 className="text-[10rem] md:text-[15rem] font-black text-white/[0.04] leading-none uppercase tracking-tighter">
            BIZGROW
          </h2>
        </div>

        {/* Step 3: Content (Requested Scale: 7xl) */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                Quality Management System
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-5xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                ISO 9001
                <span className="text-[#997819]"> Strategic</span> Excellence.
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-10 text-blue-100/60 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium italic">
                "Not just a certificate, but a blueprint for operational
                efficiency and customer satisfaction."
              </p>
            </FadeIn>

            <FadeIn direction="right" duration="1.0">
              <div className="mt-12 w-32 h-2 bg-[#997819] rounded-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. UNIQUE SECTION: THE PILLAR GRID (Asymmetric Layout) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3 sticky top-32">
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none">
                Main Benefits of ISO 9001 <br />{" "}
                <span className="text-[#997819]">Certification.</span>
              </h2>
              <p className="mt-8 text-zinc-500 font-medium text-lg leading-relaxed">
                <Link
                  href="https://bizgrow-holdings.com/iso-9001-for-small-businesses/"
                  className="text-[#997819] font-bold"
                >
                  ISO 9001 Certification
                </Link>{" "}
                represents your commitment to high standards for your
                organisation, providing a strong platform for improvement,
                confidence, and efficiency.
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  t: "Higher Quality Control",
                  d: " Consistent products and services that meet UK standards.",
                  icon: <Settings2Icon size={28} strokeWidth={1.5} />,
                },
                {
                  t: "More Market Opportunities",
                  d: "Increased potential for gaining higher-value contracts and tenders.",
                  icon: <TrendingUp size={28} strokeWidth={1.5} />,
                },
                {
                  t: "Increased Efficiency",
                  d: (
                    <>
                      More streamlined{" "}
                      <Link
                        href="https://bizgrow-holdings.com/our-services/internal-audit/"
                        className="text-[#997819] font-bold"
                      >
                        internal processes
                      </Link>{" "}
                      and fewer errors in the process.
                    </>
                  ),
                  icon: <Activity size={28} strokeWidth={1.5} />,
                },
                {
                  t: "Continuous improvement cycle",
                  d: "Fostering a culture of regular service delivery and innovation.",
                  icon: <RefreshCw size={28} strokeWidth={1.5} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-10 rounded-[2.5rem] ${
                    i % 2 === 0 ? "bg-zinc-50" : "bg-[#12066a] text-white"
                  } transition-transform hover:-translate-y-2 duration-500`}
                >
                  <div className="mb-6 text-[#997819]">{item.icon}</div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">
                    {item.t}
                  </h3>
                  <p
                    className={`${
                      i % 2 === 0 ? "text-zinc-500" : "text-blue-100/60"
                    } font-medium`}
                  >
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. MARKET AUTHORITY & GROWTH */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#12066a]/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                Market Leadership
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-normal leading-[1] mb-8">
                Why ISO 9001 is <br />
                <span className="text-[#997819]">Essential </span>
                for UK Businesses Today.
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-16 h-16 shrink-0 bg-zinc-50 rounded-2xl flex items-center justify-center text-[#997819] group-hover:bg-[#12066a] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Briefcase size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#12066a] mb-2 uppercase tracking-tight">
                      ACCESS TO HIGH-VALUE CONTRACTS
                    </h3>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                      Leading UK construction and security clients prioritise
                      suppliers with certified{" "}
                      <Link
                        href="https://bizgrow-holdings.com/iso-9001-guide/"
                        className="text-[#997819] font-bold"
                      >
                        ISO 9001
                      </Link>{" "}
                      systems. It is often a baseline requirement for tender
                      eligibility and framework approvals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-16 h-16 shrink-0 bg-zinc-50 rounded-2xl flex items-center justify-center text-[#997819] group-hover:bg-[#12066a] group-hover:text-white transition-all duration-500 shadow-sm">
                    <Users size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#12066a] mb-2 uppercase tracking-tight">
                      IMPROVED CLIENT CONFIDENCE
                    </h3>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                      A certified{" "}
                      <Link
                        href="https://bizgrow-holdings.com/qms-software/"
                        className="text-[#997819] font-bold"
                      >
                        Quality Management System
                      </Link>{" "}
                      demonstrates reliability, accountability, and commitment
                      to continuous improvement, key factors for long-term
                      client relationships.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="p-2 bg-zinc-100 rounded-[3.5rem]">
                <div className="bg-[#12066a] rounded-[3rem] p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#997819] to-transparent opacity-50" />

                  <h2 className="text-white font-black text-2xl mb-10 tracking-tight ">
                    Our ISO 9001 Support Promise
                  </h2>
                  <div className="space-y-6">
                    {[
                      "Accelerated certification guidance with minimal disruption",
                      "Tailored QMS documentation aligned to real operations",
                      "End-to-end audit coordination and assessor support",
                      <>
                        Practical staff awareness and{" "}
                        <Link
                          href="https://bizgrow-holdings.com/compliance-consultancies/"
                          className="text-[#997819] font-bold"
                        >
                          compliance
                        </Link>{" "}
                        training
                      </>,
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="py-4 border-b border-white/10 text-blue-100/80 font-bold flex justify-between items-start gap-4 group cursor-default"
                      >
                        <span className="text-left leading-tight">{item}</span>
                        <CheckCircle2
                          className="text-[#997819] shrink-0 mt-1"
                          size={20}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 4. OUR IMPLEMENTATION JOURNEY */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter ">
              From Assessment to ISO 9001{" "}
              <span className="text-[#997819]">Certification.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                n: "01",
                t: "Business Context Review",
                d: "We review your organisation, sector needs, and current practices to align your system with UK quality requirements.",
              },
              {
                n: "02",
                t: "Process & System Alignment",
                d: (
                  <>
                    Core processes are refined to improve efficiency and meet{" "}
                    <Link
                      href="https://bizgrow-holdings.com/why-iso-9001-matters-for-uk-business-quality-and-growth/"
                      className="text-[#997819] font-bold"
                    >
                      ISO 9001
                    </Link>{" "}
                    standards without operational disruption.
                  </>
                ),
              },
              {
                n: "03",
                t: "Internal Audit & Readiness Check",
                d: "Your system is checked against ISO 9001 to fix gaps before the certification audit.",
              },
              {
                n: "04",
                t: "Certification & Audit Support",
                d: "We guide you through the external audit and support you until ISO 9001 certification is achieved.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 hover:bg-[#12066a] group transition-all duration-500"
              >
                <span className="text-5xl font-black text-[#997819]/60 group-hover:text-[#997819] transition-colors">
                  {step.n}
                </span>
                <h3 className="text-xl font-black text-[#12066a] group-hover:text-white mt-6 mb-3">
                  {step.t}
                </h3>
                <p className="text-zinc-500 group-hover:text-blue-100/60 text-sm font-medium leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. DETAILED DOCUMENTATION CHECKLIST */}
      <section className="py-4 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 border-t border-zinc-100 pt-24">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <FadeIn direction="right">
                <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tight mb-6 uppercase">
                  Essential QMS <br />{" "}
                  <span className="text-[#997819]">Documentation</span>
                </h2>
                <p className="text-zinc-500 font-medium mb-10 max-w-md">
                  We design and implement a structured{" "}
                  <Link
                    href="https://bizgrow-holdings.com/is-iso-9001-the-secret-to-consistent-quality-and-client-trust/"
                    className="text-[#997819] font-bold"
                  >
                    ISO 9001
                  </Link>{" "}
                  Quality Management System tailored to your UK business
                  operations, covering all mandatory documentation required for
                  certification:
                </p>

                <div className="grid sm:grid-cols-1 gap-4">
                  {[
                    "Quality Policy & Measurable Objectives",
                    "Documented Procedures & SOPs",
                    "Management Review & Performance Records",
                    "Non-Conformity, Corrective & Preventive Actions",
                    "Approved Supplier & Contractor Assessments",
                    "Staff Competency & Training Records",
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl font-black text-[10px] uppercase tracking-widest border-l-4 border-[#997819] hover:bg-zinc-100 transition-colors"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-[#997819] shrink-0"
                      />
                      {doc}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="lg:w-1/2 relative">
              <FadeIn direction="left">
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-zinc-50">
                  <Image
                    src="/QMS.jpg"
                    alt="ISO 9001 QMS - BizGrow Holdings Ltd"
                    width={600}
                    height={700}
                    className="object-cover hover:scale-105 h-90 md:h-150 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12066a]/20 to-transparent" />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-[#997819] p-8 rounded-[2rem] text-white shadow-xl hidden md:block">
                  <p className="text-3xl font-black leading-none">100%</p>
                  <p className="text-[10px] uppercase font-bold tracking-tighter opacity-80">
                    Audit Ready Docs
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 6. TECHNICAL METRICS SECTION */}
      <section className="py-22 bg-[#12066a] relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'url("/compliance.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/60 to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#997819] h-64 rounded-[3rem] p-8 flex flex-col justify-end shadow-2xl">
                  <span className="text-4xl font-black text-white">98%</span>
                  <p className="text-white text-xs font-bold uppercase tracking-widest mt-2">
                    Success Rate
                  </p>
                </div>
                <div className="bg-white h-64 rounded-[3rem] p-8 flex flex-col justify-end border border-white/10 shadow-2xl">
                  <BarChart3 className="text-[#997819] mb-4" size={40} />
                  <p className="text-[#997819] font-bold">
                    Operational Data Focus
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                Data Driven <br />{" "}
                <span className="text-[#997819]">Compliance.</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Annex SL High-Level Structure",
                  "Plan-Do-Check-Act (PDCA) Cycle",
                  "Leadership Commitment Training",
                ].map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 text-blue-100/70 font-bold group cursor-default"
                  >
                    <CheckCircle2 className="text-[#997819] group-hover:scale-125 transition-transform" />
                    <span className="group-hover:text-white transition-colors">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 7. CTA (With Signature Design) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="p-12 md:p-24 rounded-[4rem] bg-[#12066a] relative overflow-hidden group shadow-2xl"
            style={{
              backgroundImage: 'url("/essentials.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="absolute inset-0 bg-[#12066a]/60 z-0" />
            <div className="relative z-10 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10">
                Ready for the <br />{" "}
                <span className="text-[#997819]">Next Level?</span>
              </h2>
              <Link
                href="/contact-us"
                className="relative group/btn overflow-hidden inline-flex items-center justify-center bg-[#997819] text-white px-6 md:px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 shadow-3xl active:scale-95"
              >
                <span className="relative z-40 transition-colors duration-500 group-hover/btn:text-[#12066a]">
                  Get ISO 9001 Certified
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ISO9001Page;
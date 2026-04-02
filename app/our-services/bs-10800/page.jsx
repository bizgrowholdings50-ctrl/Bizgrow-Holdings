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

export const metadata = {
  title: "BS 10800 Certification Services | Business Continuity Support UK",
  description:
    "BizGrow Holdings helps UK businesses achieve BS 10800 certification to strengthen business continuity and improve audit readiness.",
};  

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
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Prominent Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[10rem] md:text-[15rem] font-black text-white/10 leading-none uppercase tracking-tighter">
            SAFETY
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-sm md:text-xs">
                British Standard for Security SERVICES
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-5xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter uppercase">
                BS 10800 Support for UK
                <span className="text-[#997819]"> CONSULTANCY.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-10 text-blue-100/60 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium italic">
                "Get <Link href="https://bizgrow-holdings.com/what-is-bs-10800-in-the-uk-2026/" className="text-[#997819] font-bold">BS 10800</Link> implemented properly, policies, processes,
                evidence, and staff readiness with expert guidance from start to
                sign-off."
              </p>
            </FadeIn>

            <FadeIn direction="right" duration="1.0">
              <div className="mt-12 flex items-center gap-4">
                <div className="w-32 h-2 bg-[#997819] rounded-full" />
                <ShieldCheck className="text-white/20" size={30} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. UK COMPLIANCE AUDIT (Grid Layout) */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black text-[#12066a] text-center tracking-tighter uppercase ">
            UK SECURITY <br />
            <span className="text-[#997819]">COMPLIANCE.</span>
          </h2>

          <h3 className="text-3xl font-bold text-center mt-6">
            Raising Standards Across Security Operations
          </h3>
          <p className="mb-16 mt-4 text-center max-w-7xl md:mx-30">
            Professional security services require structured systems,
            documented procedures, and full regulatory alignment. We help <Link href="https://bizgrow-holdings.com/how-to-start-a-security-company-in-the-uk/" className="text-[#997819] font-bold">UK
            security companies</Link> implement practical compliance frameworks that
            meet British Standards and <Link href="https://bizgrow-holdings.com/top-sia-security-recruitment-agencies-in-the-uk/" className="text-[#997819] font-bold">SIA requirements</Link>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                t: "1.	Manned Guarding (BS 7499 & BS 10800)",
                d: "Structured operational procedures aligned with recognised British Standards for professional security services.",
              },
              {
                t: "2.	Vetting & Screening (BS 7858)",
                d: "Compliant background screening systems for all security personnel.",
              },
              {
                t: "3.	SIA Licence Verification",
                d: <>Clear internal processes to monitor and maintain valid <Link href="https://bizgrow-holdings.com/business-benefits-of-becoming-an-sia-approved-contractor/" className="text-[#997819] font-bold">SIA licensing</Link></>,
              },
              {
                t: "4.	Command & Control",
                d: "Defined management structures and escalation procedures for contract oversight.",
              },
              {
                t: "5.	Tactical PPE & Equipment",
                d: <><Link href="https://bizgrow-holdings.com/our-services/internal-audit/" className="text-[#997819] font-bold">Audit-ready</Link> systems covering uniforms, radios, and protective equipment</>,
              },
              {
                t: "6.	Incident Reporting & Logs",
                d: "Standardised reporting procedures to strengthen transparency and audit readiness.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 hover:border-[#997819] hover:shadow-xl transition-all group"
              >
                <CheckCircle2 size={20} className="text-[#997819] mb-4" />
                <h4 className="font-black text-[#12066a] uppercase text-xs tracking-widest mb-2">
                  {item.t}
                </h4>
                <p className="text-zinc-500 text-[13px] font-medium leading-relaxed">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 3. WHY BS 10800 MATTERS (Strategic Benefits) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2">
            <h3 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase ">
              BS 10800 Services
              <span className="text-[#997819]"> We Provide.</span>
            </h3>
            <p className="mb-4 mt-4">
              At <Link href="/" className="text-[#997819] font-bold">BizGrow Holdings</Link>, we help UK businesses implement BS 10800
              simply and effectively. Our services include
            </p>
            <div className="space-y-3">
              {[
                {
                  t: "Gap Analysis & Risk Assessment",
                  icon: <FileCheck />,
                },
                {
                  t: "Business Continuity Planning",
                  icon: <ShieldCheck />,
                },
                {
                  t: "Policy & Procedure Development",
                  icon: <ShieldCheck />,
                },
                {
                  t: "Training & Awareness",
                  icon: <ShieldCheck />,
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex gap-3 border-l-4 border-zinc-100 pl-8 hover:border-[#997819] transition-all group"
                >
                  <div className="text-[#997819] group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-[#12066a] uppercase text-sm tracking-tighter">
                      {benefit.t}
                    </h4>
                    <p className="text-zinc-500 font-medium">{benefit.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 rounded-[4rem] overflow-hidden shadow-2xl scale-95 hover:scale-100 transition-transform duration-700">
            <Image
              src="/security-professional.jpg"
              alt="BS 10800 compliance with a UK security company "
              width={600}
              height={600}
              className="object-cover h-92"
            />
          </div>
        </div>
      </section>

      {/* 🔹 4. BS 10800 VS ACS (Competitive Comparison) */}
      <section className="py-24 bg-[#12066a] text-white relative overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl text-center font-black tracking-tighter uppercase mb-12">
            BS 10800 <span className="text-[#997819]">VS ACS.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-sm">
              <h3 className="text-[#997819] font-black text-2xl mb-4">
                Without BS 10800
              </h3>
              <p className="text-blue-100/60 text-sm font-medium">
                ● Audit-ready business continuity <br />
                ● Stronger client trust and contract wins <br />
                ● Clear emergency response plan <br />● Reduced downtime and
                reputation risk
              </p>
            </div>
            <div className="p-10 bg-[#997819] rounded-[3rem] shadow-2xl">
              <h3 className="text-white font-black text-2xl mb-4 uppercase">
                Without BS 10800
              </h3>
              <p className="text-white/90 text-sm font-black italic">
                ● No formal continuity framework <br />
                ● Higher downtime risk <br />
                ● Harder to win contracts <br />● Lower credibility with clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. ROADMAP TO CERTIFICATION (Process Step-by-Step) */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl  font-black text-[#12066a] tracking-tighter uppercase leading-none">
              How Our BS 10800{" "}
              <span className="text-[#997819]">Support Works?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                t: "Initial Assessment",
                d: "We review your current business continuity processes and identify gaps against BS 10800 requirements.",
              },
              {
                n: "02",
                t: "Implementation Support",
                d: "We help you create a structured business continuity plan, define roles and responsibilities, and develop response strategies.",
              },
              {
                n: "03",
                t: "Documentation & Training",
                d: "We prepare all necessary documents, train your staff, and ensure everyone understands their role during disruptions.",
              },
              {
                n: "04",
                t: "Audit Readiness",
                d: <>We guide you through <Link href="https://bizgrow-holdings.com/how-do-internal-audits-enhance-compliance-efficiency/" className="text-[#997819] font-bold">internal audits</Link> and help you stay compliant with the standard.</>,
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[3rem] border border-zinc-100 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all"
              >
                <span className="text-5xl font-black text-[#997819]/50 mb-6">
                  {step.n}
                </span>
                <h3 className="font-black text-[#12066a] uppercase mb-3 tracking-tighter text-lg">
                  {step.t}
                </h3>
                <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 6. FAQs (SEO Boost) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase mb-20 text-center">
            COMMON <span className="text-[#997819]">QUESTIONS.</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "Is BS 10800 mandatory for UK security companies?",
                a: "BS 10800 is not a legal requirement like SIA licensing. However, many public-sector contracts and high-value private tenders require compliance with recognised British Standards, making it a strong competitive advantage.",
              },
              {
                q: "How long does the certification certification  take?",
                a: "The timeframe typically ranges from 4–8 weeks, depending on your current documentation, operational controls, and staff vetting processes. A structured implementation plan can significantly speed up approval.",
              },
              {
                q: "Does BS 10800 replace ISO 9001?",
                a: "No. BS 10800 is a security sector-specific standard that complements ISO 9001. While ISO 9001 focuses on quality management systems, BS 10800 demonstrates professional competence in delivering security services.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:border-[#997819] transition-all group"
              >
                <h3 className="font-black text-[#12066a] uppercase text-sm mb-4 flex gap-3">
                  <HelpCircle className="text-[#997819]" size={18} /> {faq.q}
                </h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <span className="text-[#997819]">
                    {" "}
                    BS 10800 Support{" "}
                  </span>{" "}
                  with BizGrow Holdings
                </h2>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <p className="text-blue-100/70 mb-12 font-medium max-w-2xl mx-auto text-lg md:text-xl italic">
                  "If your business wants to protect itself from disruption,
                  build resilience, and demonstrate professional continuity
                  planning, BS 10800 is the right choice."
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.6}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 ">
                  <Link href="/contact">
                  <button className="bg-[#997819] text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-700 shadow-2xl group flex items-center gap-3">
                    Get Expert Consultancy
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
       
      </section>
    </main>
  );
};

export default BS10800Page;

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  ShieldAlert,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "SIA ACS Certification | BizGrow Holdings Ltd",
  description:
    "Achieve SIA ACS certification with BizGrow Holdings. Elevate your UK security business with Compliance, Trusted Standards, & Excellence.",
};

const SIAACSPage = () => {
  return (
    <main className="bg-white text-zinc-900">
      {/* 🔹 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sia-acs-hero.jpg"
            alt="Professional SIA ACS Certification Consultancy UK"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
        </div>

        {/* Large Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[12rem] md:text-[25rem] font-black text-white/[0.12] leading-none uppercase tracking-tighter">
            ACS
          </span>
        </div>

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
                BizGrow Holdings provides specialist{" "}
                <Link
                  href="https://bizgrow-holdings.com/top-sia-security-recruitment-agencies-in-the-uk/"
                  className="text-[#997819] font-bold hover:underline transition-all"
                  aria-label="Read more about SIA ACS agencies"
                >
                  SIA ACS
                </Link>{" "}
                consultancy services designed to help UK security businesses
                meet assessment criteria and achieve successful accreditation.
              </p>
            </FadeIn>

            <FadeIn direction="right" duration="1.0">
              <div className="mt-12 w-32 h-2 bg-[#997819] rounded-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. DEEP INTRO & FOCUS AREAS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <FadeIn direction="right">
                <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter mb-8">
                  Excellence in the{" "}
                  <span className="text-[#997819]">Approved Contractor Scheme</span>
                </h2>
                <div className="space-y-6 text-zinc-600 text-lg leading-relaxed font-medium">
                  <p>
                    The Security Industry Authority{" "}
                    <Link
                      href="https://bizgrow-holdings.com/business-benefits-of-becoming-an-sia-approved-contractor/"
                      className="text-[#997819] font-bold hover:underline"
                    >
                      (SIA)
                    </Link>{" "}
                    Approved Contractor Scheme (ACS) represents the highest
                    standard of operational competence for UK security providers.
                  </p>
                  <p>
                    Our consultancy is built on structured compliance
                    implementation, not generic templates. We help you meet all 88{" "}
                    <Link
                      href="https://bizgrow-holdings.com/get-acs-accreditation-fast/"
                      className="text-[#997819] font-bold hover:underline"
                    >
                      ACS assessment
                    </Link>{" "}
                    indicators and achieve strong, audit-ready outcomes.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-4 bg-[#12066a] p-10 rounded-[3rem] border border-zinc-100 shadow-sm">
              <h3 className="text-white font-black uppercase tracking-widest text-md mb-6">
                ACS Compliance Focus Areas:
              </h3>
              <ul className="space-y-4" role="list">
                {[
                  "Self-Assessment Workbook (SAW) preparation",
                  "Performance Indicator alignment (88 criteria)",
                  "Workforce screening compliance",
                  { text: "Risk management systems", link: "https://bizgrow-holdings.com/what-does-rams-stand-for/" },
                  { text: "Internal audit", link: "https://bizgrow-holdings.com/our-services/internal-audit/" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-white font-bold leading-tight">
                    <CheckCircle2 size={22} className="text-[#997819] flex-shrink-0 mt-1" aria-hidden="true" />
                    <span className="text-lg">
                      {typeof item === "string" ? item : (
                        <Link href={item.link} className="hover:text-[#997819] transition-colors">
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
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                The Audit Framework
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter">
                The 8 Core Pillars of <span className="text-[#997819]">SIA ACS Compliance</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Strategic Direction", d: "Clear governance and policies aligned with ACS requirements." },
              { t: "Service Delivery", d: "Consistent operational standards focused on client satisfaction." },
              { t: "Commercial Integrity", d: "Transparent contracts, ethical marketing, and procurement." },
              { t: "Financial Stability", d: "Proven financial control and business continuity planning." },
              { t: "Operational Resource Management", d: "Effective personnel deployment and equipment control." },
              { t: "Workforce Compliance", d: "Embedding BS 7858 vetting and structured training." },
              { t: "Leadership & Accountability", d: "Executive oversight and continuous performance reviews." },
              { t: "Client Experience", d: "Feedback loops and corrective actions for improvement." },
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

      {/* 🔹 4. ADVANTAGES SECTION */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#997819]/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter mb-8">
              Advantages of Being <br /> <span className="text-[#997819]">SIA ACS Approved</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { title: "Legal Compliance", icon: <ShieldCheck />, desc: "Adherence to UK laws and professional accountability." },
              { title: "Access to Contracts", icon: <Briefcase />, desc: "Unlock government and private sector tenders." },
              { title: "Credibility & Trust", icon: <Award />, desc: "Public recognition as a trusted UK security provider." },
            ].map((adv, idx) => (
              <div key={idx} className="p-10 rounded-[3rem] bg-zinc-50 border group hover:bg-[#12066a] transition-all duration-500">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-6 text-[#997819]">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-black mb-4 group-hover:text-[#997819]">{adv.title}</h3>
                <p className="text-zinc-500 group-hover:text-white/80">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. OUR PROCESS */}
      <section className="py-32 bg-[#12066a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10 leading-none">
                Our ACS Success <br /> <span className="text-[#997819]">Framework.</span>
              </h2>
              <div className="space-y-12">
                {["Compliance Assessment", "System Development", "Operational Integration", "Audit Readiness"].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-4xl font-black text-white group-hover:text-[#997819] transition-colors">0{i+1}</span>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step}</h3>
                      <p className="text-white/70 text-sm">Professional structuring to meet performance indicators.</p>
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
      </section>

      {/* 🔹 6. CTA SECTION */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto bg-[#12066a] p-12 md:p-24 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase">
              Ready to Elevate Your <span className="text-[#997819]">ACS Score?</span>
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
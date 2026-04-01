import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldAlert,
  Users,
  HardHat,
  Activity,
  Stethoscope,
  ClipboardCheck,
  HeartPulse,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "ISO 45001 Certification UK | Health & Safety Compliance",
  description:
    "Secure your UK business with ISO 45001 certification from BizGrow Holdings. Streamline safety, stay compliant, and impress auditors.",
};

const ISO45001Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (Bold Industrial Vibe) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#12066a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/iso-45001-hero.jpg"
            alt="ISO-45001 | Bizgrow Holdings"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="max-w-3xl">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-[#997819]" />
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs">
                  Health & Safety Excellence
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter">
                ISO 45001 Occupational <br />
                <span className="text-[#997819]">Health & Safety </span>{" "}
                Management.
              </h1>
              <p className="mt-10 text-blue-100/60 text-xl md:text-2xl leading-relaxed font-medium">
                ISO 45001 is the Occupational Health & Safety Management Systems
                standard recognised throughout the UK. Businesses across the UK
                can fully comply with <Link href="https://bizgrow-holdings.com/key-components-of-health-and-safety-policy/" className="text-[#997819] font-bold">UK Health and Safety</Link> legislation with its
                help.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🚀 NEW SECTION: WHY ISO 45001 MATTERS (Equal Width Grid) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Centered Heading */}
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                Business Value
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase leading-tight">
                Why Does ISO 45001 Matter <br />
                <span className="text-[#997819]">For Your UK Business?</span>
              </h2>
              <div className="w-24 h-1.5 bg-[#997819] mx-auto mt-6 rounded-full" />
            </FadeIn>
          </div>

          {/* Equal Width Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                t: "Identify & Control Risks",
                d: "Spot the hazards before any accidents happen and control the risks through proactive monitoring.",
                icon: <Activity className="w-8 h-8" />,
              },
              {
                t: "Compliance with the Law",
                d: "Ensure your operations fully comply with the latest UK Health and Safety legislation and practices.",
                icon: <ClipboardCheck className="w-8 h-8" />,
              },
              {
                t: "Client Assurance",
                d: "Show UK clients and partners that you implement detailed, world-class safety plans and procedures.",
                icon: <Users className="w-8 h-8" />,
              },
              {
                t: "Safety Culture",
                d: "Establish responsibility and safety awareness throughout your entire UK workforce.",
                icon: <HardHat className="w-8 h-8" />,
              },
            ].map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1} className="h-full">
                <div className="h-full p-10 border border-zinc-100 bg-zinc-50 rounded-[3rem] hover:bg-[#12066a] hover:text-white transition-all duration-700 group flex flex-col">
                  {/* Icon */}
                  <div className="text-[#997819] mb-8 group-hover:scale-110 transition-transform flex-shrink-0">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black mb-4 tracking-tight leading-tight uppercase">
                    {item.t}
                  </h3>

                  {/* Description - flex-grow ensures equal card height */}
                  <p className="text-zinc-500 group-hover:text-blue-100/60 font-medium text-sm leading-relaxed flex-grow">
                    {item.d}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bottom Summary Statement */}
          <FadeIn direction="up" delay={0.5}>
            <div className="mt-16 p-4 md:p-8 bg-[#12066a]/5 rounded-[2.5rem] border border-[#12066a]/10 text-center">
              <p className="text-[#12066a] font-bold text-lg md:text-xl italic leading-relaxed max-w-4xl mx-auto">
                "Implementing ISO 45001 shows that safety, compliance, and
                professionalism are important to your UK organisation, making
                you a trusted partner in the UK market."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. RISK & PROTECTION GRID (Unique Asymmetric Layout) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 p-6 md:p-12 bg-zinc-50 rounded-[3rem] flex flex-col text-center md:text-left justify-center">
              <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter mb-6">
                Risk is <span className="text-[#997819]">Manageable.</span>{" "}
                <br />
                Safety is Essential.
              </h2>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                <Link href="https://bizgrow-holdings.com/is-iso-45001-the-essential-solution-for-safety-and-compliance/" className="text-[#997819] font-bold">ISO 45001</Link> helps organisations build a structured Occupational
                Health & Safety Management System, reducing workplace hazards
                and protecting employees across high-risk environments.
              </p>
            </div>
            {[
              {
                t: "WORKPLACE SAFETY CULTURE",
                d: "Implement safety measures to enhance workplace safety for employees and contractors",
                icon: <HeartPulse />,
                bg: "bg-[#12066a] text-white",
              },
              {
                t: "REGULATORY COMPLIANCE",
                d: <>Ensure UK health and safety <Link href="https://bizgrow-holdings.com/compliance-consultancies/" className="text-[#997819] font-bold">compliance</Link> to enhance credibility in tenders and audits.</>,
                icon: <ShieldAlert />,
                bg: "bg-white border border-zinc-100",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-10 rounded-[3rem] ${item.bg} flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500`}
              >
                <div className="text-[#997819]">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-black mb-3 tracking-tight uppercase">
                    {item.t}
                  </h3>
                  <p className="opacity-70 text-sm font-medium">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 3. THE SAFETY PILLARS (Vertical Split Layout) */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-stretch">
            <div className="lg:w-1/2 bg-[#12066a] rounded-[4rem] p-16 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-10 tracking-tight">
                  Standard Pillars
                </h2>
                <div className="space-y-12">
                  {[
                    "RISK ASSESSMENT",
                    "OPERATIONAL CONTROLS",
                    "INCIDENT REPORTING",
                  ].map((text, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-6 border-l-2 border-[#997819] pl-6"
                    >
                      <span className="text-[#997819] font-black italic">
                        0{idx + 1}
                      </span>
                      <p className="font-bold text-xl uppercase tracking-tighter">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <Activity
                className="absolute -bottom-10 -right-10 text-white/5"
                size={300}
              />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                WORKPLACE SAFETY
              </span>
              <h2 className="text-4xl md:text-7xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                Build a<span className="text-[#997819]"> Stronger Safety </span>
                Culture.
              </h2>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed mb-10">
                <Link href="https://bizgrow-holdings.com/could-iso-45001-enhance-workplace-safety-and-compliance/" className="text-[#997819] font-bold">ISO 45001</Link> helps organisations create a safer working environment
                through structured <Link href="https://bizgrow-holdings.com/what-does-rams-stand-for/" className="text-[#997819] font-bold">risk management</Link>, clear responsibilities, and
                continuous health and safety improvement.
              </p>
              <div className="flex gap-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-3">
                  <Users className="text-[#997819]" />
                  <span className="font-black text-[10px] uppercase tracking-widest">
                    EMPLOYEE AWARENESS
                  </span>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-3">
                  <HardHat className="text-[#997819]" />
                  <span className="font-black text-[10px] uppercase tracking-widest">
                    SAFETY PROCEDURES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 4. COMPLIANCE JOURNEY (Horizontal Line Track) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter mb-4">
            Our Comprehensive <span className="text-[#997819]">ISO 45001 </span>{" "}
            <br /> Certification Process:
          </h2>
          <p className="text-center mb-10 mt-2 ">
            <Link href="https://bizgrow-holdings.com/" className="text-[#997819] font-bold">BizGrow Holdings</Link> delivers a step-by-step avenue for UK organisations
            wishing to achieve ISO 45001 certification:
          </p>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-100 -translate-y-1/2 hidden md:block" />
            <div className="grid md:grid-cols-4 gap-12 relative z-10">
              {[
                {
                  t: "Gap Assessment",
                  d: "Evaluation of your existing health and safety management systems to identify gaps in compliance and areas of weakness.",
                },
                {
                  t: "Development of Systems",
                  d: "Create or modify acceptable occupational health and safety policies in your business context.",
                },
                {
                  t: "Support Implementation",
                  d: "Integrate the new safety management processes in your organisation with training and mentoring of your employees.",
                },
                {
                  t: "Audit and Certification",
                  d: "Our approach will support you in achieving an effective and sustainable state of compliance while ensuring that your UK organisation is audit-ready.",
                },
              ].map((step, i) => (
                <div key={i} className="bg-white p-6 text-center group">
                  <div className="w-16 h-16 bg-[#12066a] text-[#997819] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#997819] group-hover:text-white transition-all duration-500 font-black">
                    {i + 1}
                  </div>
                  <h3 className="font-black text-[#12066a] uppercase text-sm mb-2">
                    {step.t}
                  </h3>
                  <p className="text-zinc-500 text-xs font-medium">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. DOCUMENTATION (Industrial Dark List) */}
      <section className="py-24 relative rounded-t-[5rem] overflow-hidden group">
        {/* 🔹 Pure CSS Parallax Layer (Safe & No Layout Shift) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          <div className="fixed inset-0 w-full h-full">
            <Image
              src="/key-benefits.jpg"
              alt="Key Benefits Background"
              fill
              priority
              className="object-cover opacity-90 transition-transform duration-1000"
            />
          </div>

          {/* Dark Overlay - Text readability maintain karne k liye */}
          <div className="absolute inset-0 bg-[#12066a]/80 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="flex flex-col justify-between items-center mb-20 gap-8">
            <h2 className="text-4xl md:text-5xl text-center font-black text-white tracking-normal leading-none">
              Key Benefits of <span className="text-[#997819]">ISO 45001 </span>{" "}
              <br /> Certification for UK Businesses
            </h2>
            <p className="text-blue-100/60 text-center font-medium max-w-2xl">
              ISO 45001 proves to UK security businesses that workplace safety
              is managed efficiently and effectively, which promotes confidence
              with clients and partners alike
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Maintaining a Safety Culture",
              "Confidence in Regulatory Compliance",
              "Confidence to Clients",
              "Operational Performance",
              "Continuous Improvement",
              "Reduced Workplace Incidents",
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-8 bg-white/5 border border-white/10 rounded-3xl group/card hover:bg-white transition-all duration-500 shadow-lg"
              >
                <span className="text-white group-hover/card:text-[#12066a] font-bold tracking-tight">
                  {doc}
                </span>
                <ClipboardCheck className="text-[#997819]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 6. METRICS (Bold Numbers) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <span className="text-7xl font-black text-[#12066a]">0%</span>
            <p className="text-[#997819] font-black uppercase tracking-widest text-[10px] mt-4">
              Tolerance for Safety Negligence
            </p>
          </div>
          <div>
            <span className="text-7xl font-black text-[#12066a]">85%</span>
            <p className="text-[#997819] font-black uppercase tracking-widest text-[10px] mt-4">
              Improved Workplace Safety Performance
            </p>
          </div>
          <div>
            <span className="text-7xl font-black text-[#12066a]">100%</span>
            <p className="text-[#997819] font-black uppercase tracking-widest text-[10px] mt-4">
              Commitment to Employee Protection
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 7. CTA SECTION (With Background Image & Flex-Col) */}
      <section className="pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Parent section with a height and overflow hidden */}
          <div className="relative group rounded-[3.5rem] overflow-hidden shadow-2xl min-h-125 md:min-h-150 flex items-center justify-center bg-[#12066a]">
            {/* 🔹 The Parallax Magic (Clip-path window) */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ clipPath: "inset(0 0 0 0)" }}
            >
              <div className="fixed inset-0 w-full h-full">
                <Image
                  src="/iso-45001-cta.jpg"
                  alt="ISO 45001 CTA"
                  fill
                  priority
                  className="object-cover opacity-60 transition-transform duration-1000"
                />
              </div>

              {/* Overlays inside the clipped window */}
              <div className="absolute inset-0 bg-[#12066a]/40 mix-blend-multiply z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/20 to-transparent z-20" />
            </div>

            {/* 🔹 Content Layer */}
            <div className="relative z-30 w-full max-w-4xl px-10 py-20 flex flex-col items-center text-center">
              <FadeIn direction="up">
                <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-10">
                  Secure Your Workforce
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8">
                  Ready to Protect <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37] inline-block mt-2">
                    Your People?
                  </span>
                </h2>
                <p className="text-white md:mx-40 mb-3">
                  Contact us today to start your journey and elevate your
                  security business to professional standards.
                </p>
              </FadeIn>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
                <FadeIn direction="up" delay={0.2}>
                  <Link href="/contact-us">
                  <button className="relative group/btn overflow-hidden w-full sm:w-64 bg-[#997819] text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(153,120,25,0.4)]">
                    <span className="relative z-10 group-hover/btn:text-[#12066a] transition-colors duration-500">
                      Contact Us
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

export default ISO45001Page;

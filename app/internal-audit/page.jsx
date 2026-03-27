import React from "react";
import Image from "next/image";
import {
  ClipboardCheck,
  ShieldCheck,
  BarChart3,
  Lock,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import FadeIn from "@/components/MotionWrapper";

const InternalAuditPage = () => {
  return (
    <main className="bg-white">
      {/* 🔹 1. HERO SECTION */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center pt-24 overflow-hidden bg-[#12066a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/audit-hero.jpg" // Replace with your image path
            alt="Internal Audit Services"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12066a]/80 via-transparent to-[#12066a]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <FadeIn direction="up">
            <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-8">
              Stay Compliant
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-8">
              Internal Audit <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37]">
                Services for UK <br /> Businesses.
              </span>
            </h1>
            <p className="text-blue-100/80 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed">
              Ensure your business complies with UK regulatory standards with
              expert internal audits. Identify risks, improve processes, and
              stay audit-ready with confidence.
            </p>
            <button className="bg-[#997819] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-2xl">
              Get a Free Consultation
            </button>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. WHAT IS INTERNAL AUDIT (Split Layout) */}
      <section className="py-22">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <FadeIn direction="left">
                <h3 className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6">
                  Introduction
                </h3>
                <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                  What is Internal Audit &
                  <span className="text-[#997819]"> Why It Matters</span>
                </h2>
                <div className="space-y-6 text-zinc-700 text-lg leading-relaxed">
                  <p>
                    Internal audit is a structured process used to review and
                    evaluate an organisation’s internal controls, risk
                    management, and compliance systems, ensuring operations run
                    effectively.
                  </p>
                  <p className="font-medium text-[#12066a]">
                    It plays a vital role in helping businesses stay compliant
                    with ISO standards, ACS requirements, and UK regulations
                    while identifying risks and improving performance and
                    keeping your organisation audit-ready.
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-zinc-100 rounded-[4rem] rotate-3" />
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl -rotate-3 hover:rotate-0 transition-all duration-700">
                <Image
                  src="/audit-works.jpg"
                  width={600}
                  height={500}
                  alt="Audit Process"
                  className="object-cover h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 2.5 WHY INTERNAL AUDIT IS IMPORTANT (Premium Redesign) */}
      <section className="py-22 bg-white relative overflow-hidden">
        {/* Background subtle elements for premium feel */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#997819]/5 rounded-full blur-[100px] -mr-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#12066a]/5 rounded-full blur-[100px] -ml-48" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* ⬅️ Left: Content & Heading */}
            <div className="lg:col-span-5">
              <FadeIn direction="left">
                <h3 className="text-[#997819] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                  Strategic Assurance
                </h3>
                <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-[0.9] mb-8 uppercase">
                  Why Internal Audit
                  <span className="text-[#997819]"> is Important</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-xl font-bold text-[#12066a] leading-tight border-l-4 border-[#997819] pl-6 italic">
                    "Internal audits are essential for maintaining control,
                    improving performance, and ensuring your business remains
                    compliant with industry standards."
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* ➡️ Right: Premium Feature Cards */}
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              {/* Card 1: Risk & Compliance */}
              <FadeIn direction="up" delay={0.1}>
                <div className="group p-8 bg-zinc-50 border border-zinc-100 rounded-[3rem] hover:bg-[#12066a] transition-all duration-700 h-full flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-2">
                  <div>
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#997819] transition-colors duration-500">
                      <ShieldCheck
                        className="text-[#997819] group-hover:text-white transition-colors"
                        size={28}
                      />
                    </div>
                    <p className="text-zinc-600 group-hover:text-blue-100/70 leading-relaxed font-medium">
                      They help identify potential risks before they become
                      serious issues, ensure compliance with HSE regulations and
                      ISO standards, and highlight opportunities to improve
                      processes and efficiency.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-zinc-200 group-hover:border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#997819] group-hover:text-white">
                      Proactive Protection
                    </span>
                  </div>
                </div>
              </FadeIn>

              {/* Card 2: Confidence & Control */}
              <FadeIn direction="up" delay={0.2}>
                <div className="group p-8 bg-white border border-zinc-100 rounded-[3rem] hover:bg-[#997819] transition-all duration-700 h-full flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-2">
                  <div>
                    <div className="w-14 h-14 bg-[#12066a] rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:bg-white transition-colors duration-500">
                      <BarChart3
                        className="text-white group-hover:text-[#997819] transition-colors"
                        size={28}
                      />
                    </div>
                    <p className="text-[#12066a] group-hover:text-white leading-relaxed font-bold text-lg">
                      By conducting regular internal audits, businesses can also
                      avoid costly penalties, maintain regulatory compliance,
                      and operate with greater confidence and control.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-zinc-100 group-hover:border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">
                      Operational Excellence
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 3. ADVANTAGES SECTION (Premium Glassmorphism + Parallax) */}
      <section className="relative py-32 overflow-hidden group">
        {/* 🖼️ Fixed Parallax Background (As used previously) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('/benefits-bg.jpg')", // Aapki pehli wali image
          }}
        >
          {/* Dark Overlay for Readability (Set to 60% for depth) */}
          <div className="absolute inset-0 bg-[#12066a]/60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
                Advantages of{" "}
                <span className="text-[#997819]">Internal Audit</span>
              </h2>
              <p className="text-blue-100/60 max-w-3xl mx-auto text-lg">
                Regular internal audits provide valuable insights that help
                organisations improve control, performance, and compliance.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                t: "Strengthened Internal Controls",
                d: "Identify gaps and improve the effectiveness of your existing systems.",
                icon: <ShieldCheck size={32} />,
              },
              {
                t: "Reduced Risk Exposure",
                d: "Detect and manage risks early to protect your business operations.",
                icon: <Lock size={32} />,
              },
              {
                t: "Regulatory Compliance",
                d: "Ensure compliance with UK laws, industry standards, and ISO requirements.",
                icon: <CheckCircle2 size={32} />,
              },
              {
                t: "Improved Operational Efficiency",
                d: "Streamline processes, reduce costs, and enhance overall performance.",
                icon: <BarChart3 size={32} />,
              },
              {
                t: "Enhanced Financial Accuracy",
                d: "Ensure reliable financial reporting and better decision-making.",
                icon: <ClipboardCheck size={32} />,
              },
              {
                t: "Fraud Prevention",
                d: "Detect irregularities and safeguard your business from potential fraud.",
                icon: <ShieldAlert size={32} />,
              },
            ].map((item, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                <div className="group h-full cursor-pointer relative">
                  {/* 🪄 Glassmorphism Card: Transparent white/5 turns Solid White on Hover */}
                  <div className="p-10 h-full bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm transition-all duration-500  overflow-hidden flex flex-col items-start shadow-2xl">
                    {/* Icon - Scaled on Hover */}
                    <div className="text-[#997819] mb-8 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>

                    {/* Title: Starts White, turns Navy on Hover */}
                    <h3 className="text-xl font-black text-white  mb-4 uppercase tracking-tight transition-colors duration-500">
                      {item.t}
                    </h3>

                    {/* Description: Starts White, turns Zinc-500 on Hover */}
                    <p className="text-white/70  text-sm leading-relaxed transition-colors duration-500 font-medium">
                      {item.d}
                    </p>

                    {/* Decorative Subtle Glow */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#997819]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. PROCEDURE & WHY CHOOSE US (Side by Side) */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Procedure */}
            <div>
              <h2 className="text-4xl font-black text-[#12066a] mb-8 uppercase tracking-tighter">
                Audit Procedure
              </h2>
              <p className="text-zinc-600 mb-8">
                At BizGrow Holdings, we follow a structured and standards-driven
                internal audit approach designed to deliver clear insights.
              </p>
              <div className="space-y-4">
                {[
                  "Assess key risks",
                  "Evaluate internal controls",
                  "Practical recommendations",
                  "Reliable assurance",
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#12066a] text-white flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </div>
                    <span className="font-bold text-[#12066a] uppercase text-sm tracking-widest">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-[#12066a] p-12 rounded-[4rem] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-10 uppercase tracking-tighter">
                  Why Choose Us
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      t: "Experience",
                      d: "In-depth knowledge of UK compliance and ISO standards.",
                    },
                    {
                      t: "Proven Results",
                      d: "Helped businesses successfully pass audits with confidence.",
                    },
                    {
                      t: "Client-Focused",
                      d: "Tailored services to your specific business needs.",
                    },
                    {
                      t: "End-to-End Support",
                      d: "From initial assessment to final audit readiness, we support you at every stage",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <ArrowRight className="text-[#997819] shrink-0 group-hover:translate-x-2 transition-transform" />
                      <div>
                        <h4 className="font-black uppercase tracking-widest text-sm mb-1">
                          {item.t}
                        </h4>
                        <p className="text-blue-100/50 text-sm">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. FINAL CTA SECTION (Premium Parallax Design) */}
      <section className="pb-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Container */}
          <div className="relative group overflow-hidden rounded-[4rem] p-16 md:p-32 bg-[#12066a] text-center flex flex-col items-center shadow-2xl">
            {/* 🖼️ Fixed Parallax Background Layer */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-fixed opacity-40 transition-transform duration-700"
              style={{
                backgroundImage: "url('/audit-cta-bg.jpg')", // Aapki background image
                backgroundAttachment: "fixed", // 👈 Yeh parallax create karega
              }}
            />

            {/* Overlay for Depth */}
            <div className="absolute inset-0 bg-[#12066a]/60 z-0" />

            {/* Content Layer */}
            <div className="relative z-10">
              <FadeIn direction="up">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                  Ready to <span className="text-[#997819]">Get Started?</span>
                </h2>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg font-medium">
                  Take the next step towards compliance, efficiency, and
                  business growth with expert internal audit support.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <button className="relative overflow-hidden group/btn bg-[#997819] text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-2xl active:scale-95">
                  <span className="relative z-10">
                    Book Your Technical Audit today
                  </span>

                  {/* Subtle Shine Effect on Button */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </button>
              </FadeIn>
            </div>

            {/* Decorative Border Glow */}
            <div className="absolute inset-0 border border-white/10 rounded-[4rem] z-20 pointer-events-none" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default InternalAuditPage;

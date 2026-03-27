import React from "react";
import {
  ShieldCheck,
  FileText,
  CheckCircle,
  BarChart,
  Users,
  Building2,
  Search,
  Briefcase,
  Zap,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@components/MotionWrapper";

export const metadata = {
  title: "Compliance Consultancies UK | BizGrow Holdings Ltd",
  description:
    "Expert compliance consultancies for UK security businesses. Achieve ISO, ACS & win more contracts with BizGrow Holdings.",
};

const ComplianceConsultancyPage = () => {
  return (
    <main className="bg-white">
      {/* 🔹 HERO SECTION */}
      <section className="relative h-[70vh] md:h-screen w-full flex items-center overflow-hidden bg-[#12066a]">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/compliance-hero-bg.jpg"
            alt="Compliance Consultancy"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <FadeIn direction="up">
            <span className="text-[#997819] font-bold uppercase tracking-[0.4em] text-sm mb-6 block">
              Strategic Industry Alignment
            </span>
            <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Compliance <br />{" "}
              <span className="text-[#997819]">Consultancies.</span>
            </h1>
            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Navigating UK security industry regulations with expert precision.
              We help organisations achieve compliance, implement structured
              systems, strengthen operational control, and secure more
              contracts.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 CORE MISSION SECTION */}
      <section className="py-24 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[#12066a] text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
              Expert Guidance for <br />{" "}
              <span className="text-[#997819]">Regulated Excellence.</span>
            </h2>
            <p className="text-zinc-600 text-lg mb-6 leading-relaxed font-medium">
              BizGrow Holdings delivers expert compliance consultancy to help
              organisations navigate UK security standards, understand
              regulatory requirements, and implement structured processes for
              fully compliant operations.
            </p>
            <p className="text-zinc-500 mb-10 leading-relaxed">
              Our consultancy services are designed to elevate operational
              performance, strengthen client confidence, and give you a
              competitive edge when bidding for high-value contracts and
              tenders.
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <h4 className="text-3xl font-black text-[#12066a]">100%</h4>
                <p className="text-[10px] font-bold uppercase text-[#997819]">
                  Audit Ready
                </p>
              </div>
              <div className="w-[1px] bg-zinc-200" />
              <div className="text-center">
                <h4 className="text-3xl font-black text-[#12066a]">UK</h4>
                <p className="text-[10px] font-bold uppercase text-[#997819]">
                  Standard Aligned
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#997819]/10 rounded-[3rem] blur-2xl" />
            <div className="relative rounded-[3rem] overflow-hidden border-8 border-zinc-50 shadow-2xl">
              <Image
                src="/compliance-consultancy.png"
                width={600}
                height={700}
                alt="Security Audit"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 WHY COMPLIANCE IS IMPORTANT SECTION */}
      <section className="py-24 bg-[#12066a] relative overflow-hidden">
        {/* Decorative Gold Glow for Premium Look */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#997819]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Side: Heading */}
            <div className="lg:col-span-5">
              <FadeIn direction="right">
                <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                  Strategic Necessity
                </span>
                <h2 className="text-white text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                  Why Compliance <br />
                  <span className="text-[#997819]">Is Important.</span>
                </h2>
                <div className="h-1 w-20 bg-[#997819] mt-8" />
              </FadeIn>
            </div>

            {/* Right Side: Exact Content Provided by You */}
            <div className="lg:col-span-7">
              <FadeIn direction="left" delay={0.2}>
                <div className="space-y-8">
                  <p className="text-blue-100/90 text-xl md:text-2xl font-bold leading-relaxed italic border-l-8 border-[#997819] pl-8">
                    Compliance with UK security industry standards is essential
                    for operating legally, maintaining credibility, and securing
                    high-value contracts. Without proper compliance, businesses
                    risk failed audits, financial penalties, and loss of client
                    trust.
                  </p>

                  <p className="text-white/70 text-lg md:text-xl leading-relaxed font-medium">
                    By meeting recognised standards such as ISO certifications
                    and ACS requirements, organisations not only protect their
                    operations but also position themselves as reliable and
                    professional service providers in a competitive market.
                  </p>
                </div>

                {/* Optional: Simple Holdings Styled Line for Visual Finish */}
                <div className="mt-12 flex gap-2">
                  <div className="h-1 w-12 bg-[#997819]" />
                  <div className="h-1 w-4 bg-white/20" />
                  <div className="h-1 w-2 bg-white/10" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 KEY CONSULTANCY SERVICES */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[#12066a] text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Our Strategic <span className="text-[#997819]">Services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Gap Analysis",
                desc: "Comprehensive assessment of your current operations against UK security industry standards to identify compliance gaps and improvement opportunities.",
                icon: <Search className="w-8 h-8" />,
              },
              {
                title: "Documentation Development",
                desc: "Expert support in developing structured procedures, assignment instructions, and compliance documentation aligned with UK regulatory and British Standards.",
                icon: <FileText className="w-8 h-8" />,
              },
              {
                title: "Audit Preparation",
                desc: "Thorough operational readiness assessments to ensure your organisation meets certification requirements with confidence and achieves successful audit outcomes.",
                icon: <ShieldCheck className="w-8 h-8" />,
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white p-12 rounded-[3rem] border border-zinc-200 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-[#12066a]/5 text-[#12066a] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#997819] group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-[#12066a] font-black uppercase tracking-tighter text-xl mb-4">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 BENEFITS OF WORKING WITH US SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
            <FadeIn direction="right">
              <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                The BizGrow Advantage
              </span>
              <h2 className="text-[#12066a] text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic">
                Benefits of <br />
                <span className="text-[#997819]">Working With Us.</span>
              </h2>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed border-l-4 border-zinc-100 pl-6">
                Partnering with BizGrow Holdings ensures a smooth and efficient
                compliance journey tailored to UK security industry standards.
                We help you achieve certification faster while strengthening
                your operational performance and market position.
              </p>
            </FadeIn>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Expert-Led Compliance Support",
                desc: "Work with specialists who understand UK security regulations and certification requirements.",
                icon: <Users className="w-6 h-6" />,
              },
              {
                title: "Faster Certification Process",
                desc: "Streamlined approach to help you achieve ISO and ACS approvals efficiently.",
                icon: <Zap className="w-6 h-6" />,
              },
              {
                title: "Improved Operational Standards",
                desc: "Implement structured systems that enhance performance and consistency.",
                icon: <BarChart3 className="w-6 h-6" />,
              },
              {
                title: "Stronger Contract Opportunities",
                desc: "Increase credibility and stand out when bidding for high-value contracts and tenders.",
                icon: <Briefcase className="w-6 h-6" />,
              },
            ].map((benefit, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className="group p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:border-[#997819]/30 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                  <div className="w-14 h-14 bg-[#12066a] text-[#997819] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    {benefit.icon}
                  </div>
                  <h3 className="text-[#12066a] font-black uppercase tracking-tighter text-2xl mb-4 italic">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 STRATEGIC BENEFITS SECTION */}
      <section className="py-24 bg-[#12066a] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
                STRENGTHENING <br />{" "}
                <span className="text-[#997819]">REPUTATION.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    t: "Operational Control",
                    d: "Implement structured procedures to deliver consistent, compliant, and professional security services across your organisation.",
                  },
                  {
                    t: "Enhanced Reliability",
                    d: "Demonstrate full compliance with recognised UK security standards to build trust and confidence with your clients.",
                  },
                  {
                    t: "Competitive Edge",
                    d: "Strengthen your market position and stand out when bidding for security contracts and high-value tenders.",
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-6">
                    <CheckCircle className="text-[#997819] flex-shrink-0 w-6 h-6" />
                    <div>
                      <h3 className="font-bold uppercase text-[#997819] text-sm mb-1">
                        {benefit.t}
                      </h3>
                      <p className="text-blue-100/50 text-sm leading-relaxed">
                        {benefit.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-black uppercase mb-6 tracking-tighter text-[#997819]">
                The BizGrow Impact
              </h3>
              <p className="text-blue-100/70 mb-8 leading-relaxed italic">
                "We support security companies throughout the certification
                journey, enhancing service quality and raising industry
                standards across the UK.”"
              </p>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-100/40">
                    Compliance Standards
                  </span>
                  <span className="text-xs uppercase font-bold text-white">
                    BS 7499 / BS 10800
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-100/40">
                    Market Focus
                  </span>
                  <span className="text-xs uppercase font-bold text-white">
                    UK Security Sector
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 WHY CHOOSE BIZGROW HOLDINGS SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle Gold accent in background */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#997819]/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Side: Image/Visual Element */}
            <div className="w-full lg:w-5/12">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#12066a]/5 rounded-[3rem] -rotate-3" />
                  <div className="relative rounded-[3rem] overflow-hidden border-4 border-zinc-50 shadow-2xl aspect-[4/5]">
                    <Image
                      src="/why-choose-holdings.jpg"
                      alt="Why Choose BizGrow Holdings"
                      fill
                      className="object-cover"
                    />
                    {/* Floating Badge */}
                    <div className="absolute bottom-10 right-10 bg-[#997819] p-6 rounded-2xl shadow-xl">
                      <p className="text-white font-black text-center uppercase tracking-tighter text-sm leading-tight">
                        Trusted <br /> Consultancy
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Side: Exact Content Provided by You */}
            <div className="w-full lg:w-7/12">
              <FadeIn direction="left" delay={0.2}>
                <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                  The Strategic Choice
                </span>
                <h2 className="text-[#12066a] text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-10 italic">
                  Why Choose <br />
                  <span className="text-[#997819]">BizGrow Holdings.</span>
                </h2>

                <div className="space-y-8">
                  <p className="text-zinc-700 text-xl md:text-2xl font-bold leading-relaxed italic border-l-8 border-[#997819] pl-8">
                    BizGrow Holdings stands out as a trusted compliance
                    consultancy for UK security companies, offering
                    industry-specific expertise and a results-driven approach.
                  </p>

                  <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-medium">
                    We combine in-depth knowledge of regulatory standards with
                    practical implementation strategies to deliver measurable
                    outcomes.
                  </p>

                  <div className="p-10 rounded-[2.5rem] bg-zinc-50 border border-[#997819] relative group">
                    <p className="text-zinc-600 text-lg leading-relaxed relative z-10 font-medium">
                      Our client-focused methodology, proven track record, and
                      commitment to ongoing support ensure your business not
                      only achieves compliance but also gains a competitive
                      advantage in the market.
                    </p>
                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-10 right-10 h-1 bg-[#997819] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 FINAL CALL TO ACTION */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black text-[#12066a] uppercase tracking-tighter mb-10 leading-none">
            Ready to Achieve <br />{" "}
            <span className="text-[#997819]">Excellence?</span>
          </h2>
          <Link href="/contact-us">
            <button className="bg-[#12066a] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#997819] transition-all duration-300 shadow-2xl">
              Partner with BizGrow Holdings →
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ComplianceConsultancyPage;

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  Target,
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileCheck,
  Scale,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Our Mission | Supporting Compliance & Business Growth UK",
  description:
    "Helping businesses achieve compliance, certifications & sustainable growth with expert guidance from BizGrow Holdings.",
};

const MissionPage = () => {
  return (
    <main className="bg-white text-zinc-900">
      {/* 🔹 1. HERO SECTION (Premium Background with Light Overlay) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/our-mission.webp"
            alt="Our Mission - BizGrow Holdings ltd uk "
            fill
            className="object-cover"
            priority
          />
          {/* Slightly lighter overlay for better transition to white bg */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <FadeIn direction="up" duration={1}>
            <span className="text-[12rem] md:text-[18rem] font-black text-white/5 leading-none uppercase">
              Mission
            </span>
          </FadeIn>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="max-w-4xl">
            <FadeIn direction="right" delay={0.2}>
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                Strategy & COMPLIANCE
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <h1 className="text-4xl md:text-6xl font-black text-white mt-6 leading-[1.1]">
                Our Commitment to <br />
                <span className="text-[#997819]">Strengthen</span> UK Standards
              </h1>
            </FadeIn>

            <FadeIn direction="right" delay={0.6}>
              <p className="mt-8 text-blue-100/90 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium">
                BizGrow Holdings empowers UK businesses to meet{" "}
                <Link
                  href="https://bizgrow-holdings.com/our-services/iso-9001/"
                  className="text-[#997819] font-bold"
                >
                  ISO standards
                </Link>
                , achieve{" "}
                <Link
                  href="https://bizgrow-holdings.com/our-services/sia-acs"
                  className="text-[#997819] font-bold mr-1"
                >
                  SIA ACS
                </Link>
                accreditation, and implement audit-ready management systems,
                turning regulations into strategic advantages.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.8}>
              <div className="mt-10 w-24 h-1.5 bg-[#997819] rounded-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. CORE PHILOSOPHY (Clean White Section - Updated for Mobile Reverse) */}
      <section className="py-22 px-6 bg-white">
        {/* Flex layout added: flex-col-reverse for mobile, lg:flex-row for desktop */}
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-20 items-center">
          {/* 🔹 Left Side: Professional Image (Moves to bottom on mobile) */}
          <FadeIn direction="left" className="w-full lg:w-1/2">
            <div className="relative group">
              {/* Decorative Gold Frame */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-[#997819] rounded-tl-[3rem] z-10"></div>

              {/* Image Container */}
              <div className="relative aspect-square md:aspect-[4/5] bg-zinc-100 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-200">
                <Image
                  src="/the core.jpg"
                  alt="Business consultant leading compliance in the UK"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-[#12066a]/10 group-hover:bg-transparent transition-colors duration-500"></div>

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-[#997819] p-6 rounded-2xl text-white shadow-xl z-20">
                  <Target size={30} className="mb-2" />
                  <p className="text-xs uppercase font-black tracking-widest">
                    Growth Focused
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 🔹 Right Side: Text Content (Stays on top on mobile) */}
          <div className="w-full lg:w-1/2 space-y-8">
            <FadeIn direction="right">
              <h2 className="text-[#997819] font-bold text-sm tracking-widest uppercase italic">
                01. The Core
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-[#12066a] mt-1 tracking-tighter italic leading-[1.1]">
                All-in-One Business Solutions for Security Companies
              </h3>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="text-black text-lg leading-relaxed font-medium space-y-4">
                <p>
                  <Link
                    href="https://bizgrow-holdings.com/about-us/"
                    className="text-[#997819] font-bold"
                  >
                    BizGrow Holdings
                  </Link>{" "}
                  is simply focused on your security business getting its
                  targets and growing with confidence. Whether it’s quality
                  management systems, compliance strategies, staff development,
                  or digital solutions, we ensure every step supports your
                  business success.
                </p>
                <p>
                  <b>
                    We help{" "}
                    <Link
                      href="https://bizgrow-holdings.com/how-to-start-a-security-company-in-the-uk/"
                      className="text-[#997819] font-bold"
                    >
                      security businesses
                    </Link>{" "}
                    to:
                  </b>
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <ul className="space-y-4">
                {[
                  <>
                    Build and implement{" "}
                    <Link
                      href="https://bizgrow-holdings.com/qms-software/"
                      className="text-[#997819] font-bold"
                    >
                      Quality Management Systems
                    </Link>
                  </>,
                  "Increase operational efficiency and cut wasted resources",
                  <>
                    Secure more contracts by meeting
                    <Link
                      href="https://bizgrow-holdings.com/compliance-consultancies/"
                      className="text-[#997819] font-bold -mx-1"
                    >
                      compliance
                    </Link>{" "}
                    standards
                  </>,
                  "Train leadership to be strategic in their growth and compliance",
                  "Stay competitive with systems designed for future requirements",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[#12066a] font-bold"
                  >
                    <CheckCircle2
                      className="text-[#997819] shrink-0"
                      size={20}
                    />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="up" delay={0.5}>
              <p className="text-zinc-700 font-medium">
                Your success is our success. With{" "}
                <b className="text-[#12066a]"><Link href="https://bizgrow-holdings.com/">BizGrow Holdings</Link></b>, your
                business is always on the right path, compliant, efficient, and
                ready to grow.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 3. VISION & PILLARS (Light Grey Soft Background) */}
      <section className="py-12 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-24">
              <h2 className="text-[#997819] font-black tracking-[0.3em] uppercase text-sm mb-4">
                02. Strategic Vision
              </h2>
              <h3 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tight">
                Shaping the Future of Compliance
              </h3>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Scale size={40} strokeWidth={1.5} />,
                title: "Industry Authority",
                desc: "Establishing a benchmark for excellence in compliance consultancy across the UK’s security and construction sectors.",
              },
              {
                icon: <FileCheck size={40} strokeWidth={1.5} />,
                title: "Governance & Integrity",
                desc: "Embedding transparent, risk-based management systems that enhance operational control and long-term credibility.",
              },
              {
                icon: <Cpu size={40} strokeWidth={1.5} />,
                title: "Innovation in Certification",
                desc: <>Modernising the <Link href="https://bizgrow-holdings.com/our-services/iso-14001/" className="text-[#997819] font-bold">ISO</Link> and accreditation journey through structured processes that drive efficiency, clarity, and measurable results.</>,
              },
            ].map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.2}>
                <div className="p-12 bg-white border border-zinc-200 rounded-[3rem] hover:shadow-2xl hover:border-[#997819] transition-all duration-500 group h-full">
                  {/* 🔹 Yahan hai wo 360 Rotating Animation */}
                  <div className="text-[#12066a] mb-8 inline-block p-4 bg-zinc-50 rounded-2xl group-hover:bg-[#997819] group-hover:text-white group-hover:rotate-[360deg] duration-700 transition-all ease-in-out">
                    {item.icon}
                  </div>

                  <h4 className="text-2xl font-black text-zinc-900 mb-4 tracking-tighter">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. IMPACT STATEMENT (Call to Action) */}
      <section className="py-22 text-center relative bg-white overflow-hidden">
        {/* Large Background Watermark Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
          <h2 className="text-[10rem] md:text-[16rem] font-black uppercase">
            BizGrow
          </h2>
        </div>

        <FadeIn direction="up">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-6xl font-black text-[#12066a] mb-8 italic tracking-tighter">
              "Where Standards Meet{" "}
              <span className="text-[#997819]">Strategic Growth .</span>"
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Join BizGrow Holdings in elevating your organisation through
              expert ISO implementation, industry accreditation, and structured
              governance support tailored for UK markets.
            </p>
            <button className="px-12 py-5 bg-[#12066a] text-white font-black uppercase tracking-widest hover:bg-[#997819] hover:scale-105 duration-500 transition-all rounded-2xl flex items-center gap-3 mx-auto shadow-xl">
              <Link href="https://bizgrow-holdings.com/contact-us/">Connect With Our Team</Link> <ArrowRight size={20} />
            </button>
          </div>
        </FadeIn>
      </section>
    </main>
  );
};

export default MissionPage;

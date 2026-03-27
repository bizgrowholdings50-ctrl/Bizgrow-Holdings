import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Target,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export const metadata = {
  title: "About Us | BizGrow Holdings Ltd, UK Experts",
  description:
    "BizGrow Holdings, UK experts in compliance and certification, supports security businesses to achieve trusted industry standards.",
};

export default function AboutUs() {
  return (
    <main className="bg-white">
      {/* 🔹 1. HERO SECTION (Consistent Signature Style) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* 🔹 Step 1: Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.webp" // About page ki specific corporate image
            alt="About BizGrow Holdings ltd Uk"
            fill
            className="object-cover"
            priority
          />
          {/* Black Overlay Effect for Text Readability */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
        </div>

        {/* 🔹 Step 2: Large Watermark Text (Middle Layer) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <h2 className="text-[12rem] md:text-[20rem] font-black text-white/[0.08] leading-none uppercase tracking-tighter">
            ABOUT
          </h2>
        </div>

        {/* 🔹 Step 3: Actual Content (Top Layer) */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] mt-20 text-xs md:text-sm">
                Who We Are
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-3xl md:text-6xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                UK's Leading Compliance & <br />
                <span className="text-[#997819]">Certification </span> Experts
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-8 text-blue-100/80 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium">
                BizGrow Holdings is a UK-based compliance consultancy business
                helping organisations achieve ISO certification, security
                accreditation, and construction compliance standards, while
                offering governance and growth systems.
              </p>
            </FadeIn>

            {/* Signature Decor Line */}
            <FadeIn direction="right" duration="1.0">
              <div className="mt-12 w-32 h-2 bg-[#997819] rounded-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. THE VISION - Image + Text Content (Updated for Mobile Reverse) */}
      <section className="py-24 px-6 relative z-10 bg-white">
        {/* Flex layout added: flex-col-reverse for mobile, lg:flex-row for desktop */}
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center">
          {/* Image Section (Will move to bottom on mobile) */}
          <FadeIn direction="left" className="relative w-full lg:w-1/2">
            <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/expert-about.jpg"
                alt="UK compliance consultancy services | BizGrow Holdings ltd"
                fill
                className="object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-10 right-10 bg-[#997819] p-8 rounded-[2rem] text-white hidden md:block shadow-xl z-10">
              <div className="text-4xl font-black">10+</div>
              <div className="text-xs uppercase font-bold tracking-widest">
                Years Experience
              </div>
            </div>
          </FadeIn>

          {/* Content Section (Will stay on top on mobile) */}
          <FadeIn direction="right" className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-black text-[#12066a] leading-tight">
              Compliance Expertise for a
              <span className="text-[#997819]"> Regulated UK Market.</span>
            </h2>
            <div className="mt-8 space-y-6 text-zinc-600 leading-relaxed font-medium">
              <p>
                BizGrow Holdings is a trusted UK compliance consultancy
                supporting security companies and construction businesses
                pursuing SIA ACS accreditation and ISO certifications. We don’t
                offer generic checklists. We build structured, audit-ready
                management systems that embed compliance into your core
                operations, turning regulatory requirements into a strategic
                advantage for sustainable growth.
              </p>

              <ul className="space-y-4 pt-1">
                {[
                  "Specialist SIA ACS audit preparation & advisory",
                  "ISO 9001, 14001 & 45001 implementation support",
                  "Structured compliance systems & documentation",
                  "Ongoing governance, training & audit readiness",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#12066a] font-bold"
                  >
                    <CheckCircle2 className="text-[#997819]" size={20} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. CORE VALUES - Trust Builders */}
      <section className="py-14 bg-zinc-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#12066a]">
              Our Core Values That{" "}
              <span className="text-[#997819]">Define Us</span>
            </h2>
          </div>
   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    {
      title: "Transparency and Trust",
      desc: "We function with transparency and integrity to create strong relationships with clients based on trust and reliability.",
      icon: <ShieldCheck size={28} />,
    },
    {
      title: "Strategic Planning",
      desc: "We implement customised management systems for operational excellence and sustainable growth.",
      icon: <Target size={28} />,
    },
    {
      title: "Client Centric",
      desc: "We tailor our approach to meet your business needs, ensuring satisfaction and evidence-based results.",
      icon: <Award size={28} />,
    },
  ].map((val, i) => (
    <FadeIn
      key={i}
      delay={i * 0.2}
      className="relative group p-10 rounded-[2rem] shadow-sm border border-zinc-100 overflow-hidden transition-all duration-500 cursor-pointer"
    >
      {/* 🟦 Background Sliding Layer (Left to Right) */}
      <div className="absolute inset-0 bg-[#12066a] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />

      {/* Card Content (z-10 to stay above the sliding bg) */}
      <div className="relative z-10">
        {/* Icon Container - Turns Gold on Hover */}
        <div className="w-14 h-14 bg-[#12066a] group-hover:bg-[#997819] text-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500">
          {val.icon}
        </div>

        {/* Title - Turns White on Hover */}
        <h3 className="text-xl font-black text-zinc-900 group-hover:text-white mb-4 transition-colors duration-500 uppercase tracking-tight">
          {val.title}
        </h3>

        {/* Description - Turns Light Blue/White on Hover */}
        <p className="text-zinc-500 group-hover:text-blue-100/70 text-sm leading-relaxed transition-colors duration-500 font-medium">
          {val.desc}
        </p>
      </div>
    </FadeIn>
  ))}
</div>
        </div>
      </section>

      {/* 4. MISSION & VISION - Double Card */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn
            direction="left"
            className="bg-[#12066a] p-12 md:p-16 rounded-[3rem] text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-[#997819] font-black uppercase tracking-widest text-xs mb-6">
                Our Mission
              </h3>
              <p className="text-md md:text-2xl font-bold leading-relaxed">
                "To deliver clear, structured, and practical compliance
                consultancy that enables UK businesses to achieve ISO
                certifications, industry accreditations, and long-term
                regulatory confidence, turning complex standards into
                sustainable growth systems."
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-white/[0.03]">
              M
            </div>
          </FadeIn>
          <FadeIn
            direction="right"
            className="bg-zinc-100 p-12 md:p-16 rounded-[3rem] text-[#12066a] relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-[#997819] font-black uppercase tracking-widest text-xs mb-6">
                Our Vision
              </h3>
              <p className="text-md md:text-2xl font-bold leading-relaxed text-zinc-800">
                "To become the UK’s most trusted compliance consultancy partner,
                recognised for transforming regulatory requirements into
                strategic advantages that strengthen credibility, performance,
                and competitive positioning."
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-black/[0.03]">
              V
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 5 CTA Section with Fixed Background Attachment */}
      <section className="py-14 px-6 relative overflow-hidden group">
        
          <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden shadow-2xl ">
            {/* --- FIXED BACKGROUND IMAGE --- */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: "url('/about-cta.jpg')", // Aapki background image ka path
              }}
            >
              {/* Dark Overlay to make text pop */}
              <div className="absolute inset-0 bg-[#12066a]/65 mix-blend-multiply" />
              <div className="absolute inset-0 bg-linear-to-br from-[#12066a] via-transparent to-[#997819]/20" />
            </div>

            <div className="relative z-10 p-10 md:p-20">
              {/* 🔹 Large Watermark Text */}
              <div className="absolute top-0 -right-6 md:right-0 text-[4rem] md:text-[15rem] font-black text-white/[0.05] select-none leading-none -translate-x-7 translate-y-6 pointer-events-none uppercase">
                BIZGROW
              </div>

              {/* Floating Decor Circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#997819]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-20 flex flex-col  items-center justify-between gap-12">
                <div className="text-center lg:text-left max-w-3xl">
                  <h2 className="text-4xl md:text-6xl text-center font-black text-white leading-tight uppercase tracking-tighter">
                    Ready to Secure Your
                    <span className="text-[#997819] block">
                      {" "}
                      Business Standards?
                    </span>
                  </h2>
                  <p className="text-blue-100/70 text-center mt-8 text-md md:text-xl font-medium leading-relaxed italic">
                    "Our experts deliver structured compliance solutions
                    tailored to UK regulatory requirements. Partner with BizGrow
                    Holdings to turn compliance into lasting strength."
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto shrink-0">
                  <button className="bg-[#997819] text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:bg-white hover:text-[#12066a] transition-all duration-700 shadow-2xl group">
                    Book Free Consultation
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>

                  <a
                    href="tel:+447898205035"
                    className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:bg-white/20 transition-all duration-500"
                  >
                    <PhoneCall size={18} className="text-[#997819]" /> +44
                    7898205035
                  </a>
                </div>
              </div>
            </div>
          </div>
       
      </section>
    </main>
  );
}

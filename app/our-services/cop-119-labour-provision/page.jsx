import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Users,
  FileCheck,
  Gavel,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "COP119 Compliance | BizGrow Holdings Ltd UK Experts",
  description:
    "BizGrow Holdings Ltd provides expert COP119 compliance support, documentation & audit guidance to confidently meet UK standards.",
};

const COP119Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (Consistent Signature Style) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Step 1: Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cop119-hero.jpg" // Labour supply or recruitment themed image
            alt="COP-119 Compliance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Step 2: Large Watermark Text (Middle Layer) */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[12rem] md:text-[20rem] font-black text-white/[0.05] leading-none uppercase tracking-tighter">
            COP119
          </span>
        </div>

        {/* Step 3: Actual Content (Top Layer) */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                Labour Provision Standards
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-4xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                COP-119 <br />
                <span className="text-[#997819]">Labour Supply</span> Code
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-8 text-blue-100/80 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium">
                The essential Code of Practice for{" "}
                <Link
                  href="https://bizgrow-holdings.com/security-companies-are-considered-the-safest-choice/"
                  className="text-[#997819] font-bold mr-1"
                >
                  UK security companies
                </Link>
                supplying labour, ensuring transparency, ethical recruitment,
                and full regulatory compliance.
              </p>
            </FadeIn>

            {/* Signature Decor Line */}
            <FadeIn direction="right" duration="1.0">
              <div className="mt-12 w-32 h-2 bg-[#997819] rounded-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. THE CORE OF COP-119 (Depth Content) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                Who Needs
                <span className="text-[#997819]"> COP119 Compliance?</span>
              </h2>
              <div className="space-y-6 text-zinc-500 text-lg leading-relaxed font-medium">
                <p>
                  COP119 compliance is essential for UK security companies that
                  provide manned guarding services, including static guarding,
                  mobile patrols, key holding, and site security. Any
                  organisation applying for or maintaining{" "}
                  <Link
                    href="https://bizgrow-holdings.com/get-acs-accreditation-fast/"
                    className="text-[#997819] font-bold"
                  >
                    ACS (Approved Contractor Scheme)
                  </Link>{" "}
                  status is expected to align with COP119 operational standards.
                  It ensures your business meets structured requirements for
                  recruitment, screening, training, deployment, and supervision
                  of security personnel.
                </p>
                <p>
                  <Link
                    href="https://bizgrow-holdings.com/cop119-compliance-guide-for-uk-security-businesses-requirements-and-benefits/"
                    className="text-[#997819] font-bold"
                  >
                    COP119
                  </Link>{" "}
                  is especially important for security companies bidding for
                  commercial and public-sector contracts where operational
                  standards are closely reviewed. It strengthens audit
                  performance and builds client confidence. For a growing
                  business, it provides a clear structure to support credibility
                  and long-term contract success.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="p-10 bg-[#12066a] rounded-[3rem] border border-zinc-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-[#997819] opacity-10">
                  <Gavel size={120} />
                </div>
                <h3 className="text-2xl font-black text-white mb-6">
                  COP 119 Key Requirements:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Structured recruitment and vetting procedures for security personnel",
                    "Clear training and competency management systems",
                    "Operational control and site supervision processes",
                    "Incident reporting and complaints management procedures",
                    "Ongoing performance monitoring and continuous improvement systems",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-white font-bold"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#997819] mt-1 shrink-0"
                      />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 3. TECHNICAL PILLARS SECTION WITH PARALLAX & GLASS CARDS */}
      <section className="relative py-32 overflow-hidden">
        {/* 🖼️ 1. Section Background Parallax Layer */}
        <div
          className="absolute inset-0 z-0 bg-[#12066a] bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: "url('/secure.jpg')", // Change to your background image path
            backgroundAttachment: "fixed", // 👈 Magic for parallax
          }}
        />

        {/* Dark Overlay to match your screenshot style */}
        <div className="absolute inset-0 bg-[#12066a]/80 z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-[#997819] uppercase">
                COP 119 Compliance Pillars
              </h2>
              <p className="text-zinc-300 max-w-2xl mx-auto font-medium">
                Operational standards that ensure professionalism,
                accountability, and service quality within{" "}
                <Link
                  href="https://bizgrow-holdings.com/how-to-start-a-security-company-in-the-uk/"
                  className="text-[#997819] font-bold"
                >
                  UK security companies.
                </Link>
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                t: "Workforce Screening & Vetting",
                d: "Ensures all security personnel are properly screened, verified, and legally compliant before deployment.",
                icon: <Users size={40} />,
              },
              {
                t: "Operational Control & Supervision",
                d: "Maintains structured management, clear reporting lines, and effective supervision of security operations.",
                icon: <FileCheck size={40} />,
              },
              {
                t: "Training & Competency Management",
                d: "Confirms officers are properly trained, competent, and continuously monitored to meet required industry standards.",
                icon: <ShieldCheck size={40} />,
              },
            ].map((pillar, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.2}>
                {/* 🟦 Glassmorphism Card Logic */}
                <div className="relative group p-10 h-full rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 cursor-pointer shadow-2xl">
                  {/* Background Sliding Layer (Left to Right) */}
                  <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out z-0" />

                  {/* Content Layer (z-10) */}
                  <div className="relative z-10">
                    {/* Icon - Turns Gold or Blue on Hover */}
                    <div className="text-[#997819] mb-8 group-hover:text-[#12066a] group-hover:scale-110 transition-all duration-500">
                      {pillar.icon}
                    </div>

                    {/* Title - Turns Navy on Hover */}
                    <h3 className="text-2xl text-white font-black mb-4 tracking-tight group-hover:text-[#12066a] transition-colors duration-500 uppercase">
                      {pillar.t}
                    </h3>

                    {/* Description - Turns Dark Zinc on Hover */}
                    <p className="text-zinc-300 font-medium leading-relaxed group-hover:text-zinc-600 transition-colors duration-500">
                      {pillar.d}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* 🔹 3.5 BENEFITS OF COP119 (Added before CTA) */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        {/* Background Decorative Watermark */}
        <div className="absolute top-0 right-0 p-20 text-[#12066a]/5 pointer-events-none">
          <ShieldCheck size={400} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side: Context */}
            <FadeIn direction="right">
              <div>
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                  Strategic Growth
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none mb-8">
                  Benefits of <br />
                  <span className="text-[#997819]">COP119 Compliance</span>
                </h2>
                <div className="space-y-6 text-zinc-600 font-medium text-lg leading-relaxed">
                  <p>
                    <Link
                      href="https://bizgrow-holdings.com/cop-119-helps-security-businesses-maintain-high-standards/"
                      className="text-[#997819] font-bold"
                    >
                      COP119
                    </Link>{" "}
                    provides a structured operational framework that strengthens
                    professionalism across UK security businesses. It aligns
                    recruitment, supervision, and service delivery with
                    recognised industry standards.
                  </p>
                  <p className="border-l-4 border-[#997819] pl-6 italic bg-white py-4 rounded-r-2xl shadow-sm">
                    "For growing security companies, COP119 is not just a
                    requirement; it’s a strategic tool that supports long-term
                    contract success and reputation."
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Right Side: Key Benefits List */}
            <FadeIn direction="left" delay={0.2}>
              <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-xl border border-zinc-100">
                <h3 className="text-xl font-black text-[#12066a] uppercase tracking-widest mb-10 flex items-center gap-3">
                  <div className="w-8 h-1 bg-[#997819] rounded-full" />
                  Key Advantages
                </h3>

                <ul className="grid gap-6">
                  {[
                    {
                      t: "Audit Performance",
                      d: (
                        <>
                          Improved audit performance and{" "}
                          <Link
                            href="https://bizgrow-holdings.com/acs-accreditation-for-security-businesses/"
                            className="text-[#997819] font-bold"
                          >
                            ACS
                          </Link>{" "}
                          scoring.
                        </>
                      ),
                    },
                    {
                      t: "Client Confidence",
                      d: "Stronger client confidence in operational control.",
                    },
                    {
                      t: "Accountability",
                      d: "Clear management structure and accountability.",
                    },
                    {
                      t: "Risk Reduction",
                      d: "Reduced compliance risks and operational errors.",
                    },
                    {
                      t: "Contract Eligibility",
                      d: "Greater eligibility for commercial and public-sector contracts.",
                    },
                  ].map((benefit, idx) => (
                    <li key={idx} className="group flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-[#997819] group-hover:bg-[#12066a] group-hover:text-white transition-all duration-500 shadow-sm border border-zinc-100">
                        <CheckCircle2 size={20} />
                      </div>
                      <div className="pt-1">
                        <span className="block font-black text-[#12066a] text-sm uppercase tracking-tight mb-1 group-hover:text-[#997819] transition-colors">
                          {benefit.t}
                        </span>
                        <p className="text-zinc-500 font-medium text-sm leading-snug">
                          {benefit.d}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* 🔹 4. PREMIUM CTA SECTION (With BG Image Support) */}
      <section className="py-24 bg-white px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter">
              Ready to Achieve{" "}
              <span className="text-[#997819]">COP119 Compliance?</span>
            </h2>
            <p className="mt-4 text-zinc-500 font-medium italic">
              Take the first step towards professional excellence and unlock new
              contract opportunities with COP119.
            </p>
          </div>

          <div
            className="p-12 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden group shadow-2xl bg-[#12066a]"
            style={{
              backgroundImage: 'url("/10-ways-bg.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", // 👈 Yeh vertical parallax create karega bina scale kiye
            }}
          >
            {/* Dark Overlay to maintain consistency and readability */}
            {/* Opacity ko 0.9 se 0.70 kiya hai taake parallax image thodi behtar nazar aaye */}
            <div className="absolute inset-0 bg-[#12066a]/70 z-0" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black mb-8 tracking-tighter uppercase">
                Ensure your security business is fully compliant, trusted, and
                audit-ready.
              </h3>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact-us"
                  className="relative group/btn overflow-hidden inline-flex items-center justify-center px-12 py-6 bg-[#997819] text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all duration-500 shadow-2xl active:scale-95"
                >
                  {/* Layer 1: The Text (Top Layer) */}
                  <span className="relative z-40 transition-colors duration-500 group-hover/btn:text-[#12066a]">
                    Get Started Today
                  </span>

                  {/* Layer 2: The Animated Background (Middle Layer) */}
                  <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
                </Link>
                <Link href="https://bizgrow-holdings.com/category/cop-119/">
                  <button className="px-12 py-6 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all active:scale-95">
                    Learn More
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

export default COP119Page;

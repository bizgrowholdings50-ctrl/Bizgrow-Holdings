import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  Globe,
  BarChart3,
  Search,
  Zap,
  MousePointerClick,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Target,
  FileSearch,
  ArrowUpRight,
  Rocket,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "UK Private Security Directory | Trusted & Verified Companies",
  description:
    "UK Private Security Directory to find trusted, compliant companies offering guarding, patrols, events & CCTV services..",
};

const MarketingSolutionsPage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* 🔹 1. HERO SECTION (Dynamic & Bold) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#12066a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/private-security-hero.jpg"
            alt="Digital Growth"
            fill
            className="object-cover opacity-40 transition-transform duration-[10s] hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12066a]/80 via-transparent to-[#12066a]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <FadeIn direction="right">
            <div className="inline-flex items-center gap-3 bg-[#997819]/20 border border-[#997819]/30 px-4 py-2 rounded-full mb-8">
              <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-[10px]">
                TRUSTED SECURITY NETWORK
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase">
              UK’S PRIVATE <br />
              <span className="text-[#997819]">SECURITY DIRECTORY.</span>
            </h1>
            <p className="mt-10 text-blue-100/60 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
              Find trusted and compliant{" "}
              <Link
                href="https://bizgrow-holdings.com/our-services/private-security-startup/"
                className="text-[#997819] font-bold"
              >
                private security
              </Link>{" "}
              companies across the UK. Connect with professional providers
              offering manned guarding, event security, and specialised security
              services.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. STRATEGIC OVERVIEW (Content-Heavy Split Layout) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-zinc-100 rounded-[4rem] -rotate-2" />
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700">
                <Image
                  src="/strategy-meeting.webp"
                  width={600}
                  height={750}
                  alt="UK’s Private Security Directory - BizGrow Holdings Ltd"
                  className="object-cover h-[650px]"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6 block">
                OUR DIRECTORY
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-tight mb-8">
                UK’s Private <br />
                <span className="text-[#997819]">Security Directory.</span>
              </h2>
              <p className="text-black font-black text-lg mb-10 leading-relaxed">
                Find Trusted Security Companies Across the UK
              </p>
              <div className="space-y-8">
                {[
                  {
                    d: (
                      <>
                        The UK’s Private Security Directory by{" "}
                        <Link href="/" className="text-[#997819] font-bold">
                          BizGrow Holdings
                        </Link>{" "}
                        is a dedicated platform designed to connect businesses,
                        organisations, and individuals with trusted and
                        compliant private security companies across the United
                        Kingdom.
                      </>
                    ),
                  },
                  {
                    d: (
                      <>
                        Our directory features{" "}
                        <Link
                          href="https://bizgrow-holdings.com/security-companies-are-considered-the-safest-choice/"
                          className="text-[#997819] font-bold"
                        >
                          security companies
                        </Link>{" "}
                        that are committed to maintaining professional
                        standards, regulatory compliance, and operational
                        excellence within the private security industry.
                      </>
                    ),
                  },
                  {
                    d: "Whether you are looking for manned guarding, event security, mobile patrols, CCTV monitoring, or specialised security services, our directory helps you easily find reliable providers.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="shrink-0 w-2 h-2 rounded-full bg-[#997819] mt-3 group-hover:scale-150 transition-transform" />
                    <div>
                      <h3 className="font-black text-[#12066a] text-lg uppercase">
                        {item.t}
                      </h3>
                      <p className="text-zinc-500 font-medium">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. ROI METRICS (Dark Dashboard Style) */}
      <section className="py-24 bg-[#12066a] mx-6 rounded-[4rem] my-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { n: "100+", t: "SECURITY COMPANIES" },
              { n: "UK WIDE", t: "SERVICE COVERAGE" },
              { n: "VERIFIED", t: "INDUSTRY PROFESSIONALS" },
              { n: "TRUSTED", t: "SECURITY NETWORK" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center md:text-left border-l border-white/10 pl-8"
              >
                <h3 className="text-5xl font-black text-white tracking-tighter mb-2">
                  {stat.n}
                </h3>
                <p className="text-[#997819] font-black uppercase tracking-widest text-[10px]">
                  {stat.t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. DETAILED SOLUTIONS (Interactive List Style) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-[0.9] uppercase mb-6">
                Why Use the UK’s <br />
                <span className="text-[#997819]">
                  Private Security Directory
                </span>{" "}
                ?
              </h2>
              <p className="mb-3">
                Finding the right security provider can be challenging. Our
                directory simplifies this process by bringing together verified
                and professional{" "}
                <Link
                  href="https://bizgrow-holdings.com/how-to-start-a-security-company-in-the-uk/"
                  className="text-[#997819] font-bold"
                >
                  security companies
                </Link>{" "}
                in one place.
              </p>
              <p className="text-black mb-3 text-xl font-bold">
                Key benefits include:
              </p>
              <div className="space-y-6">
                {[
                  {
                    d: "Access to reputable security companies across the UK",
                  },
                  {
                    d: "View company services, expertise, and capabilities",
                  },
                  {
                    d: (
                      <>
                        Discover businesses working towards industry{" "}
                        <Link
                          href="https://bizgrow-holdings.com/compliance-consultancies/"
                          className="text-[#997819] font-bold"
                        >
                          compliance
                        </Link>
                      </>
                    ),
                  },
                  {
                    d: "Save time when searching for reliable security providers",
                  },
                  {
                    d: "Connect directly with security companies",
                  },
                ].map((service, i) => (
                  <FadeIn key={i} direction="up" delay={i * 0.1}>
                    <div key={i} className="flex gap-6 group">
                      <div className="shrink-0 w-2 h-2 rounded-full bg-[#997819] mt-3 group-hover:scale-150 transition-transform" />
                      <div>
                        <p className="text-zinc-700 font-medium">{service.d}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <div className="sticky top-32">
              <div className="bg-[#12066a] rounded-[4rem] p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="aspect-square bg-zinc-900 rounded-[3.5rem] overflow-hidden relative">
                  <Image
                    src="/private-directory.jpg"
                    fill
                    className="object-cover opacity-60"
                    alt="Why Use the UK’s Private Security Directory - BizGrow"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-[#997819]/90 rounded-full flex items-center justify-center border-4 border-white/20 animate-pulse">
                      <Rocket className="text-white" size={48} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. CORE PILLARS (3-Column Vertical Layout) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-[#12066a] uppercase">
              The Pillars of TRUST
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                t: "VERIFIED COMPANIES",
                d: (
                  <>
                    We showcase private{" "}
                    <Link
                      href="https://bizgrow-holdings.com/top-security-companies-trusted-protection-for-every-business/"
                      className="text-[#997819] font-bold"
                    >
                      security companies
                    </Link>{" "}
                    that are committed to professional standards, industry
                    compliance, and reliable security services across the UK.
                  </>
                ),
                icon: <Globe />,
              },
              {
                t: "INDUSTRY CREDIBILITY",
                d: "Our directory highlights companies working towards recognised certifications and best practices within the private security sector.",
                icon: <ShieldCheck />,
              },
              {
                t: "CLIENT CONNECTION",
                d: "Helping businesses and individuals easily find trusted security providers for manned guarding, events, mobile patrols, and specialist services.",
                icon: <Target />,
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="text-center border border-[#12066a] rounded-3xl transition-transform hover:scale-105 duration-300 p-3"
              >
                <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#997819] group-hover:rotate-12 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black text-[#12066a] uppercase mb-4">
                  {pillar.t}
                </h3>
                <p className="text-zinc-500 font-medium leading-relaxed">
                  {pillar.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 6 NEW SECTION: KEY BENEFITS (Added after Pillars) */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                  Maximising Value
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-tight mb-8 uppercase">
                  Key Benefits of <br />
                  <span className="text-[#997819]">The Directory.</span>
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed mb-10 text-lg">
                  The UK’s Private Security Directory helps businesses and
                  individuals easily find reliable and professional security
                  service providers across the United Kingdom. It connects
                  clients with companies that are committed to industry
                  standards,{" "}
                  <Link
                    href="https://bizgrow-holdings.com/benefits-of-supply-chain-management-for-compliance/"
                    className="text-[#997819] font-bold"
                  >
                    compliance
                  </Link>
                  , and high-quality security services.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  t: "Easy Access to Trusted Companies",
                  d: "Quickly find professional security providers across the UK.",
                  icon: <Globe className="w-5 h-5" />,
                },
                {
                  t: "Improved Industry Visibility",
                  d: "Security companies can showcase their services to potential clients.",
                  icon: <TrendingUp className="w-5 h-5" />,
                },
                {
                  t: "Support for Compliance & Standards",
                  d: "Highlight businesses working towards recognised industry certifications.",
                  icon: <ShieldCheck className="w-5 h-5" />,
                },
                {
                  t: "Direct Client Connections",
                  d: "Helps organisations connect with suitable security providers faster.",
                  icon: <MousePointerClick className="w-5 h-5" />,
                },
              ].map((benefit, i) => (
                <FadeIn key={i} direction="left" delay={i * 0.1}>
                  <div className="bg-white p-8 rounded-3xl border border-zinc-200 flex items-start gap-6 hover:shadow-xl hover:shadow-zinc-200/50 transition-all group">
                    <div className="w-12 h-12 bg-[#12066a] text-[#997819] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-[#12066a] uppercase text-sm mb-2 tracking-tight">
                        {benefit.t}
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                        {benefit.d}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 7. INDUSTRY REACH (h3 in Map) */}
      <section className="py-24 bg-[#12066a] rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col justify-between items-center mb-16 gap-8">
            <h2 className="text-7xl text-center font-black text-white uppercase tracking-tighter">
              Industries We <br />
              <span className="text-[#997819]">SERVE.</span>
            </h2>
            <p className="text-blue-100/50 max-w-xl  text-center text-lg">
              Connecting businesses with trusted and compliant private{" "}
              <Link
                href="https://bizgrow-holdings.com/how-bizgrow-holdings-helps-security-companies-win-contracts-in-the-uk/"
                className="text-[#997819] font-bold"
              >
                security companies
              </Link>{" "}
              across the UK to ensure safety, reliability, and professional
              protection services.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "CORPORATE & COMMERCIAL",
              "CONSTRUCTION SITES",
              "RETAIL & SHOPPING CENTRES",
              "EVENTS & VENUES",
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-[#997819] transition-all duration-500 group"
              >
                <h3 className="text-white font-black uppercase text-sm tracking-widest">
                  {item}
                </h3>
                <ArrowUpRight className="text-white/20 mt-4 group-hover:translate-x-2 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 8. CALL TO ACTION (Premium Parallax Container) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="relative group overflow-hidden rounded-[3.5rem] p-10 md:p-24 shadow-2xl flex flex-col items-center text-center transition-all duration-700 hover:shadow-[#997819]/20"
            style={{
              backgroundImage: "url('/marketing-cta.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", // Standard Parallax Magic
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* 🔹 Overlays for Branding & Readability */}
            {/* Dark tint for contrast */}
            <div className="absolute inset-0 bg-[#0a0a0a]/50 mix-blend-multiply z-10" />
            {/* Corporate Blue Gradient - Holdings Theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12066a]/50 to-[#12066a] z-20" />

            <div className="relative z-30 w-full max-w-4xl flex flex-col items-center">
              <FadeIn direction="up">
                <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-10 backdrop-blur-sm">
                  Ready to Scale?
                </span>

                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
                  Get Listed <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#997819] to-[#d4af37] inline-block mt-2">
                    Today
                  </span>
                </h2>

                <p className="text-blue-100/70 text-lg md:text-xl max-w-xl mx-auto font-medium mb-12 leading-relaxed">
                  Join the UK’s Private Security Directory and become part of a
                  growing network of professional security companies across the
                  United Kingdom.
                </p>
              </FadeIn>

              <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
                <FadeIn direction="up" delay={0.2}>
                  <Link href="/contact-us">
                    <button className="relative group/btn overflow-hidden w-full sm:w-72 bg-[#997819] text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 shadow-lg">
                      <span className="relative z-40 group-hover/btn:text-[#12066a] transition-colors duration-500">
                        Contact us today
                      </span>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
                    </button>
                  </Link>
                </FadeIn>
              </div>
            </div>

            {/* Subtle Glow Element */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#997819]/20 rounded-full blur-[100px] z-20" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MarketingSolutionsPage;

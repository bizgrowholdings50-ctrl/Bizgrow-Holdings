import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Search,
  Eye,
  Lock,
  Award,
  UserCheck,
  Dog,
  TrendingUp,
  TrendingUpIcon,
} from "lucide-react";


export const metadata = {
  title: "NASDU Certification for UK Security Dog Companies",
  description:
    "Get NASDU certified with BizGrow Holdings. Meet UK security dog standards, improve credibility, win contracts & stay compliant.",
};  

const NASDUPage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* 🔹 1. HERO SECTION (Tactical & Authoritative) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Who.jpg"
            alt="Nasdu certification - BizGrow Holdings Ltd"
            fill
            className="object-cover opacity-50  transition-all duration-[2s]"
            priority
          />
          {/* Tactical Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg mb-8">
                <ShieldCheck className="text-[#997819]" size={16} />
                <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">
                  UK K9 SECURITY STANDARD
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                NASDU <br />
                <span className="text-[#997819] not-italic">
                  Accreditation.
                </span>
              </h1>

              <p className="mt-10 text-blue-100/60 text-xl md:text-1xl max-w-2xl font-medium leading-relaxed">
                BizGrow Holdings supports security companies in achieving NASDU
                accreditation for professional dog handling and K9 operations.
                We help implement the policies and procedures required for
                recognised industry compliance.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. OPERATIONAL FOCUS (Asymmetric Grid) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-[#12066a] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 leading-none">
                  Vigilance Beyond <br />{" "}
                  <span className="text-[#997819]">Human Limits.</span>
                </h2>
                <p className="max-w-xl text-zinc-400 font-medium text-lg leading-relaxed">
                  NASDU accreditation confirms that security dog handlers and K9
                  units operate in line with recognised UK standards for
                  detection, patrol, and operational safety.
                </p>
              </div>
              <Dog
                className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-[#997819]/10 transition-colors duration-700"
                size={400}
              />
            </div>
            <div className="lg:col-span-4 bg-[#997819] rounded-[3rem] p-12 flex flex-col justify-between text-white">
              <Eye size={40} className="text-white" />
              <div>
                <h3 className="text-3xl font-black leading-tight uppercase mb-4 italic text-white">
                  Real-Time <br /> Detection
                </h3>
                <p className="text-white/80 font-bold text-sm">
                  Certified K9 teams specialise in narcotics and explosives
                  detection, as well as security patrols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* 🚀 NEW SECTION: Why NASDU Certification is Essential */}
      <section className="py-14 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                The Strategic Advantage
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none uppercase italic">
                Why NASDU is <br />
                <span className="text-[#997819] not-italic">Essential.</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Trusted Industry Standards",
                desc: "NASDU sets strict codes of practice covering training, handling, and welfare. These ensure dogs are safely deployed and handlers meet UK security compliance.",
                icon: <Award size={32} />,
              },
              {
                title: "Professional Recognition",
                desc: "Demonstrate to clients, insurers, and regulators that you operate at the highest standards. Build trust and credibility in the UK security market.",
                icon: <ShieldCheck size={32} />,
              },
              {
                title: "Competitive Advantage",
                desc: "Gain a clear edge over unverified competitors. Attract high-value contracts by proving commitment to excellence and operational effectiveness.",
                icon: <TrendingUpIcon size={32} />, // TrendingUp import kar lijiyega lucide se
              },
            ].map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.2}>
                <div className="group h-full p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 hover:bg-[#12066a] transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#997819] group-hover:bg-[#997819] group-hover:text-white transition-all duration-500 mb-8">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#12066a] group-hover:text-white uppercase mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 group-hover:text-blue-100/60 font-medium text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* 🔹 3. CORE DISCIPLINES (Industrial List) */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-[#12066a] font-black uppercase tracking-[0.4em] text-xs mb-20">
            Operational Applications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                t: "Site & Asset Protection",
                d: "NASDU-certified K9 units support security operations protecting sites, facilities, and critical infrastructure.",
                icon: <Lock />,
              },
              {
                t: "Perimeter Security Patrols",
                d: "K9 units deployed to patrol sites and deter unauthorised access across construction sites, warehouses, and critical infrastructure.",
                icon: <Search />,
              },
              {
                t: "Explosive Detection Support",
                d: "K9 teams are used in high-risk environments to assist in explosive detection and threat prevention.",
                icon: <ShieldCheck />,
              },
              {
                t: "Event & Public Safety Patrols",
                d: "Professional dog-handling teams support crowd safety, event security, and high-visibility patrol duties.",
                icon: <UserCheck />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-zinc-100 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-[#997819] mb-6 group-hover:bg-[#12066a] transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-black text-[#12066a] uppercase text-lg mb-2">
                  {item.t}
                </h3>
                <p className="text-zinc-400 text-xs font-bold leading-relaxed">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. THE BLUEPRINT (Split Image & Stats) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-5xl md:text-5xl font-black text-[#12066a] tracking-tighter leading-tighter mb-4 uppercase">
              How NASDU Supports
              <span className="text-[#997819]"> UK Standards.</span>
            </h2>
            <p className="pb-4">
              NASDU certification complements other UK security regulations,
              helping businesses meet:
            </p>
            <div className="space-y-7">
              <div className="flex gap-6">
                <div className="shrink-0 w-10 h-10 mt-2 border-2 border-[#12066a] rounded-full flex items-center justify-center font-black">
                  01
                </div>
                <p className="text-zinc-500 font-medium pt-2 italic">
                  SIA Licences & ACS Accreditation are mandatory for security
                  companies and staff.
                </p>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-10 h-10 border-2 border-[#12066a] rounded-full flex items-center justify-center font-black">
                  02
                </div>
                <p className="text-zinc-500 font-medium pt-2 italic">
                  BS10800 Standards vetting, screening, and operational best
                  practices.
                </p>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-10 h-10 border-2 border-[#12066a] rounded-full flex items-center justify-center font-black">
                  03
                </div>
                <p className="text-zinc-500 font-medium pt-2 italic">
                  ISO Standards quality, environmental, and occupational health
                  and safety management.
                </p>
              </div>
              <p className="pb-4">
                Combining <b>NASDU membership</b> with these certifications
                ensures your business meets UK security sector standards.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[500px] w-full rounded-[4rem] overflow-hidden shadow-2xl">
            <Image
              src="/nasdu-discipline.jpg"
              fill
              className="object-cover"
              alt="NASDU Supports UK Security Standards"
            />
          </div>
        </div>
      </section>

      {/* 🔹 5. OUR PROCESS (Left-Aligned Refined Stepper) */}
      <section className="py-24 bg-[#12066a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-16 uppercase ">
                Accreditation <br />
                <span className="text-[#997819] not-italic text-4xl md:text-5xl">
                  Protocol .
                </span>
              </h2>
              <div className="space-y-12 relative">
                {[
                  {
                    t: "NASDU membership",
                    d: "Review of policies and procedures for NASDU compliance.",
                  },
                  {
                    t: "Handler & K9 Standards",
                    d: "Verification of compliance with K9 training and welfare standards.",
                  },
                  {
                    t: "Operational Evaluation",
                    d: "Review of K9 security procedures and protocols",
                  },
                  {
                    t: "Accreditation Approval",
                    d: "Successful organisations achieve NASDU accreditation for K9 security services",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-8 group relative z-10"
                  >
                    <div className="shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[#997819] font-black text-lg group-hover:bg-[#997819] group-hover:text-white transition-all duration-500">
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-2 border-b border-white/5 pb-8 group-hover:border-[#997819]/50 transition-colors">
                      <h3 className="font-black text-white uppercase text-base tracking-tight mb-2">
                        {step.t}
                      </h3>
                      <p className="text-blue-100/60 text-sm font-medium italic">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[3rem] p-10 relative overflow-hidden group border border-white/5 shadow-3xl">
              <div className="relative z-10">
                <Award className="text-[#997819] mb-6" size={50} />
                <h4 className="text-2xl text-black font-black mb-4">
                  Official Accreditation Support
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 italic">
                  BizGrow Holdings assists security companies with NASDU
                  accreditation by implementing the necessary documentation,
                  procedures, and compliance frameworks.
                </p>
                <div className="flex gap-2">
                  <div className="h-1 w-12 bg-[#997819]" />
                  <div className="h-1 w-12 bg-zinc-800" />
                  <div className="h-1 w-12 bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 6. CREDENTIALS (Minimalist Bar) */}
      <section className="py-24 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-16">
          {[
            "SIA Industry Aligned",
            "NASDU Operational Standards",
            "Professional K9 Handling Standards",
            "UK Welfare & Compliance Ready",
          ].map((badge, i) => (
            <span
              key={i}
              className="text-[#12066a] font-black uppercase tracking-[0.2em] text-[10px] italic"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* 🔹 7. CTA SECTION (Tactical Theme with Fixed Background) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="relative group overflow-hidden rounded-[3.5rem] p-10 md:p-24 shadow-2xl flex flex-col items-center text-center"
            style={{
              backgroundImage: "url('/nasdu-hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", // Ye line magic karegi
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* 🔹 Overlays for readability */}
            <div className="absolute inset-0 bg-[#0a0a0a]/40 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12066a]/40 to-[#12066a] z-20" />

            <div className="relative z-30 w-full max-w-4xl flex flex-col items-center">
              <FadeIn direction="up">
                <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-10">
                  Command Authority
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.85] mb-8 uppercase italic">
                 Get NASDU Certified with  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37] inline-block mt-2 not-italic">
                    BizGrow Holdings
                  </span>
                </h2>
              </FadeIn>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
                <FadeIn direction="up" delay={0.2}>
                  <button className="relative group/btn overflow-hidden w-full sm:w-64 bg-[#997819] text-white px-8 py-5 rounded-lg font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500">
                    <span className="relative z-40 group-hover/btn:text-[#12066a] transition-colors duration-500">
                      Contact Us
                    </span>
                    <div className="absolute inset-0 bg-white translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-30" />
                  </button>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NASDUPage;

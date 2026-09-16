import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import ServicesFaq from "@/components/ServicesFaq";
import {
  ShieldCheck,
  Users,
  FileCheck,
  Landmark,
  CheckCircle2,
  ArrowRight,
  CalendarDays,
  Layers,
  Clock,
  ListChecks,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "BS 10119 Compliance | BizGrow Holdings Ltd UK Experts",
  description:
    "BizGrow Holdings Ltd provides expert BS 10119 compliance support, documentation & audit guidance to confidently meet UK labour provision standards.",
};

const stats = [
  {
    icon: <Layers size={26} />,
    value: "Security + Events",
    label: "Applies when extra workers are hired for security or event roles",
  },
  {
    icon: <ListChecks size={26} />,
    value: "Criteria",
    label: "7 Key Area's assessors check under BS 10119",
  },
  {
    icon: <Clock size={26} />,
    value: "Prepration",
    label: "1 to 3 months typical preparation before assessment",
  },
];

const whoNeedsThis = [
  {
    t: "Labour providers supplying staff",
    icon: <Users size={30} />,
  },
  {
    t: "Companies using extra security staff",
    icon: <ShieldCheck size={30} />,
  },
  {
    t: "Businesses bidding for tenders",
    icon: <FileCheck size={30} />,
  },
];

const assessorChecks = [
  "Staff screening (background checks)",
  "SIA licence verification",
  "Right to work checks",
  "Training records",
  "PPE (personal protective equipment)",
  "Control over payroll and working hours",
  "Complete documentation and evidence",
];

const bs10119Data = [
  {
    q: "What is BS 10119?",
    a: "BS 10119 is a British Standard code of practice covering the provision of labour to the security and events sectors. It was developed by the British Standards Institution to formalise the operational, screening, and supply-chain requirements that labour providers to the security industry are expected to meet, building on the framework already established by COP119.",
  },
  {
    q: "How does BS 10119 relate to COP119?",
    a: "COP119 is the code of practice that first set out structured requirements for labour supply into the security sector, and BS 10119 is the formal British Standard developed to give that code a more universally recognised, accredited footing. Businesses already working towards COP119 are well placed to move towards BS 10119, since both cover the same core areas of vetting, payroll, and supply-chain management.",
  },

  {
    q: "What documents are required for BS 10119 compliance?",
    a: "BS 10119 compliance requires documented evidence of worker screening and vetting, verified SIA licensing where applicable, right-to-work checks, and PAYE payroll records that meet Working Time Regulations. You will also need written supply-chain and subcontractor management procedures, contractual documentation between labour providers and end users, and policies covering ethical recruitment and worker welfare, all kept current and ready for audit.",
  },
  {
    q: "What are the benefits of achieving BS 10119 compliance?",
    a: "Achieving BS 10119 compliance signals to clients and procurement teams that your labour supply operations meet a formally recognised British Standard, not just an industry code of practice. It builds stronger trust with end users, reduces the risk of relying on poorly vetted staff, and gives your business a clear edge when tendering for commercial and public-sector security or events contracts.",
  },
  {
    q: "Can a consultant help my business prepare for BS 10119?",
    a: "Yes, a specialist consultant can assess your current labour supply processes against BS 10119 requirements, identify any gaps, and help you build the documentation and systems needed to achieve and maintain compliance. Working with a consultant who understands how assessors evaluate submissions means your business is properly prepared rather than finding out about weaknesses during an official audit.",
  },
];

const BS10119Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION */}
      <section className="relative min-h-[92vh] w-full flex items-end pb-32 md:pb-40 pt-30 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bs10119-h.jpg"
            alt="BS 10119 Compliance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[1px] bg-[#997819]" />
                <span className="text-[#997819] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                  New Labour Provision Standard
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-4xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                BS 10119 <br />
                <span className="text-[#997819]">Code of Practice</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-8 text-blue-100/80 text-lg md:text-lg max-w-2xl leading-relaxed font-medium">
                A new British Standard for UK security companies that supply
                labour. It helps ensure every worker is properly recruited,
                screened, and deployed with real evidence behind it, not just
                paperwork.
              </p>
            </FadeIn>

            <FadeIn direction="right" duration="1.0">
              <Link href="/contact-us">
                <button className="relative z-10 bg-[#997819] text-white px-16 py-6 my-4 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-3xl">
                  Book a Consultation
                </button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. STATS STRIP (overlapping the hero) */}
      <section className="relative z-30 px-6 -mt-20 md:-mt-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-zinc-100 grid grid-cols-2 md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-zinc-100">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-8 md:p-10 flex flex-col items-center text-center gap-3"
                >
                  <div className="text-[#997819]">{s.icon}</div>
                  <p className="text-[#12066a] font-black text-lg md:text-2xl tracking-tight leading-tight">
                    {s.value}
                  </p>
                  <p className="text-zinc-500 text-xs md:text-sm font-medium leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 3. WHY THIS CERTIFICATE MATTERS */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none">
                Why This{" "}
                <span className="text-[#997819]">Certificate Matters</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <p className="text-zinc-600 text-lg md:text-xl leading-relaxed font-medium text-center max-w-3xl mx-auto mb-16">
              Imagine "ABC Security" has a contract requiring 100 guards but
              only has 70 of their own. They bring in the remaining 30 from "XYZ
              Labour."
            </p>
          </FadeIn>

          {/* Visual scenario flow */}
          <FadeIn direction="up" delay={0.2}>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-16">
              <div className="bg-[#12066a] rounded-[2rem] p-8 text-center">
                <Users className="text-[#997819] mx-auto mb-4" size={36} />
                <p className="text-white font-black text-lg leading-tight">
                  ABC Security
                </p>
              </div>

              <div className="flex md:flex-col items-center justify-center text-[#997819]">
                <ArrowRight className="rotate-90 md:rotate-0" size={28} />
              </div>

              <div className="bg-[#12066a] rounded-[2rem] p-8 text-center">
                <ShieldCheck
                  className="text-[#997819] mx-auto mb-4"
                  size={36}
                />
                <p className="text-white font-black text-lg leading-tight">
                  XYZ Labour
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="space-y-6 text-zinc-600 text-lg leading-relaxed font-medium max-w-3xl mx-auto">
              <p>
                Here's the real issue: ABC Security delivers the contract to
                their client, but they didn't hire, screening & vetting or train
                those 30 extra guards XYZ Labour did. So if something goes
                wrong, like an unlicensed guard or a missing background check,
                it's ABC Security's reputation and contract at risk, even though
                XYZ Labour made the mistake.
              </p>
            </div>

            <div className="mt-10 border-l-4 border-[#997819] pl-6 md:pl-8 py-2 max-w-3xl mx-auto">
              <p className="text-[#12066a] text-xl md:text-lg font-black leading-snug">
                BS 10119 exists to close this gap by giving ABC Security real
                proof, not just assumptions, that XYZ Labour operates properly.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 4. WHO NEEDS THIS */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-[#12066a] bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: "url('/secure.jpg')",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-[#12066a]/85 z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                Who Needs This?
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoNeedsThis.map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.15}>
                <div className="relative group p-8 h-full rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 shadow-2xl">
                  <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out z-0" />
                  <div className="relative z-10">
                    <div className="text-[#997819] mb-6 group-hover:text-[#12066a] group-hover:scale-110 transition-all duration-500">
                      {item.icon}
                    </div>
                    <h3 className="text-lg text-white font-black tracking-tight group-hover:text-[#12066a] transition-colors duration-500">
                      {item.t}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. WHAT ASSESSORS CHECK */}
      <section className="py-28 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none">
                What Assessors <span className="text-[#997819]">Check</span>
              </h2>
            </FadeIn>
          </div>

          <div className="bg-white rounded-[3rem] shadow-xl border border-zinc-100 divide-y divide-zinc-100">
            {assessorChecks.map((item, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.06}>
                <div className="flex items-center gap-6 px-8 md:px-12 py-6">
                  <span className="font-black text-2xl md:text-3xl text-[#997819]/30 w-10 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <CheckCircle2 size={22} className="text-[#997819] shrink-0" />
                  <p className="text-[#12066a] font-bold text-base md:text-lg">
                    {item}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
    3. HOW WE WORK WITH YOU
========================================================= */}
      <section className="relative overflow-hidden bg-[#f8f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <div className="flex items-center justify-center gap-4 w-fit mx-auto mb-4">
                <span className="w-10 h-0.5 bg-[#997819]" />
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs">
                  OUR PROCESS
                </span>
                <span className="w-10 h-0.5 bg-[#997819]" />
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter">
                How We Work <span className="text-[#997819]">With You</span>
              </h2>
            </FadeIn>
          </div>

          {/* Process Grid */}
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="absolute left-[8%] right-[8%] top-[35px] hidden h-px bg-[#12066a]/15 lg:block" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Scoping",
                  text: "We check whether BS 10119 applies to your business and to which roles across your labour supply.",
                },
                {
                  number: "02",
                  title: "Gap Analysis",
                  text: "We compare your current screening, training, and documentation against BS 10119, gap by gap.",
                },
                {
                  number: "03",
                  title: "Implementation",
                  text: "We build the policies, procedures, and evidence your business needs, with clear guidance for your staff.",
                },
                {
                  number: "04",
                  title: "Final Handover",
                  text: "We hand you a system that works in practice, one your team can run, maintain, and evidence going forward.",
                },
              ].map((step) => (
                <div key={step.number} className="group relative">
                  {/* Step number */}
                  <div className="relative z-10 mb-7 flex h-[70px] w-[70px] items-center justify-center rounded-full border border-[#997819]/50 bg-[#f8f8fa] font-serif text-xl font-bold text-[#12066a] transition-all duration-300 group-hover:border-[#997819] group-hover:bg-[#12066a] group-hover:text-white">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="border-l-2 border-[#12066a]/10 pl-6 transition-colors duration-300 group-hover:border-[#997819]">
                    <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#12066a]">
                      {step.title}
                    </h3>

                    <p className="text-[15px] leading-7 text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-14 flex flex-col gap-5 rounded-2xl bg-[#12066a] px-7 py-6 md:mt-20 md:flex-row md:items-center md:justify-between md:px-9">
            <div>
              <p className="text-lg font-semibold text-white">
                Ready to align your labor supply with BS 10119 standards?
              </p>

              <p className="mt-1 text-sm text-white/65">
                Get expert guidance from initial scoping through final handover.
              </p>
            </div>

            <a
              href="/contact-us"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#997819] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#997819]/90 hover:gap-3"
            >
              Get Started
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* 🔹 BS 10119 to COP 119 */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white text-slate-900 border-y border-slate-200 relative overflow-hidden">
        {/* Subtle Background Glow/Gradient Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#997819]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Content Side */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn direction="up">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#12066a]/5 border border-[#12066a]/10 text-[#12066a] text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#997819] animate-pulse"></span>
                <span>Transition Protocol & Certification</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#12066a] tracking-tight leading-tight mt-4">
                Does BS 10119{" "}
                <span className="text-[#997819]">Automatically</span> Replace
                COP 119?
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                BS 10119 doesn’t automatically replace COP 119. If you already
                hold a COP 119 certificate, it doesn’t just switch over to BS
                10119 on its own. You’ll need to contact your certification body
                directly and ask exactly how your transition will work, and what
                steps you need to take.
              </p>
            </FadeIn>

            {/* Blog Link / High-End CTA Action */}
            <FadeIn direction="up" delay={0.3}>
              <div className="pt-3">
                <Link
                  href="/bs-10119-vs-cop-119/"
                  className="inline-flex items-center space-x-3 text-[#997819] font-semibold hover:text-[#12066a] transition-all group"
                >
                  <span className="border-b border-[#997819]/40 pb-0.5 group-hover:border-[#12066a]">
                    Understand BS 10119 to COP 119
                  </span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform text-lg">
                    →
                  </span>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Visual Comparison Card Side */}
          <div className="lg:col-span-5 flex items-center justify-center space-x-3 sm:space-x-4">
            <FadeIn direction="right" delay={0.2}>
              <div className="flex items-center space-x-3 sm:space-x-4 w-full">
                {/* Legacy Card */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm text-center w-1/2 space-y-3 relative overflow-hidden group hover:border-slate-300 transition-colors">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-slate-500 block">
                    Legacy Schemes
                  </span>
                  <div className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                    COP 119
                  </div>
                  <p className="text-xs text-slate-500 pt-1">
                    Review migration path
                  </p>
                </div>

                {/* Glowing Arrow Indicator */}
                <div className="text-[#997819] font-bold text-xl flex items-center justify-center p-2.5 rounded-full bg-[#997819]/10 border border-[#997819]/20 shadow-inner">
                  →
                </div>

                {/* Current Standard Card */}
                <div className="bg-gradient-to-br from-[#12066a] via-[#1a0b8a] to-[#12066a] text-white p-6 rounded-2xl shadow-xl text-center w-1/2 space-y-3 border border-[#997819]/40 relative overflow-hidden group hover:border-[#997819] transition-colors">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-white block">
                    Current Standard
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-white leading-tight tracking-wide">
                    BS 10119:2026
                  </div>
                  <p className="text-[11px] text-slate-200 pt-1">
                    Active from June 2026
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* FAQs*/}
      <ServicesFaq
        faqs={bs10119Data}
        title={
          <>
            BS 10119 <span className="text-[#997819]">FAQ's</span>
          </>
        }
        subtitle="Questions & Answers"
      />

      {/* 🔹 6. PREMIUM CTA SECTION (Clean Layout) */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="p-12 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden group shadow-2xl bg-[#12066a]"
            style={{
              backgroundImage: 'url("/10-ways-bg.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="absolute inset-0 bg-[#12066a]/80 z-0" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter text-white">
                Ready to Achieve{" "}
                <span className="text-[#997819]">BS 10119 Compliance?</span>
              </h2>
              <p className="text-blue-100/80 font-medium mb-10 text-base md:text-lg">
                Take the first step towards professional excellence, protect
                your operating licence, and unlock new contract opportunities
                with BS 10119.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact-us"
                  className="relative group/btn overflow-hidden inline-flex items-center justify-center px-12 py-6 bg-[#997819] text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all duration-500 shadow-2xl active:scale-95"
                >
                  <span className="relative z-40 transition-colors duration-500 group-hover/btn:text-[#12066a]">
                    Get Started Today
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
                </Link>
                <Link href="/bs-10119-for-uk-security/">
                  <button className="px-12 py-6 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all active:scale-95">
                    Lean More About BS 10119
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

export default BS10119Page;

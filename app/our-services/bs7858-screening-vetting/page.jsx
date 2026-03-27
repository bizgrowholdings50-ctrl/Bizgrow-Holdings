import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Search,
  UserCheck,
  FileSearch,
  CheckCircle2,
  Lock,
  History,
  Fingerprint,
  PhoneCall,
  ArrowRight,
} from "lucide-react";


export const metadata = {
  title: "BS7858 Screening & Vetting | BizGrow Holdings UK",
  description:
    "Learn the BS7858 screening process for security staff. Ensure compliance, build trust, and protect your business with professional vetting.",
};
const BS7858Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (BizGrow Signature Style) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bs7858-hero.webp" // Cinematic image of a background check or professional interview
            alt="BS 7858 Screening and Vetting Standard"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Tactical Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <h2 className="text-[10rem] md:text-[18rem] font-black text-white/[0.07] leading-none uppercase tracking-tighter italic">
            VETTED
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20 text-center md:text-left">
          <div className="max-w-4xl">
            <FadeIn direction="right">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-xs">
                THE UK STANDARD FOR SECURITY SCREENING
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter uppercase">
                BS 7858 <br />
                <span className="text-[#997819]">SCREENING & Vetting.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <p className="mt-10 text-blue-100/60 text-lg md:text-xl max-w-2xl leading-relaxed font-medium italic">
                "Compliant employee screening for UK security companies helps
                you meet BS 7858 requirements, reduce hiring risk, and stay
                audit-ready for contracts, ACS, and client checks."
              </p>
            </FadeIn>
            <FadeIn direction="right" duration="1.0">
              <button className="relative z-10 bg-[#997819] text-white px-16 py-6 my-4 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-3xl">
                Book a Screening Consultation
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. THE VETTING FRAMEWORK (Core Pillars) */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black  text-[#12066a] tracking-tighter uppercase mb-6 leading-none text-center ">
            VETTING
            <span className="text-[#997819]"> PROTOCOL.</span>
          </h2>
          <p className="pb-6 md:mx-28 text-center">
            BS 7858 sets the recognised UK standard for screening individuals
            working in secure environments. The vetting process ensures
            personnel are trustworthy, verified, and suitable for
            security-sensitive roles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                t: "5-Year Employment History",
                d: "Verify employment, education, and gaps for a reliable background check.",
                icon: <History />,
              },
              {
                t: "Identity Verification",
                d: "Validation of ID documents, address history, and official ID to confirm true identity.",
                icon: <Fingerprint />,
              },
              {
                t: "Financial Background Checks",
                d: "Conduct credit, bankruptcy, and CCJ checks for sensitive positions.",
                icon: <Lock />,
              },
              {
                t: "Criminal Record Screening",
                d: "DBS or Basic Disclosure checks comply with UK security industry requirements.",
                icon: <UserCheck />,
              },
              {
                t: "Reference Verification",
                d: "Independent references from previous employers to confirm employment history and professional conduct.",
                icon: <FileSearch />,
              },
              {
                t: "Right to Work Compliance",
                d: "Verification of employee work authorisation in the UK per Home Office regulations",
                icon: <Search />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 hover:border-[#997819] hover:shadow-xl transition-all group"
              >
                <div className="text-[#997819] mb-6">{item.icon}</div>
                <h3 className="font-black text-[#12066a] uppercase text-xs tracking-widest mb-3">
                  {item.t}
                </h3>
                <p className="text-zinc-500 text-[13px] font-medium leading-relaxed">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 3. WHY BS 7858 MATTERS (Strategic Value) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase mb-10 leading-tight">
              Benefits of <br />{" "}
              <span className="text-[#997819]">
                BS7858 Screening and Vetting
              </span>
            </h2>

            <div className="space-y-6">
              {[
                {
                  t: "Build Client Trust",
                  d: "Gives assurance that every member of staff has undergone thorough and reliable background screening.",
                },
                {
                  t: "Risk Reduction",
                  d: "Reduces the dangers of internal fraud, misconduct, and security breaches.",
                },
                {
                  t: "Compliance with Regulations",
                  d: "Ensures your hiring practices meet SIA requirements and recognised industry standards.",
                },
                {
                  t: "Improved Tender Success",
                  d: "BS7858 accreditation strengthens credibility and increases the likelihood of winning competitive contracts.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-zinc-50 p-6 rounded-2xl border border-zinc-100 hover:border-[#997819]/30 transition-all group"
                >
                  <CheckCircle2
                    className="text-[#997819] shrink-0 mt-1"
                    size={22}
                  />
                  <div className="flex flex-col">
                    <span className="font-black text-[#12066a] uppercase text-sm italic tracking-wide">
                      {item.t}
                    </span>
                    <p className="text-zinc-500 text-xs font-medium mt-1 leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="rounded-[4rem] overflow-hidden border-[15px] border-zinc-50 shadow-2xl">
              <Image
                src="/vetting-check.jpg"
                alt="Vetting Process"
                width={600}
                height={600}
                className="object-cover md:h-175"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 UNIFIED SECTION: COVERS & PROCEDURE combined */}
      <section className="py-32 bg-[#12066a] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] skew-x-12 transform origin-top-right pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="mb-20">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs">
                Technical Standard BS7858
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white mt-4 tracking-tighter uppercase leading-[0.9]">
                BS7858 Screening <br />
                <span className="text-[#997819]">& Vetting Framework.</span>
              </h2>
            </FadeIn>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN: WHAT IT COVERS */}
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 border-l-4 border-[#997819] pl-6">
                  BS7858 Screening and Vetting Covers:
                </h3>
                <p className="text-blue-100/50 text-sm leading-relaxed max-w-md">
                  BS7858 is a recognised standard applied across industries such
                  as security services, finance, and government, where
                  trustworthiness and integrity of staff are essential.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                {[
                  "Ongoing Monitoring Obligations",
                  "Security Screening Process",
                  "Purpose and Objectives",
                  "Roles and Accountability",
                  "Confidentiality & Data Protection",
                  "Verification Standards",
                  "Training and Awareness",
                  "Appeals and Dispute Resolution",
                  "Records & Documentation Mgmt",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[#997819]/50 transition-all group"
                  >
                    <ShieldCheck
                      className="text-[#997819] group-hover:scale-110 transition-transform"
                      size={16}
                    />
                    <span className="text-white uppercase text-[10px] font-bold tracking-widest leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: PROCEDURE STEPS */}
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative">
              <div className="absolute -top-6 -right-6 bg-[#997819] text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">
                The Process
              </div>

              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 text-center">
                Procedure for{" "}
                <span className="text-[#997819]">
                  BS7858 Screening and Vetting:
                </span>
              </h3>
              <p className="text-blue-100/40 text-[10px] uppercase font-bold tracking-widest text-center mb-8">
                Ensuring dependable & trustworthy personnel selection
              </p>

              <div className="space-y-4">
                {[
                  "Candidate consent and application",
                  "Identity verification (Official Documents)",
                  "Right to work confirmation",
                  "Employment history checks (Min. 5 years)",
                  "Reference verification",
                  "Financial and credit checks",
                  "Criminal record checks (DBS)",
                  "Gap analysis in career or education",
                  "Final review and approval",
                  "Ongoing compliance & maintenance",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#997819]/50 text-[#997819] flex items-center justify-center font-black text-xs group-hover:bg-[#997819] group-hover:text-[#12066a] transition-all">
                      {i + 1}
                    </div>
                    <div className="flex-grow border-b border-white/5 pb-3 group-last:border-none">
                      <span className="text-blue-100/70 uppercase text-[11px] font-black tracking-tight group-hover:text-white transition-colors">
                        {step}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 4. COMPARISON: BASIC vs BS 7858 (Technical Section) */}
      <section className="py-24 bg-white text-[#12066a]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center uppercase mb-2">
            THE VETTING <span className="text-[#997819]">GAP.</span>
          </h2>
          <p className="text-black MD:mx-28 my-10 text-center">
            Not all background checks provide the same level of security. Basic
            screening only verifies limited information, while BS 7858 vetting
            provides a thorough background check for those in security-sensitive
            roles.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-12 bg-[#12066a] border border-white/10 rounded-[3rem]">
              <h3 className="text-white font-black text-2xl mb-6 flex items-center gap-3">
                Standard Checks
              </h3>
              <ul className="space-y-4 text-blue-100/60 text-sm font-medium">
                <li>● Basic identity verification</li>
                <li>● Current address confirmation</li>
                <li>● Basic criminal record disclosure</li>
              </ul>
            </div>
            <div className="p-12 bg-[#997819] rounded-[3rem] text-white shadow-2xl">
              <h4 className="font-black text-2xl mb-6">
                BS 7858 Gold Standard
              </h4>
              <ul className="space-y-4 font-black uppercase text-xs tracking-widest">
                <li>● Full 5-year employment and education history check</li>
                <li>● Verification of gaps over 31 days</li>
                <li>● CCJ and financial integrity checks</li>
                <li>● Professional character references</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. VETTING JOURNEY (Step-by-Step) */}
      <section className="py-32 bg-[#12066a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none text-center">
              SCREENING <span className="text-[#997819]">PHASES.</span>
            </h2>
            <p className="text-white my-6 md:mx-28">
              BS 7858 vetting follows a structured process to verify the
              identity, background, and integrity of individuals working in
              security-sensitive roles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                t: "Vetting Application",
                d: "Collection of identity documents, address history, and employment records in line with BS 7858 requirements.",
              },
              {
                n: "02",
                t: "Background Review",
                d: "Assessment of employment history, education, and investigation of unexplained gaps over 31 days.",
              },
              {
                n: "03",
                t: "Verification Checks",
                d: "Reference checks, criminal record screening, and financial integrity verification were required.",
              },
              {
                n: "04",
                t: "Vetting Report",
                d: "A complete screening record prepared to demonstrate compliance during SIA or client audits",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[3rem] flex flex-col items-center text-center shadow-sm"
              >
                <span className="text-5xl font-black text-[#997819]/50 mb-6">
                  {step.n}
                </span>
                <h3 className="font-black text-[#12066a] uppercase mb-3 tracking-tighter text-lg">
                  {step.t}
                </h3>
                <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 6. FAQs (SEO & Clarification) */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase md:mb-20 text-center">
            SCREENING <span className="text-[#997819]">FAQS.</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Q: Who needs BS 7858 screening?",
                a: "BS 7858 is widely used for staff working in security-sensitive roles, especially in private security, key holding, CCTV operations, and any role requiring access to sites, assets, or confidential information.",
              },
              {
                q: "Q: What if there is a gap in employment?",
                a: "BS 7858 requires any unverified gap over 31 days to be supported with acceptable evidence, such as references, documents, or other verification records.",
              },
              {
                q: "Q: How long does BS 7858 vetting take?",
                a: "Timeframes vary by case, but most screening is completed within 7–21 working days, depending on how quickly references and supporting documents are provided.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:border-[#997819] transition-all group"
              >
                <h3 className="font-black text-[#12066a] uppercase text-sm mb-4">
                  {faq.q}
                </h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 7. CALL TO ACTION (Fixed Parallax Style) */}
      <section className="py-24 px-6 bg-white relative">
        <FadeIn direction="up">
          <div className="max-w-7xl mx-auto relative rounded-[4rem] overflow-hidden shadow-3xl group">
            <div
              className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
              style={{ backgroundImage: "url('/vetting-cta-bg.jpg')" }}
            >
              <div className="absolute inset-0 bg-[#12066a] mix-blend-multiply" />
            </div>

            <div className="relative z-10 p-12 md:p-24 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter mb-10 uppercase leading-[0.9]">
                GET YOUR STAFF <br />
                <span className="text-[#997819]">BS 7858 COMPLIANT.</span>
              </h2>
              <p className="text-white mb-6 md:mx-28">
                Ensure your workforce meets the BS 7858 screening standard with
                professional vetting and compliant documentation for
                security-sensitive roles.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-[#997819] text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-[#12066a] transition-all duration-700 shadow-2xl group flex items-center gap-3">
                  Start Vetting Now
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
                <a
                  href="tel:+447898205035"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3"
                >
                  <PhoneCall size={18} /> Call a Compliance Specialist
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
};

export default BS7858Page;

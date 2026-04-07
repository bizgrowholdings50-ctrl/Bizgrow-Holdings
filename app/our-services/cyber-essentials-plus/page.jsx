import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Cpu,
  Zap,
  CheckCircle2,
  Fingerprint,
  Search,
  Lock,
  Globe,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Cyber Essentials Plus Certification UK | BizGrow Holdings ltd",
  description:
    "Get Cyber Essentials Plus certified in the UK. Expert consultancy, technical audit support, and proven cyber security compliance.",
};

const CyberEssentialsPlusPage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (Advanced Watermark) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/cyber-plus-hero-org.jpg"
            alt="Cyber Essentials Plus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <h2 className="text-[5rem] md:text-[15rem] font-black text-white/[0.13] leading-none uppercase tracking-tighter">
            VERIFIED
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                UK CYBER SECURITY CERTIFICATION
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-4xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                CYBER ESSENTIALS <br />
                <span className="text-[#997819]">PLUS</span> CERTIFIED SUPPORT.
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-10 text-blue-100/70 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium italic">
                "We help UK businesses prepare for Cyber Essentials Plus from
                gap analysis and remediation to <Link href="https://bizgrow-holdings.com/our-services/internal-audit/" className="text-[#997819] font-bold">audit readiness</Link> and evidence
                support."
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

      {/* 🔹 2. THE RIGOROUS AUDIT (Asymmetric Grid) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3 sticky top-32">
              <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none uppercase">
                WHY Cyber Essentials <br />
                <span className="text-[#997819]">PLUS?</span>
              </h2>
              <p className="mt-8 text-zinc-500 font-medium text-lg leading-relaxed">
                Unlike standard Cyber Essentials, which is based on
                self-assessment, Cyber Essentials Plus includes an independent
                technical verification. This hands-on assessment confirms that
                your security controls are properly implemented and actively
                protecting your systems.
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  t: "Verified Security",
                  d: "An accredited assessor conducts a technical audit of your devices, systems, and security controls.",
                  icon: <Search />,
                },
                {
                  t: "Vulnerability Scanning",
                  d: <><Link href="https://bizgrow-holdings.com/difference-between-internal-audit-and-external-audit/" className="text-[#997819] font-bold">Internal and external</Link> scans identify potential weaknesses that could expose your organisation to cyber threats.</>,
                  icon: <Fingerprint />,
                },
                {
                  t: "Multi-Factor Authentication (MFA)",
                  d: "Verification that MFA is correctly implemented to strengthen account protection and access control.",
                  icon: <Globe />,
                },
                {
                  t: "Secure Configuration Testing",
                  d: "Systems are tested to ensure security settings prevent unauthorised access and malicious activity.",
                  icon: <Lock />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-10 rounded-[2.5rem] ${
                    i % 2 === 0 ? "bg-zinc-50" : "bg-[#12066a] text-white"
                  } transition-all hover:scale-[1.02] duration-500`}
                >
                  <div className="mb-6 text-[#997819]">{item.icon}</div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase italic">
                    {item.t}
                  </h3>
                  <p
                    className={`${
                      i % 2 === 0 ? "text-zinc-500" : "text-blue-100/60"
                    } font-medium`}
                  >
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* 🔹 NEW SECTION: How to Become Certified (The Roadmap) */}
      <section className="py-22 bg-zinc-50 relative overflow-hidden">
        {/* Decorative Grid Pattern for Tech Feel */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                The Certification Pathway
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none uppercase ">
                How to Become <br />
                <span className="text-[#997819] not-italic">Cyber Essentials Plus Certified.</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: "Step 1",
                title: "Confirm Certification",
                desc: "Provide your valid Cyber Essentials self-assessment certificate, required before progressing to Plus.",
              },
              {
                step: "Step 2",
                title: "Submit Application",
                desc: "Complete our online form so our specialists can review your IT environment and plan the assessment.",
              },
              {
                step: "Step 3",
                title: "Technical Assessment",
                desc: "A qualified assessor will test and verify your cybersecurity controls based on your systems.",
              },
              {
                step: "Step 4",
                title: "Certification Awarded",
                desc: "Receive official confirmation and your Cyber Essentials Plus badge once assessment is complete.",
              },
              {
                step: "Step 5",
                title: "Annual Renewal",
                desc: <>Review and renew annually to maintain <Link href="https://bizgrow-holdings.com/compliance-consultancies/" className="text-[#997819] font-bold">compliance</Link> and ensure ongoing cybersecurity assurance.</>,
              },
            ].map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className="relative group">
                  {/* Step Number with Glow Effect */}
                  <div className="flex flex-col h-full bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                    <div className="w-12 h-12 rounded-xl bg-[#12066a] text-[#997819] flex items-center justify-center font-black text-xs mb-6 group-hover:bg-[#997819] group-hover:text-white transition-colors duration-500">
                      {item.step.split(" ")[1]}
                    </div>
                    
                    <h3 className="text-lg font-black text-[#12066a] uppercase tracking-tight mb-4 leading-tight min-h-[50px]">
                      {item.title}
                    </h3>
                    
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed italic">
                      {item.desc}
                    </p>

                    {/* Connecting Line (Only for Desktop) */}
                    {i < 4 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-[#997819]/30 z-0" />
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 3. TECHNICAL AUDIT COVERAGE (3-Column SMAS Style) */}
      <section className="py-22 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-7xl font-black text-[#12066a] tracking-normal uppercase">
              Benefits of <span className="text-[#997819]">Cyber</span> 
              <span className="text-[#997819]"> Essentials Plus</span>{" "}
              Certification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Strong Protection Against Cyber Attacks",
              "Competitive Advantage in the UK Market",
              "Increased Trust & Credibility",
              "Improved Staff Cyber Awareness",
              "Better Business Continuity",
              "Access to Government & Public Sector Contracts",
              "Lower Cyber Insurance Premiums",
              "Improved Operational Efficiency",
              "Enhanced Data Protection & Compliance",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-zinc-200 flex items-center gap-4 hover:shadow-xl transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-[#997819] transition-colors">
                  <CheckCircle2
                    size={18}
                    className="text-[#997819] group-hover:text-white"
                  />
                </div>
                <span className="font-black text-[#12066a] uppercase text-sm tracking-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. THE ROADMAP (Horizontal Journey) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-7xl pb-10 text-center font-black text-[#12066a] tracking-normal uppercase">
            Why Choose <span className="text-[#997819]">BizGrow Holdings?</span>
          </h2>
          <p className="text-center md:mx-48 pb-10">
            Our specialists support you throughout the certification journey,
            ensuring a smooth and efficient process from preparation to
            approval.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                t: "Recognised Certification Support",
                d: "We partner with UK-approved and UKAS-accredited bodies for compliant certification.",
              },
              {
                n: "02",
                t: "Expert Compliance Guidance ",
                d: "Our consultants assist with gap analysis, documentation, and audit readiness.",
              },
              {
                n: "03",
                t: "Proven Client Trust: ",
                d: <>Trusted by <Link href="https://bizgrow-holdings.com/top-security-companies-trusted-protection-for-every-business/" className="text-white font-bold ">UK security</Link> and contracting businesses for reliable advice and consistent results.</>,
              },
              {
                n: "04",
                t: "End-to-End Support",
                d: "From initial consultation to final certification, we provide clear guidance at every stage.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-10 bg-[#12066a] rounded-[3rem] group hover:bg-[#997819] transition-all duration-700"
              >
                <span className="text-5xl font-black text-white/10 group-hover:text-white/30 transition-colors">
                  {step.n}
                </span>
                <h3 className="text-xl font-black text-[#997819] group-hover:text-white mt-8 mb-4 uppercase tracking-tighter">
                  {step.t}
                </h3>
                <p className="text-blue-100/60 group-hover:text-white/80 text-sm font-medium leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. DATA & SECURITY (Metrics) */}
      <section className="py-22 bg-[#12066a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern-2.jpg')] bg-no-repeat bg-cover bg-fixed bg-center opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[0.9] uppercase">
                Strengthen Your <br />{" "}
                <span className="text-[#997819]">Cyber Security.</span>
              </h3>
              <p className="text-blue-100/60 font-medium text-lg italic mb-10 border-l-4 border-[#997819] pl-6">
                "Cyber Essentials sets the standard. Cyber Essentials Plus
                proves your defences are working."
                <br />
                Accredited assessors test your systems to verify that security
                controls are correctly implemented and effective.
              </p>
              <div className="flex gap-4">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <p className="text-3xl font-black text-[#997819]">100% </p>
                  <p className="text-[10px] text-white uppercase font-bold tracking-widest">
                    Verified Security Controls & Fast Post-Assessment Reporting
                  </p>
                </div>
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <p className="text-3xl font-black text-[#997819]">24H</p>
                  <p className="text-[10px] text-white uppercase font-bold tracking-widest">
                    Post-Scan Reporting
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[4rem] overflow-hidden border-[15px] border-white/5 shadow-2xl">
                <Image
                  src="/audit-techs.jpg"
                  alt="Cyber Essentials Plus security protection"
                  width={600}
                  height={600}
                  className="object-cover h-[450px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 6. CTA (Cyber Protect Design) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-12 md:p-34 rounded-[4rem] bg-[#12066a] relative overflow-hidden group shadow-2xl text-center flex flex-col items-center">
            {/* Background Pattern Fix Applied */}
            <div className="absolute inset-0 bg-[url('/cyber-plus-cta.jpg')] bg-no-repeat bg-cover bg-fixed bg-center opacity-50 pointer-events-none" />

            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-3 uppercase relative z-10">
              UPGRADE TO <br />{" "}
              <span className="text-[#997819]">Cyber Essentials Plus.</span>
            </h2>
            <p className="text-white mb-3">
              Strengthen your organisation’s security posture, build client
              trust, and demonstrate verified cyber resilience.
            </p>
            <Link href="/contact-us">
            <button className="relative z-10 bg-[#997819] text-white md:px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-3xl">
              Book Your Audit today
            </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CyberEssentialsPlusPage;

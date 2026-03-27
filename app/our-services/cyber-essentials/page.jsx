import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Server,
  Network,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

export const metadata = {
  title: "Cyber Essentials Certification | BizGrow Holdings UK",
  description:
    "Get Cyber Essentials certification in the UK with BizGrow Holdings. Protect your business from cyber threats and build client trust.",
};

const CyberEssentialsPage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (BIZGROW Style Watermark) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/cyber-hero.jpg" // Change image path
            alt="Cyber Essentials Certification - BizGrow Holdings Ltd"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* Watermark Text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <h2 className="text-[5rem] md:text-[15rem] font-black text-white/[0.09] leading-none uppercase tracking-tighter">
            SECURE
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right" duration="0.4">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                UK Cyber Security Standard
              </span>
            </FadeIn>

            <FadeIn direction="right" duration="0.6">
              <h1 className="text-5xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tighter">
                CYBER <br />
                <span className="text-[#997819]"> ESSENTIALS</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" duration="0.8">
              <p className="mt-10 text-blue-100/60 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium italic">
                "Cyber Essentials is a UK government-backed cybersecurity
                certification designed to help businesses protect themselves
                from common cyber threats. The scheme is supported by the
                National Cyber Security Centre (NCSC)."
              </p>
            </FadeIn>

            <FadeIn direction="right" duration="1.0">
              <div className="mt-12 w-32 h-2 bg-[#997819] rounded-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. THE TECHNICAL DEFENCE (Asymmetric Pillar Grid) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3 sticky top-32">
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-normal leading-nomral uppercase">
                TECHNICAL <br />
                <span className="text-[#997819]">CONTROLS </span>
              </h2>
              <p className="mt-8 text-zinc-500 font-medium text-lg leading-relaxed">
                To achieve Cyber Essentials certification in the UK, your
                organisation must implement four key technical controls that
                strengthen your IT security framework and reduce the risk of
                cyber attacks. These controls form the foundation of a secure
                and compliant business environment.
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  t: "Firewalls",
                  d: "Implementing properly configured firewalls to protect your business network from unauthorised access and external cyber attacks.",
                  icon: <Network />,
                },
                {
                  t: "Secure Configuration",
                  d: "Ensuring all devices and software are securely configured, removing default settings, and reducing system vulnerabilities.",
                  icon: <Server />,
                },
                {
                  t: "User Access Control",
                  d: "Limiting access rights to authorised users only, applying strong password policies, and role-based permissions.",
                  icon: <UserCheck />,
                },
                {
                  t: "Malware Protection",
                  d: "Approved antivirus and anti-malware solutions must be installed and regularly updated to detect, prevent, and remove malicious software from your systems.",
                  icon: <Zap />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-10 rounded-[2.5rem] ${
                    i % 2 === 0 ? "bg-zinc-50" : "bg-[#12066a] text-white"
                  } transition-transform hover:-translate-y-2 duration-500`}
                >
                  <div className="mb-6 text-[#997819]">{item.icon}</div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight italic uppercase">
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

      {/* 🔹 3. MARKET AUTHORITY: THE TENDER ADVANTAGE */}
      <section className="py-22 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#12066a]/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                UK Security Businesses
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-[0.9] mb-8 uppercase">
                Benefits of <br />{" "}
                <span className="text-[#997819]">Cyber Essentials </span>
              </h2>
              <div className="space-y-8 italic">
                <p className="text-zinc-500 font-medium text-lg border-l-4 border-[#997819] pl-6">
                  Cyber Essentials is especially important for security
                  providers, contractors, and compliance-driven businesses. It
                  helps you:
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="p-2 bg-zinc-100 rounded-[3.5rem]">
                <div className="bg-[#12066a] rounded-[3rem] p-12 text-center relative overflow-hidden">
                  <h3 className="text-white font-black text-2xl mb-10 tracking-tight italic uppercase">
                    The Advantage
                  </h3>
                  <div className="space-y-6">
                    {[
                      "Gain client trust and demonstrate strong cybersecurity",
                      "Meet tender requirements and contract conditions",
                      "Show compliance readiness for cybersecurity audits",
                      "Protect sensitive data and prevent reputational damage",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="py-4 border-b border-white/10 text-blue-100/80 font-bold flex justify-between items-center group"
                      >
                        <span>{item}</span>
                        <ShieldCheck className="text-[#997819]" size={20} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 4. IMPLEMENTATION JOURNEY */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase">
              Cyber Essentials{" "}
              <span className="text-[#997819]">Certification Process.</span>
            </h2>
            <p className="md:mx-34 py-4">
              Our Cyber Essentials pathway is structured, simple, and designed
              to ensure you achieve certification without disruption to your
              business operations.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                n: "01",
                t: "Pre Assessment",
                d: "We review your current cybersecurity posture and identify areas that require improvement. This includes checking your systems, policies, and technical controls.",
              },
              {
                n: "02",
                t: "Implementation Support",
                d: "Our team implements essential security controls like configuration, access management, and device protection, tailored to your business size and operations.",
              },
              {
                n: "03",
                t: "Certification Submission",
                d: "We prepare and submit your Cyber Essentials application and guide you through the final assessment process.",
              },
              {
                n: "04",
                t: "Certification & Renewal",
                d: "Once approved, you receive your Cyber Essentials certificate, valid for 12 months. We also support you with renewal to maintain compliance year after year.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 hover:bg-[#12066a] group transition-all duration-500"
              >
                <span className="text-5xl font-black text-[#997819]/20 group-hover:text-[#997819] transition-colors">
                  {step.n}
                </span>
                <h3 className="text-xl font-black text-[#12066a] group-hover:text-white mt-6 mb-3 uppercase tracking-tighter">
                  {step.t}
                </h3>
                <p className="text-zinc-500 group-hover:text-blue-100/60 text-sm font-medium">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. SECURITY CHECKLIST (Detailed List) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 border-t border-zinc-100 pt-24">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <FadeIn direction="right">
                <h3 className="text-5xl font-black text-[#12066a] tracking-tight mb-6 uppercase">
                  Technical <br />{" "}
                  <span className="text-[#997819]">Readiness</span>
                </h3>
                <p className="pb-5">
                  Achieving Cyber Essentials certification in the UK requires
                  businesses to demonstrate practical security readiness across
                  key operational areas to reduce cyber risk and strengthen data
                  protection.
                </p>
                <div className="grid sm:grid-cols-1 gap-4">
                  {[
                    "Malware Protection",
                    "Password Policy Enforcement",
                    "Multi-Factor Authentication (MFA)",
                    "Secure BYOD Policy",
                    "Software Whitelisting",
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl font-black text-[10px] uppercase tracking-widest border-l-4 border-[#12066a] hover:border-[#997819] transition-all"
                    >
                      <CheckCircle2 size={16} className="text-[#997819]" />{" "}
                      {doc}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="lg:w-1/2 relative">
              <FadeIn direction="left">
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-zinc-50">
                  <Image
                    src="/cyber-shield.jpg"
                    alt="cyber security protection Uk "
                    width={600}
                    height={700}
                    className="object-cover h-[500px]"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#12066a] p-8 rounded-[2rem] text-white shadow-xl">
                  <p className="text-3xl font-black leading-none text-[#997819]">
                    100%
                  </p>
                  <p className="text-[10px] uppercase font-bold opacity-80">
                    Threat Reduction
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 6. CYBER METRICS (Parallax Background) */}
      <section className="py-24 bg-[#12066a] relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: 'url("/cyber-bg.jpg")',
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/40 to-transparent z-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#997819] h-64 rounded-[3rem] p-8 flex flex-col justify-end">
                <span className="text-4xl font-black text-white">100%</span>
                <p className="text-white text-xs font-bold uppercase mt-2 italic">
                  COMPLIANCE READY
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md h-64 rounded-[3rem] p-8 flex flex-col justify-end border border-white/20">
                <ShieldAlert className="text-[#997819] mb-4" size={40} />
                <p className="text-white font-bold uppercase text-xs">
                  PROACTIVE CYBER DEFENCE
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[0.9] uppercase">
                STRENGTHEN YOUR <br />{" "}
                <span className="text-[#997819]">CYBER SECURITY</span>
              </h3>
              <p className="text-blue-100/60 font-medium text-lg italic">
                We don’t just support your Cyber Essentials certification; we
                help protect your business from real-world cyber threats with
                practical, long-term security solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 7. CTA (Signature Design) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-12 md:p-24 rounded-[4rem] bg-[#12066a] relative overflow-hidden group shadow-2xl text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10 uppercase relative z-10">
              Get Cyber Essentials with <br />{" "}
              <span className="text-[#997819]">BizGrow Holdings</span>
            </h2>
            <p className="text-white py-5 -mt-6 md:mx-40">
              If you want to secure your systems, protect your clients, and win
              more opportunities, Cyber Essentials is the first step.
            </p>
            <button className="relative z-10 bg-[#997819] text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-3xl">
              Contact us today
            </button>
            {/* Updated Background Pattern Line */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.jpg')] bg-no-repeat bg-cover bg-fixed bg-center opacity-30 pointer-events-none" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CyberEssentialsPage;

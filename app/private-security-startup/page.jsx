import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/MotionWrapper";
import { 
  Rocket, 
  ShieldCheck, 
  FileCheck, 
  Settings, 
  BarChart, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ClipboardList
} from "lucide-react";

export const metadata = {
  title: "Private Security Startup Support | BizGrow Holdings",
  description: "Launch and scale your UK security business with BizGrow Holdings. Expert compliance, certification, and growth support.",
};

const SecurityStartupPage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      
      {/* 🔹 1. HERO SECTION */}
      <section className="relative h-[85vh] md:h-screen w-full flex items-center overflow-hidden bg-[#12066a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/security-startup-hero.jpg" // Ensure this image exists
            alt="Security Startup UK"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/60 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <FadeIn direction="up">
            <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6 block">
              SIA & ACS Compliance Experts
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-8">
              Start and Scale Your <br />
              <span className="text-[#997819]">Security Startup.</span>
            </h1>
            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-10">
              Expert guidance to help you launch, structure, and scale a fully compliant security business with SIA requirements, ACS preparation, and ISO certification support.
            </p>
            <Link href="/contact-us">
              <button className="bg-[#997819] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#12066a] transition-all duration-300 shadow-2xl">
                Book a Free Consultation →
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. PROBLEM & SOLUTION OVERVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-zinc-50">
                <Image src="/Credibility.png" width={600} height={700} alt="Consultancy" className="object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-[#12066a] uppercase tracking-tighter mb-8 leading-tight">
                Building a Foundation <br /> <span className="text-[#997819]">for Credibility.</span>
              </h2>
              <p className="text-zinc-600 text-lg mb-6 leading-relaxed">
                Launching a private security startup in the UK can be challenging due to strict industry regulations, operational requirements, and high client expectations. Without the right structure, policies, and compliance systems, many new security businesses struggle to gain credibility or win contracts.
              </p>
              <p className="text-[#12066a] font-bold text-lg mb-8 italic">
                At BizGrow Holdings, we help entrepreneurs build strong and compliant private security startups from the ground up.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {["Business Formation", "SIA ACS Prep", "ISO Systems", "Operational Setup"].map((tag, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#997819] w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-tight text-zinc-500">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. ADVANTAGES SECTION */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[#12066a] text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Advantages Our <span className="text-[#997819]">Clients Gain</span>
            </h2>
            <p className="text-zinc-500 mt-6 max-w-3xl mx-auto font-medium">
              Starting a private security startup in the UK requires the right systems and compliance. Our consultancy helps you build a strong foundation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { t: "Management Systems", d: "Implement systems that improve operational control and service quality.", icon: <Settings /> },
              { t: "SOP Development", d: "Clear procedures for consistent and reliable security services.", icon: <ClipboardList /> },
              { t: "Compliance Guidance", d: "Support to meet UK industry regulations and SIA requirements.", icon: <ShieldCheck /> },
              { t: "ACS & ISO Prep", d: "Develop the systems needed for high-level industry certifications.", icon: <FileCheck /> },
              { t: "Growth Support", d: "Expert guidance to build credibility and win bigger contracts.", icon: <BarChart /> },
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 hover:border-[#997819] transition-all group shadow-sm hover:shadow-xl">
                <div className="text-[#997819] mb-6 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                <h3 className="font-black text-[#12066a] uppercase text-xs mb-4 tracking-tight leading-tight">{benefit.t}</h3>
                <p className="text-zinc-500 text-[11px] leading-relaxed">{benefit.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. IDEAL FOR (Who Should Start) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-[#12066a] text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
            Who Should Start a <br /><span className="text-[#997819]">Private Security Startup?</span>
          </h2>
          <p className="text-zinc-600 mb-16 text-lg max-w-3xl mx-auto">
            Our consultancy is designed for individuals and organisations that want to establish a compliant and credible security startup while meeting the expectations of clients and regulators.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              "Entrepreneurs planning to start a security company in the UK.",
              "Security professionals looking to launch their own startup.",
              "Existing businesses preparing for SIA ACS accreditation.",
              "Companies expanding into the UK's private security industry."
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                <div className="w-2 h-2 rounded-full bg-[#997819]" />
                <span className="text-zinc-700 font-bold uppercase text-xs tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. STEP-BY-STEP PROCESS (Timeline) */}
      <section className="py-24 bg-[#12066a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Our Step-By-Step <br /> <span className="text-[#997819]">Consultancy Process.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { s: "Step 1", t: "Initial Consultation", d: "We understand your goals and market position to guide your foundation." },
              { s: "Step 2", t: "Compliance Systems", d: "Developing essential policies aligned with UK security regulations." },
              { s: "Step 3", t: "Operational Framework", d: "Creating documentation and internal systems for daily management." },
              { s: "Step 4", t: "Certification Prep", d: "Preparing your startup for SIA ACS and ISO certification readiness." },
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-6xl font-black text-white/5 absolute -top-10 left-0 group-hover:text-[#997819]/20 transition-colors">0{i+1}</div>
                <div className="relative z-10 pt-8 border-t border-white/10">
                  <span className="text-[#997819] font-black uppercase tracking-widest text-[10px] mb-2 block">{step.s}</span>
                  <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">{step.t}</h3>
                  <p className="text-blue-100/50 text-sm leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 6. WHY BIZGROW (Final Pillar) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[4rem] p-10 md:p-20 text-[#12066a] flex flex-col lg:flex-row gap-16 border border-[#12066a] items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                Why Startups Choose <span className="text-[#997819]">BizGrow.</span>
              </h2>
              <ul className="space-y-6">
                {[
                  "Consultancy expertise focused on the UK private security sector.",
                  "Step-by-step guidance from startup setup to certification readiness.",
                  "Practical compliance frameworks aligned with UK regulations.",
                  "Support designed to help your security startup grow confidently."
                ].map((li, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <CheckCircle2 className="text-[#997819] w-6 h-6 shrink-0" />
                    <span className="text-zinc-400 font-medium leading-relaxed">{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#12066a] p-10 rounded-[3rem] border border-white/10 text-center">
                <Rocket className="text-[#997819] w-16 h-16 mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase mb-4">Start with Confidence</h3>
                <p className="text-blue-100/50 mb-10 text-sm">
                  Join a network of professional security companies that started their journey with expert compliance and structural support.
                </p>
                <Link href="/contact-us">
                  <button className="w-full bg-[#997819] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-white text-[10px] hover:bg-white hover:text-[#12066a] transition-all duration-500">
                    Book a Consultation
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

export default SecurityStartupPage;
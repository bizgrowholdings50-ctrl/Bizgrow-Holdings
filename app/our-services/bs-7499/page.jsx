import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Building2,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  PhoneCall,
  ArrowRight,
  UserCheck,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

export const metadata = {
  title: "BS 7499 Certification for Static Guarding | BizGrow Holdings",
  description:
    "Get BS 7499 certification for static guarding services in the UK. BizGrow Holdings helps security companies achieve full compliance.",
};

const BS7499Page = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden">
      {/* 🔹 1. HERO SECTION (BizGrow Signature Style) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/guarding-hero.jpg" // Image of a professional security guard at a high-end site
            alt="BS 7499 Static Site Guarding Standard"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Tactical Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10">
          <span className="text-[10rem] md:text-[16rem] font-black text-white/[0.08] leading-none uppercase tracking-tighter">
            GUARDING
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
                Static Guarding & Mobile Patrols
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <h1 className="text-5xl md:text-8xl font-black text-white mt-6 leading-[1.1] tracking-tighter uppercase">
                BS 7499 <br />
                <span className="text-[#997819]">OPERATIONS.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <p className="mt-10 text-blue-100/60 text-lg md:text-xl max-w-2xl leading-relaxed font-medium italic">
                "The British Standard for professional static guarding services
                establishes best practices for the management and delivery of
                manned security operations."
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. OPERATIONAL STANDARDS (Core Focus) */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-black text-[#12066a] tracking-tighter uppercase mb-16 leading-none">
            SITE <br />
            <span className="text-[#997819]">PROTOCOLS.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                t: "Static Guarding",
                d: "Professional management of security personnel deployed at fixed sites and controlled entry points.",
                icon: <Building2 />,
              },
              {
                t: "Mobile Patrols",
                d: "Scheduled and random patrol visits to client premises to maintain a visible security presence and site monitoring.",
                icon: <Navigation />,
              },
              {
                t: "Assignment Instructions",
                d: "Clear, site-specific instructions defining the duties, responsibilities, and procedures for security personnel.",
                icon: <FileText />,
              },
              {
                t: "Response Procedures",
                d: "Structured protocols for responding to incidents, emergencies, and security breaches effectively.",
                icon: <ShieldAlert />,
              },
              {
                t: "Keyholding Integration",
                d: "Secure management of keys and controlled access to client premises in line with recognised UK security practices.",
                icon: <MapPin />,
              },
              {
                t: "Duty Rostering",
                d: "Efficient scheduling of security staff to ensure continuous coverage and compliant working hours.",
                icon: <Clock />,
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

      {/* 🔹 3. THE BIZGROW ADVANTAGE (Why Us) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase mb-10 leading-tight">
              Why <span className="text-[#997819]">BS 7499 </span> Certification
              Matters
            </h2>
            <p className="text-zinc-500 font-medium mb-2 mt-0 text-md">
              BS 7499 certification is an essential standard for security
              companies delivering static guarding services in the UK. It
              establishes recognised best practices for the management,
              deployment, and supervision of security personnel, ensuring that
              guarding operations are carried out professionally and
              consistently. For organisations providing manned guarding
              services, achieving BS 7499 certification demonstrates a clear
              commitment to quality, operational control, and compliance with
              established UK security industry standards.
            </p>
            <p className="text-zinc-500 font-medium  text-sm">
              For clients, BS 7499 compliance assures that security operations
              follow structured procedures, meet qualified personnel
              requirements, and are supported by clearly documented assignment
              instructions. Certification also strengthens credibility and
              competitiveness within the UK security services market.
            </p>
          </div>
          <div className="md:w-1/2 relative rounded-[4rem] overflow-hidden shadow-2xl">
            <Image
              src="/t.jpg"
              alt="Security Patrol"
              width={600}
              height={600}
              className="object-cover h-137.5"
            />
          </div>
        </div>
      </section>

      {/* 🔹 4. BS 7499 vs BS 10800 (Comparison) */}
      <section className="py-24 bg-[#12066a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12">
            THE SCOPE <span className="text-[#997819]">DIFFERENCE.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem]">
              <h3 className="text-white font-black text-2xl mb-6">BS 10800</h3>
              <p className="text-blue-100/60 text-sm font-medium leading-relaxed">
                Top-level management framework that oversees all security
                services provided by an organization.
              </p>
            </div>
            <div className="p-12 bg-[#997819] rounded-[3rem] text-white shadow-2xl">
              <h3 className="font-black text-2xl mb-6 uppercase tracking-tighter">
                BS 7499
              </h3>
              <p className="font-black text-sm leading-relaxed italic">
                Specific "On-Ground" operational code of practice specifically
                for static and mobile guarding activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 NEW SECTION: KEY REQUIREMENTS OF BS 7499 */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Context & Title */}
            <FadeIn direction="right">
              <div>
                <h2 className="text-5xl md:text-7xl font-black text-[#12066a] tracking-tighter uppercase leading-none mb-8">
                  KEY <br />
                  <span className="text-[#997819]">REQUIREMENTS.</span>
                </h2>
                <p className="text-zinc-600 font-medium text-lg leading-relaxed mb-6">
                  BS 7499 sets out clear operational requirements for companies
                  providing static guarding services in the UK, ensuring
                  security operations are professionally managed and
                  consistently delivered.
                </p>
                <div className="p-6 border-l-4 border-[#997819] bg-zinc-50 italic text-zinc-500 font-medium">
                  "BizGrow Holdings supports security companies in implementing
                  these standards to achieve effective and compliant manned
                  guarding operations."
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Key Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Assignment Instructions",
                  desc: "Site-specific instructions defining security duties and procedures.",
                  icon: <FileText className="w-6 h-6" />,
                },
                {
                  title: "Personnel Management",
                  desc: "Proper recruitment, vetting, training, and supervision of guards.",
                  icon: <UserCheck className="w-6 h-6" />,
                },
                {
                  title: "Operational Procedures",
                  desc: "Clear processes for site operations and incident reporting.",
                  icon: <ShieldCheck className="w-6 h-6" />,
                },
                {
                  title: "Compliance Monitoring",
                  desc: "Maintaining records and monitoring compliance with BS 7499.",
                  icon: <CheckCircle2 className="w-6 h-6" />,
                },
              ].map((item, index) => (
                <FadeIn key={index} direction="up" delay={index * 0.1}>
                  <div className="h-full bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 hover:border-[#997819]/30 transition-all group hover:shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-[#12066a] text-[#997819] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-[#12066a] uppercase text-xs tracking-widest mb-3">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. OUR AUDIT ROADMAP (Steps) */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-[#12066a] tracking-tighter uppercase leading-none text-center">
              AUDIT <span className="text-[#997819]">PROCESS.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                n: "01",
                t: "Site Survey",
                d: "Reviewing existing Assignment Instructions and site logs.",
              },
              {
                n: "02",
                t: "System Build",
                d: "Standardising patrol routes and emergency protocols.",
              },
              {
                n: "03",
                t: "Training",
                d: "Inducting security staff into BS 7499 operational habits.",
              },
              {
                n: "04",
                t: "Compliance",
                d: "Final audit to ensure every site meets British Standards.",
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

      {/* 🔹 NEW SECTION: BENEFITS OF BS 7499 */}
      <section className="py-32 bg-[#12066a] relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-0 right-0 pointer-events-none select-none">
          <h2 className="text-[12rem] font-black text-white/[0.03] leading-none uppercase tracking-tighter -mr-20">
            Benefits
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs">
                Strategic Advantage
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mt-4">
                Benefits of  <span className="text-[#997819]">BS 7499</span> Certification
              </h2>
              <p className="mt-8 text-blue-100/60 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
                Achieving BS 7499 certification demonstrates that a security
                company operates in line with recognised UK industry standards.
                With expert guidance from **BizGrow Holdings**, you build a
                reputation of authority.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Improved Operational Standards",
                desc: "Establishes clear procedures for managing and delivering professional guarding services across all sites.",
                icon: <ShieldCheck className="w-8 h-8" />,
              },
              {
                title: "Enhanced Client Confidence",
                desc: "Demonstrates reliability and full compliance with recognised UK security standards to your stakeholders.",
                icon: <UserCheck className="w-8 h-8" />,
              },
              {
                title: "Competitive Advantage",
                desc: "Helps security companies stand out with an elite edge when bidding for high-value contracts and tenders.",
                icon: <ArrowUpRight className="w-8 h-8" />,
              },
              {
                title: "Stronger Compliance",
                desc: "Ensures all security operations follow strictly documented processes aligned with BS 7499 requirements.",
                icon: <FileText className="w-8 h-8" />,
              },
            ].map((benefit, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                <div className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#997819]/20 flex items-center justify-center text-[#997819] group-hover:bg-[#12066a] group-hover:text-white transition-all duration-500">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-[#12066a] uppercase tracking-tighter mb-4 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-blue-100/50 group-hover:text-zinc-500 font-medium text-sm leading-relaxed transition-colors">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
 
      {/* 🔹 FINAL SECTION: CERTIFICATION JOURNEY */}
      <section className="py-32 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            {/* Left Content Column */}
            <div className="lg:w-1/2">
              <FadeIn direction="right">
                <h2 className="text-5xl md:text-7xl font-black text-[#12066a] tracking-tighter uppercase leading-[0.9] mb-10">
                  Get Certified <br />
                  <span className="text-[#997819]">With BizGrow.</span>
                </h2>
                <p className="text-zinc-600 font-medium text-lg leading-relaxed mb-8">
                  Achieving BS 7499 certification strengthens the credibility and operational standards of your security company. We provide expert guidance to help organisations implement the necessary processes for compliant static guarding operations.
                </p>
                <p className="text-zinc-500 font-medium text-md leading-relaxed mb-10 border-l-2 border-[#997819] pl-6 italic">
                  "Our team supports security companies throughout the journey—from gap analysis to final audit preparation—ensuring you meet recognised UK security standards with confidence."
                </p>
                
                {/* Micro-Stats or Highlights */}
                <div className="flex gap-10">
                  <div>
                    <h3 className="text-3xl font-black text-[#12066a]">100%</h3>
                    <p className="text-xs uppercase tracking-widest font-bold text-[#997819]">Compliance</p>
                  </div>
                  <div className="w-[1px] bg-zinc-200" />
                  <div>
                    <h3 className="text-3xl font-black text-[#12066a]">Expert</h3>
                    <p className="text-xs uppercase tracking-widest font-bold text-[#997819]">Gap Analysis</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Visual Journey Steps */}
            <div className="lg:w-1/2 w-full">
              <div className="space-y-4">
                {[
                  { 
                    step: "Phase 01", 
                    title: "Gap Analysis", 
                    desc: "Identifying shortcomings in your current static guarding protocols." 
                  },
                  { 
                    step: "Phase 02", 
                    title: "Documentation", 
                    desc: "Developing site-specific Assignment Instructions and core policies." 
                  },
                  { 
                    step: "Phase 03", 
                    title: "Operational Readiness", 
                    desc: "Training personnel and aligning on-ground activities with BS 7499." 
                  },
                  { 
                    step: "Phase 04", 
                    title: "Audit Preparation", 
                    desc: "Final review to ensure your business is ready for UK certification." 
                  }
                ].map((item, idx) => (
                  <FadeIn key={idx} direction="left" delay={idx * 0.1}>
                    <div className="group bg-white p-8 rounded-[2rem] border border-zinc-200 hover:border-[#997819] transition-all duration-500 flex items-center gap-8">
                      <div className="text-4xl font-black text-zinc-100 group-hover:text-[#997819]/20 transition-colors">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#997819]">
                          {item.step}
                        </span>
                        <h3 className="text-[#12066a] font-black uppercase text-sm tracking-tighter mt-1">
                          {item.title}
                        </h3>
                        <p className="text-zinc-500 text-xs mt-2 font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔹 6. FAQs (SEO Boost) */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase md:mb-20 text-center">
            COMMON <span className="text-[#997819]">QUERIES.</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "1. What is BS 7499 certification?",
                a: "BS 7499 is a British Standard for static guarding security services, guiding the management, staffing, and operation of professional security guarding services.",
              },
              {
                q: "2. Who needs BS 7499 certification in the UK?",
                a: "BS 7499 certification is typically required by security companies providing static guarding services, especially those seeking recognised industry standards or working with large commercial clients.",
              },
              {
                q: "3. What does BS 7499 cover?",
                a: "The standard covers key areas such as security personnel management, assignment instructions, operational procedures, and incident reporting for guarding services.",
              },
               {
                q: "4. How can a company achieve BS 7499 certification?",
                a: "A company can achieve BS 7499 certification by implementing the required operational procedures and passing an audit from an approved certification body, often with guidance from compliance consultants like BizGrow Holdings.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:border-[#997819] transition-all group"
              >
                <h3 className="font-black text-[#12066a] uppercase text-sm mb-4 tracking-tighter">
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
              style={{ backgroundImage: "url('/guarding-cta.jpg')" }}
            >
              <div className="absolute inset-0 bg-[#12066a]/85 mix-blend-multiply" />
            </div>

            <div className="relative z-10 p-12 md:p-24 text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter mb-10 uppercase leading-[0.9]">
                STANDARDIZE YOUR <br />
                <span className="text-[#997819]">GUARDING OPERATIONS.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-[#997819] text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-[#12066a] transition-all duration-700 shadow-2xl group flex items-center gap-3">
                  Audit My Operations
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
                <a
                  href="tel:+447898205035"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 transition-all duration-500"
                >
                  <PhoneCall size={18} /> Call Consultant
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
};

export default BS7499Page;

import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Target,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
  HardHat,
  Lock,
  Search,
  BarChart3,
  Cpu,
  ClipboardCheck,
  Award,
  Layers,
  ShieldAlert,
  FileText,
} from "lucide-react";

const ServicesPage = () => {
  const services = [
    {
      title: "SIA ACS Support",
      desc: "SIA ACS accreditation confirms your security company meets high operational and management standards in the UK. It evaluates performance across customer service, workforce management, and compliance systems. ACS approval significantly strengthens credibility when bidding for security contracts and government tenders UK.",
      icon: <ShieldCheck size={30} />,
      bgImage: "/sia-home.jpg", // Security/Audit Vibe
    },
    {
      title: "ISO 9001:2015",
      desc: "ISO 9001 certification establishes a robust Quality Management System (QMS) aligned with UK standards. It improves operational efficiency, customer satisfaction, and business performance management. ISO 9001 is widely recognised across industries and strengthens eligibility for UK tenders and supplier approval.",
      icon: <Award size={30} />,
      bgImage: "/iso-service.jpg", // Office/Quality Vibe
    },
    {
      title: "ISO 14001:2015",
      desc: "ISO 14001 certification establishes an effective Environmental Management System (EMS) in line with UK regulations. It helps organisations manage environmental impact, sustainability goals, and legal compliance. ISO 14001 improves reputation and supports eligibility for environmentally responsible UK contracts.",
      icon: <Globe size={30} />,
      bgImage: "/iso-14001-service.jpg", // Green/Sustainability
    },
    {
      title: "ISO 45001:2018",
      desc: "ISO 45001 provides an internationally recognised framework for occupational health and safety management in the UK. It reduces workplace incidents through structured risk assessment and safety compliance systems. Certification enhances trust with clients, who prioritise HSE compliance and contractor safety standards.",
      icon: <HardHat size={30} />,
      bgImage: "/iso-45001-service.jpg", // Safety/Construction
    },
    {
      title: "Cyber Essentials",
      desc: "Cyber Essentials certification helps UK businesses protect against common cyber threats and demonstrate strong UK cyber security compliance. It supports GDPR compliance, data protection, and IT security standards, reducing the risk of cyber attacks and data breaches. Many organisations require Cyber Essentials to bid for UK government contracts and public sector tenders.",
      icon: <Lock size={30} />,
      bgImage: "/cyber-bg.jpg", // Tech/Cyber
    },
    {
      title: "Cyber Essentials Plus",
      desc: "Cyber Essentials Plus provides independent technical verification of your cybersecurity controls and network security systems. This advanced certification strengthens your data protection, ransomware defence, and cyber risk management. It builds trust with clients, especially for businesses handling sensitive information or supplying the UK public sector.",
      icon: <ShieldCheck size={30} />,
      bgImage: "/cyber-plus-cta.jpg", // Advanced Tech
    },
    {
      title: "ConstructionLine",
      desc: "Constructionline registration validates your compliance for construction and contractor procurement UK. It simplifies pre-qualification processes by verifying health and safety, financial stability, and regulatory compliance. Constructionline membership increases visibility for UK construction tenders and public sector opportunities.",
      icon: <Layers size={30} />,
      bgImage: "/constructionline-service.jpg", // Building/Construction
    },
    {
      title: "CHAS Accreditation",
      desc: "CHAS accreditation demonstrates full health and safety compliance in the UK for contractors and service providers. It verifies your risk assessments, HSE procedures, and contractor competence. Many organisations require CHAS for construction tenders in the UK and government contracts.",
      icon: <ClipboardCheck size={30} />,
      bgImage: "/smas-h.jpg", // Health/Safety
    },
    {
      title: "SafeContractor",
      desc: "SafeContractor approval confirms your organisation meets strict health and safety standards in the UK construction industry. It supports compliance with risk management, workplace safety, and contractor pre-qualification requirements. SafeContractor accreditation improves access to public sector contracts and major UK projects.",
      icon: <CheckCircle2 size={30} />,
      bgImage: "/h.jpg", // Logistics/Compliance
    },
    {
      title: "BS 7858 Vetting",
      desc: "BS7858 screening ensures thorough background checks and employee vetting for UK security companies. It supports SIA compliance, pre-employment screening, and workforce integrity standards. BS7858 vetting is essential for businesses providing security services in the UK and contract guarding.",
      icon: <Search size={30} />,
      bgImage: "/secure.jpg", // Interview/Vetting
    },
    {
      title: "BS 10800",
      desc: "BS 10800 provides a competence framework for security service providers and security company management in the UK. It supports professional development, structured governance, and quality management systems alignment. Certification enhances trust with clients seeking reliable, compliant private security companies in the UK.",
      icon: <FileText size={30} />,
      bgImage: "/guarding-cta.jpg", // Management/Contract
    },
    {
      title: "BS 7499",
      desc: "BS 7499 is the British Standard for static guarding and mobile patrol security services in the UK. It strengthens your operational structure, staff vetting, and SIA compliance requirements. Achieving BS 7499 improves credibility when bidding for security contracts UK and commercial guarding services.",
      icon: <ShieldAlert size={30} />,
      bgImage: "/mobile-patrolling-service.jpg", // Guarding/Patrol
    },
    {
      title: "NASDU Compliance",
      desc: "NASDU compliance ensures your security dog handling services meet recognised UK security industry standards. It supports operational excellence in K9 security services, SIA compliance, and risk management procedures. NASDU approval enhances credibility for security companies working in high-risk environments and contract security in the UK.",
      icon: <ShieldAlert size={30} />,
      bgImage: "/nasdu-cta.jpg", // Dog/Security
    },
    {
      title: "SMAS Worksafe",
      desc: "SMAS Worksafe accreditation demonstrates full health and safety compliance UK for contractors and construction businesses. It verifies your risk assessment procedures, HSE compliance, and safe working practices. Many main contractors and local authorities require SMAS for tender approval and contractor pre-qualification.",
      icon: <Zap size={30} />,
      bgImage: "/smas-service.jpg", // Site/Development
    },
    {
      title: "COP 119",
      desc: "COP119 sets recognised standards for front-line security officers and screening operations in the UK. It strengthens operational procedures, SIA compliance, and service delivery standards. Compliance with COP119 enhances credibility for businesses bidding for security contracts in the UK.",
      icon: <BarChart3 size={30} />,
      bgImage: "/cop-119-service.jpg", // Data/Charts/Security
    },
  ];
  return (
    <main className="bg-white text-zinc-900">
      {/* 🔹 1. HERO SECTION */}
      <section className="relative  h-[95vh] md:h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/h.png"
            alt="BizGrow Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <FadeIn direction="up" duration={1}>
            <h2 className="text-[10rem] md:text-[16rem] font-black text-white/[0.05] leading-none uppercase select-none">
              Services
            </h2>
          </FadeIn>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <FadeIn direction="right">
            <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs md:text-sm">
              Advancing Compliance
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white mt-6 leading-[1.1]">
              Advancing Compliance Standards for
              <span className="text-[#997819]">
                {" "}
                UK <br /> Organisations
              </span>
            </h1>
            <p className="mt-6 text-white/80 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Our team provides expert-led ISO certification support and
              security-focused accreditations, helping your business meet
              regulatory requirements and scale with confidence.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. INTRO PARAGRAPH SECTION */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:text-center">
          <FadeIn direction="up">
            <h2 className="text-5xl md:text-6xl font-black text-[#12066a] mb-8 tracking-tighter">
              Professional and dedicated consulting services
            </h2>
            <p className="text-zinc-600 text-lg  leading-relaxed font-medium">
              At BizGrow Holdings, we support private security and associated
              businesses in navigating compliance, accreditation, and
              certification frameworks that strengthen credibility, improve
              efficiency, and open doors to new opportunities. Whether it’s
              attaining international ISO standards or gaining nationally
              recognised industry accreditations such as ACS, CHAS, and
              SafeContractor, we provide tailored experience and expertise to
              meet your organisation’s unique requirements. Our Purpose is to
              ensure you remain fully compliant with regulations, win contracts
              with confidence, and achieve sustainable growth in a highly
              competitive marketplace.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 3. SERVICES GRID (Compact Luxury with Continuous Icon Spin) */}
      <section className="pb-6 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className="group relative h-[400px] rounded-[3rem] overflow-hidden bg-[#12066a] transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(18,6,106,0.4)]">
                  {/* 1. Background Image with Cinematic Motion */}
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-[1.5s] ease-in-out group-hover:scale-125 group-hover:rotate-2 opacity-50 group-hover:opacity-30"
                    style={{
                      backgroundImage: `url(${
                        service.bgImage || "/service-bg.jpg"
                      })`,
                    }}
                  />

                  {/* 2. Moving Watermark Text (Premium Detail) */}
                  <div className="absolute top-8 left-8 pointer-events-none z-10 overflow-hidden">
                    <h4 className="text-[4rem] font-black text-white/[0.08] uppercase leading-none tracking-tighter transition-transform duration-1000 group-hover:-translate-y-2 group-hover:text-[#997819]/50">
                      {service.title.split(" ")[0]}
                    </h4>
                  </div>

                  {/* 3. Gradient Overlay */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#12066a] via-[#12066a]/40 to-transparent" />

                  {/* 4. Content Layer */}
                  <div className="relative z-30 h-full p-10 flex flex-col justify-end">
                    {/* --- CONTINUOUS SPINNING ICON RING --- */}
                    <div className="absolute top-10 right-10">
                      <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 group-hover:border-[#997819] group-hover:bg-[#997819]/20 shadow-2xl">
                        {/* The Continuous Loading Ring (Visible 24/7) */}
                        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#997819] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 group-hover:animate-[spin_1.5s_linear_infinite] transition-all duration-500" />

                        {/* Icon Container */}
                        <div className="relative z-10 text-[#997819] group-hover:scale-110 transition-transform duration-500">
                          {React.cloneElement(service.icon, { size: 24 })}
                        </div>
                      </div>
                    </div>

                    {/* Text Content Area */}
                    <div className="transition-transform duration-500 group-hover:-translate-y-4">
                      <span className="text-[#997819] font-black text-[9px] tracking-[0.5em] uppercase mb-3 block opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                        Advanced Audit
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tighter uppercase leading-[0.9]">
                        {service.title}
                      </h3>
                      <p className="text-blue-100/50 font-medium leading-relaxed text-sm line-clamp-2 group-hover:text-white/80 transition-all duration-500">
                        {service.desc}
                      </p>
                    </div>

                    {/* Luxury Footer (Glassmorphism revealed on hover) */}
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
                      <button className="flex items-center gap-3 text-white font-black text-[9px] uppercase tracking-[0.3em] group/btn">
                        <span className="group-hover/btn:text-[#997819] transition-colors">
                          Read More
                        </span>
                        <div className="w-8 h-[1px] bg-[#997819] group-hover/btn:w-12 transition-all duration-500" />
                      </button>

                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#997819] text-white shadow-[0_0_20px_rgba(153,120,25,0.4)]">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Subtle Interactive Glow at bottom */}
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#997819]/10 rounded-full blur-[100px] group-hover:bottom-0 group-hover:left-0 transition-all duration-1000 opacity-0 group-hover:opacity-100" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. METHODOLOGY (Bonus Section for Length & Authority) */}
      <section className="py-22 bg-white/40 text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="left">
              <h2 className="text-5xl md:text-6xl text-[#12066a] font-black mb-8 leading-tight tracking-tighter ">
                Our Proven <br />{" "}
                <span className="text-[#997819]">Methodology</span>
              </h2>
              <p className="text-black text-lg mb-12 font-medium">
                We apply a disciplined four-stage framework to ensure every
                client progresses confidently and successfully through their
                certification and compliance journey.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    t: "Compliance Gap Review",
                    d: "We identify exactly what your business is missing to meet standards.",
                  },
                  {
                    step: "02",
                    t: "Framework & System Development",
                    d: "We create custom policies that fit your actual workflow.",
                  },
                  {
                    step: "03",
                    t: "Practical Implementation",
                    d: "We help your team adopt new standards with zero downtime.",
                  },
                  {
                    step: "04",
                    t: "Internal Audit & Readiness Check",
                    d: "We run a 'mock audit' to guarantee success before the final inspection.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-6 border-l border-white/10 pl-6"
                  >
                    <span className="text-[#997819] font-black text-xl">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.t}</h4>
                      <p className="text-black text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="relative aspect-square bg-[#0a0a0a] rounded-[4rem] overflow-hidden border border-white/5">
                <Image
                  src="/methodology.jpg"
                  alt="Compliance Process"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#997819] p-10 rounded-full animate-pulse">
                    <ShieldCheck size={60} className="text-white" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 5. IMPACT STATEMENT (Call to Action) */}
      <section className="py-12 text-center relative bg-white/30 overflow-hidden">
        {/* Large Background Watermark Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <h2 className="text-[10rem] md:text-[16rem] font-black uppercase">
            BizGrow
          </h2>
        </div>

        <FadeIn direction="up">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-[#12066a] mb-8  tracking-tighter">
              Turning Vision Into
              <span className="text-[#997819]">Execution.</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Join BizGrow Holdings in redefining the future of your
              organisation. Our mission is your growth, and our vision is your
              success.
            </p>
            <button className="px-12 py-5 bg-[#12066a] text-white font-black uppercase tracking-widest hover:bg-[#997819] hover:scale-105 duration-500 transition-all rounded-2xl flex items-center gap-3 mx-auto shadow-xl">
              Connect With Our Team <ArrowRight size={20} />
            </button>
          </div>
        </FadeIn>
      </section>
    </main>
  );
};

export default ServicesPage;

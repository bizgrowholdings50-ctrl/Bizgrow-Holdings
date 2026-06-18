import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import JsonLd from "@/components/JsonLd";
import { itServicesSchema } from "@/lib/jsonSchemas";
import {
  CheckCircle2,
  Zap,
  FileBadge,
  Clock,
  ShieldCheck,
  ClipboardList,
  BarChart3,
  Building2,
  Wrench,
  Laptop,
  Lock,
  Cloud,
  Users,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Managed IT Services UK | Cyber Security & IT Support",
  description:
    "Secure managed IT services, cyber security, Microsoft 365 & IT support solutions for UK businesses and organisations.",
};

const ITServicesPage = () => {
  return (
    <>
      <JsonLd schema={itServicesSchema} />
      <main className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* 🔹 1. HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#12066a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/it-hero.jpg"
            alt="Secure Managed IT Services UK"
            fill
            className="object-cover opacity-30 brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/40 to-transparent z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8">
                <Zap className="text-yellow-400 animate-pulse" size={16} />
                <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">
                  Securely Managed IT Infrastructure
                </span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
                IT Services <br />
                <span className="text-[#997819]">& Solutions.</span>
              </h1>

              <p className="mt-10 text-blue-100/70 text-xl max-w-3xl font-medium leading-relaxed italic">
                Empowering Public Sector, Corporate Organisations, SMEs &
                Academic Institutions with Securely Managed IT Services
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. VALUE PROPOSITION (Why Choose BizGrow) */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-3 block">
                Core Pillars
              </span>
              <h2 className="text-4xl font-black text-[#12066a] uppercase">
                Why Choose BizGrow?
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                t: "Trusted IT Partner",
                d: "BizGrow provides reliable, scalable, and security-focused IT services for organisations across the UK.",
                icon: <Building2 />,
              },
              {
                t: "Responsive Support",
                d: "We deliver proactive and responsive support to minimise operational disruption and maximise productivity.",
                icon: <Clock />,
              },
              {
                t: "Security Focused",
                d: "Cyber security and compliance are integrated into every service we deliver.",
                icon: <Lock />,
              },
              {
                t: "Microsoft 365 Specialists",
                d: "Our experienced team supports organisations in deploying, managing, and securing Microsoft cloud solutions.",
                icon: <Cloud />,
              },
              {
                t: "Public Sector Understanding",
                d: "We understand the operational expectations and compliance requirements of councils and public organisations.",
                icon: <FileBadge />,
              },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {/* Staggered card appearance */}
                <FadeIn direction="up" delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center group bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-[#997819] mb-4 group-hover:bg-[#12066a] group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-black text-[#12066a] uppercase mb-2">
                      {item.t}
                    </h3>
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 3. HARDWARE PROCUREMENT (Blueprint Split Layout) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative">
              <FadeIn direction="right">
                <div className="absolute -inset-4 bg-zinc-100 rounded-[4rem] -rotate-3" />
                <div className="relative rounded-[4rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                  <Image
                    src="/it-procurement.jpg"
                    width={600}
                    height={700}
                    alt="BizGrow - Trusted Business Hardware Partner"
                    className="object-cover h-[520px]"
                  />
                </div>
              </FadeIn>
            </div>

            <div className="lg:w-1/2">
              <FadeIn direction="left">
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6 block">
                  Equipment Supply & Procurement
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none uppercase">
                  Trusted Business <br />
                  <span className="text-[#997819]">Hardware Partner</span>
                </h2>
                <div className="py-4 space-y-4 text-zinc-600 font-medium leading-relaxed">
                  <p>
                    BizGrow provides professional IT services, managed support
                    solutions, cyber security, and Microsoft 365 management for
                    public sector organisations, councils, charities, SMEs,
                    academic institutions, and corporate businesses across the
                    UK. As a registered UK business working with government and
                    corporate sector organisations, we deliver reliable, secure,
                    and scalable IT solutions tailored to operational
                    requirements, compliance standards, and business continuity.
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Our team combines proactive IT management, responsive
                    technical support, cyber security expertise, and Microsoft
                    cloud solutions to help organisations operate efficiently,
                    securely, and confidently.
                  </p>
                  <p className="text-zinc-900 font-bold text-sm bg-zinc-50 p-4 rounded-2xl border-l-2 border-[#997819]">
                    BizGrow is not only an IT services provider — we are also a
                    trusted supplier of business IT equipment and technology
                    solutions for organisations across the UK. We supply
                    reliable, cost-effective, and business-ready technology
                    solutions tailored to your operational needs, budget, and
                    long-term goals.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 4. PROCUREMENT DIRECTORY CARD GRID */}
      <section className="py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-3 block">
                IT Equipment We Supply
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase">
                Hardware &{" "}
                <span className="text-[#997819]">Tech Directory</span>
              </h2>
              <p className="text-zinc-500 max-w-4xl mx-auto font-medium mt-4 text-sm">
                Whether you require a single device or a complete IT
                infrastructure solution, BizGrow delivers dependable technology
                solutions with professional support and setup services.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Box 1 */}
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm h-full">
                <div className="text-[#997819] mb-4">
                  <Laptop size={28} />
                </div>
                <h3 className="font-black text-[#12066a] text-lg uppercase mb-4 border-b pb-2 border-zinc-100">
                  Business Devices & Hardware
                </h3>
                <ul className="space-y-2 text-zinc-500 text-sm font-medium">
                  <li>• Business laptops</li>
                  <li>• Desktop computers</li>
                  <li>• Workstations</li>
                  <li>• Monitors and accessories</li>
                  <li>• Docking stations</li>
                  <li>• Business printers and scanners</li>
                  <li>• Networking equipment</li>
                  <li>• Wi-Fi solutions</li>
                  <li>• Servers and storage solutions</li>
                  <li>• Mobile devices and tablets</li>
                  <li>• Conference room equipment</li>
                </ul>
              </div>
            </FadeIn>

            {/* Box 2 */}
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm h-full">
                <div className="text-[#997819] mb-4">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-black text-[#12066a] text-lg uppercase mb-4 border-b pb-2 border-zinc-100">
                  Security & Access Solutions
                </h3>
                <ul className="space-y-2 text-zinc-500 text-sm font-medium">
                  <li>• RFID cards</li>
                  <li>• Smart access cards</li>
                  <li>• Card readers</li>
                  <li>• Access control systems</li>
                  <li>• Visitor management systems</li>
                  <li>• Secure authentication devices</li>
                  <li>• Endpoint security hardware</li>
                </ul>
              </div>
            </FadeIn>

            {/* Box 3 */}
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm h-full">
                <div className="text-[#997819] mb-4">
                  <Wrench size={28} />
                </div>
                <h3 className="font-black text-[#12066a] text-lg uppercase mb-4 border-b pb-2 border-zinc-100">
                  Office & Operational Technology
                </h3>
                <ul className="space-y-2 text-zinc-500 text-sm font-medium">
                  <li>• CCTV solutions</li>
                  <li>• Backup devices</li>
                  <li>• UPS power systems</li>
                  <li>• VoIP phones</li>
                  <li>• Audio visual equipment</li>
                  <li>• Educational IT equipment</li>
                  <li>• SME business technology packages</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 5. MANAGED IT PROVISION (Core Audit Style Coverage Grid) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-5xl md:text-7xl font-black text-[#12066a] tracking-tighter leading-none uppercase">
                Fully Managed <span className="text-[#997819]">IT Support</span>
              </h2>
              <p className="text-zinc-500 max-w-4xl mx-auto font-medium mt-6 text-sm md:text-[15px]">
                BizGrow delivers comprehensive managed IT support services
                designed to minimise downtime, improve productivity, and
                maintain secure business operations. We provide responsive
                support services for organisations requiring dependable
                day-to-day IT operations with proactive maintenance and ongoing
                technical guidance.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Remote and onsite IT support",
              "Desktop and laptop support",
              "Microsoft 365 administration and management",
              "Helpdesk and user support",
              "Device monitoring and maintenance",
              "Software installation and patch management",
              "Network and connectivity support",
              "IT asset management",
              "Printer and peripheral support",
              "IT account management and reporting",
              "Business continuity planning",
              "Disaster recovery support",
            ].map((text, i) => (
              <React.Fragment key={i}>
                <FadeIn direction="up" delay={(i % 3) * 0.05}>
                  <div className="p-6 border border-zinc-100 rounded-[2rem] hover:bg-zinc-50 transition-colors flex items-center gap-6 group h-full">
                    <CheckCircle2 className="text-zinc-200 group-hover:text-[#997819] transition-colors shrink-0" />
                    <span className="font-bold text-[#12066a] uppercase text-xs tracking-tight">
                      {text}
                    </span>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 6. MICROSOFT 365 SECTION */}
      <section className="py-22 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <FadeIn direction="right">
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6 block">
                  Cloud Ecosystems
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none uppercase">
                  Microsoft 365 <br />
                  <span className="text-[#997819]">& Cloud Solutions</span>
                </h2>
                <p className="py-4 text-zinc-600 leading-relaxed font-medium">
                  BizGrow specialises in Microsoft 365 deployment,
                  administration, security, and ongoing support. Our specialists
                  ensure organisations maximise the value of Microsoft cloud
                  services while maintaining security, productivity, and
                  <Link
                    href="/compliance-consultancies/"
                    className="text-[#997819] ml-1 hover:underline font-bold"
                  >
                    compliance
                  </Link>
                  .
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Microsoft 365 Business Premium",
                    "Microsoft 365 Business Basic",
                    "Microsoft 365 Enterprise Solutions",
                    "Microsoft Teams setup and support",
                    "SharePoint management",
                    "Exchange Online administration",
                    "Email migration services",
                    "User account management",
                    "Multi-factor authentication setup",
                    "Microsoft Intune device management",
                    "Microsoft 365 backup solutions",
                    "Email security and compliance",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-zinc-500"
                    >
                      <span className="text-[#997819]">•</span> {item}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="lg:w-1/2 relative">
              <FadeIn direction="left">
                <div className="absolute -inset-4 bg-zinc-200 rounded-[4rem] -rotate-3" />
                <div className="relative rounded-[4rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                  <Image
                    src="/m365-security.jpg"
                    width={600}
                    height={700}
                    alt="Microsoft 365 & Cloud Solutions"
                    className="object-cover h-[500px]"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 7. DATA BAR (Impact Metrics) */}
      <section className="py-20 bg-[#12066a] mx-6 rounded-[3rem]">
        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { n: "Secure", t: "M365 Cloud Deployments" },
            { n: "UK Wide", t: "Hardware Procurement Logistics" },
            { n: "Compliant", t: "Cyber Essentials Support" },
            { n: "100%", t: "Transparent Ethical Pricing" },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              <FadeIn direction="up" delay={i * 0.1}>
                <div className="text-center">
                  <span className="text-4xl font-black text-white block mb-2 tracking-tighter uppercase">
                    {stat.n}
                  </span>
                  <span className="text-[#997819] font-black uppercase text-[10px] tracking-widest">
                    {stat.t}
                  </span>
                </div>
              </FadeIn>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 🔹 8. CYBER SECURITY STRATEGY PANEL */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeIn direction="right">
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6 block">
                  Cyber Essentials Support & Compliance
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter leading-none mb-6 uppercase">
                  Strengthening UK <br />
                  <span className="text-[#997819]">Cyber Resilience</span>
                </h2>
                <p className="mb-8 text-zinc-600 font-medium leading-relaxed">
                  BizGrow supports organisations with{" "}
                  <Link
                    href="/cyber-essentials/"
                    className="text-[#997819] mr-1 hover:underline font-bold"
                  >
                    Cyber Essentials
                  </Link>
                  readiness, cyber security management, and best-practice
                  implementation. We help organisations strengthen cyber
                  resilience by implementing practical security controls,
                  endpoint protection, user security policies, and monitoring
                  solutions aligned with UK cyber security standards. Our
                  approach is designed to help organisations reduce risk,
                  improve compliance, and protect operational systems and
                  sensitive information.
                </p>
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
                  <h3 className="text-[#12066a] font-black uppercase text-xs tracking-wider">
                    Cyber Security Services Include:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Cyber Essentials readiness support",
                      "Endpoint security management",
                      "Business antivirus protection",
                      "Mobile device security",
                      "Security monitoring and reporting",
                      "Multi-factor authentication implementation",
                      "Email threat protection",
                      "Microsoft Defender management",
                      "Device compliance policies",
                      "Data protection and backup management",
                      "Security awareness guidance",
                      "Vulnerability management",
                      "Access control management",
                    ].map((service, i) => (
                      <div
                        key={i}
                        className="flex gap-2 items-start text-xs font-medium text-zinc-500"
                      >
                        <span className="text-[#997819] font-bold">✓</span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn direction="left">
              <div className="relative h-[550px] bg-zinc-900 rounded-[4rem] overflow-hidden group">
                <Image
                  src="/cyber-security-panel.jpg"
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s]"
                  alt="BizGrow - Cybersecurity Management"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 8.5 ENDPOINT PROTECTION & BACKUP MATRICES */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Endpoint protection side */}
          <FadeIn direction="right">
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm h-full">
              <h3 className="font-black text-xl uppercase mb-3 text-[#997819]">
                Managed Endpoint & Device Security
              </h3>
              <p className="text-zinc-500 text-sm mb-6 font-medium leading-relaxed">
                BizGrow provides endpoint protection and device management
                solutions for desktop, laptop, and mobile environments. We help
                organisations maintain secure and compliant endpoints across
                office-based, remote, and hybrid working environments.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-zinc-500">
                {[
                  "Desktop and laptop monitoring",
                  "Antivirus deployment and management",
                  "Mobile device support",
                  "Mobile device security",
                  "Remote device management",
                  "Device compliance monitoring",
                  "User access management",
                  "Patch and update management",
                  "Device encryption support",
                  "Endpoint threat response",
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <span className="text-[#12066a]">•</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Backup / Business continuity side */}
          <FadeIn direction="left">
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200/60 shadow-sm h-full">
              <h3 className="font-black text-xl uppercase mb-3 text-[#997819]">
                M365 Backup & Continuity
              </h3>
              <p className="text-zinc-500 text-sm mb-6 font-medium leading-relaxed">
                Protecting organisational data is essential for operational
                continuity and compliance. BizGrow delivers secure Microsoft 365
                backup solutions designed to safeguard emails, SharePoint data,
                Teams data, OneDrive files, and user accounts. Our solutions
                help organisations recover quickly from accidental deletion,
                ransomware incidents, or unexpected data loss.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-zinc-500">
                {[
                  "Microsoft 365 backup management",
                  "Cloud data protection",
                  "Email backup and recovery",
                  "SharePoint and Teams backup",
                  "OneDrive backup solutions",
                  "Business continuity planning",
                  "Disaster recovery support",
                  "Backup monitoring and reporting",
                  "Secure data retention management",
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <span className="text-[#12066a]">•</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 9. PUBLIC SECTOR & TARGET INDUSTRIES */}
      <section className="py-22 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-16 items-start mb-16">
            <div className="lg:col-span-1">
              <FadeIn direction="right">
                <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                  Sector Alignment
                </span>
                <h2 className="text-4xl font-black text-[#12066a] tracking-tighter uppercase leading-tight">
                  Public Sector <br />
                  <span className="text-[#997819]">IT Services</span>
                </h2>
                <p className="text-zinc-500 font-medium text-sm mt-4 leading-relaxed">
                  BizGrow works with councils, public sector organisations,
                  SMEs, academic institutions, educational providers, and
                  community organisations requiring secure, responsive, and
                  accountable IT services. We understand the operational,
                  security, and compliance requirements associated with public
                  sector IT environments and deliver professional support
                  tailored to organisational needs.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-2 bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100">
              <FadeIn direction="left">
                <h3 className="font-black text-xs uppercase tracking-widest text-[#12066a] mb-6">
                  Public Sector Support Capabilities:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-bold text-[#12066a]">
                  {[
                    "Local authority IT support",
                    "Microsoft 365 administration",
                    "Public sector cyber security support",
                    "Managed antivirus and endpoint protection",
                    "User and device management",
                    "Helpdesk support services",
                    "Backup and disaster recovery management",
                    "Account management and reporting",
                    "Secure remote working solutions",
                    "IT infrastructure support",
                  ].map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-200/50"
                    >
                      <CheckCircle2 size={16} className="text-[#997819]" />
                      <span className="uppercase text-xs">{cap}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-zinc-600 italic mt-4">
                  Our team is committed to providing dependable support,
                  proactive communication, and long-term IT partnership
                  services.
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-16">
            <FadeIn direction="up">
              <h3 className="text-center text-3xl font-black text-[#12066a] uppercase mb-12">
                Industries We Support
              </h3>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Local Authorities",
                  desc: "Councils and regional administrative structures.",
                  icon: <Building2 size={32} />,
                },
                {
                  title: "Public Sector Organisations",
                  desc: "Governmental groups demanding high-end data security transparency.",
                  icon: <FileBadge size={32} />,
                },
                {
                  title: "Charities & Community Organisations",
                  desc: "Community organizations and trust frameworks.",
                  icon: <Users size={32} />,
                },
                {
                  title: "SMEs & Corporate Businesses",
                  desc: "Rapidly expanding commercial firms optimizing assets.",
                  icon: <BarChart3 size={32} />,
                },
                {
                  title: "Academic Institutions & Training Providers",
                  desc: "Schools, universities, and technical training facilities.",
                  icon: <Laptop size={32} />,
                },
                {
                  title: "Education Providers",
                  desc: "Regulated learning operations optimizing data frameworks.",
                  icon: <ClipboardList size={32} />,
                },
                {
                  title: "Professional Services",
                  desc: "Regulated environments requiring extreme data protection.",
                  icon: <ShieldCheck size={32} />,
                },
                {
                  title: "Healthcare & Care Organisations",
                  desc: "Care institutions requiring high uptime and compliance.",
                  icon: <CheckCircle2 size={32} />,
                },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <FadeIn direction="up" delay={(i % 4) * 0.08}>
                    <div className="group p-8 bg-white border border-zinc-200 rounded-[2.5rem] hover:bg-[#12066a] transition-all duration-500 h-full">
                      <div className="text-[#997819] group-hover:text-white mb-6 transition-colors duration-500">
                        {item.icon}
                      </div>
                      <h3 className="text-base font-black text-[#12066a] group-hover:text-white uppercase mb-3 transition-colors duration-500">
                        {item.title}
                      </h3>
                      <p className="text-zinc-500 group-hover:text-zinc-200 text-xs font-medium leading-relaxed transition-colors duration-500">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 9.5 EXAMPLES+ CONTRACT PROVISION FRAMEWORK */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <FadeIn direction="up">
              <h3 className="text-3xl font-black text-[#12066a] uppercase">
                Example Managed IT Service Provision
              </h3>
              <p className="text-xs text-zinc-500 mt-2">
                BizGrow is capable of delivering fully managed IT support
                contracts that include:
              </p>
            </FadeIn>
          </div>
          <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold text-[#12066a]">
            {[
              "IT support for desktop and laptop workstations",
              "Business antivirus protection",
              "Microsoft 365 Business Premium licensing",
              "Microsoft 365 Business Basic licensing",
              "Microsoft 365 Enterprise licensing",
              "Email signature management",
              "Mobile device support and security",
              "Microsoft 365 backup management",
              "Cyber security management",
              "User support services",
              "Endpoint security",
              "Account management",
              "Proactive monitoring and maintenance",
            ].map((element, index) => (
              <React.Fragment key={index}>
                <FadeIn direction="up" delay={(index % 3) * 0.05}>
                  <div className="flex gap-2 items-center bg-zinc-50/50 p-3 rounded-xl border border-zinc-100 h-full">
                    <span className="text-[#997819] font-black">▪</span>
                    <span className="uppercase tracking-tight text-[11px]">
                      {element}
                    </span>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-400 italic mt-6">
            Our services are designed to support secure, productive, and
            resilient operations for organisations of all sizes.
          </p>
        </div>
      </section>

      {/* 🔹 10. ETHICAL BUSINESS STANDARDS & CTA */}
      <section className="py-22 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* LEFT SIDE */}
            <div className="w-full">
              <FadeIn direction="right">
                <span className="text-[#997819] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs mb-4 block">
                  Ethical Commitments
                </span>
                {/* Heading choti ki hai mobile ke liye */}
                <h2 className="text-3xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-[1.1] mb-6 md:mb-10 uppercase">
                  Affordable, Professional <br />
                  <span className="text-[#997819]">& Ethical IT Solutions</span>
                </h2>

                {/* BREAK-WORDS ADD KIYA HAI TAAKE TEXT BAAHAR NA NIKLE */}
                <div className="text-zinc-600 text-sm font-medium leading-relaxed space-y-4 mb-8 break-words max-w-full">
                  <p>
                    At{" "}
                    <Link
                      href="/"
                      className="text-[#997819] hover:underline font-bold"
                    >
                      BizGrow
                    </Link>
                    , we believe that professional IT services and business
                    technology solutions should be secure, reliable,
                    cost-effective, and delivered with complete transparency.
                  </p>
                  <p>
                    We are a VAT-registered UK company providing managed IT
                    service ecosystems engineered carefully around corporate
                    guidelines, avoiding hidden premiums or sudden hardware
                    installation surge pricing structures.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT SIDE (CTA) */}
            <div className="bg-[#12066a] p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] text-white relative shadow-xl w-full">
              <FadeIn direction="left">
                <span className="text-[#997819] font-black uppercase tracking-[0.2em] text-[10px] block mb-4">
                  Partner With Us Today
                </span>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 leading-tight">
                  Ready to Secure Your Infrastructure?
                </h3>
                <p className="text-blue-100/70 text-sm font-medium mb-8 leading-relaxed break-words">
                  Get in touch with our British operations compliance office
                  today to schedule a structural security assessment or setup
                  customized equipment contracts.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-between bg-white text-[#12066a] font-black uppercase text-xs tracking-wider px-6 py-4 rounded-2xl w-full sm:w-auto gap-4 group hover:bg-[#997819] hover:text-white transition-all duration-300 shadow-lg text-center"
                >
                  <span>Request an IT Consultation</span>
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0"
                  />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default ITServicesPage;

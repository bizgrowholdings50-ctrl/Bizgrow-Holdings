"use client";

import { ShieldCheck, Award, FileText, Lock } from "lucide-react";

const ServicesGrid = () => {
  const sections = [
    {
      id: "01",
      title: "Security Accreditation",
      description:
        "Build credibility, strengthen your operational compliance, and meet recognised UK security benchmarks through SIA ACS Approved Contractor Schemes, BS 7858 Vetting & Screening, and comprehensive private security alignment.",
      icon: ShieldCheck,
    },
    {
      id: "02",
      title: "Quality & Management",
      description:
        "Implement structured management systems that improve consistency, corporate performance, and business confidence via ISO 9001 Quality Management, ISO 14001 Environmental Standards, and ISO 45001 Occupational Health & Safety.",
      icon: Award,
    },
    {
      id: "03",
      title: "Health & Safety",
      description:
        "Strengthen contractor credentials and prepare your organisation for elite, verified UK safety accreditations, including CHAS, SafeContractor verification, and Constructionline PQQ preparation.",
      icon: FileText,
    },
    {
      id: "04",
      title: "Cyber Security",
      description:
        "Demonstrate rigorous digital resilience and ensure your organisation protects sensitive data against modern threats with Cyber Essentials setup, Cyber Essentials Plus certification, and dedicated security controls.",
      icon: Lock,
    },
  ];

  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          

          <h2 className="text-[#12066a] text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mt-3 mb-4">
            What We <span className="text-[#997819]">Deliver</span>
          </h2>

          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Engineering-led services that transform compliance from a burden
            into a competitive advantage.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((item) => {
            const MainIcon = item.icon;

            return (
              <div
                key={item.id}
                className="group relative bg-[#12066a] rounded-[2rem] p-7 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgba(18,6,106,0.4)] transition-all duration-500"
              >
                {/* Top row: Icon + Number */}
                <div className="flex items-center justify-between mb-4">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#997819] group-hover:bg-[#997819]/10 group-hover:border-[#997819]/50 transition-all duration-300">
                    <MainIcon size={20} strokeWidth={1.8} />
                  </div>

                  {/* Number badge */}
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-[11px] font-bold">
                    {item.id}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white text-lg font-bold tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-blue-100/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
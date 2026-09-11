"use client";

import {
  ShieldCheck,
  Award,
  Globe,
  HardHat,
  Lock,
  Layers,
  ClipboardCheck,
  CheckCircle2,
  Search,
  FileText,
  ShieldAlert,
  Zap,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const ServicesGrid = () => {
  const services = [
    {
      title: "SIA ACS Support",
      desc: "This accreditation shows your security business runs properly, with real systems behind it. It's a nationally recognised UK standard, checking how well you manage staff, service quality, and daily compliance. Having it makes a real difference when bidding for bigger contracts.",
      icon: <ShieldCheck size={24} />,
      href: "/our-services/sia-acs",
    },
    {
      title: "ISO 9001:2015",
      desc: "This certification helps you build a system that actually improves how your business runs. It's not just paperwork; it leads to better efficiency and happier clients. Most UK industries recognise and expect this standard.",
      icon: <Award size={24} />,
      href: "/our-services/iso-9001",
    },
    {
      title: "ISO 14001:2015",
      desc: "This certification helps you manage your environmental impact properly and legally. It shows clients you take sustainability seriously, not just as a checkbox. More UK contracts now expect this as standard.",
      icon: <Globe size={24} />,
      href: "/our-services/iso-14001",
    },
    {
      title: "ISO 45001:2018",
      desc: "This certification focuses on keeping your workforce genuinely safe at work. It gives you a proper system for spotting and managing risks early. Clients in safety-conscious industries actively look for it.",
      icon: <HardHat size={24} />,
      href: "/our-services/iso-45001",
    },
    {
      title: "BS 10119",
      desc: "This new standard, introduced by BSI on 30 June 2026, covers how businesses supply and manage security labour. It matters most if you bring in extra staff for larger contracts. It gives clients real confidence in your supplier's staff.",
      icon: <ShieldCheck size={24} />,
      href: "/our-services/bs-10119",
    },
    {
      title: "COP 119",
      desc: "This standard sets clear expectations for front-line security staff. It's remained part of the industry's compliance backbone for years. Many businesses still maintain it today.",
      icon: <BarChart3 size={24} />,
      href: "/our-services/cop-119-labour-provision",
    },
    {
      title: "Cyber Essentials",
      desc: "This certification protects your business from the most common cyber threats. It's now a baseline requirement for many UK government contracts. The process stays practical, not overly technical.",
      icon: <Lock size={24} />,
      href: "/our-services/cyber-essentials",
    },
    {
      title: "Cyber Essentials Plus",
      desc: "This certification goes further, with real experts testing your systems directly. It's not just a self-assessment; your security actually gets verified. Public sector clients often ask for this specifically.",
      icon: <ShieldCheck size={24} />,
      href: "/our-services/cyber-essentials-plus",
    },
    {
      title: "Constructionline",
      desc: "This membership simplifies how clients check your safety, finances, and compliance. It saves you from repeating the same paperwork for every tender. Most principal contractors expect to see it.",
      icon: <Layers size={24} />,
      href: "/our-services/constructionline",
    },
    {
      title: "CHAS Accreditation",
      desc: "This accreditation proves your health and safety systems genuinely work. It's one of the most requested accreditations in UK tenders. Without it, many public sector opportunities stay closed.",
      icon: <ClipboardCheck size={24} />,
      href: "/our-services/chas-scheme",
    },
    {
      title: "SafeContractor",
      desc: "This accreditation shows your construction business takes safety seriously in practice. It checks your risk management against real, practical standards. Facilities management clients especially value seeing it.",
      icon: <CheckCircle2 size={24} />,
      href: "/our-services/safe-contractor",
    },
    {
      title: "BS 7858 Vetting",
      desc: "This standard makes sure every security officer is properly background-checked. Most serious security contracts expect this as a basic requirement. Skipping it puts client trust at real risk.",
      icon: <Search size={24} />,
      href: "/our-services/bs7858-screening-vetting",
    },
    {
      title: "BS 10800",
      desc: "This certification focuses on how well your business is actually managed. It reassures clients that your leadership team knows what they're doing. It signals long-term operational maturity.",
      icon: <FileText size={24} />,
      href: "/our-services/bs-10800",
    },
    {
      title: "BS 7499",
      desc: "This standard sets the bar for static guarding and mobile patrol work. It looks closely at staff vetting and daily operations. More contracts now list it as a specific requirement.",
      icon: <ShieldAlert size={24} />,
      href: "/our-services/bs-7499",
    },
    {
      title: "NASDU Compliance",
      desc: "This compliance matters if your business runs security dog operations. It confirms your K9 teams meet proper training and welfare standards. High-risk sites often ask for this specifically.",
      icon: <ShieldAlert size={24} />,
      href: "/our-services/nasdu",
    },
    {
      title: "SMAS Worksafe",
      desc: "This accreditation verifies your construction business follows proper safety practices. Local authorities and main contractors often require it for tenders. It simplifies pre-qualification across multiple clients.",
      icon: <Zap size={24} />,
      href: "/our-services/smas-accreditation",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[#12066a] text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mt-3 mb-4 normal-case">
            Services We  <span className="text-[#997819]">Provide</span>
          </h2>

          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We help businesses turn compliance from a burden into an advantage —
            with services built for real audits and certifications, not just
            paperwork.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            return (
              <div
                key={item.title}
                className="group relative bg-white border border-[#12066a]/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-[#12066a]/5  hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Top Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#12066a]/5 border border-[#12066a]/10 flex items-center justify-center text-[#997819] mb-6">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-[#12066a] text-lg font-bold tracking-tight mb-3 normal-case">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div>
                  {/* Read More Button */}
                  <Link
                    href={item.href}
                    className="w-full bg-[#12066a] hover:bg-[#997819] text-white py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 group/btn"
                  >
                    <span>Read More</span>
                    <span className="text-base font-normal group-hover/btn:rotate-90 transition-transform duration-300">
                      +
                    </span>
                  </Link>
                </div>

                {/* Center-expanding Bottom Line Effect */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#997819] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
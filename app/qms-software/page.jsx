import React from "react";
import FadeIn from "@/components/MotionWrapper";
import {
  CheckCircle2,
  ShieldCheck,
  FileText,
  BarChart3,
  Search,
  Settings2,
  ArrowRight,
} from "lucide-react";
export const metadata = {
  title: "UK QMS Software by BizGrow | ISO Compliance Made Easy",
  description:
    "Simplify ISO compliance with BizGrow QMS software. Manage audits, documents, and quality systems for UK businesses.",
};

const QMSPage = () => {
  return (
    <main className="bg-[#f8fafc] text-zinc-900 overflow-x-hidden w-full relative min-h-screen">
      {/* 🔹 1. HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen  w-full flex items-center bg-[#12066a] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50 bg-[url('/qms-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#12066a]/40 to-[#12066a] z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <FadeIn direction="right" duration="0.8">
            <span className="text-[#997819] font-black uppercase tracking-[0.5em] text-xs md:text-sm mb-6 inline-block bg-white/5 px-6 py-2.5 rounded-full backdrop-blur-md border border-white/10">
              UK-Based
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] italic mb-8 uppercase">
              QMS Software Solutions <br />
              <span className="text-[#997819]">by BizGrow Holdings</span>
            </h1>
            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-10">
              Empowering UK businesses with a smart, centralised QMS solution to
              streamline compliance, manage documentation, and stay fully
              audit-ready with ease.
            </p>
            <button className="bg-[#997819] hover:bg-white text-white hover:text-[#12066a] font-black uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-500 shadow-xl shadow-[#997819]/20 flex items-center gap-4 group">
              Book a Free Consultation
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. WHAT IS QMS (Strategic Layout) */}
      <section className="py-24 md:py-32 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* 🖼️ LEFT SIDE: Image Frame */}
            <FadeIn direction="right">
              <div className="relative group">
                <div className="relative rounded-[3rem] md:rounded-[4.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-[12px] border-slate-50">
                  <img
                    src="/qms-strategic.jpg"
                    alt="BizGrow QMS Consultation"
                    className="w-full h-125 md:h-165 object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute bottom-10 right-10 bg-[#997819] text-white px-8 py-4 rounded-2xl shadow-xl transform rotate-[-3deg] group-hover:rotate-0 transition-all">
                    <span className="text-xs font-black uppercase tracking-widest block">
                      Audit Ready
                    </span>
                    <span className="text-lg font-bold italic">
                      QMS Solutions
                    </span>
                  </div>
                </div>
                <div className="absolute -z-10 -top-6 -left-6 w-full h-full border-2 border-[#997819]/10 rounded-[4.5rem]" />
              </div>
            </FadeIn>

            {/* 📝 RIGHT SIDE: Content */}
            <div className="flex flex-col">
              <FadeIn direction="left">
                <h2 className="text-[#12066a] text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-10">
                  What is QMS Software & <br />
                  <span className="text-[#997819]  font-light">
                    Why UK Businesses Need It
                  </span>
                </h2>

                <div className="relative pl-10 mb-10">
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-[#997819] rounded-full" />
                  <p className="text-[#12066a] text-lg font-bold italic leading-relaxed">
                    Quality Management System (QMS) software is a digital
                    solution designed to help businesses manage their quality
                    processes, documentation, and compliance requirements in one
                    centralised system.
                  </p>
                </div>

                <div className="space-y-6 text-zinc-500 text-lg font-medium ">
                  <p>
                    It enables organisations to maintain consistent standards,
                    improve operational efficiency, and meet recognised
                    frameworks such as ISO 9001, ISO 14001, and ISO 45001.
                  </p>
                  <p>
                    For UK businesses, especially in regulated sectors, QMS
                    software is essential for maintaining compliance and audit
                    readiness. It helps ensure accurate documentation, reduces
                    the risk of non-conformities, and streamlines internal
                    processes. Ultimately, it supports businesses in building
                    credibility and securing more contracts in the UK market.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. CHALLENGES SECTION (Dark Grid with Pure CSS Parallax) */}
      <section className="py-24 bg-[#12066a] text-white overflow-hidden relative min-h-[600px] flex items-center">
        {/* 🖼️ Background Image Layer with Parallax */}
        <div
          className="absolute inset-0 z-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: "url('/challenges-bg.jpg')", // Yahan professional office ya abstract blue pattern image lagayein
            backgroundAttachment: "fixed", // 👈 This creates the parallax effect
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        {/* 🌑 Gradient Overlays for Readability (Top & Bottom Smooth Blend) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12066a] via-transparent to-[#12066a] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[#12066a]/40 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-7xl font-black tracking-tighter text-center mb-20 italic uppercase">
              Common Quality &{" "}
              <span className="text-[#997819]">
                Compliance Challenges in UK Businesses
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Managing compliance through manual processes and spreadsheets",
              "Scattered documentation with no centralised system",
              "Difficulty in meeting ISO standards and regulatory requirements",
              "Lack of visibility over audits and compliance status",
              "Poor tracking of non-conformities and corrective actions",
              "Increased risk of errors, missed deadlines, and failed audits",
             
            ].map((challenge, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className="p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] hover:bg-[#997819]/10 hover:border-[#997819]/30 transition-all duration-500 group relative overflow-hidden h-full">
                  <ShieldCheck className="text-[#997819] mb-6 w-10 h-10 group-hover:scale-110 transition-transform relative z-10" />
                  <p className="text-xl font-bold leading-tight relative z-10">
                    {challenge}
                  </p>

                  {/* Subtle Hover Glow (BizGrow Signature) */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#997819]/5 rounded-full -mr-16 -mt-16 group-hover:bg-[#997819]/10 transition-colors" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 4. KEY FEATURES */}
      <section className="py-24 md:py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <h2 className="text-[#12066a] text-5xl md:text-7xl font-black tracking-tighter mb-6">
                Key Features of{" "}
                <span className="text-[#997819]">BizGrow QMS Software</span> for
                UK Companies
              </h2>
              <p className="max-w-3xl mx-auto text-zinc-500 text-lg font-medium">
                BizGrow QMS software is designed to help UK businesses
                efficiently manage quality, compliance, and documentation in one
                centralised platform.
              </p>
            </FadeIn>
          </div>

          {/* Added 'items-stretch' to the grid to force equal heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
            {[
              {
                title: "Document Control System",
                desc: "Store, manage, and update all compliance documents in one secure location",
                icon: <FileText />,
              },
              {
                title: "Audit Management",
                desc: "Plan, track, and manage internal and external audits with ease",
                icon: <Search />,
              },
              {
                title: "Non-Conformance Tracking",
                desc: "Identify, record, and resolve issues quickly and effectively",
                icon: <Settings2 />,
              },
              {
                title: "CAPA Management",
                desc: "Implement corrective and preventive actions to improve processes",
                icon: <CheckCircle2 />,
              },
              {
                title: "Real-Time Reporting",
                desc: "Monitor performance and compliance with clear, actionable insights",
                icon: <BarChart3 />,
              },
            ].map((feature, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1} className="h-full">
                {/* Added 'h-full' and 'flex flex-col' to keep cards equal */}
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 group h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#12066a] text-[#997819] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#997819] group-hover:text-white transition-colors duration-500 flex-shrink-0">
                    {React.cloneElement(feature.icon, { size: 32 })}
                  </div>

                  <h3 className="text-2xl font-black text-[#12066a] mb-4">
                    {feature.title}
                  </h3>

                  {/* 'flex-grow' ensures the text area expands to fill the space */}
                  <p className="text-zinc-500 font-medium leading-relaxed flex-grow">
                    {feature.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 5. WHO NEEDS IT & WHY CHOOSE BIZGROW */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#12066a] rounded-[4rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 p-12 md:p-20 text-white">
              <FadeIn direction="left">
                <h2 className="text-4xl font-black italic mb-8 uppercase">
                  Who Needs{" "}
                  <span className="text-[#997819]">
                    QMS Software in the UK?
                  </span>
                </h2>
                <p className="text-blue-100/60 text-lg mb-8 leading-relaxed">
                  QMS software is essential for UK businesses that need to
                  maintain consistent quality standards, manage compliance
                  requirements, and streamline their internal processes. It is
                  particularly valuable for organisations working towards ISO
                  certifications or operating in regulated industries where
                  accuracy and documentation are critical.
                </p>
                <div className="space-y-4 text-blue-100/80 font-medium">
                  <p>
                    From security companies seeking ACS approval to
                    construction, facilities management, and growing businesses,
                    a QMS system helps ensure audit readiness, reduce risks, and
                    improve overall efficiency.
                  </p>
                  <p>
                    It enables organisations to build credibility, meet client
                    expectations, and compete effectively in the UK market.
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="lg:w-1/2 bg-white p-12 md:p-20 border-l border-slate-100">
              <FadeIn direction="right">
                <h2 className="text-[#12066a] text-4xl font-black italic mb-8 uppercase">
                  Why Choose{" "}
                  <span className="text-[#997819]">
                    BizGrow for QMS Software in the UK
                  </span>
                </h2>
                <div className="space-y-6 text-zinc-500 text-lg leading-relaxed mb-8">
                  <p>
                    BizGrow offers a tailored QMS software solution designed
                    specifically to meet the needs of UK businesses operating in
                    compliance-driven industries. With a deep understanding of
                    ISO standards, ACS requirements, and UK regulations, we
                    provide a system that is practical, reliable, and aligned
                    with real business needs.
                  </p>
                  <p>
                    Our approach goes beyond just software, we offer expert
                    guidance, ongoing support, and a solution that integrates
                    seamlessly into your operations. By choosing BizGrow, you
                    gain a trusted partner committed to helping you achieve
                    compliance, improve efficiency, and grow your business with
                    confidence in the UK market.
                  </p>
                </div>
                <div className="pt-8 border-t border-slate-100 flex items-center gap-4 text-[#12066a] font-black uppercase tracking-widest text-xs">
                  <ShieldCheck size={24} className="text-[#997819]" /> Trusted
                  Compliance Partner
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 6. CTA (Signature Design - Pure CSS Parallax) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="p-12 md:p-24 rounded-[4rem] bg-[#12066a] relative overflow-hidden group shadow-2xl text-center flex flex-col items-center"
            style={{
              backgroundImage: "url('/qms-cta.jpg')",
              backgroundAttachment: "fixed", // 👈 Ye main parallax property hai
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {/* 🌑 Dark Overlay for Content Clarity */}
            <div className="absolute inset-0 bg-[#12066a]/80 z-0 pointer-events-none" />

            {/* Content Container (z-index ensure karega text upar rahe) */}
            <div className="relative z-10 flex flex-col items-center">
              <FadeIn direction="up">
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10 uppercase">
                  Get Started with{" "}
                  <span className="text-[#997819]">BizGrow QMS Software</span>{" "}
                  in the UK
                </h2>

                <div className="max-w-3xl mx-auto">
                  <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-12 opacity-90">
                    Take control of your compliance with a smart, easy-to-use
                    QMS solution designed for UK businesses. Simplify processes,
                    stay audit-ready, and grow with confidence.
                  </p>
                </div>

                <button className="bg-[#997819] text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-3xl">
                  Book a Free Consultation
                </button>
              </FadeIn>
            </div>

            {/* Subtle Bottom Glow Detail */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#997819]/20 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default QMSPage;

import React from "react";
import {
  Users,
  FileCheck,
  ShieldCheck,
  CheckCircle,
  FileText,
  HardHat,
  ClipboardCheck,
  ArrowRight,
  Target,
  Award,
} from "lucide-react";
import FadeIn from "@/components/MotionWrapper"; // Assuming you have this component
import Link from "next/link";
export const metadata = {
  title: "Corporate Training & Coaching Services | BizGrow Holdings UK",
  description:
    "BizGrow Holdings offers expert corporate training & coaching services, empowering UK security businesses with growth and compliance success.",
};
const TrainingCoachingPage = () => {
  return (
    <main className="bg-white">
      {/* 🔹 1. HERO SECTION (NO PARALLAX - SCREENSHOT THEME) */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#12066a]">
        {/* 🖼️ Background Image - Standard Cover */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/training-hero.jpg')" }}
        />

        {/* 🔹 Background Watermark "TRAINING" (Image 2 Style) */}
        <div className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none">
          <span className="text-[22vw] font-black text-white/[0.03] uppercase leading-none tracking-tighter -rotate-3">
            TRAINING
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 📝 Left: Content Layer */}
            <FadeIn direction="left">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-[#997819]"></div>
                  <span className="text-[#997819] font-black  uppercase tracking-[0.3em] text-[10px] md:text-xs">
                    WHO WE ARE
                  </span>
                </div>

                <h1 className="text-5xl font-black text-white tracking-tighter leading-[1] uppercase">
                  Corporate Training & <br />
                  <span className="text-[#997819]">
                    Coaching Solutions for Security Businesses
                  </span>
                </h1>

                <p className="text-zinc-300 text-lg font-medium max-w-xl leading-relaxed border-l-4 border-[#997819] pl-6">
                  At BizGrow Holdings, we provide tailored programs to help UK
                  security companies meet{" "}
                  <Link
                    href="https://bizgrow-holdings.com/top-sia-security-recruitment-agencies-in-the-uk/"
                    className="text-[#997819] font-bold"
                  >
                    SIA
                  </Link>{" "}
                  regulations,{" "}
                  <Link
                    href="https://bizgrow-holdings.com/acs-accreditation-for-security-businesses/"
                    className="text-[#997819] font-bold"
                  >
                    ACS
                  </Link>{" "}
                  standards, and{" "}
                  <Link
                    href="https://bizgrow-holdings.com/iso-9001-guide/"
                    className="text-[#997819] font-bold"
                  >
                    ISO
                  </Link>{" "}
                  compliance.
                </p>

                <div className="pt-6">
                  <Link href="/contact-us">
                    <button className="px-10 py-5 bg-[#997819] text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-2xl active:scale-95">
                      Book Free Consultation
                    </button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 SECTION 2: WHY TRAINING IS ESSENTIAL (Centered) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-[0.9] mb-6 uppercase">
              Why Training & Coaching is <br />
              <span className="text-[#997819]">
                Essential for Your Business.
              </span>
            </h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-16 max-w-3xl mx-auto">
              In today’s competitive UK security industry, businesses must meet
              strict{" "}
              <Link
                href="https://bizgrow-holdings.com/compliance-consultancies/"
                className="text-[#997819] font-bold"
              >
                compliance
              </Link>{" "}
              standards, client expectations, and regulatory requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              {/* Left: Risks */}
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100">
                <p className="text-[#12066a] font-black uppercase text-xs tracking-widest mb-6">
                  Without proper training:
                </p>
                <div className="space-y-4">
                  {[
                    "Staff performance drops",
                    "Compliance risks increase",
                    "Contract opportunities are lost",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-zinc-600 font-bold text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Benefits */}
              <div className="p-10 bg-[#12066a]/5 rounded-[3rem] border border-[#12066a]/10">
                <p className="text-[#997819] font-black uppercase text-xs tracking-widest mb-6">
                  Investing in training means:
                </p>
                <div className="space-y-4">
                  {[
                    "Better contract success rates",
                    "Improved service quality",
                    "Stronger business reputation",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[#12066a] font-bold text-sm"
                    >
                      <CheckCircle className="text-[#997819]" size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 SECTION 3: CORPORATE TRAINING SOLUTIONS (Centered) */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#12066a] uppercase tracking-tighter mb-4">
              Our Corporate <br />{" "}
              <span className="text-[#997819]">Training Solutions</span>
            </h2>
            <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest max-w-2xl mx-auto">
              We offer customised training programs for UK security businesses,
              including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
            {[
              {
                t: "Compliance & ISO Training",
                d: "Learn how to implement and maintain ISO 9001, ISO 14001, and ISO 45001 standards",
              },
              {
                t: "ACS & SIA Training",
                d: (
                  <>
                    Prepare your business for ACS accreditation and SIA
                    compliance{" "}
                    <Link
                      href="https://bizgrow-holdings.com/difference-between-internal-audit-and-external-audit/"
                      className="text-[#997819] font-bold"
                    >
                      audits
                    </Link>
                  </>
                ),
              },
              {
                t: "Staff Performance Training",
                d: "Improve employee productivity, communication, and operational efficiency",
              },
              {
                t: "Leadership & Management Training",
                d: "Develop strong leaders to manage teams and drive business growth",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative p-10 bg-white border border-zinc-200 rounded-[3rem] overflow-hidden transition-all duration-500 hover:shadow-2xl h-full"
              >
                <div className="absolute inset-0 bg-[#12066a] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-[#12066a] mb-4 group-hover:text-[#997819] transition-colors uppercase leading-tight">
                    {card.t}
                  </h3>
                  <p className="text-xs text-zinc-500 group-hover:text-blue-100/70 transition-colors font-medium leading-relaxed">
                    {card.d}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Practicality Statement (Centered) */}
          <div className="max-w-3xl mx-auto p-8 bg-[#12066a] rounded-[2rem] shadow-xl">
            <p className="text-white font-black uppercase tracking-widest text-sm">
              Our training is designed to deliver{" "}
              <span className="text-[#997819]">
                practical, real-world results
              </span>
              , not just theory.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 SECTION 3.5: COACHING METHODOLOGY (Inner Div Parallax Style) */}
      <section className="relative py-24 bg-white">
        {" "}
        {/* 👈 Outer section standard white background rahega */}
        <div className="max-w-7xl mx-auto px-6">
          {/* 🖼️ CENTRAL DIV WITH INTERNAL PARALLAX (Corrected Style) */}
          <div
            className="p-12 md:p-20 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden group text-center"
            style={{
              backgroundImage: 'url("/methodology-2.webp")', // 👈 Central Card pe image
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", // 👈 Yeh central card ke andar locked rahega
            }}
          >
            {/* Dark Blue Overlay only inside this div */}
            <div className="absolute inset-0 bg-[#12066a]/70 z-0" />

            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#997819]/20 rounded-full blur-[100px] z-10" />

            {/* Content Layer (z-20) */}
            <div className="relative z-20">
              <FadeIn direction="up">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                  Our Coaching{" "}
                  <span className="text-[#997819]">Methodology</span>
                </h2>
                <p className="text-blue-100/70 text-lg font-medium max-w-3xl mx-auto">
                  Our business coaching for{" "}
                  <Link
                    href="https://bizgrow-holdings.com/how-to-start-a-security-company-in-the-uk/"
                    className="text-[#997819] font-bold"
                  >
                    security companies
                  </Link>{" "}
                  focuses on real growth and measurable results.
                </p>
              </FadeIn>
            </div>

            {/* Cards Row (Image 7 Context) */}
            <div className="grid md:grid-cols-2 gap-12 relative z-20 mt-16 text-left">
              {/* Left Card */}
              <FadeIn direction="left">
                <div className="h-full space-y-6 bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:border-[#997819]/50 transition-colors">
                  <p className="text-[#997819] font-black uppercase text-xs tracking-[0.2em] mb-4">
                    WE WORK CLOSELY WITH:
                  </p>
                  <div className="space-y-4">
                    {[
                      "Business owners",
                      "Directors",
                      "Operations managers",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 text-white font-bold text-sm"
                      >
                        <div className="w-2 h-2 bg-[#997819] rounded-full shadow-[0_0_15px_rgba(153,120,25,0.8)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Right Card */}
              <FadeIn direction="right">
                <div className="h-full space-y-6 bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:border-[#997819]/50 transition-colors">
                  <p className="text-[#997819] font-black uppercase text-xs tracking-[0.2em] mb-4">
                    THROUGH 1-TO-1 COACHING & STRATEGIC GUIDANCE:
                  </p>
                  <div className="space-y-4">
                    {[
                      "Improve decision-making",
                      "Strengthen compliance systems",
                      "Scale your operations effectively",
                    ].map((text, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 text-white font-bold text-sm"
                      >
                        <CheckCircle className="text-[#997819]" size={22} />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Bottom Statement */}
            <FadeIn direction="up">
              <div className="relative z-20 mt-16 pt-8 border-t border-white/5 text-center">
                <p className="text-[#997819] font-black uppercase tracking-[0.3em] text-xs">
                  Our approach is{" "}
                  <span className="text-white">
                    hands-on, personalised, and results-driven.
                  </span>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 SECTION: KEY BENEFITS OF OUR TRAINING & COACHING */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase leading-none mb-6">
                Key Benefits <br />
                <span className="text-[#997819]">
                  of Our Training & Coaching
                </span>
              </h2>
              <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">
                By choosing BizGrow Holdings, you gain:
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              "Improved compliance with UK security regulations",
              <>
                Higher chances of achieving{" "}
                <Link
                  href="https://bizgrow-holdings.com/why-clients-trust-iso-14001-certified-suppliers-in-the-uk/"
                  className="text-[#997819] font-bold"
                >
                  ISO certification
                </Link>{" "}
                and ACS approval
              </>,
              "Increased staff productivity and performance",
              "Better client satisfaction and retention",
              "Stronger positioning to win security contracts in the UK",
            ].map((benefit, i) => (
              <div
                key={i}
                className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:border-[#997819]/30 transition-all duration-500 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#12066a] flex items-center justify-center shrink-0 group-hover:bg-[#997819] transition-colors">
                    <CheckCircle className="text-white" size={20} />
                  </div>
                  <p className="text-[#12066a] font-bold leading-tight group-hover:translate-x-1 transition-transform">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Simple Goal Statement */}
          <div className="max-w-4xl mx-auto text-center p-12 bg-zinc-50 rounded-[3rem] border-2 border-[#997819]/20">
            <h3 className="text-[#12066a] font-black uppercase tracking-widest text-xs mb-4">
              Our goal is simple:
            </h3>
            <p className="text-2xl md:text-4xl font-black text-[#12066a] tracking-tight leading-none">
              Help your business grow while <br />
              <span className="text-[#997819]">staying fully compliant.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 4. OUR PROCESS (Parallax Version) */}
      <section className="relative py-32 overflow-hidden text-white group">
        {/* Parallax Background Container */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-top transition-transform duration-700"
          style={{
            backgroundImage: `url('/process-bg.jpg')`, // Apni image path yahan dalein
          }}
        >
          {/* Deep Blue Overlay to match BizGrow theme */}
          <div className="absolute inset-0 bg-[#12066a]/75 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <FadeIn direction="up">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#997819] uppercase leading-none">
                Our Process
              </h2>
              <p className="text-zinc-400 mt-4 font-bold uppercase tracking-widest text-xs">
                We follow a structured and proven approach to deliver results:
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                n: "01",
                t: "Business Needs Assessment",
                d: "We analyse your current operations, compliance status, and training gaps.",
              },
              {
                n: "02",
                t: "Custom Training Plan",
                d: "We create a tailored program based on your business needs.",
              },
              {
                n: "03",
                t: "Training Delivery",
                d: "We deliver practical, industry-focused training sessions.",
              },
              {
                n: "04",
                t: "Coaching & Implementation",
                d: "We guide you step-by-step to implement what you've learned.",
              },
              {
                n: "05",
                t: "Performance Monitoring",
                d: "We track improvements and ensure long-term success.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white transition-all duration-700 group/card"
              >
                <span className="text-5xl font-black text-white/10 group-hover/card:text-[#997819] block mb-6 transition-colors duration-500">
                  {step.n}
                </span>
                <h3 className="font-black uppercase mb-3 text-white group-hover/card:text-[#12066a] text-xs tracking-wider transition-colors duration-500">
                  {step.t}
                </h3>
                <p className="text-[10px] text-zinc-300 group-hover/card:text-zinc-600 font-medium leading-relaxed transition-colors duration-500">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 SECTION: WHY CHOOSE BIZGROW HOLDINGS? */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Main Text */}
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter uppercase leading-[0.9] mb-6">
                Why Choose <br />
                <span className="text-[#997819]">BizGrow Holdings?</span>
              </h2>
              <p className="text-[#12066a] font-black text-xs uppercase tracking-[0.3em] mb-4">
                Trusted Partner for UK Security Consulting
              </p>
              <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-8">
                We don't just train, we help you transform your business by
                focusing on real growth, not just theory.
              </p>

              <div className="p-8 bg-[#12066a] rounded-[2.5rem] shadow-xl">
                <p className="text-white font-bold italic">
                  "Helping organisations achieve excellence through compliance
                  and strategic growth systems."
                </p>
              </div>
            </FadeIn>

            {/* Right Side: Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  t: "Industry Expertise",
                  d: (
                    <>
                      Industry-specific expertise in security{" "}
                      <Link
                        href="https://bizgrow-holdings.com/benefits-of-supply-chain-management-for-compliance/"
                        className="text-[#997819] font-bold"
                      >
                        compliance
                      </Link>{" "}
                      and certification
                    </>
                  ),
                },
                {
                  t: "Proven Track Record",
                  d: (
                    <>
                      Helping businesses achieve{" "}
                      <Link
                        href="https://bizgrow-holdings.com/could-iso-45001-enhance-workplace-safety-and-compliance/"
                        className="text-[#997819] font-bold"
                      >
                        ISO
                      </Link>{" "}
                      &{" "}
                      <Link
                        href="https://bizgrow-holdings.com/business-benefits-of-becoming-an-sia-approved-contractor/"
                        className="text-[#997819] font-bold"
                      >
                        ACS
                      </Link>{" "}
                      accreditation
                    </>
                  ),
                },
                {
                  t: "End-to-End Support",
                  d: "Support from training to implementation",
                },
                {
                  t: "Real Business Growth",
                  d: "Focus on real growth, not just theory",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 bg-white rounded-[2rem] border border-zinc-200 hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#997819]/10 flex items-center justify-center mb-6 group-hover:bg-[#997819] transition-colors">
                    <ShieldCheck
                      className="text-[#997819] group-hover:text-white"
                      size={20}
                    />
                  </div>
                  <h3 className="text-[#12066a] font-black uppercase text-xs tracking-widest mb-3">
                    {item.t}
                  </h3>
                  <p className="text-zinc-500 text-[11px] font-bold leading-relaxed">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 🔹 5. PEHLA WALA CTA (Parallax Style) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="relative p-12 md:p-24 rounded-[4rem] text-center text-white overflow-hidden group shadow-2xl"
            style={{
              backgroundImage: 'url("/training-cta.webp")', // 👈 Aapki professional background image
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", // 👈 Parallax effect sirf is div ke andar
            }}
          >
            {/* Dark Brand Overlay */}
            <div className="absolute inset-0 bg-[#12066a]/90 z-0 transition-opacity duration-700 group-hover:opacity-85" />

            {/* Animated Decorative Glow */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#997819]/20 rounded-full blur-[100px] z-10 animate-pulse" />

            <div className="relative z-20">
              <FadeIn direction="up">
                <h3 className="text-3xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-none">
                  Get Started with Expert <br />{" "}
                  <span className="text-[#997819]">
                    Training & Coaching Today
                  </span>
                </h3>
                <p className="mb-10 text-blue-100/70 font-medium text-lg max-w-2xl mx-auto">
                  Partner with <Link href="/">BizGrow Holdings</Link> and give your team the skills,
                  knowledge, and confidence to succeed in the UK market.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Link href="/contact-us">
                  <button className="px-12 py-6 bg-[#997819] text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-[0_20px_50px_rgba(153,120,25,0.3)] w-full sm:w-auto transform hover:-translate-y-1">
                    Book Free Consultation
                  </button>
                  </Link>
                  <a
                    href="mailto:info@bizgrow-holdings.com"
                    className="text-white font-black uppercase tracking-widest text-[10px] hover:text-[#997819] transition-colors flex items-center gap-2 group/link"
                  >
                    Speak to our experts
                    <span className="transform group-hover/link:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TrainingCoachingPage;

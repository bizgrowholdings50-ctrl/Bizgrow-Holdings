import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import {
  ShieldCheck,
  Search,
  Eye,
  Lock,
  Award,
  UserCheck,
  Dog,
  TrendingUp,
  TrendingUpIcon,
  Scan,
  Target,
  ShieldAlert,
  Maximize,
  Users,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import ServicesFaq from "@/components/ServicesFaq";

const nasduData = [
  {
    q: "What are the main requirements of NASDU?",
    a: "The main requirements of NASDU include completing approved training courses covering conflict management, physical intervention, and legal knowledge. Providers must also maintain quality assurance systems and undergo regular audits to retain their accreditation. Continuous professional development and adherence to industry codes of practice are equally essential. ",
  },
  {
    q: "How to get NASDU Certification?",
    a: "To get NASDU certified, choose an approved training provider and enrol in the relevant course for your role, such as door supervision or conflict management. You'll complete both theoretical and practical assessments to demonstrate competency. Working with a compliance consultant can help streamline documentation and audit readiness.",
  },
  {
    q: "What does NASDU stand for?",
    a: "NASDU stands for the National Approval Scheme for Security Guarding and Door Supervision. It's a UK-recognised accreditation body that sets training standards for the private security sector. NASDU approval ensures training providers meet consistent, industry-wide quality benchmarks.",
  },
  {
    q: "What is NASDU and why is it important?",
    a: "NASDU is the UK's leading approval body for security industry training providers and conflict management courses. It matters because it assures clients and regulators that staff are trained to a recognised, consistent standard. For security businesses, NASDU accreditation builds trust and supports contract-winning credibility.",
  },
];

export const metadata = {
  title: "NASDU Certification for UK Security Dog Companies",
  description:
    "Get NASDU certified with BizGrow Holdings. Meet UK security dog standards, improve credibility, win contracts & stay compliant.",
};

const NASDUPage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* 🔹 1. HERO SECTION (Tactical & Authoritative) */}
      <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Who.jpg"
            alt="Nasdu certification - BizGrow Holdings Ltd"
            fill
            className="object-cover opacity-50  transition-all duration-[2s]"
            priority
          />
          {/* Tactical Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#12066a] via-[#12066a]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 z-10" />
        </div>

        <div className="max-w-7xl mx-auto mt-14 px-6 relative z-20 w-full pt-20">
          <div className="max-w-4xl">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg mb-8">
                <ShieldCheck className="text-[#997819]" size={16} />
                <span className="text-white  font-black uppercase tracking-[0.3em] text-[10px]">
                  UK K9 SECURITY STANDARD
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                NASDU <br />
                <span className="text-[#997819] not-italic">
                  Accreditation.
                </span>
              </h1>

              <p className="mt-10 text-blue-100/60 text-xl md:text-1xl max-w-2xl font-medium leading-relaxed">
                <Link href="/" className="text-[#997819] font-bold">
                  BizGrow Holdings
                </Link>{" "}
                supports security companies in achieving NASDU accreditation for
                professional dog handling and{" "}
                <Link
                  href="/k9-security-services-in-the-uk/"
                  className="text-[#997819] font-bold"
                >
                  K9 operations
                </Link>
                . We help implement the policies and procedures required for
                recognised industry compliance.
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

      {/* 🔹 2. OPERATIONAL FOCUS (Asymmetric Grid) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-[#12066a] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter  mb-8 leading-none">
                  NASDU Accreditation & <br />{" "}
                  <span className="text-[#997819]">Operational Safety.</span>
                </h2>
                <p className="max-w-xl text-zinc-200 font-medium text-lg leading-relaxed">
                  <Link
                    href="https://bizgrow-holdings.com/accredited-dog-trainer-in-the-uk/"
                    className="text-[#997819] font-bold"
                  >
                    NASDU accreditation
                  </Link>{" "}
                  confirms that security dog handlers and K9 units operate in
                  line with recognised UK standards for detection, patrol, and
                  operational safety.
                </p>
              </div>
              <Dog
                className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-[#997819]/10 transition-colors duration-700"
                size={400}
              />
            </div>
            <div className="lg:col-span-4 bg-[#997819]/90 rounded-[3rem] p-12 flex flex-col justify-between text-white">
              <Scan size={40} className="text-white" />
              <div>
                <h3 className="text-3xl font-black leading-tight  mb-4 italic text-white">
                  Specialised Detection & <br /> Security Patrols
                </h3>
                <p className="text-white/90 font-bold text-sm">
                  Certified K9 teams specialise in narcotics and explosives
                  detection, as well as security patrols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 NEW SECTION: Why NASDU Certification is Essential */}
      <section className="py-14 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn direction="up">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                The Strategic Advantage
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none  ">
                What Does NASDU
                <span className="text-[#997819] ml-2">Confirm?</span>
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="mt-6 text-lg text-zinc-600 font-medium max-w-4xl mx-auto leading-relaxed">
                NASDU shows that your K9 unit meets a real, recognised standard,
                not just informal training. It confirms that your dog handlers
                and their dogs:
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Properly Trained Teams",
                desc: (
                  <>
                    Ensure that security dogs and handlers are properly trained
                    according to strict codes of practice covering handling,
                    welfare, and UK{" "}
                    <Link
                      href="https://bizgrow-holdings.com/compliance-consultancies/"
                      className="text-[#997819] font-bold"
                    >
                      security compliance
                    </Link>
                    .
                  </>
                ),
                icon: <Award size={32} />,
              },
              {
                title: "Safe Job Execution",
                desc: "Guarantee that K9 units work safely on the job, minimizing operational risks while maintaining the highest welfare standards.",
                icon: <ShieldCheck size={32} />,
              },
              {
                title: "Comprehensive Security Duties",
                desc: "Seamlessly cover detection, patrol, and general security duties to deliver reliable protection across all environments.",
                icon: <TrendingUp size={32} />, // Make sure TrendingUp is imported from lucide-react
              },
            ].map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.2}>
                <div className="group h-full p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 hover:bg-[#12066a] transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#997819] group-hover:bg-[#997819] group-hover:text-white transition-all duration-500 mb-8">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-[#12066a] group-hover:text-white  mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 group-hover:text-blue-100/60 font-medium text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 3. WHAT ARE THE DOGS USED FOR? */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn
            direction="up"
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
              Operational Applications
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none">
              What Are the Dogs
              <span className="text-[#997819] ml-2">
                Actually <br /> Used For?
              </span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-zinc-200/80 rounded-[2.5rem] p-8 hover:border-[#997819]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-300 mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-black text-[#12066a] mb-3">
                Narcotics & Explosives
              </h3>
              <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                Specialised scent detection to locate illicit substances and
                explosive materials with high precision.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-zinc-200/80 rounded-[2.5rem] p-8 hover:border-[#997819]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-300 mb-6">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-xl font-black text-[#12066a] mb-3">
                Site Patrols
              </h3>
              <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                Proactive monitoring and physical protection of high-risk
                properties, facilities, and commercial locations.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-zinc-200/80 rounded-[2.5rem] p-8 hover:border-[#997819]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-300 mb-6">
                <Maximize size={24} />
              </div>
              <h3 className="text-xl font-black text-[#12066a] mb-3">
                Perimeter Security
              </h3>
              <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                Boundary patrols designed to secure large perimeters at
                construction sites, warehouses, and industrial parks.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-zinc-200/80 rounded-[2.5rem] p-8 hover:border-[#997819]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-300 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-black text-[#12066a] mb-3">
                Event Security
              </h3>
              <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                Crowd management, public safety, and active patrol duties for
                large public and private gatherings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 4. WHY DOES NASDU MATTER? (3 Key Benefits) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Centered Header */}
          <FadeIn
            direction="up"
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
              Core Advantages
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none">
              Why Does
              <span className="text-[#997819]"> NASDU Matter?</span>
            </h2>
          </FadeIn>

          {/* 3-Column Grid Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-[#997819]/40 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#12066a]/5 flex items-center justify-center text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-300 mb-6">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-black text-[#12066a] mb-3">
                  Trusted Standards
                </h3>
                <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                  Your dogs and handlers follow proper training and welfare
                  rules, ensuring top-tier operational execution.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-[#997819]/40 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#12066a]/5 flex items-center justify-center text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-300 mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-black text-[#12066a] mb-3">
                  Professional Recognition
                </h3>
                <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                  Clients and insurers trust your business more, providing
                  verifiable proof of compliance and reliability.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-[#997819]/40 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#12066a]/5 flex items-center justify-center text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-300 mb-6">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-xl font-black text-[#12066a] mb-3">
                  Competitive Advantage
                </h3>
                <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                  You stand out from companies that aren't accredited, capturing
                  high-value contracts with absolute confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. THow NASDU  work with others compliance  */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter leading-tight mb-6 ">
              How NASDU Works With <br />
              <span className="text-[#997819]">Other UK Standards.</span>
            </h2>

            <p className="text-zinc-600 font-medium pb-8 leading-relaxed">
              <b>NASDU</b> alone doesn't make your business fully compliant. It
              only covers your dogs and handlers, checking that they're properly
              trained and safe to deploy. But it says nothing about your wider
              staff licensing, vetting, or how your business runs day to day.
              Combined with the standards below, your whole business gets
              covered, not just your dog team.
            </p>

            <div className="space-y-6">
              {/* Point 1 */}
              <div className="flex gap-6 items-start">
                <div className="shrink-0 w-10 h-10 border-2 border-[#12066a] rounded-full flex items-center justify-center font-black text-[#12066a]">
                  01
                </div>
                <p className="text-zinc-600 font-medium pt-2">
                  <b className="text-[#997819]">NASDU</b> checks your dog
                  handlers and dogs.
                </p>
              </div>

              {/* Point 2 */}
              <div className="flex gap-6 items-start">
                <div className="shrink-0 w-10 h-10 border-2 border-[#12066a] rounded-full flex items-center justify-center font-black text-[#12066a]">
                  02
                </div>
                <p className="text-zinc-600 font-medium pt-2">
                  <Link
                    href="https://bizgrow-holdings.com/top-sia-security-recruitment-agencies-in-the-uk/"
                    className="text-[#997819] font-bold hover:underline"
                  >
                    COP
                  </Link>{" "}
                  <Link
                    href="https://bizgrow-holdings.com/get-acs-accreditation-fast/"
                    className="text-[#997819] font-bold hover:underline"
                  >
                    119
                  </Link>{" "}
                  checks your core operational management and service delivery.
                </p>
              </div>

              {/* Point 3 */}
              <div className="flex gap-6 items-start">
                <div className="shrink-0 w-10 h-10 border-2 border-[#12066a] rounded-full flex items-center justify-center font-black text-[#12066a]">
                  03
                </div>
                <p className="text-zinc-600 font-medium pt-2">
                  <Link
                    href="https://bizgrow-holdings.com/what-is-bs-10800-in-the-uk-2026/"
                    className="text-[#997819] font-bold hover:underline"
                  >
                    BS 10800
                  </Link>{" "}
                  checks how you handle emergencies.
                </p>
              </div>

              {/* Point 4 */}
              <div className="flex gap-6 items-start">
                <div className="shrink-0 w-10 h-10 border-2 border-[#12066a] rounded-full flex items-center justify-center font-black text-[#12066a]">
                  04
                </div>
                <p className="text-zinc-600 font-medium pt-2">
                  <Link
                    href="https://bizgrow-holdings.com/difference-between-iso-9001-iso-14001-and-iso45001/"
                    className="text-[#997819] font-bold hover:underline"
                  >
                    ISO Standards
                  </Link>{" "}
                  checks your overall business quality.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 relative aspect-square w-full rounded-[4rem] overflow-hidden shadow-2xl">
            <Image
              src="/nasdu-discipline.jpg"
              fill
              className="object-cover"
              alt="NASDU Supports UK Security Standards"
            />
          </div>
        </div>
      </section>

      {/* 🔹 6. OUR PROCESS (Elite Enterprise Pipeline Grid) */}
      <section className="py-24 bg-[#12066a] text-white relative overflow-hidden">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#997819]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="flex-col items-center justify-center text-center mb-16 gap-6">
            <div>
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                Step-by-Step Roadmap
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
                Accreditation <span className="text-[#997819]">Protocol.</span>
              </h2>
            </div>
            <p className="max-w-lg text-blue-100/70 text-md font-medium mx-auto leading-relaxed mt-4">
              A structured workflow designed to take your K9 security operations
              from initial review to full official certification.
            </p>
          </div>

          {/* 4-Step Enterprise Card Pipeline */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                step: "01",
                title: "Membership Application",
                desc: "Apply for NASDU membership; your foundational security policies and documentation get reviewed.",
              },
              {
                step: "02",
                title: "Handler & K9 Standards",
                desc: "Handlers and dogs both get thoroughly checked against strict training and welfare standards.",
              },
              {
                step: "03",
                title: "Operational Evaluation",
                desc: "Your core operational procedures and deployment protocols undergo professional evaluation.",
              },
              {
                step: "04",
                title: "Accreditation Approval",
                desc: "Once approved, your business officially achieves recognized NASDU accreditation status.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/10 hover:border-[#997819]/60 rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-500 group relative overflow-hidden backdrop-blur-md hover:-translate-y-2 shadow-2xl"
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#997819] font-black text-lg group-hover:bg-[#997819] group-hover:text-white transition-all duration-500 shadow-inner">
                      {item.step}
                    </span>
                    <div className="h-1 w-8 bg-white/10 group-hover:bg-[#997819] transition-colors rounded-full" />
                  </div>

                  <h3 className="font-black text-white text-xl tracking-tight mb-3 group-hover:text-[#997819] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-blue-100/60 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
                  <span>Phase {item.step}</span>
                  <span className="text-[#997819] opacity-0 group-hover:opacity-100 transition-opacity">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Full-Width Support Banner */}
          <div className="bg-white text-zinc-900 rounded-[3rem] p-10 md:p-12 relative overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#12066a]/5 flex items-center justify-center text-[#997819] shrink-0">
                <Award size={36} />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-black text-[#12066a] tracking-tight mb-2">
                  Official Accreditation Support
                </h4>
                <p className="text-zinc-600 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
                  BizGrow Holdings assists security companies with{" "}
                  <Link
                    href="https://bizgrow-holdings.com/main-requirements-for-nasdu-security-certification/"
                    className="text-[#997819] font-bold hover:underline"
                  >
                    NASDU accreditation
                  </Link>{" "}
                  by implementing the necessary documentation, procedures, and
                  rigorous compliance frameworks.
                </p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <div className="h-2 w-12 bg-[#997819] rounded-full" />
              <div className="h-2 w-6 bg-[#12066a]/20 rounded-full" />
              <div className="h-2 w-3 bg-[#12066a]/10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 6. ELITE ASSURANCE & STANDARDS BAND
      <section className="py-16 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "SIA Industry Aligned",
                desc: "Full alignment with UK security personnel regulations.",
                icon: <ShieldCheck className="text-[#997819]" size={20} />,
              },
              {
                title: "NASDU Operational Standards",
                desc: "Strict adherence to accredited K9 protocols.",
                icon: <Award className="text-[#997819]" size={20} />,
              },
              {
                title: "Professional Handling",
                desc: "Verified competency for handlers and working dogs.",
                icon: <CheckCircle2 className="text-[#997819]" size={20} />,
              },
              {
                title: "UK Welfare & Compliance",
                desc: "Complete adherence to operational safety laws.",
                icon: <Lock className="text-[#997819]" size={20} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 flex items-start gap-4 hover:border-[#997819]/40 transition-all duration-300 group"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#12066a]/5 flex items-center justify-center group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-black text-[#12066a] uppercase text-xs tracking-wider mb-1">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <ServicesFaq
        faqs={nasduData}
        title={
          <>
            NASDU <span className="text-[#997819]">FAQ's</span>
          </>
        }
        subtitle="Questions & Answers"
      />
     {/* 🔹 7. CTA SECTION (Tactical Theme with Fixed Background) */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div
      className="relative group overflow-hidden rounded-[3.5rem] p-10 md:p-24 shadow-2xl flex flex-col items-center text-center"
      style={{
        backgroundImage: "url('/nasdu-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlays for readability */}
      <div className="absolute inset-0 bg-[#0a0a0a]/70 mix-blend-multiply z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12066a]/40 to-[#12066a] z-20" />

      <div className="relative z-30 w-full max-w-4xl flex flex-col items-center">
        <FadeIn direction="up">
          <span className="inline-block text-white font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-10">
            Command Authority
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.15]">
            Get NASDU Certified with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37] inline-block mt-2 pb-3 not-italic">
              BizGrow Holdings
            </span>
          </h2>
        </FadeIn>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
          <FadeIn direction="up" delay={0.2}>
            <Link href="/contact-us">
              <button className="relative group/btn overflow-hidden w-full sm:w-64 bg-[#997819] text-white px-8 py-5 rounded-lg font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500">
                <span className="relative z-40 group-hover/btn:text-[#12066a] transition-colors duration-500">
                  Contact Us
                </span>
                <div className="absolute inset-0 bg-white translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-30" />
              </button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
</section>
    </main>
  );
};

export default NASDUPage;

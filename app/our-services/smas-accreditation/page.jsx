import React from "react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
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
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "SMAS Accreditation UK | Fast SSIP Approval – BizGrow Holdings",
  description:
    "Get SMAS accreditation in the UK fast. BizGrow handles SSIP compliance, audits, and policies so you can win more contracts easily.",
};
const SMASPage = () => {
  return (
    <main className="bg-white text-zinc-900 overflow-hidden font-sans">
      {/* 🔹 1. HERO SECTION (Speed & Compliance Vibe) */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#12066a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/smas-h.jpg"
            alt="Safety Compliance"
            fill
            className="object-cover opacity-40 brightness-75"
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
                  Fast-Track SSIP Accreditation
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                SMAS <br />
                <span className="text-[#997819]">WORKSAFE Accreditation.</span>
              </h1>

              <p className="mt-10 text-blue-100/60 text-xl  q max-w-2xl font-medium leading-relaxed italic">
                Achieve{" "}
                <Link
                  href="https://bizgrow-holdings.com/rules-requirements-for-ssip/"
                  className="text-[#997819] font-bold"
                >
                  SSIP recognition
                </Link>{" "}
                with SMAS Worksafe faster. <Link href="/">BizGrow Holdings</Link> handles your full
                Health & Safety assessment while you focus on winning contracts
                in Uk.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 🔹 2. VALUE PROPOSITION (Clean Trio) */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            {
              t: "SSIP Certified",
              d: "Nationally recognised Health & Safety standard.",
              icon: <ShieldCheck />,
            },
            {
              t: "Fast Turnaround",
              d: "From audit to certificate in days, not months.",
              icon: <Clock />,
            },
            {
              t: "Full Support",
              d: "We write the policies you're missing.",
              icon: <FileBadge />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-[#997819] mb-6 group-hover:bg-[#12066a] group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h2 className="text-xl font-black text-[#12066a] uppercase mb-3">
                {item.t}
              </h2>
              <p className="text-zinc-500 text-sm font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 New Section. WHY IT MATTERS (Blueprint Split Layout) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-zinc-100 rounded-[4rem] -rotate-3" />
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                <Image
                  src="/blueprint-work.jpg"
                  width={600}
                  height={700}
                  alt="SMAS Accreditation - BizGrow Holdings Ltd"
                  className="object-cover h-[500px]"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6">
                Market Authority
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none ">
                SMAS Accreditation &
                <span className="text-[#997819]"> Why UK Contractors </span>{" "}
                Need It
              </h2>
              <p className="py-4">
                SMAS <Link href="https://bizgrow-holdings.com/how-to-get-smas-accreditation/" className="text-[#997819] font-bold" >(Safety Management Advisory Services)</Link> Accreditation is a
                UK-recognised health and safety certification designed to assess
                whether a contractor meets required H&S standards. It is widely
                accepted across the construction, facilities management,
                maintenance, and service sectors.
              </p>
              <p className="py-4">
                UK contractors need SMAS accreditation because many main
                contractors, developers, and site managers require proof of
                health and safety <Link href="https://bizgrow-holdings.com/compliance-consultancies/" className="text-[#997819] font-bold">compliance</Link> before allowing suppliers or
                subcontractors onto the site. SMAS helps demonstrate that a
                business has the correct policies, <Link href="https://bizgrow-holdings.com/site-specific-risk-assessment/" className="text-[#997819] font-bold">risk assessments</Link>, and safety
                procedures in place, reducing risk and improving credibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. THE COMPLIANCE GRID (Refined Card Layout) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading aur Description Section: In 3 classes ko change kiya hai */}
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-[#12066a] tracking-tighter leading-none uppercase">
              Full <span className="text-[#997819]">Audit</span> Coverage.
            </h2>
            {/* max-w-md ko hata kar margin top add kiya hai balance ke liye */}
            <p className="text-zinc-400 max-w-2xl font-medium mt-6 italic">
              We ensure your business meets all 12 core elements of the <Link href="https://bizgrow-holdings.com/what-is-ssip-accreditation/" className="text-[#997819] font-bold mr-1">SSIP</Link>
              threshold standard.
            </p>
          </div>

          {/* Grid remains the same */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "H&S Policy & Arrangements",
              "Risk Assessments",
              "COSHH Assessments",
              "Training & Supervision",
              "Sub-contractor Management",
              "Accident Reporting",
            ].map((text, i) => (
              <div
                key={i}
                className="p-8 border border-zinc-100 rounded-[2rem] hover:bg-zinc-50 transition-colors flex items-center gap-6 group"
              >
                <CheckCircle2 className="text-zinc-200 group-hover:text-[#997819] transition-colors" />
                <span className="font-bold text-[#12066a] uppercase text-sm tracking-tight">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 New Section. WHY IT MATTERS (Blueprint Split Layout) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6">
                Market Authority
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none ">
                How SMAS Helps You
                <span className="text-[#997819]"> Win More Tenders </span> &
                Site Approvals
              </h2>
              <p className="py-4">
                SMAS accreditation strengthens pre-qualification submissions for
                tenders by proving compliance with recognised <Link href="https://bizgrow-holdings.com/key-components-of-health-and-safety-policy/" className="text-[#997819] font-bold">UK health and
                safety</Link> standards. Many tender portals and procurement teams
                accept SMAS as evidence of competence, reducing the need to
                complete multiple safety questionnaires.
              </p>
              <p className="py-4">
                For site approvals, <Link href="https://bizgrow-holdings.com/smas-accreditation-requirements-in-the-uk/" className="text-[#997819] font-bold">SMAS</Link> speeds up onboarding by showing that
                your business already meets baseline safety requirements. This
                makes it easier to gain approval from principal contractors,
                local authorities, and commercial clients, improving access to
                more tender opportunities and projects.
              </p>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-zinc-100 rounded-[4rem] -rotate-3" />
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                <Image
                  src="/site-approvals.jpg"
                  width={600}
                  height={700}
                  alt="SMAS Helps You Win More Tenders - BizGrow "
                  className="object-cover h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 4. DATA BAR (Impact Metrics) */}
      <section className="py-20 bg-[#12066a] mx-6 rounded-[3rem]">
        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-4 gap-10">
          {[
            { n: "100%", t: "Pass Rate" },
            { n: "5 Days", t: "Avg. Turnaround" },
            { n: "500+", t: "Firms Audited" },
            { n: "£0", t: "Hidden Fees" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="text-5xl font-black text-white block mb-2 tracking-tighter">
                {stat.n}
              </span>
              <span className="text-[#997819] font-black uppercase text-[10px] tracking-widest">
                {stat.t}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 5. THE PROCESS (Left-Aligned Steps) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Steps on the Left */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter leading-none mb-6 uppercase">
                Key Benefits of <br />{" "}
                <span className="text-[#997819]">SMAS Accreditation </span>for
                Your Business
              </h2>
              <p className="mb-6">
                SMAS accreditation offers several practical benefits for UK
                businesses:
              </p>
              <div className="space-y-8">
                {[
                  {
                    t: "Improves credibility with clients and contractors",
                  },
                  {
                    t: "Supports compliance with UK health and safety regulations",
                  },
                  {
                    t: "Reduces repeated paperwork during tender submissions",
                  },
                  {
                    t: "Increases acceptance on construction and commercial sites",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-4xl font-black text-zinc-300 group-hover:text-[#997819] transition-colors">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-black text-[#12066a] uppercase text-lg mb-2">
                        {step.t}
                      </h3>
                      <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual on the Right */}
            <div className="relative h-150  bg-zinc-900 rounded-[4rem] overflow-hidden group">
              <Image
                src="/smas-process.jpg"
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                alt="Key Benefits of SMAS - BizGrow Holdings Ltd"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-10 bg-white shadow-2xl rounded-[2.5rem] flex flex-col items-center">
                  <ClipboardList className="text-[#997819] mb-4" size={48} />
                  <span className="text-[#12066a] font-black uppercase tracking-widest text-xs">
                    Ready for Audit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 6. SSIP LOGO STRIP (Trust) */}
      <section className="py-16 bg-zinc-50 border-y border-zinc-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
            {/* Replace with actual SSIP member logos if available */}
            <span className="font-black text-xl italic uppercase tracking-tighter">
              CHAS Registered
            </span>
            <span className="font-black text-xl italic uppercase tracking-tighter">
              SafeContractor
            </span>
            <span className="font-black text-xl italic uppercase tracking-tighter">
              Constructionline
            </span>
          </div>
        </div>
      </section>

      {/* 🔹 New Section: WHO NEEDS SMAS (Target Audience Grid) */}
      <section className="py-22 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* 1. Centered Heading & Description Section */}
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6">
              Industry Standards
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-[#12066a] tracking-tighter leading-none uppercase">
              Who Needs <br />
              <span className="text-[#997819]">SMAS Certification?</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl font-medium mt-8 italic leading-relaxed">
              Any organisation required to show health and safety compliance
              during tendering or site access can benefit from <Link href="https://bizgrow-holdings.com/what-is-smas-accreditation/" className="text-[#997819] font-bold">SMAS
              accreditation</Link>, especially those working under principal
              contractors.
            </p>
          </div>

          {/* 2. Grid Cards Section (Perfect as requested) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Construction",
                desc: "Main contractors and specialised subcontractors.",
                icon: <Building2 size={32} />,
              },
              {
                title: "Facilities",
                desc: "Management providers and cleaning services.",
                icon: <ClipboardList size={32} />,
              },
              {
                title: "Maintenance",
                desc: "Repair contractors and service providers.",
                icon: <Wrench size={32} />,
              },
              {
                title: "Security & HR",
                desc: "Security firms and labour supply agencies.",
                icon: <ShieldCheck size={32} />,
              },
              {
                title: "SMEs",
                desc: "Small firms bidding for public sector tenders.",
                icon: <BarChart3 size={32} />,
              },
              {
                title: "Specialist Services",
                desc: "Contractors supplying labour or niche services.",
                icon: <Zap size={32} />,
              },
              {
                title: "Tendering Teams",
                desc: "Businesses bidding for framework agreements.",
                icon: <FileBadge size={32} />,
              },
              {
                title: "Site Induction",
                desc: "Organisations meeting site access standards.",
                icon: <CheckCircle2 size={32} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 bg-white border border-zinc-200 rounded-[2.5rem] hover:bg-[#12066a] transition-all duration-500"
              >
                <div className="text-[#997819] group-hover:text-white mb-6 transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-[#12066a] group-hover:text-white uppercase mb-3 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 text-sm font-medium leading-relaxed transition-colors duration-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Accent Line */}
          <div className="mt-20 flex justify-center">
            <div className="h-1 w-40 bg-gradient-to-r from-transparent via-[#997819] to-transparent opacity-30" />
          </div>
        </div>
      </section>
      {/* 🔹 New Section: HOW BIZGROW HELPS (Strategy Section) */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Side: Content */}
            <div className="relative z-10">
              <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-xs mb-6">
                Our Strategy
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter leading-none mb-10 uppercase">
                How BizGrow Helps You Get <br />
                <span className="text-[#997819]">SMAS Approved Faster</span>
              </h2>
              <p className="text-zinc-600 text-lg font-medium leading-relaxed mb-8">
                BizGrow Holdings supports UK businesses by simplifying the SMAS
                accreditation process. We act as your dedicated compliance
                partner, ensuring every document is audit-ready from day one.
              </p>

              <div className="p-8 bg-zinc-50 rounded-[2.5rem] border-l-4 border-[#997819]">
                <p className="text-[#12066a] font-bold italic">
                  "We focus on identifying gaps and aligning policies with SMAS
                  requirements so you can avoid delays and rejections."
                </p>
              </div>
            </div>

            {/* Right Side: Feature list with icons */}
            <div className="grid gap-4">
              {[
                {
                  title: "Document Review",
                  desc: <>Full <Link href="https://bizgrow-holdings.com/our-services/internal-audit/" className="text-[#997819] font-bold">audit</Link> of your existing health and safety documents to identify missing links.</>,
                  icon: <ClipboardList className="text-[#997819]" />,
                },
                {
                  title: "Policy Alignment",
                  desc: "Refining and updating your procedures to meet the strict 12 core elements of SSIP.",
                  icon: <FileBadge className="text-[#997819]" />,
                },
                {
                  title: "Risk Assessment Support",
                  desc: "Helping you develop structured risk assessments that meet UK assessment standards.",
                  icon: <ShieldCheck className="text-[#997819]" />,
                },
                {
                  title: "Efficiency & Renewals",
                  desc: "Structured guidance for faster initial approval and seamless future renewals.",
                  icon: <Zap className="text-[#997819]" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 border border-zinc-100 rounded-3xl flex gap-6 items-start hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 bg-white group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center shrink-0 group-hover:bg-[#12066a] group-hover:text-white transition-colors duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-black text-[#12066a] uppercase text-sm mb-1">
                      {item.title}
                    </p>
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#997819]/5 rounded-full blur-3xl -z-10" />
      </section>
      {/* 🔹 7. CTA SECTION (Fixed Parallax Effect) */}
      <section className="py-22 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative group overflow-hidden rounded-[3.5rem] p-10 md:p-24 shadow-2xl flex flex-col items-center text-center">
            {/* 🖼️ FIXED PARALLAX BACKGROUND */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed transition-transform duration-300 "
                style={{ backgroundImage: "url('/smas-cta.jpg')" }}
              />
              <div className="absolute inset-0 bg-[#12066a]/40 mix-blend-multiply z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12066a]/40 to-[#12066a] z-20" />
            </div>

            <div className="relative z-30 w-full max-w-4xl flex flex-col items-center">
              <FadeIn direction="up">
                <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-10">
                  Accreditation Guaranteed
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8 uppercase">
                  Fast-Track <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37] inline-block mt-2">
                    Your Success.
                  </span>
                </h2>
              </FadeIn>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-4">
                <FadeIn direction="up" delay={0.2}>
                  <Link href="/contact-us">
                  <button className="relative group/btn overflow-hidden w-full sm:w-64 bg-[#997819] text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500">
                    <span className="relative z-40 group-hover/btn:text-[#12066a] transition-colors duration-500">
                      Get Your SMAS Badge
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
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

export default SMASPage;

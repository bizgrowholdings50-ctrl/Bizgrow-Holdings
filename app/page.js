import HeroCarousel from "@/components/HeroCarousel";
import FadeIn from "@/components/MotionWrapper";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Trophy,
  Globe2,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import HorizontalServices from "@/components/HorizontalProcess";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "Understanding Your Business & Compliance Position",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Building a Clear Certification & Compliance Roadmap",
  },
  {
    num: "03",
    title: "Implementation",
    desc: (
      <>
        System Development,{" "}
        <Link
          href="/corporate-training-and-coaching/"
          className="text-[#997819] font-bold"
        >
          Training
        </Link>{" "}
        & Operational Alignment
      </>
    ),
  },
  {
    num: "04",
    title: "Certification",
    desc: (
      <>
        Final{" "}
        <Link href="/internal-audit/" className="text-[#997819] font-bold">
          Audit
        </Link>{" "}
        Support & Long-Term Compliance Success
      </>
    ),
  },
];

const reviews = [
  {
    name: "John Smith",
    role: "Director, Shield Security",
    text: "BizGrow Holdings made our ISO 9001 certification process straightforward and structured. Their team guided us step by step from gap analysis to final audit.",
  },
  {
    name: "Sarah Ahmed",
    role: "Operations Manager",
    text: "Their compliance expertise helped us secure contracts we were previously losing. BizGrow helped us strengthen our policies and audit documentation.",
  },
  {
    name: "David Warner",
    role: "CEO, TechLogix",
    text: "Professional, practical, and results-driven consultancy. BizGrow Holdings built a system that actually works in our daily operations.",
  },
];

export const metadata = {
  title: "BizGrow Holdings | Security Business Growth & Compliance",
  description:
    "BizGrow Holdings helps UK security businesses achieve ISO & ACS compliance, win contracts, and grow with expert guidance and strategies.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#997819] selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroCarousel />

      {/* 2 About Us  */}
      <section className="relative mt-10 z-30 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#12066a] rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-start justify-between gap-12 border-4 border-white">
            {/* Stat 1 */}
            <div className="flex items-center gap-5">
              <div className="bg-white/10 p-4 rounded-2xl">
                <Trophy className="text-white w-8 h-8" />
              </div>
              <div>
                <span className="text-white text-3xl font-black leading-none">
                  100+
                </span>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">
                  Successful Audits
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-5">
              <div className="bg-white/10 p-4 rounded-2xl">
                <CheckCircle2 className="text-white w-8 h-8" />
              </div>
              <div>
                <span className="text-white text-3xl font-black  leading-none">
                  99%
                </span>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">
                  Pass Rate
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-5">
              <div className="bg-white/10 p-4 rounded-2xl">
                <Globe2 className="text-white w-8 h-8" />
              </div>
              <div>
                <span className="text-white text-3xl font-black  leading-none">
                  UK Wide
                </span>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1">
                  Coverage
                </p>
              </div>
            </div>
            <Link href="/contact-us">
              <button className="bg-white text-[#12066a] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg active:scale-95">
                Book a Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Stats  */}
      <section className="py-14 px-6">
        {/* Yahan changes kiye hain: flex-col-reverse se mobile par content upar aur image niche ho jayegi */}
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center">
          {/* Image Section (Ab ye mobile par niche dikhega) */}
          <FadeIn direction="left" className="relative w-full lg:w-1/2">
            <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/our-approach-home.jpg"
                alt="Our Approach - BizGrow Holdings Ltd"
                fill
                className="object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-10 right-10 bg-[#997819] p-8 rounded-[2rem] text-white hidden md:block shadow-xl">
              <div className="text-4xl font-black">10+</div>
              <div className="text-xs uppercase font-bold tracking-widest">
                Years Experience
              </div>
            </div>
          </FadeIn>

          {/* Content Section (Ab ye mobile par upar dikhega) */}
          <FadeIn direction="right" className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-black text-[#12066a] leading-tight">
              Our
              <span className="text-[#997819]"> Approach</span>
            </h1>
            <div className="mt-8 space-y-6 text-zinc-600 leading-relaxed font-medium">
              <p>
                We follow a structured approach with clients, i.e. We start by
                meeting with your management team to fully understand your
                goals, challenges, and{" "}
                <Link
                  href="/compliance-consultancies/"
                  className="text-[#997819] font-bold"
                >
                  compliance
                </Link>{" "}
                needs. Then, we work side-by-side to design and implement the
                most effective, tailored solution through every phase:
              </p>

              <ul className="space-y-4 pt-4">
                {[
                  "Strategic & Project Planning",
                  "Stakeholder Engagement",
                  "Project Kick-off",
                  "Staff Training on Latest Industry Standards",
                  "Post-Implementation Support",
                  "Internal Audits & Performance Checks",
                  "Implementation of Quality Management Systems (QMS)",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[#12066a] font-bold"
                  >
                    <CheckCircle2 className="text-[#997819]" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-black">
                Your growth is our goal, and compliance is just the
                beginning.{" "}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. HORIZONTAL SERVICES (GSAP PINNED SECTION) */}
      <HorizontalServices />

      <section className="py-24 min-h-screen lg:h-auto bg-[#12066a] relative overflow-hidden">
        {/* Decorative Background Text */}
        <Image
          src="/experts-home.jpg"
          alt="BizGrow operational excellence roadmap"
          fill
          className="object-cover hidden md:block"
        />
        {/* Black Overlay Effect */}
        <div className="hidden md:block absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        <div className="absolute top-10 right-0 text-[4rem] md:text-[15rem] font-black text-white/10 select-none leading-none -translate-y-1/4">
          BIZGROW
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20">
            <span className="text-[#997819] font-black uppercase tracking-[0.3em] text-xs">
              Our Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
              The Path to{" "}
              <span className="text-[#997819]">Operational Excellence</span>
            </h2>
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.2} direction="right">
                <div className="relative group">
                  {/* Step Number */}
                  <div className="text-6xl font-black text-white group-hover:text-[#997819] transition-colors duration-500 mb-4">
                    {step.num}
                  </div>

                  {/* Line Decor */}
                  <div className="w-12 h-1 bg-[#997819] mb-6 group-hover:w-24 transition-all duration-500" />

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-blue-100/70 text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-32 bg-zinc-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reviews.map((rev, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="p-12 rounded-[3.5rem] bg-white shadow-xl border border-zinc-300 flex flex-col justify-between h-full hover:border-[#997819] transition-transform  group">
                  <p className="text-[#12066a] font-medium leading-relaxed italic mb-10 text-lg">
                    "{rev.text}"
                  </p>
                  <div>
                    <h4 className="font-black text-[#12066a] text-xl uppercase italic">
                      {rev.name}
                    </h4>
                    <p className="text-[#997819] text-xs font-bold uppercase tracking-widest mt-1">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7 CTA Section with Background Parallax & Watermark */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto bg-[#12066a] rounded-[3rem] p-7 md:p-20 relative overflow-hidden shadow-2xl group">
          {/* 🖼️ 1. Parallax Background Layer */}
          {/* FIXED: Added 'md:bg-fixed' because 'bg-fixed' breaks on many mobile browsers/iOS */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat md:bg-fixed opacity-20 transition-transform duration-1000"
            style={{
              backgroundImage: "url('/home-cta.jpg')",
            }}
            aria-hidden="true" // Hide decorative background from screen readers
          />

          {/* 🔹 2. Background Large Text (Watermark) */}
          <div className="absolute top-0 right-0 text-[10rem] md:text-[15rem] font-black text-white/5 select-none leading-none -translate-x-7 translate-y-6 pointer-events-none uppercase z-10">
            BIZGROW
          </div>

          {/* Background Decor Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#997819]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-10" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl z-10" />

          {/* Content Layer */}
          <div className="relative z-20 flex flex-col items-center justify-between gap-12">
            <div className="text-center lg:text-left max-w-2xl">
              {/* SEO FIX: Use <h2> if <h1> is already used in Hero, or keep <h2> for hierarchy */}
              <h2 className="text-[32px] md:text-6xl text-center font-black text-white leading-tight">
                Ready to Secure Your
                <span className="text-[#997819]"> Business Future?</span>
              </h2>
              <p className="text-blue-100/80 text-center mt-6 text-sm md:text-lg font-medium">
                Our compliance experts support UK organisations with SIA ACS
                approval, ISO certifications, and structured growth strategies
                designed to deliver measurable results. Build audit-ready
                systems. Win contracts. Operate with confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              {/* ACCESSIBILITY FIX: Added aria-label for clear context */}
              <Link
                href="/contact-us"
                aria-label="Book a free consultation with our compliance experts"
                className="relative group/btn overflow-hidden inline-flex items-center justify-center gap-3 bg-white text-[#12066a] px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 shadow-lg active:scale-95"
              >
                {/* Yahan humne text color ko hover par dark blue rakha hai taake contrast hamesha high rahe */}
                <span className="relative z-40 flex items-center gap-3 transition-colors duration-500 group-hover/btn:text-white">
                  Book Free Consultation
                  <ArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                </span>

                {/* Hover background color white hi rakha hai kyunke wo dark blue text ke sath perfect dikhta hai */}
                <div className="absolute inset-0 bg-[#997819] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
              </Link>

              {/* ACCESSIBILITY FIX: Added aria-label and descriptive text */}
              <a
                href="tel:+447898205035"
                aria-label="Call BizGrow Holdings at +44 7898205035"
                className="relative group/phone overflow-hidden inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 shadow-lg active:scale-95"
              >
                <span className="relative z-50 flex items-center gap-3 transition-colors duration-500 group-hover/phone:text-[#12066a]">
                  <PhoneCall size={18} /> +44 7898205035
                </span>
                <div className="absolute inset-0 bg-white -translate-x-full group-hover/phone:translate-x-0 transition-transform duration-500 ease-out z-40" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

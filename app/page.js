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
  Home,
} from "lucide-react";
import HorizontalServices from "@/components/HorizontalProcess";
import HomeTestimonial from "@/components/HomeTestimonial";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/jsonSchemas";

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
    name: "Keyur Kachhadiya",
    role: "Director, Immaculate & Co. Ltd",
    text: "We had an excellent experience with BIZGrow Holding during our COP119 audit. Their team was professional, efficient, and highly knowledgeable, making the entire process smooth and well-structured. The guidance provided was invaluable, and their attention to detail ensured a thorough assessment. We highly recommend their services to any business looking for reliable audit and accreditation support.",
  },
  {
    name: "Shehzad Nazir",
    role: "Director, Progressive Group Services Ltd",
    text: "We’ve worked with Bizgrow Holdings Ltd for over two years and their support has been outstanding. They have successfully guided us through two ACS audits and COP119 compliance, providing expert advice and practical solutions throughout.Professional, knowledgeable, and always responsive. I would highly recommend Bizgrow Holdings Ltd to any security company looking for compliance and business support",
  },
  {
    name: "Denzil Fernandes",
    role: "Director, Jehovah Jireh Security Services Ltd",
    text: "Bizgrow has been helpful since day one until the last They did their level best in completing my process going out of limit I'm very thankful and grateful for their support and hard work It looked so difficult in beginning but because of their excellent service I was able to",
  },
];

const clients = [
  {
    name: "Guardnwatch",
    logo: "/guardnwatch.png",
    alt: "Guardnwatch | BizGrow Client",
  },
  {
    name: "Guarding Professionals",
    logo: "/guarding-professionals-removebg.png",
    alt: "Guarding Professionals | BizGrow Client",
  },
  {
    name: "MBS Security FM",
    logo: "/mbs-security.png",
    alt: "MBS Security FM | BizGrow Client",
  },
  {
    name: "Blue Nine",
    logo: "/Blue_Nine.png",
    alt: "Blue Nine | BizGrow Client",
  },
  {
    name: "BNK Services",
    logo: "/bnk-services.png",
    alt: "BNK Services | BizGrow Client",
  },
  {
    name: "Cerberus Security",
    logo: "/cerberus.png",
    alt: "Cerberus Security | BizGrow Client",
  },
  {
    name: "Vigilant Business Solutions",
    logo: "/vigilant.png",
    alt: "Vigilant Business Solutions | BizGrow Client",
  },
  {
    name: "Z.A.M FM LTD",
    logo: "/zam-fm.png",
    alt: "Z.A.M FM LTD | BizGrow Client",
  },
  {
    name: "Brites Security Solutions",
    logo: "/brites.png",
    alt: "Brites Security Solutions | BizGrow Client",
  },
  {
    name: "Krypton Group",
    logo: "/krypton.png",
    alt: "Krypton Group | BizGrow Client",
  },
  {
    name: "Marshall Security Services",
    logo: "/marshall.png",
    alt: "Marshall Security Services | BizGrow Client",
  },
  {
    name: "Rawal Veritas LTD",
    logo: "/rawal.png",
    alt: "Rawal Veritas LTD | BizGrow Client",
  },
  {
    name: "ZSS Security",
    logo: "/zss-removebg.png",
    alt: "ZSS Security | BizGrow Client",
  },
  {
    name: "Pacific",
    logo: "/pacific-removebg.png",
    alt: "Pacific | BizGrow Client",
  },
  { name: "G4D", logo: "/g4d.png", alt: "G4D | BizGrow Client" },
  {
    name: "MTK Group",
    logo: "/patriot-removebg.png",
    alt: "MTK Group | BizGrow Client",
  },
  {
    name: "Comprehensive Security",
    logo: "/Comprehensive-removebg.png",
    alt: "Comprehensive Security | BizGrow Client",
  },
  {
    name: "Supreme Security",
    logo: "/supreme.png",
    alt: "Supreme Security | BizGrow Client",
  },
  { name: "Elma", logo: "/elma02-removebg.png", alt: "Elma | BizGrow Client" },
  { name: "Akita", logo: "/akita.png", alt: "Akita | BizGrow Client" },
  { name: "Mountain", logo: "/mountain.png", alt: "Mountain | BizGrow Client" },
  { name: "Jehova", logo: "/jehova-bg.png", alt: "Jehova | BizGrow Client" },
  {
    name: "Security Jobs",
    logo: "/security-jobs-removebg.png",
    alt: "Security Jobs | BizGrow Client",
  },
  {
    name: "Great Guard",
    logo: "/aamir-apex-removebg.png",
    alt: "Great Guard | BizGrow Client",
  },
];

export const metadata = {
  title: "BizGrow Holdings | Security Business Growth & Compliance",
  description:
    "BizGrow Holdings helps UK security businesses achieve ISO & ACS compliance, win contracts, and grow with expert guidance and strategies.",
};

export default function HomePage() {
  return (
    <>
      <JsonLd schema={organizationSchema} />
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
              <Link href="/contact-us" className="md:hidden xl:block">
                <button className="bg-white text-[#12066a] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg active:scale-95">
                  Book a Free Consultation
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
                <div className="text-4xl font-black">13+</div>
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
                      <CheckCircle2 className="text-[#997819]" size={20} />{" "}
                      {item}
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

        <section className="py-16 md:py-24 xl:h-screen bg-[#12066a] relative overflow-hidden">
          {/* Decorative Background Text */}
          <Image
            src="/experts-home.jpg"
            alt="BizGrow operational excellence roadmap"
            fill
            className="object-cover hidden md:block"
          />
          {/* Black Overlay Effect */}
          <div className="hidden md:block absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
          <div
            aria-hidden="true"
            className="absolute top-6 right-0 md:top-10 lg:right-8 xl:right-20 text-[3.5rem] sm:text-[5rem] md:text-[15rem] lg:text-[10rem] font-black text-white/60 md:text-white/20 select-none leading-none -translate-y-1/4 whitespace-nowrap"
          >
            BIZGROW
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-10 md:mb-20">
              <span className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-xs">
                Our Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-4">
                The Path to{" "}
                <span className="text-[#997819]">Operational Excellence</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.2} direction="right">
                  <div className="relative group">
                    {/* Step Number */}
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white group-hover:text-[#997819] transition-colors duration-500 mb-3 md:mb-4">
                      {step.num}
                    </div>

                    {/* Line Decor */}
                    <div className="w-10 md:w-12 h-1 bg-[#997819] mb-4 md:mb-6 group-hover:w-24 transition-all duration-500" />

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 md:mb-3 tracking-tight">
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

        <HomeTestimonial />

        {/* 7. CLIENTS SECTION */}
        <section className="relative py-24 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden">
          <div className="relative max-w-7xl mx-auto text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-[#997819] font-black uppercase tracking-[0.3em] text-xs">
                <span className="h-px w-8 bg-[#997819]" />
                Experts in Growing Private Security Businesses
                <span className="h-px w-8 bg-[#997819]" />
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12066a] mt-3 mb-3">
                OUR VALUABLE CLIENTS
              </h2>
              <p className="text-slate-500 font-medium mb-14">
                Our private security companies clients across the UK
              </p>
            </FadeIn>

            {/* Hairline-grid "wall" — no individual card shadows, unified border look */}
            <FadeIn direction="up">
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
                   rounded-4xl overflow-hidden border border-slate-200 bg-white
                   shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                {clients.map((client, idx) => (
                  <div
                    key={idx}
                    className="group relative flex items-center justify-center h-28
                       border-slate-200
                       [&:not(:nth-child(6n))]:border-r
                       [&:not(:nth-last-child(-n+6))]:border-b
                       md:[&:not(:nth-child(4n))]:border-r md:[&:nth-child(4n)]:border-r-0
                       sm:[&:not(:nth-child(3n))]:border-r sm:[&:nth-child(3n)]:border-r-0
                       overflow-hidden transition-colors duration-300"
                  >
                    {/* Diagonal shine sweep on hover */}
                    <div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                         transition-transform duration-700 ease-out pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 40%, rgba(153,120,25,0.12) 50%, transparent 60%)",
                      }}
                    />
                    <div className="relative w-full h-full  p-6">
                      <Image
                        src={client.logo}
                        alt={client.alt}
                        fill
                        className="object-contain p-4  transition-transform duration-300 group-hover:scale-[1.06]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 8 CTA Section with Background Parallax & Watermark */}
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
            <div
              aria-hidden="true"
              className="absolute top-28 md:top-0 right-0 text-[3rem] md:text-[15rem] font-black text-white/[0.12] select-none leading-none -translate-x-7 translate-y-6 pointer-events-none uppercase z-10"
            >
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
                  <span className="text-[#D4AF37]"> Business Future?</span>
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
    </>
  );
}

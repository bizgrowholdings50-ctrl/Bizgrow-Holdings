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
import OurClients from "@/components/OurClients";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/jsonSchemas";
import ServicesFaq from "@/components/ServicesFaq";
import { ShieldCheck, Award, FileText, Lock } from "lucide-react";
import HomeServices from "@/components/HomeServices";

const steps = [
  {
    num: "01",
    title: "Assess & Plan",
    desc: "We check where your business stands today, find any gaps, review your paperwork, and guide you on what to do next.",
    icon: FileText,
  },
  {
    num: "02",
    title: "Build the Strategy",
    desc: "We set up your documentation and QMS portal, walk you through a clear step-by-step process, and train you on assessment documents.",
    icon: ShieldCheck,
  },
  {
    num: "03",
    title: "Audit & Certification",
    desc: "We run your internal audit first to catch anything early, then stand by you through the external audit with fast-track guidance.",
    icon: CheckCircle2,
  },
  {
    num: "04",
    title: "Ongoing Support & Growth",
    desc: "Get a dedicated project manager and 12 months of reliable customer support and advice to help you keep improving.",
    icon: Trophy,
  },
];

const homeFaqs = [
  {
    q: "How is Bizgrow different from a regular compliance consultant?",
    a: "We plan across certifications from the start, so paperwork built for one standard carries into the next — instead of starting from scratch every time.",
  },
  {
    q: "Which certifications do you help with?",
    a: "SIA ACS, ISO 9001/14001/45001, BS 7858, CHAS, SafeContractor, Constructionline, and other industry certifications for security, construction, and cleaning companies.",
  },

  {
    q: "Do you help with staff vetting too?",
    a: "Yes — full BS 7858 vetting support, from documentation to ongoing file maintenance.",
  },
  {
    q: "Do you only help with first-time certification, or renewals too?",
    a: "Both. We also manage surveillance audits, renewals, and keep your policies current so nothing lapses.",
  },
  {
    q: "What happens after I get certified?",
    a: "You get 12 months of ongoing support, plus advice to keep improving and stay ready for renewal audits.",
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

// Sections data with integrated icons
const sections = [
  {
    id: "01",
    tag: "Security Standards",
    title: "Security Accreditation",
    description:
      "Build credibility, strengthen your operational compliance and meet recognised UK security benchmarks.",
    bgImage: "/bff32405515f5c8002a7bed0ada4c092.jpg",
    highlightText: "SIA ACS & Vetting Compliance",
    icon: ShieldCheck,
    details:
      "Comprehensive framework alignment designed to elevate private security operational trust and credentials across the UK market.",
  },
  {
    id: "02",
    tag: "Quality Frameworks",
    title: "Quality & Management",
    description:
      "Implement structured management systems that improve consistency, corporate performance, and business confidence.",
    bgImage: "/Quality-Management.jpg",
    highlightText: "ISO 9001, 14001 & 45001",
    icon: Award,
    details:
      "Drive organisational excellence, environmental responsibility, and robust occupational safety standards systematically.",
  },
  {
    id: "03",
    tag: "Contractor Compliance",
    title: "Health & Safety",
    description:
      "Strengthen contractor credentials and prepare your organisation for elite, verified UK safety accreditations.",
    bgImage: "/Healt & Safety.jpg",
    highlightText: "CHAS, SafeContractor & Constructionline",
    icon: FileText,
    details:
      "Seamless documentation and audit readiness to clear pre-qualification barriers and secure high-value contracts.",
  },
  {
    id: "04",
    tag: "Digital Protection",
    title: "Cyber Security",
    description:
      "Demonstrate rigorous digital resilience and ensure your organisation protects sensitive data against modern threats.",
    bgImage: "/Cyber-Security.jpg",
    highlightText: "Cyber Essentials & Plus",
    icon: Lock,
    details:
      "Independent technical verification and security controls that provide instant assurance to your enterprise clients.",
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
        {/* 2 Stats */}

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

        {/* 4. SERVICES (GSAP PINNED SECTION) */}
        <HomeServices />

        {/* Our Process */}
        <section className="py-20 md:py-28 bg-[#12066a] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
              <span className="px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 border-l-[#997819] border-l-4 text-white text-xs md:text-xs font-black tracking-[0.3em] uppercase">
                Our Compliance Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mt-3 mb-4">
                How It <span className="text-[#D4AF37]">Works</span>
              </h2>
              <p className="text-blue-100/80 text-sm sm:text-base font-medium">
                A proven, step-by-step methodology that takes you from zero to
                audit-ready with one team managing every stage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={i}
                    className="group relative flex flex-col rounded-[2rem] p-7 overflow-hidden bg-[#12066a] border border-white/15 shadow-xl hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-[0_25px_50px_-15px_rgba(212,175,55,0.25)] transition-all duration-500"
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-20"
                      style={{ backgroundImage: `url(${step.bgImage})` }}
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#12066a] via-[#12066a]/90 to-[#12066a]/70" />

                    {/* Step connector line (desktop only) */}
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-14 -right-4 w-8 h-[2px] bg-gradient-to-r from-[#D4AF37]/40 to-transparent z-30" />
                    )}

                    {/* Top row: Icon + Number */}
                    <div className="relative z-20 flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] backdrop-blur-md shadow-inner group-hover:bg-[#D4AF37] group-hover:text-[#12066a] group-hover:scale-105 transition-all duration-300">
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center font-black text-xs border border-white/10 group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-all duration-300">
                        {step.num}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 flex-1">
                      <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-blue-100/75 text-sm leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="relative z-20 mt-5 pt-4 border-t border-white/10">
                      <div className="h-[3px] w-8 bg-[#D4AF37]/60 rounded-full group-hover:w-14 transition-all duration-500" />
                    </div>

                    {/* Corner glow on hover */}
                    <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}

        <HomeTestimonial />

        {/* 7. CLIENTS SECTION — Premium Marquee */}
        <OurClients />

        <ServicesFaq faqs={homeFaqs} title="Frequently Asked Questions" />

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
                  Let’s Get Your Business{" "}
                  <span className="text-[#D4AF37]">Audit-Ready Today.</span>
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

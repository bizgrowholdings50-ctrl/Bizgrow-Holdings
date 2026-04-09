import React from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Target,
  Headphones,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
import Link from "next/link";

// 📝 ON-PAGE SEO DATA
export const metadata = {
  title: "Customer Services for Security Businesses | BizGrow Holdings",
  description:
    "Expert customer service for UK security businesses. BizGrow Holdings delivers support in compliance, ISO, ACS, training, and business growth.",
};

const CustomerServicePage = () => {
  return (
    <main className="bg-white overflow-hidden">
      {/* 🔹 1. HERO SECTION */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center pt-24 overflow-hidden bg-[#12066a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/customer-hero.webp" // Replace with your image path
            alt="Internal Audit Services"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12066a]/80 via-transparent to-[#12066a]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <FadeIn direction="up">
            <span className="inline-block text-[#997819] font-black uppercase tracking-[0.5em] text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-8">
              Stay Compliant
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-8">
              Customer
              <span className="text-transparent ml-3 bg-clip-text bg-gradient-to-b from-[#997819] to-[#d4af37]">
                Services
              </span>
            </h1>
            <p className="text-blue-100/80 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed">
              At{" "}
              <Link href="/" className="text-[#997819] font-bold">
                BizGrow Holdings
              </Link>
              , customer service isn’t just a department; it’s the foundation of
              everything we do. We deliver expert{" "}
              <Link
                href="https://bizgrow-holdings.com/compliance-consultancies/"
                className="text-[#997819] font-bold"
              >
                compliance
              </Link>{" "}
              guidance and business growth solutions, ensuring every client
              experience is seamless, professional, and genuinely supportive.
            </p>
            <Link href="/contact-us">
              <button className="bg-[#997819] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-2xl">
                Get a Free Consultation
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. OUR APPROACH (Side-by-Side Modern Layout) */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-4xl md:text-7xl  font-black text-[#12066a] uppercase tracking-tighter leading-none mb-10">
                Our Approach to
                <span className="text-[#997819]"> Customer Care</span>
              </h2>
              <p className="text-zinc-500  text-lg leading-relaxed mb-8">
                At{" "}
                <Link href="/about-us" className="text-[#997819] font-bold">
                  BizGrow Holdings
                </Link>
                , we deliver customer service that is personal, responsive, and
                reliable.
              </p>
              <div className="p-8 bg-[#12066a] rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <p className="relative z-10 font-medium italic opacity-90">
                  Whether you are a new UK business seeking{" "}
                  <Link
                    href="https://bizgrow-holdings.com/our-services/iso-9001/"
                    className="text-[#997819] font-bold"
                  >
                    ISO
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="https://bizgrow-holdings.com/our-services/sia-acs/"
                    className="text-[#997819] font-bold"
                  >
                    ACS
                  </Link>{" "}
                  certification or an established company aiming for growth, our
                  dedicated team ensures a smooth, supportive experience every
                  step of the way.
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#997819]/20 blur-3xl rounded-full" />
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  t: "Friendly & Professional Support",
                  d: (
                    <>
                      Every enquiry is handled with care and respect, providing
                      fast, accurate responses to all your questions.{" "}
                      <Link
                        href="https://bizgrow-holdings.com/our-mission/"
                        className="text-[#997819] font-bold"
                      >
                        Our goal
                      </Link>{" "}
                      is to make your journey with us as stress-free and
                      straightforward as possible.
                    </>
                  ),
                  icon: <Headphones className="w-8 h-8" />,
                },
                {
                  t: "Expert UK Security Consultants",
                  d: (
                    <>
                      Our team consists of industry-certified security
                      consultants who understand the unique challenges of the{" "}
                      <Link
                        href="https://bizgrow-holdings.com/how-to-start-a-security-company-in-the-uk/"
                        className="text-[#997819] font-bold"
                      >
                        UK security
                      </Link>{" "}
                      and compliance sector. From{" "}
                      <Link
                        href="https://bizgrow-holdings.com/our-services/iso-14001/"
                        className="text-[#997819] font-bold"
                      >
                        ISO
                      </Link>{" "}
                      certification to{" "}
                      <Link
                        href="https://bizgrow-holdings.com/get-acs-accreditation-fast/"
                        className="text-[#997819] font-bold"
                      >
                        ACS
                      </Link>{" "}
                      accreditation, we provide guidance you can trust.
                    </>
                  ),
                  icon: <ShieldCheck className="w-8 h-8" />,
                },
                {
                  t: "Tailored Solutions for Your Business",
                  d: (
                    <>
                      We listen first, understanding your business needs, and
                      then deliver customised solutions designed to meet your
                      specific requirements. Every strategy is aligned with UK
                      regulations and focused on maximising growth and{" "}
                      <Link
                        href="https://bizgrow-holdings.com/benefits-of-supply-chain-management-for-compliance/"
                        className="text-[#997819] font-bold"
                      >
                        compliance
                      </Link>{" "}
                      success.
                    </>
                  ),
                  icon: <Target className="w-8 h-8" />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-10 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group flex gap-8"
                >
                  <div className="text-[#997819] group-hover:scale-110 transition-transform bg-[#997819]/5 p-4 rounded-2xl h-fit">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#12066a] mb-3 uppercase tracking-tight">
                      {item.t}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. HOW WE CAN HELP (Glassmorphism Cards with Hover Effect) */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('/help-bg.jpg')", // Professional abstract background
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-[#12066a]/70 z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              How We <span className="text-[#997819]">Can Help</span>
            </h2>
            <p className="text-blue-100/60 mt-6 max-w-2xl mx-auto">
              At BizGrow Holdings, our customer service team provides expert
              guidance and support for UK businesses. We can assist with:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                t: "Compliance & Certification",
                d: (
                  <>
                    <Link
                      href="https://bizgrow-holdings.com/our-services/iso-45001/"
                      className="text-[#997819] font-bold"
                    >
                      ISO
                    </Link>
                    ,{" "}
                    <Link
                      href="https://bizgrow-holdings.com/acs-accreditation-for-security-businesses/"
                      className="text-[#997819] font-bold"
                    >
                      ACS
                    </Link>
                    , and{" "}
                    <Link
                      href="https://bizgrow-holdings.com/security-companies-are-considered-the-safest-choice/"
                      className="text-[#997819] font-bold"
                    >
                      UK security
                    </Link>{" "}
                    training queries.
                  </>
                ),
              },
              {
                t: "Project Updates",
                d: (
                  <>
                    Status on consultancy services and{" "}
                    <Link
                      href="https://bizgrow-holdings.com/our-services/internal-audit/"
                      className="text-[#997819] font-bold"
                    >
                      audits
                    </Link>
                    .
                  </>
                ),
              },
              {
                t: "Tender & Pre-Qualification Advice",
                d: "Understanding requirements for UK contracts.",
              },
              {
                t: "Documentation Guidance",
                d: (
                  <>
                    Preparing evidence for audits or{" "}
                    <Link
                      href="https://bizgrow-holdings.com/chas-assessment-criteria-registration-renewal/"
                      className="text-[#997819] font-bold"
                    >
                      certification renewals
                    </Link>
                    .
                  </>
                ),
              },
            ].map((help, i) => (
              <div
                key={i}
                className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md transition-all duration-700 hover:bg-white group cursor-pointer h-full"
              >
                <h3 className="text-[#997819] font-black mb-6 uppercase text-xs tracking-[0.2em]">
                  Service {i + 1}
                </h3>
                <p className="text-xl font-bold text-white group-hover:text-[#12066a] leading-tight mb-4 transition-colors duration-500">
                  {help.t}
                </p>
                <p className="text-blue-100/40 group-hover:text-zinc-500 text-sm transition-colors duration-500">
                  {help.d}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-[#997819] to-transparent rounded-full mb-6" />
            <blockquote className="text-2xl md:text-5xl font-black text-white italic uppercase tracking-tighter max-w-5xl mx-auto leading-tight">
              “We make your compliance and business growth journey{" "}
              <span className="text-[#997819]">
                seamless, professional, and stress-free.
              </span>
              ”
            </blockquote>
          </div>
        </div>
      </section>

      {/* 🔹 4. COMMUNICATION & COMMITMENT */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <h3 className="text-3xl font-black text-[#12066a] uppercase mb-10 tracking-tighter leading-none">
              Communication <br />{" "}
              <span className="text-[#997819]">That Works For You</span>
            </h3>
            <div className="space-y-4">
              {[
                {
                  i: <Phone className="w-5 h-5" />,
                  l: "Phone support during working hours.",
                },
                {
                  i: <Mail className="w-5 h-5" />,
                  l: "Email support with timely responses.",
                },
                {
                  i: <MessageSquare className="w-5 h-5" />,
                  l: "Direct message through our website and social media.",
                },
              ].map((comm, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 group hover:border-[#997819]/30 transition-all"
                >
                  <div className="text-[#997819] group-hover:rotate-12 transition-transform">
                    {comm.i}
                  </div>
                  <p className="font-bold text-[#12066a] uppercase text-sm tracking-tight">
                    {comm.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#12066a] p-16 rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-[#12066a]/40">
            <h3 className="text-4xl font-black uppercase mb-12 text-[#997819] tracking-tighter">
              Our Commitment
            </h3>
            <div className="grid md:grid-cols-1 gap-6 relative z-10">
              {[
                "Respond in a timely and clear manner.",
                "Respond to your requests professionally.",
                "Provide expert guidance tailored to your business needs.",
                "Support your growth with reliable compliance and training solutions",
                "Go the extra mile to make your journey with BizGrow Holdings stress-free and productive.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 pb-6 border-b border-white/5 last:border-0"
                >
                  <CheckCircle2 className="text-[#997819] w-6 h-6 flex-shrink-0" />
                  <p className="text-blue-100/70 text-lg font-medium tracking-tight leading-tight">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            {/* Background Branding Mark */}
            <div className="absolute -bottom-20 -right-20 text-white/[0.03] font-black text-[15rem] select-none pointer-events-none">
              BG
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 5. FINAL CTA (Cyber Parallax) */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto relative group overflow-hidden rounded-[5rem] p-16 md:p-32 bg-[#12066a] text-center flex flex-col items-center shadow-3xl shadow-[#12066a]/50">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-30  transition-transform duration-1000"
            style={{
              backgroundImage: "url('/cs-cta.jpg')",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.9]">
              Get expert UK <br />
              <span className="text-[#997819]">compliance support</span> <br />
              <span className="text-white">today</span>
            </h2>
            <Link href="/contact-us">
            <button className="group/btn relative overflow-hidden bg-[#997819] text-white px-16 py-7 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-2xl flex items-center gap-4 mx-auto">
              Contact Us Now{" "}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
            </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomerServicePage;

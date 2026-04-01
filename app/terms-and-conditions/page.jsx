import Image from "next/image";
import React from "react";
import FadeIn from "@/components/MotionWrapper";
import { Mail, Phone, MapPin, ChevronRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | BizGrow Holdings Ltd",
  description: "Read the Terms and Conditions of BizGrow Holdings Ltd covering website use, consultancy services, data protection, and UK legal compliance.",
  alternates: {
    canonical: "https://bizgrow-holdings.com/terms/",
  },
};

const TermsConditions = () => {
  return (
    <main className="w-full bg-white overflow-hidden font-sans">
      {/* --- HOLDINGS CONSISTENT HERO --- */}
      <div className="relative h-[60vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/h.png" 
          alt="BizGrow Holdings Terms"
          fill
          className="object-cover"
          priority
        />
        {/* Navy Overlay with Holdings Branding */}
        <div className="absolute inset-0 bg-[#12066a]/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
          <FadeIn direction="up">
            <span className="text-[#997819] font-black tracking-[0.4em] uppercase text-xs md:text-sm mb-4 block">
              Legal Framework
            </span>
            <h1 className="text-white text-5xl md:text-8xl lg:text-9xl font-black leading-none mb-6 uppercase tracking-tighter italic">
              Terms & <span className="text-[#997819]">Conditions</span>
            </h1>
            <div className="h-1 w-24 bg-[#997819] mx-auto mb-6" />
            <p className="text-blue-100/80 text-lg md:text-xl font-medium tracking-wide">
              Effective Date: <span className="text-white font-bold">January 2026</span>
            </p>
          </FadeIn>
        </div>
      </div>

      {/* --- CONTENT SECTION (Digital Layout - No Dark Mode) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn direction="up" delay={0.2}>
            
            {/* Intro text with Gold Border */}
            <div className="mb-24 p-10 md:p-14 rounded-[3rem] bg-zinc-50 border-l-[10px] border-[#997819] shadow-sm">
              <p className="text-xl md:text-2xl font-black text-[#12066a] leading-tight italic uppercase tracking-tighter">
                Welcome to BizGrow Holdings Ltd. These terms govern the use of our website and services. 
                Accessing our platform constitutes agreement to these standards.
              </p>
            </div>

            <div className="space-y-24">
              
              {/* 01. Use of Website */}
              <div className="group">
                <h2 className="text-3xl md:text-4xl font-black text-[#12066a] uppercase tracking-tighter mb-4 flex items-center gap-4 italic">
                  <span className="text-[#997819]">01.</span> Use of Website
                </h2>
                <div className="h-[3px] w-12 bg-[#997819] group-hover:w-32 transition-all duration-700 mb-8" />
                <ul className="space-y-5">
                  {[
                    "Confirm you are at least 18 years old or acting under legal supervision.",
                    "Ensure all information provided to BizGrow Holdings Ltd is accurate and complete.",
                    "Comply with all applicable UK laws and regulations during usage.",
                    "Using our website is allowed for legal purposes only. Content may be updated or removed at any time."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-gray-700 text-lg font-medium leading-relaxed">
                      <ChevronRight className="text-[#997819] shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 02. Services and Engagement */}
              <div className="group">
                <h2 className="text-3xl md:text-4xl font-black text-[#12066a] uppercase tracking-tighter mb-4 flex items-center gap-4 italic">
                  <span className="text-[#997819]">02.</span> Services & Engagement
                </h2>
                <div className="h-[3px] w-12 bg-[#997819] group-hover:w-32 transition-all duration-700 mb-8" />
                <p className="text-gray-700 text-lg font-medium mb-8 leading-relaxed">
                  Our consultancy support for certification and compliance is governed by:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Accurate business data", 
                    "Service contract agreement", 
                    "Applicable fee payments", 
                    "Defined service proposals"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-5 rounded-2xl bg-[#997819]/5 border border-[#997819]/10 transition-all shadow-sm">
                      <ShieldCheck className="text-[#997819]" size={20} />
                      <span className="text-sm font-black text-[#12066a] uppercase tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03-05. Other Sections */}
              {[
                { title: "Intellectual Property", content: "All content, graphics, logos, images, text, and designs on this website are the intellectual property of BizGrow Holdings Ltd. Unauthorised reproduction is strictly prohibited." },
                { title: "User Conduct", content: "Users shall not transmit harmful material or interfere with website security. Violations result in legal action or termination of access." },
                { title: "Privacy & Data Protection", content: "We do not share personal information without consent. Data is used solely for service delivery and compliance as per our Privacy Policy." }
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <h2 className="text-3xl md:text-4xl font-black text-[#12066a] uppercase tracking-tighter mb-4 flex items-center gap-4 italic">
                    <span className="text-[#997819]">0{idx + 3}.</span> {item.title}
                  </h2>
                  <div className="h-[3px] w-12 bg-[#997819] group-hover:w-32 transition-all duration-700 mb-6" />
                  <p className="text-gray-700 text-lg font-medium leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}

              {/* 06. Governing Law */}
              <div className="group">
                <h2 className="text-3xl md:text-4xl font-black text-[#12066a] uppercase tracking-tighter mb-4 flex items-center gap-4 italic">
                  <span className="text-[#997819]">06.</span> Governing Law
                </h2>
                <div className="h-[3px] w-12 bg-[#997819] group-hover:w-32 transition-all duration-700 mb-6" />
                <p className="text-gray-700 text-lg font-medium leading-relaxed">
                  The laws of the UK govern these Terms and Conditions. Any disputes arising from these terms are subject to the exclusive jurisdiction of the UK courts.
                </p>
              </div>

              {/* Final Contact Box (Consistent with Holdings CTA) */}
              <div className="mt-24 p-12 md:p-16 rounded-[4rem] bg-[#12066a] text-white border-t-8 border-[#997819] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#997819]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <h2 className="text-4xl font-black uppercase mb-8 italic tracking-tighter">Contact Information</h2>
                
                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-4">
                    <p className="font-black text-3xl uppercase tracking-tighter text-[#997819]">BizGrow Holdings Ltd</p>
                    <a href="mailto:info@bizgrow-holdings.com" className="flex items-center gap-3 text-lg font-bold hover:text-[#997819] transition-colors duration-300">
                      <Mail size={20} className="text-[#997819]" /> info@bizgrow-holdings.com
                    </a>
                  </div>
                  <div className="space-y-4 font-bold text-blue-100/80">
                    <p className="flex items-center gap-3"><Phone size={20} className="text-[#997819]" /> 07898 205035 / 02080904209</p>
                    <p className="flex items-start gap-3"><MapPin size={20} className="text-[#997819] mt-1 shrink-0" /> CEME Campus, Marsh Way, RM13 8EU</p>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;
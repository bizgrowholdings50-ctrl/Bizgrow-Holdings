import Image from "next/image";
import React from "react";
import FadeIn from "@/components/MotionWrapper";
import { Mail, Phone, MapPin, ChevronRight, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | BizGrow Holdings Ltd",
  description: "Official Privacy Policy for BizGrow Holdings Ltd. Learn how we collect, use, store, and protect your personal data.",
  alternates: {
    canonical: "https://bizgrow-holdings.com/privacy-policy/",
  },
};

const PrivacyPolicy = () => {
  return (
    <main className="w-full bg-white overflow-hidden font-sans">
      {/* --- HOLDINGS CONSISTENT HERO --- */}
      <div className="relative h-[60vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/h.png" 
          alt="BizGrow Holdings Privacy"
          fill
          className="object-cover"
          priority
        />
        {/* Navy Overlay with Holdings Branding */}
        <div className="absolute inset-0 bg-[#12066a]/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
          <FadeIn direction="up">
            <span className="text-[#997819] font-black tracking-[0.4em] uppercase text-xs md:text-sm mb-4 block">
              Data Protection
            </span>
            <h1 className="text-white text-5xl md:text-8xl lg:text-9xl font-black leading-none mb-6 uppercase tracking-tighter italic">
              Privacy <span className="text-[#997819]">Policy</span>
            </h1>
            <div className="h-1 w-24 bg-[#997819] mx-auto mb-6" />
            <p className="text-blue-100/80 text-lg md:text-xl font-medium tracking-wide">
              Your security is our <span className="text-white font-bold">Priority</span>
            </p>
          </FadeIn>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn direction="up" delay={0.2}>
            
            {/* Intro text with Gold Border */}
            <div className="mb-24 p-10 md:p-14 rounded-[3rem] bg-zinc-50 border-l-[10px] border-[#997819] shadow-sm relative overflow-hidden">
              <Lock className="absolute -right-4 -bottom-4 text-[#997819]/10 w-40 h-40 -rotate-12" />
              <p className="relative z-10 text-xl md:text-2xl font-black text-[#12066a] leading-tight italic uppercase tracking-tighter">
                BizGrow Holdings Ltd is committed to protecting the privacy of visitors and clients. 
                This Privacy Policy explains how we collect, use, store, and protect your personal data.
              </p>
            </div>

            <div className="space-y-24">
              
              {/* 01. Information We Collect */}
              <div className="group">
                <h2 className="text-3xl md:text-4xl font-black text-[#12066a] uppercase tracking-tighter mb-4 flex items-center gap-4 italic">
                  <span className="text-[#997819]">01.</span> Information We Collect
                </h2>
                <div className="h-[3px] w-12 bg-[#997819] group-hover:w-32 transition-all duration-700 mb-8" />
                
                <p className="text-[#12066a] font-black uppercase tracking-widest text-sm mb-6">A) Information You Provide directly through:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {["Contact forms", "Emails or messages", "Service enquiries"].map((item, i) => (
                        <div key={i} className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-[#12066a] text-sm text-center uppercase tracking-tighter">
                            {item}
                        </div>
                    ))}
                </div>

                <p className="text-gray-700 text-lg font-medium mb-6">This includes:</p>
                <ul className="space-y-4">
                  {[
                    "Name", "Email address", "Phone number", "Company name", "Any other information you share with us"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-gray-700 text-lg font-medium leading-relaxed">
                      <ChevronRight className="text-[#997819] shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 02. How We Use Your Information */}
              <div className="group">
                <h2 className="text-3xl md:text-4xl font-black text-[#12066a] uppercase tracking-tighter mb-4 flex items-center gap-4 italic">
                  <span className="text-[#997819]">02.</span> How We Use Your Information
                </h2>
                <div className="h-[3px] w-12 bg-[#997819] group-hover:w-32 transition-all duration-700 mb-8" />
                <p className="text-gray-700 text-lg font-medium mb-8">We use the information to:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Respond to your enquiries", 
                    "Provide consultancy and support", 
                    "Improve our services and website", 
                    "Send marketing communications"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-5 rounded-2xl bg-[#997819]/5 border border-[#997819]/10 shadow-sm">
                      <ShieldCheck className="text-[#997819]" size={20} />
                      <span className="text-sm font-black text-[#12066a] uppercase tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03-06 Sections */}
              {[
                { id: "03", title: "Legal Basis for Processing", content: "We process personal data based on Contractual necessity (when you request our services), Legitimate interests (for business operations and service improvement), and Consent (for marketing communications, only if you opt-in)." },
                { id: "04", title: "Data Sharing", content: "We share your information only when necessary, such as with service providers (e.g., hosting, email services) or legal authorities if required by law. We do not sell your personal data." },
                { id: "05", title: "Data Security", content: "We implement appropriate measures to protect your data from unauthorised access or loss. Access to personal data is restricted to authorised personnel only." },
                { id: "06", title: "Data Retention", content: "We retain personal data only for as long as necessary for the purposes described or as required by law. When data is no longer needed, it will be securely deleted or anonymised." }
              ].map((item) => (
                <div key={item.id} className="group">
                  <h2 className="text-3xl md:text-4xl font-black text-[#12066a] uppercase tracking-tighter mb-4 flex items-center gap-4 italic">
                    <span className="text-[#997819]">{item.id}.</span> {item.title}
                  </h2>
                  <div className="h-[3px] w-12 bg-[#997819] group-hover:w-32 transition-all duration-700 mb-6" />
                  <p className="text-gray-700 text-lg font-medium leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}

              {/* 07. Your Rights */}
              <div className="group">
                <h2 className="text-3xl md:text-4xl font-black text-[#12066a] uppercase tracking-tighter mb-4 flex items-center gap-4 italic">
                  <span className="text-[#997819]">07.</span> Your Rights
                </h2>
                <div className="h-[3px] w-12 bg-[#997819] group-hover:w-32 transition-all duration-700 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        "Request access to your personal data",
                        "Request correction or deletion",
                        "Withdraw consent",
                        "Request restriction of processing",
                        "Request data portability",
                        "Object to processing"
                    ].map((right, idx) => (
                        <div key={idx} className="flex gap-4 p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50/50">
                            <div className="w-8 h-8 rounded-full bg-[#12066a] text-[#997819] flex items-center justify-center font-black shrink-0 text-xs">
                                {idx + 1}
                            </div>
                            <p className="text-gray-700 font-bold tracking-tight">{right}</p>
                        </div>
                    ))}
                </div>
              </div>

              {/* 08. Contact Information Box */}
              <div className="mt-24 p-12 md:p-16 rounded-[4rem] bg-[#12066a] text-white border-t-8 border-[#997819] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#997819]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <h2 className="text-4xl font-black uppercase mb-8 italic tracking-tighter relative z-10">Contact Information</h2>
                
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

export default PrivacyPolicy;
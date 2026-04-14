import React from "react";
import FadeIn from "@/components/MotionWrapper";
import { Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | Security Business UK | BizGrow Holdings Ltd",
  description:
    "Contact Us with BizGrow Holdings for Expert Support in Compliance, ACS, ISO, and Business Growth Services for UK Security Businesses.",
};
const ContactPage = () => {
  return (
    <main className="bg-[#f8fafc] text-zinc-900 overflow-x-hidden w-full relative min-h-screen">
      {/* 🔹 1. HERO HEADER (h-screen) */}
      <section className="relative h-screen w-full flex items-center bg-[#12066a] overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-25"
          style={{
            backgroundImage: 'url("/10 Ways.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#12066a]/40 to-[#12066a] z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-20">
          <FadeIn direction="right" duration="0.8">
            <span className="text-[#997819] font-black uppercase tracking-[0.5em] text-xs md:text-sm mb-6 inline-block bg-white/5 px-6 py-2.5 rounded-full backdrop-blur-md border border-white/10">
              Contact Strategy
            </span>
            <h1 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] italic mb-8">
              Get In <span className="text-[#997819]">Touch.</span>
            </h1>
            <div className="w-24 h-2  bg-[#997819] rounded-full shadow-lg shadow-[#997819]/40" />
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. MAIN HEADING SECTION */}
      <section className="py-24 bg-white relative z-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-7xl text-center">
            {/* 1. Main Heading Animation */}
            <FadeIn direction="up" delay={0.2}>
              <h2 className="text-[#12066a] text-xl font-black tracking-tighter leading-[0.9] mb-4">
                Let's Build Your
              </h2>
            </FadeIn>

            {/* 2. Sub-Heading (Italic) Animation */}
            <FadeIn direction="up" delay={0.4}>
              <span className="text-[#997819] italic font-bold text-4xl md:text-7xl block mb-10">
                Digital Infrastructure.
              </span>
            </FadeIn>

            {/* 3. Paragraph Animation */}
            <div className="w-full flex justify-center">
              <div className="max-w-3xl mx-auto">
                <FadeIn direction="up" delay={0.6}>
                  <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
                    Our expert team is dedicated to accelerating your business
                    growth within the UK market. Please utilise the form below
                    or our contact details to initiate your strategic
                    consultation.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. THE CONTACT CARD (Details & Form) */}
      <section className="relative z-30 -mt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] md:rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(18,6,106,0.12)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          {/* LEFT: Contact Details */}
          <div className="lg:w-[38%] bg-[#12066a] p-12 md:p-20 text-white flex flex-col justify-between relative">
            <div className="relative z-10">
              <h3 className="text-4xl font-black tracking-tighter italic mb-12">
                Our <br /> Office<span className="text-[#997819]">.</span>
              </h3>

              <div className="space-y-10">
                {[
                  {
                    icon: <Phone size={22} />,
                    label: "Call Us",
                    val: "07898 205035",
                  },
                  {
                    icon: <Mail size={22} />,
                    label: "Email",
                    val: "info@bizgrow.co.uk",
                  },
                  {
                    icon: <MapPin size={22} />,
                    label: "Location",
                    val: "London, UK ",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="p-4 bg-white/5 rounded-2xl text-[#997819] group-hover:bg-[#997819] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-[#997819]/80 mb-1">
                        {item.label}
                      </span>
                      <p className="text-lg font-bold">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between opacity-40">
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                UK Registered Agency
              </p>
              <Globe size={24} />
            </div>
          </div>

          {/* RIGHT: The Form */}
          <div className="lg:w-[62%] p-10 md:p-24 bg-white">
            <ContactForm />
          </div>
        </div>
      </section>
      {/* 🔹 4. GOOGLE MAP SECTION (Rounded & Refined) */}
      <section className="max-w-7xl h-135 mx-auto px-4 sm:px-6 mb-24">
        <div className="w-full h-full relative bg-slate-100 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-[#12066a]/5 grayscale hover:grayscale-0 transition-all duration-1000 border border-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.7206945283365!2d0.17185!3d51.518339999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a559375c3235%3A0xd4e3f499e51befee!2sCEME%20Campus!5e0!3m2!1sen!2suk!4v1776180633370!5m2!1sen!2suk"
            width="100%"
            height="100%"
            style={{ border: 0 }} // Corrected: Ab ye string nahi, object hai
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BizGrow Location"
            className="rounded-[2rem] md:rounded-[3rem]"
          />

          {/* Bottom Gradient for Smooth Blend */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />

          {/* Map Overlay Badge (Optional: Matches your premium UI) */}
          <div className="absolute top-18 left-18 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
            <div className="w-2 h-2 bg-[#997819] rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#12066a]">
              Our Office
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

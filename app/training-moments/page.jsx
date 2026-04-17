import React from "react";
import {
  ArrowRight,
  Award,
  GraduationCap,
  MapPin,

} from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/MotionWrapper";
const galleryItems = [
  {
    id: 1,
    src: "/w1.webp",
    title: "Business growth workshop",
    location: "BizGrow Holdings Ltd",
    alt: "Business growth workshop - BizGrow Holdings Ltd",
  },
  {
    id: 2,
    src: "/w2.webp",
    title: "Management systems training",
    location: "BizGrow Holdings Ltd",
    alt: "Management systems training - BizGrow Holdings Ltd",
  },
  {
    id: 3,
    src: "/w3.webp",
    title: "Certification training session",
    location: "BizGrow Holdings Ltd",
    alt: "Certification training session - BizGrow Holdings Ltd",
  },
  {
    id: 4,
    src: "/w4.webp",
    title: "Professional development session",
    location: "BizGrow Holdings Ltd",
    alt: "Professional development session - BizGrow Holdings Ltd",
  },
  {
    id: 5,
    src: "/w5.webp",
    title: "Security business training",
    location: "BizGrow Holdings Ltd",
    alt: "Security business training - BizGrow Holdings Ltd",
  },
  {
    id: 6,
    src: "/w6.webp",
    title: "Compliance workshop",
    location: "BizGrow Holdings Ltd",
    alt: "Compliance workshop - BizGrow Holdings Ltd",
  },
];

export const metadata = {
  title: "BizGrow Training Moments: Compliance & Growth Simplified",
  description: "BizGrow’s expert-led training helps business owners achieve compliance, streamline systems & scale for real growth.",
};
const TrainingMoments = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* 🔹 1. CINEMATIC HERO SECTION - Refined */}
      <section className="relative h-[85dvh] md:h-screen w-full bg-[#12066a] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50 lg:opacity-60"
          >
            <source src="/video/workshop.mp4" type="video/mp4" />
          </video>
          {/* Rich Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#12066a]/60 via-[#12066a]/20 to-[#12066a]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <FadeIn direction="up">
            <div className="flex items-center gap-2 mb-4 justify-center bg-white backdrop-blur-md w-fit mx-auto px-4 py-1.5 rounded-full border border-white/20">
              <Award className="text-[#12066a]" size={14} />
              <span className="text-[#12066a] font-black text-[9px] tracking-[0.3em] uppercase">
                13+ Years of Strategic Excellence
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              Workshop Training{" "}
              <span className="text-[#997819] italic block md:inline">
                Moments
              </span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 2. THE AUTHORITY BLOCK - Stats & Bio */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 -mt-16 mb-24">
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-[0_50px_100px_-20px_rgba(18,6,106,0.15)] border border-zinc-100 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                <GraduationCap className="text-[#997819]" size={28} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#12066a] tracking-tight">
                Meet Dr. Javed Iqbal
              </h2>
            </div>

            <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed italic">
              "Compliance is not just a certificate; it's the operational DNA of
              a secure organisation."
            </p>

            <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
              With over{" "}
              <span className="text-[#12066a] font-bold underline decoration-[#997819] decoration-2 underline-offset-4">
                13 years of dedicated experience
              </span>{" "}
              in compliance and
              consultancy, <span className="text-[#997819] font-black">Dr. Javed Iqbal</span> has earned a reputation as a trusted
              advisor for businesses aiming to meet and exceed industry
              standards. He partners with both security companies and
              construction businesses to simplify complex compliance
              requirements and transform them into practical, easy-to-implement
              systems that drive measurable results..
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-100">
              <div className="bg-zinc-50 p-6 rounded-3xl">
                <p className="text-4xl font-black text-[#12066a]">13+</p>
                <p className="text-[#997819] font-black text-[9px] uppercase tracking-widest mt-1">
                  Years Experience
                </p>
              </div>
              <div className="bg-zinc-50 p-6 rounded-3xl">
                <p className="text-4xl font-black text-[#12066a]">120+</p>
                <p className="text-[#997819] font-black text-[9px] uppercase tracking-widest mt-1">
                  Businesses Empowered
                </p>
              </div>
            </div>
          </div>

          {/* 🔹 3. TESTIMONIAL BLOCK - Just Image with Gradient Effect */}
          <div className="lg:col-span-1 relative group p-10 rounded-[2.5rem] shadow-2xl border border-[#12066a]/10 overflow-hidden flex flex-col justify-end min-h-[450px] transition-all duration-700 bg-gradient-to-t from-[#12066a] via-[#12066a]/60 to-[#12066a]">
            {/* 📸 Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/sir.jpg"
                alt="Dr. Javed Iqbal"
                fill // 👈 Iske liye parent (div) 'relative' hona chahiye
                className="object-cover object-top opacity-50 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-105"
                priority // 👈 Ye add kar dein taake image foran load ho
              />
            </div>

            {/* 🔹 Gradient Color Overlay Effect (Premium) */}
            <div className="absolute inset-0 z-10 bg-linear-to-t from-[#12066a] via-[#12066a]/20 to-transparent transition-opacity duration-700 opacity-90 group-hover:opacity-80" />

            {/* Content Layer (Optional: Just for a subtle Interactive effect at bottom) */}
            <div className="relative z-20 space-y-2 pointer-events-none translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              {/* Minimalist interactive detail (Optional, can be removed) */}
              <div className="w-12 h-1 bg-[#997819] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-white font-black text-sm uppercase tracking-wider block opacity-0 group-hover:opacity-100 transition-opacity">
                Our Ceo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 3. GALLERY ARCHIVE SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {/* Header & Description Block */}
        <div className="max-w-7xl mb-20">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#997819]" />
              <span className="text-[#997819] font-black text-[10px] tracking-[0.4em] uppercase">
                Visual Archives
              </span>
            </div>

            <h2 className="text-4xl text-center md:text-6xl font-black text-[#12066a] uppercase tracking-tighter leading-none mb-8">
              Inside Our{" "}
              <span className="text-[#997819] italic">Sessions.</span>
            </h2>
          </FadeIn>
        </div>

        {/* Masonry Grid Logic */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryItems.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.1}>
              <div className="relative group rounded-[2.5rem] overflow-hidden bg-zinc-100 break-inside-avoid shadow-xl hover:shadow-[#12066a]/20 transition-all duration-700 active:scale-95 cursor-pointer">
                {/* Main Image */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Premium Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12066a] via-[#12066a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#997819] text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <MapPin size={10} /> {item.location}
                    </span>
                    <h3 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Luxury Hover Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TrainingMoments;

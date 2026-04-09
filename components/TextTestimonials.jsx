"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight, User } from "lucide-react";

// 1. Data Array - Updated to handle images or auto-generator
const reviews = [
  {
    id: 1,
    text: "I would like to thank bizgrow team for the help and support in getting cop119 and safe contractor certification. Whole team is courteous and well mannered and cooperative.",
    name: "Shahid Butt",
    role: "Business Owner",
    initials: "SB",
    tag: "COP119 Certified",
    imgUrl: "/shahid.png",
  },
  {
    id: 2,
    text: "Highly recommended, they have provided great consultancy services and helped us through whole process.",
    name: "Aamir Apex",
    role: "Apex Consultancy",
    initials: "AA",
    tag: "Consultancy",
    imgUrl: "/aamir-apex.jpg",
  },
  {
    id: 3,
    text: "Great experience with Bizgrow Digital! Their SEO and social media expertise significantly boosted our online visibility. Professional, responsive, and highly recommended!",
    name: "Ava Rose",
    role: "Strategic Partner",
    initials: "JL",
    tag: "Exceeded Expectations",
    imgUrl: "/ava.png",
  },
  {
    id: 4,
    text: "At Patriots Security Uk Ltd, we take great pride in maintaining the highest professional standard. We truly appreciate the support and partnership of BizGrow Holdings.",
    name: "Jude Okeocha",
    role: "Director | Patriots Security UK",
    initials: "JO",
    tag: "SafeContractor Audit",
    imgUrl: "/patriots.jpg",
  },
  {
    id: 5,
    text: "We had an excellent experience with BIZGrow Holding during our COP119 audit. Their team was professional, efficient, and highly knowledgeable.",
    name: "Keyur Kachhadiya",
    role: "Immaculate & Co. Ltd",
    initials: "KK",
    tag: "Audit Success",
    imgUrl: "/keyur.jpg",
  },
  {
    id: 6,
    text: "I must say my experience with Bizgrow was outstanding, the staff took time to understand my needs thoroughly. Communication has been a very strong point.",
    name: "Muhammad Saqib",
    role: "Client",
    initials: "MS",
    tag: "Strong Communication",
    imgUrl: "",
  },
  {
    id: 7,
    text: "Excellent service and local guidance. Highly professional team that knows how to handle complex business requirements.",
    name: "GulFam Arshad",
    role: "Local Guide",
    initials: "GA",
    tag: "Highly Professional",
    imgUrl: "",
  },
  {
    id: 8,
    text: "Great experience with inventory management and business compliance. They make the whole process smooth and well-structured.",
    name: "Pristine Inventory",
    role: "Inventory Solutions",
    initials: "PI",
    tag: "Business Compliance",
    imgUrl: "/pristine.jpeg",
  },
  {
    id: 9,
    text: "Exceptional consultancy services provided by Bizgrow holdings ! Their expert guidance and personalized approach significantly contributed to our business success. Highly recommended!",
    name: "Isabell Deva",
    role: "Client",
    initials: "PI",
    tag: "Business Compliance",
    imgUrl: "/Isabell.png",
  },
];

const TestimonialGrid = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          {/* --- LEFT CONTENT --- */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-12 bg-[#997819]" />
              <span className="text-[#997819] font-bold text-xs uppercase tracking-[0.4em]">
                Testimonials
              </span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-[#12066a] uppercase tracking-tighter leading-[0.85]">
              Trusted <br />{" "}
              <span className="text-[#997819]">Partnerships</span>
            </h2>

            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-sm leading-relaxed">
              See how BizGrow Holdings empowers professionals across the UK
              through strategic innovation.{" "}
            </p>

            <div className="flex gap-4 pt-6">
              <button
                onClick={prev}
                className="w-16 h-16  rounded-full border-2 border-zinc-200 flex items-center justify-center text-[#12066a] hover:bg-[#12066a] hover:text-white transition-all duration-500 group"
              >
                <ArrowLeft
                  size={24}
                  className="group-active:-translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={next}
                className="w-16 h-16  rounded-full bg-[#12066a] flex items-center justify-center text-white hover:bg-[#997819] transition-all duration-500 shadow-xl shadow-[#12066a]/20 group"
              >
                <ArrowRight
                  size={24}
                  className="group-active:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* --- RIGHT ANIMATED STACK --- */}
          <div className="w-full lg:w-1/2 relative h-[450px] md:h-[550px] flex items-center justify-center">
            {/* Background Decorative Cards */}
            <div className="absolute  w-full max-w-[480px] h-[350px] bg-zinc-200/50 rounded-[3rem] translate-x-8 translate-y-8 rotate-3 -z-10" />
            <div className="absolute w-full max-w-[480px] h-[350px] bg-zinc-100/40 rounded-[3rem] translate-x-16 translate-y-16 rotate-6 -z-20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, x: 100, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -100, rotate: -5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[500px] bg-white rounded-[3.5rem] p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(18,6,106,0.1)] border border-white relative"
              >
                <Quote className="w-16 h-16 text-[#997819]/5 absolute top-12 right-12 pointer-events-none" />

                <div className="flex justify-between items-center mb-10">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#997819] text-[#997819]"
                      />
                    ))}
                  </div>
                  {/* Floating Tag */}
                  <span className="text-[10px] font-black bg-[#12066a]/5 text-[#12066a] px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap">
                    {reviews[index].tag}
                  </span>
                </div>

                <p className="text-[#12066a] text-2xl font-bold italic leading-[1.2] mb-12 tracking-tight">
                  "{reviews[index].text}"
                </p>

                {/* --- PROFILE SECTION WITH FALLBACK LOGIC --- */}
                <div className="flex items-center gap-5 pt-8 border-t border-zinc-100">
                  {/* Avatar Container */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#fafafa] shadow-lg overflow-hidden shrink-0">
                    {reviews[index].imgUrl ? (
                      // 2. Display Image if exists
                      <img
                        src={reviews[index].imgUrl}
                        alt={reviews[index].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // 3. Auto-Generator (InitialsFallback) if no image
                      <div className="w-full h-full bg-gradient-to-br from-[#12066a] to-[#0c054e] flex items-center justify-center text-white font-black text-xl md:text-2xl tracking-tighter">
                        {reviews[index].initials}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-[#12066a] font-black uppercase tracking-tighter text-lg md:text-xl leading-none">
                      {reviews[index].name}
                    </h3>
                    <p className="text-[#997819] font-bold text-xs uppercase tracking-widest mt-1.5">
                      {reviews[index].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialGrid;

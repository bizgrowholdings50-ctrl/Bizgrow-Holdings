import React from 'react';
import DiscountCard from "@/components/DiscountCard";
import FadeIn from "@/components/MotionWrapper";

export const metadata = {
  title: "Discount Offers - BizGrow Holdings Ltd, UK",
  description:
    "Unlock exclusive business discount offers with BizGrow Holdings. Save on certifications, compliance, and growth services for UK companies.",
};
const offersData = [
  {
    id: "EASTER-2026",
    title: "𝐁𝐈𝐙𝐆𝐑𝐎𝐖 𝐄𝐀𝐒𝐓𝐄𝐑 𝐌𝐄𝐆𝐀 𝐎𝐅𝐅𝐄𝐑",
    image: "/discount_offer1.jpg", // Aapki flyer image ka path
    discount: "",
    price: "350", // Flyer ke mutabiq starting price
    shortDesc: "Get certified 𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐟𝐫𝐨𝐦 £𝟑𝟓𝟎 𝐩𝐞𝐫 𝐦𝐨𝐧𝐭𝐡, a limited-time offer on 𝐀𝐂𝐒, 𝐈𝐒𝐎, 𝐂𝐎𝐏 𝟏𝟏𝟗",
    fullDetail: `This Easter, BizGrow Holdings is offering the 'Deal of the Year' specifically for Security Companies. 

    In an industry where 'No Accreditation = No Contracts', we provide a seamless path to compliance:
    • Full ACS (Approved Contractor Scheme) Implementation.
    • ISO 9001, 14001, and 45001 Certifications.
    • COP 119 (Code of Practice for Provision of Labour) Compliance.

    Our experts handle the entire technical audit and documentation process from start to finish.`,
    sections: [
      {
        heading: "What's Included",
        items: ["ACS Support", "ISO Certification", "COP 119 Compliance"]
      }
    ]
  },
 
];

const DiscountPage = () => {
  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* 🔹 HERO SECTION (Matching image_99bd66.png) */}
      <section className="relative py-24 bg-[#12066a] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <FadeIn direction="up">
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6">
              Act Fast <br /> 
              <span className="text-[#997819]">Discounts Won't Last Forever</span>
            </h1>
            <div className="inline-block px-8 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <p className="text-blue-100/80 font-bold tracking-widest uppercase text-xs">
                Limited Time Offer | Don't Miss Out
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 OFFERS GRID */}
      <section className="py-24 -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {offersData.map((offer, index) => (
              <DiscountCard key={index} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 FOOTER CONTACT INFO (As per image_99bd66.png) */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-10 bg-white rounded-[3rem] border border-zinc-100 shadow-xl">
            <p className="text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 text-center">Contact our team to claim</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
               <div className="text-center">
                  <p className="text-[#12066a] font-black text-lg">07868 764218</p>
                  <p className="text-zinc-500 text-xs font-medium uppercase">Call Us Now</p>
               </div>
               <div className="w-px h-12 bg-zinc-200 hidden md:block" />
               <div className="text-center">
                  <p className="text-[#12066a] font-black text-lg text-lowercase">info@bizgrow-holdings.com</p>
                  <p className="text-zinc-500 text-xs font-medium uppercase">Email Support</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscountPage;
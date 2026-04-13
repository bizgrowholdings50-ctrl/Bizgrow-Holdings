import React from 'react';
import DiscountCard from "@/components/DiscountCard";
import FadeIn from "@/components/MotionWrapper";

export const metadata = {
  title: "Discount Offers - BizGrow Holdings Ltd, UK",
  description:
    "Unlock exclusive business discount offers with BizGrow Holdings. Save on certifications, compliance, and growth services for UK companies.",
};
const offersData = [
//   {
//     id: "EASTER-2026",
//     title: "𝐁𝐈𝐙𝐆𝐑𝐎𝐖 𝟒𝐓𝐇 𝐀𝐍𝐍𝐈𝐕𝐄𝐑𝐒𝐀𝐑𝐘 𝐎𝐅𝐅𝐄𝐑",
//     image: "/discount_offer1.jpg", // Aapki flyer image ka path
//     discount: "",
//     price: "350", // Flyer ke mutabiq starting price
//     shortDesc: "To celebrate our 4th Anniversary, Bizgrow Holdings Ltd is offering certifications 𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐟𝐫𝐨𝐦 £𝟑𝟓𝟎 𝐩𝐞𝐫 𝐦𝐨𝐧𝐭𝐡 on",
//     fullDetail: `𝐋𝐚𝐬𝐭 𝐅𝐞𝐰 𝐒𝐥𝐨𝐭𝐬 𝐑𝐞𝐦𝐚𝐢𝐧𝐢𝐧𝐠
// Attention UK Security & Construction Companies!
// To celebrate our 4th Anniversary, Bizgrow Holdings Ltd is offering certifications 𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐟𝐫𝐨𝐦 £𝟑𝟓𝟎 𝐩𝐞𝐫 𝐦𝐨𝐧𝐭𝐡 on:
// ⚫ 𝐀𝐂𝐒
// ⚫ 𝐂𝐎𝐏 𝟏𝟏𝟗
// ⚫ 𝐈𝐒𝐎
// ⚫ 𝐂𝐨𝐧𝐬𝐭𝐫𝐮𝐜𝐭𝐢𝐨𝐧𝐥𝐢𝐧𝐞
// ⚫ 𝐒𝐚𝐟𝐞𝐂𝐨𝐧𝐭𝐫𝐚𝐜𝐭𝐨𝐫, 𝐍𝐀𝐒𝐃𝐔
// No accreditation = no contracts. 
// Don’t risk losing business, get compliant and contract-ready today!
// 𝐖𝐡𝐲 𝐂𝐡𝐨𝐨𝐬𝐞 𝐔𝐬?
// ◾ Expert UK-based consultants
// ◾ Step-by-step accreditation support
// ◾ Proven track record with UK businesses
// 𝐃𝐨𝐧’𝐭 𝐦𝐢𝐬𝐬 𝐨𝐮𝐭, 𝐬𝐭𝐚𝐫𝐭 𝐲𝐨𝐮𝐫 𝐜𝐞𝐫𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐩𝐫𝐨𝐜𝐞𝐬𝐬 𝐭𝐨𝐝𝐚𝐲.
// `,
//     sections: [
//       {
//         heading: "What's Included",
//         items: ["ACS Support", "ISO Certification", "COP 119 Compliance" ,"ConstructionLine" , "SafeContractor + Nasdu"]
//       }
//     ]
//   },
 
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
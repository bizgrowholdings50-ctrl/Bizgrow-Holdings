import React from "react";
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
    title: "Cleberating 15 years in industry",
    image: "/offer 1.webp", // Aapki flyer image ka path
    discount: "",
    price: "350", // Flyer ke mutabiq starting price
    shortDesc:
      "To celebrate our 15 years in industry, Bizgrow Holdings Ltd is offering certifications 𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐟𝐫𝐨𝐦 £𝟑𝟓𝟎 𝐩𝐞𝐫 𝐦𝐨𝐧𝐭𝐡 on",
    fullDetail: `Attention UK Security & Construction Companies!

To celebrate our 15 years in industry, we are offering certifications 𝐬𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐟𝐫𝐨𝐦 £𝟑𝟓𝟎 𝐩𝐞𝐫 𝐦𝐨𝐧𝐭𝐡 on:

⚫ 𝐀𝐂𝐒
⚫ 𝐂𝐎𝐏 𝟏𝟏𝟗
⚫ 𝐈𝐒𝐎
⚫ Chas
⚫ 𝐂𝐨𝐧𝐬𝐭𝐫𝐮𝐜𝐭𝐢𝐨𝐧𝐥𝐢𝐧𝐞
⚫ 𝐒𝐚𝐟𝐞𝐂𝐨𝐧𝐭𝐫𝐚𝐜𝐭𝐨𝐫, 𝐍𝐀𝐒𝐃𝐔 , SMAS

No accreditation = no contracts.

Don’t risk losing business, get compliant and contract-ready today!

𝐖𝐡𝐲 𝐂𝐡𝐨𝐨𝐬𝐞 𝐔𝐬?

◾ Expert UK-based consultants
◾ Step-by-step accreditation support
◾ Proven track record with UK businesses

𝐃𝐨𝐧’𝐭 𝐦𝐢𝐬𝐬 𝐨𝐮𝐭, 𝐬𝐭𝐚𝐫𝐭 𝐲𝐨𝐮𝐫 𝐜𝐞𝐫𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐩𝐫𝐨𝐜𝐞𝐬𝐬 𝐭𝐨𝐝𝐚𝐲.
`,
    // sections: [
    //   {
    //     heading: "What's Included",
    //     items: ["ACS Support", "ISO Certification", "COP 119 Compliance" ,"ConstructionLine" , "SafeContractor + Nasdu"]
    //   }
    // ]
  },
];

const DiscountPage = () => {
  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* 🔹 HERO SECTION (Matching image_99bd66.png - Perfected) */}
      <section className="relative py-20 md:py-40 bg-[#12066a] overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[70vh]">
        {/* 🖼️ Background Pattern Layer */}
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-cover bg-center pointer-events-none" />

        {/* ✨ Premium Ambient Glow (Gives depth behind text) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#997819]/15 rounded-full blur-[80px] sm:blur-[130px] pointer-events-none animate-pulse duration-[4s]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center justify-center">
          <FadeIn direction="up">
            {/* Fluid Typography with Safe Mobile Leading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[1.1] sm:leading-none mb-8 max-w-5xl">
              Act Fast <br />
              <span className="text-[#997819]">
                Discounts Won't Last Forever
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            {/* Bulletproof Pill Badge (Never breaks layout) */}
            <div className="inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md max-w-[90vw] sm:max-w-full">
              <p className="text-white/80 font-bold tracking-[0.1em] sm:tracking-widest uppercase text-[10px] sm:text-xs whitespace-nowrap sm:whitespace-normal overflow-hidden text-ellipsis">
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
            <p className="text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 text-center">
              Contact our team to claim
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <div className="text-center">
                <p className="text-[#12066a] font-black text-lg">
                  07898 205035{" "}
                </p>
                <p className="text-zinc-500 text-xs font-medium uppercase">
                  Call Us Now
                </p>
              </div>
              <div className="w-px h-12 bg-zinc-200 hidden md:block" />
              <div className="text-center">
                <p className="text-[#12066a] font-black text-lg text-lowercase">
                  info@bizgrow-holdings.co.uk
                </p>
                <p className="text-zinc-500 text-xs font-medium uppercase">
                  Email Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscountPage;

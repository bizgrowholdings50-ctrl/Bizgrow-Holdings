import { HelpCircle } from "lucide-react";
import FadeIn from "@/components/MotionWrapper";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";

export const metadata = {
  title: "FAQs on ACS, ISO, CHAS & Compliance | BizGrow Holdings UK",
  description:
    "Explore BizGrow Holdings FAQs for Clear Answers on ACS, ISO, CHAS, and Compliance to Support your UK Security Business Growth",
};
const faqData = [
  // ==========================================
  // CORE COMPLIANCE (ISO, COP, ACS, ACCREDITATIONS)
  // ==========================================
  {
    q: "How to get ACS certification in the UK?",
    a: (
      <>
        To get ACS certification, your security company must meet the SIA
        eligibility requirements and submit an application through the SIA
        business portal. An approved assessing body will assess your business
        before the SIA makes the final decision. Companies choose BizGrow
        Holdings for expert guidance and smoother preparation.
      </>
    ),
  },
  {
    q: "What documents are required for a CHAS application?",
    a: (
      <>
        You'll need a health and safety policy, relevant risk assessments (RAMS), 
        staff training records, and valid insurance certificates. Your documents 
        must be up to date, accurate, and specific to your business to improve approval chances.
      </>
    ),
  },
  {
    q: "What does SafeContractor-approved mean?",
    a: (
      <>
        SafeContractor approval confirms that your business meets recognised UK 
        health and safety standards. It helps build client confidence, simplifies 
        pre-qualification, and can improve your chances of winning contracts.
      </>
    ),
  },
  {
    q: "What are the main requirements of COP 119?",
    a: (
      <>
        COP 119 requires businesses to follow best practices for supplying security 
        labour, including SIA licence checks, BS 7858 screening, right-to-work verification, 
        and compliant payroll processes. It helps demonstrate a professional and compliant workforce.
      </>
    ),
  },
  {
    q: "What is ISO 9001 in simple terms?",
    a: (
      <>
        ISO 9001 is an international quality management standard that helps businesses 
        deliver consistent, reliable services. It focuses on improving processes, 
        customer satisfaction, and continual improvement across the organisation.
      </>
    ),
  },
  {
    q: "What is the main purpose of ISO 14001 certification?",
    a: (
      <>
        The main purpose of ISO 14001 is to help businesses manage and reduce their 
        environmental impact through structured processes. It supports legal compliance, 
        improves sustainability, and demonstrates environmental responsibility to clients.
      </>
    ),
  },
  {
    q: "What are the key elements of ISO 45001?",
    a: (
      <>
        The key elements of ISO 45001 include hazard identification, risk assessment, 
        legal compliance, employee participation, emergency preparedness, and continual 
        improvement. Together, these elements help businesses create a safer workplace 
        and reduce health and safety risks.
      </>
    ),
  },
  {
    q: "What is Constructionline Gold accreditation?",
    a: (
      <>
        Constructionline Gold is a recognised UK accreditation that assesses health 
        and safety, quality, environmental management, and financial standing. It helps 
        businesses demonstrate credibility and qualify for larger contracts.
      </>
    ),
  },
  {
    q: "What happens if my SMAS accreditation expires?",
    a: (
      <>
        If your SMAS accreditation expires, you can no longer use it to demonstrate 
        compliance for tenders or client requirements. Renewing it on time helps 
        maintain your approved status and avoid business interruptions.
      </>
    ),
  },
  {
    q: "What is the difference between internal and external audits?",
    a: (
      <>
        The main difference between an internal and external audit is that an internal 
        audit is carried out by your own team or a consultant to identify and improve 
        gaps before certification. An external audit is conducted by an independent 
        certification body to verify that your business meets the required standard.
      </>
    ),
  },

  // ==========================================
  // TECH, OPERATIONS, SECURITY & SPECIFIC QUALIFICATIONS (NICHE)
  // ==========================================
  {
    q: "What is the difference between Cyber Essentials and Cyber Essentials Plus?",
    a: (
      <>
        The main difference between Cyber Essentials and Cyber Essentials Plus is 
        that Cyber Essentials is a self-assessment certification, while Cyber 
        Essentials Plus includes an independent technical assessment. Cyber Essentials 
        Plus provides a higher level of assurance because your security controls are 
        tested and verified by a qualified assessor.
      </>
    ),
  },
  {
    q: "Is NASDU certification hard to get?",
    a: (
      <>
        NASDU certification is not hard to get if the handler and the dog are properly 
        trained and prepared. The assessment evaluates practical skills, obedience, and 
        operational performance to ensure they meet UK industry standards. With the 
        right preparation, most professional teams can pass successfully.
      </>
    ),
  },
  {
    q: "What is BS 10800?",
    a: (
      <>
        BS 10800 is a British Standard for security guarding companies that sets 
        requirements for staff, operations, and service quality. It helps businesses 
        demonstrate professionalism and strengthen their position in tenders and client contracts.
      </>
    ),
  },
];

const FAQPage = () => {
  return (
    <div className="bg-white min-h-screen selection:bg-[#997819] selection:text-white">
      {/* 🔹 HERO SECTION (Standard Background Image - No Parallax) */}
      <section className="relative h-screen py-32 md:py-40 bg-[#12066a] overflow-hidden">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/faq-hero.jpg')", // 👈 Image path check kar lena
          }}
        >
          {/* Brand Overlay: Image ko dark karne ke liye taake text nazar aaye */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#12066a]/90 via-[#12066a]/80 to-[#12066a]/95" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 ">
          <FadeIn direction="up">
            <span className="text-[#997819] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Information Hub
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.9]">
              Frequently Asked <br />
              <span className="text-[#997819]">Questions</span>
            </h1>
            <p className="text-blue-100/60 text-lg text-start max-w-2xl  font-medium leading-relaxed">
              Get clear answers to all your UK security, compliance, and
              certification questions with BizGrow Holdings.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 🔹 FAQ SECTION (Clean & Consistent Fix) */}
      <section className="py-24 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-6xl text-center font-bold text-[#12066a] pb-10">
              Frequently Asked Questions
            </h2>
            <FaqAccordion faqData={faqData} />
          </div>
        </div>
      </section>

      {/* 🔹 FOOTER CTA with Internal Parallax */}
      <section className="pb-32 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative p-12 md:p-24 rounded-[4rem] text-center overflow-hidden group shadow-2xl border border-white/5">
            {/* 🖼️ Internal Parallax Image Layer */}
            <div
              className="absolute inset-0 z-0 bg-fixed bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: "url('/faq-cta.png')",
                backgroundAttachment: "fixed",
              }}
            >
              {/* Deep Blue Overlay to maintain Brand Consistency */}
              <div className="absolute inset-0 bg-[#12066a]/80 backdrop-blur-[2px]" />
            </div>

            {/* Background Decorative Glow (z-10) */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#997819]/20 rounded-full blur-[100px] z-10 animate-pulse" />

            {/* Content Layer (z-20) */}
            <div className="relative z-20">
              <FadeIn direction="up">
                <HelpCircle className="mx-auto text-[#997819] mb-8" size={56} />

                <h3 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 tracking-tighter leading-none">
                  Still have <br />
                  <span className="text-[#997819]">questions?</span>
                </h3>

                <p className="text-blue-100/60 font-medium mb-12 max-w-lg mx-auto text-lg leading-relaxed">
                  Our experts are ready to help you navigate through UK
                  compliance requirements and business growth.
                </p>

                <Link
                  href="/contact-us"
                  className="relative group/btn overflow-hidden inline-flex items-center justify-center px-12 py-6 bg-[#997819] text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl transition-all duration-500 shadow-2xl transform hover:-translate-y-1 active:scale-95"
                >
                  {/* Layer 1: The Text (Top Layer) */}
                  <span className="relative z-40 transition-colors duration-500 group-hover/btn:text-[#12066a]">
                    Speak to our experts
                  </span>

                  {/* Layer 2: The Sliding White Background (Middle Layer) */}
                  <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-30" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;

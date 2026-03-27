
import { HelpCircle } from "lucide-react";
import FadeIn from "@/components/MotionWrapper";
import FaqAccordion from "@components/FaqAccordion";

export const metadata = {
  title: "UK Security & Compliance FAQs | BizGrow Holdings",
  description: "Find answers to common UK security, certification, and compliance questions. BizGrow Holdings provides expert guidance on ISO, ACS, SafeContractor and more.",
};
const faqData = [
  {
    q: "What qualifications do you need to be a dog handler?",
    a: "To be a dog handler in the UK, you usually need a Level 2 or 3 canine handling qualification. Relevant experience and licensing are also required, depending on the sector, such as security, detection, or assistance.Training ensures you meet industry standards and safety requirements.",
  },
  {
    q: "What are the main requirements of ISO 14001?",
    a: "ISO 14001 focuses on environmental management systems. Organisations must manage environmental impacts, comply with legislation, and pursue continual improvement. This standard helps UK businesses reduce risk and operate sustainably",
  },
  {
    q: "Is ACS certification worth it in the UK?",
    a: "Yes, ACS certification proves competence and regulatory compliance in the UK security sector. It increases credibility with clients and authorities. Many businesses find it essential to win contracts, and BizGrow provides guidance for achieving this.",
  },
  {
    q: "Is SafeContractor the same as SSIP?",
    a: "No. SafeContractor is an SSIP-accredited scheme, while SSIP is the umbrella framework covering multiple UK health and safety schemes. SafeContractor provides verified evidence of compliance under SSIP standards",
  },
  {
    q: "Difference between ISO 9001, ISO 14001, and ISO 45001?",
    a: "ISO 9001: Quality management | ISO 14001: Environmental management | ISO 45001: Health and safety management.Each standard targets specific business processes and improves operational performance in the UK.",
  },
  {
    q: "What are the differences between an internal audit and an external audit?",
    a: "Internal audits are conducted by your staff to check compliance and identify improvements. External audits are independent assessments for certification or regulatory purposes. Both ensure standards are met and maintained.",
  },
  {
    q: "The Importance of ISO 9001 in the construction industry?",
    a: "ISO 9001 helps construction businesses maintain quality, efficiency, and client trust. It ensures consistent processes and reduces errors. This standard is widely recognised in the UK construction sector.",
  },
  {
    q: "What are the SafeContractor accreditation requirements?",
    a: "Applicants must provide proof of health and safety policies, risk assessments, and legal compliance. SafeContractor reviews these documents to verify standards. Accreditation demonstrates your business is safe and reliable.",
  },
  {
    q: "How do I become a contractor?",
    a: "Register as a self-employed or limited company and ensure you meet insurance, legal, and compliance requirements. Gain industry-relevant certifications to strengthen credibility. Contractors must maintain professional standards for client trust.",
  },
  {
    q: "What does it mean to be a Constructionline Gold member?",
    a: "Gold membership shows enhanced pre-qualification status. It proves high standards in safety, finance, and quality management. Clients in the UK see it as a mark of reliability and competence",
  },
  {
    q: "Is Cyber Essentials hard to get?",
    a: "No. Most UK businesses can achieve it with basic IT security measures. Documentation and simple processes make certification straightforward and quick.",
  },
  {
    q: "What is the difference between Cyber Essentials and Cyber Essentials Plus?",
    a: "Cyber Essentials is a self-assessment of IT security. Cyber Essentials Plus involves independent technical testing. The Plus version provides greater assurance to clients and stakeholders.",
  },
  {
    q: "How to get a COP 119 certificate?",
    a: "Enroll in a COP 119 course or assessment via a certified UK training provider. Submit the required documentation for review. Once approved, you receive the official certificate.",
  },
  {
    q: "What Is SMAS Accreditation in Construction?",
    a: "SMAS is a health and safety accreditation scheme for the UK construction sector. It demonstrates that a business meets industry safety standards. SMAS helps improve credibility with clients and regulators",
  },
  {
    q: "What is better, CHAS or SMAS?",
    a: "Both are recognised in the UK, but CHAS is widely accepted across sectors. SMAS is more construction-focused. Choice depends on client preference and sector requirements.",
  },
  {
    q: "What is the BS 10800 provision of security services?",
    a: "BS 10800 sets standards for private security operations in the UK. It covers personnel competence, operational procedures, and legal compliance. Following it ensures quality and safety in security services.",
  },
  {
    q: "What is BS 7499?",
    a: "BS 7499 is the UK standard for manned guarding and static security services. It ensures personnel are trained, competent, and operating safely. Compliance improves trust with clients.",
  },
  {
    q: "What is the difference between screening and vetting?",
    a: "Screening involves basic background and identity checks. Vetting is more detailed, including criminal records, references, and suitability for sensitive roles. Vetting is used for high-security or regulated positions.",
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
            <h1 className="text-6xl text-center font-bold text-[#12066a] pb-10">
              Frequently Asked Questions
            </h1>
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
                backgroundAttachment:"fixed"
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

                <button className="px-12 py-6 bg-[#997819] text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white hover:text-[#12066a] transition-all duration-500 shadow-2xl transform hover:-translate-y-1">
                  Speak to our experts
                </button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;

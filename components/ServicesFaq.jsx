"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/MotionWrapper";

const ServicesFaq = ({ faqs = [], title = "FAQs" }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
const handleSubscribe = async () => {
  // localStorage safely check karo (SSR-safe bhi)
  if (typeof window !== "undefined" && localStorage.getItem("bizgrow_newsletter_subscribed")) {
    setMessage({ type: "success", text: "You're already subscribed!" });
    return;
  }

  if (!email || !email.includes("@")) {
    setMessage({ type: "error", text: "Please enter a valid email address." });
    return;
  }

  setLoading(true);
  setMessage(null);

  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => ({}));

    // DEBUG: pehle isse console mein check karlo ki API kya bhej rahi hai
    console.log("API response:", res.status, data);

    // res.ok ko primary trust karo, data.success sirf extra safety ke liye
    if (res.ok) {
      try {
        localStorage.setItem("bizgrow_newsletter_subscribed", "true");
      } catch (storageErr) {
        console.warn("localStorage not available:", storageErr);
      }

      setMessage({ type: "success", text: "Thank you for subscribing!" });
      setEmail("");
    } else {
      setMessage({
        type: "error",
        text: data.message || "Something went wrong. Please try again.",
      });
    }
  } catch (err) {
    console.error("Client fetch error:", err);
    setMessage({ type: "error", text: "Network error. Please check your connection." });
  } finally {
    setLoading(false);
  }
};
  if (!faqs || faqs.length === 0) return null;

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <section className="py-32 bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-6xl font-black text-[#12066a] tracking-tighter">
              {title}
            </h2>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mb-20">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
                type="button"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#12066a] group-hover:text-[#997819] transition-colors">
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-[#997819] transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-zinc-600 font-medium leading-relaxed border-t border-zinc-100 mt-2">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions / Newsletter Box */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#12066a] rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl shadow-[#12066a]/20 flex flex-col items-center text-center">
            
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#997819]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#997819]/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 normal-case relative z-10">
              Still Have Questions?
            </h3>

            <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
              Subscribe to our newsletter for compliance tips and industry updates.
            </p>

            <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3 relative z-10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe for news, updates and exclusive offers"
                className="w-full flex-1 bg-transparent border border-white/40 rounded-xl px-6 py-4 text-white placeholder-white/60 text-sm focus:outline-none focus:border-[#997819] transition-all"
              />
              
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full sm:w-auto bg-[#997819] hover:bg-[#806314] text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {message && (
              <p className={`mt-4 text-sm font-medium relative z-10 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
                {message.text}
              </p>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesFaq;
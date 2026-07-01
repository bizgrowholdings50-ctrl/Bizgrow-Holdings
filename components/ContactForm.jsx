"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { Turnstile } from "@marsidev/react-turnstile";

// ─── Shared Input Styles ────────────────────────────────────────────────────
const inputClasses = `
  peer w-full bg-transparent border-b-2 border-slate-100 
  px-0 py-5 text-xl font-bold text-[#12066a] 
  placeholder:text-transparent transition-all duration-500 outline-none
  focus:border-[#997819] hover:border-slate-300
`;

const labelClasses = `
  absolute left-0 top-5 text-zinc-400 pointer-events-none 
  transition-all duration-500 origin-left uppercase tracking-[0.3em] 
  font-black text-[10px] peer-focus:-translate-y-10 peer-focus:text-[#997819] 
  peer-[:not(:placeholder-shown)]:-translate-y-10
`;

// ─── All Services List (Aap isme manually mazeed add kar sakte hain) ────────
const ALL_SERVICES = [
  "SIA ACS",
  "COP 119",
  "Safe Contractor",
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "Construction Line",
  "NASDU",
  "SMAS",
  "Cyber Essentials",
  "Cyber Essentials Plus",
  "Chas Scheme",
  "BS 10800",
  "BS 7858",
  "BS 7499",
];

const useLenis = () => {
  if (typeof window === "undefined") return null;
  return window.lenis ?? null;
};

// ─── Step 1: Service Selection ───────────────────────────────────────────────
const ServiceStep = ({ selectedServices, setSelectedServices, onContinue }) => {
  const toggle = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter mb-4">
          Start your <span className="text-[#997819] italic">Consultation</span>
        </h2>
        <p className="text-slate-400 font-medium text-lg">
          Tell us about your requirements and we'll get back to you promptly.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#12066a] text-white flex items-center justify-center text-xs font-black">
            1
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#12066a]">
            Services
          </span>
        </div>
        <div className="flex-1 h-px bg-slate-200 max-w-[60px]" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs font-black">
            2
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Your Details
          </span>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <p className="text-sm font-black uppercase tracking-widest text-[#12066a] mb-1">
          Select Your Services
        </p>
        <p className="text-slate-400 text-sm mb-6">
          Choose one or more services you're interested in.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ALL_SERVICES.map((service) => {
            const isSelected = selectedServices.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggle(service)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-left
                  transition-all duration-300 text-sm font-bold
                  ${
                    isSelected
                      ? "border-[#997819] bg-[#997819]/10 text-[#12066a]"
                      : "border-slate-200 bg-white text-slate-500 hover:border-[#997819] hover:text-[#12066a]"
                  }
                `}
              >
                <div
                  className={`
                    w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all
                    ${isSelected ? "border-[#997819] bg-[#997819]" : "border-slate-300"}
                  `}
                >
                  {isSelected && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 10 8"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        d="M1 4l3 3 5-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="leading-snug">{service}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (selectedServices.length === 0) {
              toast.warning("Please select at least one service.");
              return;
            }
            onContinue();
          }}
          className="bg-[#12066a] hover:bg-[#997819] text-white font-black uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-700 flex items-center gap-3 group shadow-xl active:scale-95"
        >
          <span className="text-sm">Continue</span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

// ─── Step 2: Contact Form ────────────────────────────────────────────────────
const ContactStep = ({ selectedServices, onBack, coupon }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please verify that you are a human.");
      return;
    }

    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      number: e.target.number.value,
      service: selectedServices.join(", "),
      message: coupon ? `Coupon Applied: ${coupon}` : e.target.msg.value,
      coupon: coupon || "",
      captchaToken: captchaToken,
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Submission failed");
        setLoading(false);
        return;
      }

      // 🚀 GOOGLE ANALYTICS CUSTOM EVENT INJECTED HERE
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "form_submission", {
          event_category: "Lead Generation",
          event_label: coupon ? "Quotation Form" : "Consultation Form",
          services_selected: formData.service,
          coupon_used: formData.coupon || "none"
        });
      }

      toast.success("Consultation inquiry sent successfully!");
      setSent(true);
      e.target.reset();
      setCaptchaToken(null);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("Error sending email:", err);
      toast.error("Network error. Please check your connection.");
    } finally {
      document.body.style.cursor = "default";
      setLoading(false);
    }
  };

  return (
    <form className="w-full"  onSubmit={handleSubmit}>
      {/* Header */}
      <div className="mb-10">
       {coupon? (null):(<button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-[#12066a] transition-colors mb-6 text-xs font-black uppercase tracking-widest"
        >
          <ChevronLeft size={14} />
          Back to Services
        </button>)
}
        <h2 className="text-4xl md:text-5xl font-black text-[#12066a] tracking-tighter mb-4">
          {coupon ? (
            <>Send <span className="text-[#997819] italic">Quotation</span></>
          ) : (
            <>Send Us A <span className="text-[#997819] italic">Message.</span></>
          )}
        </h2>
        {!coupon && (
          <p className="text-slate-400 font-medium text-lg">
            Initiate your strategic consultation today.
          </p>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#997819] text-white flex items-center justify-center text-xs font-black">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 10 8"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                d="M1 4l3 3 5-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#997819]">
            Services
          </span>
        </div>
        <div className="flex-1 h-px bg-[#997819] max-w-[60px]" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#12066a] text-white flex items-center justify-center text-xs font-black">
            2
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#12066a]">
            Your Details
          </span>
        </div>
      </div>

      {/* Selected Services Tags */}
      <div className="mb-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
          Selected Services
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedServices.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full bg-[#12066a]/10 text-[#12066a] text-xs font-black border border-[#12066a]/20"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div className="relative group col-span-1">
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" "
            className={inputClasses}
            required
          />
          <label htmlFor="name" className={labelClasses}>
            Your Full Name
          </label>
        </div>

        <div className="relative group col-span-1">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            className={inputClasses}
            required
          />
          <label htmlFor="email" className={labelClasses}>
            Email Address
          </label>
        </div>

        <div className="relative group col-span-1">
          <input
            type="tel"
            name="number"
            id="number"
            placeholder=" "
            className={inputClasses}
            required
            onInput={(e) => {
              const originalValue = e.target.value;
              const cleanValue = originalValue.replace(/[^0-9+]/g, "");
              if (originalValue !== cleanValue) {
                toast.warning(
                  "Numbers Only: Please use only digits for the phone number.",
                  {
                    id: "phone-warning",
                    duration: 2000,
                  },
                );
              }
              e.target.value = cleanValue;
            }}
          />
          <label htmlFor="number" className={labelClasses}>
            Phone Number
          </label>
        </div>

        {/* Coupon/Message Dynamic Logical Field */}
        {coupon ? (
          <div className="relative group md:col-span-2">
            <input
              type="text"
              value={`${coupon}`}
              readOnly
              className={`${inputClasses} border-[#997819] text-[#997819]`}
            />
            <label className="absolute left-0 top-5 text-[#997819] pointer-events-none transition-all duration-500 origin-left uppercase tracking-[0.3em] font-black text-[10px] -translate-y-10">
              Coupon Code
            </label>
            <input type="hidden" name="coupon" value={coupon} />
          </div>
        ) : (
          <div className="relative group md:col-span-2">
            <textarea
              name="msg"
              id="msg"
              placeholder=" "
              className={`${inputClasses} min-h-[100px] py-4 resize-none`}
              required
            />
            <label htmlFor="msg" className={labelClasses}>
              Brief describe your objectives
            </label>
          </div>
        )}
      </div>

      {/* Turnstile */}
      <div className="mt-10">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
          onSuccess={(token) => setCaptchaToken(token)}
          onExpire={() => setCaptchaToken(null)}
          onError={() => setCaptchaToken(null)}
          theme="dark"
        />
      </div>

      {/* Submit */}
      <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <button
          disabled={loading || sent || !captchaToken}
          type="submit"
          className="w-full md:w-auto bg-[#12066a] hover:bg-[#997819] text-white font-black uppercase tracking-[0.2em] px-14 py-6 rounded-full transition-all duration-700 flex items-center justify-center gap-4 group relative overflow-hidden shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
        >
          <span className="relative z-10 text-sm">
            {loading
              ? "Processing..."
              : sent
                ? "Inquiry Sent"
                : !captchaToken
                  ? "Verify Captcha First"
                  : coupon
                    ? "Submit"
                    : "Initialise Consultation"}
          </span>

          {loading ? (
            <Loader2 size={18} className="animate-spin relative z-10" />
          ) : sent ? (
            <CheckCircle2
              size={18}
              className="text-emerald-400 relative z-10"
            />
          ) : (
            <Send
              size={18}
              className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>

        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              sent
                ? "bg-emerald-500"
                : captchaToken
                  ? "bg-[#997819]"
                  : "bg-red-500"
            }`}
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {sent
              ? "Message Received Successfully"
              : captchaToken
                ? "Verified Professional Inquiry"
                : "Complete Verification"}
          </span>
        </div>
      </div>
    </form>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlCoupon = params.get("coupon");
      const urlServices = params.get("services");

      if (urlCoupon) {
        setCoupon(decodeURIComponent(urlCoupon).trim());
      }

      if (urlServices) {
        // URL string ko decode kar ke spaces clean karna
        const decodedServices = decodeURIComponent(urlServices).replace(/\+/g, " ");
        
        // Comma separated items ko lowecase array mein badalna
        const rawUrlArray = decodedServices.split(",").map((s) => s.trim().toLowerCase());
        
        // Dynamic matching with ALL_SERVICES array
        const matchedServices = ALL_SERVICES.filter((service) =>
          rawUrlArray.includes(service.toLowerCase())
        );

        if (matchedServices.length > 0) {
          setSelectedServices(matchedServices);
          setStep(2); // Match hone par direct Step 2 par switch karein

          requestAnimationFrame(() => {
            const lenis = useLenis();
            if (lenis?.scrollTo) {
              lenis.scrollTo("#consultation-form");
            } else {
              document.getElementById("consultation-form")?.scrollIntoView({
                behavior: "smooth",
              });
            }
          });
        }
      }
    }
  }, []);

  return (
    <>
      <Toaster
        position="bottom-center"
        theme="dark"
        richColors
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#12066a",
          },
        }}
      />

      {step === 1 ? (
        <ServiceStep
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          onContinue={() => setStep(2)}
        />
      ) : (
        <ContactStep
          selectedServices={selectedServices}
          coupon={coupon}
          onBack={() => setStep(1)}
        />
      )}
    </>
  );
};

export default ContactForm;
"use client";

import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { GoogleLoginButton } from "./AuthButtons";

const NAVY = "#12066a";
const GOLD = "#997819";

const SERVICES = [
  "SIA ACS Consultancy",
  "COP 119 Compliance",
  "Safe Contractor Accreditation",
  "ISO 9001 Quality Management",
  "ISO 14001 Environmental Management",
  "ISO 45001 Health & Safety",
  "ConstructionLine Support",
  "NASDU Compliance",
  "SMAS Worksafe Accreditation",
  "Cyber Essentials Certification",
  "CHAS Scheme Support",
  "BS 10800 Security Standard",
  "BS 7858 Vetting & Screening",
  "BS 7499 Patrol Services Standard",
];

export default function ReferredClientForm({
  referrerName,
  referrerCode,
  prefill = {},
}) {
  const [name, setName] = useState(prefill.name || "");
  const [email, setEmail] = useState(prefill.email || "");
  const [number, setNumber] = useState(prefill.number || "");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (prefill.name) setName(prefill.name);
    if (prefill.email) setEmail(prefill.email);
    if (prefill.number) setNumber(prefill.number);
  }, [prefill]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!captchaToken) {
      setError("Please complete the verification captcha.");
      setLoading(false);
      return;
    }

    // Structure the message with referral details so the /api/send endpoint extracts it correctly
    const structuredMessage = `New Referral Client — 5% Discount Request
Referrer Name: ${referrerName || "Unknown Referrer"}
Referral Code: ${referrerCode || "Unknown Code"}
Discount Details: 5% off first eligible compliance service (£650+ VAT).
User Message: ${message || "No additional comments."}`;

    try {
      if (prefill.id) {
        const { createClient } = require("../utils/supabase/client");
        const supabase = createClient();
        await supabase
          .from("profiles")
          .update({
            description_type: `Referred: ${service}`,
            contact_number: number.trim(),
          })
          .eq("id", prefill.id);
      }

      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          number: number.trim(),
          service: service,
          message: structuredMessage,
          coupon: "5% Referral Discount",
          captchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong during form submission.",
        );
      }

      setSuccess(true);
    } catch (err) {
      console.error("Referred client form error:", err);
      setError(
        err.message ||
          "An error occurred while submitting your details. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border border-[#997819]/30 rounded-3xl p-8 text-center space-y-6 shadow-lg shadow-[#12066a]/5 max-w-xl mx-auto">
        <div className="w-16 h-16 bg-amber-100 text-[#997819] rounded-full flex items-center justify-center font-bold text-2xl mx-auto border border-amber-400">
          ⌛
        </div>

        <div>
          <h3 className="text-2xl font-black" style={{ color: NAVY }}>
            Inquiry Submitted Successfully!
          </h3>

          <p className="text-sm text-slate-600 font-medium mt-3 leading-relaxed">
            Thank you! Your 5% discount inquiry for <b>{service}</b> has been
            received. Our Sales Team is now reviewing your request.
          </p>

          <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-left text-xs text-slate-500 space-y-2 leading-relaxed">
            <p>
              • A sales consultant will contact you at <b>{number}</b> or{" "}
              <b>{email}</b> within 12–24 business hours.
            </p>
            <p>
              • Once your compliance service <span className="text-red-600">(Min £650+ VAT)</span> is purchased and
              payment is cleared, your Partner Dashboard will unlock.
            </p>
          </div>

          <div className="mt-5 bg-[#12066a] border border-amber-200 rounded-2xl p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
              Your Dashboard is Locked
            </p>
            <p className="text-xs text-white leading-relaxed">
              Once your request is approved, your Partner Dashboard unlocks
              automatically giving you your own unique referral link,
              real-time tracking of everyone you refer, and <strong className="text-red-500">£125 credit</strong>  for
              every successful referral <strong className="text-red-500">up to £1,000</strong> per (12-month period).
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs text-slate-600 font-medium">
              In the meantime, create your profile and complete onboarding so
              you're ready to go the moment you're approved.
            </p>

            <GoogleLoginButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_15px_40px_rgba(18,6,106,0.04)] max-w-xl mx-auto">
      <div className="text-center mb-8 space-y-2">
        <h3 className="text-2xl font-extrabold" style={{ color: NAVY }}>
          Choose Your Service
        </h3>
        
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={prefill.name}
            placeholder="e.g. John Doe"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819] disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={prefill.email}
            placeholder="e.g. john@example.com"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819] disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            disabled={prefill.number}
            placeholder="e.g. +44 7123 456789"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819] disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Service *
          </label>
          <select
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 bg-white outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819]"
          >
            <option value="">-- Choose Compliance Service --</option>
            {SERVICES.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Additional Comments (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your company requirements or query..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 min-h-[80px] resize-none outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819]"
          />
        </div>

        {/* Turnstile Captcha */}
        <div className="flex justify-center py-2">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
            onSuccess={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
            onError={() => setCaptchaToken(null)}
            theme="light"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !captchaToken}
          className="w-full py-4 rounded-2xl text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#12066a]/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: NAVY }}
        >
          {loading ? "Submitting Details..." : "Request 5% Discount"}
        </button>
      </form>
    </div>
  );
}

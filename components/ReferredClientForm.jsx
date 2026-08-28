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

// Cookie settings
const REFERRAL_COOKIE_NAME = "bizgrow_referral_onboarding";
const REFERRAL_COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

function saveReferralOnboardingCookie(data) {
  try {
    const encodedData = encodeURIComponent(JSON.stringify(data));

    document.cookie = [
      `${REFERRAL_COOKIE_NAME}=${encodedData}`,
      "path=/",
      `max-age=${REFERRAL_COOKIE_MAX_AGE}`,
      "SameSite=Lax",
      window.location.protocol === "https:" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");

    // Also save in localStorage as a fallback.
    // This does not change the main cookie flow.
    localStorage.setItem(
      REFERRAL_COOKIE_NAME,
      JSON.stringify(data),
    );

    console.log("Referral onboarding data saved.");
  } catch (error) {
    console.error(
      "Unable to save referral onboarding data:",
      error,
    );
  }
}

export default function ReferredClientForm({
  referrerName,
  referrerCode,
  prefill = {},
  onSuccess,
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

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanNumber = number.trim();
    const cleanMessage = message.trim();

    const structuredMessage = `New Referral Client — 5% Discount Request
Referrer Name: ${referrerName || "Unknown Referrer"}
Referral Code: ${referrerCode || "Unknown Code"}
Discount Details: 5% off first eligible compliance service (£650+ VAT).
User Message: ${cleanMessage || "No additional comments."}`;

    try {
      /*
       * ---------------------------------------------------------
       * EXISTING PROFILE UPDATE LOGIC
       * ---------------------------------------------------------
       * Agar kisi existing authenticated user ka prefill.id hai,
       * to purana behavior bilkul same rahega.
       */
      if (prefill.id) {
        const { createClient } = require("../utils/supabase/client");
        const supabase = createClient();

        const { error: profileUpdateError } = await supabase
          .from("profiles")
          .update({
            full_name: cleanName,
            email: cleanEmail,
            contact_number: cleanNumber,
            description_type: `Referred: ${service}`,
          })
          .eq("id", prefill.id);

        if (profileUpdateError) {
          console.error(
            "Profile update error:",
            profileUpdateError,
          );

          throw new Error(
            "Unable to save your profile details. Please try again.",
          );
        }
      }

      /*
       * ---------------------------------------------------------
       * SAVE REFERRAL DETAILS FOR NEW USER
       * ---------------------------------------------------------
       * New user ke case mein profile abhi exist nahi karti.
       * Isliye details cookie mein temporarily save hongi.
       *
       * Google signup/login ke baad onboarding page is cookie
       * ko read karke fields prefill kar sakta hai.
       */
      const referralOnboardingData = {
        name: cleanName,
        email: cleanEmail,
        number: cleanNumber,
        service: service,
        message: cleanMessage,
        referrerCode: referrerCode || "",
        referrerName: referrerName || "",
        savedAt: new Date().toISOString(),
      };

      saveReferralOnboardingCookie(referralOnboardingData);

      /*
       * ---------------------------------------------------------
       * SEND INQUIRY EMAIL
       * ---------------------------------------------------------
       * Existing API flow bilkul same rakha gaya hai.
       */
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          number: cleanNumber,
          service: service,
          message: structuredMessage,
          coupon: "5% Referral Discount",
          captchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Something went wrong during form submission.",
        );
      }

      setSuccess(true);

      /*
       * Parent component ko bata dein ke form submit ho gaya.
       */
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (err) {
      console.error(
        "Referred client form error:",
        err,
      );

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
      <div className="bg-white border mt-22 border-[#997819]/30 rounded-3xl p-8 text-center space-y-6 shadow-lg shadow-[#12066a]/5 max-w-xl mx-auto">
        <div className="w-16 h-16 bg-amber-100 text-[#997819] rounded-full flex items-center justify-center font-bold text-2xl mx-auto border border-amber-400">
          ⌛
        </div>

        <div>
          <h3
            className="text-2xl font-black"
            style={{ color: NAVY }}
          >
            Your Referral Request Has Been Received!
          </h3>

          <p className="text-sm text-slate-600 font-medium mt-3 leading-relaxed">
            Thank you! Your 5% discount request for{" "}
            <b>{service}</b> has been received. Our Team is now
            reviewing your request.
          </p>

          <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-left text-xs text-slate-500 space-y-2 leading-relaxed">
            <p>
              • Our Team will contact you within 12–24 business
              hours using the contact details ({number} or{" "}
              {email}) you provided
            </p>

            <p>
              • We’ll discuss your requirements, confirm
              eligibility and guide you through the next steps and
              Your 5% referral discount will be applied once your
              qualifying service is done.
            </p>
          </div>

          <div className="mt-5 bg-[#12066a] border border-amber-200 rounded-2xl p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-white mb-1">
              Want to Earn Too?
            </p>

            <p className="text-xs text-white leading-relaxed">
              Once you become a qualifying BizGrow client, you’ll
              unlock your own Partner Dashboard where you can
              refer other businesses and you will get
            </p>
          </div>

          <ul className="space-y-3 text-left text-sm text-slate-700 mt-5">
            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#997819]/10 text-[#997819]">
                ✓
              </span>

              <span>
                <strong>
                  Your own unique referral link
                </strong>
              </span>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#997819]/10 text-[#997819]">
                ✓
              </span>

              <span>
                <strong>
                  Referral tracking through your Partner Dashboard
                </strong>
              </span>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#997819]/10 text-[#997819]">
                ✓
              </span>

              <span>
                <strong>
                  £125 credit for every successful referral
                </strong>
              </span>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#997819]/10 text-[#997819]">
                ✓
              </span>

              <span>
                <strong>
                  The opportunity to build your own referral network
                </strong>
              </span>
            </li>
          </ul>

          <div className="mt-6 space-y-3">
            <p className="text-xs text-slate-600 font-medium text-left">
              Get your profile ready while your referral request is
              being reviewed
            </p>

            <GoogleLoginButton text="Create My BizGrow Account" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_15px_40px_rgba(18,6,106,0.04)] max-w-xl mx-auto">
      <div className="text-center mb-8 space-y-2">
        <h3
          className="text-2xl font-extrabold"
          style={{ color: NAVY }}
        >
          Claim Your Exclusive Discount
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 text-left"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-4 rounded-xl">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Full Name *
          </label>

          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!!prefill.name}
            placeholder="e.g. John Doe"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819] disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Email Address *
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!prefill.email}
            placeholder="e.g. john@example.com"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819] disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Phone Number *
          </label>

          <input
            type="tel"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            disabled={!!prefill.number}
            placeholder="e.g. +44 7123 456789"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819] disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>

        {/* Service */}
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
            <option value="">
              -- Choose Compliance Service --
            </option>

            {SERVICES.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
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
            siteKey={
              process.env
                .NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
            }
            onSuccess={(token) =>
              setCaptchaToken(token)
            }
            onExpire={() =>
              setCaptchaToken(null)
            }
            onError={() =>
              setCaptchaToken(null)
            }
            theme="light"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !captchaToken}
          className="w-full py-4 rounded-2xl text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#12066a]/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: NAVY }}
        >
          {loading
            ? "Submitting Details..."
            : "Request My 5% Discount"}
        </button>
      </form>
    </div>
  );
}


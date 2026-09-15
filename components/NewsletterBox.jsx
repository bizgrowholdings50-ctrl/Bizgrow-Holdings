// components/NewsletterBox.jsx
"use client";

import { useState } from "react";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubscribe = async () => {
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

  return (
    <div className="max-w-5xl -mt-20 mx-auto">
      <div className="rounded-3xl p-8 md:p-14 relative overflow-hidden bg-white flex flex-col items-center text-center ">
        <h3 className="text-[#12066a] text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 normal-case relative z-10">
          To Get Compliance Updates
        </h3>

        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3 relative z-10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email & Subscribe to our newsletter."
            className="w-full flex-1 bg-white border border-gray-300 rounded-xl px-6 py-4 text-[#12066a] placeholder-gray-500 text-sm focus:outline-none focus:border-[#997819] transition-all"
          />

          <button
            type="button"
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full sm:w-auto bg-[#997819] hover:bg-[#806314] text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shrink-0 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-sm font-medium relative z-10 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsletterBox;
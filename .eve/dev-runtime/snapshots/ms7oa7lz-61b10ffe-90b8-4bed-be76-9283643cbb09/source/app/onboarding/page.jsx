"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";

const NAVY = "#12066a";
const GOLD = "#997819";

export default function OnboardingPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);

  // Referrer tracking
  const [referrerName, setReferrerName] = useState("");
  const [referralCode, setReferralCode] = useState("");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("Business Owner");
  const [bestDescribes, setBestDescribes] = useState("I own a business");
  const [heardBefore, setHeardBefore] = useState("No");
  const [contactNumber, setContactNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setCheckingAuth((prev) => {
        if (prev) {
          console.warn("Safety timeout triggered: Forcing loading to false");
          return false;
        }
        return prev;
      });
    }, 3500);

    async function initAuth() {
      try {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code");
        let ref0 = params.get("ref");
        let refCode = ref0 ? ref0.trim() : "";

        if (authCode) {
          await supabase.auth.exchangeCodeForSession(authCode);
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        // 1. Fallback to cookie if ref not in URL
        if (!refCode) {
          const match = document.cookie
            .split(";")
            .map((item) => item.trim())
            .find((item) => item.startsWith("bizgrow_referrer="));
          if (match) {
            refCode = decodeURIComponent(match.split("=")[1] || "").trim();
          }
        } else {
          document.cookie = `bizgrow_referrer=${encodeURIComponent(refCode)}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }

        // 2. Get active session securely
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user || null;

        if (currentUser) {
          setUser(currentUser);
          if (currentUser.user_metadata?.full_name && !fullName) {
            setFullName(currentUser.user_metadata.full_name);
          }

          // Note: Automatic redirect hata diya gaya hai taaki user khud form fill kare 
          // ya manually dashboard button click kare.
        }

        // 3. Resolve Referrer Name from Database
        if (refCode) {
          setReferralCode(refCode);

          let { data: referrerData } = await supabase
            .from("profiles")
            .select("full_name, id, referral_code")
            .eq("referral_code", refCode)
            .maybeSingle();

          if (!referrerData) {
            let { data: idData } = await supabase
              .from("profiles")
              .select("full_name, id, referral_code")
              .eq("id", refCode)
              .maybeSingle();
            referrerData = idData;
          }

          if (referrerData?.full_name) {
            setReferrerName(referrerData.full_name);
          }
        }
      } catch (err) {
        console.error("Initialization error catch block:", err);
      } finally {
        clearTimeout(safetyTimer);
        setCheckingAuth(false);
      }
    }

    initAuth();
  }, [supabase, fullName]);

  const handleNextSubStep = () => {
    setErrorMessage("");
    if (subStep === 1 && !fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (subStep === 2 && !companyName.trim()) {
      setErrorMessage("Please enter your company name.");
      return;
    }
    if (subStep === 6 && !contactNumber.trim()) {
      setErrorMessage("Please enter your contact number.");
      return;
    }

    if (subStep < 6) {
      setSubStep(subStep + 1);
    } else {
      handleSubmitOnboarding();
    }
  };

  const handlePrevSubStep = () => {
    setErrorMessage("");
    if (subStep > 1) {
      setSubStep(subStep - 1);
    }
  };

  const handleSubmitOnboarding = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const activeUser = session?.user || user;

      if (!activeUser) {
        setErrorMessage("User session not found. Please log in again.");
        setLoading(false);
        return;
      }

      const generatedReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: activeUser.id,
          full_name: fullName.trim(),
          company_name: companyName.trim(),
          role,
          description_type: bestDescribes,
          heard_before: heardBefore,
          contact_number: contactNumber.trim(),
          referral_code: generatedReferralCode,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        });

      if (profileError) {
        throw profileError;
      }

      if (referralCode) {
        let referrerId = null;

        const { data: refByCode } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", referralCode)
          .maybeSingle();

        if (refByCode) {
          referrerId = refByCode.id;
        } else {
          const { data: refById } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", referralCode)
            .maybeSingle();
          if (refById) {
            referrerId = refById.id;
          }
        }

        if (referrerId && referrerId !== activeUser.id) {
          await supabase.from("referrals").upsert({
            referrer_id: referrerId,
            referred_user_id: activeUser.id,
            status: "completed",
          }, { onConflict: 'referred_user_id' });
        }
      }

      setStep(2);
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "An unexpected error occurred while saving your profile.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-600 animate-pulse">
          Loading BizGrow Onboarding...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              {referrerName ? (
                <div className="mb-4 inline-block rounded-full bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-900 border border-amber-200">
                  🎉 You&apos;ve Been Invited by <span className="underline font-bold">{referrerName}</span>
                </div>
              ) : (
                <span
                  className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold"
                  style={{ color: GOLD }}
                >
                  BizGrow Referral Partner Program
                </span>
              )}

              <h1 className="mt-3 text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                Complete Your Profile Setup
              </h1>
              
              <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-left">
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Before We Get Started
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Please take a moment to provide a few quick details so we can configure your partner account and tailor your dashboard experience.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500 px-1">
                <span>Step {subStep} of 6</span>
                <span style={{ color: GOLD }}>{Math.round((subStep / 6) * 100)}% Completed</span>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300"
                style={{ width: `${(subStep / 6) * 100}%`, backgroundColor: GOLD }}
              />
            </div>

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="py-2 min-h-[160px]">
              {subStep === 1 && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    1. Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819]"
                    autoFocus
                  />
                </div>
              )}

              {subStep === 2 && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    2. Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. BizGrow Holdings"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819]"
                    autoFocus
                  />
                </div>
              )}

              {subStep === 3 && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    3. Your Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-800 bg-white outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819]"
                  >
                    <option value="Business Owner">Business Owner</option>
                    <option value="Director">Director</option>
                    <option value="Manager">Manager</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Employee">Employee</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              {subStep === 4 && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    4. Which best describes you?
                  </label>
                  <div className="space-y-2.5 text-xs text-slate-700">
                    {[
                      "I own a business",
                      "I know businesses that may need certifications",
                      "I'm interested in referrals",
                      "Just exploring",
                    ].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-slate-200 transition">
                        <input
                          type="radio"
                          name="bestDescribes"
                          checked={bestDescribes === opt}
                          onChange={() => setBestDescribes(opt)}
                          className="text-[#997819] focus:ring-[#997819]"
                        />
                        <span className="font-medium text-slate-800">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {subStep === 5 && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    5. Have you heard about BizGrow before?
                  </label>
                  <div className="flex gap-4 text-xs text-slate-700">
                    {["Yes", "No"].map((ans) => (
                      <label key={ans} className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-slate-200 transition">
                        <input
                          type="radio"
                          name="heardBefore"
                          checked={heardBefore === ans}
                          onChange={() => setHeardBefore(ans)}
                          className="text-[#997819] focus:ring-[#997819]"
                        />
                        <span className="font-medium text-slate-800">{ans}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {subStep === 6 && (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    6. Contact Details / Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +44 7123 456789"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-800 outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819]"
                    autoFocus
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              {subStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevSubStep}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                disabled={loading}
                onClick={handleNextSubStep}
                className="flex-1 py-3.5 rounded-xl text-xs font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-70"
                style={{ backgroundColor: NAVY }}
              >
                {loading
                  ? "Saving Details..."
                  : subStep === 6
                  ? "Complete Onboarding"
                  : "Next Step"}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold text-xl">
              ✓
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                Welcome to BizGrow!
              </h1>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Your referral account has been successfully created. Thank you for joining our Referral Partner Program.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/referral-program")}
              className="w-full rounded-2xl py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              style={{ backgroundColor: NAVY }}
            >
              Go to Referral Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
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
          console.warn(
            "Safety timeout triggered: Forcing loading to false"
          );
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

        /*
         * ---------------------------------------------------------
         * 1. Exchange Google/Auth callback code if present
         * ---------------------------------------------------------
         */
        if (authCode) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(authCode);

          if (exchangeError) {
            console.error(
              "Auth code exchange error:",
              exchangeError
            );
          }

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }

        /*
         * ---------------------------------------------------------
         * 2. Referral tracking
         *
         * Priority:
         * URL ?ref=CODE
         * ↓
         * referral cookie
         * ---------------------------------------------------------
         */
        if (!refCode) {
          const match = document.cookie
            .split(";")
            .map((item) => item.trim())
            .find((item) =>
              item.startsWith("bizgrow_referrer=")
            );

          if (match) {
            refCode = decodeURIComponent(
              match.split("=")[1] || ""
            ).trim();
          }
        } else {
          document.cookie = `bizgrow_referrer=${encodeURIComponent(
            refCode
          )}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }

        /*
         * Keep referral code in state.
         *
         * IMPORTANT:
         * If the user came through a referral URL, this remains
         * available after Google authentication/onboarding.
         */
        if (refCode) {
          setReferralCode(refCode);
        }

        /*
         * ---------------------------------------------------------
         * 3. Get current authenticated user
         * ---------------------------------------------------------
         */
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const currentUser = session?.user || null;

        if (currentUser) {
          setUser(currentUser);

          if (
            currentUser.user_metadata?.full_name &&
            !fullName
          ) {
            setFullName(
              currentUser.user_metadata.full_name
            );
          }
        }

        /*
         * ---------------------------------------------------------
         * 4. Resolve Referrer Name
         * ---------------------------------------------------------
         */
        if (refCode) {
          let { data: referrerData } = await supabase
            .from("profiles")
            .select("full_name, id, referral_code")
            .eq("referral_code", refCode)
            .maybeSingle();

          /*
           * Fallback:
           * ref value may be profile UUID instead of referral_code
           */
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
        console.error(
          "Initialization error catch block:",
          err
        );
      } finally {
        clearTimeout(safetyTimer);
        setCheckingAuth(false);
      }
    }

    initAuth();

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [supabase]);

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
      /*
       * ---------------------------------------------------------
       * 1. Get authenticated user
       * ---------------------------------------------------------
       */
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const activeUser = session?.user || user;

      if (!activeUser) {
        setErrorMessage(
          "User session not found. Please log in again."
        );
        setLoading(false);
        return;
      }

      /*
       * ---------------------------------------------------------
       * 2. IMPORTANT:
       * Re-check referral cookie before deciding partner_status.
       *
       * This protects the flow if the referral code was lost from
       * React state during Google authentication/navigation.
       * ---------------------------------------------------------
       */
      let finalReferralCode = referralCode?.trim() || "";

      if (!finalReferralCode) {
        const match = document.cookie
          .split(";")
          .map((item) => item.trim())
          .find((item) =>
            item.startsWith("bizgrow_referrer=")
          );

        if (match) {
          finalReferralCode = decodeURIComponent(
            match.split("=")[1] || ""
          ).trim();
        }
      }

      /*
       * ---------------------------------------------------------
       * 3. Get existing profile first
       *
       * This is important because we DON'T want onboarding to
       * accidentally overwrite an already approved account.
       * ---------------------------------------------------------
       */
      const { data: existingProfile, error: existingProfileError } =
        await supabase
          .from("profiles")
          .select("partner_status")
          .eq("id", activeUser.id)
          .maybeSingle();

      if (existingProfileError) {
        console.warn(
          "Could not read existing profile:",
          existingProfileError
        );
      }

      /*
       * ---------------------------------------------------------
       * 4. Determine partner status
       *
       * REFERRAL USER:
       *   New referred user => pending
       *
       * NORMAL USER:
       *   Existing status is preserved.
       *   New normal user => approved
       *
       * IMPORTANT:
       * We never set a referred user to approved here.
       * Admin approval is responsible for that.
       * ---------------------------------------------------------
       */
      let partnerStatus;

      if (finalReferralCode) {
        if (existingProfile?.partner_status === "approved") {
          /*
           * Never downgrade an already approved account.
           */
          partnerStatus = "approved";
        } else {
          /*
           * New referred user remains pending.
           */
          partnerStatus = "pending";
        }
      } else {
        /*
         * Normal/non-referred onboarding.
         *
         * Preserve an existing status if one already exists.
         * Otherwise keep the original behaviour: approved.
         */
        partnerStatus =
          existingProfile?.partner_status || "approved";
      }

      /*
       * ---------------------------------------------------------
       * 5. Generate referral code
       * ---------------------------------------------------------
       */
      const generatedReferralCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      /*
       * ---------------------------------------------------------
       * 6. Save profile
       *
       * IMPORTANT FIX:
       *
       * OLD CODE had:
       *
       * role,
       * ...
       * role: accountType,
       *
       * The second role overwrote the actual selected role.
       *
       * Now only the real role is saved.
       * ---------------------------------------------------------
       */
      const profilePayload = {
        id: activeUser.id,

        full_name: fullName.trim(),
        company_name: companyName.trim(),

        role: role,

        description_type: bestDescribes,
        heard_before: heardBefore,
        contact_number: contactNumber.trim(),

        referral_code: generatedReferralCode,

        partner_status: partnerStatus,

        onboarding_completed: true,

        updated_at: new Date().toISOString(),
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(profilePayload);

      if (profileError) {
        console.error("SUPABASE PROFILE UPSERT ERROR:", {
          message: profileError.message,
          code: profileError.code,
          details: profileError.details,
          hint: profileError.hint,
        });

        throw new Error(
          profileError.message ||
            profileError.code ||
            "Failed to save profile."
        );
      }

      /*
       * ---------------------------------------------------------
       * 7. Referral user detected
       *
       * Create/update referral relationship.
       * Existing referral logic remains intact.
       * ---------------------------------------------------------
       */
      if (finalReferralCode) {
        let referrerId = null;

        /*
         * Try referral code first
         */
        const { data: refByCode } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", finalReferralCode)
          .maybeSingle();

        if (refByCode) {
          referrerId = refByCode.id;
        } else {
          /*
           * Fallback: referral value may be profile ID
           */
          const { data: refById } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", finalReferralCode)
            .maybeSingle();

          if (refById) {
            referrerId = refById.id;
          }
        }

        /*
         * Don't create self-referral
         */
        if (
          referrerId &&
          referrerId !== activeUser.id
        ) {
          const { error: referralError } = await supabase
            .from("referrals")
            .upsert(
              {
                referrer_id: referrerId,
                referred_user_id: activeUser.id,

                /*
                 * Referred relationship remains pending.
                 *
                 * This is separate from partner_status.
                 */
                status: "completed",
              },
              {
                onConflict: "referred_user_id",
              }
            );

          if (referralError) {
            console.warn(
              "Referral relationship error:",
              referralError
            );
          }
        }
      }

      /*
       * ---------------------------------------------------------
       * 8. Move to success screen
       * ---------------------------------------------------------
       */
      setStep(2);
    } catch (err) {
      console.error(
        "Submission error:",
        err
      );

      setErrorMessage(
        err?.message ||
          "An unexpected error occurred while saving your profile."
      );
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
                  🎉 You&apos;ve Been Invited by{" "}
                  <span className="underline font-bold">
                    {referrerName}
                  </span>
                </div>
              ) : (
                <span
                  className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold"
                  style={{ color: GOLD }}
                >
                  BizGrow Referral Partner Program
                </span>
              )}

              <h1
                className="mt-3 text-2xl font-bold tracking-tight"
                style={{ color: NAVY }}
              >
                Complete Your Profile Setup
              </h1>

              <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-left">
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Before We Get Started
                </p>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Please take a moment to provide a few quick
                  details so we can configure your partner
                  account and tailor your dashboard experience.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500 px-1">
                <span>
                  Step {subStep} of 6
                </span>

                <span style={{ color: GOLD }}>
                  {Math.round(
                    (subStep / 6) * 100
                  )}
                  % Completed
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${(subStep / 6) * 100}%`,
                  backgroundColor: GOLD,
                }}
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
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
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
                    onChange={(e) =>
                      setCompanyName(e.target.value)
                    }
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
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-800 bg-white outline-none focus:border-[#997819] focus:ring-1 focus:ring-[#997819]"
                  >
                    <option value="Business Owner">
                      Business Owner
                    </option>

                    <option value="Director">
                      Director
                    </option>

                    <option value="Manager">
                      Manager
                    </option>

                    <option value="Consultant">
                      Consultant
                    </option>

                    <option value="Employee">
                      Employee
                    </option>

                    <option value="Other">
                      Other
                    </option>
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
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-slate-200 transition"
                      >
                        <input
                          type="radio"
                          name="bestDescribes"
                          checked={
                            bestDescribes === opt
                          }
                          onChange={() =>
                            setBestDescribes(opt)
                          }
                          className="text-[#997819] focus:ring-[#997819]"
                        />

                        <span className="font-medium text-slate-800">
                          {opt}
                        </span>
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
                      <label
                        key={ans}
                        className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-slate-200 transition"
                      >
                        <input
                          type="radio"
                          name="heardBefore"
                          checked={
                            heardBefore === ans
                          }
                          onChange={() =>
                            setHeardBefore(ans)
                          }
                          className="text-[#997819] focus:ring-[#997819]"
                        />

                        <span className="font-medium text-slate-800">
                          {ans}
                        </span>
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
                    onChange={(e) =>
                      setContactNumber(e.target.value)
                    }
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
              <h1
                className="text-2xl font-bold tracking-tight"
                style={{ color: NAVY }}
              >
                Welcome to BizGrow!
              </h1>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Your referral account has been successfully
                created. Thank you for joining our Referral
                Partner Program.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/referral-program/dashboard")}
              className="w-full rounded-2xl py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
              style={{ backgroundColor: NAVY }}
            >
              Go to Dashboard
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
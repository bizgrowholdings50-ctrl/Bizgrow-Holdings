"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

const NAVY = "#12066a";
const GOLD = "#997819";

// ============================================================
// AUTH MEMORY COOKIES
// ============================================================

function setAuthCookie(name, value, days = 365) {
  if (typeof document === "undefined") return;

  const maxAge = days * 24 * 60 * 60;

  document.cookie =
    `${name}=${encodeURIComponent(value)}` +
    `; path=/` +
    `; max-age=${maxAge}` +
    `; SameSite=Lax` +
    (window.location.protocol === "https:"
      ? "; Secure"
      : "");
}

function getAuthCookie(name) {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) =>
    item.startsWith(`${name}=`)
  );

  if (!cookie) return null;

  return decodeURIComponent(
    cookie.substring(name.length + 1)
  );
}

// ============================================================
// REFERRAL COOKIE HELPERS
// ============================================================

function getReferralCookieValue() {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) =>
    item.startsWith("bizgrow_referrer=")
  );

  if (!cookie) return null;

  return decodeURIComponent(
    cookie.substring("bizgrow_referrer=".length)
  );
}

function getReferralQueryParam() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(
    window.location.search
  );

  return params.get("ref");
}

function setReferralCookie(referralCode) {
  if (
    typeof document === "undefined" ||
    !referralCode
  ) {
    return;
  }

  const hostname = window.location.hostname;

  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1";

  const secure =
    window.location.protocol === "https:";

  let cookie =
    `bizgrow_referrer=${encodeURIComponent(
      referralCode
    )}` +
    `; path=/` +
    `; max-age=${30 * 24 * 60 * 60}` +
    `; SameSite=${secure ? "None" : "Lax"}`;

  if (secure && !isLocalhost) {
    cookie += `; Secure; Domain=.${hostname}`;
  }

  document.cookie = cookie;
}

// ============================================================
// REFERRAL BOX
// IMPORTANT: EXPORTED BECAUSE DASHBOARD USES IT
// ============================================================

export function ReferralBox({ referralCode }) {
  const [copied, setCopied] = useState(false);

  if (!referralCode) return null;

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/referral-program?ref=${referralCode}`
      : "";

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(
        referralLink
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy referral link:",
        error
      );
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Your Referral Link
      </p>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 outline-none"
        />

        <button
          type="button"
          onClick={copyReferralLink}
          className="shrink-0 rounded-xl px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
          style={{
            backgroundColor: NAVY,
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// REFERRAL COOKIE NOTICE
// ============================================================

export function ReferralCookieNotice() {
  const [referralCode, setReferralCode] =
    useState(null);

  useEffect(() => {
    const queryReferral =
      getReferralQueryParam();

    const cookieReferral =
      getReferralCookieValue();

    const code =
      queryReferral || cookieReferral;

    if (code) {
      setReferralCode(code);

      if (queryReferral) {
        setReferralCookie(queryReferral);
      }
    }
  }, []);

  if (!referralCode) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 z-[9998] mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="text-sm font-semibold text-slate-800">
        Referral link detected
      </p>

      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        Your referral information has been saved
        and will remain available during your signup.
      </p>
    </div>
  );
}

// ============================================================
// LOGIN BUTTON
// ============================================================

export function LoginButton() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // ----------------------------------------------------------
  // MODERN TOAST
  // ----------------------------------------------------------

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });

    window.setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // ----------------------------------------------------------
  // LOGIN
  // ----------------------------------------------------------

  const handleLogin = async () => {
    // FIX #1: agar already loading hai to dubara mat chalao.
    // Yehi guard duplicate magic-link requests (double click / re-render)
    // rokta hai.
    if (loading) return;

    setLoading(true);

    try {
      // ======================================================
      // ALWAYS CHECK REAL SUPABASE SESSION FIRST
      // ======================================================

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "Session check error:",
          sessionError
        );
      }

      // ======================================================
      // REAL SESSION EXISTS
      // DO NOT SEND MAGIC LINK
      // ======================================================

      if (session) {
        router.push(
          "/referral-program/dashboard"
        );

        // FIX #2 (main "stuck on loading" bug):
        // router.push() sirf navigation *request* karta hai,
        // component turant unmount nahi hota (especially agar
        // middleware/redirect thora slow ho ya wapas isi route
        // pe land ho jaye). Us waqt tak button "Please wait..."
        // par attka reh jata tha kyunki loading kabhi false
        // set hi nahi hua tha.
        setLoading(false);

        return;
      }

      // ======================================================
      // NO REAL SESSION
      // CHECK REMEMBERED LOGIN METHOD
      // ======================================================

      const lastLoginMethod =
        getAuthCookie(
          "bizgrow_last_login_method"
        );

      const lastLoginEmail =
        getAuthCookie(
          "bizgrow_last_login_email"
        );

      // ======================================================
      // PREVIOUS LOGIN WAS GOOGLE
      // ======================================================

      if (lastLoginMethod === "google") {
        const referralCode =
          getReferralCookieValue() ||
          getReferralQueryParam();

        if (referralCode) {
          setReferralCookie(
            referralCode
          );
        }

        const origin =
          window.location.origin;

        const { error } =
          await supabase.auth.signInWithOAuth(
            {
              provider: "google",
              options: {
                redirectTo:
                  `${origin}/auth/callback`,
                queryParams: {
                  access_type: "offline",
                  prompt: "select_account",
                },
              },
            }
          );

        if (error) {
          console.error(
            "Google login error:",
            error
          );

          showToast(
            "Unable to start Google login. Please try again.",
            "error"
          );

          setLoading(false);
        }

        // NOTE: agar error nahi aya, browser Google pe redirect
        // ho raha hai, is liye loading true rehna theek hai —
        // page khud navigate away kar jayega.

        return;
      }

      // ======================================================
      // PREVIOUS LOGIN WAS EMAIL
      //
      // IMPORTANT:
      // We only reach here after getSession() confirmed
      // that there is NO active Supabase session.
      // ======================================================

      if (
        lastLoginMethod === "email" &&
        lastLoginEmail
      ) {
        const referralCode =
          getReferralCookieValue() ||
          getReferralQueryParam();

        if (referralCode) {
          setReferralCookie(
            referralCode
          );
        }

        const origin =
          window.location.origin;

        const { error } =
          await supabase.auth.signInWithOtp(
            {
              email: lastLoginEmail,
              options: {
                emailRedirectTo:
                  `${origin}/auth/callback`,
              },
            }
          );

        if (error) {
          console.error(
            "Magic link error:",
            error
          );

          showToast(
            "Unable to send the login link. Please try again.",
            "error"
          );

          setLoading(false);

          return;
        }

        // ====================================================
        // MODERN TOAST
        // NO DEFAULT BROWSER ALERT
        // ====================================================

        showToast(
          `Login link sent to ${lastLoginEmail}. Check your email to continue.`,
          "success"
        );

        setLoading(false);

        return;
      }

      // ======================================================
      // NO REMEMBERED LOGIN
      // ======================================================

      router.push("/referral-program");

      // FIX #3: yahan bhi wahi masla tha jo #2 mein tha.
      setLoading(false);
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      showToast(
        "Something went wrong. Please try again.",
        "error"
      );

      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          backgroundColor: NAVY,
        }}
      >
        {loading
          ? "Please wait..."
          : "Login"}
      </button>

      {/* ======================================================
          MODERN TOAST
      ====================================================== */}

      {toast && (
        <div
          className="fixed bottom-5 right-5 z-[9999] w-[calc(100%-2.5rem)] max-w-sm rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-2xl"
          role="status"
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                toast.type === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {toast.type === "error"
                ? "!"
                : "✓"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800">
                {toast.type === "error"
                  ? "Something went wrong"
                  : "Login link sent"}
              </p>

              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setToast(null)
              }
              className="text-lg leading-none text-slate-400 transition hover:text-slate-700"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================
// GOOGLE LOGIN BUTTON
// ============================================================

export function GoogleLoginButton() {
  const supabase = createClient();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [emailSent, setEmailSent] =
    useState(false);

  const [showEmailLogin, setShowEmailLogin] =
    useState(false);

  // ==========================================================
  // IMPORTANT:
  //
  // Start as TRUE so returning users immediately see
  // the single Login button.
  //
  // After hydration, useEffect checks cookies.
  // If this is a genuinely first-time user, it switches
  // to Google + Email options.
  //
  // This prevents the unwanted:
  // Google button -> Email button -> Login button
  // flash after logout.
  // ==========================================================

  const [rememberedLogin, setRememberedLogin] =
    useState(true);

  // ----------------------------------------------------------
  // CHECK REMEMBERED LOGIN
  // ----------------------------------------------------------

  useEffect(() => {
    const lastLoginMethod =
      getAuthCookie(
        "bizgrow_last_login_method"
      );

    const lastLoginEmail =
      getAuthCookie(
        "bizgrow_last_login_email"
      );

    const hasRememberedLogin =
      lastLoginMethod === "google" ||
      (
        lastLoginMethod === "email" &&
        !!lastLoginEmail
      );

    setRememberedLogin(
      hasRememberedLogin
    );
  }, []);

  // ==========================================================
  // GOOGLE LOGIN
  // ==========================================================

  const handleGoogleLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // Remember Google
      setAuthCookie(
        "bizgrow_last_login_method",
        "google"
      );

      // Preserve referral
      const referralCode =
        getReferralCookieValue() ||
        getReferralQueryParam();

      if (referralCode) {
        setReferralCookie(
          referralCode
        );
      }

      const origin =
        window.location.origin;

      const { error } =
        await supabase.auth.signInWithOAuth(
          {
            provider: "google",
            options: {
              redirectTo:
                `${origin}/auth/callback`,
              queryParams: {
                access_type: "offline",
                prompt: "select_account",
              },
            },
          }
        );

      if (error) {
        console.error(
          "Google login error:",
          error
        );

        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Google login error:",
        error
      );

      setLoading(false);
    }
  };

  // ==========================================================
  // EMAIL LOGIN
  // ==========================================================

  const handleEmailLogin = async (
    event
  ) => {
    event.preventDefault();

    if (
      loading ||
      !email.trim()
    ) {
      return;
    }

    setLoading(true);

    try {
      const cleanEmail =
        email.trim();

      // Remember email login
      setAuthCookie(
        "bizgrow_last_login_method",
        "email"
      );

      setAuthCookie(
        "bizgrow_last_login_email",
        cleanEmail
      );

      // Preserve referral
      const referralCode =
        getReferralCookieValue() ||
        getReferralQueryParam();

      if (referralCode) {
        setReferralCookie(
          referralCode
        );
      }

      const origin =
        window.location.origin;

      const { error } =
        await supabase.auth.signInWithOtp(
          {
            email: cleanEmail,
            options: {
              emailRedirectTo:
                `${origin}/auth/callback`,
              shouldCreateUser: true,
            },
          }
        );

      if (error) {
        console.error(
          "Email login error:",
          error
        );

        setLoading(false);

        return;
      }

      setEmailSent(true);
      setLoading(false);
    } catch (error) {
      console.error(
        "Email login error:",
        error
      );

      setLoading(false);
    }
  };

  // ==========================================================
  // PREVIOUSLY LOGGED-IN USER
  // SHOW ONLY ONE LOGIN BUTTON
  // ==========================================================

  if (rememberedLogin) {
    return <LoginButton />;
  }

  // ==========================================================
  // EMAIL SENT SCREEN
  // ==========================================================

  if (emailSent) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600">
            ✓
          </div>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            Check your email
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            We sent a verification link to{" "}
            <span className="font-semibold text-slate-700">
              {email}
            </span>
            .
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Click the link in your email to
            continue.
          </p>

          <button
            type="button"
            onClick={() => {
              setEmailSent(false);
              setEmail("");
            }}
            className="mt-5 text-sm font-semibold underline"
            style={{
              color: NAVY,
            }}
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // EMAIL LOGIN FORM
  // ==========================================================

  if (showEmailLogin) {
    return (
      <div className="w-full max-w-md">
        <form
          onSubmit={handleEmailLogin}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <h3 className="text-lg font-bold text-slate-900">
            Continue with email
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            We will send you a secure login link.
          </p>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
            required
            className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: NAVY,
            }}
          >
            {loading
              ? "Sending..."
              : "Send Login Link"}
          </button>

          <button
            type="button"
            onClick={() =>
              setShowEmailLogin(false)
            }
            className="mt-3 w-full text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            Back
          </button>
        </form>
      </div>
    );
  }

  // ==========================================================
  // FIRST-TIME USER
  // GOOGLE + EMAIL
  // ==========================================================

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {/* GOOGLE */}

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.92v2.42h3.14c1.84-1.69 2.93-4.18 2.93-7.37Z"
          />

          <path
            fill="#34A853"
            d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.42c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.5A9.75 9.75 0 0 0 12 21.5Z"
          />

          <path
            fill="#FBBC05"
            d="M6.53 13.61A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.3-1.61V7.89H3.29A9.76 9.76 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.11l3.24-2.5Z"
          />

          <path
            fill="#EA4335"
            d="M12 6.36c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.46 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.39l3.24 2.5c.77-2.31 2.93-4.03 5.47-4.03Z"
          />
        </svg>

        {loading
          ? "Connecting..."
          : "Continue with Google"}
      </button>

      {/* OR */}

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* EMAIL */}

      <button
        type="button"
        onClick={() =>
          setShowEmailLogin(true)
        }
        className="w-full rounded-full border px-6 py-3.5 text-sm font-semibold transition bg-slate-50"
        style={{
          borderColor: GOLD,
          color: NAVY,
        }}
      >
        Continue with Email
      </button>
    </div>
  );
}

// ============================================================
// LOGOUT BUTTON
// ============================================================

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] =
    useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // ======================================================
      // REMOVE REFERRAL COOKIE ONLY
      //
      // DO NOT REMOVE:
      // bizgrow_last_login_method
      // bizgrow_last_login_email
      // ======================================================

      document.cookie =
        "bizgrow_referrer=; path=/; max-age=0; SameSite=Lax";

      // ======================================================
      // DESTROY REAL SUPABASE SESSION
      //
      // THIS IS THE ONLY signOut() CALL.
      // ======================================================

      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          "Supabase sign out error:",
          error
        );

        setLoading(false);

        return;
      }

      // ======================================================
      // SIGNOUT COMPLETED
      // NOW GO TO REFERRAL PROGRAM
      //
      // FIX (best solution for the stuck-loading issue):
      // Instead of router.replace() + router.refresh() (which
      // only ask Next.js to navigate/re-render client-side and
      // can leave this component mounted with stale state),
      // we do a full hard redirect. This:
      //   - always leaves this page/component entirely, so
      //     "loading" state can never get stuck
      //   - guarantees a completely fresh page load with no
      //     leftover client-side state (old user data, realtime
      //     subscriptions, cached hooks, etc.)
      //   - matches what signOut() actually did: a real,
      //     full session change, not just a client route change
      //
      // No setLoading(false) needed here — the whole page is
      // about to be replaced anyway.
      // ======================================================

      window.location.href = "/referral-program";
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading
        ? "Signing out..."
        : "Logout"}
    </button>
  );
}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

const NAVY = "#12066a";
const GOLD = "#997819";

// ============================================================
// AUTH MEMORY COOKIES
// IMPORTANT:
// - Never store passwords here.
// - Only remember the login method + email.
// ============================================================

function setAuthCookie(name, value, days = 365) {
  if (typeof document === "undefined") return;

  const maxAge = days * 24 * 60 * 60;

  document.cookie =
    `${name}=${encodeURIComponent(value)}` +
    `; path=/` +
    `; max-age=${maxAge}` +
    `; SameSite=Lax` +
    (window.location.protocol === "https:" ? "; Secure" : "");
}

function getAuthCookie(name) {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) =>
    item.startsWith(`${name}=`)
  );

  if (!cookie) return null;

  try {
    return decodeURIComponent(
      cookie.substring(name.length + 1)
    );
  } catch {
    return cookie.substring(name.length + 1);
  }
}

function deleteAuthCookie(name) {
  if (typeof document === "undefined") return;

  document.cookie =
    `${name}=; path=/; max-age=0; SameSite=Lax`;

  if (window.location.protocol === "https:") {
    document.cookie =
      `${name}=; path=/; max-age=0; SameSite=Lax; Secure`;
  }
}

// ============================================================
// REFERRAL COOKIE HELPERS
// IMPORTANT:
// DO NOT CHANGE THIS LOGIC.
// ============================================================

function getReferralCookieValue() {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) =>
    item.startsWith("bizgrow_referrer=")
  );

  if (!cookie) return null;

  try {
    return decodeURIComponent(
      cookie.substring("bizgrow_referrer=".length)
    );
  } catch {
    return cookie.substring(
      "bizgrow_referrer=".length
    );
  }
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
// PASSWORD FIELD
// ============================================================

function PasswordField({
  value,
  onChange,
  placeholder = "Password",
  autoComplete = "current-password",
  disabled = false,
  required = true,
  minLength = 6,
  name = "password",
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required={required}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50"
      />

      <button
        type="button"
        onClick={() =>
          setShowPassword((current) => !current)
        }
        disabled={disabled}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={
          showPassword
            ? "Hide password"
            : "Show password"
        }
        title={
          showPassword
            ? "Hide password"
            : "Show password"
        }
      >
        {showPassword ? (
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 3l18 18" />
            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
            <path d="M9.88 4.24A9.77 9.77 0 0 1 12 4c5 0 8.73 3.11 10 8a11.74 11.74 0 0 1-2.04 4.02" />
            <path d="M6.61 6.61C4.62 7.88 3.19 9.76 2 12c1.27 4.89 5 8 10 8a9.77 9.77 0 0 0 4.24-.88" />
          </svg>
        ) : (
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ============================================================
// REFERRAL BOX
// ============================================================

export function ReferralBox({
  referralCode,
}) {
  const [copied, setCopied] =
    useState(false);

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
  const [referralCode, setReferralCodeState] =
    useState(null);

  useEffect(() => {
    const queryReferral =
      getReferralQueryParam();

    const cookieReferral =
      getReferralCookieValue();

    const code =
      queryReferral || cookieReferral;

    if (code) {
      setReferralCodeState(code);

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
// IMPORTANT:
// ONE LOGIN BUTTON AFTER LOGOUT.
// Remembers previous login method.
// ============================================================

export function LoginButton() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  const [resetEmail, setResetEmail] =
    useState("");

  const [resetSent, setResetSent] =
    useState(false);

  const [resetLoading, setResetLoading] =
    useState(false);

  const [rememberedMethod, setRememberedMethod] =
    useState(null);

  const [rememberedEmail, setRememberedEmail] =
    useState(null);

  const [authMemoryLoaded, setAuthMemoryLoaded] =
    useState(false);

  useEffect(() => {
    const method =
      getAuthCookie(
        "bizgrow_last_login_method"
      );

    const savedEmail =
      getAuthCookie(
        "bizgrow_last_login_email"
      );

    setRememberedMethod(method);
    setRememberedEmail(savedEmail);

    if (
      method === "email" &&
      savedEmail
    ) {
      setEmail(savedEmail);
    }

    setAuthMemoryLoaded(true);
  }, []);

  // ==========================================================
  // LOGIN
  // ==========================================================

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setErrorMessage("");

    try {
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

      if (session) {
        window.location.href =
          "/referral-program/dashboard";

        return;
      }

      // --------------------------------------------------------
      // GOOGLE
      // --------------------------------------------------------

      if (
        rememberedMethod === "google"
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

          setErrorMessage(
            "Unable to start Google login. Please try again."
          );

          setLoading(false);
        }

        return;
      }

      // --------------------------------------------------------
      // EMAIL
      // --------------------------------------------------------

      if (
        rememberedMethod === "email" &&
        rememberedEmail
      ) {
        setEmail(rememberedEmail);
        setLoading(false);

        return;
      }

      // --------------------------------------------------------
      // UNKNOWN / FIRST LOGIN
      // --------------------------------------------------------

      setLoading(false);

      router.push(
        "/referral-program"
      );
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setErrorMessage(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  // ==========================================================
  // EMAIL PASSWORD LOGIN
  // ==========================================================

  const handlePasswordLogin = async (
    event
  ) => {
    event.preventDefault();

    if (
      loading ||
      !email.trim() ||
      !password
    ) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const cleanEmail =
        email.trim().toLowerCase();

      setAuthCookie(
        "bizgrow_last_login_method",
        "email"
      );

      setAuthCookie(
        "bizgrow_last_login_email",
        cleanEmail
      );

      const {
        data,
        error,
      } =
        await supabase.auth.signInWithPassword(
          {
            email: cleanEmail,
            password,
          }
        );

      if (error) {
        console.error(
          "Email password login error:",
          error
        );

        setErrorMessage(
          error.message ||
            "Invalid email or password."
        );

        setLoading(false);
        return;
      }

      if (!data?.session) {
        setErrorMessage(
          "Login could not be completed. Please try again."
        );

        setLoading(false);
        return;
      }

      setPassword("");

      window.location.href =
        "/referral-program/dashboard";
    } catch (error) {
      console.error(
        "Email password login error:",
        error
      );

      setErrorMessage(
        "Unable to login. Please check your email and password."
      );

      setLoading(false);
    }
  };

  // ==========================================================
  // FORGOT PASSWORD
  // ==========================================================

  const handleForgotPassword = async (
    event
  ) => {
    event.preventDefault();

    if (
      resetLoading ||
      !resetEmail.trim()
    ) {
      return;
    }

    setResetLoading(true);
    setErrorMessage("");

    try {
      const cleanEmail =
        resetEmail.trim().toLowerCase();

      const origin =
        window.location.origin;

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo:
              `${origin}/auth/reset-password`,
          }
        );

      if (error) {
        console.error(
          "Password reset error:",
          error
        );

        setErrorMessage(
          error.message ||
            "Unable to send password reset email."
        );

        setResetLoading(false);
        return;
      }

      setResetSent(true);
      setResetLoading(false);
    } catch (error) {
      console.error(
        "Password reset error:",
        error
      );

      setErrorMessage(
        "Unable to send password reset email."
      );

      setResetLoading(false);
    }
  };

  // ==========================================================
  // WAIT UNTIL COOKIE MEMORY IS LOADED
  // ==========================================================

  if (!authMemoryLoaded) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white opacity-60"
        style={{
          backgroundColor: NAVY,
        }}
      >
        Login
      </button>
    );
  }

  // ==========================================================
  // FORGOT PASSWORD SCREEN
  // ==========================================================

  if (showForgotPassword) {
    return (
      <div className="w-full max-w-md">
        <form
          onSubmit={handleForgotPassword}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <h3 className="text-lg font-bold text-slate-900">
            Reset your password
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            Enter your email and we&apos;ll send
            you a password reset link.
          </p>

          {resetSent ? (
            <>
              <div className="mt-5 rounded-2xl bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-700">
                  Reset email sent
                </p>

                <p className="mt-1 text-xs leading-relaxed text-green-600">
                  Check your email for the password
                  reset link.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSent(false);
                  setResetEmail("");
                  setErrorMessage("");
                }}
                className="mt-5 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to Login
              </button>
            </>
          ) : (
            <>
              <input
                type="email"
                value={resetEmail}
                onChange={(event) =>
                  setResetEmail(
                    event.target.value
                  )
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />

              <button
                type="submit"
                disabled={resetLoading}
                className="mt-4 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor: NAVY,
                }}
              >
                {resetLoading
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setErrorMessage("");
                }}
                className="mt-3 w-full text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                Back
              </button>
            </>
          )}

          {errorMessage && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    );
  }

  // ==========================================================
  // REMEMBERED GOOGLE USER
  // ==========================================================

  if (
    rememberedMethod === "google"
  ) {
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
            ? "Connecting..."
            : "Login"}
        </button>

        {errorMessage && (
          <div className="mt-3 max-w-sm rounded-xl bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600">
            {errorMessage}
          </div>
        )}
      </>
    );
  }

  // ==========================================================
  // REMEMBERED EMAIL USER
  //
  // IMPORTANT:
  // Show ONLY Login button first.
  // Form appears after clicking Login.
  // ==========================================================

  if (
    rememberedMethod === "email" &&
    rememberedEmail
  ) {
    return (
      <div className="w-full max-w-md">
        {!email && setEmail(rememberedEmail)}

        <form
          onSubmit={handlePasswordLogin}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <h3 className="text-lg font-bold text-slate-900">
            Login
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Continue with your email and password.
          </p>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="Email"
            autoComplete="username"
            required
            disabled={loading}
            className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
          />

          <div className="mt-3">
            <PasswordField
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Password"
              autoComplete="current-password"
              disabled={loading}
              minLength={6}
              name="password"
            />
          </div>

          {errorMessage && (
            <div className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading ||
              !email.trim() ||
              !password
            }
            className="mt-4 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: NAVY,
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowForgotPassword(true);
              setResetEmail(email);
              setErrorMessage("");
            }}
            className="mt-4 w-full text-sm font-semibold transition hover:underline"
            style={{
              color: NAVY,
            }}
          >
            Forgot password?
          </button>
        </form>
      </div>
    );
  }

  // ==========================================================
  // FIRST-TIME / UNKNOWN USER
  // ONE BUTTON ONLY
  // ==========================================================

  return (
    <button
      type="button"
      onClick={() =>
        router.push("/referral-program")
      }
      className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      style={{
        backgroundColor: NAVY,
      }}
    >
      Login
    </button>
  );
}

// ============================================================
// GOOGLE LOGIN BUTTON
//
// IMPORTANT NEW BEHAVIOUR:
// This component ALSO remembers the last login method.
//
// Therefore NO PAGE.JSX CHANGE is required if your page
// currently renders <GoogleLoginButton />.
//
// Google remembered:
//     [ Login ]
//
// Email remembered:
//     [ Login ]
//     -> click -> email/password form
//
// Unknown:
//     Google + Continue with Email
// ============================================================

export function GoogleLoginButton({
  text = "Create Your Bizgrow Referral Account",
}) {
  const supabase = createClient();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showEmailLogin, setShowEmailLogin] =
    useState(false);

  const [emailMode, setEmailMode] =
    useState("signup");

  const [errorMessage, setErrorMessage] =
    useState("");

  // ==========================================================
  // REMEMBERED AUTH METHOD
  // ==========================================================

  const [rememberedMethod, setRememberedMethod] =
    useState(null);

  const [rememberedEmail, setRememberedEmail] =
    useState(null);

  const [authMemoryLoaded, setAuthMemoryLoaded] =
    useState(false);

  useEffect(() => {
    const method =
      getAuthCookie(
        "bizgrow_last_login_method"
      );

    const savedEmail =
      getAuthCookie(
        "bizgrow_last_login_email"
      );

    setRememberedMethod(method);
    setRememberedEmail(savedEmail);

    if (
      method === "email" &&
      savedEmail
    ) {
      setEmail(savedEmail);
    }

    setAuthMemoryLoaded(true);
  }, []);

  // ==========================================================
  // GOOGLE LOGIN
  // ==========================================================

  const handleGoogleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const referralCode =
        getReferralCookieValue() ||
        getReferralQueryParam();

      if (referralCode) {
        setReferralCookie(
          referralCode
        );
      }

      // IMPORTANT:
      // Remember Google BEFORE leaving the site.
      // We never store a password.
    

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

        setErrorMessage(
          "Unable to start Google login. Please try again."
        );

        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Google login error:",
        error
      );

      setErrorMessage(
        "Unable to start Google login. Please try again."
      );

      setLoading(false);
    }
  };

  // ==========================================================
  // EMAIL SIGNUP
  // ==========================================================

  const handleEmailSignup = async (
    event
  ) => {
    event.preventDefault();

    if (
      loading ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const cleanEmail =
        email.trim().toLowerCase();

      if (password.length < 6) {
        setErrorMessage(
          "Password must be at least 6 characters."
        );

        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage(
          "Passwords do not match."
        );

        setLoading(false);
        return;
      }

      // Remember METHOD + EMAIL only.
      setAuthCookie(
        "bizgrow_last_login_method",
        "email"
      );

      setAuthCookie(
        "bizgrow_last_login_email",
        cleanEmail
      );

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

      const {
        data,
        error,
      } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo:
              `${origin}/auth/callback`,
          },
        });

      if (error) {
        console.error(
          "Email signup error:",
          error
        );

        deleteAuthCookie(
          "bizgrow_last_login_method"
        );

        deleteAuthCookie(
          "bizgrow_last_login_email"
        );

        setErrorMessage(
          error.message ||
            "Unable to create your account."
        );

        setLoading(false);
        return;
      }

      // ========================================================
      // CONFIRM EMAIL IS OFF
      //
      // Normally Supabase returns a session here.
      // No fake "check your email" screen.
      // ========================================================

      if (!data?.session) {
        setPassword("");
        setConfirmPassword("");

        setErrorMessage(
          "Account created, but Supabase did not return a session. Please try logging in with your email and password."
        );

        setEmailMode("login");
        setShowEmailLogin(true);
        setLoading(false);

        return;
      }

      setPassword("");
      setConfirmPassword("");

      // Existing signup callback flow.
      window.location.href =
        "/auth/callback";
    } catch (error) {
      console.error(
        "Email signup error:",
        error
      );

      setErrorMessage(
        "Something went wrong while creating your account."
      );

      setLoading(false);
    }
  };

  // ==========================================================
  // EMAIL PASSWORD LOGIN
  // ==========================================================

  const handleEmailLogin = async (
    event
  ) => {
    event.preventDefault();

    if (
      loading ||
      !email.trim() ||
      !password
    ) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const cleanEmail =
        email.trim().toLowerCase();

      // Remember METHOD + EMAIL only.
      setAuthCookie(
        "bizgrow_last_login_method",
        "email"
      );

      setAuthCookie(
        "bizgrow_last_login_email",
        cleanEmail
      );

      const {
        data,
        error,
      } =
        await supabase.auth.signInWithPassword(
          {
            email: cleanEmail,
            password,
          }
        );

      if (error) {
        console.error(
          "Email login error:",
          error
        );

        setErrorMessage(
          error.message ||
            "Invalid email or password."
        );

        setLoading(false);
        return;
      }

      if (!data?.session) {
        setErrorMessage(
          "Login could not be completed. Please try again."
        );

        setLoading(false);
        return;
      }

      setPassword("");

      window.location.href =
        "/referral-program/dashboard";
    } catch (error) {
      console.error(
        "Email login error:",
        error
      );

      setErrorMessage(
        "Unable to login. Please check your email and password."
      );

      setLoading(false);
    }
  };

  // ==========================================================
  // WAIT FOR AUTH MEMORY
  // ==========================================================

  if (!authMemoryLoaded) {
    return (
      <button
        type="button"
        disabled
        className="flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white opacity-60"
        style={{
          backgroundColor: NAVY,
        }}
      >
        Login
      </button>
    );
  }

  // ==========================================================
  // REMEMBERED GOOGLE USER
  //
  // ONLY ONE LOGIN BUTTON
  // ==========================================================

  if (
    rememberedMethod === "google"
  ) {
    return (
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundColor: NAVY,
          }}
        >
          {loading
            ? "Connecting..."
            : "Login"}
        </button>

        {errorMessage && (
          <div className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }

  // ==========================================================
  // REMEMBERED EMAIL USER
  //
  // ONLY ONE LOGIN BUTTON FIRST.
  // Clicking it opens the email login form.
  // ==========================================================

  if (
    rememberedMethod === "email" &&
    rememberedEmail &&
    !showEmailLogin
  ) {
    return (
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => {
            setEmail(
              rememberedEmail
            );
            setEmailMode("login");
            setPassword("");
            setConfirmPassword("");
            setErrorMessage("");
            setShowEmailLogin(true);
          }}
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundColor: NAVY,
          }}
        >
          Login
        </button>
      </div>
    );
  }

  // ==========================================================
  // EMAIL FORM
  // ==========================================================

  if (showEmailLogin) {
    const isSignup =
      emailMode === "signup";

    return (
      <div className="w-full max-w-md">
        <form
          onSubmit={
            isSignup
              ? handleEmailSignup
              : handleEmailLogin
          }
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <h3 className="text-lg font-bold text-slate-900">
            {isSignup
              ? "Create Your Account"
              : "Login"}
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            {isSignup
              ? "Enter your email and password to continue."
              : "Enter your email and password to login."}
          </p>

          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="Email"
            autoComplete="username"
            required
            disabled={loading}
            className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
          />

          <div className="mt-3">
            <PasswordField
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Password"
              autoComplete={
                isSignup
                  ? "new-password"
                  : "current-password"
              }
              disabled={loading}
              minLength={6}
              name="password"
            />
          </div>

          {isSignup && (
            <div className="mt-3">
              <PasswordField
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Confirm password"
                autoComplete="new-password"
                disabled={loading}
                minLength={6}
                name="confirm-password"
              />
            </div>
          )}

          {errorMessage && (
            <div className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading ||
              !email.trim() ||
              !password ||
              (isSignup &&
                !confirmPassword)
            }
            className="mt-4 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: NAVY,
            }}
          >
            {loading
              ? isSignup
                ? "Creating account..."
                : "Logging in..."
              : isSignup
                ? "Create Account"
                : "Login"}
          </button>

          {!isSignup && (
            <button
              type="button"
              onClick={() => {
                // Keep remembered email.
                // Only hide the form.
                setShowEmailLogin(false);
                setPassword("");
                setErrorMessage("");
              }}
              className="mt-4 w-full text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              Back
            </button>
          )}

          {!isSignup && (
            <button
              type="button"
              onClick={() => {
                setShowEmailLogin(true);
                setEmailMode("signup");
                setPassword("");
                setConfirmPassword("");
                setErrorMessage("");
              }}
              className="mt-3 w-full text-sm font-semibold hover:underline"
              style={{
                color: NAVY,
              }}
            >
              Create a new account
            </button>
          )}

          {isSignup && (
            <button
              type="button"
              onClick={() => {
                setEmailMode("login");
                setPassword("");
                setConfirmPassword("");
                setErrorMessage("");
              }}
              className="mt-4 w-full text-sm font-semibold hover:underline"
              style={{
                color: NAVY,
              }}
            >
              Already have an account? Login
            </button>
          )}

          {!isSignup && (
            <button
              type="button"
              onClick={() => {
                setEmailMode("signup");
                setShowEmailLogin(false);
                setPassword("");
                setConfirmPassword("");
                setErrorMessage("");
              }}
              className="mt-3 w-full text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              Back to options
            </button>
          )}
        </form>
      </div>
    );
  }

  // ==========================================================
  // INITIAL AUTH OPTIONS
  //
  // Only for users with NO remembered login method.
  // ==========================================================

  return (
   <div className="flex w-full max-w-md flex-col gap-4">

  {/* EMAIL */}
  <button
    type="button"
    onClick={() => {
      setShowEmailLogin(true);
      setEmailMode("signup");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    }}
    className="w-full rounded-full border px-6 py-3.5 text-sm font-semibold transition hover:bg-slate-100"
    style={{
      borderColor: GOLD,
      color: NAVY,
      backgroundColor: "#f8fafc",
    }}
  >
    {text}
  </button>

  {/* OR */}
  <div className="flex items-center gap-3">
    <div className="h-px flex-1 bg-slate-200" />

    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
      OR
    </span>

    <div className="h-px flex-1 bg-slate-200" />
  </div>

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
        d="M12 6.36c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.46 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.39l3.24 2.5 3.24-2.5c.77-2.31 2.93-4.03 5.47-4.03Z"
      />
    </svg>

    {loading
      ? "Connecting..."
      : "Continue with Google"}
  </button>

  {/* ERROR */}
  {errorMessage && (
    <div className="rounded-xl bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-600">
      {errorMessage}
    </div>
  )}

</div>
  );
}

// ============================================================
// LOGOUT BUTTON
// IMPORTANT:
// DO NOT CLEAR AUTH MEMORY COOKIES.
// ============================================================

export function LogoutButton() {
  const supabase = createClient();

  const [loading, setLoading] =
    useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // --------------------------------------------------------
      // Clear referral cookie ONLY.
      //
      // DO NOT clear auth memory cookies.
      // --------------------------------------------------------

      document.cookie =
        "bizgrow_referrer=; path=/; max-age=0; SameSite=Lax";

      if (window.location.protocol === "https:") {
        document.cookie =
          "bizgrow_referrer=; path=/; max-age=0; SameSite=None; Secure";
      }

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

      // Full navigation.
      window.location.href =
        "/referral-program";
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
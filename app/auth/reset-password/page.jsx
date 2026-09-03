"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

const NAVY = "#12066a";
const GOLD = "#997819";

// ============================================================
// PASSWORD FIELD WITH SHOW/HIDE TOGGLE
// ============================================================

function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
  disabled,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#12066a] focus:ring-2 focus:ring-[#12066a]/10 disabled:bg-slate-100"
      />

      <button
        type="button"
        onClick={() =>
          setShowPassword((current) => !current)
        }
        disabled={disabled}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={
          showPassword ? "Hide password" : "Show password"
        }
        title={
          showPassword ? "Hide password" : "Show password"
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

export default function ResetPasswordPage() {
  const router = useRouter();

  const [supabase] =
    useState(() =>
      createClient()
    );

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    sessionReady,
    setSessionReady,
  ] = useState(false);

  // ==========================================================
  // CHECK RECOVERY SESSION
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const checkSession =
      async () => {
        try {
          const {
            data,
            error,
          } =
            await supabase.auth.getSession();

          if (!mounted) {
            return;
          }

          if (error) {
            console.error(
              "Reset session error:",
              error
            );

            setErrorMessage(
              "Unable to verify your password reset session."
            );

            setLoading(false);
            return;
          }

          if (!data?.session) {
            console.error(
              "No password reset session found."
            );

            setErrorMessage(
              "This password reset link is invalid or has expired."
            );

            setLoading(false);
            return;
          }

          console.log(
            "PASSWORD RESET SESSION FOUND:",
            {
              userId:
                data.session.user
                  ?.id,

              email:
                data.session.user
                  ?.email,
            }
          );

          setSessionReady(
            true
          );

          setLoading(false);
        } catch (error) {
          console.error(
            "Reset session check failed:",
            error
          );

          if (mounted) {
            setErrorMessage(
              "This password reset link is invalid or has expired."
            );

            setLoading(false);
          }
        }
      };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  // ==========================================================
  // UPDATE PASSWORD
  // ==========================================================

  const handleUpdatePassword =
    async (event) => {
      event.preventDefault();

      if (updating) {
        return;
      }

      setErrorMessage("");
      setSuccessMessage("");

      // --------------------------------------------------------
      // VALIDATION
      // --------------------------------------------------------

      if (
        !password ||
        !confirmPassword
      ) {
        setErrorMessage(
          "Please enter and confirm your new password."
        );

        return;
      }

      if (
        password.length < 6
      ) {
        setErrorMessage(
          "Password must be at least 6 characters long."
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        setErrorMessage(
          "Passwords do not match."
        );

        return;
      }

      setUpdating(true);

      try {
        // ------------------------------------------------------
        // DOUBLE CHECK SESSION
        // ------------------------------------------------------

        const {
          data: sessionData,
          error:
            sessionError,
        } =
          await supabase.auth.getSession();

        if (
          sessionError ||
          !sessionData?.session
        ) {
          setErrorMessage(
            "Your password reset session has expired. Please request a new reset link."
          );

          setUpdating(false);
          return;
        }

        // ------------------------------------------------------
        // UPDATE PASSWORD
        // ------------------------------------------------------

        const {
          error:
            updateError,
        } =
          await supabase.auth.updateUser(
            {
              password,
            }
          );

        if (updateError) {
          console.error(
            "Password update error:",
            updateError
          );

          setErrorMessage(
            updateError.message ||
              "Unable to update your password."
          );

          setUpdating(false);
          return;
        }

        console.log(
          "PASSWORD UPDATED SUCCESSFULLY"
        );

        setPassword("");
        setConfirmPassword("");

        setSuccessMessage(
          "Your password has been updated successfully."
        );

        setUpdating(false);

        // ------------------------------------------------------
        // SIGN OUT RECOVERY SESSION
        // ------------------------------------------------------

        await supabase.auth.signOut();

        // ------------------------------------------------------
        // REDIRECT TO LOGIN
        // ------------------------------------------------------

        setTimeout(() => {
          router.push(
            "/referral-program"
          );
        }, 2000);
      } catch (error) {
        console.error(
          "Password update failed:",
          error
        );

        setErrorMessage(
          "Unable to update your password. Please try again."
        );

        setUpdating(false);
      }
    };

  // ==========================================================
  // MAIN PAGE
  // ==========================================================

  return (
    <main className="flex min-h-screen mt-10 items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md">

        {loading ? (
          // ================================================
          // LOADING STATE
          // ================================================
          <div className="text-center">
            <div
              className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-200"
              style={{
                borderTopColor: NAVY,
              }}
            />

            <h2
              className="text-xl font-bold"
              style={{ color: NAVY }}
            >
              Verifying Reset Link
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Please wait while we
              verify your password
              reset link.
            </p>
          </div>
        ) : (
          // ================================================
          // MAIN CARD
          // ================================================
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">

            {/* ============================================= */}
            {/* TITLE */}
            {/* ============================================= */}

            <h1
              className="text-center text-2xl font-bold"
              style={{ color: NAVY }}
            >
              Reset Your Password
            </h1>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Enter a new password
              for your BizGrow
              account.
            </p>

            {/* ============================================= */}
            {/* ERROR */}
            {/* ============================================= */}

            {errorMessage && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                {errorMessage}
              </div>
            )}

            {/* ============================================= */}
            {/* SUCCESS */}
            {/* ============================================= */}

            {successMessage && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
                {successMessage}
              </div>
            )}

            {/* ============================================= */}
            {/* PASSWORD FORM */}
            {/* ============================================= */}

            {sessionReady &&
              !successMessage && (
                <form
                  onSubmit={
                    handleUpdatePassword
                  }
                  className="mt-7 space-y-5"
                >

                  {/* ===================================== */}
                  {/* NEW PASSWORD */}
                  {/* ===================================== */}

                  <div>
                    <label
                      htmlFor="new-password"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      New Password
                    </label>

                    <PasswordInput
                      id="new-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      disabled={updating}
                    />
                  </div>

                  {/* ===================================== */}
                  {/* CONFIRM PASSWORD */}
                  {/* ===================================== */}

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Confirm New Password
                    </label>

                    <PasswordInput
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      disabled={updating}
                    />
                  </div>

                  {/* ===================================== */}
                  {/* PASSWORD INFO */}
                  {/* ===================================== */}

                  <p className="text-xs leading-5 text-slate-500">
                    Your password
                    must be at least
                    6 characters long.
                  </p>

                  {/* ===================================== */}
                  {/* UPDATE BUTTON */}
                  {/* ===================================== */}

                  <button
                    type="submit"
                    disabled={updating}
                    className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      backgroundColor: NAVY,
                    }}
                  >
                    {updating
                      ? "Updating Password..."
                      : "Update Password"}
                  </button>
                </form>
              )}

            {/* ============================================= */}
            {/* INVALID / EXPIRED LINK */}
            {/* ============================================= */}

            {!sessionReady &&
              !successMessage && (
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/referral-program"
                    )
                  }
                  className="mt-6 w-full rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-50"
                  style={{
                    borderColor: GOLD,
                    color: NAVY,
                  }}
                >
                  Back to Login
                </button>
              )}

          </div>
        )}

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          If your reset link has
          expired, please request
          a new password reset
          email.
        </p>

      </div>
    </main>
  );
}
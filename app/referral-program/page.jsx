
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import AvatarWithFallback from "../../components/AvatarWithFallback";
import {
  GoogleLoginButton,
  LogoutButton,
  ReferralBox,
} from "../../components/AuthButtons";
import ReferredClientForm from "../../components/ReferredClientForm";
import {
  ShieldCheck,
  Users,
  HardHat,
  Award,
  Construction,
  Dog,
  Building2,
  Lock,
  FileCheck,
  Globe,
  Gift,
} from "lucide-react";

export const dynamic = "force-dynamic";

const NAVY = "#12066a";
const GOLD = "#997819";

function generateReferralCode() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
}

function hasSupabaseError(error) {
  if (!error) return false;

  if (typeof error === "string") {
    return error.trim() !== "";
  }

  if (error instanceof Error) {
    return true;
  }

  const message =
    typeof error.message === "string" ? error.message.trim() : "";

  const code = typeof error.code === "string" ? error.code.trim() : "";

  const details =
    typeof error.details === "string" ? error.details.trim() : "";

  const hint = typeof error.hint === "string" ? error.hint.trim() : "";

  if (message || code || details || hint) {
    return true;
  }

  if (typeof error.status !== "undefined" && error.status !== null) {
    return true;
  }

  if (typeof error.name === "string" && error.name.trim() !== "") {
    return true;
  }

  return Object.getOwnPropertyNames(error).length > 0;
}

function formatSupabaseError(error) {
  if (!error) return null;

  if (error instanceof Error) {
    return {
      message: error.message || null,
      code: error.name || null,
      details: error.stack || null,
      hint: null,
      raw: error,
    };
  }

  const message =
    error.message || error.code || error.details || error.hint || String(error);

  return {
    message: message || null,
    code: error.code || null,
    details: error.details || null,
    hint: error.hint || null,
    raw: error,
  };
}

function safelyDecodeReferralCookie(value) {
  if (!value) return "";

  try {
    return decodeURIComponent(value).trim();
  } catch (error) {
    console.error("REFERRAL COOKIE DECODE ERROR:", error);
    return String(value).trim();
  }
}

async function getReferrerByCode(supabase, referralCode) {
  const normalizedCode = referralCode?.trim();

  if (!normalizedCode) {
    return null;
  }

  console.log("REFERRER LOOKUP START:", normalizedCode);

  const { data, error } = await supabase.rpc("get_referrer_by_code", {
    p_referral_code: normalizedCode,
  });

  if (hasSupabaseError(error)) {
    console.error(
      "REFERRER LOOKUP ERROR:",
      formatSupabaseError(error),
    );

    return null;
  }

  console.log("REFERRER RPC RESULT:", data);

  if (!Array.isArray(data) || !data[0]) {
    console.log("NO REFERRER FOUND FOR CODE:", normalizedCode);
    return null;
  }

  const referrer = data[0];

  console.log("REFERRER FOUND:", referrer);

  return referrer;
}

/*
|--------------------------------------------------------------------------
| ENSURE PROFILE + REFERRAL CODE
|--------------------------------------------------------------------------
|
| NORMAL URL:
|   partner_status = approved
|
| REFERRAL URL:
|   partner_status = pending
|
|--------------------------------------------------------------------------
*/

async function ensureReferralCode(
  supabase,
  user,
  currentCode,
  existingProfile,
  isReferralUser,
) {
  const normalizedCode = currentCode?.trim();

  const full_name =
    existingProfile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    "Partner";

  const avatar_url =
    existingProfile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  const email = existingProfile?.email || user?.email || "";

  /*
   * Existing referral code ko preserve karo.
   */
  const referralCode =
    normalizedCode ||
    existingProfile?.referral_code ||
    generateReferralCode();

  /*
   * IMPORTANT:
   *
   * Referral URL:
   *     pending
   *
   * Normal URL:
   *     approved
   *
   * Referral user ka existing approved status bhi
   * automatically downgrade nahi karenge.
   */
  let partner_status;

  if (isReferralUser) {
    partner_status = existingProfile?.partner_status || "pending";
  } else {
    partner_status = "approved";
  }

  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email,
        full_name,
        avatar_url,
        referral_code: referralCode,
        partner_status,
      },
      {
        onConflict: "id",
      },
    );

  if (hasSupabaseError(upsertError)) {
    console.error(
      "PROFILE UPSERT ERROR:",
      formatSupabaseError(upsertError),
    );
  } else {
    console.log("PROFILE STATUS UPDATED:", {
      userId: user.id,
      referralUser: isReferralUser,
      partner_status,
      referralCode,
    });
  }

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select(
      `
        full_name,
        email,
        avatar_url,
        referral_code,
        company_name,
        contact_number,
        description_type,
        partner_status
      `,
    )
    .eq("id", user.id)
    .maybeSingle();

  if (hasSupabaseError(selectError)) {
    console.error(
      "PROFILE READ AFTER UPSERT ERROR:",
      formatSupabaseError(selectError),
    );

    return {
      full_name,
      email,
      avatar_url,
      referral_code: referralCode,
      company_name: existingProfile?.company_name || "",
      contact_number: existingProfile?.contact_number || "",
      description_type: existingProfile?.description_type || "",
      partner_status,
    };
  }

  return (
    selectData || {
      full_name,
      email,
      avatar_url,
      referral_code: referralCode,
      company_name: existingProfile?.company_name || "",
      contact_number: existingProfile?.contact_number || "",
      description_type: existingProfile?.description_type || "",
      partner_status,
    }
  );
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default async function ReferralPage() {
  const supabase = await createClient();
  const cookieStore = await cookies();

  /*
  |--------------------------------------------------------------------------
  | REFERRAL COOKIE
  |--------------------------------------------------------------------------
  */

  const refCookie = cookieStore.get("bizgrow_referrer");

  const referralCode = safelyDecodeReferralCookie(
    refCookie?.value || "",
  );

  /*
  |--------------------------------------------------------------------------
  | REFERRAL USER OR NORMAL USER
  |--------------------------------------------------------------------------
  */

  const isReferralUser = Boolean(referralCode);

  console.log("==========================================");
  console.log("REFERRAL PAGE");
  console.log("Referral Code:", referralCode || "NONE");
  console.log("Is Referral User:", isReferralUser);
  console.log("==========================================");

  /*
  |--------------------------------------------------------------------------
  | AUTH USER
  |--------------------------------------------------------------------------
  */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  let profile = null;

  let referrerName = "";

  let referral = null;
  let isReferredClient = false;
  let referralStatus = "";

  /*
  |--------------------------------------------------------------------------
  | REFERRER LOOKUP
  |--------------------------------------------------------------------------
  */

  if (referralCode) {
    const referrer = await getReferrerByCode(
      supabase,
      referralCode,
    );

    if (referrer?.full_name) {
      referrerName = referrer.full_name;
    } else if (referrer) {
      referrerName = "Bizgrow Member";
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOGGED-IN USER
  |--------------------------------------------------------------------------
  */

  if (user) {
    /*
    |--------------------------------------------------------------------------
    | CHECK EXISTING REFERRAL RECORD
    |--------------------------------------------------------------------------
    */

    const {
      data: refData,
      error: referralLookupError,
    } = await supabase
      .from("referrals")
      .select("status, referrer_id")
      .eq("referred_user_id", user.id)
      .maybeSingle();

    if (hasSupabaseError(referralLookupError)) {
      console.error(
        "REFERRAL RECORD LOOKUP ERROR:",
        formatSupabaseError(referralLookupError),
      );
    }

    if (refData) {
      referral = refData;

      isReferredClient = true;

      referralStatus = refData.status || "referred";

      /*
      |--------------------------------------------------------------------------
      | FALLBACK REFERRER NAME
      |--------------------------------------------------------------------------
      */

      if (!referrerName && refData.referrer_id) {
        const {
          data: referrerProfile,
          error: referrerProfileError,
        } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", refData.referrer_id)
          .maybeSingle();

        if (hasSupabaseError(referrerProfileError)) {
          console.error(
            "REFERRER PROFILE FALLBACK ERROR:",
            formatSupabaseError(referrerProfileError),
          );
        }

        if (referrerProfile?.full_name) {
          referrerName = referrerProfile.full_name;
        }
      }
    }

    /*
    |--------------------------------------------------------------------------
    | GET CURRENT PROFILE
    |--------------------------------------------------------------------------
    */

    let { data, error } = await supabase
      .from("profiles")
      .select(
        `
          full_name,
          email,
          avatar_url,
          referral_code,
          company_name,
          contact_number,
          description_type,
          partner_status
        `,
      )
      .eq("id", user.id)
      .maybeSingle();

    if (hasSupabaseError(error)) {
      console.error(
        "REFERRAL PROFILE LOOKUP ERROR:",
        formatSupabaseError(error),
      );
    }

    /*
    |--------------------------------------------------------------------------
    | FALLBACK BY EMAIL
    |--------------------------------------------------------------------------
    */

    if (!data && user.email) {
      const byEmail = await supabase
        .from("profiles")
        .select(
          `
            full_name,
            email,
            avatar_url,
            referral_code,
            company_name,
            contact_number,
            description_type,
            partner_status
          `,
        )
        .eq("email", user.email)
        .maybeSingle();

      if (!hasSupabaseError(byEmail.error) && byEmail.data) {
        data = byEmail.data;
      }
    }

    profile = data || null;

    /*
    |--------------------------------------------------------------------------
    | CREATE / UPDATE PROFILE
    |--------------------------------------------------------------------------
    |
    | This is the main status logic.
    |
    | NORMAL:
    |   approved
    |
    | REFERRAL:
    |   pending
    |--------------------------------------------------------------------------
    */

    profile = await ensureReferralCode(
      supabase,
      user,
      profile?.referral_code,
      profile,
      isReferralUser,
    );

    /*
    |--------------------------------------------------------------------------
    | NORMAL USER -> DASHBOARD
    |--------------------------------------------------------------------------
    |
    | Referral users NEVER get redirected from here.
    |--------------------------------------------------------------------------
    */

    if (
      !isReferralUser &&
      profile?.partner_status === "approved"
    ) {
      console.log(
        "NORMAL USER APPROVED -> DASHBOARD:",
        user.email,
      );

      redirect("/referral-program/dashboard");
    }

    /*
    |--------------------------------------------------------------------------
    | REFERRAL USER MUST REMAIN PENDING
    |--------------------------------------------------------------------------
    */

    if (
      isReferralUser &&
      profile?.partner_status === "approved" &&
      !isReferredClient
    ) {
      /*
       * Do not downgrade an already-approved existing partner.
       *
       * This protects existing approved users if they happen
       * to visit a referral link later.
       */
      console.log(
        "EXISTING APPROVED USER ARRIVED THROUGH REFERRAL:",
        user.email,
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | FINAL REFERRER FALLBACK
  |--------------------------------------------------------------------------
  */

  if (referralCode && !referrerName) {
    referrerName = "Bizgrow Member";
  }

  /*
  |--------------------------------------------------------------------------
  | AVATAR
  |--------------------------------------------------------------------------
  */

  const googleAvatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    user?.identities?.[0]?.identity_data?.avatar_url ||
    user?.identities?.[0]?.identity_data?.picture ||
    "";

  const profileAvatarUrl =
    profile?.avatar_url &&
    profile.avatar_url.trim() !== ""
      ? profile.avatar_url
      : "";

  const avatarUrl =
    googleAvatarUrl ||
    profileAvatarUrl ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      profile?.full_name || user?.email || "User",
    )}&backgroundColor=12066a,997819`;

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen mt-10 relative bg-[#fafafc] font-sans selection:bg-[#997819] selection:text-white pb-32">
 {/* LOADING TEXT - shows immediately, hidden once real content paints */}
  <div
    style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafafc",
      zIndex: 9999,
    }}
    id="bizgrow-loading-fallback"
  >
    <p
      style={{
        fontSize: "13px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "#94a3b8",
      }}
    >
      Loading...
    </p>
  </div>

  {/* AUTO-RELOAD SCRIPT */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            var reloadKey = "bizgrow_referral_reload";
            var alreadyReloaded = sessionStorage.getItem(reloadKey);

            if (!alreadyReloaded) {
              setTimeout(function() {
                sessionStorage.setItem(reloadKey, "true");
                window.location.reload();
              }, 2000);
            } else {
              sessionStorage.removeItem(reloadKey);

              // Hide the loading overlay once we know this is
              // the post-reload (real) render.
              var overlay = document.getElementById("bizgrow-loading-fallback");
              if (overlay) overlay.style.display = "none";
            }
          } catch (e) {}
        })();
      `,
    }}
  />


      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-125px] left-[-125px] w-[50%] h-[50%] rounded-full bg-[#12066a]/[0.03] blur-[140px]" />

        <div className="absolute top-[30%] right-[-125px] w-[40%] h-[40%] rounded-full bg-[#997819]/[0.04] blur-[140px]" />

        <div className="absolute bottom-[-5%] left-[20%] w-[45%] h-[45%] rounded-full bg-[#12066a]/[0.02] blur-[140px]" />

      </div>

      <div className="mx-auto w-full max-w-5xl relative z-10 px-4 sm:px-6 lg:px-8 pt-16">

        {/* ============================================================
            APPROVED NORMAL PARTNER
        ============================================================ */}

        {user &&
          !isReferralUser &&
          profile?.partner_status === "approved" &&
          profile?.referral_code && (
            <div className="max-w-3xl mx-auto mb-16 bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-4">

              <div className="text-center space-y-1">

                <h3
                  className="text-xl font-extrabold"
                  style={{
                    color: NAVY,
                  }}
                >
                  Your Unique Referral Link
                </h3>

                <p className="text-xs text-slate-500 font-normal">
                  Share this link directly with colleagues or businesses
                  to begin tracking.
                </p>

              </div>

              <ReferralBox
                referralCode={profile.referral_code}
              />

              <div className="flex justify-center pt-2">
                <div className="w-full max-w-xs">
                  <LogoutButton />
                </div>
              </div>

            </div>
          )}

        {/* ============================================================
            LOGGED-IN REFERRED CLIENT
        ============================================================ */}

        {user &&
          isReferralUser &&
          isReferredClient &&
          referralStatus !== "completed" && (
            <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 shadow-[0_10px_30px_rgba(18,6,106,0.04)] mb-12 space-y-8 max-w-4xl mx-auto">

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-6">

                <div className="flex items-center gap-5 w-full sm:w-auto">

                  <div className="shrink-0 ring-4 ring-[#997819]/10 rounded-full">

                    <AvatarWithFallback
                      src={avatarUrl}
                      name={
                        profile?.full_name ||
                        user?.email ||
                        "User"
                      }
                      email={user?.email}
                      size="w-16 h-16"
                      textSize="text-xl"
                    />

                  </div>

                  <div className="text-left">

                    <h3
                      className="text-xl font-extrabold tracking-tight"
                      style={{
                        color: NAVY,
                      }}
                    >
                      Welcome, {profile?.full_name || "Partner"}!
                    </h3>

                    <span className="mt-1 bg-amber-50 text-[#997819] border border-[#997819]/20 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">

                      <span className="w-1.5 h-1.5 rounded-full bg-[#997819] animate-pulse" />

                      Referred Client

                    </span>

                  </div>

                </div>

                <div className="w-full sm:w-auto justify-end flex shrink-0 [&>button]:px-5 [&>button]:py-3 [&>button]:rounded-xl [&>button]:font-extrabold [&>button]:text-xs [&>button]:uppercase [&>button]:tracking-wider [&>button]:border [&>button]:border-slate-200 [&>button]:bg-white [&>button]:text-slate-700 [&>button]:shadow-sm [&>button]:transition-all hover:[&>button]:bg-slate-50 hover:[&>button]:border-slate-300">

                  <LogoutButton />

                </div>

              </div>

              {profile?.description_type &&
              profile.description_type.startsWith("Referred:") ? (

                <div className="space-y-6 text-center max-w-xl mx-auto py-4">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-[#997819] border border-[#997819]/20 font-bold text-xl">
                    ⌛
                  </div>

                  <div className="space-y-3">

                    <h4
                      className="text-2xl font-black"
                      style={{
                        color: NAVY,
                      }}
                    >
                      Partner Dashboard Pending
                    </h4>

                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      Complete your first eligible service and your
                      Partner Dashboard will become available.
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed px-4">
                      Once your first eligible service (£650+ VAT)
                      is purchased and payment is cleared, your
                      account can be upgraded to an Active Partner.
                    </p>

                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-left text-xs text-slate-600 space-y-2">

                    <p className="font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Inquiry Status:
                    </p>

                    <p>
                      • Selected Service:{" "}
                      <b>
                        {profile.description_type.replace(
                          "Referred: ",
                          "",
                        )}
                      </b>
                    </p>

                    <p>
                      • Status:{" "}
                      <b>
                        Awaiting Service Purchase & Payment Clearance
                      </b>
                    </p>

                  </div>

                </div>

              ) : (

                <div className="space-y-8">

                  <div className="text-center max-w-xl mx-auto space-y-2">

                    <h4
                      className="text-xl font-bold"
                      style={{
                        color: NAVY,
                      }}
                    >
                      Choose Your Service
                    </h4>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed">

                      You were invited by{" "}

                      <span className="font-bold underline">
                        {referrerName || "a Bizgrow Member"}
                      </span>

                      . Select the compliance service you need below
                      and get <b>5% off</b> your first eligible service
                      (£650+ VAT).

                    </p>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1.5">

                      <span className="w-7 h-7 rounded-full bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-xs">
                        1
                      </span>

                      <p className="text-xs font-bold text-slate-800">
                        Select your service
                      </p>

                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Fill in the form below with the service you need.
                      </p>

                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1.5">

                      <span className="w-7 h-7 rounded-full bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-xs">
                        2
                      </span>

                      <p className="text-xs font-bold text-slate-800">
                        Our sales team reaches out
                      </p>

                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        A BizGrow specialist will contact you to complete
                        your service.
                      </p>

                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1.5">

                      <span className="w-7 h-7 rounded-full bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-xs">
                        3
                      </span>

                      <p className="text-xs font-bold text-slate-800">
                        Get your own dashboard
                      </p>

                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Refer others and earn £125 per referral, up to £1,000.
                      </p>

                    </div>

                  </div>

                  <ReferredClientForm
                    referrerName={referrerName}
                    referrerCode={referralCode}
                    prefill={{
                      id: user.id,
                      name: profile?.full_name || "",
                      email: user.email || "",
                      number: profile?.contact_number || "",
                    }}
                  />

                </div>

              )}

            </div>
          )}

        {/* ============================================================
            PUBLIC CONTENT
        ============================================================ */}

        {!user && (
          <div className="space-y-20">

            {referralCode ? (

              <div className="text-center max-w-3xl mx-auto space-y-6">

                <div className="inline-flex items-center gap-2.5 rounded-full pl-3 pr-5 py-2 bg-white border border-[#997819]/30 shadow-sm backdrop-blur-md">

                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#12066a]/10 text-[#12066a]">
                    <Gift className="w-3.5 h-3.5 text-[#997819]" />
                  </span>

                  <span
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{
                      color: NAVY,
                    }}
                  >
                    🎉 Welcome, You&apos;ve Been Invited by{" "}
                    {referrerName || "a Bizgrow Partner"}
                  </span>

                </div>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">

                  <span className="text-[#997819]">
                    Save 5% on Compliance Services
                  </span>

                  <br />

                  <span className="bg-gradient-to-r from-[#12066a] via-[#12066a] to-[#997819] bg-clip-text text-transparent">
                    Choose your service and unlock 5% off.
                  </span>

                </h1>

                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#12066a]/5 border border-[#12066a]/10">

                  <span className="text-sm sm:text-base font-bold text-[#12066a]">
                    5% Off First Service (£650+ VAT).
                  </span>

                </div>

                <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">

                  Select the compliance service you need below and submit
                  your details — our Sales Team will reach out to complete
                  your service and set you up with your own Partner Dashboard.

                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left pt-2">

                  <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 space-y-1.5 shadow-sm">

                    <span className="w-7 h-7 rounded-full bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-xs">
                      1
                    </span>

                    <p className="text-xs font-bold text-slate-800">
                      Choose your service
                    </p>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Fill in the form below with the service you need.
                    </p>

                  </div>

                  <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 space-y-1.5 shadow-sm">

                    <span className="w-7 h-7 rounded-full bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-xs">
                      2
                    </span>

                    <p className="text-xs font-bold text-slate-800">
                      Our sales team reaches out
                    </p>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      A BizGrow specialist will contact you to complete
                      your service.
                    </p>

                  </div>

                  <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 space-y-1.5 shadow-sm">

                    <span className="w-7 h-7 rounded-full bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-xs">
                      3
                    </span>

                    <p className="text-xs font-bold text-slate-800">
                      Get your own dashboard
                    </p>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Refer others and earn £125 per referral, up to £1,000.
                    </p>

                  </div>

                </div>

                <div className="pt-4 max-w-xl mx-auto">

                  <ReferredClientForm
                    referrerName={referrerName}
                    referrerCode={referralCode}
                  />

                </div>

              </div>

            ) : (

              <div className="text-center max-w-3xl mx-auto space-y-6">

                <div className="space-y-6">

                  <div className="inline-flex items-center gap-2.5 rounded-full pl-3 pr-5 py-2 bg-white border border-[#997819]/30 shadow-sm backdrop-blur-md">

                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#12066a]/10 text-[#12066a]">
                      <Gift className="w-3.5 h-3.5 text-[#997819]" />
                    </span>

                    <span
                      className="text-xs font-bold uppercase tracking-[0.2em]"
                      style={{
                        color: NAVY,
                      }}
                    >
                      Bizgrow Partner Network
                    </span>

                  </div>

                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">

                    <span className="text-[#997819]">
                      Join our referral program
                    </span>

                    <br />

                    <span className="bg-gradient-to-r from-[#12066a] via-[#12066a] to-[#997819] bg-clip-text text-transparent">
                      Refer a Business. Earn £125 credit on your Next Service.
                    </span>

                  </h1>

                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#12066a]/5 border border-[#12066a]/10">

                    <span className="text-sm sm:text-base font-bold text-[#12066a]">
                      Your Friend Saves 5%.
                    </span>

                    <span className="text-gray-400">|</span>

                    <span className="text-sm sm:text-base font-bold text-[#997819]">
                      You Earn £125 credit for each referral.
                    </span>

                  </div>

                  <p className="mt-4 text-base sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">

                    Refer another security company or business to BizGrow.
                    When they become a paying client, you earn £125 Credits
                    on your next BizGrow service.

                  </p>

                  {/* REGISTER CTA */}

                  <div className="pt-4 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-8 shadow-[0_15px_40px_rgba(18,6,106,0.06)] space-y-6 text-center">

                    <div className="space-y-2">

                      <h3
                        className="text-2xl font-extrabold tracking-tight"
                        style={{
                          color: NAVY,
                        }}
                      >
                        Ready to Start Referring?
                      </h3>

                      <p className="text-sm text-slate-700 font-normal leading-relaxed px-2">
                        Create your free BizGrow Partner account and get your
                        unique referral link.
                      </p>

                    </div>

                    <div className="flex justify-center w-full">

                      <div className="w-full">
                        <GoogleLoginButton />
                      </div>

                    </div>

                    <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500">

                      <span>Free to join</span>

                      <span className="w-1 h-1 bg-slate-300 rounded-full" />

                      <span>No upfront cost</span>

                      <span className="w-1 h-1 bg-slate-300 rounded-full" />

                      <span>Start referring immediately</span>

                    </div>

                  </div>

                  {/* REWARD STRUCTURE */}

                  <div className="max-w-3xl mx-auto">

                    <div className="relative group bg-white/90 backdrop-blur-2xl border-2 border-[#997819]/40 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(153,120,25,0.08)] text-center space-y-5">

                      <div className="inline-flex items-center gap-2 bg-[#997819]/10 text-[#997819] text-[11px] font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">

                        <Gift className="w-3.5 h-3.5" />

                        The Reward Structure

                      </div>

                      <h3
                        className="text-4xl sm:text-5xl font-black tracking-tight"
                        style={{
                          color: NAVY,
                        }}
                      >
                        £125 Credit{" "}
                        <span className="text-[#997819] font-bold">
                          for Every Successful Referral
                        </span>
                      </h3>

                      <ul className="text-sm sm:text-base text-slate-800 font-medium max-w-md mx-auto space-y-3 list-none text-left">

                        <li className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                          <span>Refer 1 business</span>
                          <span className="font-bold text-[#12066a]">
                            Get £125 off
                          </span>
                        </li>

                        <li className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                          <span>Refer 2 businesses</span>
                          <span className="font-bold text-[#12066a]">
                            Get £250 off
                          </span>
                        </li>

                        <li className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                          <span>Refer 3 businesses</span>
                          <span className="font-bold text-[#12066a]">
                            Get £375 off
                          </span>
                        </li>

                        <li className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                          <span>Refer 4 businesses</span>
                          <span className="font-bold text-[#12066a]">
                            Get £500 off
                          </span>
                        </li>

                        <li className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                          <span>...</span>
                          <span className="font-bold text-[#12066a]">
                            ...
                          </span>
                        </li>

                        <li className="flex items-center justify-between pb-2">
                          <span>Refer 8 businesses</span>
                          <span className="font-bold text-[#12066a]">
                            Get £1000 off
                          </span>
                        </li>

                      </ul>

                      <span className="block mt-4 text-center">

                        Maximum reward:{" "}

                        <strong
                          className="font-bold"
                          style={{
                            color: NAVY,
                          }}
                        >
                          Earn up to £1,000 in BizGrow referral credit during
                          each 12-month referral period.
                        </strong>

                      </span>

                      <div className="flex items-center gap-3 bg-[#12066a] border-l-4 border-[#997819] px-6 py-4 rounded-r-2xl shadow-md my-4">

                        <p className="text-sm sm:text-base text-white font-medium tracking-wide">

                          Referral rewards are subject to{" "}

                          <span className="font-bold text-red-500">
                            Minimum qualifying service value: £650 + VAT
                          </span>{" "}

                          and the Referral Program Terms & Conditions.

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* GOOGLE AUTH */}

                  <div className="pt-4 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-8 shadow-[0_15px_40px_rgba(18,6,106,0.06)] space-y-5 text-center">

                    <div className="space-y-1.5">

                      <h3
                        className="text-xl font-extrabold"
                        style={{
                          color: NAVY,
                        }}
                      >
                        START REFERRING
                      </h3>

                      <p className="text-sm text-slate-800 font-normal leading-relaxed px-2">
                        Sign in with Google to establish your secure partner
                        account instantly. No password required.
                      </p>

                    </div>

                    <div className="pt-3 flex justify-center">

                      <div className="w-full">
                        <GoogleLoginButton />
                      </div>

                    </div>

                  </div>

                  {/* VALUE CARDS */}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">

                    <div className="bg-white/90 border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:border-[#997819]/40 transition-all space-y-2">

                      <div className="w-8 h-8 rounded-xl bg-[#997819]/10 flex items-center justify-center text-[#997819]">
                        <Award className="w-4 h-4" />
                      </div>

                      <div>

                        <div className="text-[11px] font-extrabold uppercase text-[#997819] tracking-wider mb-0.5">
                          Instant Benefit
                        </div>

                        <div
                          className="text-base font-extrabold"
                          style={{
                            color: NAVY,
                          }}
                        >
                          5% FOR YOUR REFERRAL
                        </div>

                      </div>

                      <p className="text-sm text-slate-800 font-normal leading-relaxed">
                        Your referred business receives{" "}
                        <b>5% off their first eligible BizGrow service</b>,
                        subject to a minimum service value of £650 + VAT.
                      </p>

                    </div>

                    <div className="bg-white/90 border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:border-[#997819]/40 transition-all space-y-2">

                      <div className="w-8 h-8 rounded-xl bg-[#12066a]/10 flex items-center justify-center text-[#12066a]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>

                      <div>

                        <div className="text-[11px] font-extrabold uppercase text-[#997819] tracking-wider mb-0.5">
                          You Will Get
                        </div>

                        <div
                          className="text-base font-extrabold"
                          style={{
                            color: NAVY,
                          }}
                        >
                          £125 Credits FOR YOU
                        </div>

                      </div>

                      <p className="text-sm text-slate-800 font-normal leading-relaxed">
                        Earn <b>£125 BizGrow credit</b> every time your
                        referral becomes a qualifying paying client.
                      </p>

                    </div>

                    <div className="bg-white/90 border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:border-[#997819]/40 transition-all space-y-2">

                      <div className="w-8 h-8 rounded-xl bg-[#997819]/10 flex items-center justify-center text-[#997819]">
                        <Gift className="w-4 h-4" />
                      </div>

                      <div>

                        <div className="text-[11px] font-extrabold uppercase text-[#997819] tracking-wider mb-0.5">
                          Maximum Reward
                        </div>

                        <div
                          className="text-base font-extrabold"
                          style={{
                            color: NAVY,
                          }}
                        >
                          UP TO £1,000
                        </div>

                      </div>

                      <p className="text-sm text-slate-800 font-normal leading-relaxed">
                        Earn up to <b>£1,000</b> in referral credit during each
                        12-month referral period.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )}

            {/* ========================================================
                NORMAL PUBLIC PAGE BELOW
            ======================================================== */}

            {!referralCode && (

              <>

                {/* HOW IT WORKS */}

                <div>

                  <div className="text-center max-w-2xl mx-auto mb-12">

                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#997819] bg-[#997819]/10 px-4 py-1.5 rounded-full inline-block mb-4">
                      Simple Process
                    </span>

                    <h2
                      className="text-3xl sm:text-4xl font-black tracking-tight"
                      style={{
                        color: NAVY,
                      }}
                    >
                      How It Works in 4 Simple Steps
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 font-medium mt-3">
                      Start sharing your unique link and earn mutual rewards
                      effortlessly.
                    </p>

                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-8">

                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#12066a]/30 transition-all">

                      <div>

                        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
                          01
                        </span>

                        <h3
                          className="text-lg font-bold"
                          style={{
                            color: NAVY,
                          }}
                        >
                          Get Your Referral Link
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2 leading-relaxed">
                          Access your unique referral link from your BizGrow
                          account.
                        </p>

                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
                        Quick Setup
                      </span>

                    </div>

                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#12066a]/30 transition-all">

                      <div>

                        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
                          02
                        </span>

                        <h3
                          className="text-lg font-bold"
                          style={{
                            color: NAVY,
                          }}
                        >
                          Share With Your Network
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2 leading-relaxed">
                          Send your link to security companies, contractors,
                          business owners or anyone who could benefit from
                          BizGrow.
                        </p>

                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
                        Expand Reach
                      </span>

                    </div>

                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#12066a]/30 transition-all">

                      <div>

                        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
                          03
                        </span>

                        <h3
                          className="text-lg font-bold"
                          style={{
                            color: NAVY,
                          }}
                        >
                          They Join & Become a Client
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-800 font-medium mt-2 leading-relaxed">
                          Your referral registers through your link and
                          completes their consultation and purchase with
                          BizGrow.
                        </p>

                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
                        Verified Conversion
                      </span>

                    </div>

                    <div className="bg-gradient-to-br from-[#12066a]/5 via-white to-white border-2 border-[#12066a]/20 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">

                      <div>

                        <span className="w-10 h-10 rounded-2xl bg-[#12066a] text-white flex items-center justify-center font-black text-lg mb-6">
                          04
                        </span>

                        <h3
                          className="text-lg font-bold"
                          style={{
                            color: NAVY,
                          }}
                        >
                          You Both Get Rewarded
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2 leading-relaxed">

                          They receive{" "}

                          <strong className="text-slate-900 font-semibold">
                            5% off on their first service
                          </strong>{" "}

                          and you earn{" "}

                          <strong className="text-slate-900 font-semibold">
                            £125 Credits on your next service.
                          </strong>

                        </p>

                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
                        Mutual Perks
                      </span>

                    </div>

                  </div>

                </div>

                {/* NO PURCHASE */}

                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-sm text-center max-w-xl mx-auto">

                  <p className="text-xs sm:text-sm text-slate-700 font-medium">

                    <strong className="text-red-600 font-bold">
                      No purchase
                    </strong>{" "}

                    ={" "}

                    <span className="text-slate-900 font-semibold">
                      No referral reward.
                    </span>

                  </p>

                </div>

                {/* SERVICES */}

                <div className="pt-10">

                  <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 px-2">

                    <div>

                      <h3
                        className="text-3xl font-black tracking-tight mt-1"
                        style={{
                          color: NAVY,
                        }}
                      >
                        Eligible BizGrow Services
                      </h3>

                      <p className="text-slate-800 text-sm font-normal mt-1">
                        Your referral rewards can be used toward eligible
                        BizGrow services, including:
                      </p>

                    </div>

                    <div
                      className="text-xs font-extrabold uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-sm"
                      style={{
                        color: GOLD,
                      }}
                    >
                      Bizgrow Holdings Ltd
                    </div>

                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {[
                      {
                        title: "SIA ACS",
                        desc: "Approved Contractor Scheme consultancy for security firms.",
                        icon: ShieldCheck,
                      },
                      {
                        title: "COP 119",
                        desc: "Code of Practice for labour provision in security sectors.",
                        icon: Users,
                      },
                      {
                        title: "Safe Contractor",
                        desc: "Health & Safety accreditation for UK contractors.",
                        icon: HardHat,
                      },
                      {
                        title: "ISO Standards",
                        desc: "ISO 9001, ISO 14001 & ISO 45001.",
                        icon: Award,
                      },
                      {
                        title: "ConstructionLine",
                        desc: "Gold & Silver membership audit support for construction.",
                        icon: Construction,
                      },
                      {
                        title: "NASDU",
                        desc: "National Association of Security Dog Users compliance.",
                        icon: Dog,
                      },
                      {
                        title: "SMAS",
                        desc: "Worksafe accreditation for SSIP H&S compliance.",
                        icon: Building2,
                      },
                      {
                        title: "Cyber Essentials",
                        desc: "Basic protection against common cyber threats.",
                        icon: Lock,
                      },
                      {
                        title: "CHAS Scheme",
                        desc: "Contractors Health and Safety Assessment Scheme.",
                        icon: FileCheck,
                      },
                      {
                        title: "BS Standards",
                        desc: "BS 10800, BS 7858 & BS 7499",
                        icon: Globe,
                      },
                    ].map((item, i) => {

                      const IconComponent = item.icon;

                      return (
                        <div
                          key={i}
                          className="bg-white/60 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 transition-all hover:bg-white hover:border-[#997819]/60 hover:shadow-md group"
                        >

                          <div className="w-10 h-10 rounded-xl bg-[#12066a]/5 flex items-center justify-center mb-4 group-hover:bg-[#12066a]/10 transition-colors text-[#12066a]">

                            <IconComponent className="w-5 h-5 text-[#997819]" />

                          </div>

                          <h4
                            className="text-base font-extrabold mb-1.5"
                            style={{
                              color: NAVY,
                            }}
                          >
                            {item.title}
                          </h4>

                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            {item.desc}
                          </p>

                        </div>
                      );

                    })}

                  </div>

                  <div className="flex items-center gap-3 bg-[#12066a] border-l-4 border-[#997819] px-6 py-4 rounded-r-2xl shadow-md my-4">

                    <p className="text-sm mx-auto sm:text-base text-white font-medium tracking-wide">
                      Referral discounts are subject to eligibility, service
                      terms and reward limits.
                    </p>

                  </div>

                </div>

                {/* LAST CTA */}

                <div className="max-w-xs mx-auto bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-3.5 text-center">

                  <h3
                    className="text-base font-bold"
                    style={{
                      color: NAVY,
                    }}
                  >
                    GET MY REFERRAL LINK
                  </h3>

                  <GoogleLoginButton />

                  <p className="text-[11px] text-slate-600">
                    Free to join • Instant access
                  </p>

                </div>

                {/* FAQ */}

                <div className="max-w-2xl mx-auto space-y-6">

                  <h3
                    className="text-xl font-bold text-center"
                    style={{
                      color: NAVY,
                    }}
                  >
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-4">

                    <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">

                      <h4 className="text-sm font-semibold text-slate-900">
                        How much does my referral receive?
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        Your referred business receives 5% off its first
                        eligible BizGrow service.
                      </p>

                    </div>

                    <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">

                      <h4 className="text-sm font-semibold text-slate-900">
                        How much do I earn?
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        You receive £125 BizGrow Service Credit for each
                        successful qualifying referral.
                      </p>

                    </div>

                    <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">

                      <h4 className="text-sm font-semibold text-slate-900">
                        Is the £125 paid in cash?
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        No. The reward is BizGrow Service Credit toward your
                        next eligible service.
                      </p>

                    </div>

                    <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">

                      <h4 className="text-sm font-semibold text-slate-900">
                        What is the minimum qualifying purchase?
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        The referred business must purchase an eligible service
                        valued at £650 + VAT or more.
                      </p>

                    </div>

                    <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-2">

                      <h4 className="text-sm font-semibold text-slate-900">
                        How long can I earn rewards?
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        You can earn referral credit during your applicable
                        12-month referral period cycle, subject to the programme
                        terms and maximum reward limit.
                      </p>

                    </div>

                  </div>

                </div>

              </>

            )}

          </div>
        )}

      </div>

    </main>
  );
}


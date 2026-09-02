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
  CheckCircle2,
  FormInput,
  PhoneCall,
} from "lucide-react";
import ReferredLandingContent from "@/components/ReferredLandingContent";
import ReferralPageLoader from "@/components/ReferralPageLoader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Referral Program | Earn Rewards with BizGrow Holdings",
  description:
    "Join the BizGrow Holdings Referral Program and earn rewards by referring businesses. Share your referral link, grow your network, and earn up to £1,000 in rewards.",
};

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

  const message = typeof error.message === "string" ? error.message.trim() : "";

  const code = typeof error.code === "string" ? error.code.trim() : "";

  const details = typeof error.details === "string" ? error.details.trim() : "";

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
    console.error("REFERRER LOOKUP ERROR:", formatSupabaseError(error));

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
    normalizedCode || existingProfile?.referral_code || generateReferralCode();

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

  const { error: upsertError } = await supabase.from("profiles").upsert(
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
    console.error("PROFILE UPSERT ERROR:", formatSupabaseError(upsertError));
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

  const referralCode = safelyDecodeReferralCookie(refCookie?.value || "");

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
    const referrer = await getReferrerByCode(supabase, referralCode);

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

    const { data: refData, error: referralLookupError } = await supabase
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
        const { data: referrerProfile, error: referrerProfileError } =
          await supabase
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

    if (!isReferralUser && profile?.partner_status === "approved") {
      console.log("NORMAL USER APPROVED -> DASHBOARD:", user.email);

      redirect("/onboarding");
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
    profile?.avatar_url && profile.avatar_url.trim() !== ""
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
    <main className="min-h-screen relative bg-[#fcfcfd] font-sans selection:bg-[#997819] selection:text-white pb-32 overflow-x-hidden">
      <ReferralPageLoader />

      {/* BACKGROUND */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-140px] left-[-140px] w-[55%] h-[55%] rounded-full bg-[#12066a]/[0.035] blur-[150px]" />

        <div className="absolute top-[25%] right-[-140px] w-[42%] h-[42%] rounded-full bg-[#997819]/[0.045] blur-[150px]" />

        <div className="absolute bottom-[-8%] left-[15%] w-[48%] h-[48%] rounded-full bg-[#12066a]/[0.025] blur-[150px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl relative z-10 px-4 sm:px-6 lg:px-8">
        {/* ============================================================
        APPROVED NORMAL PARTNER
    ============================================================ */}

        {user &&
          !isReferralUser &&
          profile?.partner_status === "approved" &&
          profile?.referral_code && (
            <div className="max-w-3xl mx-auto mb-16 bg-white border border-slate-200/70 rounded-[1.75rem] p-8 sm:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_45px_-28px_rgba(18,6,106,0.28)] space-y-6">
              <div className="text-center space-y-1.5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#997819]/10 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#997819]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#997819]">
                    Partner Account
                  </span>
                </span>

                <h3
                  className="text-2xl font-black tracking-tight"
                  style={{
                    color: NAVY,
                  }}
                >
                  Your Unique Referral Link
                </h3>

                <p className="text-sm text-slate-500 font-normal">
                  Share this link directly with colleagues or businesses to
                  begin tracking.
                </p>
              </div>

              <ReferralBox referralCode={profile.referral_code} />

              <div className="flex justify-center pt-1">
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
            <div className="bg-white border border-slate-200/70 rounded-[1.75rem] p-6 sm:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_55px_-30px_rgba(18,6,106,0.3)] mb-14 space-y-8 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <div className="shrink-0 ring-4 ring-[#997819]/10 rounded-full">
                    <AvatarWithFallback
                      src={avatarUrl}
                      name={profile?.full_name || user?.email || "User"}
                      email={user?.email}
                      size="w-16 h-16"
                      textSize="text-xl"
                    />
                  </div>

                  <div className="text-left">
                    <h3
                      className="text-xl font-black tracking-tight"
                      style={{
                        color: NAVY,
                      }}
                    >
                      Welcome, {profile?.full_name || "Partner"}!
                    </h3>

                    <span className="mt-1.5 bg-amber-50 text-[#997819] border border-[#997819]/20 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#997819] animate-pulse" />
                      Referred Client
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto justify-end flex shrink-0 [&>button]:px-5 [&>button]:py-3 [&>button]:rounded-xl [&>button]:font-black [&>button]:text-xs [&>button]:uppercase [&>button]:tracking-wider [&>button]:border [&>button]:border-slate-200 [&>button]:bg-white [&>button]:text-slate-700 [&>button]:shadow-sm [&>button]:transition-all hover:[&>button]:bg-slate-50 hover:[&>button]:border-slate-300">
                  <LogoutButton />
                </div>
              </div>

              {profile?.description_type &&
              profile.description_type.startsWith("Referred:") ? (
                <div className="space-y-6 text-center max-w-xl mx-auto py-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-[#997819] border border-[#997819]/20 font-bold text-xl">
                    ⌛
                  </div>

                  <div className="space-y-3">
                    <h4
                      className="text-2xl font-black tracking-tight"
                      style={{
                        color: NAVY,
                      }}
                    >
                      Partner Dashboard Pending
                    </h4>

                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Complete your first eligible service and your Partner
                      Dashboard will become available.
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed px-4">
                      Once your first eligible service (£650) is purchased and
                      payment is cleared, your account can be upgraded to an
                      Active Partner.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-left text-xs text-slate-600 space-y-2">
                    <p className="font-black text-slate-700 uppercase tracking-wider mb-1">
                      Inquiry Status
                    </p>

                    <p>
                      Selected Service:{" "}
                      <b className="text-slate-800">
                        {profile.description_type.replace("Referred: ", "")}
                      </b>
                    </p>

                    <p>
                      Status:{" "}
                      <b className="text-slate-800">
                        Awaiting Service Purchase &amp; Payment Clearance
                      </b>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <h4
                      className="text-xl font-black tracking-tight"
                      style={{
                        color: NAVY,
                      }}
                    >
                      Choose Your Service
                    </h4>

                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      You were invited by{" "}
                      <span className="font-bold text-slate-700">
                        {referrerName || "a Bizgrow Member"}
                      </span>
                      . Select the compliance service you need below and get{" "}
                      <b className="text-[#997819]">5% off</b> your first
                      eligible service (£650).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1.5">
                      <span className="w-7 h-7 rounded-full bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-xs">
                        1
                      </span>

                      <p className="text-xs font-black text-slate-800">
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

                      <p className="text-xs font-black text-slate-800">
                        Our team reaches out
                      </p>

                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        A BizGrow specialist will contact you to complete your
                        service.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1.5">
                      <span className="w-7 h-7 rounded-full bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-xs">
                        3
                      </span>

                      <p className="text-xs font-black text-slate-800">
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
          <div className="space-y-24">
            {referralCode ? (
              <ReferredLandingContent 
        referrerName={referrerName} 
        referralCode={referralCode} 
      />
            ) : (
              <div className="space-y-8">
                {/* =====================================================
                DARK HERO — main £125 referral program landing
            ===================================================== */}

                {/* --- 1 HERO: Ultra-Premium with Background Image for Referral Program --- */}
                <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen h-[140vh] flex items-center justify-center px-6 overflow-hidden bg-[#12066a]">
                  {/* --- Background Image Layer --- */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src="/pkg-hero-1.jpg"
                      alt="BizGrow Referral Program"
                      className="w-full h-full object-cover scale-105"
                    />
                    {/* Premium Overlays: Gradient + Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
                  </div>

                  {/* --- Decorative Watermark Text --- */}
                  <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none flex items-center justify-center">
                    <span className="text-[18vw] sm:text-[16vw] font-black uppercase leading-none text-white/[0.06] tracking-tighter select-none whitespace-nowrap">
                      Referral
                    </span>
                  </div>

                  {/* --- Content Layer --- */}
                  <div className="max-w-7xl -mt-10 mx-auto text-center relative z-20">
                    <div className="mb-6 flex items-center justify-center gap-4">
                      <div className="h-[1px] w-12 bg-[#997819]" />
                      <span className="text-[#997819] text-[11px] font-black uppercase tracking-[0.5em] drop-shadow-md">
                        Bizgrow Partner Network
                      </span>
                      <div className="h-[1px] w-12 bg-[#997819]" />
                    </div>

                    <h1 className="text-2xl md:text-5xl max-w-4xl mx-auto font-black uppercase tracking-tighter leading-[1.08] mb-4 text-white">
                      Join our referral program Refer a Business. Earn £125
                      credit on your{" "}
                      <span className="text-[#997819] italic font-serif font-medium drop-shadow-xl ml-2 normal-case">
                        Next Service.
                      </span>
                    </h1>

                    <div className="flex flex-col items-center justify-center gap-8 mt-4">
                      <p className="max-w-xl text-center md:text-left text-sm md:text-base text-gray-300 border-l-0 md:border-l md:border-[#997819] md:pl-6 leading-relaxed font-medium">
                        Refer another security company or business to BizGrow.
                        When they become a paying client, you earn £125 Credits
                        on your next BizGrow service
                      </p>

                      {/* Rewards Highlight Badge */}
                      <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm shadow-xl">
                        <span className="text-sm sm:text-base font-bold text-white">
                          Your Friend Saves 5%
                        </span>
                        <span className="text-white/30">|</span>
                        <span className="text-sm sm:text-base font-bold text-[#c9a44a]">
                          You Earn £125 credit for each successful referral
                        </span>
                      </div>
                      {/* --- Single Compact Button with Subtext Inside --- */}
                      <div className="w-full max-w-sm mx-auto mt-2">
                        <div className="w-auto [&>button]:!w-full [&>button]:!bg-white [&>button]:!text-slate-900 [&>button]:!rounded-2xl [&>button]:!shadow-xl [&>button]:!py-4 [&>button]:!px-6 [&>button]:!flex [&>button]:!flex-col [&>button]:!items-center [&>button]:!justify-center [&>button]:!gap-0.5">
                          <GoogleLoginButton />
                        </div>
                        <p className="text-[11px] text-center text-white/40 mt-2 font-medium">
                          Free to join &bull; No upfront cost
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Decorative Line */}
                </section>
                {/*2 Core Reward Structure Highlight Card */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="relative group bg-[#0c0628] border border-[#997819]/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center space-y-6 overflow-hidden">
                    {/* Subtle Glow */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#997819]/10 rounded-full blur-2xl pointer-events-none"></div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#997819]/15 border border-[#997819]/30 text-[#997819] text-[10px] font-extrabold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full">
                      <Gift className="w-3 h-3 text-[#997819]" /> The Reward
                      Structure
                    </div>

                    {/* Heading - Balanced Font Size */}
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      £125 Credit{" "}
                      <span className="text-[#997819] font-bold">
                        for Every Successful Referral
                      </span>
                    </h3>

                    {/* Tiers List Container - Compact & Clean */}
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
                      <ul className="text-sm text-gray-200 font-medium space-y-3 list-none text-left">
                        <li className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="text-gray-300">
                            Refer 1 business
                          </span>
                          <span className="font-bold text-gray-300 bg-[#997819]/10 px-2.5 py-0.5 rounded-md text-xs">
                            Get £125 off
                          </span>
                        </li>
                        <li className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="text-gray-300">
                            Refer 2 businesses
                          </span>
                          <span className="font-bold text-gray-300 bg-[#997819]/10 px-2.5 py-0.5 rounded-md text-xs">
                            Get £250 off
                          </span>
                        </li>

                        <li className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="text-gray-300">
                            Refer 4 businesses
                          </span>
                          <span className="font-bold text-gray-300 bg-[#997819]/10 px-2.5 py-0.5 rounded-md text-xs">
                            Get £500 off
                          </span>
                        </li>

                        <li className="flex items-center justify-between pt-1">
                          <span className="text-gray-300 font-semibold">
                            Refer 8 businesses
                          </span>
                          <span className="font-bold text-gray-300 bg-[#997819]/20 border border-[#997819]/40 px-2.5 py-0.5 rounded-md text-xs">
                            Get £1000 off
                          </span>
                        </li>
                      </ul>

                      {/* Maximum Reward Text */}
                      <div className="mt-4 pt-3 border-t border-white/10 text-center">
                        <span className="text-xs text-gray-300">
                          Maximum reward:{" "}
                          <strong className="font-bold text-[#997819]">
                            Earn up to £1,000 in credit per 12-month period.
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Notice Banner - Compact */}
                    <div className="bg-[#12066a]/60 border border-[#997819]/30 border-l-4 border-l-[#997819] px-4 py-3 rounded-xl text-left">
                      <p className="text-xs text-gray-200 font-medium leading-relaxed">
                        Referral rewards are subject to{" "}
                        <span className="font-bold text-amber-400">
                          Minimum qualifying service value: £650
                        </span>{" "}
                        and T&Cs.
                      </p>
                    </div>
                    {/* --- Single Compact Button with Subtext Inside --- */}
                    <div className="w-full max-w-sm mx-auto mt-2">
                      <div className="w-full [&>button]:!w-full [&>button]:!bg-white [&>button]:!text-slate-900 [&>button]:!rounded-2xl [&>button]:!shadow-xl [&>button]:!py-4 [&>button]:!px-6 [&>button]:!flex [&>button]:!flex-col [&>button]:!items-center [&>button]:!justify-center [&>button]:!gap-0.5">
                        <GoogleLoginButton text="Start Referring" />
                      </div>
                      <p className="text-[11px] text-center text-white/40 mt-2 font-medium">
                        Free to join &bull; No upfront cost
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
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-black uppercase tracking-widest text-[#997819] bg-[#997819]/10 px-4 py-1.5 rounded-full inline-block mb-4">
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

                    <p className="text-sm sm:text-base text-slate-500 font-medium mt-3">
                      Start sharing your unique link and earn mutual rewards
                      effortlessly.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-8">
                    <div className="bg-white border border-slate-200/70 rounded-[1.5rem] p-6 sm:p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#12066a]/30 hover:shadow-lg transition-all">
                      <div>
                        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
                          01
                        </span>

                        <h3
                          className="text-lg font-black tracking-tight"
                          style={{
                            color: NAVY,
                          }}
                        >
                          Get Your Referral Link
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                          Access your unique referral link from your BizGrow
                          account.
                        </p>
                      </div>

                      <span className="text-[11px] font-black uppercase tracking-wider text-[#997819]">
                        Quick Setup
                      </span>
                    </div>

                    <div className="bg-white border border-slate-200/70 rounded-[1.5rem] p-6 sm:p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#12066a]/30 hover:shadow-lg transition-all">
                      <div>
                        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
                          02
                        </span>

                        <h3
                          className="text-lg font-black tracking-tight"
                          style={{
                            color: NAVY,
                          }}
                        >
                          Share With Your Network
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                          Send your link to security companies, contractors,
                          business owners or anyone who could benefit from
                          BizGrow.
                        </p>
                      </div>

                      <span className="text-[11px] font-black uppercase tracking-wider text-[#997819]">
                        Expand Reach
                      </span>
                    </div>

                    <div className="bg-white border border-slate-200/70 rounded-[1.5rem] p-6 sm:p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#12066a]/30 hover:shadow-lg transition-all">
                      <div>
                        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
                          03
                        </span>

                        <h3
                          className="text-lg font-black tracking-tight"
                          style={{
                            color: NAVY,
                          }}
                        >
                          They Join &amp; Become a Client
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                          Your referral registers through your link and
                          completes their purchase with BizGrow.
                        </p>
                      </div>

                      <span className="text-[11px] font-black uppercase tracking-wider text-[#997819]">
                        Verified Conversion
                      </span>
                    </div>

                    <div className="bg-[#12066a] rounded-[1.5rem] p-6 sm:p-8 shadow-[0_25px_50px_-25px_rgba(18,6,106,0.55)] flex flex-col justify-between space-y-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />

                      <div className="relative z-10">
                        <span className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center font-black text-lg mb-6">
                          04
                        </span>

                        <h3 className="text-lg font-black tracking-tight text-white">
                          You Both Get Rewarded
                        </h3>

                        <p className="text-xs sm:text-sm text-white/75 font-medium mt-2 leading-relaxed">
                          They receive{" "}
                          <strong className="text-white font-bold">
                            5% off on their first service
                          </strong>{" "}
                          and you earn{" "}
                          <strong className="text-white font-bold">
                            £125 Credits on your next service.
                          </strong>
                        </p>
                      </div>

                      <span className="relative z-10 text-[11px] font-black uppercase tracking-wider text-amber-300">
                        Mutual Perks
                      </span>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] text-center max-w-xl mx-auto">
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      <strong className="text-red-600 font-black">
                        No purchase
                      </strong>{" "}
                      ={" "}
                      <span className="text-slate-800 font-bold">
                        No referral reward.
                      </span>
                    </p>
                  </div>
                </div>

                {/* NO PURCHASE */}

                {/* SERVICES */}

                <div className="pt-10">
                  <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 px-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#997819]">
                        Compliance Portfolio
                      </span>

                      <h3
                        className="text-3xl font-black tracking-tight mt-1"
                        style={{
                          color: NAVY,
                        }}
                      >
                        Eligible BizGrow Services
                      </h3>

                      <p className="text-slate-500 text-sm font-normal mt-1">
                        Your referral rewards can be used toward eligible
                        BizGrow services, including:
                      </p>
                    </div>

                    <div
                      className="text-xs font-black uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
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
                          className="bg-white border border-slate-200/70 rounded-2xl p-6 transition-all hover:border-[#997819]/50 hover:shadow-lg hover:-translate-y-0.5 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#12066a]/5 flex items-center justify-center mb-4 group-hover:bg-[#12066a]/10 transition-colors text-[#12066a]">
                            <IconComponent className="w-5 h-5 text-[#997819]" />
                          </div>

                          <h4
                            className="text-base font-black mb-1.5"
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

                  <div
                    className="flex items-center gap-3 bg-[#12066a] px-6 py-4 rounded-2xl shadow-[0_18px_40px_-20px_rgba(18,6,106,0.5)] my-6"
                    style={{ borderLeftWidth: "4px", borderLeftColor: GOLD }}
                  >
                    <p className="text-sm mx-auto sm:text-base text-white font-medium tracking-wide text-center">
                      Referral discounts are subject to eligibility, service
                      terms and reward limits.
                    </p>
                  </div>
                </div>

                {/* --- LAST CTA: Premium Full-Width Banner --- */}
                <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen py-10 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/60 my-6">
                  <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                    <div className="space-y-2">
                      <span className="text-[#997819] text-[11px] font-black uppercase tracking-[0.3em]">
                        Join The Network
                      </span>
                      <h3
                        className="text-3xl md:text-4xl font-black tracking-tight"
                        style={{ color: NAVY }}
                      >
                        Ready to Get Your Referral Link?
                      </h3>
                      <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto font-medium">
                        Start recommending businesses today and earn £125
                        credits on your next service.
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center pt-2">
                      <div className="w-full max-w-sm [&>button]:!w-full [&>button]:!flex [&>button]:!justify-center [&>button]:!py-4 [&>button]:!rounded-2xl [&>button]:!shadow-xl">
                        <GoogleLoginButton text="Get Your Referral Link" />
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-4 tracking-wide">
                        Free to join &bull; Instant access &bull; No upfront
                        cost
                      </p>
                    </div>
                  </div>
                </section>

                {/* FAQ */}

                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#997819]">
                      Got Questions?
                    </span>

                    <h3
                      className="text-xl sm:text-2xl font-black tracking-tight mt-1"
                      style={{
                        color: NAVY,
                      }}
                    >
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] space-y-2">
                      <h4 className="text-sm font-black text-slate-800">
                        How much does my referral receive?
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        Your referred business receives 5% off its first
                        eligible BizGrow service.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] space-y-2">
                      <h4 className="text-sm font-black text-slate-800">
                        How much do I earn?
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        You receive £125 BizGrow Service Credit for each
                        successful qualifying referral.
                      </p>
                    </div>
                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] space-y-2">
                      <h4 className="text-sm font-black text-slate-800">
                        Can I refer more than one business?
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        Yes. You can refer multiple businesses and earn £125
                        BizGrow Referral Credit for each successful qualifying
                        referral, up to the maximum programme reward limit of
                        £1,000 within a 12-month period.
                      </p>
                    </div>
                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] space-y-2">
                      <h4 className="text-sm font-black text-slate-800">
                        Is the £125 paid in cash?
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        No. The reward is BizGrow Service Credit toward your
                        next eligible service.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] space-y-2">
                      <h4 className="text-sm font-black text-slate-800">
                        What is the minimum qualifying purchase?
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        The referred business must purchase an eligible service
                        valued at £650 or more.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] space-y-2">
                      <h4 className="text-sm font-black text-slate-800">
                        How long can I earn rewards?
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed">
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

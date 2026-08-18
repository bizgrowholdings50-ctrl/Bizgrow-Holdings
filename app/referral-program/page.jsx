import crypto from "crypto";
import { cookies } from "next/headers";
import Link from "next/link";
import { createClient } from "../../utils/supabase/server";
import AvatarWithFallback from "../../components/AvatarWithFallback";
import {
  GoogleLoginButton,
  LogoutButton,
  ReferralBox,
} from "../../components/AuthButtons";
import {
  ShieldCheck,
  Users,
  HardHat,
  Award,
  Leaf,
  HeartPulse,
  Construction,
  Dog,
  Building2,
  Lock,
  Fingerprint,
  FileCheck,
  Globe,
  SearchCheck,
  ShieldAlert,
  Share2,
  Headset,
  Gift,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Ultra-Premium Brand Palette
const NAVY = "#12066a";
const GOLD = "#997819";

function generateReferralCode() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
}

function hasSupabaseError(error) {
  if (!error) return false;
  if (typeof error === "string") return error.trim() !== "";
  if (error instanceof Error) return true;

  const message = typeof error.message === "string" ? error.message.trim() : "";
  const code = typeof error.code === "string" ? error.code.trim() : "";
  const details = typeof error.details === "string" ? error.details.trim() : "";
  const hint = typeof error.hint === "string" ? error.hint.trim() : "";

  if (message || code || details || hint) return true;
  if (typeof error.status !== "undefined" && error.status !== null) return true;
  if (typeof error.name === "string" && error.name.trim() !== "") return true;

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

async function ensureReferralCode(
  supabase,
  user,
  currentCode,
  existingProfile,
) {
  const normalizedCode = currentCode?.trim();
  if (normalizedCode) {
    return normalizedCode;
  }

  const referralCode = generateReferralCode();
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

  const { error: upsertError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email,
      full_name,
      avatar_url,
      referral_code: referralCode,
    },
    { onConflict: "id" },
  );

  if (hasSupabaseError(upsertError)) {
    console.error(
      "Unable to ensure referral code during upsert:",
      formatSupabaseError(upsertError),
    );
  }

  const { data: selectData, error: selectError } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", user.id)
    .maybeSingle();

  if (hasSupabaseError(selectError)) {
    console.error(
      "Unable to read referral code after upsert:",
      formatSupabaseError(selectError),
    );
    return referralCode;
  }

  return selectData?.referral_code || referralCode;
}

export default async function ReferralPage() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const refCookie = cookieStore.get("bizgrow_referrer");
  const referralCode = refCookie?.value
    ? decodeURIComponent(refCookie.value).trim()
    : "";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  let profileError = false;
  let referrerName = "";

  if (user) {
    let { data, error } = await supabase
      .from("profiles")
      .select("full_name, email, avatar_url, referral_code")
      .eq("id", user.id)
      .maybeSingle();

    if (hasSupabaseError(error)) {
      console.error(
        "Referral profile lookup failed:",
        formatSupabaseError(error),
      );
    }

    if (!data && user.email) {
      const byEmail = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url, referral_code")
        .eq("email", user.email)
        .maybeSingle();

      if (!hasSupabaseError(byEmail.error) && byEmail.data) {
        data = byEmail.data;
      }
    }

    profile = data || null;

    const ensuredCode = await ensureReferralCode(
      supabase,
      user,
      profile?.referral_code,
      profile,
    );

    if (ensuredCode) {
      profile = {
        full_name:
          profile?.full_name ||
          user?.user_metadata?.full_name ||
          user?.user_metadata?.name ||
          user?.email ||
          "Partner",
        email: profile?.email || user?.email || "",
        avatar_url:
          profile?.avatar_url ||
          user?.user_metadata?.avatar_url ||
          user?.user_metadata?.picture ||
          "",
        referral_code: ensuredCode,
      };
    } else {
      profileError = true;
    }
  } else if (referralCode) {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, referral_code")
      .eq("referral_code", referralCode)
      .maybeSingle();

    if (!error && data?.full_name) {
      referrerName = data.full_name;
    } else if (!error && data?.referral_code) {
      referrerName = "Bizgrow Member";
    }
  }

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

  return (
    <main className="min-h-screen mt-10 relative bg-[#fafafc] font-sans selection:bg-[#997819] selection:text-white pb-32">
      {/* Ultra-Premium Ambient Background Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-£125 Credit.] left-[-£125 Credit.] w-[50%] h-[50%] rounded-full bg-[#12066a]/[0.03] blur-[140px]" />
        <div className="absolute top-[30%] right-[-£125 Credit.] w-[40%] h-[40%] rounded-full bg-[#997819]/[0.04] blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[20%] w-[45%] h-[45%] rounded-full bg-[#12066a]/[0.02] blur-[140px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl relative z-10 px-4 sm:px-6 lg:px-8 pt-16">
        {/* LOGGED-IN PARTNER QUICK-ACCESS BAR */}
        {user && (
          <div className="bg-white/95 backdrop-blur-2xl border border-[#997819]/30 rounded-3xl p-6 sm:px-8 shadow-[0_10px_30px_rgba(18,6,106,0.06)] flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-5 w-full lg:w-auto">
              <div className="shrink-0 ring-4 ring-[#997819]/10 rounded-full">
                <AvatarWithFallback
                  src={avatarUrl}
                  name={profile?.full_name || user?.email || "User"}
                  email={user?.email}
                  size="w-16 h-16"
                  textSize="text-xl"
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3
                    className="text-xl font-extrabold tracking-tight truncate"
                    style={{ color: NAVY }}
                  >
                    Welcome, {profile?.full_name || "Partner"}!
                  </h3>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shrink-0 shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                    Partner
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 truncate">
                  Your partner account is live, secure, and actively tracking.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 w-full lg:w-auto justify-end shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <Link
                href="/referral-program/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white shadow-lg shadow-[#12066a]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: NAVY }}
              >
                Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="[&>button]:inline-flex [&>button]:items-center [&>button]:justify-center [&>button]:px-5 [&>button]:py-3 [&>button]:rounded-xl [&>button]:font-extrabold [&>button]:text-xs [&>button]:uppercase [&>button]:tracking-wider [&>button]:border [&>button]:border-slate-200 [&>button]:bg-white [&>button]:text-slate-700 [&>button]:shadow-sm [&>button]:transition-all hover:[&>button]:bg-slate-50 hover:[&>button]:border-slate-300">
                <LogoutButton />
              </div>
            </div>
          </div>
        )}

        {/* User's Unique Link Box (When Logged In) */}
        {user && profile?.referral_code && (
          <div className="max-w-3xl mx-auto mb-16 bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold" style={{ color: NAVY }}>
                Your Unique Referral Link
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Share this link directly with colleagues or businesses to begin
                tracking.
              </p>
            </div>
            <ReferralBox referralCode={profile.referral_code} />
          </div>
        )}

        {/* GUIDED REFERRAL ONBOARDING CONTENT CONTAINER */}
        <div className="space-y-20">
          {/* Hero Header Section - Hidden when user is logged in */}
          {!user && (
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full pl-3 pr-5 py-2 bg-white border border-[#997819]/30 shadow-sm backdrop-blur-md">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#12066a]/10 text-[#12066a]">
                  <Gift className="w-3.5 h-3.5 text-[#997819]" />
                </span>
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: NAVY }}
                >
                  {referrerName
                    ? `🎉 You've Been Invited by ${referrerName}`
                    : "Bizgrow Partner Network"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight leading-[1.1]">
                <span className="text-[#997819]">
                  Join our referral program
                </span>{" "}
                <br />
                <span className="bg-gradient-to-r from-[#12066a] via-[#12066a] to-[#997819] bg-clip-text text-transparent">
                  and earn elite rewards.
                  <br />
                  Refer a Business. Save on Your Next Service.
                </span>
              </h1>

              {/* Highlighted Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#12066a]/5 border border-[#12066a]/10">
                <span className="text-sm sm:text-base font-bold text-[#12066a]">
                  Give 5% off.
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-sm sm:text-base font-bold text-[#997819]">
                  Earn £125 Credits on each referral.
                </span>
              </div>

              <p className="mt-4 text-base sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
                {referrerName
                  ? `${referrerName} has invited you to join the BizGrow Referral Partner Program. Earn exclusive rewards simply by referring businesses that need compliance, certification, or security consultancy.`
                  : "Refer another security company or business to BizGrow. When they become a paying client, they receive 5% off their first service, and you earn £125 Credits on your next BizGrow service."}
              </p>
              <div className="flex w-md mx-auto items-center gap-3 bg-[#12066a] border-l-4 border-[#997819] px-4 py-4 rounded-r-2xl shadow-md my-4">
                <p className="text-sm sm:text-base text-white font-medium tracking-wide">
                  Earn up to £1,000 in referral credit every 12 months.
                </p>
              </div>

              {/* Core Reward Architecture Highlight Card */}
              <div className="max-w-3xl mx-auto">
                <div className="relative group bg-white/90 backdrop-blur-2xl border-2 border-[#997819]/40 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(153,120,25,0.08)] text-center space-y-5">
                  <div className="inline-flex items-center gap-2 bg-[#997819]/10 text-[#997819] text-[11px] font-extrabold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                    <Gift className="w-3.5 h-3.5" /> The Reward Structure
                  </div>
                  <h3
                    className="text-4xl sm:text-5xl font-black tracking-tight"
                    style={{ color: NAVY }}
                  >
                    £125 Credit{" "}
                    <span className="text-[#997819] font-bold">
                      for Every Successful Referral
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-800 font-medium text-left space-y-2">
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
                          Get £650 off
                        </span>
                      </li>
                      <li className="flex items-center justify-between pb-2">
                        <span>Refer 5 businesses</span>
                        <span className="font-bold text-[#12066a]">
                          Get £625 off
                        </span>
                      </li>
                    </ul>
                    <span className="block mt-4 text-center">
                      Maximum reward:{" "}
                      <strong className="font-bold" style={{ color: NAVY }}>
                        Earn up to £1,000 in BizGrow referral credit during each
                        12-month referral period.
                      </strong>
                    </span>
                  </p>
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

              {/* Pre-login Google Authentication Box */}
              <div className="pt-4 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-8 shadow-[0_15px_40px_rgba(18,6,106,0.06)] space-y-5 text-center">
                <div className="space-y-1.5">
                  <h3
                    className="text-xl font-extrabold"
                    style={{ color: NAVY }}
                  >
                    START REFERRING
                  </h3>
                  <p className="text-sm text-slate-800 font-normal leading-relaxed px-2">
                    Sign in with Google to establish your secure partner account
                    instantly. No password required.
                  </p>
                </div>

                <div className="pt-3 flex justify-center">
                  <div className="w-full">
                    <GoogleLoginButton />
                  </div>
                </div>
              </div>
              {/* Quick Value Cards Grid */}
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
                      style={{ color: NAVY }}
                    >
                      5% FOR YOUR REFERRAL
                    </div>
                  </div>
                  <p className="text-sm text-slate-800 font-normal leading-relaxed">
                    Your referred business receives{" "}
                    <b>5% off their first eligible BizGrow service</b>, subject
                    to a minimum service value of £650 + VAT.
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
                      style={{ color: NAVY }}
                    >
                      £125 Credits FOR YOU
                    </div>
                  </div>
                  <p className="text-sm text-slate-800 font-normal leading-relaxed">
                    Earn <b>£125 BizGrow credit</b> every time your referral
                    becomes a qualifying paying client.
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
                      style={{ color: NAVY }}
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
          )}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#997819] bg-[#997819]/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Simple Process
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black tracking-tight"
              style={{ color: NAVY }}
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
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#12066a]/5 to-transparent rounded-full pointer-events-none -mr-6 -mt-6" />
              <div>
                <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6 group-hover:bg-[#12066a] group-hover:text-white transition-colors">
                  01
                </span>
                <h3 className="text-lg font-bold" style={{ color: NAVY }}>
                  Get Your Referral Link
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2 leading-relaxed">
                  Access your unique referral link from your BizGrow account.
                </p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
                Quick Setup
              </span>
            </div>

            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#12066a]/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#12066a]/5 to-transparent rounded-full pointer-events-none -mr-6 -mt-6" />
              <div>
                <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6 group-hover:bg-[#12066a] group-hover:text-white transition-colors">
                  02
                </span>
                <h3 className="text-lg font-bold" style={{ color: NAVY }}>
                  Share With Your Network
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2 leading-relaxed">
                  Send your link to security companies, contractors, business
                  owners or anyone who could benefit from BizGrow.
                </p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
                Expand Reach
              </span>
            </div>

            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-[#12066a]/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#12066a]/5 to-transparent rounded-full pointer-events-none -mr-6 -mt-6" />
              <div>
                <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6 group-hover:bg-[#12066a] group-hover:text-white transition-colors">
                  03
                </span>
                <h3 className="text-lg font-bold" style={{ color: NAVY }}>
                  They Join & Become a Client
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-medium mt-2 leading-relaxed">
                  Your referral registers through your link and completes their
                  consultation and purchase with BizGrow.
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
                <h3 className="text-lg font-bold" style={{ color: NAVY }}>
                  You Both Get Rewarded
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium  mt-2 leading-relaxed">
                  They receive{" "}
                  <strong className="text-slate-900 font-semibold">
                    5% off their first eligible service
                  </strong>{" "}
                  and you earn{" "}
                  <strong className="text-slate-900 font-semibold">
                    £125 Credits on your next eligible service.
                  </strong>
                </p>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
                Mutual Perks
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-5 shadow-sm text-center max-w-xl mx-auto">
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              <strong className="text-red-600 font-bold">No purchase</strong> ={" "}
              <span className="text-slate-900 font-semibold">
                No referral reward.
              </span>
            </p>
          </div>

          {/* Complete 15 Services Showcase Portfolio */}
          <div className="pt-10">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 px-2">
              <div>
                <h3
                  className="text-3xl font-black tracking-tight mt-1"
                  style={{ color: NAVY }}
                >
                  Eligible BizGrow Services
                </h3>
                <p className="text-slate-800 text-sm font-normal mt-1">
                  Your referral rewards can be used toward eligible BizGrow
                  services, including:
                </p>
              </div>
              <div
                className="text-xs font-extrabold uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-sm"
                style={{ color: GOLD }}
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
                  title: "ISO 9001",
                  desc: "Quality Management Systems for operational excellence.",
                  icon: Award,
                },
                {
                  title: "ISO 14001",
                  desc: "Environmental Management Standards for sustainable growth.",
                  icon: Leaf,
                },
                {
                  title: "ISO 45001",
                  desc: "Occupational Health and Safety management systems.",
                  icon: HeartPulse,
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
                  title: "Cyber Essentials Plus",
                  desc: "Verified technical audit for enhanced cyber security.",
                  icon: Fingerprint,
                },
                {
                  title: "CHAS Scheme",
                  desc: "Contractors Health and Safety Assessment Scheme.",
                  icon: FileCheck,
                },
                {
                  title: "BS 10800",
                  desc: "Standard for the provision of security services.",
                  icon: Globe,
                },
                {
                  title: "BS 7858",
                  desc: "Engineering and screening of personnel in security.",
                  icon: SearchCheck,
                },
                {
                  title: "BS 7499",
                  desc: "Static guarding and mobile patrol services code.",
                  icon: ShieldAlert,
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
                      style={{ color: NAVY }}
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
              <p className="text-sm sm:text-base text-white font-medium tracking-wide">
                Referral discounts are subject to eligibility, service terms and
                reward limits.
              </p>
            </div>
          </div>

          {/* Footer Contact Support Box */}
          <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-3 shadow-sm">
            <h4 className="text-lg font-bold" style={{ color: NAVY }}>
              Have questions about qualification?
            </h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Reach out directly to the compliance team at{" "}
              <strong className="text-slate-700 font-semibold">
                Bizgrow Holdings Ltd
              </strong>
              , CEME Campus, Marsh Way, RM13 8EU.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

import crypto from "crypto";
import { cookies } from "next/headers";
import { createClient } from "../../utils/supabase/server";
import Script from "next/script";
import AvatarWithFallback from "../../components/AvatarWithFallback";
import {
  GoogleLoginButton,
  LogoutButton,
  ReferralBox,
} from "../../components/AuthButtons";
import PartnerMetrics from "../../components/PartnerMetrics";
import ReferralDashboardClient from "../../components/ReferralDashboardClient"; // Clean client wrapper for toggling views

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

  const message = error.message || error.code || error.details || error.hint || String(error);
  return {
    message: message || null,
    code: error.code || null,
    details: error.details || null,
    hint: error.hint || null,
    raw: error,
  };
}

async function ensureReferralCode(supabase, user, currentCode, existingProfile) {
  const normalizedCode = currentCode?.trim();
  if (normalizedCode) {
    return normalizedCode;
  }

  const referralCode = generateReferralCode(10);
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
    { onConflict: "id" }
  );

  if (hasSupabaseError(upsertError)) {
    console.error(
      "Unable to ensure referral code during upsert:",
      formatSupabaseError(upsertError)
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
      formatSupabaseError(selectError)
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
  let directReferrals = [];
  let directReferralCount = 0;
  let partnerNetworkSize = 0;

  if (user) {
    let { data, error } = await supabase
      .from("profiles")
      .select("full_name, email, avatar_url, referral_code")
      .eq("id", user.id)
      .maybeSingle();

    if (hasSupabaseError(error)) {
      console.error("Referral profile lookup failed:", formatSupabaseError(error));
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
      profile
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

    const { data: referralRows, error: referralError } = await supabase
      .from("referrals")
      .select("referred_user_id, created_at")
      .eq("referrer_id", user.id)
      .order("created_at", { ascending: false });

    if (!referralError && referralRows) {
      directReferralCount = referralRows.length;
      partnerNetworkSize = directReferralCount;

      const referredIds = referralRows
        .map((ref) => ref.referred_user_id)
        .filter(Boolean);

      let profileMap = {};
      if (referredIds.length) {
      const { data: referredProfiles, error: referredProfilesError } = await supabase
          .from("profiles")
          .select("id, full_name, email, avatar_url")
          .in("id", referredIds);

        if (referredProfilesError) {
          console.error(
            "Referred profiles lookup failed:",
            formatSupabaseError(referredProfilesError)
          );
        } else if (referredProfiles) {
          profileMap = referredProfiles.reduce((acc, item) => {
            if (item?.id) acc[item.id] = item;
            return acc;
          }, {});
        }
      }

      directReferrals = referralRows.map((ref) => ({
        id: ref.referred_user_id,
        full_name: profileMap[ref.referred_user_id]?.full_name || "",
        email: profileMap[ref.referred_user_id]?.email || "",
        avatar_url: profileMap[ref.referred_user_id]?.avatar_url || "", // <-- Added here
        created_at: ref.created_at,
      }));

      let currentQueue = referredIds.filter(Boolean);
      const visited = new Set(currentQueue);

      while (currentQueue.length) {
        const { data: nextLevel, error: nextError } = await supabase
          .from("referrals")
          .select("referred_user_id")
          .in("referrer_id", currentQueue);

        if (nextError || !nextLevel?.length) break;

        const nextIds = nextLevel
          .map((ref) => ref.referred_user_id)
          .filter((id) => id && !visited.has(id));

        nextIds.forEach((id) => visited.add(id));
        partnerNetworkSize += nextIds.length;
        currentQueue = nextIds;
      }
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
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile?.full_name || user?.email || "User")}&backgroundColor=12066a,997819`;

  return (
    <main className="min-h-screen relative bg-[#fafafc] font-sans selection:bg-[#997819] selection:text-white pb-24">
      {/* Ultra-Premium Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#12066a]/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#997819]/[0.04] blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
        {!user ? (
          // ==========================================================
          // GUEST: ENTERPRISE PARTNER ACQUISITION LANDING
          // ==========================================================
          <div className="space-y-24 mt-10">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full pl-2 pr-4 py-1.5 bg-white border border-slate-200/60 shadow-sm backdrop-blur-md">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#12066a]/10">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: GOLD }}
                  />
                </span>
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: NAVY }}
                >
                  {referrerName
                    ? `Private Invite: ${referrerName}`
                    : "Bizgrow Partner Network"}
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.05] text-[#997819]">
                Join our referral program <br />
                <span className="bg-gradient-to-r from-[#12066a] via-[#12066a] to-[#997819] bg-clip-text text-transparent">
                  and earn rewards!
                </span>
              </h1>

              <p className="text-lg sm:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
               We&apos;ve built our reputation through clients like you, and the best compliment you can give us is an introduction. Refer another security firm or business to BizGrow, and we&apos;ll reward you every time.
              </p>
            </div>

            {/* Split Architecture: Reward & Authentication */}
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              {/* The Value Proposition (Bento Card) */}
              <div className="relative group bg-white/70 backdrop-blur-xl border border-[#997819] rounded-[2rem] p-8 sm:p-12 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(18,6,106,0.1)] hover:bg-white">
                <div className="absolute top-0 right-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                      The Reward Architecture
                    </p>
                    <h3
                      className="text-4xl sm:text-5xl font-black tracking-tight"
                      style={{ color: NAVY }}
                    >
                      15% Off. <br />
                      <span className="text-[#997819] font-light">
                        Every single time.
                      </span>
                    </h3>
                    <p className="text-base text-slate-900 max-w-sm mt-4 font-light leading-relaxed">
                      Enjoy a 15% discount on your next renewal or any other services. There is no cap on referrals; each successful one earns you an uncapped reward.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secure Access Portal */}
              <div className="bg-white/70 backdrop-blur-xl border border-[#997819] rounded-[2rem] p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={NAVY}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h3
                  className="text-3xl font-bold tracking-tight mb-3"
                  style={{ color: NAVY }}
                >
                  Enter the Portal
                </h3>
                <p className="text-md text-slate-700 mb-8 max-w-xs font-light">
                  Authenticate securely to generate your unique partner link.
                </p>
                <div className="w-full max-w-[280px]">
                  <GoogleLoginButton />
                </div>
              </div>
            </div>

            {/* How It Works Section (3-Step Process) */}
            <div className="space-y-6 pt-4">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-[#997819]">
                  Simple Process
                </span>
                <h3 className="text-3xl font-bold mt-1" style={{ color: NAVY }}>
                  How It Works
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center font-black text-lg text-[#12066a]">
                    01
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: NAVY }}>
                    Share the referral
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    Share your unique referral link with your friends or business.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center font-black text-lg text-[#12066a]">
                    02
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: NAVY }}>
                    We take it from there
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    Our team will reach out, handle the consultation, and guide them through the right compliance path, no effort needed from you.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center font-black text-lg text-[#12066a]">
                    03
                  </div>
                  <h4 className="text-xl font-bold" style={{ color: NAVY }}>
                    You earn your reward
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    Once your referral signs up, you&apos;ll receive your 15% discount reward.
                  </p>
                </div>
              </div>
            </div>

            {/* Applicable Services Showcase */}
            <div className="pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 px-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#997819]">
                    Full Portfolio
                  </span>
                  <h3
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: NAVY }}
                  >
                    Our Services
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Your 15% reward applies to all our security and compliance solutions.
                  </p>
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: GOLD }}
                >
                  Bizgrow Holdings Ltd
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "SIA ACS", desc: "Approved Contractor Scheme consultancy for security firms." },
                  { title: "COP 119", desc: "Code of Practice for labour provision in security sectors." },
                  { title: "SafeContractor", desc: "Health & Safety accreditation for UK contractors (SSIP)." },
                  { title: "ISO 9001", desc: "Quality Management Systems for operational excellence." },
                  { title: "ISO 14001", desc: "Environmental Management Standards for sustainable growth." },
                  { title: "ISO 45001", desc: "Occupational Health and Safety management systems." },
                  { title: "Cyber Essentials", desc: "Basic protection against common cyber threats." },
                  { title: "BS 7858", desc: "Vetting and screening of personnel in security." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-transparent border border-slate-200/60 rounded-2xl p-6 transition-all hover:bg-white hover:border-[#997819] hover:shadow-sm group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#12066a]/5 transition-colors">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: GOLD }}
                      />
                    </div>
                    <h4
                      className="text-lg font-bold mb-1"
                      style={{ color: NAVY }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Support Note */}
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-3">
              <h4 className="text-lg font-bold" style={{ color: NAVY }}>
                Not sure if someone qualifies?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Just ask us! Reach out to the team at <strong className="text-slate-700">Bizgrow Holdings Ltd</strong>, CEME Campus, Marsh Way, RM13 8EU.
              </p>
            </div>
          </div>
        ) : (
          // ==========================================================
          // AUTHENTICATED: THE PARTNER DASHBOARD (WITH VIEW TOGGLE)
          // ==========================================================
          <ReferralDashboardClient
            user={user}
            profile={profile}
            profileError={profileError}
            avatarUrl={avatarUrl}
            directReferralCount={directReferralCount}
            partnerNetworkSize={partnerNetworkSize}
            directReferrals={directReferrals}
            NAVY={NAVY}
            GOLD={GOLD}
          >
            {/* Overview View Content */}
            <div className="space-y-16 mt-2">
              <div className="text-center max-w-4xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full pl-2 pr-4 py-1.5 bg-white border border-slate-200/60 shadow-sm backdrop-blur-md">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#12066a]/10">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: GOLD }}
                    />
                  </span>
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.25em]"
                    style={{ color: NAVY }}
                  >
                    Bizgrow Partner Network Overview
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[1.05] text-[#997819]">
                  Join our referral program <br />
                  <span className="bg-gradient-to-r from-[#12066a] via-[#12066a] to-[#997819] bg-clip-text text-transparent">
                    and earn rewards!
                  </span>
                </h1>

                <p className="text-base sm:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                  Hi, we&apos;ve built our reputation through clients like you. Refer another security firm to BizGrow, and we&apos;ll reward you every time.
                </p>
              </div>

              {/* How It Works Section */}
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#997819]">
                    Simple Process
                  </span>
                  <h3 className="text-3xl font-bold mt-1" style={{ color: NAVY }}>
                    How It Works
                  </h3>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center font-black text-lg text-[#12066a]">
                      01
                    </div>
                    <h4 className="text-xl font-bold" style={{ color: NAVY }}>
                      Share the referral
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                      Share your unique referral link with your friends or business.
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center font-black text-lg text-[#12066a]">
                      02
                    </div>
                    <h4 className="text-xl font-bold" style={{ color: NAVY }}>
                      We take it from there
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                      Our team will reach out, handle the consultation, and guide them through the right compliance path, no effort needed from you.
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#12066a]/5 flex items-center justify-center font-black text-lg text-[#12066a]">
                      03
                    </div>
                    <h4 className="text-xl font-bold" style={{ color: NAVY }}>
                      You earn your reward
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                      Once your referral signs up, you&apos;ll receive your 15% discount reward.
                    </p>
                  </div>
                </div>
              </div>

              {/* Applicable Services Showcase */}
              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row justify-between items-end gap-4 px-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#997819]">
                      Ecosystem Coverage
                    </span>
                    <h3 className="text-3xl font-bold mt-1" style={{ color: NAVY }}>
                      Our Core Services
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      Your 15% reward applies seamlessly to every accreditation and standard we offer.
                    </p>
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: GOLD }}
                  >
                    Bizgrow Holdings Ltd
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { title: "SIA ACS", desc: "Approved Contractor Scheme consultancy for security firms." },
                    { title: "COP 119", desc: "Code of Practice for labour provision in security sectors." },
                    { title: "SafeContractor", desc: "Health & Safety accreditation for UK contractors (SSIP)." },
                    { title: "ISO 9001", desc: "Quality Management Systems for operational excellence." },
                    { title: "ISO 14001", desc: "Environmental Management Standards for sustainable growth." },
                    { title: "ISO 45001", desc: "Occupational Health and Safety management systems." },
                    { title: "Cyber Essentials", desc: "Basic protection against common cyber threats." },
                    { title: "BS 7858", desc: "Vetting and screening of personnel in security." },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/80 border border-slate-200/60 rounded-2xl p-6 transition-all hover:border-[#997819] hover:shadow-sm group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#12066a]/5 transition-colors">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: GOLD }}
                        />
                      </div>
                      <h4
                        className="text-base font-bold mb-1"
                        style={{ color: NAVY }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Support Note */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-3">
                <h4 className="text-lg font-bold" style={{ color: NAVY }}>
                  Not sure if someone qualifies?
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-light">
                  Just ask us! Reach out to the team at <strong className="text-slate-700">Bizgrow Holdings Ltd</strong>, CEME Campus, Marsh Way, RM13 8EU.
                </p>
              </div>
            </div>
          </ReferralDashboardClient>
        )}
      </div>
    </main>
  );
}
import { cookies } from "next/headers";
import { createClient } from "../../utils/supabase/server";
import AvatarWithFallback from "../../components/AvatarWithFallback";
import {
  GoogleLoginButton,
  LogoutButton,
  ReferralBox,
} from "../../components/AuthButtons";

// Ultra-Premium Brand Palette
const NAVY = "#12066a";
const GOLD = "#997819";

function generateReferralCode(length = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * characters.length);
    code += characters[index];
  }

  return code;
}

function hasSupabaseError(error) {
  if (!error) return false;
  if (typeof error.message === "string" && error.message.trim() !== "") return true;
  if (typeof error.code === "string" && error.code.trim() !== "") return true;
  if (typeof error.details === "string" && error.details.trim() !== "") return true;
  if (typeof error.hint === "string" && error.hint.trim() !== "") return true;
  return Object.keys(error).length > 0;
}

function formatSupabaseError(error) {
  if (!error) return null;
  return {
    message: error.message || null,
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

  const { data: upsertData, error: upsertError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email,
      full_name,
      avatar_url,
      referral_code: referralCode,
    },
    { onConflict: "id", returning: "representation" }
  );

  if (hasSupabaseError(upsertError)) {
    console.error(
      "Unable to ensure referral code:",
      formatSupabaseError(upsertError)
    );
    return "";
  }

  const insertedReferralCode = Array.isArray(upsertData)
    ? upsertData[0]?.referral_code
    : upsertData?.referral_code;

  if (insertedReferralCode && insertedReferralCode.trim() !== "") {
    return insertedReferralCode;
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
    return "";
  }

  return selectData?.referral_code || "";
}

export default async function ReferralPage() {
  const supabase = await createClient({ serviceRole: true });
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
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, email, avatar_url, referral_code")
      .eq("id", user.id)
      .maybeSingle();

    if (hasSupabaseError(error)) {
      console.error("Referral profile lookup failed:", formatSupabaseError(error));
    }

    profile = data || null;

    const referralCode = await ensureReferralCode(
      supabase,
      user,
      profile?.referral_code,
      profile
    );

    if (referralCode) {
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
        referral_code: referralCode,
      };
    } else {
      profileError = true;
    }

    const { data: referralList, error: referralError } = await supabase
      .from("profiles")
      .select("id, full_name, email, created_at")
      .eq("referred_by", user.id)
      .order("created_at", { ascending: false });

    if (!referralError && referralList) {
      directReferrals = referralList;
      directReferralCount = referralList.length;
      partnerNetworkSize = directReferralCount;

      let currentQueue = referralList.map((ref) => ref.id).filter(Boolean);
      const visited = new Set(currentQueue);

      while (currentQueue.length) {
        const { data: nextLevel, error: nextError } = await supabase
          .from("profiles")
          .select("id")
          .in("referred_by", currentQueue);

        if (nextError || !nextLevel?.length) break;

        const nextIds = nextLevel
          .map((ref) => ref.id)
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
      {/* 
        Ultra-Premium Ambient Background 
        Creates a subtle, glowing, high-end SaaS environment
      */}
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
            {/* Hero Section: Massive, Clean, Authoritative */}
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
                Elevate your network. <br />
                <span className="bg-gradient-to-r from-[#12066a] via-[#12066a] to-[#997819] bg-clip-text text-transparent">
                  Earn premium rewards.
                </span>
              </h1>

              <p className="text-lg sm:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Unlock a lifetime 15% discount across{" "}
                <strong className="font-semibold text-slate-700">
                  all our services
                </strong>
                . Refer industry peers, and we will handle the rest.
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
                    <p className="text-base  text-slate-900 max-w-sm mt-4 font-light leading-relaxed">
                      Whether it&apos;s a new compliance audit, ISO
                      certification, or a recurring renewal your rewards are
                      uncapped and stackable across our entire service
                      portfolio.
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
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
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

            {/* Applicable To All Services - High End Showcase */}
            <div className="pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4 px-2">
                <div>
                  <h3
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: NAVY }}
                  >
                    Comprehensive Coverage
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Your 15% discount applies to any service we offer.
                  </p>
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: GOLD }}
                >
                  Bizgrow Holdings
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "ISO Standards",
                    desc: "Quality, InfoSec, and Environmental Management",
                  },
                  {
                    title: "Industry Compliance",
                    desc: "SIA ACS, COP119, and tailored security codes",
                  },
                  {
                    title: "SSIP & Safety",
                    desc: "SafeContractor, CHAS, and health & safety audits",
                  },
                  {
                    title: "Bespoke Consulting",
                    desc: "Custom operational strategies and renewals",
                  },
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
          </div>
        ) : (
          // ==========================================================
          // AUTHENTICATED: THE PARTNER DASHBOARD
          // ==========================================================
          <div className="max-w-5xl mx-auto space-y-8 pt-8">
            {/* Dashboard Header / Profile */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-[2rem] p-8 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#997819] rounded-full blur-md opacity-20" />
                  <AvatarWithFallback
                    src={avatarUrl}
                    name={profile?.full_name || user?.email || "User"}
                    size={72}
                    borderColor={GOLD}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Partner Dashboard
                  </p>
                  <h2
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                    style={{ color: NAVY }}
                  >
                    {profile?.full_name || "Welcome Back"}
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
                </div>
              </div>

              <div className="md:border-l md:border-slate-200/60 md:pl-8">
                <LogoutButton />
              </div>
            </div>

            {/* Core Action Area */}
            <div className="grid gap-8 md:grid-cols-[1fr_350px]">
              {/* Link Generation Panel */}
              <div className="bg-white border border-slate-200/50 rounded-[2rem] p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#12066a]/[0.02] rounded-full blur-3xl" />

                <div className="relative z-10 space-y-3">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#997819]/10 text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: GOLD }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#997819] animate-pulse" />
                    Link Active
                  </div>
                  <h3
                    className="text-3xl font-black tracking-tight"
                    style={{ color: NAVY }}
                  >
                    Your Referral Asset
                  </h3>
                  <p className="text-base text-slate-700 font-light max-w-md leading-relaxed">
                    Copy and share this highly secure link. Any business that
                    signs up through it will automatically map a 15% discount to
                    your account. Valid across all Bizgrow services.
                  </p>
                </div>

                <div className="relative z-10 pt-4">
                  {profileError ? (
                    <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-2xl">
                      <p className="text-sm text-amber-800 font-bold">
                        Synchronizing...
                      </p>
                      <p className="text-xs text-amber-600 mt-1">
                        We are generating your unique cryptography. Please
                        refresh the page.
                      </p>
                    </div>
                  ) : (
                    <ReferralBox referralCode={profile?.referral_code || "—"} />
                  )}
                </div>
              </div>

              {/* Rules & Metrics Side Panel */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-200/60 rounded-[2rem] p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-500">
                        Partner Network
                      </p>
                      <h4 className="mt-3 text-2xl font-bold" style={{ color: NAVY }}>
                        Direct referrals
                      </h4>
                    </div>
                    <div className="rounded-3xl bg-[#12066a] px-3 py-2 text-sm font-semibold text-white">
                      {directReferralCount}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {directReferrals.length ? (
                      directReferrals.map((ref) => (
                        <div
                          key={ref.id}
                          className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4"
                        >
                          <p className="text-sm font-semibold text-slate-900">
                            {ref.full_name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 break-all">
                            {ref.email}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-3xl border border-slate-200/70 bg-[#f8f7ff] p-5 text-sm text-slate-600">
                        No referrals yet. Share your link to start building your
                        network.
                      </div>
                    )}
                  </div>

                  <div className="mt-6 rounded-3xl border border-slate-200/70 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Network size
                    </p>
                    <p className="mt-2 text-3xl font-bold" style={{ color: NAVY }}>
                      {partnerNetworkSize}
                    </p>
                  </div>
                </div>

                <div className="bg-[#12066a] rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
                  {/* Subtle noise/texture overlay could go here */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                  <div className="relative z-10 space-y-6">
                    <h3 className="text-lg font-bold tracking-tight text-white">
                      The Rulebook
                    </h3>

                    <ul className="space-y-5">
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px]" style={{ color: GOLD }}>
                            1
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Share freely
                          </p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            No cap on how many firms you can invite.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px]" style={{ color: GOLD }}>
                            2
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Universal application
                          </p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            Discount works for ISO, SIA ACS, or any bespoke
                            service.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px]" style={{ color: GOLD }}>
                            3
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Stackable rewards
                          </p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            Multiple successful referrals compound your savings.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center text-[11px] text-slate-400 font-medium px-4">
                  Operated securely by Bizgrow Holdings Ltd.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

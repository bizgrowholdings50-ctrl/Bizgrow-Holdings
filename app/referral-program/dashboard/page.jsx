"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import AvatarWithFallback from "../../../components/AvatarWithFallback";
import { LogoutButton, ReferralBox } from "../../../components/AuthButtons";
import PartnerMetrics from "../../../components/PartnerMetrics";

const NAVY = "#12066a";
const GOLD = "#997819";

export default function DashboardPage() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(false);
  const [directReferrals, setDirectReferrals] = useState([]);
  const [directReferralCount, setDirectReferralCount] = useState(0);
  const [partnerNetworkSize, setPartnerNetworkSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    let channel = null;

    async function loadDashboardData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = "/referrals";
          return;
        }

        setUser(user);

        // 1. Fetch profile
        let { data: profileData, error: profileErr } = await supabase
          .from("profiles")
          .select("full_name, email, avatar_url, referral_code")
          .eq("id", user.id)
          .maybeSingle();

        if (profileErr) setProfileError(true);
        setProfile(profileData);

        let referralRows = [];

        // 2. Try fetching using the RPC function first
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('get_user_referrals', { p_referrer_id: user.id });

        if (!rpcError && rpcData && rpcData.length > 0) {
          referralRows = rpcData;
        } else {
          // Fallback: Direct query with join if RPC fails or returns empty
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("referrals")
            .select(`
              referred_user_id,
              created_at,
              profiles:referred_user_id (
                id,
                full_name,
                email,
                avatar_url
              )
            `)
            .eq("referrer_id", user.id)
            .order("created_at", { ascending: false });

          if (!fallbackError && fallbackData) {
            referralRows = fallbackData.map((item) => ({
              id: item.referred_user_id,
              full_name: item.profiles?.full_name || "Referred User",
              email: item.profiles?.email || "",
              avatar_url: item.profiles?.avatar_url || "",
              created_at: item.created_at,
            }));
          }
        }

        if (referralRows && referralRows.length > 0) {
          setDirectReferralCount(referralRows.length);
          setPartnerNetworkSize(referralRows.length);

          const formattedReferrals = referralRows.map((ref) => ({
            id: ref.id,
            full_name: ref.full_name || "Referred User",
            email: ref.email || "",
            avatar_url: ref.avatar_url || "",
            created_at: ref.created_at,
          }));

          setDirectReferrals(formattedReferrals);
        }

        // --- SUPABASE REALTIME SUBSCRIPTION ---
        channel = supabase
          .channel(`realtime-referrals-${user.id}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "referrals",
              filter: `referrer_id=eq.${user.id}`,
            },
            async (payload) => {
              const newRef = payload.new;

              await new Promise((resolve) => setTimeout(resolve, 500));

              const { data: newProfile } = await supabase
                .from("profiles")
                .select("id, full_name, email, avatar_url")
                .eq("id", newRef.referred_user_id)
                .maybeSingle();

              const formattedNewReferral = {
                id: newRef.referred_user_id,
                full_name: newProfile?.full_name || "Referred User",
                email: newProfile?.email || "",
                avatar_url: newProfile?.avatar_url || "",
                created_at: newRef.created_at,
              };

              setDirectReferrals((prev) => [formattedNewReferral, ...prev]);
              setDirectReferralCount((prev) => prev + 1);
              setPartnerNetworkSize((prev) => prev + 1);
            }
          )
          .subscribe();

      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafc]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#12066a] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    profile?.avatar_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile?.full_name || user?.email || "User")}&backgroundColor=12066a,997819`;

  return (
    <main className="min-h-screen mt-6 relative bg-[#fafafc] font-sans pb-24">
      <div className="mx-auto w-full max-w-6xl relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
        <div className="space-y-12">
          
          {/* Top Navigation & Profile Bar */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative">
                <AvatarWithFallback
                  src={avatarUrl}
                  name={profile?.full_name || user?.email || "User"}
                  email={user?.email}
                  size="w-16 h-16"
                  textSize="text-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold" style={{ color: NAVY }}>
                    {profile?.full_name || "Valued Partner"}
                  </h2>
                  {profileError && (
                    <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                      Syncing Profile...
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  {profile?.email || user?.email}
                </p>
              </div>
            </div>

            {/* View Switcher Tabs & Logout */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200/50">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "dashboard"
                      ? "bg-white text-[#12066a] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "overview"
                      ? "bg-white text-[#12066a] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Overview 
                </button>
              </div>
              <LogoutButton />
            </div>
          </div>

          {/* Conditional Rendering based on selected tab */}
          {activeTab === "dashboard" ? (
            <div className="space-y-12">
              {/* Metrics Overview Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                <PartnerMetrics
                  userId={user?.id}
                  initialDirectCount={directReferralCount}
                  initialNetworkSize={partnerNetworkSize}
                  initialDirectReferrals={directReferrals}
                />
                <div className="bg-white/85 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#997819]">
                        Exclusive Benefit
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#12066a]/5 text-[#12066a] text-[10px] font-extrabold uppercase tracking-wider">
                        Max £1000Cap
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                      £125 Credit Discount
                    </h3>
                    <p className="text-sm text-slate-600 font-light mt-3 leading-relaxed">
                      Earn <strong className="text-slate-900 font-semibold">£125 Credit </strong> on your renewals or compliance services when your referral successfully becomes our client. Accumulate up to a <strong className="text-[#997819] font-bold">maximum £1000 cumulative discount cap</strong>.
                    </p>
                  </div>

                  {/* Comprehensive Services Grid */}
                  <div className="py-3 border-y border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Applicable Across All Services
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-slate-700">
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">SIA ACS</span>
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">COP 119</span>
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">SafeContractor</span>
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">ISO 9001</span>
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">ISO 14001</span>
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">ISO 45001</span>
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">Cyber Essentials</span>
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">BS 7858</span>
                      <span className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">& More Standards</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Applied upon client activation
                    </span>
                    <span className="font-bold text-[#12066a]">Bizgrow Holdings Ltd</span>
                  </div>
                </div>
              </div>

              {/* Referral Link Distribution Box */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4" style={{ color: NAVY }}>
                  Your Unique Referral Link
                </h3>
                <ReferralBox referralCode={profile?.referral_code} />
              </div>

              {/* Direct Referrals Directory */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: NAVY }}>
                      Partner Network Activity
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Peers who joined using your referral link.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {directReferrals.length} Total
                  </span>
                </div>

                {directReferrals.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                    <p className="text-sm text-slate-400 font-light">
                      No direct referrals recorded yet. Share your link to start building your network.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="pb-4 font-semibold">Partner Name</th>
                          <th className="pb-4 font-semibold">Email</th>
                          <th className="pb-4 font-semibold text-right">Joined Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-sm">
                        {directReferrals.map((ref) => (
                          <tr key={ref.id} className="group hover:bg-slate-50/50">
                            <td className="py-4 font-medium text-slate-800 flex items-center gap-3">
                              <AvatarWithFallback
                                src={ref.avatar_url}
                                name={ref.full_name}
                                email={ref.email}
                                size="w-9 h-9"
                                textSize="text-xs"
                              />
                              <span>{ref.full_name}</span>
                            </td>
                            <td className="py-4 text-slate-500 font-light">
                              {ref.email}
                            </td>
                            <td className="py-4 text-right text-slate-400 font-light text-xs">
                              {new Date(ref.created_at).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : (
           <div className="space-y-10">
  <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#12066a]/5 to-transparent rounded-full pointer-events-none -mr-20 -mt-20" />
    <div className="relative z-10 max-w-3xl space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12066a]/5 text-[#12066a] text-[11px] font-extrabold uppercase tracking-wider">
        Program Guidelines & Milestones
      </div>
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: NAVY }}>
        How the Bizgrow Partner Network Works
      </h1>
      <p className="text-base text-slate-600 font-light leading-relaxed">
        Our partner program rewards real business connections transparently. Review the key rules below to maximize your service discounts.
      </p>
    </div>
  </div>

  <div className="grid gap-6 md:grid-cols-2">
    <div className="bg-gradient-to-br from-[#12066a]/5 via-white to-white border-2 border-[#12066a]/20 rounded-3xl p-8 shadow-sm space-y-3">
      <div className="inline-block px-3 py-1 rounded-full bg-[#12066a] text-white text-[10px] font-extrabold uppercase tracking-widest">
        Activation Milestone
      </div>
      <h3 className="text-xl font-bold" style={{ color: NAVY }}>
        Reward Granted Upon Client Conversion
      </h3>
      <p className="text-sm text-slate-600 font-light leading-relaxed">
        Referrals must successfully convert and <strong className="text-slate-900 font-semibold">become our active client</strong> (completing a service or subscription contract) for your £125 Credit discount reward to be unlocked and applied.
      </p>
    </div>

    <div className="bg-gradient-to-br from-[#997819]/10 via-white to-white border-2 border-[#997819]/30 rounded-3xl p-8 shadow-sm space-y-3">
      <div className="inline-block px-3 py-1 rounded-full bg-[#997819] text-white text-[10px] font-extrabold uppercase tracking-widest">
        Maximum Savings Cap
      </div>
      <h3 className="text-xl font-bold" style={{ color: NAVY }}>
        Capped at a Maximum of £1000
      </h3>
      <p className="text-sm text-slate-600 font-light leading-relaxed">
        Each successful referral adds £125 Credit  your services, up to a <strong className="text-[#997819] font-bold">maximum cumulative discount cap of £1000</strong> across your renewals and compliance packages.
      </p>
    </div>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-4">
      <div>
        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
          01
        </span>
        <h3 className="text-lg font-bold" style={{ color: NAVY }}>
          Share Your Link
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 leading-relaxed">
          Copy your unique referral link from your dashboard and introduce it to security firms or corporate partners.
        </p>
      </div>
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
        Instant Tracking
      </span>
    </div>

    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-4">
      <div>
        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
          02
        </span>
        <h3 className="text-lg font-bold" style={{ color: NAVY }}>
          Client Activation
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 leading-relaxed">
          Your referred peer signs up and completes their onboarding to officially become an active Bizgrow client.
        </p>
      </div>
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
        Verified Milestone
      </span>
    </div>

    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-4">
      <div>
        <span className="w-10 h-10 rounded-2xl bg-[#12066a]/10 text-[#12066a] flex items-center justify-center font-black text-lg mb-6">
          03
        </span>
        <h3 className="text-lg font-bold" style={{ color: NAVY }}>
          Unlock Perks
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 leading-relaxed">
          Receive your £125 Credit discount automatically applied to your renewals, up to the maximum £1000threshold limit.
        </p>
      </div>
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
        Auto-Applied
      </span>
    </div>
  </div>

{/* Referral Program Rules Section */}
<div className="bg-gradient-to-b from-white/90 via-white/80 to-slate-50/50 backdrop-blur-2xl border border-slate-200/80 rounded-[2.5rem] p-8 sm:p-14 shadow-2xl shadow-slate-300/40 space-y-10 relative overflow-hidden">
  {/* Premium ambient glows */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#12066a]/10 via-[#997819]/5 to-transparent rounded-full pointer-events-none -mr-20 -mt-20 blur-3xl" />
  <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#997819]/10 via-transparent to-transparent rounded-full pointer-events-none -ml-20 -mb-20 blur-3xl" />

  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 border-b border-slate-200/60 pb-8">
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#997819]/10 border border-[#997819]/20">
        <span className="w-2 h-2 rounded-full bg-[#997819] animate-pulse" />
        <span className="text-[11px] font-black uppercase tracking-widest text-[#997819]">
          Legal Guidelines & Transparency
        </span>
      </div>
      <h3 className="text-2xl sm:text-4xl font-black tracking-tight" style={{ color: NAVY }}>
        Referral Program Rules
      </h3>
      <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl">
        Review our transparent terms and conditions for participating in the BizGrow mutual reward ecosystem.
      </p>
    </div>
    <div className="hidden lg:flex flex-col items-end justify-center text-right">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Effective Terms</span>
      <span className="text-sm font-bold text-slate-700">12 Core Guidelines</span>
    </div>
  </div>

  <div className="grid gap-5 md:grid-cols-2 text-sm text-slate-700 font-medium relative z-10">
    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        01
      </span>
      <p className="leading-relaxed pt-0.5">
        Referral rewards apply only to <strong className="text-slate-900 font-bold">new businesses</strong> that have not previously purchased from BizGrow.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        02
      </span>
      <p className="leading-relaxed pt-0.5">
        The referred business must register using your unique referral link.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        03
      </span>
      <p className="leading-relaxed pt-0.5">
        The referred business must become a <strong className="text-slate-900 font-bold">BizGrow client</strong> and their payment must be received to qualify.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        04
      </span>
      <p className="leading-relaxed pt-0.5">
        The 5% new-client discount applies to the referred client’s <strong className="text-slate-900 font-bold">first eligible purchase/service</strong>.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#997819]/30 group-hover:bg-[#997819] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#997819]/10 text-[#997819] group-hover:bg-[#997819] group-hover:text-white transition-all shadow-sm">
        05
      </span>
      <p className="leading-relaxed pt-0.5">
        The referring client receives <strong className="text-slate-900 font-bold">£125 Credit</strong> for each successful referral.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        06
      </span>
      <p className="leading-relaxed pt-0.5">
        Referral credit is applied to the referring client’s <strong className="text-slate-900 font-bold">next eligible purchase/service</strong>.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#997819]/40 hover:shadow-xl hover:shadow-[#997819]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#997819]/30 group-hover:bg-[#997819] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#997819]/10 text-[#997819] group-hover:bg-[#997819] group-hover:text-white transition-all shadow-sm">
        07
      </span>
      <p className="leading-relaxed pt-0.5">
        Maximum referral reward is <strong className="text-slate-900 font-bold">£1000</strong>, whichever limit is reached first.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        08
      </span>
      <p className="leading-relaxed pt-0.5">
        Maximum of <strong className="text-slate-900 font-bold">5 successful referral rewards</strong> per referral cycle.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        09
      </span>
      <p className="leading-relaxed pt-0.5">
        Referral discounts and credits cannot be exchanged for cash.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        10
      </span>
      <p className="leading-relaxed pt-0.5">
        Discounts cannot be combined with other promotional offers unless BizGrow agrees otherwise.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        11
      </span>
      <p className="leading-relaxed pt-0.5">
        Self-referrals, duplicate registrations and referrals between related entities do not qualify.
      </p>
    </div>

    <div className="flex gap-5 items-start bg-white/80 hover:bg-white hover:border-[#12066a]/40 hover:shadow-xl hover:shadow-[#12066a]/5 transition-all duration-300 p-6 rounded-3xl border border-slate-200/70 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#12066a]/20 group-hover:bg-[#12066a] transition-colors" />
      <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-[#12066a]/10 text-[#12066a] group-hover:bg-[#12066a] group-hover:text-white transition-all shadow-sm">
        12
      </span>
      <p className="leading-relaxed pt-0.5">
        BizGrow reserves the right to reject duplicate, fraudulent or non-compliant referrals.
      </p>
    </div>
  </div>
</div>

  <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
    <h3 className="text-xl font-bold" style={{ color: NAVY }}>
      Frequently Asked Questions
    </h3>
    <div className="grid gap-6 md:grid-cols-2 text-sm">
      <div className="space-y-2">
        <h4 className="font-bold text-slate-800">When exactly is the reward credited?</h4>
        <p className="text-slate-600 font-light leading-relaxed">
          The reward is validated and unlocked as soon as your referred peer officially converts and becomes our active client.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-bold text-slate-800">What is the highest discount I can accumulate?</h4>
        <p className="text-slate-600 font-light leading-relaxed">
          You can continue referring peers to earn £125 Credit increments, subject to a strict maximum cumulative limit of £1000 your service renewals.
        </p>
      </div>
    </div>
  </div>
</div>
          )}

        </div>
      </div>
    </main>
  );
}
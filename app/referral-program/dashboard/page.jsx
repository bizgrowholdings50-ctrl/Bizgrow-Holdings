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
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" or "overview"

  useEffect(() => {
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

        // Fetch profile
        let { data: profileData, error: profileErr } = await supabase
          .from("profiles")
          .select("full_name, email, avatar_url, referral_code")
          .eq("id", user.id)
          .maybeSingle();

        if (profileErr) setProfileError(true);
        setProfile(profileData);

        // Fetch referrals
        const { data: referralRows, error: referralError } = await supabase
          .from("referrals")
          .select("referred_user_id, created_at")
          .eq("referrer_id", user.id)
          .order("created_at", { ascending: false });

        if (!referralError && referralRows) {
          setDirectReferralCount(referralRows.length);
          setPartnerNetworkSize(referralRows.length);

          const referredIds = referralRows.map((ref) => ref.referred_user_id).filter(Boolean);

          let profileMap = {};
          if (referredIds.length) {
            const { data: referredProfiles } = await supabase
              .from("profiles")
              .select("id, full_name, email, avatar_url")
              .in("id", referredIds);

            if (referredProfiles) {
              profileMap = referredProfiles.reduce((acc, item) => {
                if (item?.id) acc[item.id] = item;
                return acc;
              }, {});
            }
          }

          const formattedReferrals = referralRows.map((ref) => ({
            id: ref.referred_user_id,
            full_name: profileMap[ref.referred_user_id]?.full_name || "Referred User",
            email: profileMap[ref.referred_user_id]?.email || "",
            avatar_url: profileMap[ref.referred_user_id]?.avatar_url || "",
            created_at: ref.created_at,
          }));

          setDirectReferrals(formattedReferrals);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
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
                        Max 50% Cap
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                      Lifetime 10% Discount
                    </h3>
                    <p className="text-sm text-slate-600 font-light mt-3 leading-relaxed">
                      Earn <strong className="text-slate-900 font-semibold">15% off</strong> on your renewals or compliance services when your referral successfully becomes our client. Accumulate up to a <strong className="text-[#997819] font-bold">maximum 50% cumulative discount cap</strong>.
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
            /* Refined Overview Tab with Highlighted Key Program Rules */
            <div className="space-y-10">
              
              {/* Header / Intro Card */}
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

              {/* Highlighted Policy Banner Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gradient-to-br from-[#12066a]/5 via-white to-white border-2 border-[#12066a]/20 rounded-3xl p-8 shadow-sm space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#12066a] text-white text-[10px] font-extrabold uppercase tracking-widest">
                    Activation Milestone
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: NAVY }}>
                    Reward Granted Upon Client Conversion
                  </h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Referrals must successfully convert and <strong className="text-slate-900 font-semibold">become our active client</strong> (completing a service or subscription contract) for your 10% discount reward to be unlocked and applied.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#997819]/10 via-white to-white border-2 border-[#997819]/30 rounded-3xl p-8 shadow-sm space-y-3">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#997819] text-white text-[10px] font-extrabold uppercase tracking-widest">
                    Maximum Savings Cap
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: NAVY }}>
                    Capped at a Maximum of 50% Off
                  </h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Each successful referral adds 10% off your services, up to a <strong className="text-[#997819] font-bold">maximum cumulative discount cap of 50%</strong> across your renewals and compliance packages.
                  </p>
                </div>
              </div>

              {/* Step-by-Step Workflow Cards */}
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
                      Receive your 10% discount automatically applied to your renewals, up to the maximum 50% threshold limit.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#997819]">
                    Auto-Applied
                  </span>
                </div>
              </div>

              {/* FAQ / Key Terms Section */}
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
                      You can continue referring peers to earn 10% increments, subject to a strict maximum cumulative limit of 50% off your service renewals.
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
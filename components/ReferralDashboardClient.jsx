"use client";

import { useState } from "react";
import AvatarWithFallback from "./AvatarWithFallback";
import { LogoutButton, ReferralBox } from "./AuthButtons";
import PartnerMetrics from "./PartnerMetrics";

export default function ReferralDashboardClient({
  user,
  profile,
  profileError,
  avatarUrl,
  directReferralCount,
  partnerNetworkSize,
  directReferrals,
  NAVY,
  GOLD,
  children,
}) {
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" or "overview"

  return (
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
                    Tier-1 Perk
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
                  Lifetime 15% Discount
                </h3>
                <p className="text-sm text-slate-600 font-light mt-3 leading-relaxed">
                  Enjoy a 15% discount on your next renewal or any of our compliance, security, and accreditation services. There is no cap on referrals; each successful one earns you an uncapped reward.
                </p>
              </div>

              {/* Comprehensive Services Grid from Template */}
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
                  Auto-applied on renewals
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
                  No direct referrals recorded yet. Share your link to start
                  building your network.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-4 font-semibold">Partner Name</th>
                      <th className="pb-4 font-semibold">Email</th>
                      <th className="pb-4 font-semibold text-right">
                        Joined Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {directReferrals.map((ref) => {
                      // Fallback logic to grab avatar if nested or direct
                      const referralAvatar = ref.avatar_url || ref.profiles?.avatar_url || "";
                      const referralName = ref.full_name || ref.profiles?.full_name || "Anonymous Partner";
                      const referralEmail = ref.email || ref.profiles?.email || "Hidden";

                      return (
                        <tr key={ref.id} className="group hover:bg-slate-50/50">
                          <td className="py-4 font-medium text-slate-800 flex items-center gap-3">
                            <AvatarWithFallback
                              src={referralAvatar}
                              name={referralName}
                              email={referralEmail}
                              size="w-9 h-9"
                              textSize="text-xs"
                            />
                            <span>{referralName}</span>
                          </td>
                          <td className="py-4 text-slate-500 font-light">
                            {referralEmail}
                          </td>
                          <td className="py-4 text-right text-slate-400 font-light text-xs">
                            {new Date(ref.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-sm">
          {children}
        </div>
      )}
    </div>
  );
}
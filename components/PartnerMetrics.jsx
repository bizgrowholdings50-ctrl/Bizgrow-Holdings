"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

export default function PartnerMetrics({
  userId,
  initialDirectCount = 0,
  initialNetworkSize = 0,
  initialDirectReferrals = [],
}) {
  const supabase = createClient();
  const [directCount, setDirectCount] = useState(initialDirectCount);
  const [networkSize, setNetworkSize] = useState(initialNetworkSize);
  const [directReferrals, setDirectReferrals] = useState(
    initialDirectReferrals,
  );
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const directRes = await supabase
        .from("referrals")
        .select("id", { count: "exact", head: true })
        .eq("referrer_id", userId);

      if (!directRes.error) {
        setDirectCount(directRes.count || 0);
      }

      const networkRes = await supabase
        .from("referrals")
        .select("referred_user_id")
        .eq("referrer_id", userId);

      if (!networkRes.error) {
        setNetworkSize(networkRes.data?.length || 0);
      }

      const listRes = await supabase
        .from("referrals")
        .select("referred_user_id, created_at")
        .eq("referrer_id", userId)
        .order("created_at", { ascending: false });

      if (!listRes.error && listRes.data) {
        const referredIds = listRes.data
          .map((ref) => ref.referred_user_id)
          .filter(Boolean);

        if (referredIds.length) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("id, full_name, email, partner_status")
            .in("id", referredIds);

          if (profileData) {
            const profileMap = profileData.reduce((acc, item) => {
              if (item?.id) acc[item.id] = item;
              return acc;
            }, {});

            setDirectReferrals(
              listRes.data.map((ref) => {
                const userProfile = profileMap[ref.referred_user_id];
                return {
                  id: ref.referred_user_id,
                  full_name: userProfile?.full_name || "Referred User",
                  email: userProfile?.email || "",
                  partner_status: userProfile?.partner_status || "pending",
                  created_at: ref.created_at,
                };
              }),
            );
          }
        } else {
          setDirectReferrals([]);
        }
      }
    } catch (err) {
      console.error("PartnerMetrics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("partner-metrics-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "referrals",
          filter: `referrer_id=eq.${userId}`,
        },
        () => {
          fetchData();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200/60 rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-500">
              Partner Network
            </p>
            <h4
              className="mt-3 text-2xl font-bold"
              style={{ color: "#12066a" }}
            >
              Your referrals
            </h4>
          </div>
          <div className="rounded-3xl bg-[#12066a] px-3 py-2 text-sm font-semibold text-white">
            {loading ? "—" : directCount}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {directReferrals && directReferrals.length ? (
            directReferrals.map((ref) => {
              const isApproved = ref.partner_status === "approved";

              return (
                <div
                  key={ref.id}
                  className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {ref.full_name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{ref.email}</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        isApproved
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}
                    >
                      {isApproved ? "£125 Credited (Approved)" : "Referral Pending"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl border border-slate-200/70 bg-[#f8f7ff] p-5 text-sm text-slate-600">
              {loading
                ? "Loading referrals…"
                : "No referrals yet. Share your link to start building your network."}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200/70 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
            Network size
          </p>
          <p className="mt-2 text-3xl font-bold" style={{ color: "#12066a" }}>
            {loading ? "—" : networkSize}
          </p>
        </div>
      </div>
    </div>
  );
}
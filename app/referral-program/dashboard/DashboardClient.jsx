"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import AvatarWithFallback from "../../../components/AvatarWithFallback";
import { LogoutButton, ReferralBox } from "../../../components/AuthButtons";
import PartnerMetrics from "../../../components/PartnerMetrics";

const NAVY = "#12066a";
const GOLD = "#997819";
const BLUE = "#2f6fed"; // accent used for the light icon-pill stat row

const REWARD_PER_REFERRAL = 125;
const MAX_REWARD = 1000;
const MAX_REFERRALS = MAX_REWARD / REWARD_PER_REFERRAL;
const REWARD_VALIDITY_YEARS = 1;

const SERVICES = [
  {
    name: "SIA ACS",
    description: "Approved Contractor Scheme consultancy for security firms.",
  },
  {
    name: "COP 119",
    description: "Code of Practice for labour provision in security sectors.",
  },
  {
    name: "SafeContractor",
    description: "Health & Safety accreditation for UK contractors.",
  },
  {
    name: "ISO 9001",
    description: "Quality Management Systems for operational excellence.",
  },
  {
    name: "ISO 14001",
    description: "Environmental Management Standards for sustainable growth.",
  },
  {
    name: "ISO 45001",
    description: "Occupational Health and Safety management systems.",
  },
  {
    name: "ConstructionLine",
    description: "Gold & Silver membership audit support for construction.",
  },
  {
    name: "NASDU",
    description: "National Association of Security Dogs users compliance.",
  },
  {
    name: "SMAS",
    description: "Worksafe accreditation for SSIP H&S compliance.",
  },
  {
    name: "Cyber Essentials",
    description: "Basic protection against common cyber threats.",
  },
  {
    name: "Cyber Essentials Plus",
    description: "Verified technical audit for enhanced cyber security.",
  },
  {
    name: "CHAS Scheme",
    description: "Contractors Health and Safety Assessment Scheme.",
  },
  {
    name: "BS 10800",
    description: "Standard for the provision of security services.",
  },
  {
    name: "BS 7858",
    description: "Vetting and screening of personnel in security.",
  },
  {
    name: "BS 7499",
    description: "Static guarding and mobile patrol services code.",
  },
];

export default function DashboardClient() {
  const supabase = createClient();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(false);
  const [partnerStatus, setPartnerStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);

  const [directReferrals, setDirectReferrals] = useState([]);
  const [directReferralCount, setDirectReferralCount] = useState(0);
  const [partnerNetworkSize, setPartnerNetworkSize] = useState(0);

  const [claimHistory, setClaimHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimStep, setClaimStep] = useState(1);

  const [selectedServices, setSelectedServices] = useState([]);
  const [claimAmount, setClaimAmount] = useState(REWARD_PER_REFERRAL);

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [claimNotes, setClaimNotes] = useState("");

  const [claimSubmitting, setClaimSubmitting] = useState(false);
  const [claimError, setClaimError] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);

  const refreshClaimHistory = async (userId) => {
    if (!userId) return [];

    const { data: claimsData, error: claimsError } = await supabase
      .from("reward_claims")
      .select("id, user_id, amount, status, created_at, updated_at")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (!claimsError && claimsData) {
      setClaimHistory(claimsData);
      return claimsData;
    }

    if (claimsError) {
      console.error("Unable to refresh claim history:", claimsError);
    }

    return [];
  };

  // ===========================================================
  // LOAD DASHBOARD
  // ===========================================================

  useEffect(() => {
    let referralsChannel = null;
    let claimsChannel = null;

    async function loadDashboardData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = "/referrals-program";
          return;
        }

        setUser(user);

        // =====================================================
        // PROFILE & PARTNER STATUS
        // =====================================================

        const { data: profileData, error: profileErr } = await supabase
          .from("profiles")
          .select(
            "full_name, email, avatar_url, referral_code, company_name, contact_number, partner_status",
          )
          .eq("id", user.id)
          .maybeSingle();

        if (profileErr) {
          setProfileError(true);
        }

        setProfile(profileData);
        setPartnerStatus(profileData?.partner_status || "pending");

        // =====================================================
        // If partner_status is "pending", stop loading and show locked view
        // =====================================================
        if (profileData?.partner_status === "pending") {
          setLoading(false);
          setStatusLoading(false);
          return; // Early return, don't load referrals or claims
        }

        // =====================================================
        // REFERRALS (only for approved partners)
        // =====================================================

        let referralRows = [];

        const { data: rpcData, error: rpcError } = await supabase.rpc(
          "get_user_referrals",
          {
            p_referrer_id: user.id,
          },
        );

        if (!rpcError && rpcData && rpcData.length > 0) {
          referralRows = rpcData;
        } else {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("referrals")
            .select(
              `
              referred_user_id,
              created_at,
              profiles:referred_user_id (
                id,
                full_name,
                email,
                avatar_url
              )
            `,
            )
            .eq("referrer_id", user.id)
            .order("created_at", {
              ascending: false,
            });

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
          setDirectReferrals(referralRows);
        } else {
          setDirectReferralCount(0);
          setPartnerNetworkSize(0);
          setDirectReferrals([]);
        }

        // =====================================================
        // CLAIM HISTORY
        // =====================================================

        await refreshClaimHistory(user.id);

        // =====================================================
        // REALTIME REFERRALS
        // =====================================================

        referralsChannel = supabase
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

              setDirectReferrals((prev) => {
                if (prev.some((item) => item.id === formattedNewReferral.id)) {
                  return prev;
                }

                return [formattedNewReferral, ...prev];
              });

              setDirectReferralCount((prev) => prev + 1);
              setPartnerNetworkSize((prev) => prev + 1);
            },
          )
          .subscribe((status) => {
            console.log("Referral realtime status:", status);
          });

        // =====================================================
        // REALTIME CLAIMS
        // =====================================================

        claimsChannel = supabase
          .channel(`realtime-rewards-${user.id}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "reward_claims",
              filter: `user_id=eq.${user.id}`,
            },
            async (payload) => {
              console.log(
                "Reward claim realtime update:",
                payload.eventType,
                payload.new,
              );

              await refreshClaimHistory(user.id);
            },
          )
          .subscribe((status) => {
            console.log("Reward realtime status:", status);
          });
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
        setStatusLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      if (referralsChannel) {
        supabase.removeChannel(referralsChannel);
      }

      if (claimsChannel) {
        supabase.removeChannel(claimsChannel);
      }
    };
  }, [supabase]);

  // ===========================================================
  // CLAIM HISTORY LIVE SYNC (POLLING + TAB-FOCUS REFRESH)
  // ===========================================================

  useEffect(() => {
    if (!user?.id) return;
    if (partnerStatus === "pending") return;

    const intervalId = setInterval(() => {
      refreshClaimHistory(user.id);
    }, 10000);

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        refreshClaimHistory(user.id);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
    };
  }, [user?.id, partnerStatus]);

  // ===========================================================
  // MODAL SCROLL LOCK
  // ===========================================================

  useEffect(() => {
    if (!showClaimModal) return;

    const scrollY = window.scrollY;

    const previousHtmlOverflow = document.documentElement.style.overflow;

    const previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      touchAction: document.body.style.touchAction,
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.classList.add("modal-open");

    try {
      if (window.lenis) {
        window.lenis.stop();
      }

      if (window.__lenis) {
        window.__lenis.stop();
      }
    } catch (error) {
      console.warn("Unable to pause Lenis:", error);
    }

    const preventBackgroundTouch = (event) => {
      if (!event.target.closest("[data-modal-scroll]")) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventBackgroundTouch, {
      passive: false,
    });

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;

      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.left = previousBodyStyles.left;
      document.body.style.right = previousBodyStyles.right;
      document.body.style.width = previousBodyStyles.width;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.touchAction = previousBodyStyles.touchAction;

      document.body.classList.remove("modal-open");

      window.scrollTo(0, scrollY);

      document.removeEventListener("touchmove", preventBackgroundTouch);

      try {
        if (window.lenis) {
          window.lenis.start();
        }

        if (window.__lenis) {
          window.__lenis.start();
        }
      } catch (error) {
        console.warn("Unable to resume Lenis:", error);
      }
    };
  }, [showClaimModal]);

  // ===========================================================
  // LOADING
  // ===========================================================

  if (loading || statusLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#2f6fed] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ===========================================================
  // AVATAR URL - MOVED HERE BEFORE PENDING CHECK
  // ===========================================================

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    profile?.avatar_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      profile?.full_name || user?.email || "User",
    )}&backgroundColor=12066a,997819`;

  // ===========================================================
  // LOCKED DASHBOARD - PENDING STATUS
  // ===========================================================

  if (partnerStatus === "pending") {
    return (
      <div className="min-h-screen mt-6 relative bg-[#f5f7fb] font-sans pb-24">
        <div className="mx-auto w-full max-w-6xl relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
          {/* Header - same as main dashboard */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative">
                <AvatarWithFallback
                  src={avatarUrl}
                  name={profile?.full_name || user?.email || "User"}
                  email={user?.email}
                  size="w-16 h-16"
                  textSize="text-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold" style={{ color: NAVY }}>
                    {profile?.full_name || "Valued Partner"}
                  </h2>
                  <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                    Pending Approval
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <LogoutButton />
            </div>
          </div>

          {/* Locked Dashboard Content */}
          <div className="mt-12">
            <div className="relative overflow-hidden bg-white border border-slate-200 rounded-[1.75rem] p-8 sm:p-12 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* Lock Icon */}
                <div className="w-20 h-20 rounded-2xl bg-[#2f6fed]/10 border border-[#2f6fed]/15 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-[#2f6fed]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-600">
                    Account Under Review
                  </span>
                </span>

                <h1
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                  style={{ color: NAVY }}
                >
                  Your Partner Account is Being Reviewed
                </h1>

                <p className="text-base text-slate-600 mt-4 leading-relaxed">
                  Thank you for joining the BizGrow Partner Network. Our team is
                  currently reviewing your application. Once approved, you'll
                  have full access to your dashboard, referral tools, and
                  rewards.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Status
                    </p>
                    <p className="text-sm font-bold text-amber-600 mt-1">
                      Pending Approval
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      We'll notify you via email
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Typical Response
                    </p>
                    <p className="text-sm font-bold text-slate-700 mt-1">
                      24-48 hours
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Business days
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-[#2f6fed]/5 border border-[#2f6fed]/10 max-w-lg mx-auto">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-[#2f6fed]">Need help?</span>{" "}
                    If you have any questions about your application, please
                    contact our team at{" "}
                    <a
                      href="mailto:partners@bizgrow.co.uk"
                      className="text-[#997819] font-semibold hover:underline"
                    >
                      partners@bizgrow.co.uk
                    </a>
                    .
                  </p>
                </div>

                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="mt-8 px-7 py-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-black hover:bg-slate-200 transition-colors"
                >
                  Refresh Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================
  // REWARD EXPIRY - (Only for approved partners)
  // ===========================================================

  const now = new Date();

  const getExpiryDate = (createdAt) => {
    if (!createdAt) return null;

    const expiry = new Date(createdAt);

    expiry.setFullYear(expiry.getFullYear() + REWARD_VALIDITY_YEARS);

    return expiry;
  };

  const isRewardActive = (createdAt) => {
    const expiryDate = getExpiryDate(createdAt);

    if (!expiryDate) return false;

    return now < expiryDate;
  };

  const activeRewardReferrals = directReferrals.filter((ref) =>
    isRewardActive(ref.created_at),
  );

  const expiredRewardReferrals = directReferrals.filter(
    (ref) => !isRewardActive(ref.created_at),
  );

  const activeRewardCount = activeRewardReferrals.length;

  const expiredRewardCount = expiredRewardReferrals.length;

  const earnedRewardAmount = Math.min(
    activeRewardCount * REWARD_PER_REFERRAL,
    MAX_REWARD,
  );

  const expiredRewardAmount = Math.min(
    expiredRewardCount * REWARD_PER_REFERRAL,
    MAX_REWARD,
  );

  // ===========================================================
  // CLAIMED AMOUNT
  // ===========================================================

  const successfulClaimAmount = claimHistory
    .filter(
      (claim) =>
        claim.status === "approved" ||
        claim.status === "completed" ||
        claim.status === "claimed",
    )
    .reduce((total, claim) => total + Number(claim.amount || 0), 0);

  const pendingClaimAmount = claimHistory
    .filter(
      (claim) => claim.status === "pending" || claim.status === "under_review",
    )
    .reduce((total, claim) => total + Number(claim.amount || 0), 0);

  const totalClaimedAmount = successfulClaimAmount;

  const totalClaimedAndPending = totalClaimedAmount + pendingClaimAmount;

  const availableRewardAmount = Math.max(
    Math.min(earnedRewardAmount, MAX_REWARD) - totalClaimedAndPending,
    0,
  );

  // ===========================================================
  // REWARD CYCLE / PROGRESS
  // ===========================================================

  const sortedReferralDates = [...directReferrals]
    .filter((ref) => ref.created_at)
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

  // ===========================================================
  // REWARD CYCLE / PROGRESS (Optimized & Based on 8th Referral)
  // ===========================================================

  const getRewardCycle = (referrals) => {
    if (!referrals?.length) {
      return {
        cycleStartDate: null,
        cycleAchievementDate: null,
        cycleReferrals: [],
        cycleCompleted: false,
      };
    }

    // Purane se naye ki taraf sort karein (Oldest to Newest)
    const sorted = [...referrals]
      .filter((ref) => ref.created_at)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );

    let currentCycleStart = new Date(sorted[0].created_at);
    let currentCycleReferrals = [];
    let achievementDate = null;

    for (let i = 0; i < sorted.length; i++) {
      const referral = sorted[i];
      const referralDate = new Date(referral.created_at);

      // Agar hum naye cycle mein hain, toh check karein ke kya ye current cycle start ke baad ka hai?
      if (referralDate >= currentCycleStart) {
        currentCycleReferrals.push(referral);

        // Jaise hi 8 referrals poore ho jayein
        if (currentCycleReferrals.length === MAX_REFERRALS) {
          achievementDate = new Date(referral.created_at); // Last (8th) referral ki date

          // Agle cycle ki start date = 8th referral ki date + 1 saal (REWARD_VALIDITY_YEARS)
          const nextCycleStart = new Date(achievementDate);
          nextCycleStart.setFullYear(
            nextCycleStart.getFullYear() + REWARD_VALIDITY_YEARS,
          );

          // Agar mazeed referrals hain, toh agle cycle ke liye variables update kar do
          if (i < sorted.length - 1) {
            currentCycleStart = nextCycleStart;
            currentCycleReferrals = [];
            achievementDate = null;
          } else {
            break; // Loop khatam agar mazeed referrals nahi hain
          }
        }
      }
    }

    return {
      cycleStartDate: currentCycleStart,
      cycleAchievementDate: achievementDate,
      cycleReferrals: currentCycleReferrals,
      cycleCompleted: currentCycleReferrals.length >= MAX_REFERRALS,
    };
  };

  const rewardCycle = getRewardCycle(sortedReferralDates);

  const cycleReferralCount = rewardCycle.cycleReferrals.length;

  const cycleProgressAmount = Math.min(
    cycleReferralCount * REWARD_PER_REFERRAL,
    MAX_REWARD,
  );

  const rewardProgress = Math.min(
    (cycleProgressAmount / MAX_REWARD) * 100,
    100,
  );

  const cycleAchievementDate = rewardCycle.cycleAchievementDate;

  const nextCycleResetDate = cycleAchievementDate
    ? (() => {
        const next = new Date(cycleAchievementDate);
        next.setFullYear(next.getFullYear() + REWARD_VALIDITY_YEARS);
        return next;
      })()
    : null;

  // ===========================================================
  // EXPIRY / NEXT EXPIRY
  // ===========================================================

  const getDaysRemaining = (date) => {
    if (!date) return 0;

    const difference = date.getTime() - new Date().getTime();

    return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const nextExpiringReferral =
    activeRewardReferrals.length > 0
      ? [...activeRewardReferrals].sort(
          (a, b) =>
            getExpiryDate(a.created_at).getTime() -
            getExpiryDate(b.created_at).getTime(),
        )[0]
      : null;

  const nextExpiryDate = nextExpiringReferral
    ? getExpiryDate(nextExpiringReferral.created_at)
    : null;

  const daysUntilNextExpiry = nextExpiryDate
    ? getDaysRemaining(nextExpiryDate)
    : 0;

  // ===========================================================
  // CLAIM MODAL
  // ===========================================================

  const openClaimModal = () => {
    if (availableRewardAmount < REWARD_PER_REFERRAL) {
      return;
    }

    setClaimStep(1);
    setSelectedServices([]);

    setClaimAmount(Math.min(REWARD_PER_REFERRAL, availableRewardAmount));

    setCompanyName(profile?.company_name || "");

    setContactName(profile?.full_name || "");

    setPhone(profile?.contact_number || user?.user_metadata?.phone || "");

    setClaimNotes("");
    setClaimError("");
    setClaimSuccess(false);
    setShowClaimModal(true);
  };

  const closeClaimModal = () => {
    if (claimSubmitting) return;

    setShowClaimModal(false);
    setClaimStep(1);
    setClaimError("");
    setClaimSuccess(false);
  };

  const toggleService = (service) => {
    setClaimError("");

    setSelectedServices((prev) => {
      const alreadySelected = prev.some((item) => item.name === service.name);

      if (alreadySelected) {
        return prev.filter((item) => item.name !== service.name);
      }

      return [...prev, service];
    });
  };

  const goToDetails = () => {
    if (selectedServices.length === 0) {
      setClaimError("Please select at least one service.");
      return;
    }

    setClaimError("");
    setClaimStep(2);
  };

  const goToReview = () => {
    if (selectedServices.length === 0) {
      setClaimError("Please select at least one service.");
      return;
    }

    if (!companyName.trim()) {
      setClaimError("Please enter your company name.");
      return;
    }

    if (!contactName.trim()) {
      setClaimError("Please enter your contact name.");
      return;
    }

    if (!phone.trim()) {
      setClaimError("Please enter your phone number.");
      return;
    }

    if (claimAmount <= 0 || claimAmount > availableRewardAmount) {
      setClaimError("The selected reward amount is not available.");
      return;
    }

    setClaimError("");
    setClaimStep(3);
  };

  // ===========================================================
  // SUBMIT CLAIM
  // ===========================================================

  const submitClaim = async () => {
    if (selectedServices.length === 0) {
      setClaimError("Please select at least one service.");
      return;
    }

    if (claimAmount <= 0 || claimAmount > availableRewardAmount) {
      setClaimError("The selected reward amount is not available.");
      return;
    }

    setClaimSubmitting(true);
    setClaimError("");

    try {
      const response = await fetch("/api/referral/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName: selectedServices
            .map((service) => service.name)
            .join(", "),

          serviceNames: selectedServices.map((service) => service.name),

          amount: claimAmount,

          companyName: companyName.trim(),

          contactName: contactName.trim(),

          phone: phone.trim(),

          notes: claimNotes.trim(),
        }),
      });

      const contentType = response.headers.get("content-type") || "";

      let result = {};

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();

        console.error("Non-JSON claim API response:", text);

        throw new Error(
          `Claim API returned an invalid response (${response.status}).`,
        );
      }

      if (!response.ok) {
        throw new Error(result?.error || "Unable to submit claim.");
      }

      setClaimSuccess(true);

      if (user?.id) {
        await refreshClaimHistory(user.id);
      } else if (result.claim) {
        setClaimHistory((prev) => [result.claim, ...prev]);
      }
    } catch (error) {
      console.error("Claim submission error:", error);

      setClaimError(
        error?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setClaimSubmitting(false);
    }
  };

  // ===========================================================
  // MAIN UI - (Only for approved partners)
  // ===========================================================

  return (
    <main className="min-h-screen mt-6 relative bg-[#f5f7fb] font-sans pb-24">
      <div className="mx-auto w-full max-w-6xl relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
        <div className="space-y-8">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
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
                  <h2
                    className="text-xl font-bold text-slate-800"
                  >
                    Hello, {profile?.full_name?.split(" ")[0] || "Partner"}
                  </h2>

                  {profileError && (
                    <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                      Syncing Profile...
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "dashboard"
                      ? "bg-white text-[#2f6fed] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Dashboard
                </button>

                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "overview"
                      ? "bg-white text-[#2f6fed] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Guidelines
                </button>
              </div>

              <LogoutButton />
            </div>
          </div>


          {/* =================================================
              REWARD CARD — light card with donut-style ring
              instead of heavy gradient hero
          ================================================= */}

          {activeTab === "dashboard" && (
            <div className="bg-white border border-slate-200 rounded-[1.75rem] shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex items-center gap-6">
                    {/* Donut-style progress ring */}
                    <div className="relative w-24 h-24 shrink-0">
                      <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#eef1f7"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={BLUE}
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 42 * (1 - rewardProgress / 100)
                          }`}
                          style={{ transition: "stroke-dashoffset 0.7s ease" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-black text-slate-800">
                          {Math.round(rewardProgress)}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2f6fed]/10 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2f6fed]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#2f6fed]">
                          Referral Reward
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">
                        Your BizGrow referral credit
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        £{cycleProgressAmount.toLocaleString()} of £1,000 &middot;{" "}
                        {cycleReferralCount} of {MAX_REFERRALS} referrals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-3xl font-black text-slate-800 tabular-nums">
                        £{availableRewardAmount.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                        Available to claim
                      </div>
                    </div>

                    <button
                      onClick={openClaimModal}
                      disabled={availableRewardAmount < REWARD_PER_REFERRAL}
                      className={`px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                        availableRewardAmount >= REWARD_PER_REFERRAL
                          ? "text-white shadow-lg"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                      style={
                        availableRewardAmount >= REWARD_PER_REFERRAL
                          ? { backgroundColor: BLUE, boxShadow: `0 10px 25px -8px ${BLUE}66` }
                          : undefined
                      }
                    >
                      Claim Reward
                    </button>
                  </div>
                </div>

                {rewardCycle.cycleCompleted && nextCycleResetDate && (
                  <div className="mt-5 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 inline-flex">
                    Cycle complete — resets {formatDate(nextCycleResetDate)}
                  </div>
                )}

                {/* Secondary detail chips */}
                <div className="mt-6 mx-auto flex flex-wrap gap-3">
                  <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-green-600 font-bold uppercase tracking-wide text-[9px] mr-2">
                      Active
                    </span>
                    <span className="font-black text-slate-700">
                      {activeRewardCount} referral{activeRewardCount === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-yellow-600 font-bold uppercase tracking-wide text-[9px] mr-2">
                      Under review
                    </span>
                    <span className="font-black text-slate-700">
                      £{pendingClaimAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-red-600 font-bold uppercase tracking-wide text-[9px] mr-2">
                      Next expiry
                    </span>
                    <span className="font-black text-slate-700">
                      {nextExpiryDate
                        ? `${formatDate(nextExpiryDate)} (${daysUntilNextExpiry}d)`
                        : "—"}
                    </span>
                  </div>
                </div>

                {/* Expiry Notice */}
                <div className="mt-6 px-4 py-3 rounded-xl bg-[#2f6fed]/5 border border-[#2f6fed]/10">
                <h3 className="text-lg font-bold text-[#12066a] mb-4">
                  Your Unique Referral Link
                </h3>
                  <ReferralBox  referralCode={profile?.referral_code} />
                  
                </div>
                  <p className="text-[11px] mt-6 text-center text-slate-600 leading-relaxed">
                    Each <strong className="text-slate-800">£125</strong>{" "}
                    referral credit remains valid for{" "}
                    <strong className="text-slate-800">
                      12 months from the date the qualifying referral is
                      recorded
                    </strong>
                    , unless otherwise stated in the programme terms.
                  </p>
              </div>
            </div>
          )}

          {/* =================================================
              QUICK STATS — rounded icon-pill row
              (same underlying figures as before, new look)
          ================================================= */}

          {activeTab === "dashboard" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center gap-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${BLUE}1a` }}
                >
                  <svg className="w-5 h-5" style={{ color: BLUE }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg font-black text-slate-800 tabular-nums">
                  £{availableRewardAmount.toLocaleString()}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Available
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center gap-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg font-black text-slate-800 tabular-nums">
                  £{totalClaimedAmount.toLocaleString()}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Claimed
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center gap-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-lg font-black text-slate-800 tabular-nums">
                  £{expiredRewardAmount.toLocaleString()}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Expired
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center gap-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg font-black text-slate-800 tabular-nums">
                  {Math.round(rewardProgress)}%
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Progress
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              DASHBOARD
          ================================================= */}

          {activeTab === "dashboard" ? (
            <div className="space-y-8">
              
              <div className="grid gap-6 md:grid-cols-2">

                
                {/* Partner Network Activity Table */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
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
                      <p className="text-sm text-slate-400">
                        No direct referrals recorded yet.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            <th className="pb-4">Partner Name</th>
                            <th className="pb-4">Reward</th>
                            <th className="pb-4 text-right">
                              Joined / Reward Date
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                          {directReferrals.map((ref) => {
                            const expiryDate = getExpiryDate(ref.created_at);
                            const active = isRewardActive(ref.created_at);
                            const daysLeft = active
                              ? getDaysRemaining(expiryDate)
                              : 0;

                            return (
                              <tr key={ref.id}>
                                <td className="py-4">
                                  <div className="flex items-center gap-3">
                                    <AvatarWithFallback
                                      src={ref.avatar_url}
                                      name={ref.full_name}
                                      size="w-9 h-9"
                                      textSize="text-xs"
                                    />
                                    <span className="text-sm font-medium text-slate-800">
                                      {ref.full_name}
                                    </span>
                                  </div>
                                </td>

                                <td className="py-4">
                                  <span
                                    className={`px-0 py-1.5 rounded-full text-[11px] font-black uppercase ${
                                      active
                                        ? "text-emerald-700"
                                        : "text-red-600"
                                    }`}
                                  >
                                    £125 {active ? "Active" : "Expired"}
                                  </span>

                                  {active && (
                                    <p className="text-[10px] font-bold text-slate-500 mt-1">
                                      {daysLeft} days left
                                    </p>
                                  )}
                                </td>

                                <td className="py-4 text-right">
                                  <div className="text-xs text-slate-600">
                                    {new Date(
                                      ref.created_at,
                                    ).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </div>

                                  <div className="text-[9px] mt-1 font-semibold text-slate-400">
                                    {active
                                      ? `Expires ${formatDate(expiryDate)}`
                                      : `Expired ${formatDate(expiryDate)}`}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2f6fed]">
                      Exclusive Benefit
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-extrabold uppercase">
                      Max £1000
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800">
                    £125 Credit Discount
                  </h3>

                  <p className="text-sm text-slate-500 font-light mt-3 leading-relaxed">
                    Each successful referral earns{" "}
                    <strong className="text-slate-700">£125 Credit</strong>{" "}
                    that can be used towards eligible compliance services.
                  </p>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICES.map((service) => (
                      <span
                        key={service.name}
                        className="bg-slate-50 px-2.5 py-2 rounded-lg border border-slate-100 text-[10px] font-medium text-slate-600"
                      >
                        {service.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

             

              {/* Claim History */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Reward Claim History
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      Track every reward credit request submitted for review.
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    £{totalClaimedAmount.toLocaleString()} claimed
                  </span>
                </div>

                {claimHistory.length === 0 ? (
                  <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                    <p className="text-sm text-slate-400">
                      No reward claims submitted yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {claimHistory.map((claim) => (
                      <div
                        key={claim.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {claim.service_name || "Reward Credit"}
                          </p>

                          <p className="text-[10px] text-slate-400 mt-1">
                            {claim.created_at
                              ? new Date(claim.created_at).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : ""}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-black text-slate-800">
                            £{Number(claim.amount || 0).toLocaleString()}
                          </span>

                          <span
                            className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase ${
                              claim.status === "approved"
                                ? "bg-emerald-50 text-emerald-700"
                                : claim.status === "rejected"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {claim.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* =================================================
               OVERVIEW
            ================================================= */

            <div className="space-y-8">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <span className="inline-flex px-3 py-1 rounded-full bg-[#2f6fed]/10 text-[#2f6fed] text-[11px] font-extrabold uppercase tracking-wider">
                  Program Guidelines
                </span>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-4 text-slate-800">
                  How the Bizgrow Partner Network Works
                </h1>

                <p className="text-base text-slate-500 mt-4 max-w-3xl leading-relaxed">
                  Earn £125 BizGrow Service Credit for every successful
                  qualifying referral and use your accumulated credit toward
                  eligible BizGrow services.
                </p>
              </div>

              {/* =================================================
                  PROGRAM RULES
              ================================================= */}

              <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="mb-7">
                  <span className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                    Referral Program Rules
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-800">
                    Referral Program Terms & Conditions
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    Please review the following rules before participating in
                    the Bizgrow Partner Referral Program.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      number: 1,
                      text: (
                        <>
                          Referral rewards apply 5% only to{" "}
                          <strong>new businesses</strong> that have not
                          previously purchased from BizGrow.
                        </>
                      ),
                    },
                    {
                      number: 2,
                      text: (
                        <>
                          The referred business must register using the unique
                          referral link.
                        </>
                      ),
                    },
                    {
                      number: 3,
                      text: (
                        <>
                          The referred business must become a BizGrow paid
                          client for an eligible service with a minimum service
                          value of <strong>£650 + VAT</strong> for the referral
                          to qualify.
                        </>
                      ),
                    },
                    {
                      number: 4,
                      text: (
                        <>
                          The 5% referral discount applies to the referred
                          client's first eligible BizGrow service purchase only,
                          subject to the applicable service eligibility and
                          minimum qualifying value.
                        </>
                      ),
                    },
                    {
                      number: 5,
                      text: (
                        <>
                          The referring client receives £125 bizgrow credit for
                          each successful referral.
                        </>
                      ),
                    },
                    {
                      number: 6,
                      text: (
                        <>
                          The £125 BizGrow Service Credit may be applied toward
                          the referring client's next eligible BizGrow service,
                          subject to the applicable service terms and credit
                          validity period.
                        </>
                      ),
                    },
                    {
                      number: 7,
                      text: (
                        <>
                          The maximum referral reward is <strong>£1,000</strong>{" "}
                          in BizGrow Service Credit per 12-month referral cycle.
                        </>
                      ),
                    },
                    {
                      number: 8,
                      text: (
                        <>
                          A maximum of 8 successful referral rewards may be
                          earned per 12-month referral cycle, equivalent to a
                          maximum of £1,000 in BizGrow Service Credit.
                        </>
                      ),
                    },
                    {
                      number: 9,
                      text: (
                        <>
                          Referral discounts and BizGrow Service Credit have no
                          cash value and cannot be exchanged for cash or
                          transferred for cash.
                        </>
                      ),
                    },
                    {
                      number: 10,
                      text: (
                        <>
                          Discounts cannot be combined with other promotional
                          offers unless BizGrow agrees otherwise.
                        </>
                      ),
                    },
                    {
                      number: 11,
                      text: (
                        <>
                          Self-referrals, duplicate registrations and referrals
                          between related entities may not qualify for rewards.
                        </>
                      ),
                    },
                    {
                      number: 12,
                      text: (
                        <>
                          BizGrow reserves the right to reject, cancel or
                          withhold any referral or reward where it identifies
                          duplicate registrations, self-referrals, fraudulent
                          activity, misuse of the programme, inaccurate
                          information or a breach of these terms.
                        </>
                      ),
                    },
                  ].map((rule) => (
                    <div
                      key={rule.number}
                      className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#2f6fed]/10 text-[#2f6fed] flex items-center justify-center shrink-0 text-xs font-black">
                        {rule.number}
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {rule.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2f6fed]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#2f6fed] text-xl">£</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2f6fed]">
                      12-Month Reward Validity
                    </span>

                    <h3 className="text-xl font-bold mt-1 text-slate-800">
                      Every £125 Credit has its own validity period
                    </h3>

                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Each successful referral earns £125 BizGrow Service
                      Credit. The credit is valid for 12 months from the date
                      the referral becomes eligible and is confirmed as
                      successful by BizGrow. Unused credit expires automatically
                      after this period.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =======================================================
          CLAIM MODAL
      ======================================================= */}

      {showClaimModal && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 overflow-hidden"
          onClick={closeClaimModal}
        >
          {/* Backdrop */}

          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-md"
            onClick={closeClaimModal}
          />

          {/* Modal */}

          <div
            className="relative z-[100001] w-full max-w-4xl h-[92vh] max-h-[92vh] bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col pointer-events-auto min-h-0"
            onClick={(event) => event.stopPropagation()}
          >
            {!claimSuccess ? (
              <>
                {/* Modal Header */}

                <div className="shrink-0 z-20 bg-white border-b border-slate-100 px-6 sm:px-8 py-5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#2f6fed]">
                      Reward Claim
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black mt-1 text-slate-800">
                      Use Your Reward Credit
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1">
                      Select one service and submit your reward request.
                    </p>
                  </div>

                  <button
                    onClick={closeClaimModal}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center shrink-0"
                  >
                    ✕
                  </button>
                </div>

                {/* SCROLLABLE MODAL CONTENT */}

                <div
                  data-modal-scroll
                  data-lenis-prevent
                  className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    overscrollBehavior: "contain",
                    touchAction: "pan-y",
                  }}
                >
                  {/* Steps */}

                  <div className="px-6 sm:px-8 pt-6">
                    <div className="flex items-center gap-2">
                      {["Service", "Details", "Review"].map((step, index) => {
                        const number = index + 1;

                        return (
                          <div key={step} className="flex items-center flex-1">
                            <div
                              className={`flex items-center gap-2 ${
                                number <= claimStep
                                  ? "text-[#2f6fed]"
                                  : "text-slate-300"
                              }`}
                            >
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                                  number <= claimStep
                                    ? "bg-[#2f6fed] text-white"
                                    : "bg-slate-100 text-slate-400"
                                }`}
                              >
                                {number}
                              </span>

                              <span className="hidden sm:block text-[10px] font-black uppercase tracking-wider">
                                {step}
                              </span>
                            </div>

                            {number < 3 && (
                              <div
                                className={`h-px flex-1 mx-3 ${
                                  number < claimStep
                                    ? "bg-[#2f6fed]"
                                    : "bg-slate-200"
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Error */}

                  {claimError && (
                    <div className="mx-6 sm:mx-8 mt-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs font-semibold text-red-600">
                      {claimError}
                    </div>
                  )}

                  {/* STEP 1 */}

                  {claimStep === 1 && (
                    <div className="px-6 sm:px-8 py-7">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-[#2f6fed]">
                            Step 1
                          </p>

                          <h4 className="text-xl font-black text-slate-800 mt-1">
                            Choose your services
                          </h4>

                          <p className="text-xs text-slate-500 mt-1">
                            Your reward can be applied across multiple eligible
                            services in this claim.
                          </p>
                        </div>

                        <div className="px-4 py-3 rounded-2xl bg-[#2f6fed]/5 border border-[#2f6fed]/10">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            Available Credit
                          </p>

                          <p className="text-xl font-black text-slate-800">
                            £{availableRewardAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {SERVICES.map((service) => {
                          const selected = selectedServices.some(
                            (item) => item.name === service.name,
                          );

                          return (
                            <button
                              key={service.name}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`text-left p-5 rounded-2xl border transition-all ${
                                selected
                                  ? "border-[#2f6fed] bg-[#2f6fed]/5 shadow-md"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h5 className="text-sm font-black text-slate-800">
                                    {service.name}
                                  </h5>

                                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                                    {service.description}
                                  </p>
                                </div>

                                <span
                                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                                    selected
                                      ? "border-[#2f6fed] bg-[#2f6fed] text-white"
                                      : "border-slate-200 text-transparent"
                                  }`}
                                >
                                  ✓
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-7">
                        <span className="text-[11px] font-bold text-slate-500">
                          {selectedServices.length} service
                          {selectedServices.length === 1 ? "" : "s"} selected
                        </span>

                        <button
                          type="button"
                          onClick={goToDetails}
                          disabled={selectedServices.length === 0}
                          className={`px-7 py-3 rounded-xl text-xs font-black shadow-lg transition-all ${
                            selectedServices.length > 0
                              ? "bg-[#2f6fed] text-white"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                          }`}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}

                  {claimStep === 2 && (
                    <div className="px-6 sm:px-8 py-7">
                      <div className="mb-6">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#2f6fed]">
                          Step 2
                        </p>

                        <h4 className="text-xl font-black text-slate-800 mt-1">
                          Claim details
                        </h4>

                        <p className="text-xs text-slate-500 mt-1">
                          Tell us how you would like to use your reward.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#2f6fed]/5 border border-[#2f6fed]/10 mb-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                              Selected Services
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedServices.map((service) => (
                                <span
                                  key={service.name}
                                  className="px-3 py-1.5 rounded-full bg-white border border-[#2f6fed]/20 text-[11px] font-bold text-[#2f6fed]"
                                >
                                  {service.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setClaimStep(1)}
                            className="text-[10px] font-black uppercase tracking-wider text-[#2f6fed] hover:underline shrink-0"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Claim Amount
                          </label>

                          <select
                            value={claimAmount}
                            onChange={(event) =>
                              setClaimAmount(Number(event.target.value))
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 outline-none focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
                          >
                            {[125, 250, 375, 500, 625, 750, 875, 1000]
                              .filter(
                                (amount) => amount <= availableRewardAmount,
                              )
                              .map((amount) => (
                                <option key={amount} value={amount}>
                                  £{amount.toLocaleString()}
                                </option>
                              ))}
                          </select>

                          <p className="text-[10px] text-slate-400 mt-2">
                            Available:
                            {" £"}
                            {availableRewardAmount.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Company Name
                          </label>

                          <input
                            type="text"
                            value={companyName}
                            onChange={(event) =>
                              setCompanyName(event.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
                            placeholder="Your company name"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Contact Name
                          </label>

                          <input
                            type="text"
                            value={contactName}
                            onChange={(event) =>
                              setContactName(event.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
                            placeholder="Contact name"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Phone
                          </label>

                          <input
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
                            placeholder="+44..."
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Additional Information
                          </label>

                          <textarea
                            value={claimNotes}
                            onChange={(event) =>
                              setClaimNotes(event.target.value)
                            }
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10 resize-none"
                            placeholder="Tell our compliance team anything relevant to your request..."
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-3 mt-7">
                        <button
                          type="button"
                          onClick={() => setClaimStep(1)}
                          className="px-5 py-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-black"
                        >
                          Back
                        </button>

                        <button
                          type="button"
                          onClick={goToReview}
                          className="px-7 py-3 rounded-xl bg-[#2f6fed] text-white text-xs font-black"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}

                  {claimStep === 3 && (
                    <div className="px-6 sm:px-8 py-7">
                      <div className="mb-6">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#2f6fed]">
                          Step 3
                        </p>

                        <h4 className="text-xl font-black text-slate-800 mt-1">
                          Review your claim
                        </h4>

                        <p className="text-xs text-slate-500 mt-1">
                          Please check the information before submitting your
                          request.
                        </p>
                      </div>

                      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="grid grid-cols-2 border-b border-slate-100">
                          <div className="p-5 bg-slate-50">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                              Reward
                            </p>
                          </div>

                          <div className="p-5">
                            <p className="text-xl font-black text-slate-800">
                              £{claimAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100">
                          <div className="p-5 bg-slate-50">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                              Services
                            </p>
                          </div>

                          <div className="p-5">
                            <div className="flex flex-wrap gap-2">
                              {selectedServices.map((service) => (
                                <span
                                  key={service.name}
                                  className="px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700"
                                >
                                  {service.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 border-b border-slate-100">
                          <div className="p-5 bg-slate-50">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                              Company
                            </p>
                          </div>

                          <div className="p-5">
                            <p className="text-sm font-bold text-slate-700">
                              {companyName}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="p-5 bg-slate-50">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                              Contact
                            </p>
                          </div>

                          <div className="p-5">
                            <p className="text-sm font-bold text-slate-700">
                              {contactName}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              {phone}
                            </p>
                          </div>
                        </div>
                      </div>

                      {claimNotes.trim() && (
                        <div className="max-w-2xl mx-auto mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                            Additional Information
                          </p>

                          <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-wrap">
                            {claimNotes}
                          </p>
                        </div>
                      )}

                      <div className="max-w-2xl mx-auto mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                        <p className="text-xs font-bold text-slate-700">
                          What happens next?
                        </p>

                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Your request will be sent to our compliance team for
                          review. You will receive an email confirmation that
                          your claim has been received, and our team will
                          contact you regarding the selected service.
                        </p>
                      </div>

                      <div className="flex justify-between max-w-2xl mx-auto mt-6">
                        <button
                          onClick={() => setClaimStep(2)}
                          disabled={claimSubmitting}
                          className="px-5 py-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-black"
                        >
                          Back
                        </button>

                        <button
                          onClick={submitClaim}
                          disabled={claimSubmitting}
                          className="px-7 py-3 rounded-xl bg-[#2f6fed] text-white text-xs font-black disabled:opacity-60"
                        >
                          {claimSubmitting ? "Submitting..." : "Submit Claim"}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="h-6" />
                </div>
              </>
            ) : (
              /* =================================================
                 SUCCESS
              ================================================= */

              <div
                data-modal-scroll
                data-lenis-prevent
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
                style={{
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain",
                  touchAction: "pan-y",
                }}
              >
                <div className="p-8 sm:p-14 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                    <span className="text-3xl text-emerald-600">✓</span>
                  </div>

                  <span className="inline-block mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-[#2f6fed]">
                    Claim Received
                  </span>

                  <h3 className="text-3xl font-black mt-2 text-slate-800">
                    Your request has been received
                  </h3>

                  <p className="text-sm text-slate-500 max-w-xl mx-auto mt-3 leading-relaxed">
                    We've received your £{claimAmount} credit claim for{" "}
                    <strong>
                      {selectedServices
                        .map((service) => service.name)
                        .join(", ")}
                    </strong>
                    . Our compliance team will review your request and contact
                    you shortly.
                  </p>

                  <div className="max-w-md mx-auto mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Claim amount</span>

                      <span className="font-black text-slate-800">
                        £{claimAmount}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-3 gap-4">
                      <span className="text-slate-500 shrink-0">Services</span>

                      <span className="font-bold text-slate-700 text-right">
                        {selectedServices
                          .map((service) => service.name)
                          .join(", ")}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-3">
                      <span className="text-slate-500">Status</span>

                      <span className="font-black text-amber-600">
                        Under Review
                      </span>
                    </div>
                  </div>

                  <div className="max-w-md mx-auto mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-100 text-left">
                    <p className="text-xs font-bold text-slate-700">
                      What happens next?
                    </p>

                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Your claim has been submitted to our compliance team.
                      You'll receive an email confirmation and our team will
                      contact you regarding your selected service.
                    </p>
                  </div>

                  <button
                    onClick={closeClaimModal}
                    className="mt-7 px-7 py-3 rounded-xl bg-[#2f6fed] text-white text-xs font-black"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
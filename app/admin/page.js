"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";

const NAVY = "#12066a";
const GOLD = "#997819";

const supabase = createClient();

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  

  // ========================================================
  // DATA
  // ========================================================

  const [metrics, setMetrics] = useState(null);
  const [claims, setClaims] = useState([]);
  const [network, setNetwork] = useState([]);
  const [users, setUsers] = useState([]);

  // API errors
  const [claimsError, setClaimsError] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [usersError, setUsersError] = useState("");

  // ========================================================
  // CLAIMS
  // ========================================================

  const [selectedClaimStatus, setSelectedClaimStatus] = useState(null);

  const [selectedClaim, setSelectedClaim] = useState(null);

  const [claimApproving, setClaimApproving] = useState(false);

  const [claimApprovalStatus, setClaimApprovalStatus] =
    useState("under_review");

  const [claimApprovalError, setClaimApprovalError] = useState("");

  // ========================================================
  // REFERRAL NETWORK
  // ========================================================

  const [selectedReferral, setSelectedReferral] = useState(null);

  const [referralSearchQuery, setReferralSearchQuery] = useState("");

  const [selectedReferralStatus, setSelectedReferralStatus] = useState(null);

  // ========================================================
  // PARTNER APPROVAL (USERS TABLE)
  // ========================================================

  const [approvingUserId, setApprovingUserId] = useState(null);

  const [approveError, setApproveError] = useState("");

  const [userSearchQuery, setUserSearchQuery] = useState("");

  const [selectedPartnerStatus, setSelectedPartnerStatus] = useState(null);

  // ========================================================
  // LOAD DATA
  // ========================================================

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("Admin auth error:", authError);
        }

        if (!user) {
          window.location.href = "/referral-program";
          return;
        }

        if (!mounted) return;

        setUser(user);

        // ====================================================
        // METRICS
        // ====================================================

        try {
          const metricsRes = await fetch("/api/admin/metrics", {
            cache: "no-store",
          });

          const metricsData = await metricsRes.json().catch(() => ({}));

          console.log("ADMIN METRICS RESPONSE:", metricsData);

          if (metricsRes.ok && metricsData.success) {
            setMetrics(metricsData.metrics);
          } else {
            console.error("Metrics API error:", metricsData);
          }
        } catch (error) {
          console.error("Metrics fetch error:", error);
        }

        // ====================================================
        // CLAIMS
        // ====================================================

        try {
          setClaimsError("");

          const claimsRes = await fetch("/api/admin/claims", {
            cache: "no-store",
          });

          const claimsData = await claimsRes.json().catch(() => ({}));

          console.log("ADMIN CLAIMS RESPONSE:", claimsData);

          if (!claimsRes.ok) {
            throw new Error(
              claimsData?.error ||
                claimsData?.message ||
                `Claims API returned ${claimsRes.status}`,
            );
          }

          if (claimsData.success === false) {
            throw new Error(
              claimsData?.error ||
                claimsData?.message ||
                "Claims API failed",
            );
          }

          let claimsList = [];

          if (Array.isArray(claimsData)) {
            claimsList = claimsData;
          } else if (Array.isArray(claimsData.claims)) {
            claimsList = claimsData.claims;
          } else if (Array.isArray(claimsData?.data?.claims)) {
            claimsList = claimsData.data.claims;
          }

          setClaims(claimsList);

          console.log("NORMALIZED CLAIMS:", claimsList);
        } catch (error) {
          console.error("Claims loading error:", error);

          setClaims([]);
          setClaimsError(
            error?.message || "Unable to load claims.",
          );
        }

        // ====================================================
        // REFERRAL NETWORK
        // ====================================================

        try {
          setNetworkError("");

          const networkRes = await fetch(
            "/api/admin/referral-network",
            {
              cache: "no-store",
            },
          );

          const networkData = await networkRes.json().catch(() => ({}));

          console.log(
            "ADMIN REFERRAL NETWORK RESPONSE:",
            networkData,
          );

          if (!networkRes.ok) {
            throw new Error(
              networkData?.error ||
                networkData?.message ||
                `Referral network API returned ${networkRes.status}`,
            );
          }

          if (networkData.success === false) {
            throw new Error(
              networkData?.error ||
                networkData?.message ||
                "Referral network API failed",
            );
          }

          let networkList = [];

          if (Array.isArray(networkData)) {
            networkList = networkData;
          } else if (Array.isArray(networkData.network)) {
            networkList = networkData.network;
          } else if (Array.isArray(networkData?.data?.network)) {
            networkList = networkData.data.network;
          } else if (Array.isArray(networkData.referrals)) {
            networkList = networkData.referrals;
          }

          setNetwork(networkList);

          console.log(
            "NORMALIZED NETWORK:",
            networkList,
          );
        } catch (error) {
          console.error(
            "Referral network loading error:",
            error,
          );

          setNetwork([]);
          setNetworkError(
            error?.message ||
              "Unable to load referral network.",
          );
        }

        // ====================================================
        // USERS
        // ====================================================

        try {
          setUsersError("");

          const usersRes = await fetch("/api/admin/users", {
            cache: "no-store",
          });

          const usersData = await usersRes.json().catch(() => ({}));

          console.log(
            "ADMIN USERS RESPONSE:",
            usersData,
          );

          if (!usersRes.ok) {
            throw new Error(
              usersData?.error ||
                usersData?.message ||
                `Users API returned ${usersRes.status}`,
            );
          }

          if (usersData.success === false) {
            throw new Error(
              usersData?.error ||
                usersData?.message ||
                "Users API failed",
            );
          }

          let usersList = [];

          if (Array.isArray(usersData)) {
            usersList = usersData;
          } else if (Array.isArray(usersData.users)) {
            usersList = usersData.users;
          } else if (Array.isArray(usersData?.data?.users)) {
            usersList = usersData.data.users;
          }

          setUsers(usersList);
        } catch (error) {
          console.error(
            "Users loading error:",
            error,
          );

          setUsers([]);
          setUsersError(
            error?.message ||
              "Unable to load users.",
          );
        }
      } catch (error) {
        console.error(
          "Admin dashboard load error:",
          error,
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);



 // ========================================================
// REALTIME DATABASE UPDATES
// ========================================================
useEffect(() => {
  let refreshTimer = null;

  const refreshAdminData = async () => {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
    }

    refreshTimer = setTimeout(async () => {
      try {
        console.log(
          "REALTIME UPDATE DETECTED — REFRESHING ADMIN DATA"
        );

        // ====================================================
        // METRICS
        // ====================================================
        try {
          const metricsRes = await fetch(
            "/api/admin/metrics",
            {
              cache: "no-store",
            }
          );

          const metricsData =
            await metricsRes
              .json()
              .catch(() => ({}));

          if (
            metricsRes.ok &&
            metricsData.success
          ) {
            setMetrics(
              metricsData.metrics
            );
          }
        } catch (error) {
          console.error(
            "Realtime metrics refresh error:",
            error
          );
        }

        // ====================================================
        // CLAIMS
        // ====================================================
        try {
          const claimsRes = await fetch(
            "/api/admin/claims",
            {
              cache: "no-store",
            }
          );

          const claimsData =
            await claimsRes
              .json()
              .catch(() => ({}));

          let claimsList = [];

          if (
            Array.isArray(claimsData)
          ) {
            claimsList = claimsData;
          } else if (
            Array.isArray(
              claimsData.claims
            )
          ) {
            claimsList =
              claimsData.claims;
          } else if (
            Array.isArray(
              claimsData?.data?.claims
            )
          ) {
            claimsList =
              claimsData.data.claims;
          }

          setClaims(
            claimsList
          );
        } catch (error) {
          console.error(
            "Realtime claims refresh error:",
            error
          );
        }

        // ====================================================
        // REFERRAL NETWORK
        // ====================================================
        try {
          const networkRes =
            await fetch(
              "/api/admin/referral-network",
              {
                cache: "no-store",
              }
            );

          const networkData =
            await networkRes
              .json()
              .catch(() => ({}));

          let networkList = [];

          if (
            Array.isArray(networkData)
          ) {
            networkList =
              networkData;
          } else if (
            Array.isArray(
              networkData.network
            )
          ) {
            networkList =
              networkData.network;
          } else if (
            Array.isArray(
              networkData?.data?.network
            )
          ) {
            networkList =
              networkData.data.network;
          } else if (
            Array.isArray(
              networkData.referrals
            )
          ) {
            networkList =
              networkData.referrals;
          }

          setNetwork(
            networkList
          );
        } catch (error) {
          console.error(
            "Realtime network refresh error:",
            error
          );
        }

        // ====================================================
        // USERS
        // ====================================================
        try {
          const usersRes = await fetch(
            "/api/admin/users",
            {
              cache: "no-store",
            }
          );

          const usersData =
            await usersRes
              .json()
              .catch(() => ({}));

          let usersList = [];

          if (
            Array.isArray(usersData)
          ) {
            usersList =
              usersData;
          } else if (
            Array.isArray(
              usersData.users
            )
          ) {
            usersList =
              usersData.users;
          } else if (
            Array.isArray(
              usersData?.data?.users
            )
          ) {
            usersList =
              usersData.data.users;
          }

          setUsers(
            usersList
          );
        } catch (error) {
          console.error(
            "Realtime users refresh error:",
            error
          );
        }

        console.log(
          "ADMIN DATA REFRESHED FROM REALTIME"
        );
      } catch (error) {
        console.error(
          "Realtime admin refresh error:",
          error
        );
      }
    }, 300);
  };

  // ========================================================
  // SUPABASE REALTIME CHANNEL
  // ========================================================

  const channel = supabase
    .channel(
      "admin-dashboard-realtime"
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "profiles",
      },
      (payload) => {
        console.log(
          "REALTIME PROFILES UPDATE:",
          payload
        );

        refreshAdminData();
      }
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "referrals",
      },
      (payload) => {
        console.log(
          "REALTIME REFERRALS UPDATE:",
          payload
        );

        refreshAdminData();
      }
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "reward_claims",
      },
      (payload) => {
        console.log(
          "REALTIME CLAIM UPDATE:",
          payload
        );

        refreshAdminData();
      }
    )
    .subscribe((status) => {
      console.log(
        "ADMIN REALTIME STATUS:",
        status
      );
    });

  // ========================================================
  // CLEANUP
  // ========================================================

  return () => {
    if (refreshTimer) {
      clearTimeout(
        refreshTimer
      );
    }

    supabase.removeChannel(
      channel
    );

    console.log(
      "ADMIN REALTIME CHANNEL REMOVED"
    );
  };
}, []);

  // ========================================================
  // MODAL SCROLL LOCK
  // ========================================================

  useEffect(() => {
    const isModalOpen = Boolean(
      selectedReferral || selectedClaim,
    );

    if (!isModalOpen) return;

    const scrollY = window.scrollY;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

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
      console.warn(
        "Unable to pause Lenis:",
        error,
      );
    }

    const preventBackgroundTouch = (event) => {
      if (
        !event.target.closest(
          "[data-modal-scroll]",
        )
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener(
      "touchmove",
      preventBackgroundTouch,
      {
        passive: false,
      },
    );

    return () => {
      document.documentElement.style.overflow =
        previousHtmlOverflow;

      document.body.style.position =
        previousBodyStyles.position;

      document.body.style.top =
        previousBodyStyles.top;

      document.body.style.left =
        previousBodyStyles.left;

      document.body.style.right =
        previousBodyStyles.right;

      document.body.style.width =
        previousBodyStyles.width;

      document.body.style.overflow =
        previousBodyStyles.overflow;

      document.body.style.touchAction =
        previousBodyStyles.touchAction;

      document.body.classList.remove(
        "modal-open",
      );

      window.scrollTo(0, scrollY);

      document.removeEventListener(
        "touchmove",
        preventBackgroundTouch,
      );

      try {
        if (window.lenis) {
          window.lenis.start();
        }

        if (window.__lenis) {
          window.__lenis.start();
        }
      } catch (error) {
        console.warn(
          "Unable to resume Lenis:",
          error,
        );
      }
    };
  }, [selectedReferral, selectedClaim]);

  // ========================================================
  // NORMALIZED REFERRALS
  // ========================================================

  const referralRows = useMemo(() => {
    if (!Array.isArray(network)) {
      return [];
    }

    const rows = [];

    network.forEach((item) => {
      if (Array.isArray(item?.referrals)) {
        item.referrals.forEach((referral) => {
          if (!referral) return;

          rows.push({
            ...referral,

            referrer_name:
              item.full_name ||
              item.name ||
              "Unknown",

            referrer_email:
              item.email ||
              "—",

            referrer_code:
              item.referral_code ||
              "—",

            referrer_id:
              item.id ||
              null,
          });
        });

        return;
      }

      if (
        item?.referrer_id ||
        item?.referred_user_id ||
        item?.referred_name ||
        item?.referred_email
      ) {
        rows.push({
          ...item,

          referrer_name:
            item.referrer_name ||
            item.referrer?.full_name ||
            "Unknown",

          referrer_email:
            item.referrer_email ||
            item.referrer?.email ||
            "—",

          referrer_code:
            item.referrer_code ||
            item.referrer?.referral_code ||
            "—",
        });
      }
    });

    return rows;
  }, [network]);

  // ========================================================
  // FILTERED REFERRALS
  // ========================================================

  const filteredReferralRows = useMemo(() => {
    const search =
      referralSearchQuery.trim().toLowerCase();

    return referralRows.filter((referral) => {
      const referredName = String(
        referral.referred_name ||
          referral.referred_user_name ||
          referral.referred?.full_name ||
          "",
      ).toLowerCase();

      const referredEmail = String(
        referral.referred_email ||
          referral.referred?.email ||
          "",
      ).toLowerCase();

      const referrerName = String(
        referral.referrer_name ||
          "",
      ).toLowerCase();

      const referrerEmail = String(
        referral.referrer_email ||
          "",
      ).toLowerCase();

      const matchesSearch = search
        ? referredName.includes(search) ||
          referredEmail.includes(search) ||
          referrerName.includes(search) ||
          referrerEmail.includes(search)
        : true;

      const status =
        referral.referral_status ||
        referral.status ||
        "pending";

      const matchesStatus =
        selectedReferralStatus
          ? status === selectedReferralStatus
          : true;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    referralRows,
    referralSearchQuery,
    selectedReferralStatus,
  ]);

  // ========================================================
  // FILTERED / SORTED USERS
  //
  // Newest users first (created_at descending), with optional
  // search (name/email/company) and partner_status filter -
  // so the admin can quickly find who's still pending.
  // ========================================================

  const filteredUsers = useMemo(() => {
    const search = userSearchQuery.trim().toLowerCase();

    return [...users]
      .filter((u) => {
        const matchesSearch = search
          ? String(u.full_name || "")
              .toLowerCase()
              .includes(search) ||
            String(u.email || "")
              .toLowerCase()
              .includes(search) ||
            String(u.company_name || "")
              .toLowerCase()
              .includes(search)
          : true;

        const status = u.partner_status || "pending";

        const matchesStatus = selectedPartnerStatus
          ? status === selectedPartnerStatus
          : true;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = a.created_at
          ? new Date(a.created_at).getTime()
          : 0;

        const dateB = b.created_at
          ? new Date(b.created_at).getTime()
          : 0;

        return dateB - dateA;
      });
  }, [users, userSearchQuery, selectedPartnerStatus]);

  // ========================================================
  // REFRESH CLAIMS
  // ========================================================

  const refreshClaims = async () => {
    try {
      setClaimsError("");

      const response = await fetch(
        "/api/admin/claims",
        {
          cache: "no-store",
        },
      );

      const data =
        await response
          .json()
          .catch(() => ({}));

      console.log(
        "REFRESH CLAIMS RESPONSE:",
        data,
      );

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            `Claims API returned ${response.status}`,
        );
      }

      let list = [];

      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data.claims)) {
        list = data.claims;
      } else if (
        Array.isArray(
          data?.data?.claims,
        )
      ) {
        list =
          data.data.claims;
      }

      setClaims(list);

      return list;
    } catch (error) {
      console.error(
        "Refresh claims error:",
        error,
      );

      setClaimsError(
        error?.message ||
          "Unable to refresh claims.",
      );

      return [];
    }
  };

  // ========================================================
  // APPROVE / UPDATE CLAIM
  // ========================================================

  const approveClaim = async (
    claimId,
    status,
  ) => {
    if (!claimId) {
      setClaimApprovalError(
        "Claim ID is missing.",
      );
      return;
    }

    if (!status) {
      setClaimApprovalError(
        "Please select a status.",
      );
      return;
    }

    setClaimApprovalError("");
    setClaimApproving(true);

    console.log(
      "UPDATING CLAIM:",
      {
        claimId,
        status,
      },
    );

    try {
      // ====================================================
      // UPDATE CLAIM IN DATABASE
      // ====================================================

      const response =
        await fetch(
          `/api/admin/claims/${claimId}`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              claim_id:
                claimId,
              new_status:
                status,
            }),
            cache: "no-store",
          },
        );

      const result =
        await response
          .json()
          .catch(() => ({}));

      console.log(
        "CLAIM UPDATE RESPONSE:",
        {
          httpStatus:
            response.status,
          ok: response.ok,
          result,
        },
      );

      if (!response.ok) {
        throw new Error(
          result?.error ||
            result?.message ||
            `Unable to update claim (${response.status})`,
        );
      }

      if (
        result?.success === false
      ) {
        throw new Error(
          result?.error ||
            result?.message ||
            "Claim update failed.",
        );
      }

      // ====================================================
      // UPDATE UI IMMEDIATELY
      // ====================================================

      setClaims(
        (prevClaims) =>
          prevClaims.map(
            (claim) =>
              claim.id === claimId
                ? {
                    ...claim,
                    status:
                      status,
                  }
                : claim,
          ),
      );

      // ====================================================
      // SYNC CLAIMS WITH DATABASE
      // ====================================================

      await refreshClaims();

      // ====================================================
      // REFRESH METRICS
      // ====================================================

      try {
        const metricsRes =
          await fetch(
            "/api/admin/metrics",
            {
              cache:
                "no-store",
            },
          );

        const metricsData =
          await metricsRes
            .json()
            .catch(
              () => ({}),
            );

        if (
          metricsRes.ok &&
          metricsData.success
        ) {
          setMetrics(
            metricsData.metrics,
          );
        }
      } catch (error) {
        console.error(
          "Metrics refresh error:",
          error,
        );
      }

      // ====================================================
      // CLOSE MODAL / RESET STATE
      // ====================================================

      setSelectedClaim(null);

      setClaimApprovalStatus(
        "under_review",
      );

      setClaimApprovalError("");

      console.log(
        "CLAIM STATUS UPDATED SUCCESSFULLY:",
        {
          claimId,
          status,
        },
      );
    } catch (error) {
      console.error(
        "CLAIM UPDATE ERROR:",
        error,
      );

      setClaimApprovalError(
        error?.message ||
          "Failed to update claim.",
      );
    } finally {
      setClaimApproving(false);
    }
  };

  // ========================================================
  // APPROVE PARTNER (USERS TABLE)
  // ========================================================

  const handleApprovePartner = async (userId) => {
    if (!userId) return;

    setApprovingUserId(userId);
    setApproveError("");

    console.log("APPROVING PARTNER:", userId);

    try {
      const response = await fetch(
        "/api/admin/approve-partner",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
          cache: "no-store",
        },
      );

      const result = await response.json().catch(() => ({}));

      console.log("APPROVE PARTNER RESPONSE:", {
        httpStatus: response.status,
        ok: response.ok,
        result,
      });

      if (!response.ok) {
        throw new Error(
          result?.error ||
            result?.message ||
            `Unable to approve partner (${response.status})`,
        );
      }

      if (result?.success === false) {
        throw new Error(
          result?.error ||
            result?.message ||
            "Partner approval failed.",
        );
      }

      // ====================================================
      // UPDATE UI IMMEDIATELY
      // ====================================================

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId
            ? { ...u, partner_status: "approved" }
            : u,
        ),
      );

      console.log("PARTNER APPROVED SUCCESSFULLY:", userId);
    } catch (error) {
      console.error("APPROVE PARTNER ERROR:", error);

      setApproveError(
        error?.message || "Failed to approve partner.",
      );
    } finally {
      setApprovingUserId(null);
    }
  };

  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafc]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#12066a] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ========================================================
  // UI
  // ========================================================

  return (
    <main className="min-h-screen bg-[#fafafc] mt-14 pb-24">
      <div className="mx-auto w-full max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-8">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-4xl font-black tracking-tight"
                style={{
                  color: NAVY,
                }}
              >
                Admin Dashboard
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage referrals, track claims, and oversee rewards
              </p>
            </div>
          </div>

          {/* ==================================================
              TABS
          ================================================== */}

          <div className="flex gap-2 border-b border-slate-200">
            {[
              "dashboard",
              "claims",
              "referral-network",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`px-6 py-4 border-b-2 font-bold uppercase text-xs tracking-wider transition-all ${
                  activeTab === tab
                    ? "border-[#12066a] text-[#12066a]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab ===
                "dashboard"
                  ? "Summary"
                  : tab === "claims"
                    ? "Claims"
                    : "Referral Network"}
              </button>
            ))}
          </div>

          {/* ==================================================
              DASHBOARD TAB
          ================================================== */}

          {activeTab ===
            "dashboard" && (
            <div className="space-y-6">

              {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Total Users
                    </p>

                    <p className="text-3xl font-black text-[#12066a] mt-2">
                      {metrics.totalUsers ??
                        0}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Referrers
                    </p>

                    <p className="text-3xl font-black text-[#12066a] mt-2">
                      {metrics.totalReferrers ??
                        0}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Total Referrals
                    </p>

                    <p className="text-3xl font-black text-[#12066a] mt-2">
                      {metrics.totalReferrals ??
                        0}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Pending Claims
                    </p>

                    <p className="text-3xl font-black text-amber-600 mt-2">
                      {metrics.pendingClaims ??
                        0}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Under Review
                    </p>

                    <p className="text-3xl font-black text-orange-600 mt-2">
                      {metrics.underReviewClaims ??
                        0}
                    </p>
                  </div>

                </div>
              )}

              {metrics && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8">

                  <h3
                    className="text-xl font-bold mb-6"
                    style={{
                      color: NAVY,
                    }}
                  >
                    Claim Status Overview
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="text-center p-4 bg-amber-50 border border-amber-100 rounded-xl">
                      <p className="text-2xl font-black text-amber-600">
                        {metrics.pendingClaims ??
                          0}
                      </p>

                      <p className="text-xs font-bold text-amber-700 mt-1">
                        Pending
                      </p>
                    </div>

                    <div className="text-center p-4 bg-orange-50 border border-orange-100 rounded-xl">
                      <p className="text-2xl font-black text-orange-600">
                        {metrics.underReviewClaims ??
                          0}
                      </p>

                      <p className="text-xs font-bold text-orange-700 mt-1">
                        Under Review
                      </p>
                    </div>

                    <div className="text-center p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <p className="text-2xl font-black text-emerald-600">
                        {metrics.approvedClaims ??
                          0}
                      </p>

                      <p className="text-xs font-bold text-emerald-700 mt-1">
                        Approved
                      </p>
                    </div>

                    <div className="text-center p-4 bg-red-50 border border-red-100 rounded-xl">
                      <p className="text-2xl font-black text-red-600">
                        {metrics.rejectedClaims ??
                          0}
                      </p>

                      <p className="text-xs font-bold text-red-700 mt-1">
                        Rejected
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {metrics && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8">

                  <h3
                    className="text-xl font-bold mb-6"
                    style={{
                      color: NAVY,
                    }}
                  >
                    Reward Amounts
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <p className="text-xs font-bold text-emerald-700 uppercase">
                        Claimed
                      </p>

                      <p className="text-3xl font-black text-emerald-600 mt-2">
                        £
                        {Number(
                          metrics.totalClaimedAmount ||
                            0,
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="p-6 bg-amber-50 border border-amber-100 rounded-xl">
                      <p className="text-xs font-bold text-amber-700 uppercase">
                        Pending
                      </p>

                      <p className="text-3xl font-black text-amber-600 mt-2">
                        £
                        {Number(
                          metrics.totalPendingAmount ||
                            0,
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                      <p className="text-xs font-bold text-blue-700 uppercase">
                        Approved
                      </p>

                      <p className="text-3xl font-black text-blue-600 mt-2">
                        £
                        {Number(
                          metrics.totalApprovedAmount ||
                            0,
                        ).toLocaleString()}
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* ==================================================
              CLAIMS TAB
          ================================================== */}

          {activeTab ===
            "claims" && (
            <div className="space-y-6">

              <div className="flex flex-wrap gap-2">
                {[
                  "pending",
                  "under_review",
                  "approved",
                  "rejected",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      setSelectedClaimStatus(
                        selectedClaimStatus ===
                          status
                          ? null
                          : status,
                      )
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedClaimStatus ===
                      status
                        ? "bg-[#12066a] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {status.replace(
                      "_",
                      " ",
                    )}
                  </button>
                ))}
              </div>

              {claimsError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm font-bold text-red-700">
                    Claims API Error
                  </p>

                  <p className="text-xs text-red-600 mt-1">
                    {claimsError}
                  </p>
                </div>
              )}

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">

                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Claimant
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Service
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Amount
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Status
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Submitted
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-600">
                          Action
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {claims
                        .filter((claim) =>
                          selectedClaimStatus
                            ? claim.status ===
                              selectedClaimStatus
                            : true,
                        )
                        .map((claim) => (
                          <tr
                            key={claim.id}
                            className="hover:bg-slate-50 transition-colors"
                          >

                            <td className="px-6 py-4">
                              <div className="text-sm font-bold text-slate-800">
                                {claim.profiles?.full_name ||
                                  claim.full_name ||
                                  "Unknown"}
                              </div>

                              <div className="text-xs text-slate-500">
                                {claim.profiles?.email ||
                                  claim.email ||
                                  "—"}
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <div className="text-sm font-bold text-slate-700">
                                {claim.service_name ||
                                  "—"}
                              </div>

                              <div className="text-xs text-slate-500">
                                {claim.company_name ||
                                  "—"}
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <span className="font-black text-[#12066a]">
                                £
                                {Number(
                                  claim.amount ||
                                    0,
                                ).toLocaleString()}
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase ${
                                  claim.status ===
                                  "approved"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : claim.status ===
                                        "rejected"
                                      ? "bg-red-50 text-red-600"
                                      : claim.status ===
                                          "under_review"
                                        ? "bg-orange-50 text-orange-700"
                                        : "bg-amber-50 text-amber-700"
                                }`}
                              >
                                {claim.status ||
                                  "pending"}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-xs text-slate-500">
                              {claim.created_at
                                ? new Date(
                                    claim.created_at,
                                  ).toLocaleDateString(
                                    "en-GB",
                                  )
                                : "—"}
                            </td>

                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedClaim(
                                    claim,
                                  );

                                  setClaimApprovalStatus(
                                    claim.status ||
                                      "under_review",
                                  );

                                  setClaimApprovalError(
                                    "",
                                  );
                                }}
                                className="text-[#12066a] text-xs font-black hover:underline"
                              >
                                View
                              </button>
                            </td>

                          </tr>
                        ))}

                    </tbody>
                  </table>
                </div>

                {claims.filter((c) =>
                  selectedClaimStatus
                    ? c.status ===
                      selectedClaimStatus
                    : true,
                ).length === 0 && (
                  <div className="p-8 text-center text-slate-500">
                    No claims found
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ==================================================
              REFERRAL NETWORK TAB
          ================================================== */}

          {activeTab ===
            "referral-network" && (
            <div className="space-y-6">

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={referralSearchQuery}
                  onChange={(e) =>
                    setReferralSearchQuery(
                      e.target.value,
                    )
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#12066a]/20"
                />

                <div className="flex flex-wrap gap-2">
                  {[
                    "pending",
                    "completed",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        setSelectedReferralStatus(
                          selectedReferralStatus ===
                            status
                            ? null
                            : status,
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        selectedReferralStatus ===
                        status
                          ? "bg-[#12066a] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

              </div>

              {networkError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm font-bold text-red-700">
                    Referral Network API Error
                  </p>

                  <p className="text-xs text-red-600 mt-1">
                    {networkError}
                  </p>
                </div>
              )}

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">

                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Referrer
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Referred User
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Date
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                          Status
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-600">
                          Action
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {filteredReferralRows.map(
                        (referral) => {
                          const referredName =
                            referral.referred_name ||
                            referral.referred_user_name ||
                            referral.referred?.full_name ||
                            "Unknown";

                          const referredEmail =
                            referral.referred_email ||
                            referral.referred?.email ||
                            "—";

                          const status =
                            referral.referral_status ||
                            referral.status ||
                            "completed";

                          return (
                            <tr
                              key={
                                referral.id
                              }
                              className="hover:bg-slate-50 transition-colors"
                            >

                              <td className="px-6 py-4">
                                <div className="text-sm font-bold text-slate-800">
                                  {referral.referrer_name ||
                                    "Unknown"}
                                </div>

                                <div className="text-xs text-slate-500">
                                  {referral.referrer_email ||
                                    "—"}
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <div className="text-sm font-bold text-slate-800">
                                  {referredName}
                                </div>

                                <div className="text-xs text-slate-500">
                                  {referredEmail}
                                </div>
                              </td>

                              <td className="px-6 py-4 text-xs text-slate-500">
                                {referral.created_at
                                  ? new Date(
                                      referral.created_at,
                                    ).toLocaleDateString(
                                      "en-GB",
                                    )
                                  : "—"}
                              </td>

                              <td className="px-6 py-4">
                                <span
                                  className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase ${
                                    status ===
                                    "completed"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-amber-50 text-amber-700"
                                  }`}
                                >
                                  {status}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() =>
                                    setSelectedReferral(
                                      {
                                        ...referral,
                                        referred_name:
                                          referredName,
                                        referred_email:
                                          referredEmail,
                                        referral_status:
                                          status,
                                      },
                                    )
                                  }
                                  className="text-[#12066a] text-xs font-black hover:underline"
                                >
                                  Details
                                </button>
                              </td>

                            </tr>
                          );
                        },
                      )}

                    </tbody>
                  </table>
                </div>

                {filteredReferralRows.length ===
                  0 && (
                  <div className="p-8 text-center text-slate-500">
                    No referrals found
                  </div>
                )}

              </div>

              {/* ==================================================
                  USERS
              ================================================== */}

              <div className="border-t border-slate-200 pt-8">

                <h2
                  className="text-2xl font-black mb-6"
                  style={{
                    color: NAVY,
                  }}
                >
                  Registered Users
                </h2>

                {usersError && (
                  <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm font-bold text-red-700">
                      Users API Error
                    </p>

                    <p className="text-xs text-red-600 mt-1">
                      {usersError}
                    </p>
                  </div>
                )}

                {approveError && (
                  <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm font-bold text-red-700">
                      Partner Approval Error
                    </p>

                    <p className="text-xs text-red-600 mt-1">
                      {approveError}
                    </p>
                  </div>
                )}

                <div className="space-y-4 mb-4">

                  <input
                    type="text"
                    placeholder="Search by name, email or company..."
                    value={userSearchQuery}
                    onChange={(e) =>
                      setUserSearchQuery(e.target.value)
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#12066a]/20"
                  />

                  <div className="flex flex-wrap gap-2">
                    {["pending", "approved"].map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          setSelectedPartnerStatus(
                            selectedPartnerStatus === status
                              ? null
                              : status,
                          )
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                          selectedPartnerStatus === status
                            ? "bg-[#12066a] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px]">

                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>

                          <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                            Name
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600">
                            Company
                          </th>

                          <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-600">
                            Role
                          </th>

                          <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-600">
                            Referrals
                          </th>

                          <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-600">
                            Claims
                          </th>

                          <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-600">
                            Amount
                          </th>

                          <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-600">
                            Partner Status
                          </th>

                          <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-600">
                            Action
                          </th>

                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">

                        {filteredUsers.map(
                          (user) => (
                            <tr
                              key={
                                user.id
                              }
                              className="hover:bg-slate-50 transition-colors"
                            >

                              <td className="px-6 py-4">
                                <div className="text-sm font-bold text-slate-800">
                                  {user.full_name ||
                                    "—"}
                                </div>

                                <div className="text-xs text-slate-500">
                                  {user.email ||
                                    "—"}
                                </div>
                              </td>

                              <td className="px-6 py-4">
                                <div className="text-sm text-slate-700">
                                  {user.company_name ||
                                    "—"}
                                </div>
                              </td>

                              <td className="px-6 py-4 text-center">
                                <span className="px-2 py-1 rounded-full text-[9px] font-black bg-slate-100 text-slate-600">
                                  {user.role ||
                                    "user"}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-center">
                                <span className="font-bold text-[#12066a]">
                                  {user.referral_count ??
                                    0}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-center">
                                <span className="font-bold text-slate-800">
                                  {user.claims
                                    ?.total_claims ??
                                    0}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-right">
                                <span className="font-bold text-[#12066a]">
                                  £
                                  {Number(
                                    user.claims
                                      ?.total_amount ||
                                      0,
                                  ).toLocaleString()}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-center">
                                <span
                                  className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase ${
                                    user.partner_status ===
                                    "approved"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-amber-50 text-amber-700"
                                  }`}
                                >
                                  {user.partner_status ||
                                    "pending"}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-right">
                                {user.partner_status !==
                                "approved" ? (
                                  <button
                                    onClick={() =>
                                      handleApprovePartner(
                                        user.id,
                                      )
                                    }
                                    disabled={
                                      approvingUserId ===
                                      user.id
                                    }
                                    className="px-4 py-2 rounded-xl text-xs font-black uppercase bg-[#12066a] text-white hover:bg-[#0d0452] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                  >
                                    {approvingUserId ===
                                    user.id
                                      ? "Approving..."
                                      : "Approve"}
                                  </button>
                                ) : (
                                  <span className="text-xs font-bold text-emerald-600">
                                    ✓ Approved
                                  </span>
                                )}
                              </td>

                            </tr>
                          ),
                        )}

                      </tbody>
                    </table>
                  </div>

                  {filteredUsers.length ===
                    0 && (
                    <div className="p-8 text-center text-slate-500">
                      No users found
                    </div>
                  )}

                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ======================================================
          REFERRAL DETAIL MODAL
      ====================================================== */}

      {selectedReferral && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-[#12066a]/30 backdrop-blur-sm"
          onClick={() =>
            setSelectedReferral(null)
          }
        >
          <div
            data-modal-scroll
            data-lenis-prevent
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain"
            style={{
              WebkitOverflowScrolling:
                "touch",
              overscrollBehavior:
                "contain",
              touchAction:
                "pan-y",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="p-8 space-y-6">

              <div className="flex items-center justify-between">

                <h2
                  className="text-2xl font-black"
                  style={{
                    color: NAVY,
                  }}
                >
                  Referral Details
                </h2>

                <button
                  onClick={() =>
                    setSelectedReferral(
                      null,
                    )
                  }
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>

              </div>

              {/* Referrer */}

              <div className="border-t border-slate-200 pt-4">

                <h3 className="font-bold text-slate-800 mb-3">
                  Referrer
                </h3>

                <div className="space-y-2 text-sm bg-slate-50 p-4 rounded-lg">

                  <div>
                    <span className="text-slate-600 font-bold">
                      Name:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedReferral.referrer_name ||
                        "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Email:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedReferral.referrer_email ||
                        "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Referral Code:{" "}
                    </span>

                    <code className="bg-white px-2 py-1 rounded text-[#12066a] font-bold">
                      {selectedReferral.referrer_code ||
                        "—"}
                    </code>
                  </div>

                </div>
              </div>

              {/* Referred User */}

              <div className="border-t border-slate-200 pt-4">

                <h3 className="font-bold text-slate-800 mb-3">
                  Referred User
                </h3>

                <div className="space-y-2 text-sm bg-emerald-50 p-4 rounded-lg">

                  <div>
                    <span className="text-slate-600 font-bold">
                      Name:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedReferral.referred_name ||
                        "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Email:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedReferral.referred_email ||
                        "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Company:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedReferral.referred_company ||
                        "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Onboarding:{" "}
                    </span>

                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        selectedReferral.referred_onboarding_completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {selectedReferral.referred_onboarding_completed
                        ? "Completed"
                        : "Pending"}
                    </span>
                  </div>

                </div>
              </div>

              {/* Referral Info */}

              <div className="border-t border-slate-200 pt-4">

                <h3 className="font-bold text-slate-800 mb-3">
                  Referral
                </h3>

                <div className="space-y-2 text-sm bg-slate-50 p-4 rounded-lg">

                  <div>
                    <span className="text-slate-600 font-bold">
                      Referral ID:{" "}
                    </span>

                    <code className="text-[#12066a] font-mono break-all">
                      {selectedReferral.id ||
                        "—"}
                    </code>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Date:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedReferral.created_at
                        ? new Date(
                            selectedReferral.created_at,
                          ).toLocaleDateString(
                            "en-GB",
                          )
                        : "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Status:{" "}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black ${
                        selectedReferral.referral_status ===
                        "completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {selectedReferral.referral_status ||
                        "pending"}
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          CLAIM DETAIL MODAL
      ====================================================== */}

      {selectedClaim && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-[#12066a]/30 backdrop-blur-sm"
          onClick={() =>
            setSelectedClaim(null)
          }
        >
          <div
            data-modal-scroll
            data-lenis-prevent
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain"
            style={{
              WebkitOverflowScrolling:
                "touch",
              overscrollBehavior:
                "contain",
              touchAction:
                "pan-y",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="p-8 space-y-6">

              <div className="flex items-center justify-between">

                <h2
                  className="text-2xl font-black"
                  style={{
                    color: NAVY,
                  }}
                >
                  Claim Details
                </h2>

                <button
                  onClick={() =>
                    setSelectedClaim(
                      null,
                    )
                  }
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>

              </div>

              {/* Claim Info */}

              <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100">

                <div className="flex justify-between gap-4">

                  <span className="text-sm font-bold text-slate-600">
                    Claim ID
                  </span>

                  <span className="text-sm text-slate-800 font-mono break-all text-right">
                    {selectedClaim.id}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-sm font-bold text-slate-600">
                    Amount
                  </span>

                  <span className="text-lg font-black text-[#12066a]">
                    £
                    {Number(
                      selectedClaim.amount ||
                        0,
                    ).toLocaleString()}
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-sm font-bold text-slate-600">
                    Status
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black ${
                      selectedClaim.status ===
                      "approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : selectedClaim.status ===
                            "rejected"
                          ? "bg-red-50 text-red-600"
                          : selectedClaim.status ===
                              "under_review"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {selectedClaim.status}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-sm font-bold text-slate-600">
                    Submitted
                  </span>

                  <span className="text-sm text-slate-800">
                    {selectedClaim.created_at
                      ? new Date(
                          selectedClaim.created_at,
                        ).toLocaleDateString(
                          "en-GB",
                        )
                      : "—"}
                  </span>

                </div>

              </div>

              {/* Service Details */}

              <div className="border-t border-slate-200 pt-4">

                <h3 className="font-bold text-slate-800 mb-3">
                  Service Details
                </h3>

                <div className="space-y-2 text-sm">

                  <div>
                    <span className="text-slate-600 font-bold">
                      Service:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedClaim.service_name ||
                        "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Company:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedClaim.company_name ||
                        "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Contact:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedClaim.contact_name ||
                        "—"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-600 font-bold">
                      Phone:{" "}
                    </span>

                    <span className="text-slate-800">
                      {selectedClaim.phone ||
                        "—"}
                    </span>
                  </div>

                </div>
              </div>

              {/* Notes */}

              {selectedClaim.notes && (
                <div className="border-t border-slate-200 pt-4">

                  <h3 className="font-bold text-slate-800 mb-2">
                    Claimant Notes
                  </h3>

                  <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap">
                    {selectedClaim.notes}
                  </p>

                </div>
              )}

              {/* ==================================================
                  ADMIN ACTIONS
              ================================================== */}

              {selectedClaim.status !==
                "approved" &&
                selectedClaim.status !==
                  "rejected" && (
                <div className="border-t border-slate-200 pt-4">

                  <h3 className="font-bold text-slate-800 mb-3">
                    Admin Actions
                  </h3>

                  <div className="space-y-4">

                    <div>

                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase">
                        Update Status
                      </label>

                      <select
                        value={
                          claimApprovalStatus
                        }
                        onChange={(e) => {
                          setClaimApprovalStatus(
                            e.target
                              .value,
                          );

                          setClaimApprovalError(
                            "",
                          );
                        }}
                        disabled={
                          claimApproving
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold bg-white disabled:bg-slate-100"
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="under_review">
                          Under Review
                        </option>

                        <option value="approved">
                          Approved
                        </option>

                        <option value="rejected">
                          Rejected
                        </option>

                      </select>

                    </div>

                    {claimApprovalError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">

                        <p className="text-xs font-black uppercase text-red-700">
                          Update Failed
                        </p>

                        <p className="text-sm font-bold text-red-600 mt-1">
                          {
                            claimApprovalError
                          }
                        </p>

                      </div>
                    )}

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          approveClaim(
                            selectedClaim.id,
                            claimApprovalStatus,
                          )
                        }
                        disabled={
                          claimApproving
                        }
                        className="flex-1 px-4 py-3 bg-[#12066a] text-white font-bold rounded-lg hover:bg-[#0d0452] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {claimApproving
                          ? "Updating..."
                          : "Update Claim"}
                      </button>

                      <button
                        onClick={() =>
                          setSelectedClaim(
                            null,
                          )
                        }
                        disabled={
                          claimApproving
                        }
                        className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </main>
  );
}
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";

// ============================================================
// ADMIN CLIENT
// ============================================================

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
  }

  return createSupabaseAdmin(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ============================================================
// VERIFY ADMIN
// ============================================================

async function verifyAdmin(supabase, userId) {
  if (!userId) return false;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Admin verification error:", error);
    return false;
  }

  return profile?.role === "admin";
}

// ============================================================
// GET - Dashboard Metrics
// ============================================================

export async function GET(request) {
  try {
    // ========================================================
    // AUTH
    // ========================================================

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    // ========================================================
    // ADMIN CHECK
    // ========================================================

    const isAdmin = await verifyAdmin(supabase, user.id);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const adminSupabase = getAdminClient();

    // ========================================================
    // RUN ALL INDEPENDENT QUERIES IN PARALLEL
    // ========================================================

    const [
      allUsersResult,
      approvedPartnersResult,
      pendingPartnerApprovalsResult,
      referrersResult,
      allReferralsResult,
      clientsResult,
      pendingClaimsResult,
      underReviewClaimsResult,
      approvedClaimsResult,
      rejectedClaimsResult,
      claimedRewardsResult,
      pendingRewardsResult,
      approvedRewardsResult,
    ] = await Promise.all([
      // ------------------------------------------------------
      // USERS
      // ------------------------------------------------------

      adminSupabase
        .from("profiles")
        .select("id", {
          count: "exact",
          head: true,
        }),

      // ------------------------------------------------------
      // APPROVED PARTNERS
      // ------------------------------------------------------

      adminSupabase
        .from("profiles")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("partner_status", "approved"),

      // ------------------------------------------------------
      // PENDING PARTNER APPROVALS
      // ------------------------------------------------------

      adminSupabase
        .from("profiles")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("partner_status", "pending"),

      // ------------------------------------------------------
      // REFERRERS
      // ------------------------------------------------------

      adminSupabase
        .from("referrals")
        .select("referrer_id"),

      // ------------------------------------------------------
      // ALL REFERRALS
      // ------------------------------------------------------

      adminSupabase
        .from("referrals")
        .select("id", {
          count: "exact",
          head: true,
        }),

      // ------------------------------------------------------
      // CLIENT CONVERSIONS
      // ------------------------------------------------------

      adminSupabase
        .from("referrals")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", "completed"),

      // ------------------------------------------------------
      // PENDING CLAIMS
      // ------------------------------------------------------

      adminSupabase
        .from("reward_claims")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", "pending"),

      // ------------------------------------------------------
      // UNDER REVIEW CLAIMS
      // ------------------------------------------------------

      adminSupabase
        .from("reward_claims")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", "under_review"),

      // ------------------------------------------------------
      // APPROVED CLAIMS
      // ------------------------------------------------------

      adminSupabase
        .from("reward_claims")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", "approved"),

      // ------------------------------------------------------
      // REJECTED CLAIMS
      // ------------------------------------------------------

      adminSupabase
        .from("reward_claims")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("status", "rejected"),

      // ------------------------------------------------------
      // CLAIMED REWARD AMOUNTS
      // ------------------------------------------------------

      adminSupabase
        .from("reward_claims")
        .select("amount")
        .in("status", [
          "approved",
          "completed",
          "claimed",
        ]),

      // ------------------------------------------------------
      // PENDING REWARD AMOUNTS
      // ------------------------------------------------------

      adminSupabase
        .from("reward_claims")
        .select("amount")
        .in("status", [
          "pending",
          "under_review",
        ]),

      // ------------------------------------------------------
      // APPROVED REWARD AMOUNTS
      // ------------------------------------------------------

      adminSupabase
        .from("reward_claims")
        .select("amount")
        .eq("status", "approved"),
    ]);

    // ========================================================
    // CHECK QUERY ERRORS
    // ========================================================

    if (allUsersResult.error) {
      console.error(
        "Users metrics error:",
        allUsersResult.error,
      );
    }

    if (approvedPartnersResult.error) {
      console.error(
        "Approved partners metrics error:",
        approvedPartnersResult.error,
      );
    }

    if (pendingPartnerApprovalsResult.error) {
      console.error(
        "Pending partners metrics error:",
        pendingPartnerApprovalsResult.error,
      );
    }

    if (referrersResult.error) {
      console.error(
        "Referrers metrics error:",
        referrersResult.error,
      );
    }

    if (allReferralsResult.error) {
      console.error(
        "Referrals metrics error:",
        allReferralsResult.error,
      );
    }

    if (clientsResult.error) {
      console.error(
        "Clients metrics error:",
        clientsResult.error,
      );
    }

    if (pendingClaimsResult.error) {
      console.error(
        "Pending claims metrics error:",
        pendingClaimsResult.error,
      );
    }

    if (underReviewClaimsResult.error) {
      console.error(
        "Under review claims metrics error:",
        underReviewClaimsResult.error,
      );
    }

    if (approvedClaimsResult.error) {
      console.error(
        "Approved claims metrics error:",
        approvedClaimsResult.error,
      );
    }

    if (rejectedClaimsResult.error) {
      console.error(
        "Rejected claims metrics error:",
        rejectedClaimsResult.error,
      );
    }

    // ========================================================
    // REFERRERS
    // ========================================================

    const uniqueReferrers = new Set(
      (referrersResult.data || [])
        .map((referral) => referral.referrer_id)
        .filter(Boolean),
    ).size;

    // ========================================================
    // REWARD AMOUNTS
    // ========================================================

    const totalClaimedAmount = (
      claimedRewardsResult.data || []
    ).reduce(
      (sum, claim) =>
        sum + Number(claim.amount || 0),
      0,
    );

    const totalPendingAmount = (
      pendingRewardsResult.data || []
    ).reduce(
      (sum, claim) =>
        sum + Number(claim.amount || 0),
      0,
    );

    const totalApprovedAmount = (
      approvedRewardsResult.data || []
    ).reduce(
      (sum, claim) =>
        sum + Number(claim.amount || 0),
      0,
    );

    // ========================================================
    // RETURN METRICS
    // ========================================================

    return NextResponse.json(
      {
        success: true,

        metrics: {
          // Users
          totalUsers: allUsersResult.count || 0,

          // Partner approvals
          pendingPartnerApprovals:
            pendingPartnerApprovalsResult.count || 0,

          approvedPartners:
            approvedPartnersResult.count || 0,

          // Referrals
          totalReferrers: uniqueReferrers,

          totalReferrals:
            allReferralsResult.count || 0,

          convertedClients:
            clientsResult.count || 0,

          // Claims
          pendingClaims:
            pendingClaimsResult.count || 0,

          underReviewClaims:
            underReviewClaimsResult.count || 0,

          approvedClaims:
            approvedClaimsResult.count || 0,

          rejectedClaims:
            rejectedClaimsResult.count || 0,

          // Reward amounts
          totalClaimedAmount,

          totalPendingAmount,

          totalApprovedAmount,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Admin metrics API error:",
      error,
    );

    return NextResponse.json(
      {
        error: "Server error",
        details:
          error?.message ||
          "Unknown error",
      },
      { status: 500 },
    );
  }
}
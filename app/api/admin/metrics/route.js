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

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  return profile?.role === "admin";
}

// ============================================================
// GET - Dashboard Metrics
// ============================================================

export async function GET(request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = await verifyAdmin(supabase, user.id);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const adminSupabase = getAdminClient();

    // ========================================================
    // USERS
    // ========================================================

    const { data: allUsers } = await adminSupabase
      .from("profiles")
      .select("id", {
        count: "exact",
      });

    // ========================================================
    // APPROVED PARTNERS
    // ========================================================

    const { data: approvedPartners } = await adminSupabase
      .from("profiles")
      .select("id", {
        count: "exact",
      })
      .eq("partner_status", "approved");

    // ========================================================
    // PENDING PARTNER APPROVALS (New Addition)
    // ========================================================

    const { data: pendingPartnerApprovals } = await adminSupabase
      .from("profiles")
      .select("id", {
        count: "exact",
      })
      .eq("partner_status", "pending"); // Agar column ka naam 'status' ki jagah kuch aur hai (jaise 'partner_status'), toh yahan change kar lein

    // ========================================================
    // REFERRERS
    // ========================================================

    const { data: referrers } = await adminSupabase
      .from("referrals")
      .select("referrer_id", {
        count: "exact",
      });

    const uniqueReferrers = new Set((referrers || []).map((r) => r.referrer_id))
      .size;

    // ========================================================
    // REFERRALS
    // ========================================================

    const { data: allReferrals } = await adminSupabase
      .from("referrals")
      .select("id", {
        count: "exact",
      });

    // ========================================================
    // CLIENT CONVERSIONS
    // ========================================================
    const { data: clients } = await adminSupabase
      .from("referrals")
      .select("id")
      .eq("status", "completed");

    // ========================================================
    // CLAIMS BY STATUS
    // ========================================================

    const { data: pendingClaims } = await adminSupabase
      .from("reward_claims")
      .select("id", {
        count: "exact",
      })
      .eq("status", "pending");

    const { data: underReviewClaims } = await adminSupabase
      .from("reward_claims")
      .select("id", {
        count: "exact",
      })
      .eq("status", "under_review");

    const { data: approvedClaims } = await adminSupabase
      .from("reward_claims")
      .select("id", {
        count: "exact",
      })
      .eq("status", "approved");

    const { data: rejectedClaims } = await adminSupabase
      .from("reward_claims")
      .select("id", {
        count: "exact",
      })
      .eq("status", "rejected");

    // ========================================================
    // REWARD AMOUNTS
    // ========================================================

    const { data: claimedRewards } = await adminSupabase
      .from("reward_claims")
      .select("amount")
      .in("status", ["approved", "completed", "claimed"]);

    const totalClaimedAmount = (claimedRewards || []).reduce(
      (sum, claim) => sum + Number(claim.amount || 0),
      0,
    );

    const { data: pendingRewards } = await adminSupabase
      .from("reward_claims")
      .select("amount")
      .in("status", ["pending", "under_review"]);

    const totalPendingAmount = (pendingRewards || []).reduce(
      (sum, claim) => sum + Number(claim.amount || 0),
      0,
    );

    const { data: approvedRewards } = await adminSupabase
      .from("reward_claims")
      .select("amount")
      .eq("status", "approved");

    const totalApprovedAmount = (approvedRewards || []).reduce(
      (sum, claim) => sum + Number(claim.amount || 0),
      0,
    );

    return NextResponse.json(
      {
        success: true,
        metrics: {
          totalUsers: allUsers?.length || 0,
          pendingPartnerApprovals: pendingPartnerApprovals?.length || 0, // <-- Yahan add kar diya hai
          totalReferrers: uniqueReferrers,
          totalReferrals: allReferrals?.length || 0,
          convertedClients: clients?.length || 0,
          pendingClaims: pendingClaims?.length || 0,
          underReviewClaims: underReviewClaims?.length || 0,
          approvedClaims: approvedClaims?.length || 0,
          rejectedClaims: rejectedClaims?.length || 0,

          approvedPartners: approvedPartners?.length || 0,
          totalClaimedAmount,
          totalPendingAmount,
          totalApprovedAmount,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Admin metrics API error:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

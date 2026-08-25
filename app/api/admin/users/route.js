import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
  }

  return createSupabaseAdmin(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

async function verifyAdmin(supabase, userId) {
  if (!userId) return false;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error(
      "Admin verification error:",
      error
    );

    return false;
  }

  return profile?.role === "admin";
}

export async function GET() {
  try {
    // ----------------------------------------------------------
    // AUTH
    // ----------------------------------------------------------

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ----------------------------------------------------------
    // ADMIN CHECK
    // ----------------------------------------------------------

    const isAdmin = await verifyAdmin(
      supabase,
      user.id
    );

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const adminSupabase = getAdminClient();

    // ----------------------------------------------------------
    // GET ALL PROFILES
    // ----------------------------------------------------------

    const {
      data: profiles,
      error: profilesError,
    } = await adminSupabase
      .from("profiles")
      .select(`
        id,
        full_name,
        email,
        company_name,
        contact_number,
        role,
        referral_code,
        onboarding_completed,
        partner_status
      `);

    if (profilesError) {
      console.error(
        "Profiles fetch error:",
        profilesError
      );

      return NextResponse.json(
        {
          error: "Unable to fetch users",
          details: profilesError.message,
        },
        { status: 500 }
      );
    }

    // ----------------------------------------------------------
    // GET ALL REFERRALS
    // ----------------------------------------------------------

    const {
      data: referrals,
      error: referralsError,
    } = await adminSupabase
      .from("referrals")
      .select(`
        id,
        referrer_id,
        referred_user_id,
        created_at,
        status
      `);

    if (referralsError) {
      console.error(
        "Referral fetch error:",
        referralsError
      );

      return NextResponse.json(
        {
          error: "Unable to fetch referrals",
          details: referralsError.message,
        },
        { status: 500 }
      );
    }

    // ----------------------------------------------------------
    // GET ALL CLAIMS
    // ----------------------------------------------------------

    const {
      data: claims,
      error: claimsError,
    } = await adminSupabase
      .from("reward_claims")
      .select(`
        id,
        user_id,
        service_name,
        amount,
        status,
        created_at
      `);

    if (claimsError) {
      console.error(
        "Claims fetch error:",
        claimsError
      );

      return NextResponse.json(
        {
          error: "Unable to fetch claims",
          details: claimsError.message,
        },
        { status: 500 }
      );
    }

    // ----------------------------------------------------------
    // REFERRAL COUNT MAP
    // ----------------------------------------------------------

    const referralCountMap = {};

    (referrals || []).forEach((referral) => {
      if (!referralCountMap[referral.referrer_id]) {
        referralCountMap[referral.referrer_id] = 0;
      }

      referralCountMap[referral.referrer_id] += 1;
    });

    // ----------------------------------------------------------
    // CLAIM MAP
    // ----------------------------------------------------------

    const claimsMap = {};

    (claims || []).forEach((claim) => {
      if (!claimsMap[claim.user_id]) {
        claimsMap[claim.user_id] = {
          total_claims: 0,
          total_amount: 0,
          pending_amount: 0,
          approved_amount: 0,
          rejected_amount: 0,
        };
      }

      const amount = Number(
        claim.amount || 0
      );

      claimsMap[claim.user_id].total_claims += 1;

      claimsMap[claim.user_id].total_amount +=
        amount;

      if (
        claim.status === "pending" ||
        claim.status === "under_review"
      ) {
        claimsMap[
          claim.user_id
        ].pending_amount += amount;
      }

      if (claim.status === "approved") {
        claimsMap[
          claim.user_id
        ].approved_amount += amount;
      }

      if (claim.status === "rejected") {
        claimsMap[
          claim.user_id
        ].rejected_amount += amount;
      }
    });

    // ----------------------------------------------------------
    // BUILD USER LIST
    // ----------------------------------------------------------

    const users = (profiles || []).map(
      (profile) => {
        const userReferrals =
          (referrals || []).filter(
            (referral) =>
              referral.referrer_id ===
              profile.id
          );

        const referredBy =
          (referrals || []).find(
            (referral) =>
              referral.referred_user_id ===
              profile.id
          );

        return {
          ...profile,

          // Referral information
          referral_count:
            referralCountMap[profile.id] || 0,

          referred_by_id:
            referredBy?.referrer_id || null,

          referred_by_name:
            referredBy
              ? (
                  profiles || []
                ).find(
                  (p) =>
                    p.id ===
                    referredBy.referrer_id
                )?.full_name || "Unknown"
              : null,

          referred_by_email:
            referredBy
              ? (
                  profiles || []
                ).find(
                  (p) =>
                    p.id ===
                    referredBy.referrer_id
                )?.email || ""
              : null,

          // Claim information
          claims:
            claimsMap[profile.id] || {
              total_claims: 0,
              total_amount: 0,
              pending_amount: 0,
              approved_amount: 0,
              rejected_amount: 0,
            },

          // Direct referrals
          referrals: userReferrals.map(
            (referral) => {
              const referredUser =
                (profiles || []).find(
                  (p) =>
                    p.id ===
                    referral.referred_user_id
                );

              return {
                id: referral.id,
                referred_user_id:
                  referral.referred_user_id,

                referred_name:
                  referredUser
                    ?.full_name ||
                  "Unknown",

                referred_email:
                  referredUser?.email ||
                  "",

                referred_company:
                  referredUser
                    ?.company_name ||
                  "",

                status:
                  referral.status ||
                  "pending",

                created_at:
                  referral.created_at,
              };
            }
          ),
        };
      }
    );

    // ----------------------------------------------------------
    // SUMMARY
    // ----------------------------------------------------------

    const summary = {
      total_users: users.length,

      total_referrals:
        referrals?.length || 0,

      total_claims:
        claims?.length || 0,

      total_pending_claims:
        (claims || []).filter(
          (claim) =>
            claim.status === "pending"
        ).length,

      total_under_review_claims:
        (claims || []).filter(
          (claim) =>
            claim.status === "under_review"
        ).length,

      total_approved_claims:
        (claims || []).filter(
          (claim) =>
            claim.status === "approved"
        ).length,

      total_rejected_claims:
        (claims || []).filter(
          (claim) =>
            claim.status === "rejected"
        ).length,
    };

    return NextResponse.json(
      {
        success: true,
        users,
        summary,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Admin users API error:",
      error
    );

    return NextResponse.json(
      {
        error: "Server error",
        details:
          error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
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
    console.error("Admin verification error:", error);
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
        referral_code,
        role,
        onboarding_completed
      `);

    if (profilesError) {
      console.error(
        "Admin network profiles error:",
        profilesError
      );

      return NextResponse.json(
        {
          error: "Unable to fetch profiles",
          details: profilesError.message,
        },
        { status: 500 }
      );
    }

    // ----------------------------------------------------------
    // CREATE PROFILE MAP
    // ----------------------------------------------------------

    const profileMap = {};

    (profiles || []).forEach((profile) => {
      profileMap[profile.id] = profile;
    });

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
      `)
      .order("created_at", {
        ascending: false,
      });

    if (referralsError) {
      console.error(
        "Admin referrals error:",
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
    // BUILD FULL REFERRAL NETWORK
    // ----------------------------------------------------------

    const network = (referrals || []).map((referral) => {
      const referrer =
        profileMap[referral.referrer_id] || null;

      const referred =
        profileMap[referral.referred_user_id] || null;

      return {
        id: referral.id,

        // Referral record
        created_at: referral.created_at,
        referral_status:
          referral.status || "pending",

        // Referrer
        referrer_id: referral.referrer_id,
        referrer_name:
          referrer?.full_name || "Unknown",
        referrer_email:
          referrer?.email || "",
        referrer_company:
          referrer?.company_name || "",
        referrer_contact:
          referrer?.contact_number || "",
        referrer_referral_code:
          referrer?.referral_code || "",

        // Referred user
        referred_user_id:
          referral.referred_user_id,
        referred_name:
          referred?.full_name || "Unknown",
        referred_email:
          referred?.email || "",
        referred_company:
          referred?.company_name || "",
        referred_contact:
          referred?.contact_number || "",
        referred_role:
          referred?.role || "",
        referred_onboarding_completed:
          referred?.onboarding_completed || false,
      };
    });

    // ----------------------------------------------------------
    // SUMMARY
    // ----------------------------------------------------------

    const summary = {
      total_referrals: network.length,

      pending_referrals: network.filter(
        (item) =>
          item.referral_status === "pending"
      ).length,

      completed_referrals: network.filter(
        (item) =>
          item.referral_status === "completed"
      ).length,

      unique_referrers: new Set(
        network.map(
          (item) => item.referrer_id
        )
      ).size,

      unique_referred_users: new Set(
        network.map(
          (item) => item.referred_user_id
        )
      ).size,
    };

    return NextResponse.json(
      {
        success: true,
        network,
        summary,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Admin referral network API error:",
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
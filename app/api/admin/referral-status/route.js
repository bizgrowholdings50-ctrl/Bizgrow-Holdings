import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";

// ============================================================
// ADMIN CLIENT
// ============================================================

function getAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing."
    );
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
// POST - Update Referral Status
// ============================================================

export async function POST(request) {
  try {
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

    const adminSupabase =
      getAdminClient();

    let body;

    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const {
      referred_user_id,
      referral_status,
    } = body || {};

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!referred_user_id) {
      return NextResponse.json(
        { error: "referred_user_id is required" },
        { status: 400 }
      );
    }

    const validStatuses = [
      "referred",
      "contacted",
      "qualified",
      "client",
      "not_converted",
    ];

    if (
      !referral_status ||
      !validStatuses.includes(
        referral_status
      )
    ) {
      return NextResponse.json(
        {
          error: `referral_status must be one of: ${validStatuses.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // ========================================================
    // UPDATE PROFILE
    // ========================================================

    const {
      data: updatedProfile,
      error: updateError,
    } = await adminSupabase
      .from("profiles")
      .update({
        referral_status,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", referred_user_id)
      .select(
        "id, full_name, email, referral_status"
      )
      .single();

    if (updateError) {
      console.error(
        "Referral status update error:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            "Unable to update referral status",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // LOG AUDIT
    // ========================================================

    console.log(
      "==== REFERRAL STATUS UPDATE ===="
    );
    console.log({
      referredUserId:
        referred_user_id,
      newStatus: referral_status,
      adminId: user.id,
      timestamp: new Date().toISOString(),
    });
    console.log(
      "================================"
    );

    return NextResponse.json(
      {
        success: true,
        profile: updatedProfile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Admin referral status API error:",
      error
    );

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

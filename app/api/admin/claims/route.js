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
// GET - LIST ALL CLAIMS
// ============================================================

export async function GET(request) {
  try {
    // --------------------------------------------------------
    // AUTHENTICATED CLIENT
    // --------------------------------------------------------

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------------
    // ADMIN CHECK
    // --------------------------------------------------------

    const isAdmin = await verifyAdmin(
      supabase,
      user.id
    );

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: "Admin access required",
        },
        { status: 403 }
      );
    }

    // --------------------------------------------------------
    // SERVICE ROLE CLIENT
    // --------------------------------------------------------

    const adminSupabase = getAdminClient();

    // --------------------------------------------------------
    // URL PARAMETERS
    // --------------------------------------------------------

    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const userId = searchParams.get("user_id");

    const allowedSortColumns = [
      "created_at",
      "updated_at",
      "amount",
      "status",
      "service_name",
      "company_name",
    ];

    const requestedSort = searchParams.get("sort_by");

    const sortBy = allowedSortColumns.includes(
      requestedSort
    )
      ? requestedSort
      : "created_at";

    const sortOrder =
      searchParams.get("sort_order") === "asc"
        ? "asc"
        : "desc";

    // --------------------------------------------------------
    // GET CLAIMS
    // IMPORTANT:
    // Do NOT use Supabase nested profiles relationship here.
    // Fetch claims first, then profiles separately.
    // --------------------------------------------------------

    let claimsQuery = adminSupabase
      .from("reward_claims")
      .select(`
        id,
        user_id,
        service_name,
        company_name,
        contact_name,
        phone,
        email,
        notes,
        amount,
        status,
        created_at,
        updated_at
      `);

    if (status) {
      claimsQuery = claimsQuery.eq(
        "status",
        status
      );
    }

    if (userId) {
      claimsQuery = claimsQuery.eq(
        "user_id",
        userId
      );
    }

    claimsQuery = claimsQuery.order(sortBy, {
      ascending: sortOrder === "asc",
    });

    const {
      data: claims,
      error: claimsError,
    } = await claimsQuery;

    if (claimsError) {
      console.error(
        "================================="
      );
      console.error(
        "REWARD CLAIMS FETCH ERROR"
      );
      console.error(
        "Message:",
        claimsError.message
      );
      console.error(
        "Details:",
        claimsError.details
      );
      console.error(
        "Hint:",
        claimsError.hint
      );
      console.error(
        "Code:",
        claimsError.code
      );
      console.error(
        "================================="
      );

      return NextResponse.json(
        {
          success: false,
          error: "Unable to fetch claims",
          details: claimsError.message,
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------------
    // GET PROFILE IDS
    // --------------------------------------------------------

    const userIds = [
      ...new Set(
        (claims || [])
          .map((claim) => claim.user_id)
          .filter(Boolean)
      ),
    ];

    let profiles = [];

    if (userIds.length > 0) {
      const {
        data: profileData,
        error: profilesError,
      } = await adminSupabase
        .from("profiles")
        .select(
          "id, full_name, email, company_name"
        )
        .in("id", userIds);

      if (profilesError) {
        console.error(
          "Profiles fetch error:",
          profilesError
        );

        // Don't fail the whole claims request.
        profiles = [];
      } else {
        profiles = profileData || [];
      }
    }

    // --------------------------------------------------------
    // CREATE PROFILE MAP
    // --------------------------------------------------------

    const profileMap = new Map(
      profiles.map((profile) => [
        profile.id,
        profile,
      ])
    );

    // --------------------------------------------------------
    // MERGE CLAIM + PROFILE DATA
    // --------------------------------------------------------

    const formattedClaims = (
      claims || []
    ).map((claim) => {
      const profile = profileMap.get(
        claim.user_id
      );

      return {
        ...claim,

        profiles: profile
          ? {
              id: profile.id,
              full_name: profile.full_name,
              email:
                profile.email ||
                claim.email ||
                null,
              company_name:
                profile.company_name ||
                claim.company_name ||
                null,
            }
          : {
              id: claim.user_id,
              full_name: null,
              email: claim.email || null,
              company_name:
                claim.company_name || null,
            },
      };
    });

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        claims: formattedClaims,
        count: formattedClaims.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "================================="
    );
    console.error(
      "ADMIN CLAIMS API ERROR"
    );
    console.error(error);
    console.error(
      "================================="
    );

    return NextResponse.json(
      {
        success: false,
        error: "Server error",
        details:
          error?.message ||
          "Unknown server error",
      },
      { status: 500 }
    );
  }
}
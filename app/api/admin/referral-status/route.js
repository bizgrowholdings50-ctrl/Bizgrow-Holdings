import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { Resend } from "resend";

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
      "completed",
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
    // UPDATE REFERRALS TABLE & FETCH PROFILE
    // ========================================================

    const {
      data: updatedReferral,
      error: updateError,
    } = await adminSupabase
      .from("referrals")
      .update({
        status: referral_status,
      })
      .eq("referred_user_id", referred_user_id)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error(
        "Referrals status update error:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            "Unable to update referral status in referrals table",
        },
        { status: 500 }
      );
    }

    const {
      data: profile,
      error: profileError,
    } = await adminSupabase
      .from("profiles")
      .select("id, full_name, email")
      .eq("id", referred_user_id)
      .maybeSingle();

    if (profileError || !profile) {
      console.error(
        "Profile fetch error during status update:",
        profileError
      );
    }

    // ========================================================
    // SEND ACTIVATION EMAIL
    // ========================================================

    if (referral_status === "completed" && profile?.email) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e0e0e0; padding: 30px; border-radius: 12px; color: #333; line-height: 1.6;">
          <h2 style="color: #12066a; margin-top: 0; font-size: 22px;">Congratulations, ${profile.full_name || "Partner"}! 🎉</h2>
          <p style="font-size: 16px; color: #555;">
            Your service is active, and your Partner Dashboard is now unlocked.
          </p>
          <div style="background-color: #f7f9fc; border-left: 4px solid #997819; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; font-size: 15px; font-weight: bold; color: #12066a;">
              What this means for you:
            </p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 14px; color: #444;">
              <li style="margin-bottom: 8px;">You can now refer other businesses using your unique link in the dashboard.</li>
              <li style="margin-bottom: 8px;">Earn <strong>£125 credit</strong> for every successful referral.</li>
              <li>Accumulate up to a maximum of <strong>£1,000 in total referral rewards</strong>.</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${request.nextUrl.origin}/referral-program" style="background-color: #12066a; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 4px 6px rgba(18,6,106,0.15);">
              Access Partner Dashboard
            </a>
          </div>
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px; border-top: 1px solid #eee; padding-top: 15px;">
            This email was sent by BizGrow Holdings Ltd.
          </p>
        </div>
      `;

      try {
        await resend.emails.send({
          from: 'BizGrow Holdings <sales@bizgrow-holdings.net>',
          to: [profile.email],
          subject: 'Your BizGrow Partner Dashboard is Unlocked! 🎉',
          html: emailHtml,
        });
        console.log(`Activation email sent successfully to ${profile.email}`);
      } catch (emailErr) {
        console.error("Resend email sending failed:", emailErr);
      }
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
        profile: {
          ...profile,
          referral_status,
        },
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

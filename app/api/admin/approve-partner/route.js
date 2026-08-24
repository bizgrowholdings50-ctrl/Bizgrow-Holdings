import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const userId = body.userId || body.partnerId;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Partner ID is required" },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 },
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1. Pehle check karein ke user ka current status kya hai (admin approval track karne ke liye)
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from("profiles")
      .select("partner_status, email, full_name")
      .eq("id", userId)
      .single();

    if (fetchError || !existingUser) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 },
      );
    }

    // 2. Profile update karein
    const { data: updatedProfile, error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        partner_status: "approved",
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("id, full_name, email, partner_status")
      .single();

    if (updateError) {
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 400 },
      );
    }

    // 3. Sirf tab email bhejiye jab admin ne manually status ko 'approved' kiya ho 
    // (Yaani pehle status 'approved' NA ho, maslan 'pending' ya kuch aur ho)
    const wasAlreadyApproved = existingUser.partner_status === "approved";

    if (!wasAlreadyApproved && updatedProfile?.email) {
      const emailResult = await sendEmail({
        to: updatedProfile.email,
        subject: "Congratulations! Your Referral Partner Account is Approved",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>Hello ${updatedProfile.full_name || "Partner"},</h2>
            <p>Great news! Your application for the BizGrow Referral Partner Program has been <strong>approved</strong> by our admin team.</p>
            <p>You can now log in to your dashboard, access your unique referral links, and start tracking your earnings.</p>
            <div style="margin: 30px 0;">
              <a href="https://bizgrow-holdings.com/referral-program/dashboard" 
                 style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                Access Your Dashboard
              </a>
            </div>
            <p>Welcome aboard!<br/><strong>BizGrow Holdings Team</strong></p>
          </div>
        `,
      });

      if (!emailResult.success) {
        console.error("Resend Email Error:", emailResult.error);
      } else {
        console.log("Admin Approval Email Sent Successfully:", emailResult.data);
      }
    } else {
      console.log("Email skipped because partner was already approved.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partner approved successfully",
        partner: updatedProfile,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Unexpected API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
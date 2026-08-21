import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Resend client initialize karein (agar env variable mojood hai)
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 1. Profile update karein aur user ki email/name fetch karein
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

    // 2. Email sent
    if (updatedProfile?.email) {
      try {
        await resend.emails.send({
          from: "BizGrow Holdings <onboarding@resend.dev>", // Apna verified domain yahan dalein
          to: [updatedProfile.email],
          subject: "Congratulations! Your Referral Partner Account is Approved",
          html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hello ${updatedProfile.full_name || "Partner"},</h2>
          <p>Great news! Your application for the BizGrow Referral Partner Program has been <strong>approved</strong>.</p>
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
      } catch (emailErr) {
        console.error("Failed to send approval email:", emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partner approved successfully and email sent",
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

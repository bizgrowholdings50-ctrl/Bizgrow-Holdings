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
        subject:
          "Congratulations! Your BizGrow Referral Account Request Has Been Approved",

        html: `
  <div style="
    margin: 0;
    padding: 40px 20px;
    background-color: #f7f7fa;
    font-family: Arial, Helvetica, sans-serif;
    color: #333333;
  ">

    <div style="
      max-width: 620px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e5ec;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(18, 6, 106, 0.08);
    ">

      <!-- Header -->
      <div style="
        padding: 24px 30px;
        background-color: #ffffff;
        border-bottom: 1px solid #eeeeee;
      ">
        <div style="
          font-size: 24px;
          font-weight: 700;
          color: #12066a;
          letter-spacing: -0.5px;
        ">
          BizGrow Holdings
        </div>

        <div style="
          margin-top: 5px;
          font-size: 13px;
          color: #777777;
        ">
          Referral Partner Network
        </div>
      </div>

      <!-- Content -->
      <div style="padding: 38px 30px 32px;">

        <!-- Approval Badge -->
        <div style="
          display: inline-block;
          padding: 7px 13px;
          background-color: #f8f3e6;
          border: 1px solid #d8bd68;
          border-radius: 20px;
          color: #997819;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        ">
          Request Approved
        </div>

        <!-- Heading -->
        <h2 style="
          margin: 20px 0 14px;
          color: #12066a;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 30px;
          line-height: 1.25;
          font-weight: 700;
        ">
          Hello ${updatedProfile.full_name || "Partner"},
        </h2>

        <p style="
          margin: 0 0 14px;
          font-size: 15px;
          line-height: 1.7;
          color: #374151;
        ">
          Great news! Your request has been
          <strong style="color:#15803d;">approved by our team</strong>.
        </p>

        <p style="
          margin: 0 0 24px;
          font-size: 15px;
          line-height: 1.7;
          color: #4b5563;
        ">
          Your referral benefit has been confirmed, and our team is now ready
          to help you with the next steps.
        </p>

        <!-- Status Box -->
        <div style="
          margin: 25px 0;
          padding: 18px 20px;
          background-color: #f8f9fc;
          border-left: 4px solid #997819;
          border-radius: 8px;
        ">

          <div style="
            margin-bottom: 8px;
            font-size: 15px;
            font-weight: 700;
            color: #111827;
          ">
            Request Status
          </div>

          <div style="
            font-size: 14px;
            line-height: 1.7;
            color: #4b5563;
          ">
            Your request is now
            <strong style="color:#15803d;">
              Approved
            </strong>,
            and now you can get your own referral credit.
          </div>

        </div>

        <!-- Button -->
        <div style="
          margin: 30px 0;
          text-align: center;
        ">
          <a
            href="https://bizgrow-holdings.com/referral-program/dashboard"
            style="
              display: inline-block;
              background-color: #12066a;
              color: #ffffff;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 7px;
              font-size: 15px;
              font-weight: 700;
              border: 1px solid #997819;
            "
          >
            Access Your Dashboard
          </a>
        </div>

        <p style="
          margin: 0;
          text-align: center;
          font-size: 13px;
          line-height: 1.6;
          color: #777777;
        ">
          Welcome to BizGrow Holdings. We look forward to working with you!
        </p>

      </div>

      <!-- Footer -->
      <div style="
        padding: 20px 30px;
        background-color: #fafafa;
        border-top: 1px solid #eeeeee;
        text-align: center;
      ">

        <div style="
          font-size: 13px;
          color: #777777;
          margin-bottom: 6px;
        ">
          Best regards,
        </div>

        <div style="
          font-size: 14px;
          font-weight: 700;
          color: #12066a;
        ">
          BizGrow Holdings Team
        </div>

      </div>

    </div>

  </div>
`,
      });

      if (!emailResult.success) {
        console.error("Resend Email Error:", emailResult.error);
      } else {
        console.log(
          "Admin Approval Email Sent Successfully:",
          emailResult.data,
        );
      }

      // 4. Referrer ko email bhejna (agar is user ko kisi ne refer kiya tha)
      try {
        const { data: referralRecord } = await supabaseAdmin
          .from("referrals")
          .select("referrer_id")
          .eq("referred_user_id", userId)
          .maybeSingle();

        if (referralRecord && referralRecord.referrer_id) {
          const { data: referrerProfile } = await supabaseAdmin
            .from("profiles")
            .select("email, full_name")
            .eq("id", referralRecord.referrer_id)
            .maybeSingle();

          if (referrerProfile && referrerProfile.email) {
            const referredName = updatedProfile.full_name || "Your referral";

            const referrerEmailResult = await sendEmail({
              to: referrerProfile.email,
              subject:
                "Great News! Your Referral Has Been Approved & Reward Unlocked",
              html: `
                <div style="margin: 0; padding: 40px 20px; background-color: #f7f7fa; font-family: Arial, Helvetica, sans-serif; color: #333333;">
                  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5ec; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 30px rgba(18, 6, 106, 0.08);">
                    <div style="padding: 24px 30px; background-color: #ffffff; border-bottom: 1px solid #eeeeee;">
                      <div style="font-size: 24px; font-weight: 700; color: #12066a; letter-spacing: -0.5px;">BizGrow Holdings</div>
                      <div style="margin-top: 5px; font-size: 13px; color: #777777;">Referral Partner Network</div>
                    </div>
                    <div style="padding: 38px 30px 32px;">
                      <div style="display: inline-block; padding: 7px 13px; background-color: #f8f3e6; border: 1px solid #d8bd68; border-radius: 20px; color: #997819; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase;">Reward Unlocked (£125)</div>
                      <h2 style="margin: 20px 0 14px; color: #12066a; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 1.25; font-weight: 700;">Hello ${referrerProfile.full_name || "Partner"},</h2>
                      <p style="margin: 0 0 14px; font-size: 15px; line-height: 1.7; color: #374151;">Fantastic news! Your referral, <strong>${referredName}</strong>, has been successfully <strong style="color:#15803d;">approved</strong> by our admin team.</p>
                      <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #4b5563;">Your reward of <strong>£125</strong> has now been unlocked and is ready for you to claim right from your dashboard.</p>
                      <div style="margin: 25px 0; padding: 18px 20px; background-color: #f8f9fc; border-left: 4px solid #997819; border-radius: 8px;">
                        <div style="margin-bottom: 8px; font-size: 15px; font-weight: 700; color: #111827;">Referral Status Update</div>
                        <div style="font-size: 14px; line-height: 1.7; color: #4b5563;">Status: <strong style="color:#15803d;">Approved</strong> — £125 Unlocked & Ready to Claim.</div>
                      </div>
                      <div style="margin: 30px 0; text-align: center;">
                        <a href="https://bizgrow-holdings.com/referral-program/dashboard" style="display: inline-block; background-color: #12066a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 7px; font-size: 15px; font-weight: 700; border: 1px solid #997819;">Claim Your Reward Now</a>
                      </div>
                      <p style="margin: 0; text-align: center; font-size: 13px; line-height: 1.6; color: #777777;">Keep up the great work expanding the BizGrow Partner Network!</p>
                    </div>
                    <div style="padding: 20px 30px; background-color: #fafafa; border-top: 1px solid #eeeeee; text-align: center;">
                      <div style="font-size: 13px; color: #777777; margin-bottom: 6px;">BizGrow Partner Network</div>
                      <div style="font-size: 14px; font-weight: 700; color: #12066a;">BizGrow Holdings Team</div>
                    </div>
                  </div>
                </div>
              `,
            });

            if (!referrerEmailResult.success) {
              console.error(
                "Resend Email Error (Referrer):",
                referrerEmailResult.error,
              );
            } else {
              console.log(
                "Referrer Notification Email Sent Successfully:",
                referrerEmailResult.data,
              );
            }
          }
        }
      } catch (referrerErr) {
        console.error("Error sending email to referrer:", referrerErr);
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

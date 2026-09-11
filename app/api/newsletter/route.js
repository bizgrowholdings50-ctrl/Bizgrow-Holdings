import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // 1. Notify Sales Team
    const salesEmailResponse = await sendEmail({
      to: "sales@bizgrow-holdings.net",
      subject: "New Newsletter Subscription - BizGrow Holdings",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #12066a;">
            New Newsletter Subscriber
          </h2>

          <p>
            A new user has subscribed to the BizGrow Holdings newsletter.
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Subscription:</strong> Compliance tips and industry updates
          </p>
        </div>
      `,
    });

    if (!salesEmailResponse.success) {
      console.error("Sales notification failed:", salesEmailResponse.error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to complete subscription. Please try again.",
        },
        { status: 500 }
      );
    }

    // 2. Send Confirmation Email to Subscriber
    const subscriberEmailResponse = await sendEmail({
  to: email,
  subject: "BizGrow Holdings Newsletter Subscription",
  html: `
    <div style="font-family: Arial, sans-serif; background:#f8f8f8; padding:40px 20px;">
      <div style="max-width:600px; margin:0 auto; background:white; padding:40px; border-radius:16px;">

        <p style="color:#444; line-height:1.7; font-size:16px;">
          Thank you for subscribing to the BizGrow Holdings newsletter.
        </p>

        <p style="color:#444; line-height:1.7; font-size:16px;">
          You'll receive compliance tips, industry updates, and useful
          insights to help your business stay ahead.
        </p>

        <div style="margin-top:30px; padding-top:20px; border-top:1px solid #eee;">
          <p style="color:#777; font-size:13px; margin:0;">
            BizGrow Holdings
          </p>
        </div>

      </div>
    </div>
  `,
});

    if (!subscriberEmailResponse.success) {
      console.error(
        "Subscriber confirmation failed:",
        subscriberEmailResponse.error
      );

      // Subscription itself was successful,
      // even if confirmation email failed.
      return NextResponse.json({
        success: true,
        message: "Subscribed successfully!",
        emailSent: false,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully!",
      emailSent: true,
    });
  } catch (error) {
    console.error("Newsletter API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
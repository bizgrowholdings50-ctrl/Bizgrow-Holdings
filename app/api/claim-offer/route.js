import { NextResponse } from "next/server";
import { sendEmail } from "../../../utils/sendEmail";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, company, offerTitle, offerPrice, discount } = body;

    if (!name || !email || !offerTitle) {
      return NextResponse.json(
        { success: false, message: "Name, email, and offer title are required." },
        { status: 400 }
      );
    }

    // 1️⃣ Sales Team ke liye email content
    const salesEmailSubject = `New Offer Claim: ${offerTitle}`;
    const salesEmailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #12066a; border-bottom: 2px solid #997819; padding-bottom: 10px;">New Discount Offer Claimed!</h2>
        <p><strong>Offer Name:</strong> ${offerTitle}</p>
        <p><strong>Discount:</strong> ${discount ? discount + "% OFF" : "N/A"}</p>
        <p><strong>Starting Price:</strong> £${offerPrice}/Month</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <h3 style="color: #997819;">Client Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>
        <p><strong>Company:</strong> ${company || "Not Provided"}</p>
        <p style="font-size: 12px; color: #888; margin-top: 30px;">This email was sent from the BizGrow Holdings website discount offers page.</p>
      </div>
    `;

    // Sales team ko email bhejein
    const salesResult = await sendEmail({
      to: "sales@bizgrow-holdings.net",
      subject: salesEmailSubject,
      html: salesEmailHtml,
    });

    if (!salesResult.success) {
      return NextResponse.json({ success: false, error: salesResult.error }, { status: 500 });
    }

    // 2️⃣ Client ke liye "Thank You" confirmation email content
    const clientEmailSubject = `We’ve received your claim for ${offerTitle} - BizGrow Holdings`;
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #12066a; border-bottom: 2px solid #997819; padding-bottom: 10px;">Thank You, ${name}!</h2>
        <p>We have successfully received your request to claim the <strong>${offerTitle}</strong>.</p>
        <p>Our expert compliance and advisory team is reviewing your details and will get in touch with you shortly to finalize your discount and get your onboarding started.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 5px 0;"><strong>Selected Offer:</strong> ${offerTitle}</p>
          <p style="margin: 0 0 5px 0;"><strong>Discount:</strong> ${discount ? discount + "% OFF" : "Special Rate"}</p>
          <p style="margin: 0;"><strong>Starting Price:</strong> £${offerPrice}/Month</p>
        </div>
        <p>If you have any urgent queries, feel free to reach out to us directly at <a href="mailto:info@bizgrow-holdings.co.uk" style="color: #997819;">info@bizgrow-holdings.co.uk</a> or call us at <strong>02080904209</strong>.</p>
        <p style="margin-top: 30px;">Best regards,<br/><strong>BizGrow Holdings Team</strong></p>
      </div>
    `;

    // Client ko thank you email bhejein (agar fail bhi ho toh main process block na ho, is liye background mein ya await ke sath)
    await sendEmail({
      to: email,
      subject: clientEmailSubject,
      html: clientEmailHtml,
    });

    return NextResponse.json({ success: true, message: "Offer claimed and emails sent successfully!" });
  } catch (err) {
    console.error("Claim offer API error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
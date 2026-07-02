import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter (for production, use Redis or similar)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // Max 5 submissions per IP per window

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= MAX_REQUESTS) {
    return false; // Rate limited
  }
  
  validRequests.push(now);
  rateLimit.set(ip, validRequests);
  return true; // Allowed
}

export async function POST(req) {
  try {
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    'unknown';
    
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." }, 
        { status: 429 }
      );
    }

    // 1. Destructure coupon from the incoming request payload
    const { name, email, number, service, message, coupon, captchaToken } = await req.json();

    // --- CAPTCHA VALIDATION ---
    if (!captchaToken) {
      return NextResponse.json({ error: "Verification required. Please complete the captcha." }, { status: 400 });
    }

    const verifyRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY}&response=${captchaToken}`,
      }
    );

    const verification = await verifyRes.json();
    if (!verification.success) {
      return NextResponse.json({ error: "Captcha verification failed. Please try again." }, { status: 403 });
    }

    // --- INPUT SANITIZATION & VALIDATION ---
    const sanitizedName = name?.trim();
    const sanitizedEmail = email?.trim().toLowerCase();
    const sanitizedNumber = number?.replace(/\s/g, "");
    const sanitizedService = service?.trim();
    const sanitizedMessage = message?.trim();
    const sanitizedCoupon = coupon?.trim() || ""; // Default empty string if not present

    console.log("Contact form received:", {
      name: sanitizedName,
      email: sanitizedEmail,
      number: sanitizedNumber,
      service: sanitizedService,
      coupon: sanitizedCoupon,
      messageLength: sanitizedMessage?.length,
    });

    if (!sanitizedName || !sanitizedEmail || !sanitizedNumber || !sanitizedService || !sanitizedMessage) {
      return NextResponse.json(
        { error: "All fields are required. Please fill the complete form." },
        { status: 400 }
      );
    }

    // Length limits for security (Including Coupon Code validation)
    if (
      sanitizedName.length > 100 || 
      sanitizedEmail.length > 254 || 
      sanitizedNumber.length > 20 || 
      sanitizedMessage.length > 2000 ||
      sanitizedCoupon.length > 50 
    ) {
      return NextResponse.json(
        { error: "Input data exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(sanitizedNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number format. Please provide a valid contact number." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Basic XSS protection for message
    const xssRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (xssRegex.test(sanitizedMessage)) {
      return NextResponse.json(
        { error: "Invalid message content detected." },
        { status: 400 }
      );
    }

 

    // Dynamic Subject Line (Agar coupon lag kar aaya hai toh alert dikhega)
    const emailSubject = sanitizedCoupon 
      ? `💥 [OFFER ALERT - ${sanitizedCoupon}] New Inquiry from ${sanitizedName}`
      : `New Inquiry: ${sanitizedService} from ${sanitizedName}`;


    // --- PARALLEL EMAIL SENDING (Promise.allSettled) ---
    const [adminResult, clientResult] = await Promise.allSettled([
      
      // 1. ADMIN NOTIFICATION EMAIL (Sales Team Ke Liye)
      resend.emails.send({
        from: 'BizGrow Sales <sales@bizgrow-holdings.net>', 
        to: ['sales@bizgrow-holdings.net'],
        reply_to: sanitizedEmail, 
        subject: emailSubject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e0e0e0; padding: 30px; border-radius: 12px; color: #333;">
            <h2 style="color: #12066a; margin-top: 0;">New Business Inquiry</h2>
            <p style="font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
              A new lead has been submitted through the <strong>BizGrow Holdings</strong> website.
            </p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666; width: 140px;">Client Name:</td>
                <td style="padding: 8px 0;">${sanitizedName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Client Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${sanitizedEmail}" style="color: #12066a;">${sanitizedEmail}</a></td>
              </tr>
             
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone Number:</td>
                <td style="padding: 8px 0;"><a href="tel:${sanitizedNumber}" style="color: #12066a; text-decoration: none;">${sanitizedNumber}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Service:</td>
                <td style="padding: 8px 0;"><span style="background: #eef2ff; color: #12066a; padding: 4px 10px; border-radius: 5px; font-size: 13px; font-weight: bold;">${sanitizedService}</span></td>
              </tr>

              ${sanitizedCoupon ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #d97706;">Coupon Applied:</td>
                <td style="padding: 8px 0;">
                  <span style="background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 5px; font-size: 13px; font-weight: bold; border: 1px solid #fde68a;">
                    ${sanitizedCoupon}
                  </span>
                </td>
              </tr>
              ` : ''}
            </table>

            <div style="background: #fcfcfc; border-left: 4px solid #12066a; padding: 15px; border-radius: 4px; margin-top: 25px;">
              <p style="margin-top: 0; font-weight: bold; color: #12066a;">Message:</p>
              <p style="line-height: 1.6; margin-bottom: 0;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
            </div>

            <p style="margin-top: 30px; font-size: 11px; color: #aaa; text-align: center;">
              This email was automatically generated by the BizGrow Holdings Portal.
            </p>
          </div>
        `,
      }),

      // 2. CLIENT THANK YOU EMAIL (Auto-Responder) - TYPO FIXED (.net)
      resend.emails.send({
        from: 'BizGrow Holdings <sales@bizgrow-holdings.net>', 
        to: [sanitizedEmail], 
        subject: `Thank you for contacting BizGrow Holdings!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e0e0e0; padding: 30px; border-radius: 12px; color: #333;">
            <h2 style="color: #12066a; margin-top: 0;">Thank You, ${sanitizedName}!</h2>
            <p style="font-size: 15px; line-height: 1.6;">
              We have successfully received your inquiry regarding <strong>${sanitizedService}</strong>. Our team is currently reviewing your details, and a representative will get in touch with you shortly.
            </p>
            
            ${sanitizedCoupon ? `
            <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #b45309; font-weight: bold; font-size: 14px;">
                🎉 Coupon Confirmed: <span style="background: #fef3c7; padding: 2px 6px; border-radius: 4px;">${sanitizedCoupon}</span> has been applied to your request.
              </p>
            </div>
            ` : ''}

            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px; border-top: 3px solid #12066a;">
              <h4 style="margin-top: 0; margin-bottom: 10px; color: #12066a;">What's Next?</h4>
              <ul style="margin: 0; padding-left: 20px; line-height: 1.5; font-size: 14px; color: #555;">
                <li>Our consultants will analyze your project requirements.</li>
                <li>We will reach out via email or phone (${sanitizedNumber}) within 24 business hours.</li>
              </ul>
            </div>

            <p style="font-size: 14px; margin-top: 25px;">
              If you have any urgent attachments or details to provide, feel free to reply directly to this email.
            </p>

            <br />
            <p style="margin-bottom: 5px; font-size: 14px;">Best regards,</p>
            <p style="margin-top: 0; font-weight: bold; color: #12066a; font-size: 16px;">BizGrow Holdings Team</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
            <p style="font-size: 11px; color: #aaa; text-align: center;">
              This is an automated confirmation of your submission. Please do not hesitate to reach out if you have any questions.
            </p>
          </div>
        `
      })

    ]);

    console.log("Resend send results:", {
      admin: adminResult.status === "fulfilled" ? adminResult.value : adminResult.reason,
      client: clientResult.status === "fulfilled" ? clientResult.value : clientResult.reason,
    });

    if (adminResult.status === "rejected") {
      console.error("Admin email send failed:", adminResult.reason);
      return NextResponse.json({ error: "Failed to send admin notification email." }, { status: 500 });
    }

    if (clientResult.status === "rejected") {
      console.warn("Client thank-you email failed:", clientResult.reason);
      return NextResponse.json({
        success: true,
        message: "Lead submitted, but the thank-you email could not be delivered.",
        data: adminResult.value,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Lead sent and confirmation email triggered successfully",
      data: adminResult.value,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
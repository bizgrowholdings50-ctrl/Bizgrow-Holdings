import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter (for production, use Redis or similar)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3; // Max 3 submissions per IP per window

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
    const { name, email, number, service, message, captchaToken } = await req.json();

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

    if (!sanitizedName || !sanitizedEmail || !sanitizedNumber || !sanitizedService || !sanitizedMessage) {
      return NextResponse.json(
        { error: "All fields are required. Please fill the complete form." },
        { status: 400 }
      );
    }

    // Length limits for security
    if (sanitizedName.length > 100 || sanitizedEmail.length > 254 || sanitizedNumber.length > 20 || sanitizedMessage.length > 2000) {
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

    // --- EMAIL SENDING (Your Template Kept Intact) ---
    const { data, error } = await resend.emails.send({
      from: 'BizGrow Sales <sales@bizgrow-holdings.net>', 
      to: ['sales@bizgrow-holdings.net'],
      reply_to: sanitizedEmail, 
      subject: `New Inquiry: ${sanitizedService} from ${sanitizedName}`,
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
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Lead sent successfully", data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
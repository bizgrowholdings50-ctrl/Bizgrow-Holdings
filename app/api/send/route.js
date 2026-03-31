import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, service, message } = await req.json();

    const { data, error } = await resend.emails.send({
      // 🔹 Sender: Ab aapka domain verified hai toh ye chalay ga
      from: 'BizGrow Holdings <sales@bizgrow-holdings.net>', 
      // 🔹 Receiver: Jahan aapko email chahiye
      to: ['sales@bizgrow-holdings.net'],
      // 🔹 Reply-To: Taake aap reply karein toh seedha customer ko jaye
      reply_to: email, 
      subject: `New Strategy Inquiry: ${service}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #12066a;">New Business Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Client Email:</strong> ${email}</p>
          <p><strong>Interested Service:</strong> ${service}</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <footer style="margin-top: 20px; font-size: 12px; color: #999;">
            Sent from BizGrow Digital Portal
          </footer>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ message: "Email sent successfully", data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
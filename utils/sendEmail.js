import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "BizGrow Holdings <sales@bizgrow-holdings.net>",
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("Resend helper error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Email utility exception:", err);
    return { success: false, error: err };
  }
}
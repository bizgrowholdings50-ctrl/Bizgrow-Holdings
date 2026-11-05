import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { assessmentCategories, getRiskStatus } from "../../compliance-scanner/complianceAssessment";

const escapeHtml = (value: unknown) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { lead, answers, totalScore, categoryResults, riskStatus } = payload;

    if (!lead?.fullName || !lead?.companyName || !lead?.email) {
      return NextResponse.json({ success: false, message: "Please complete all lead information." }, { status: 400 });
    }
    if (!Number.isFinite(Number(totalScore))) {
      return NextResponse.json({ success: false, message: "A valid assessment score is required." }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) throw new Error("Supabase service configuration is missing.");

    const supabase = createClient(url, serviceRoleKey);

    const serverCategoryResults = assessmentCategories.map((category) => {
      const earned = category.questions.reduce((sum, question) => sum + (Number(answers?.[question.id]) || 0), 0);
      const maximum = category.questions.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.points)), 0);
      return { id: category.id, name: category.name, earned, maximum, score: maximum ? Math.round((earned / maximum) * 100) : 0 };
    });
    const earnedTotal = serverCategoryResults.reduce((sum, category) => sum + category.earned, 0);
    const maximumTotal = serverCategoryResults.reduce((sum, category) => sum + category.maximum, 0);
    const score = maximumTotal ? Math.round((earnedTotal / maximumTotal) * 100) : 0;
    const status = getRiskStatus(score).label;
    const databaseStatus = score < 60
      ? "Critical Risk"
      : score < 85
        ? "Action Required"
        : "Audit Ready";

    const answerDetails = assessmentCategories.map((category) => ({
      category: category.name,
      questions: category.questions.map((question) => {
        const selectedPoints = Number(answers?.[question.id]);
        const selectedOption = question.options.find((option) => option.points === selectedPoints);
        return { question: question.question, answer: selectedOption?.label || "Not answered", points: Number.isFinite(selectedPoints) ? selectedPoints : 0 };
      }),
    }));
    const detailedAnswers = { answers: answers ?? {}, answerDetails, categoryResults: serverCategoryResults, submittedAt: new Date().toISOString() };

    const { error: insertError } = await supabase.from("compliance_audit_leads").insert({
      full_name: lead.fullName.trim(),
      company_name: lead.companyName.trim(),
      email: lead.email.trim().toLowerCase(),
      phone: String(lead.phone ?? "").trim(),
      total_score: score,
      risk_status: databaseStatus,
      detailed_answers: detailedAnswers,
    });
    if (insertError) throw insertError;

    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend configuration is missing; assessment saved without email delivery.");
      return NextResponse.json({
        success: true,
        saved: true,
        emailSent: false,
        message: "Assessment saved, but email delivery is not configured.",
        totalScore: score,
        riskStatus: status,
      });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = "BizGrow Holdings <sales@bizgrow-holdings.net>";
    const safeName = escapeHtml(lead.fullName);
    const safeCompany = escapeHtml(lead.companyName);

    const categoryRows = serverCategoryResults.map((category) => `
      <tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;color:#334155">${escapeHtml(category.name)}</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:bold;text-align:right">${escapeHtml(category.score)}%</td></tr>
    `).join("");

    const detailedAnswerRows = answerDetails.map((group) => `
      <h3 style="margin:24px 0 8px;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:8px">${escapeHtml(group.category)}</h3>
      ${group.questions.map((item, index) => `
        <div style="padding:14px 0;border-bottom:1px solid #f1f5f9">
          <p style="margin:0 0 6px;color:#334155;font-weight:bold">${index + 1}. ${escapeHtml(item.question)}</p>
          <p style="margin:0;color:#475569"><strong>Answer:</strong> ${escapeHtml(item.answer)}</p>
          <p style="margin:5px 0 0;color:#64748b;font-size:13px">Points: ${item.points}</p>
        </div>
      `).join("")}
    `).join("");

    const clientEmail = await resend.emails.send({
      from,
      to: [lead.email.trim()],
      subject: `Your ${score}% compliance health report — ${lead.companyName}`,
      html: `<div style="font-family:Arial,sans-serif;background:#f8fafc;padding:32px"><div style="max-width:640px;margin:auto;background:white;border-radius:16px;padding:32px"><p style="color:#b45309;font-weight:bold;text-transform:uppercase">Compliance Health Report</p><h1 style="color:#0f172a">Hello ${safeName}</h1><p style="color:#475569">Here is the readiness report for ${safeCompany}.</p><div style="background:#0f172a;color:white;border-radius:12px;padding:24px;text-align:center"><div style="font-size:48px;font-weight:bold">${score}%</div><div>${escapeHtml(status)}</div></div><h2 style="margin-top:28px;color:#0f172a">Category results</h2><table style="width:100%;border-collapse:collapse">${categoryRows}</table><p style="color:#475569;line-height:1.7">Our team can help you prioritise evidence gaps and prepare for SIA ACS, BS 7858, ISO and cyber security reviews.</p><p style="color:#64748b;font-size:13px">BizGrow Holdings — UK Compliance & Security Consultancy</p></div></div>`,
    });

    const internalEmail = await resend.emails.send({
      from,
      to: [process.env.SALES_EMAIL || "sales@bizgrow-holdings.net"],
      replyTo: lead.email.trim(),
      subject: `New Compliance Assessment: ${lead.companyName} — ${score}% ${status}`,
      html: `<div style="font-family:Arial,sans-serif;padding:24px;max-width:760px;margin:auto"><h1>New Compliance Health Assessment</h1><p><strong>Name:</strong> ${safeName}</p><p><strong>Organisation:</strong> ${safeCompany}</p><p><strong>Email:</strong> ${escapeHtml(lead.email)}</p><p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p><p><strong>Score:</strong> ${score}%</p><p><strong>Status:</strong> ${escapeHtml(status)}</p><h2>Category results</h2><table style="width:100%;border-collapse:collapse">${categoryRows}</table><h2>Detailed assessment answers</h2>${detailedAnswerRows}</div>`, 
    });

    if (clientEmail.error || internalEmail.error) {
      console.error("Resend compliance assessment error", { clientEmail, internalEmail });
      return NextResponse.json({ success: true, saved: true, emailSent: false, message: "Assessment saved, but one email could not be delivered." });
    }

    return NextResponse.json({ success: true, saved: true, emailSent: true, totalScore: score, riskStatus: status });
  } catch (error) {
    console.error("Compliance assessment API error", error);
    const details = error && typeof error === "object" && "message" in error
      ? String(error.message)
      : error instanceof Error
        ? error.message
        : "Unknown API error";
    return NextResponse.json({
      success: false,
      message: `Unable to save the assessment: ${details}`,
      details,
    }, { status: 500 });
  }
}

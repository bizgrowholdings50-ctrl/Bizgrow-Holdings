import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { assessmentCategories, getRiskStatus } from "../../compliance-scanner/complianceAssessment";

const TIME_ZONE = "Europe/London";
const SLOT_TIMES = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^(09:00|10:30|12:00|14:00|15:30|17:00)$/;

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

function getLocalParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  return Object.fromEntries(parts.map((part) => [part.type, Number(part.value)]));
}

function isValidDateString(date: string) {
  if (!DATE_PATTERN.test(date)) return false;
  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

function isWeekend(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const dayOfWeek = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

function localDateTimeToUtc(date: string, time: string) {
  if (!isValidDateString(date) || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) return null;

  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const desiredUtcValue = Date.UTC(year, month - 1, day, hour, minute);
  let timestamp = desiredUtcValue;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const local = getLocalParts(new Date(timestamp));
    const representedUtcValue = Date.UTC(
      local.year,
      local.month - 1,
      local.day,
      local.hour,
      local.minute,
      local.second,
    );
    timestamp += desiredUtcValue - representedUtcValue;
  }

  const result = new Date(timestamp);
  const local = getLocalParts(result);
  if (
    local.year !== year ||
    local.month !== month ||
    local.day !== day ||
    local.hour !== hour ||
    local.minute !== minute
  ) {
    return null;
  }

  return result;
}

function addOneDay(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const nextDay = new Date(Date.UTC(year, month - 1, day + 1));
  return `${nextDay.getUTCFullYear()}-${String(nextDay.getUTCMonth() + 1).padStart(2, "0")}-${String(nextDay.getUTCDate()).padStart(2, "0")}`;
}

function getUtcDayRange(date: string) {
  const start = localDateTimeToUtc(date, "00:00");
  const nextDayStart = localDateTimeToUtc(addOneDay(date), "00:00");
  if (!start || !nextDayStart) return null;
  return { start, end: nextDayStart };
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Supabase service configuration is missing.");
  }
  return createClient(url, serviceRoleKey);
}

function getTodayInUk() {
  const parts = getLocalParts(new Date());
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export async function GET(request: Request) {
  try {
    const date = new URL(request.url).searchParams.get("date") || "";
    if (!isValidDateString(date) || date < getTodayInUk()) {
      return NextResponse.json({ success: false, message: "Please choose today or a future date." }, { status: 400 });
    }

    if (isWeekend(date)) {
      return NextResponse.json({
        success: true,
        date,
        timeZone: TIME_ZONE,
        slots: SLOT_TIMES.map((time) => ({ time, available: false, reason: "weekend" })),
      });
    }

    const range = getUtcDayRange(date);
    if (!range) {
      return NextResponse.json({ success: false, message: "We couldn't check that date. Please choose another." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data: bookings, error } = await supabase
      .from("compliance_gap_review_bookings")
      .select("booking_at")
      .gte("booking_at", range.start.toISOString())
      .lt("booking_at", range.end.toISOString());

    if (error) throw error;

    const bookedSlots = new Set((bookings ?? []).map((booking) => new Date(booking.booking_at).toISOString()));
    const slots = SLOT_TIMES.map((time) => {
      const bookingAt = localDateTimeToUtc(date, time);
      if (!bookingAt || bookingAt.getTime() <= Date.now()) {
        return { time, available: false, reason: "past" as const };
      }
      if (bookedSlots.has(bookingAt.toISOString())) {
        return { time, available: false, reason: "booked" as const };
      }
      return { time, available: true };
    });

    return NextResponse.json({ success: true, date, timeZone: TIME_ZONE, slots });
  } catch (error) {
    console.error("Compliance gap review availability error:", error);
    return NextResponse.json(
      { success: false, message: "We couldn't check availability right now. Please try again shortly." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const payload = requestBody && typeof requestBody === "object" ? requestBody : {};
    const date = typeof payload.date === "string" ? payload.date : "";
    const time = typeof payload.time === "string" ? payload.time : "";
    const lead = payload.lead;
    const fullName = typeof lead?.fullName === "string" ? lead.fullName.trim() : "";
    const companyName = typeof lead?.companyName === "string" ? lead.companyName.trim() : "";
    const email = typeof lead?.email === "string" ? lead.email.trim().toLowerCase() : "";
    const phone = typeof lead?.phone === "string" ? lead.phone.trim() : "";
    const submittedAnswers = payload.answers;

    if (
      !fullName || fullName.length > 120 ||
      !companyName || companyName.length > 160 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      phone.length > 40
    ) {
      return NextResponse.json({ success: false, message: "Please check your assessment details and try again." }, { status: 400 });
    }

    if (!submittedAnswers || typeof submittedAnswers !== "object" || Array.isArray(submittedAnswers)) {
      return NextResponse.json({ success: false, message: "Your assessment answers are missing. Please retake the assessment." }, { status: 400 });
    }

    const answerDetails = assessmentCategories.map((category) => ({
      id: category.id,
      name: category.name,
      questions: category.questions.map((question) => {
        const selectedPoints = submittedAnswers[question.id];
        const selectedOption = question.options.find((option) => option.points === selectedPoints);
        return {
          question: question.question,
          answer: selectedOption?.label ?? null,
          points: selectedOption?.points ?? null,
        };
      }),
    }));

    const allQuestionsAnswered = answerDetails.every((category) =>
      category.questions.every((question) => question.answer !== null),
    );
    if (!allQuestionsAnswered) {
      return NextResponse.json({ success: false, message: "Some assessment answers are missing or invalid. Please retake the assessment." }, { status: 400 });
    }

    const assessmentScore = Math.round(
      (assessmentCategories.reduce(
        (total, category) =>
          total + category.questions.reduce(
            (categoryTotal, question) => categoryTotal + submittedAnswers[question.id],
            0,
          ),
        0,
      ) /
        assessmentCategories.reduce(
          (total, category) =>
            total + category.questions.reduce(
              (categoryTotal, question) =>
                categoryTotal + Math.max(...question.options.map((option) => option.points)),
              0,
            ),
          0,
        )) *
        100,
    );
    const riskStatus = getRiskStatus(assessmentScore).label;
    if (!isValidDateString(date) || date < getTodayInUk() || !TIME_PATTERN.test(time)) {
      return NextResponse.json({ success: false, message: "Please choose a valid future date and available time." }, { status: 400 });
    }
    if (isWeekend(date)) {
      return NextResponse.json(
        { success: false, message: "We are closed on Saturdays and Sundays. Please choose a weekday." },
        { status: 400 },
      );
    }

    const bookingAt = localDateTimeToUtc(date, time);
    if (!bookingAt || bookingAt.getTime() <= Date.now()) {
      return NextResponse.json({ success: false, message: "That time has passed. Please choose another available slot." }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error: insertError } = await supabase.from("compliance_gap_review_bookings").insert({
      full_name: fullName,
      company_name: companyName,
      email,
      phone,
      booking_at: bookingAt.toISOString(),
      assessment_score: assessmentScore,
      risk_status: riskStatus,
      time_zone: TIME_ZONE,
    });

    if (insertError?.code === "23505") {
      return NextResponse.json(
        { success: false, message: "That time has just been booked. Please choose another available slot." },
        { status: 409 },
      );
    }
    if (insertError) throw insertError;

    if (!process.env.RESEND_API_KEY) {
      console.error("Compliance gap review booking saved, but RESEND_API_KEY is not configured.");
      return NextResponse.json({ success: true, booked: true, emailSent: false });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const dateLabel = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeZone: TIME_ZONE,
    }).format(bookingAt);
    const safeName = escapeHtml(fullName);
    const safeCompany = escapeHtml(companyName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const subjectCompanyName = companyName.replace(/[\r\n]/g, " ");
    const from = "BizGrow Holdings <sales@bizgrow-holdings.net>";
    const salesEmail = process.env.SALES_EMAIL || "sales@bizgrow-holdings.net";
    const assessmentAnswerSections = answerDetails.map((category) => `
      <h2 style="margin:28px 0 10px;color:#12066a">${escapeHtml(category.name)}</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
        <thead><tr style="background:#f1f5f9"><th style="padding:10px;text-align:left">Question</th><th style="padding:10px;text-align:left">Selected answer</th><th style="padding:10px;text-align:right">Points</th></tr></thead>
        <tbody>${category.questions.map((item) => `
          <tr>
            <td style="padding:10px;border-bottom:1px solid #e2e8f0;color:#334155">${escapeHtml(item.question)}</td>
            <td style="padding:10px;border-bottom:1px solid #e2e8f0;color:#334155">${escapeHtml(item.answer)}</td>
            <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:right;color:#334155">${item.points}</td>
          </tr>
        `).join("")}</tbody>
      </table>
    `).join("");

    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from,
        to: [email],
        replyTo: salesEmail,
        subject: "Your free compliance gap review is confirmed",
        html: `<div style="font-family:Arial,sans-serif;background:#f8fafc;padding:32px"><div style="max-width:600px;margin:auto;background:#fff;border-radius:16px;padding:32px"><p style="color:#997818;font-weight:bold;text-transform:uppercase;letter-spacing:1px">BizGrow Holdings</p><h1 style="color:#12066a">Your review is booked</h1><p>Hello ${safeName},</p><p>Your complimentary 30-minute compliance gap review is confirmed for:</p><div style="background:#f8f7f2;border:1px solid #e8dfc7;border-radius:12px;padding:18px;font-size:18px;font-weight:bold;color:#12066a">${escapeHtml(dateLabel)} at ${escapeHtml(time)} UK time (GMT/BST)</div><p style="color:#475569;line-height:1.6">Our team will be in touch using the details you provided. If you need to change your appointment, reply to this email.</p><p style="color:#64748b;font-size:13px">BizGrow Holdings | UK Compliance and Security Consultancy</p></div></div>`,
      }),
      resend.emails.send({
        from,
        to: [salesEmail],
        replyTo: email,
        subject: `New free gap review booking: ${subjectCompanyName} | ${dateLabel} ${time}`,
        html: `<div style="font-family:Arial,sans-serif;padding:24px;max-width:760px;margin:auto;color:#1e293b"><h1 style="color:#12066a">New compliance gap review booking</h1><p><strong>Date and time:</strong> ${escapeHtml(dateLabel)} at ${escapeHtml(time)} UK time (GMT/BST)</p><p><strong>Name:</strong> ${safeName}</p><p><strong>Organisation:</strong> ${safeCompany}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Phone:</strong> ${safePhone}</p><p><strong>Compliance score:</strong> ${assessmentScore}%</p><p><strong>Risk status:</strong> ${escapeHtml(riskStatus)}</p><h2 style="margin-top:32px;color:#12066a">Full compliance assessment answers</h2>${assessmentAnswerSections}</div>`,
      }),
    ]);

    const emailErrors = emailResults.flatMap((result) => {
      if (result.status === "rejected") return [result.reason];
      return result.value.error ? [result.value.error] : [];
    });
    if (emailErrors.length) {
      console.error("Compliance gap review email delivery error:", emailErrors);
    }

    return NextResponse.json({
      success: true,
      booked: true,
      emailSent: emailErrors.length === 0,
    });
  } catch (error) {
    console.error("Compliance gap review booking error:", error);
    return NextResponse.json(
      { success: false, message: "We couldn't complete your booking. Please try again shortly." },
      { status: 500 },
    );
  }
}

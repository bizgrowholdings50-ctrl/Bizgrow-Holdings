import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { Resend } from "resend";

// ============================================================
// ADMIN SUPABASE CLIENT
// ============================================================

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
  }

  return createSupabaseAdmin(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// ============================================================
// RESEND CLIENT
// ============================================================

function getResendClient() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is missing.");
  }

  return new Resend(resendApiKey);
}

// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================
// VERIFY ADMIN
// ============================================================

async function verifyAdmin(supabase, userId) {
  if (!userId) {
    return false;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Admin verification error:", error);
    return false;
  }

  return profile?.role === "admin";
}

// ============================================================
// RESOLVE CLAIMANT EMAIL
//
// Priority:
// 1. reward_claims.email
// 2. profiles.email
// 3. Supabase Auth email
// ============================================================

async function resolveClaimantEmail(adminSupabase, claim) {
  // ----------------------------------------------------------
  // 1. reward_claims.email
  // ----------------------------------------------------------

  const claimEmail =
    typeof claim?.email === "string"
      ? claim.email.trim()
      : "";

  if (claimEmail) {
    return {
      email: claimEmail,
      source: "reward_claims.email",
    };
  }

  // ----------------------------------------------------------
  // USER ID REQUIRED FOR FALLBACK
  // ----------------------------------------------------------

  const userId = claim?.user_id;

  if (!userId) {
    return {
      email: null,
      source: null,
      error:
        "Claimant email is missing and user_id is unavailable.",
    };
  }

  // ----------------------------------------------------------
  // 2. profiles.email
  // ----------------------------------------------------------

  try {
    const {
      data: profile,
      error: profileError,
    } = await adminSupabase
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      console.error(
        "Profile email lookup failed:",
        profileError
      );
    } else {
      const profileEmail =
        typeof profile?.email === "string"
          ? profile.email.trim()
          : "";

      if (profileEmail) {
        return {
          email: profileEmail,
          source: "profiles.email",
        };
      }
    }
  } catch (error) {
    console.error(
      "Profile email lookup exception:",
      error
    );
  }

  // ----------------------------------------------------------
  // 3. SUPABASE AUTH EMAIL
  // ----------------------------------------------------------

  try {
    const {
      data: authUserData,
      error: authUserError,
    } = await adminSupabase.auth.admin.getUserById(
      userId
    );

    if (authUserError) {
      console.error(
        "Supabase Auth email lookup failed:",
        authUserError
      );
    } else {
      const authEmail =
        typeof authUserData?.user?.email === "string"
          ? authUserData.user.email.trim()
          : "";

      if (authEmail) {
        return {
          email: authEmail,
          source: "supabase.auth",
        };
      }
    }
  } catch (error) {
    console.error(
      "Supabase Auth email lookup exception:",
      error
    );
  }

  // ----------------------------------------------------------
  // NOTHING FOUND
  // ----------------------------------------------------------

  return {
    email: null,
    source: null,
    error:
      "No email found in reward_claims, profiles, or Supabase Auth.",
  };
}

// ============================================================
// SEND CLAIM STATUS EMAIL
// ============================================================

async function sendClaimStatusEmail(
  claim,
  status,
  adminSupabase
) {
  try {
    // ----------------------------------------------------------
    // EMAIL ONLY FOR APPROVED / REJECTED
    // ----------------------------------------------------------

    if (
      status !== "approved" &&
      status !== "rejected"
    ) {
      return {
        success: true,
        skipped: true,
        reason:
          "Email is only sent for approved or rejected claims.",
      };
    }

    // ----------------------------------------------------------
    // RESOLVE EMAIL
    // ----------------------------------------------------------

    const emailResolution =
      await resolveClaimantEmail(
        adminSupabase,
        claim
      );

    if (!emailResolution.email) {
      console.error(
        "Claim status email failed: no recipient email found.",
        {
          claimId: claim?.id,
          userId: claim?.user_id,
          status,
          error: emailResolution.error,
        }
      );

      return {
        success: false,
        skipped: true,
        error:
          emailResolution.error ||
          "Claimant email is missing.",
      };
    }

    const recipientEmail =
      emailResolution.email;

    console.log(
      "Claim status email recipient resolved:",
      {
        claimId: claim?.id,
        userId: claim?.user_id,
        source: emailResolution.source,
        recipient: recipientEmail,
      }
    );

    // ----------------------------------------------------------
    // RESEND
    // ----------------------------------------------------------

    const resend = getResendClient();

    const fromEmail =
      process.env.CLAIM_EMAIL_FROM ||
      "BizGrow Holdings <noreply@bizgrow-holdings.com>";

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://bizgrow-holdings.com";

    // ----------------------------------------------------------
    // CLAIM DATA
    // ----------------------------------------------------------

    const amount = Number(claim.amount || 0);

    const claimantName = escapeHtml(
      claim.contact_name || "there"
    );

    const serviceName = escapeHtml(
      claim.service_name || "your selected service"
    );

    const companyName = escapeHtml(
      claim.company_name || ""
    );

    // ==========================================================
    // APPROVED EMAIL
    // ==========================================================

    if (status === "approved") {
      const { data, error } =
        await resend.emails.send({
          from: fromEmail,

          to: [recipientEmail],

          subject:
            "Your BizGrow Referral Reward Has Been Approved",

          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <title>
                  Referral Reward Approved
                </title>
              </head>

              <body
                style="
                  margin:0;
                  padding:0;
                  background:#f8fafc;
                  font-family:Arial,Helvetica,sans-serif;
                "
              >

                <div
                  style="
                    max-width:650px;
                    margin:0 auto;
                    padding:40px 20px;
                  "
                >

                  <div
                    style="
                      background:#ffffff;
                      border:1px solid #e2e8f0;
                      border-radius:16px;
                      overflow:hidden;
                    "
                  >

                    <div
                      style="
                        background:#12066a;
                        padding:30px 35px;
                        text-align:center;
                      "
                    >

                      <h1
                        style="
                          margin:0;
                          color:#ffffff;
                          font-size:26px;
                          font-weight:700;
                        "
                      >
                        Reward Approved
                      </h1>

                      <p
                        style="
                          margin:10px 0 0;
                          color:#ddd8f5;
                          font-size:14px;
                        "
                      >
                        BizGrow Referral Programme
                      </p>

                    </div>

                    <div style="padding:35px;">

                      <p
                        style="
                          margin:0 0 18px;
                          color:#1e293b;
                          font-size:16px;
                          line-height:1.7;
                        "
                      >
                        Hi ${claimantName},
                      </p>

                      <p
                        style="
                          margin:0 0 18px;
                          color:#475569;
                          font-size:15px;
                          line-height:1.7;
                        "
                      >
                        Great news! Your referral reward
                        claim has been
                        <strong style="color:#059669;">
                          approved
                        </strong>
                        by the BizGrow team.
                      </p>

                      <div
                        style="
                          margin:25px 0;
                          padding:24px;
                          background:#f8fafc;
                          border:1px solid #e2e8f0;
                          border-radius:12px;
                        "
                      >

                        <div style="margin-bottom:14px;">

                          <span
                            style="
                              display:block;
                              color:#64748b;
                              font-size:12px;
                              font-weight:700;
                              text-transform:uppercase;
                            "
                          >
                            Approved Reward
                          </span>

                          <span
                            style="
                              display:block;
                              margin-top:5px;
                              color:#12066a;
                              font-size:30px;
                              font-weight:800;
                            "
                          >
                            £${amount.toLocaleString("en-GB")}
                          </span>

                        </div>

                        <div style="margin-bottom:14px;">

                          <span
                            style="
                              display:block;
                              color:#64748b;
                              font-size:12px;
                              font-weight:700;
                              text-transform:uppercase;
                            "
                          >
                            Service
                          </span>

                          <span
                            style="
                              display:block;
                              margin-top:5px;
                              color:#1e293b;
                              font-size:15px;
                              font-weight:600;
                            "
                          >
                            ${serviceName}
                          </span>

                        </div>

                        ${
                          companyName
                            ? `
                              <div>

                                <span
                                  style="
                                    display:block;
                                    color:#64748b;
                                    font-size:12px;
                                    font-weight:700;
                                    text-transform:uppercase;
                                  "
                                >
                                  Company
                                </span>

                                <span
                                  style="
                                    display:block;
                                    margin-top:5px;
                                    color:#1e293b;
                                    font-size:15px;
                                    font-weight:600;
                                  "
                                >
                                  ${companyName}
                                </span>

                              </div>
                            `
                            : ""
                        }

                      </div>

                      <p
                        style="
                          margin:0 0 18px;
                          color:#475569;
                          font-size:15px;
                          line-height:1.7;
                        "
                      >
                        Your reward has now been approved.
                        Our team will proceed with the next
                        steps for your selected service.
                      </p>

                      <p
                        style="
                          margin:0 0 25px;
                          color:#475569;
                          font-size:15px;
                          line-height:1.7;
                        "
                      >
                        If you have any questions, please
                        contact the BizGrow team and we will
                        be happy to assist you.
                      </p>

                      <div
                        style="
                          text-align:center;
                          margin:30px 0;
                        "
                      >

                        <a
                          href="${siteUrl}/referral-program/"
                          style="
                            display:inline-block;
                            background:#12066a;
                            color:#ffffff;
                            text-decoration:none;
                            padding:14px 28px;
                            border-radius:8px;
                            font-size:14px;
                            font-weight:700;
                          "
                        >
                          View Referral Dashboard
                        </a>

                      </div>

                      <p
                        style="
                          margin:30px 0 0;
                          color:#64748b;
                          font-size:13px;
                          line-height:1.6;
                        "
                      >
                        Thank you for being part of the
                        BizGrow Referral Programme.
                      </p>

                    </div>

                    <div
                      style="
                        background:#f8fafc;
                        border-top:1px solid #e2e8f0;
                        padding:20px 35px;
                        text-align:center;
                      "
                    >

                      <p
                        style="
                          margin:0;
                          color:#94a3b8;
                          font-size:12px;
                        "
                      >
                        © ${new Date().getFullYear()}
                        BizGrow Holdings.
                        All rights reserved.
                      </p>

                    </div>

                  </div>

                </div>

              </body>
            </html>
          `,
        });

      if (error) {
        console.error(
          "APPROVED CLAIM EMAIL ERROR:",
          error
        );

        return {
          success: false,
          error:
            error.message ||
            "Failed to send approval email.",
        };
      }

      console.log(
        "APPROVED CLAIM EMAIL SENT SUCCESSFULLY:",
        {
          claimId: claim.id,
          recipient: recipientEmail,
          emailId: data?.id || null,
          source: emailResolution.source,
        }
      );

      return {
        success: true,
        emailId: data?.id || null,
        recipient: recipientEmail,
        source: emailResolution.source,
      };
    }

    // ==========================================================
    // REJECTED EMAIL
    // ==========================================================

    if (status === "rejected") {
      const { data, error } =
        await resend.emails.send({
          from: fromEmail,

          to: [recipientEmail],

          subject:
            "Update Regarding Your BizGrow Referral Reward Claim",

          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <title>
                  Referral Reward Claim Update
                </title>
              </head>

              <body
                style="
                  margin:0;
                  padding:0;
                  background:#f8fafc;
                  font-family:Arial,Helvetica,sans-serif;
                "
              >

                <div
                  style="
                    max-width:650px;
                    margin:0 auto;
                    padding:40px 20px;
                  "
                >

                  <div
                    style="
                      background:#ffffff;
                      border:1px solid #e2e8f0;
                      border-radius:16px;
                      overflow:hidden;
                    "
                  >

                    <div
                      style="
                        background:#12066a;
                        padding:30px 35px;
                        text-align:center;
                      "
                    >

                      <h1
                        style="
                          margin:0;
                          color:#ffffff;
                          font-size:26px;
                          font-weight:700;
                        "
                      >
                        Claim Update
                      </h1>

                      <p
                        style="
                          margin:10px 0 0;
                          color:#ddd8f5;
                          font-size:14px;
                        "
                      >
                        BizGrow Referral Programme
                      </p>

                    </div>

                    <div style="padding:35px;">

                      <p
                        style="
                          margin:0 0 18px;
                          color:#1e293b;
                          font-size:16px;
                          line-height:1.7;
                        "
                      >
                        Hi ${claimantName},
                      </p>

                      <p
                        style="
                          margin:0 0 18px;
                          color:#475569;
                          font-size:15px;
                          line-height:1.7;
                        "
                      >
                        Thank you for submitting your
                        referral reward claim.
                        After reviewing your claim, we're
                        unable to approve it at this time.
                      </p>

                      <div
                        style="
                          margin:25px 0;
                          padding:24px;
                          background:#fef2f2;
                          border:1px solid #fecaca;
                          border-radius:12px;
                        "
                      >

                        <div style="margin-bottom:14px;">

                          <span
                            style="
                              display:block;
                              color:#64748b;
                              font-size:12px;
                              font-weight:700;
                              text-transform:uppercase;
                            "
                          >
                            Claim Status
                          </span>

                          <span
                            style="
                              display:block;
                              margin-top:5px;
                              color:#dc2626;
                              font-size:20px;
                              font-weight:800;
                            "
                          >
                            Rejected
                          </span>

                        </div>

                        <div style="margin-bottom:14px;">

                          <span
                            style="
                              display:block;
                              color:#64748b;
                              font-size:12px;
                              font-weight:700;
                              text-transform:uppercase;
                            "
                          >
                            Claim Amount
                          </span>

                          <span
                            style="
                              display:block;
                              margin-top:5px;
                              color:#12066a;
                              font-size:24px;
                              font-weight:800;
                            "
                          >
                            £${amount.toLocaleString("en-GB")}
                          </span>

                        </div>

                        <div>

                          <span
                            style="
                              display:block;
                              color:#64748b;
                              font-size:12px;
                              font-weight:700;
                              text-transform:uppercase;
                            "
                          >
                            Service
                          </span>

                          <span
                            style="
                              display:block;
                              margin-top:5px;
                              color:#1e293b;
                              font-size:15px;
                              font-weight:600;
                            "
                          >
                            ${serviceName}
                          </span>

                        </div>

                      </div>

                      <p
                        style="
                          margin:0 0 18px;
                          color:#475569;
                          font-size:15px;
                          line-height:1.7;
                        "
                      >
                        If you believe this decision was
                        made in error or you would like
                        further information, please contact
                        the BizGrow team.
                      </p>

                      <div
                        style="
                          text-align:center;
                          margin:30px 0;
                        "
                      >

                        <a
                          href="${siteUrl}/referral-program/"
                          style="
                            display:inline-block;
                            background:#12066a;
                            color:#ffffff;
                            text-decoration:none;
                            padding:14px 28px;
                            border-radius:8px;
                            font-size:14px;
                            font-weight:700;
                          "
                        >
                          View Referral Dashboard
                        </a>

                      </div>

                      <p
                        style="
                          margin:30px 0 0;
                          color:#64748b;
                          font-size:13px;
                          line-height:1.6;
                        "
                      >
                        If you have any questions about your
                        claim, please contact our team.
                      </p>

                    </div>

                    <div
                      style="
                        background:#f8fafc;
                        border-top:1px solid #e2e8f0;
                        padding:20px 35px;
                        text-align:center;
                      "
                    >

                      <p
                        style="
                          margin:0;
                          color:#94a3b8;
                          font-size:12px;
                        "
                      >
                        © ${new Date().getFullYear()}
                        BizGrow Holdings.
                        All rights reserved.
                      </p>

                    </div>

                  </div>

                </div>

              </body>
            </html>
          `,
        });

      if (error) {
        console.error(
          "REJECTED CLAIM EMAIL ERROR:",
          error
        );

        return {
          success: false,
          error:
            error.message ||
            "Failed to send rejection email.",
        };
      }

      console.log(
        "REJECTED CLAIM EMAIL SENT SUCCESSFULLY:",
        {
          claimId: claim.id,
          recipient: recipientEmail,
          emailId: data?.id || null,
          source: emailResolution.source,
        }
      );

      return {
        success: true,
        emailId: data?.id || null,
        recipient: recipientEmail,
        source: emailResolution.source,
      };
    }

    return {
      success: true,
      skipped: true,
    };
  } catch (error) {
    console.error(
      "Claim status email exception:",
      error
    );

    return {
      success: false,
      error:
        error?.message ||
        "Claim status email could not be sent.",
    };
  }
}

// ============================================================
// POST - UPDATE CLAIM STATUS
// ============================================================

export async function POST(request, { params }) {
  try {
    // ========================================================
    // AUTHENTICATION
    // ========================================================

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // ========================================================
    // ADMIN CHECK
    // ========================================================

    const isAdmin = await verifyAdmin(
      supabase,
      user.id
    );

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: "Admin access required",
        },
        { status: 403 }
      );
    }

    // ========================================================
    // ADMIN SUPABASE CLIENT
    // ========================================================

    const adminSupabase = getAdminClient();

    // ========================================================
    // GET CLAIM ID
    // ========================================================

    const resolvedParams = await params;

    const routeClaimId =
      resolvedParams?.claimId;

    // ========================================================
    // READ REQUEST BODY
    // ========================================================

    let body = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const bodyClaimId =
      body?.claim_id;

    const newStatus =
      body?.new_status;

    const claimId =
      routeClaimId || bodyClaimId;

    // ========================================================
    // VALIDATE CLAIM ID
    // ========================================================

    if (!claimId) {
      return NextResponse.json(
        {
          success: false,
          error: "claim_id is required",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // VALIDATE STATUS
    // ========================================================

    const allowedStatuses = [
      "pending",
      "under_review",
      "approved",
      "rejected",
      "completed",
      "claimed",
    ];

    if (
      !newStatus ||
      !allowedStatuses.includes(newStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "new_status must be one of: pending, under_review, approved, rejected, completed, claimed",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // GET CURRENT CLAIM
    // IMPORTANT:
    // TABLE = reward_claims
    // ========================================================

    const {
      data: currentClaim,
      error: claimError,
    } = await adminSupabase
      .from("reward_claims")
      .select(
        `
          id,
          user_id,
          amount,
          status,
          service_name,
          company_name,
          contact_name,
          phone,
          email,
          notes,
          created_at,
          updated_at
        `
      )
      .eq("id", claimId)
      .maybeSingle();

    if (claimError) {
      console.error(
        "Get claim error:",
        claimError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            claimError.message ||
            "Unable to fetch claim",
        },
        { status: 500 }
      );
    }

    if (!currentClaim) {
      return NextResponse.json(
        {
          success: false,
          error: "Claim not found",
        },
        { status: 404 }
      );
    }

    // ========================================================
    // PREVENT SAME STATUS UPDATE
    // ========================================================

    if (
      currentClaim.status ===
      newStatus
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            `Claim is already ${newStatus}.`,
        },
        { status: 400 }
      );
    }

    // ========================================================
    // APPROVAL VALIDATION
    // ========================================================

    if (newStatus === "approved") {
      const REWARD_PER_REFERRAL = 125;
      const MAX_REWARD = 1000;
      const REWARD_VALIDITY_YEARS = 1;

      const claimAmount =
        Number(
          currentClaim.amount || 0
        );

      if (
        !Number.isFinite(claimAmount) ||
        claimAmount <= 0
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid claim amount",
          },
          { status: 400 }
        );
      }

      // ======================================================
      // GET REFERRALS
      // IMPORTANT:
      // TABLE = referrals
      // ======================================================

      const {
        data: referrals,
        error: referralsError,
      } = await adminSupabase
        .from("referrals")
        .select("id, created_at")
        .eq(
          "referrer_id",
          currentClaim.user_id
        );

      if (referralsError) {
        console.error(
          "Referral reward verification error:",
          referralsError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Unable to verify referral rewards",
          },
          { status: 500 }
        );
      }

      // ======================================================
      // CHECK NON-EXPIRED REFERRALS
      // ======================================================

      const now = new Date();

      const validReferrals =
        (referrals || []).filter(
          (referral) => {
            if (!referral?.created_at) {
              return false;
            }

            const expiry =
              new Date(
                referral.created_at
              );

            expiry.setFullYear(
              expiry.getFullYear() +
                REWARD_VALIDITY_YEARS
            );

            return now < expiry;
          }
        );

      // ======================================================
      // TOTAL EARNED REWARD
      // ======================================================

      const earnedReward =
        Math.min(
          validReferrals.length *
            REWARD_PER_REFERRAL,
          MAX_REWARD
        );

      // ======================================================
      // GET OTHER CLAIMS
      // IMPORTANT:
      // TABLE = reward_claims
      // ======================================================

      const {
        data: previousClaims,
        error:
          previousClaimsError,
      } = await adminSupabase
        .from("reward_claims")
        .select(
          "id, amount, status"
        )
        .eq(
          "user_id",
          currentClaim.user_id
        )
        .neq("id", claimId);

      if (previousClaimsError) {
        console.error(
          "Previous claims error:",
          previousClaimsError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Unable to verify existing claims",
          },
          { status: 500 }
        );
      }

      // ======================================================
      // SUCCESSFUL CLAIMS
      // ======================================================

      const successfulClaimAmount =
        (previousClaims || [])
          .filter(
            (claim) =>
              claim.status ===
                "approved" ||
              claim.status ===
                "completed" ||
              claim.status ===
                "claimed"
          )
          .reduce(
            (total, claim) =>
              total +
              Number(
                claim.amount || 0
              ),
            0
          );

      // ======================================================
      // OTHER PENDING CLAIMS
      // ======================================================

      const pendingClaimAmount =
        (previousClaims || [])
          .filter(
            (claim) =>
              claim.status ===
                "pending" ||
              claim.status ===
                "under_review"
          )
          .reduce(
            (total, claim) =>
              total +
              Number(
                claim.amount || 0
              ),
            0
          );

      // ======================================================
      // AVAILABLE REWARD
      // ======================================================

      const availableReward =
        Math.max(
          earnedReward -
            successfulClaimAmount -
            pendingClaimAmount,
          0
        );

      // ======================================================
      // CHECK CLAIM AMOUNT
      // ======================================================

      if (
        claimAmount >
        availableReward
      ) {
        return NextResponse.json(
          {
            success: false,

            error:
              `User only has £${availableReward} available. Claim is for £${claimAmount}.`,

            available:
              availableReward,

            requested:
              claimAmount,

            earned:
              earnedReward,

            successfulClaims:
              successfulClaimAmount,

            pendingClaims:
              pendingClaimAmount,

            validReferrals:
              validReferrals.length,
          },
          { status: 400 }
        );
      }
    }

    // ========================================================
    // UPDATE CLAIM STATUS
    // IMPORTANT:
    // TABLE = reward_claims
    // ========================================================

    const updateData = {
      status: newStatus,
      updated_at:
        new Date().toISOString(),
    };

    const {
      data: updatedClaim,
      error: updateError,
    } = await adminSupabase
      .from("reward_claims")
      .update(updateData)
      .eq("id", claimId)
      .select(
        `
          id,
          user_id,
          service_name,
          company_name,
          contact_name,
          phone,
          email,
          notes,
          amount,
          status,
          created_at,
          updated_at
        `
      )
      .single();

    if (updateError) {
      console.error(
        "Claim update error:",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            updateError.message ||
            "Unable to update claim status",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // SEND EMAIL AFTER SUCCESSFUL DB UPDATE
    //
    // approved -> EMAIL
    // rejected -> EMAIL
    //
    // pending -> NO EMAIL
    // under_review -> NO EMAIL
    // completed -> NO EMAIL
    // claimed -> NO EMAIL
    // ========================================================

    let emailResult = null;

    const shouldSendEmail =
      newStatus === "approved" ||
      newStatus === "rejected";

    if (shouldSendEmail) {
      console.log(
        "Sending claim status email...",
        {
          claimId: updatedClaim.id,
          status: updatedClaim.status,
          claimEmail:
            updatedClaim.email || null,
          userId:
            updatedClaim.user_id,
        }
      );

      emailResult =
        await sendClaimStatusEmail(
          updatedClaim,
          newStatus,
          adminSupabase
        );

      if (emailResult.success) {
        console.log(
          "Claim status email sent successfully.",
          {
            claimId: updatedClaim.id,
            status: newStatus,
            recipient:
              emailResult.recipient ||
              null,
            source:
              emailResult.source ||
              null,
            emailId:
              emailResult.emailId ||
              null,
          }
        );
      } else {
        console.error(
          "Claim status email FAILED.",
          {
            claimId: updatedClaim.id,
            status: newStatus,
            error:
              emailResult.error ||
              "Unknown email error",
          }
        );
      }
    } else {
      console.log(
        "No email required for claim status:",
        newStatus
      );
    }

    // ========================================================
    // AUDIT LOG
    // ========================================================

    console.log(
      "========================================"
    );

    console.log(
      "ADMIN CLAIM STATUS UPDATE"
    );

    console.log(
      "========================================"
    );

    console.log({
      claimId,

      previousStatus:
        currentClaim.status,

      newStatus,

      adminId:
        user.id,

      claimAmount:
        currentClaim.amount,

      recipient:
        emailResult?.recipient ||
        updatedClaim.email ||
        null,

      emailSource:
        emailResult?.source ||
        null,

      emailRequired:
        shouldSendEmail,

      emailSent:
        emailResult?.success ||
        false,

      emailId:
        emailResult?.emailId ||
        null,

      emailError:
        emailResult?.success
          ? null
          : emailResult?.error ||
            null,

      timestamp:
        new Date().toISOString(),
    });

    console.log(
      "========================================"
    );

    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Claim status updated successfully",

        claim:
          updatedClaim,

        email:
          shouldSendEmail
            ? {
                required: true,

                sent:
                  emailResult?.success ||
                  false,

                recipient:
                  emailResult?.recipient ||
                  null,

                source:
                  emailResult?.source ||
                  null,

                emailId:
                  emailResult?.emailId ||
                  null,

                error:
                  emailResult?.success
                    ? null
                    : emailResult?.error ||
                      "Email could not be sent.",
              }
            : {
                required: false,
                sent: false,
                recipient: null,
                source: null,
                emailId: null,
                error: null,
              },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Admin claim update API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Server error",
      },
      { status: 500 }
    );
  }
}


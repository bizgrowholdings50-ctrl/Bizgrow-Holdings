import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const REWARD_PER_REFERRAL = 125;
const MAX_REWARD = 1000;
const REWARD_VALIDITY_YEARS = 1;
const REWARD_CLAIMS_TABLE = "reward_claims";

const SALES_EMAIL =
  process.env.SALES_EMAIL || "sales@bizgrow-holdings.net";

// ============================================================
// SEND CLAIM EMAIL NOTIFICATIONS
// ============================================================

async function sendClaimNotifications({
  user,
  claim,
  companyName,
  contactName,
  phone,
  serviceName,
  notes,
  referredUser,
}) {
  const clientEmail = user?.email?.trim().toLowerCase();

  if (!clientEmail && !SALES_EMAIL) {
    return;
  }

  const claimAmount = Number(claim?.amount || 0);

  const claimSummary = [
    `Company: ${companyName}`,
    `Contact: ${contactName}`,
    `Phone: ${phone}`,
    `Service: ${serviceName}`,
    `Amount: £${claimAmount}`,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("<br />");

  // ============================================================
  // ADMIN / SALES TEAM EMAIL
  // ============================================================

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; background: #ffffff; color: #0f172a;">

      <h2 style="margin-top: 0; color: #12066a;">
        Referral Reward Claim Submitted
      </h2>

      <p>
        A new reward claim has been submitted by a referral partner.
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">

        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #475569;">
            Claim ID:
          </td>
          <td style="padding: 8px 0;">
            ${claim?.id || "N/A"}
          </td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">
            Referrer:
          </td>
          <td style="padding: 8px 0;">
            ${contactName}
          </td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">
            Company:
          </td>
          <td style="padding: 8px 0;">
            ${companyName}
          </td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">
            Phone:
          </td>
          <td style="padding: 8px 0;">
            ${phone}
          </td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">
            Email:
          </td>
          <td style="padding: 8px 0;">
            ${clientEmail || "Not provided"}
          </td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">
            Service:
          </td>
          <td style="padding: 8px 0;">
            ${serviceName}
          </td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">
            Amount:
          </td>
          <td style="padding: 8px 0;">
            £${claimAmount}
          </td>
        </tr>

      </table>

      <!-- REFERRED PERSON DETAILS -->

      <div style="margin-top: 24px; padding: 18px; background: #f8fafc; border-left: 4px solid #997819; border-radius: 8px;">

        <h3 style="margin: 0 0 12px 0; color: #12066a;">
          Referred Person Details
        </h3>

        <p style="margin: 0 0 14px 0; color: #475569;">
          This is the person associated with the referral being used for this claim.
          Sales team can verify separately whether this referred person became a BizGrow client.
        </p>

        <table style="width: 100%; border-collapse: collapse;">

          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #475569;">
              Name:
            </td>
            <td style="padding: 6px 0;">
              ${referredUser?.full_name || "Not provided"}
            </td>
          </tr>

          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">
              Company:
            </td>
            <td style="padding: 6px 0;">
              ${referredUser?.company_name || "Not provided"}
            </td>
          </tr>

          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">
              Email:
            </td>
            <td style="padding: 6px 0;">
              ${referredUser?.email || "Not provided"}
            </td>
          </tr>

          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">
              Phone:
            </td>
            <td style="padding: 6px 0;">
              ${referredUser?.contact_number || "Not provided"}
            </td>
          </tr>

          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">
              Referral Status:
            </td>
            <td style="padding: 6px 0;">
              ${referredUser?.referral_status || "Pending"}
            </td>
          </tr>

        </table>

      </div>

      <!-- ADDITIONAL NOTES -->

      <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid #12066a; border-radius: 8px;">

        <strong>Additional Notes:</strong>

        <p style="margin: 8px 0 0; line-height: 1.6;">
          ${notes || "No notes provided."}
        </p>

      </div>

    </div>
  `;

  // ============================================================
  // CLIENT EMAIL
  // ============================================================

  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; background: #ffffff; color: #0f172a;">

      <h2 style="margin-top: 0; color: #12066a;">
        Your referral reward claim is submitted
      </h2>

      <p>
        Thank you for submitting your reward claim for
        <strong>${serviceName}</strong>.
      </p>

      <p>
        We have received your request and the BizGrow sales team will review it shortly.
      </p>

      <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid #997819; border-radius: 8px;">

        <strong>Claim summary</strong>

        <p style="margin: 10px 0 0; line-height: 1.7;">
          ${claimSummary}
        </p>

      </div>

      <p style="margin-top: 20px;">
        If we need any extra information, we will contact you on ${phone}.
      </p>

    </div>
  `;

  const emailPromises = [];

  // ============================================================
  // CLIENT EMAIL
  // ============================================================

  if (clientEmail) {
    emailPromises.push(
      resend.emails.send({
        from: "BizGrow Holdings <sales@bizgrow-holdings.net>",
        to: [clientEmail],
        reply_to: SALES_EMAIL,
        subject:
          "Your BizGrow referral reward claim has been received",
        html: clientHtml,
      })
    );
  }

  // ============================================================
  // SALES TEAM EMAIL
  // ============================================================

  emailPromises.push(
    resend.emails.send({
      from: "BizGrow Sales <sales@bizgrow-holdings.net>",
      to: [SALES_EMAIL],
      reply_to: clientEmail || SALES_EMAIL,
      subject: `Referral reward claim: ${companyName} - £${claimAmount}`,
      html: adminHtml,
    })
  );

  await Promise.allSettled(emailPromises);
}

// ============================================================
// ADMIN SUPABASE CLIENT
// ============================================================

function getAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing."
    );
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
// POST
// ============================================================

export async function POST(request) {
  try {
    // ========================================================
    // AUTHENTICATED USER
    // ========================================================

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error(
        "Claim auth error:",
        authError
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify your account.",
        },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          error:
            "You must be logged in to submit a reward claim.",
        },
        { status: 401 }
      );
    }

    // ========================================================
    // ADMIN CLIENT
    // ========================================================

    const adminSupabase =
      getAdminClient();

    // ========================================================
    // REQUEST BODY
    // ========================================================

    let body;

    try {
      body = await request.json();
    } catch (error) {
      console.error(
        "Claim request JSON error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Invalid request data.",
        },
        { status: 400 }
      );
    }

    const {
      serviceName,
      amount,
      companyName,
      contactName,
      phone,
      notes,
    } = body || {};

    // ========================================================
    // BASIC VALIDATION
    // ========================================================

    if (
      !serviceName ||
      typeof serviceName !== "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Please select a service.",
        },
        { status: 400 }
      );
    }

    const claimAmount =
      Number(amount);

    if (
      !Number.isFinite(claimAmount) ||
      claimAmount <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid reward amount.",
        },
        { status: 400 }
      );
    }

    if (
      claimAmount %
        REWARD_PER_REFERRAL !==
      0
    ) {
      return NextResponse.json(
        {
          error:
            "Reward amount must be in £125 increments.",
        },
        { status: 400 }
      );
    }

    if (
      claimAmount > MAX_REWARD
    ) {
      return NextResponse.json(
        {
          error:
            `The maximum reward claim is £${MAX_REWARD}.`,
        },
        { status: 400 }
      );
    }

    if (
      !companyName ||
      !companyName.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Company name is required.",
        },
        { status: 400 }
      );
    }

    if (
      !contactName ||
      !contactName.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Contact name is required.",
        },
        { status: 400 }
      );
    }

    if (
      !phone ||
      !phone.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Phone number is required.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // GET USER REFERRALS
    // ========================================================

    const {
      data: referrals,
      error: referralsError,
    } =
      await adminSupabase
        .from("referrals")
        .select(
          "id, referred_user_id, created_at, status"
        )
        .eq(
          "referrer_id",
          user.id
        );

    if (referralsError) {
      console.error(
        "Claim referral lookup error:",
        {
          code: referralsError.code,
          message: referralsError.message,
          details: referralsError.details,
          hint: referralsError.hint,
        }
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify your referral rewards right now.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // CALCULATE ACTIVE REFERRALS
    // ========================================================

    const now = new Date();

    const validReferrals =
      (referrals || [])
        .filter((referral) => {
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
        })
        .sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );

    const activeReferralCount =
      validReferrals.length;

    const earnedReward =
      Math.min(
        activeReferralCount *
          REWARD_PER_REFERRAL,
        MAX_REWARD
      );

    // ========================================================
    // GET EXISTING CLAIMS
    // ========================================================

    const {
      data: previousClaims,
      error: claimsError,
    } =
      await adminSupabase
        .from(
          REWARD_CLAIMS_TABLE
        )
        .select(
          "id, user_id, amount, status, created_at, updated_at"
        )
        .eq(
          "user_id",
          user.id
        );

    if (claimsError) {
      console.error(
        "Claim history lookup error:",
        {
          code: claimsError.code,
          message: claimsError.message,
          details: claimsError.details,
          hint: claimsError.hint,
        }
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify your existing reward claims.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // CALCULATE SUCCESSFUL CLAIMED AMOUNT
    // ========================================================

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

    // ========================================================
    // CALCULATE PENDING CLAIM AMOUNT
    // ========================================================

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

    // ========================================================
    // AVAILABLE REWARD
    // ========================================================

    const availableReward =
      Math.max(
        earnedReward -
          successfulClaimAmount -
          pendingClaimAmount,
        0
      );

    // ========================================================
    // DEBUG INFORMATION
    // ========================================================

    console.log(
      "===================================================="
    );

    console.log(
      "REFERRAL CLAIM VERIFICATION"
    );

    console.log({
      userId: user.id,

      referralCount:
        referrals?.length || 0,

      activeReferralCount,

      referralIds:
        validReferrals.map(
          (referral) => referral.id
        ),

      referralStatuses:
        validReferrals.map(
          (referral) => ({
            id: referral.id,
            status:
              referral.status ||
              "pending",
            created_at:
              referral.created_at,
          })
        ),

      earnedReward,

      previousClaims:
        previousClaims?.map(
          (claim) => ({
            id: claim.id,
            amount:
              Number(
                claim.amount || 0
              ),
            status:
              claim.status,
            created_at:
              claim.created_at,
          })
        ) || [],

      successfulClaimAmount,

      pendingClaimAmount,

      availableReward,

      requestedAmount:
        claimAmount,

      latestReferralId:
        validReferrals[0]?.id ||
        null,
    });

    console.log(
      "===================================================="
    );

    // ========================================================
    // FINAL AMOUNT CHECK
    // ========================================================

    if (
      claimAmount >
      availableReward
    ) {
      return NextResponse.json(
        {
          error:
            `You currently have £${availableReward} available to claim.`,

          details: {
            requestedAmount:
              claimAmount,

            availableReward,

            activeReferralCount,

            earnedReward,

            successfulClaimAmount,

            pendingClaimAmount,

            referralCount:
              referrals?.length || 0,

            previousClaimCount:
              previousClaims?.length ||
              0,
          },
        },
        { status: 400 }
      );
    }

    // ========================================================
    // ACTIVE REFERRAL CHECK
    // ========================================================

    if (
      !validReferrals.length
    ) {
      return NextResponse.json(
        {
          error:
            "You do not have an active referral available for this claim.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // GET THE EXACT REFERRED USER
    // ========================================================

    const currentReferral =
      validReferrals[0];

    let referredUser = null;

    if (
      currentReferral?.referred_user_id
    ) {
      const {
        data: referredProfile,
        error: referredProfileError,
      } =
        await adminSupabase
          .from("profiles")
          .select(
            "full_name, email, company_name, contact_number"
          )
          .eq(
            "id",
            currentReferral.referred_user_id
          )
          .maybeSingle();

      if (referredProfileError) {
        console.error(
          "Referred profile lookup error:",
          {
            code:
              referredProfileError.code,
            message:
              referredProfileError.message,
            details:
              referredProfileError.details,
            hint:
              referredProfileError.hint,
          }
        );
      } else if (
        referredProfile
      ) {
        referredUser = {
          ...referredProfile,
          referral_status:
            currentReferral.status ||
            "pending",
        };
      }
    }

    console.log(
      "Referral Claim Referred User:",
      {
        referralId:
          currentReferral.id,

        referredUserId:
          currentReferral.referred_user_id,

        referredUser:
          referredUser
            ? {
                name:
                  referredUser.full_name,
                email:
                  referredUser.email,
                company:
                  referredUser.company_name,
              }
            : null,
      }
    );

    // ========================================================
    // INSERT CLAIM
    // ========================================================

    const {
      data: claim,
      error: insertError,
    } =
      await adminSupabase
        .from(
          REWARD_CLAIMS_TABLE
        )
        .insert({
          user_id: user.id,

          service_name:
            serviceName.trim(),

          company_name:
            companyName.trim(),

          contact_name:
            contactName.trim(),

          phone:
            phone.trim(),

          email:
            user.email
              ?.trim()
              .toLowerCase() ||
            null,

          notes:
            notes?.trim() ||
            null,

          amount:
            claimAmount,

          status:
            "pending",
        })
        .select(
          "id, user_id, service_name, company_name, contact_name, phone, email, notes, amount, status, created_at, updated_at"
        )
        .single();

    if (insertError) {
      console.error(
        "Claim insert error:",
        {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
        }
      );

      return NextResponse.json(
        {
          error:
            "Unable to submit your reward claim. Please try again.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // SUCCESS + NOTIFICATIONS
    // ========================================================

    try {
      await sendClaimNotifications({
        user,
        claim,

        companyName:
          companyName.trim(),

        contactName:
          contactName.trim(),

        phone:
          phone.trim(),

        serviceName:
          serviceName.trim(),

        notes:
          notes?.trim() || "",

        referredUser,
      });
    } catch (emailError) {
      console.error(
        "Claim email notification failed:",
        emailError
      );
    }

    // ========================================================
    // FINAL RESPONSE
    // ========================================================

    return NextResponse.json(
      {
        success: true,

        claim,

        message:
          "Your reward claim has been submitted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Referral claim API fatal error:",
      {
        code: error?.code,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
      }
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Something went wrong while submitting your claim.",
      },
      { status: 500 }
    );
  }
}
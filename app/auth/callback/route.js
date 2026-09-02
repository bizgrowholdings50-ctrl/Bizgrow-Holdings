import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// 👇 YE 2 LINES ADD KARNI HAIN — bas itna hi
export const dynamic = "force-dynamic";
export const revalidate = 0;

function generateReferralCode() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
}

// ============================================================
// SERVICE ROLE ADMIN CLIENT
// =========================================================

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
  }

  return createSupabaseAdmin(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ============================================================
// SAFE INTERNAL REDIRECT
// ============================================================

function getSafeInternalPath(path, fallback) {
  if (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//")
  ) {
    return path;
  }

  return fallback;
}

// ============================================================
// AUTH CALLBACK
// ============================================================

export async function GET(request) {
  console.log("======================================================");
  console.log("AUTH CALLBACK STARTED");
  console.log("URL:", request.url);
  console.log("======================================================");

  try {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const refParam = searchParams.get("ref");
    const requestedNext = searchParams.get("next");

    // ========================================================
    // READ REFERRAL COOKIE
    // ========================================================

    const cookieStore = await cookies();
    const refCookie = cookieStore.get("bizgrow_referrer");

    const cookieReferralCode = refCookie?.value?.trim() || "";
    const queryReferralCode = refParam?.trim() || "";

    // Query parameter has priority over cookie.
    const rawReferralCode =
      queryReferralCode || cookieReferralCode;

    let referralCode = "";

    try {
      referralCode = rawReferralCode
        ? decodeURIComponent(rawReferralCode).trim().toUpperCase()
        : "";
    } catch {
      referralCode = rawReferralCode.trim().toUpperCase();
    }

    console.log("REFERRAL SOURCE:", {
      queryReferralCode,
      cookieReferralCode,
      referralCode,
    });

    // ========================================================
    // OAUTH CODE CHECK
    // ========================================================

    if (!code) {
      console.error("No OAuth code found.");

      return NextResponse.redirect(
        new URL("/referral-program", origin)
      );
    }

    // ========================================================
    // CLIENTS
    // ========================================================

    const authClient = await createClient();
    const adminClient = getAdminClient();

    // ========================================================
    // EXCHANGE GOOGLE CODE FOR SESSION
    // ========================================================

    const {
      data: { session },
      error: exchangeError,
    } = await authClient.auth.exchangeCodeForSession(code);

    if (exchangeError || !session?.user) {
      console.error(
        "OAuth exchange failed:",
        exchangeError
      );

      return NextResponse.redirect(
        new URL("/referral-program", origin)
      );
    }

    const user = session.user;

    console.log("AUTHENTICATED USER:", {
      id: user.id,
      email: user.email,
    });

    // ========================================================
    // STEP 1
    // CHECK EXISTING PROFILE
    //
    // IMPORTANT FIX:
    // We now also select full_name here, so STEP 4 can decide
    // whether it is safe to touch that column at all.
    // ========================================================

    const {
      data: existingUser,
      error: existingUserError,
    } = await adminClient
      .from("profiles")
      .select(
        "id,email,full_name,referral_code,partner_status"
      )
      .eq("id", user.id)
      .maybeSingle();

    if (existingUserError) {
      console.error(
        "Existing profile lookup failed:",
        existingUserError
      );

      return NextResponse.redirect(
        new URL("/referral-program", origin)
      );
    }

    const isNewProfile = !existingUser;

    console.log("PROFILE STATUS:", {
      isNewProfile,
      existingPartnerStatus:
        existingUser?.partner_status || null,
    });

    // ========================================================
    // STEP 2
    // GENERATE / KEEP REFERRAL CODE
    // ========================================================

    const userReferralCode =
      existingUser?.referral_code ||
      generateReferralCode();

    // ========================================================
    // STEP 3
    // VERIFY REFERRER
    // ========================================================

    let verifiedReferrerId = null;
    let verifiedReferrer = null;

    if (
      referralCode &&
      referralCode !== userReferralCode
    ) {
      console.log(
        "Checking referral code:",
        referralCode
      );

      const {
        data: referrer,
        error: referrerError,
      } = await adminClient
        .from("profiles")
        .select(
          "id,email,referral_code"
        )
        .ilike(
          "referral_code",
          referralCode
        )
        .maybeSingle();

      if (referrerError) {
        console.error(
          "Referrer lookup failed:",
          referrerError
        );
      } else if (!referrer) {
        console.log(
          "Referral code is invalid. Treating signup as DIRECT signup."
        );
      } else if (referrer.id === user.id) {
        console.log(
          "Self-referral detected. Treating signup as DIRECT signup."
        );
      } else {
        verifiedReferrer = referrer;
        verifiedReferrerId = referrer.id;

        console.log(
          "VALID REFERRER FOUND:",
          verifiedReferrer
        );
      }
    }

    // ========================================================
    // STEP 4
    // CREATE / UPDATE PROFILE
    //
    // IMPORTANT:
    // partner_status is deliberately NOT included here.
    //
    // ======================================================
    // BUG FIX (full_name being overwritten with "Partner"):
    //
    // Previously this upsert ALWAYS sent a full_name value
    // (falling back to "Partner" when the OAuth/session
    // metadata had no name — which is normal for email/magic
    // link logins). Because this route runs on EVERY login,
    // not just signup, that meant a returning user's real,
    // previously-saved full_name got clobbered back to
    // "Partner" every single time they logged in without
    // Google metadata attached.
    //
    // Fix: only put full_name in the upsert payload when we
    // actually have a real name to write:
    //   - It's a brand new profile (always safe to seed it,
    //     "Partner" is an acceptable first-time default), OR
    //   - The auth provider metadata has a real name for this
    //     login (e.g. Google login has full_name/name), so it's
    //     safe (and often more accurate) to refresh it.
    //
    // If neither is true (existing profile + no metadata name,
    // e.g. a returning magic-link user), we simply omit
    // full_name from the payload so Postgres leaves the
    // existing column value untouched.
    // ======================================================

    const metadataFullName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      null;

    const profilePayload = {
      id: user.id,
      email: user.email,
      referral_code: userReferralCode,
    };

    if (isNewProfile) {
      // Brand new profile: always seed a full_name, falling
      // back to "Partner" only because there is no existing
      // value to protect.
      profilePayload.full_name = metadataFullName || "Partner";
    } else if (metadataFullName) {
      // Existing profile, but this login gave us a real name
      // (e.g. Google) — safe to refresh it.
      profilePayload.full_name = metadataFullName;
    }
    // else: existing profile + no metadata name -> do NOT
    // include full_name at all, so the column is left alone.

    const {
      data: profileUpsert,
      error: profileError,
    } = await adminClient
      .from("profiles")
      .upsert(
        profilePayload,
        {
          onConflict: "id",
        }
      )
      .select(
        "id,email,full_name,referral_code,partner_status"
      );

    if (profileError) {
      console.error(
        "Profile upsert failed:",
        profileError
      );

      return NextResponse.redirect(
        new URL("/referral-program", origin)
      );
    }

    console.log(
      "PROFILE UPSERT SUCCESS:",
      profileUpsert
    );

    // ========================================================
    // STEP 5
    // CREATE REFERRAL ONLY FOR VALID REFERRAL SIGNUP
    //
    // Valid referral = PENDING
    // ========================================================

    let referralCreated = false;

    if (verifiedReferrerId) {
      console.log(
        "Checking existing referral..."
      );

      const {
        data: existingReferral,
        error: existingReferralError,
      } = await adminClient
        .from("referrals")
        .select(
          "id,referrer_id,referred_user_id,status,created_at"
        )
        .eq(
          "referred_user_id",
          user.id
        )
        .maybeSingle();

      if (existingReferralError) {
        console.error(
          "Existing referral lookup failed:",
          existingReferralError
        );
      }

      if (!existingReferral) {
        const referralPayload = {
          referrer_id: verifiedReferrerId,
          referred_user_id: user.id,
          status: "pending",
        };

        console.log(
          "Creating referral:",
          referralPayload
        );

        const {
          data: insertedReferral,
          error: insertReferralError,
        } = await adminClient
          .from("referrals")
          .insert(referralPayload)
          .select();

        if (insertReferralError) {
          console.error(
            "Referral insert failed:",
            insertReferralError
          );
        } else {
          referralCreated = true;

          console.log(
            "REFERRAL CREATED:",
            insertedReferral
          );
        }
      } else {
        console.log(
          "Referral already exists:",
          existingReferral
        );
      }
    }

   // ========================================================
    // STEP 6
    // SET PARTNER STATUS
    // ========================================================

    let finalPartnerStatus =
      existingUser?.partner_status || null;

    if (isNewProfile) {
      // Yahan pehle condition thi, ab isay direct "pending" kar diya hai
      // taake har naya user pehle pending ho aur onboarding par jaye
      finalPartnerStatus = "pending";

      console.log(
        "SETTING INITIAL PARTNER STATUS:",
        {
          initialPartnerStatus:
            finalPartnerStatus,
          verifiedReferrerId,
          referralCreated,
        }
      );

      const {
        data: statusUpdate,
        error: statusError,
      } = await adminClient
        .from("profiles")
        .update({
          partner_status:
            finalPartnerStatus,
        })
        .eq("id", user.id)
        .select(
          "id,email,partner_status,referral_code"
        )
        .maybeSingle();

      if (statusError) {
        console.error(
          "PARTNER STATUS UPDATE FAILED:",
          statusError
        );

        return NextResponse.redirect(
          new URL("/referral-program", origin)
        );
      }

      finalPartnerStatus =
        statusUpdate?.partner_status ||
        finalPartnerStatus;

      console.log(
        "PARTNER STATUS UPDATED:",
        statusUpdate
      );
    } else {
      console.log(
        "EXISTING USER - PARTNER STATUS LEFT UNCHANGED:",
        existingUser?.partner_status
      );
    }

    // ========================================================
    // STEP 7
    // FINAL REDIRECT
    //
    // IMPORTANT FIX:
    //
    // DIRECT SIGNUP:
    //   approved -> DASHBOARD
    //
    // REFERRAL SIGNUP:
    //   pending -> ONBOARDING
    //
    // EXISTING APPROVED USER:
    //   dashboard
    //
    // EXISTING PENDING USER:
    //   onboarding
    // ========================================================

    let redirectPath = "/referral-program";

    if (verifiedReferrerId) {
      // Referral URL user
      // Must remain pending/onboarding.
      redirectPath = "/onboarding";
    } else if (
      finalPartnerStatus === "approved"
    ) {
      // Normal/direct signup
      // Go directly to dashboard.
      redirectPath =
        "/onboarding";
    } else if (
      requestedNext &&
      finalPartnerStatus !== "pending"
    ) {
      // Only use requested next path when user
      // isn't a pending referral.
      redirectPath = getSafeInternalPath(
        requestedNext,
        "/referral-program/dashboard"
      );
    } else {
      redirectPath = "/referral-program";
    }

    console.log(
      "FINAL REDIRECT:",
      {
        redirectPath,
        finalPartnerStatus,
        verifiedReferrerId,
        isNewProfile,
      }
    );

    // ========================================================
    // STEP 8
    // CREATE REDIRECT RESPONSE
    // ========================================================

    const response = NextResponse.redirect(
      new URL(redirectPath, origin)
    );

    // ========================================================
    // STEP 9
    // CLEAR REFERRAL COOKIE
    //
    // IMPORTANT:
    // Only clear it after callback processing.
    // ========================================================

    if (refCookie) {
      console.log(
        "CLEARING bizgrow_referrer COOKIE"
      );

      response.cookies.set(
        "bizgrow_referrer",
        "",
        {
          maxAge: 0,
          expires: new Date(0),
          path: "/",
        }
      );
    }

    console.log(
      "======================================================"
    );
    console.log(
      "AUTH CALLBACK FINISHED SUCCESSFULLY"
    );
    console.log(
      "FINAL REDIRECT:",
      redirectPath
    );
    console.log(
      "======================================================"
    );

    return response;
  } catch (err) {
    console.error(
      "======================================================"
    );

    console.error(
      "AUTH CALLBACK TOP LEVEL ERROR"
    );

    console.error(
      "Name:",
      err?.name
    );

    console.error(
      "Message:",
      err?.message
    );

    console.error(
      "Stack:",
      err?.stack
    );

    console.error(
      "======================================================"
    );

    return NextResponse.json(
      {
        success: false,
        error:
          err?.message ||
          "Authentication callback failed.",
      },
      {
        status: 500,
      }
    );
  }
}
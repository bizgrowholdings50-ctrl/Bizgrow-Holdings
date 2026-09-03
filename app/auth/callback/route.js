import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// ============================================================
// FORCE DYNAMIC
// ============================================================

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ============================================================
// GENERATE REFERRAL CODE
// ============================================================

function generateReferralCode() {
  return crypto
    .randomUUID()
    .replace(/-/g, "")
    .slice(0, 10)
    .toUpperCase();
}

// ============================================================
// SERVICE ROLE ADMIN CLIENT
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
// SAFE INTERNAL REDIRECT
// ============================================================

function getSafeInternalPath(
  path,
  fallback
) {
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
  console.log(
    "======================================================"
  );

  console.log(
    "AUTH CALLBACK STARTED"
  );

  console.log(
    "URL:",
    request.url
  );

  console.log(
    "======================================================"
  );

  try {
    const {
      searchParams,
      origin,
    } = new URL(request.url);

    const code =
      searchParams.get("code");

    const refParam =
      searchParams.get("ref");

    const requestedNext =
      searchParams.get("next");

    // ========================================================
    // PASSWORD RESET CALLBACK
    // ========================================================
    //
    // IMPORTANT:
    //
    // Password reset also returns a Supabase `code`.
    // We MUST NOT send that code through the normal
    // Google/referral/profile flow.
    //
    // Password reset URL:
    //
    // /auth/callback?code=XXXX&next=/auth/reset-password
    //
    // We exchange the code here and establish the session.
    // Then we redirect to the actual reset-password page.
    // ========================================================

    if (
      code &&
      requestedNext ===
        "/auth/reset-password"
    ) {
      console.log(
        "======================================================"
      );

      console.log(
        "PASSWORD RESET CALLBACK DETECTED"
      );

      console.log(
        "======================================================"
      );

      const resetAuthClient =
        await createClient();

      const {
        data: {
          session,
        },
        error:
          resetExchangeError,
      } =
        await resetAuthClient.auth.exchangeCodeForSession(
          code
        );

      if (
        resetExchangeError ||
        !session?.user
      ) {
        console.error(
          "PASSWORD RESET CODE EXCHANGE FAILED:",
          resetExchangeError
        );

        return NextResponse.redirect(
          new URL(
            "/auth/reset-password?error=reset_failed",
            origin
          )
        );
      }

      console.log(
        "PASSWORD RESET SESSION CREATED:",
        {
          userId:
            session.user.id,

          email:
            session.user.email,
        }
      );

      console.log(
        "REDIRECTING TO PASSWORD RESET PAGE"
      );

      return NextResponse.redirect(
        new URL(
          "/auth/reset-password",
          origin
        )
      );
    }

    // ========================================================
    // READ REFERRAL COOKIE
    // ========================================================

    const cookieStore =
      await cookies();

    const refCookie =
      cookieStore.get(
        "bizgrow_referrer"
      );

    const cookieReferralCode =
      refCookie?.value?.trim() ||
      "";

    const queryReferralCode =
      refParam?.trim() || "";

    // Query parameter has priority over cookie.
    const rawReferralCode =
      queryReferralCode ||
      cookieReferralCode;

    let referralCode = "";

    try {
      referralCode = rawReferralCode
        ? decodeURIComponent(
            rawReferralCode
          )
            .trim()
            .toUpperCase()
        : "";
    } catch {
      referralCode =
        rawReferralCode
          .trim()
          .toUpperCase();
    }

    console.log(
      "REFERRAL SOURCE:",
      {
        queryReferralCode,
        cookieReferralCode,
        referralCode,
      }
    );

    // ========================================================
    // OAUTH CODE CHECK
    // ========================================================

    const authClient =
      await createClient();

    const adminClient =
      getAdminClient();

    let user = null;

    if (code) {
      // ------------------------------------------------------
      // CASE 1: OAuth code present
      //
      // Google login ya email confirmation link
      // jisme Supabase code deta hai.
      //
      // PASSWORD RESET IS ALREADY HANDLED ABOVE.
      // ------------------------------------------------------

      const {
        data: {
          session,
        },
        error:
          exchangeError,
      } =
        await authClient.auth.exchangeCodeForSession(
          code
        );

      if (
        exchangeError ||
        !session?.user
      ) {
        console.error(
          "OAuth exchange failed:",
          exchangeError
        );

        return NextResponse.redirect(
          new URL(
            "/referral-program",
            origin
          )
        );
      }

      user =
        session.user;
    } else {
      // ------------------------------------------------------
      // CASE 2: No code, but session already exists
      //
      // Email/password signup jab confirmation OFF ho,
      // signInWithPassword ke turant baad bhi.
      // ------------------------------------------------------

      const {
        data: {
          user:
            existingSessionUser,
        },
        error:
          getUserError,
      } =
        await authClient.auth.getUser();

      if (
        getUserError ||
        !existingSessionUser
      ) {
        console.error(
          "No OAuth code and no active session found."
        );

        return NextResponse.redirect(
          new URL(
            "/referral-program",
            origin
          )
        );
      }

      user =
        existingSessionUser;
    }

    console.log(
      "AUTHENTICATED USER:",
      {
        id: user.id,
        email: user.email,
      }
    );

    // ========================================================
    // STEP 1
    // CHECK EXISTING PROFILE
    // ========================================================

    const {
      data: existingUser,
      error:
        existingUserError,
    } =
      await adminClient
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
        new URL(
          "/referral-program",
          origin
        )
      );
    }

    const isNewProfile =
      !existingUser;

    console.log(
      "PROFILE STATUS:",
      {
        isNewProfile,
        existingPartnerStatus:
          existingUser?.partner_status ||
          null,
      }
    );

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

    let verifiedReferrerId =
      null;

    let verifiedReferrer =
      null;

    if (
      referralCode &&
      referralCode !==
        userReferralCode
    ) {
      console.log(
        "Checking referral code:",
        referralCode
      );

      const {
        data: referrer,
        error:
          referrerError,
      } =
        await adminClient
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
      } else if (
        referrer.id === user.id
      ) {
        console.log(
          "Self-referral detected. Treating signup as DIRECT signup."
        );
      } else {
        verifiedReferrer =
          referrer;

        verifiedReferrerId =
          referrer.id;

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
    // ========================================================

    const metadataFullName =
      user.user_metadata
        ?.full_name ||
      user.user_metadata?.name ||
      null;

    const profilePayload = {
      id: user.id,
      email: user.email,
      referral_code:
        userReferralCode,
    };

    // ========================================================
    // FULL NAME PROTECTION
    // ========================================================

    if (isNewProfile) {
      // Brand new profile:
      // Seed a name, falling back to Partner.

      profilePayload.full_name =
        metadataFullName ||
        "Partner";
    } else if (
      metadataFullName
    ) {
      // Existing profile with real metadata name:
      // Safe to refresh.

      profilePayload.full_name =
        metadataFullName;
    }

    const {
      data: profileUpsert,
      error: profileError,
    } =
      await adminClient
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
        new URL(
          "/referral-program",
          origin
        )
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

    let referralCreated =
      false;

    if (
      verifiedReferrerId
    ) {
      console.log(
        "Checking existing referral..."
      );

      const {
        data:
          existingReferral,
        error:
          existingReferralError,
      } =
        await adminClient
          .from("referrals")
          .select(
            "id,referrer_id,referred_user_id,status,created_at"
          )
          .eq(
            "referred_user_id",
            user.id
          )
          .maybeSingle();

      if (
        existingReferralError
      ) {
        console.error(
          "Existing referral lookup failed:",
          existingReferralError
        );
      }

      if (!existingReferral) {
        const referralPayload = {
          referrer_id:
            verifiedReferrerId,

          referred_user_id:
            user.id,

          status: "pending",
        };

        console.log(
          "Creating referral:",
          referralPayload
        );

        const {
          data:
            insertedReferral,
          error:
            insertReferralError,
        } =
          await adminClient
            .from("referrals")
            .insert(
              referralPayload
            )
            .select();

        if (
          insertReferralError
        ) {
          console.error(
            "Referral insert failed:",
            insertReferralError
          );
        } else {
          referralCreated =
            true;

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
    //
    // NEW DIRECT USER:
    //   approved
    //
    // NEW REFERRAL USER:
    //   pending
    //
    // EXISTING USER:
    //   KEEP EXISTING STATUS
    // ========================================================

    let finalPartnerStatus =
      existingUser?.partner_status ||
      null;

    if (isNewProfile) {
      // ------------------------------------------------------
      // IMPORTANT FIX
      //
      // Valid referral -> pending
      // No valid referral -> approved
      // ------------------------------------------------------

      finalPartnerStatus =
        verifiedReferrerId
          ? "pending"
          : "approved";

      console.log(
        "SETTING INITIAL PARTNER STATUS:",
        {
          initialPartnerStatus:
            finalPartnerStatus,

          verifiedReferrerId,

          referralCreated,

          signupType:
            verifiedReferrerId
              ? "REFERRAL"
              : "DIRECT",
        }
      );

      const {
        data: statusUpdate,
        error: statusError,
      } =
        await adminClient
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
          new URL(
            "/referral-program",
            origin
          )
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
      // ------------------------------------------------------
      // EXISTING USER:
      // DO NOT CHANGE PARTNER STATUS
      // ------------------------------------------------------

      console.log(
        "EXISTING USER - PARTNER STATUS LEFT UNCHANGED:",
        existingUser?.partner_status
      );
    }

    // ========================================================
    // STEP 7
    // FINAL REDIRECT
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
    //   referral program / pending flow
    // ========================================================

    let redirectPath =
      "/referral-program";

    // --------------------------------------------------------
    // VALID REFERRAL
    // --------------------------------------------------------

    if (
      verifiedReferrerId
    ) {
      redirectPath =
        "/onboarding";
    }

    // --------------------------------------------------------
    // APPROVED USER
    // --------------------------------------------------------

    else if (
      finalPartnerStatus ===
      "approved"
    ) {
      redirectPath =
        "/referral-program/dashboard";
    }

    // --------------------------------------------------------
    // REQUESTED NEXT
    // --------------------------------------------------------

    else if (
      requestedNext &&
      finalPartnerStatus !==
        "pending"
    ) {
      redirectPath =
        getSafeInternalPath(
          requestedNext,
          "/referral-program/dashboard"
        );
    }

    // --------------------------------------------------------
    // FALLBACK
    // --------------------------------------------------------

    else {
      redirectPath =
        "/referral-program";
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

    const response =
      NextResponse.redirect(
        new URL(
          redirectPath,
          origin
        )
      );

    // ========================================================
    // REMEMBER SUCCESSFUL GOOGLE LOGIN
    //
    // IMPORTANT:
    // This only runs for the NORMAL auth callback.
    //
    // Password reset already returned above,
    // therefore password reset NEVER writes
    // Google as the last login method.
    // ========================================================

    if (code) {
      response.cookies.set(
        "bizgrow_last_login_method",
        "google",
        {
          maxAge:
            365 *
            24 *
            60 *
            60,

          path: "/",

          sameSite: "lax",

          secure:
            process.env.NODE_ENV ===
            "production",
        }
      );
    }

    // ========================================================
    // STEP 9
    // CLEAR REFERRAL COOKIE
    //
    // IMPORTANT:
    // Only clear after callback processing.
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

    // ========================================================
    // DONE
    // ========================================================

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
      "FINAL PARTNER STATUS:",
      finalPartnerStatus
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
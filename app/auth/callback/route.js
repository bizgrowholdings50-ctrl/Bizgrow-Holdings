import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function generateReferralCode() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
}

export async function GET(request) {
  console.log("======================================================");
  console.log("STEP 1 - AUTH CALLBACK STARTED");
  console.log("URL:", request.url);
  console.log("======================================================");

  try {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const refParam = searchParams.get("ref");

    // Cookie check karein taake agar query param miss bhi ho jaye toh cookie se pata chal jaye
    const cookieStore = await cookies();
    const refCookie = cookieStore.get("bizgrow_referrer");
    const hasReferral = Boolean(refParam || refCookie?.value);

    // TARGET DECISION: Agar referral code mojood hai toh onboarding, warna default referral-program
    const defaultNext = hasReferral ? "/onboarding" : "/referral-program";
    const nextParam = searchParams.get("next") ?? defaultNext;

    console.log("STEP 2 - Query Parameters");
    console.log({
      codeExists: !!code,
      code,
      refParam,
      hasReferral,
      nextParam,
      origin,
    });

    if (!code) {
      console.log("STEP 2 FAILED - No OAuth code found");
      return NextResponse.redirect(`${origin}/referral-program`);
    }

    console.log("STEP 3 - Creating Supabase Clients");

    const authClient = await createClient();
    const adminClient = await createClient(); 

    console.log("STEP 3 SUCCESS");

    console.log("STEP 4 - Exchange Code For Session");

    const {
      data: { session },
      error: exchangeError,
    } = await authClient.auth.exchangeCodeForSession(code);

    console.log("STEP 4 RESULT");
    console.log({
      exchangeError,
      sessionExists: !!session,
      userExists: !!session?.user,
    });

    if (exchangeError || !session?.user) {
      console.error("STEP 4 FAILED");
      console.error(exchangeError);

      return NextResponse.redirect(`${origin}/referral-program`);
    }

    const user = session.user;

    console.log("STEP 5 - Logged In User");
    console.log({
      id: user.id,
      email: user.email,
      metadata: user.user_metadata,
    });

    // STEP 6 & 7 - Fetch Existing Profile or Generate Code
    const rawReferrerCode = (refParam || refCookie?.value || "").trim();
    const referrerCode = decodeURIComponent(rawReferrerCode).toUpperCase();

    console.log("STEP 6 - Referral Source");
    console.log({
      refParam,
      cookie: refCookie?.value,
      rawReferrerCode,
      referrerCode,
    });

    const {
      data: existingUser,
      error: existingUserError,
    } = await adminClient
      .from("profiles")
      .select("id,email,referral_code")
      .eq("id", user.id)
      .maybeSingle();

    const userReferralCode =
      existingUser?.referral_code || generateReferralCode();

    // STEP 8 - Upsert Profile FIRST so the user officially exists in the database
    console.log("STEP 8 - Upserting Profile");

    const {
      data: profileUpsert,
      error: profileError,
    } = await adminClient
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email: user.email,
          full_name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "Partner",
          referral_code: userReferralCode,
        },
        {
          onConflict: "id",
        }
      )
      .select();

    console.log("STEP 8 RESULT");
    console.log({
      profileUpsert,
      profileError,
    });

    let clearCookie = false;
    let verifiedReferrerId = null;

    console.log("STEP 9 - Referral Decision");
    console.log({
      referrerCode,
      userReferralCode,
      sameCode: referrerCode === userReferralCode,
    });

    // STEP 10 - Handle Referral Tracking AFTER User Profile is Created
    if (referrerCode && referrerCode !== userReferralCode) {
      console.log("STEP 10 - Looking Up Referrer");

      const {
        data: referrer,
        error: refLookupError,
      } = await adminClient
        .from("profiles")
        .select("id,email,referral_code")
        .ilike("referral_code", referrerCode)
        .maybeSingle();

      console.log("STEP 10 RESULT");
      console.log({
        referrer,
        refLookupError,
      });

      if (!referrer) {
        console.log("STEP 10 STOP");
        console.log("Reason: Referral code not found.");
      } else if (referrer.id === user.id) {
        console.log("STEP 10 STOP");
        console.log("Reason: Self referral blocked.");
      } else {
        verifiedReferrerId = referrer.id;

        console.log("STEP 11 - Checking Existing Referral");

        const {
          data: existingRef,
          error: existingRefError,
        } = await adminClient
          .from("referrals")
          .select("*")
          .eq("referred_user_id", user.id)
          .maybeSingle();

        console.log("STEP 11 RESULT");
        console.log({
          existingRef,
          existingRefError,
        });

        if (!existingRef) {
          const payload = {
            referrer_id: verifiedReferrerId,
            referred_user_id: user.id,
            status: "completed",
          };

          console.log("STEP 12 - INSERT PAYLOAD");
          console.log(payload);

          const {
            data: insertedReferral,
            error: insertError,
          } = await adminClient
            .from("referrals")
            .insert(payload)
            .select();

          console.log("STEP 12 RESULT");
          console.log({
            insertedReferral,
            insertError,
          });

          if (insertError) {
            console.error("STEP 12 FAILED");
            console.error(insertError);
          } else {
            console.log("STEP 12 SUCCESS");
            clearCookie = true;
          }
        } else {
          console.log("STEP 11 STOP");
          console.log("Reason: Referral already exists.");
          clearCookie = true;
        }
      }
    }

    console.log("STEP 13 - Preparing Redirect");

    const response = NextResponse.redirect(
      new URL(nextParam, origin)
    );

    if (clearCookie || refCookie) {
      console.log("STEP 14 - Clearing Referral Cookie");

      response.cookies.set("bizgrow_referrer", "", {
        maxAge: 0,
        path: "/",
      });
    }

    console.log("STEP 15 - CALLBACK FINISHED SUCCESSFULLY");
    console.log("======================================================");

    return response;

  } catch (err) {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log("TOP LEVEL EXCEPTION");
    console.log("Name:", err?.name);
    console.log("Message:", err?.message);
    console.log("Stack:");
    console.log(err?.stack);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

    return NextResponse.json(
      {
        success: false,
        error: err?.message,
      },
      {
        status: 500,
      }
    );
  }
}
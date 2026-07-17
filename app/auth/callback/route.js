import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function formatSupabaseError(error) {
  if (!error) return null;
  return {
    message: error.message || error.code || String(error),
    code: error.code || null,
    details: error.details || null,
    raw: error,
  };
}

function buildRedirectUrl(destination, origin, requestUrl) {
  try {
    const nextUrl = new URL(destination, requestUrl);
    return nextUrl.origin === origin
      ? nextUrl.href
      : `${origin}/referral-program`;
  } catch {
    return `${origin}/referral-program`;
  }
}

function generateReferralCode() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  console.log("Incoming callback URL:", request.url)
  console.log("Origin:", origin)
  console.log("STEP 1: Auth callback route GET started.");
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/referral-program";

  console.log(
    "STEP 1 Params: code present =",
    !!code,
    "next =",
    nextParam,
    "origin =",
    origin,
  );

  if (code) {
    console.log("STEP 2: Creating authClient with serviceRole: false");
    const authClient = await createClient({ serviceRole: false });

    console.log("STEP 3: Exchanging code for session using authClient...");
    const sessionStart = Date.now();
    const {
      data: { session },
      error: exchangeError,
    } = await authClient.auth.exchangeCodeForSession(code);
    const sessionDuration = Date.now() - sessionStart;

    if (exchangeError) {
      console.error(
        "Auth callback failed during exchangeCodeForSession:",
        formatSupabaseError(exchangeError),
      );
      return NextResponse.redirect(`${origin}/referral-program`);
    }

    const user = session?.user;
    if (user) {
      console.log(
        "STEP 4: User authenticated. Fetching referral cookies/params.",
      );
      const cookieStore = await cookies();
      const refCookie = cookieStore.get("bizgrow_referrer");
      const refParam = searchParams.get("ref");
      const referrerCode = decodeURIComponent(
        (refParam || refCookie?.value || "").trim(),
      ).toUpperCase();

      console.log("AUTH USER:", { id: user.id, email: user.email });

      console.log("STEP 4.5: Creating adminClient with serviceRole: true");
      let adminClient;
      try {
        adminClient = await createClient({ serviceRole: true });
        console.log("- adminClient created successfully.");
      } catch (err) {
        console.error("Critical: Failed to create adminClient:", err.message);
        return NextResponse.redirect(`${origin}/referral-program`);
      }

      const {
        data: { user: currentUser },
        error: userError,
      } = await adminClient.auth.getUser();
      const authUid = currentUser?.id || user.id;

      console.log("STEP 5: Looking up profile. auth.uid() =", authUid);
      const { data: profileData, error: profileError } = await adminClient
        .from("profiles")
        .select("referral_code, email, full_name, avatar_url")
        .eq("id", authUid)
        .maybeSingle();

      if (profileError) {
        console.error("Profile lookup failed:", formatSupabaseError(profileError));
      }

      console.log("STEP 6: Checking profile status...");
      if (!profileData) {
        const newProfile = {
          id: authUid,
          email: user.email || "",
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Partner",
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          referral_code: generateReferralCode(),
        };
        console.log("PROFILE UPSERT PAYLOAD:", newProfile);
        const { data: insertProfileData, error: insertProfileError } = await adminClient
          .from("profiles")
          .insert(newProfile)
          .select();
        console.log("PROFILE INSERT RESPONSE:", { data: insertProfileData, error: insertProfileError });
      } else {
        const updatePayload = {};
        if (!profileData.email && user.email) {
          updatePayload.email = user.email;
        }
        if (!profileData.full_name && (user.user_metadata?.full_name || user.user_metadata?.name)) {
          updatePayload.full_name = user.user_metadata?.full_name || user.user_metadata?.name;
        }
        if (!profileData.avatar_url && (user.user_metadata?.avatar_url || user.user_metadata?.picture)) {
          updatePayload.avatar_url = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        }
        if (!profileData.referral_code?.trim()) {
          updatePayload.referral_code = generateReferralCode();
        }

        if (Object.keys(updatePayload).length > 0) {
          console.log("PROFILE UPSERT PAYLOAD:", updatePayload);
          const { data: updateProfileData, error: updateProfileError } = await adminClient
            .from("profiles")
            .update(updatePayload)
            .eq("id", authUid)
            .select();
          console.log("PROFILE INSERT RESPONSE:", { data: updateProfileData, error: updateProfileError });
        }
      }

      let clearCookieFlag = false;
      try {
        console.log("=== REFERRAL TRACKING START ===");
        console.log("Referral code received (raw):", referrerCode);
        console.log("Cookie value:", refCookie?.value || null);
        console.log("URL ref value:", refParam || null);
        console.log("Auth user id:", user.id);
        console.log("Profile id (authUid):", authUid);

        if (referrerCode) {
          console.log("STEP 7: Querying referrer profile for code:", referrerCode);
          const { data: referrerProfile, error: referrerProfileError } =
            await adminClient
              .from("profiles")
              .select("id")
              .eq("referral_code", referrerCode)
              .maybeSingle();

          console.log("Referrer lookup result:", referrerProfile);
          if (referrerProfileError) {
            console.error("Referrer lookup error:", referrerProfileError);
          }

          if (referrerProfile?.id) {
            const selfReferralCheck = referrerProfile.id === authUid;
            console.log("Self-referral check (referrerProfile.id === authUid):", selfReferralCheck);

            if (selfReferralCheck) {
              console.log("Self referral blocked. Exiting.");
              clearCookieFlag = true;
            } else {
              console.log("STEP 9: Querying existing referrals for duplicate check.");
              const { data: existingReferral, error: existingReferralError } =
                await adminClient
                  .from("referrals")
                  .select("id")
                  .eq("referred_user_id", authUid)
                  .maybeSingle();

              console.log("Duplicate referral lookup:", existingReferral);
              if (existingReferralError) {
                console.error("Duplicate lookup error:", existingReferralError);
              }

              if (!existingReferral) {
                const referralPayload = {
                  referrer_id: referrerProfile.id,
                  referred_user_id: authUid,
                  status: "completed",
                };

                console.log("Referral payload:", referralPayload);
                console.log("Whether execution reaches the insert statement: YES");

                const {
                  data: insertReferralData,
                  error: referralInsertError,
                } = await adminClient
                  .from("referrals")
                  .insert(referralPayload)
                  .select();

                console.log("Exact insert response:", insertReferralData);
                console.log("Exact insert error:", referralInsertError);

                if (!referralInsertError && insertReferralData?.length > 0) {
                  clearCookieFlag = true;
                }
              } else {
                console.log("Duplicate check failed: Referral already exists. Exiting.");
                clearCookieFlag = true;
              }
            }
          } else {
            console.log("Referrer profile not found. Exiting.");
            clearCookieFlag = true;
          }
        } else {
          console.log("No referral code received. Exiting.");
        }
        console.log("=== REFERRAL TRACKING END ===");
      } catch (err) {
        console.error("Exception caught in referral tracking block:", err);
      }

      console.log("STEP 11: Redirecting user to next page.");
      const response = NextResponse.redirect(
        buildRedirectUrl(nextParam, origin, request.url),
      );
      
      if (clearCookieFlag) {
        const requestHost = (request.headers.get("host") || "").split(":")[0];
        const isIP = /^[0-9.]+$/.test(requestHost);
        const cookieDomain = requestHost.includes(".") && !isIP && requestHost !== "localhost"
          ? `.${requestHost.replace(/^www\./, "")}`
          : undefined;

        response.cookies.set("bizgrow_referrer", "", { maxAge: 0, path: "/", domain: cookieDomain });
        console.log("Cleared bizgrow_referrer cookie.");
      }
      return response;
    }
  }

  console.log("STEP 12: No code or user found. Redirecting to /referral-program.");
  return NextResponse.redirect(`${origin}/referral-program`);
}
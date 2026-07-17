import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

function writeDebugLog(message) {
  try {
    const logPath = path.join(process.cwd(), "debug.log");
    fs.appendFileSync(
      logPath,
      `[${new Date().toISOString()}] ${message}\n`,
      "utf-8",
    );
  } catch (e) {
    console.error("Failed to write debug log:", e);
  }
}

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
  writeDebugLog("--- NEW AUTH CALLBACK REQUEST ---");
  writeDebugLog(`URL: ${request.url}`);
  writeDebugLog(`Headers cookies: ${request.headers.get("cookie")}`);
  console.log("STEP 1: Auth callback route GET started.");
  const { searchParams, origin } = new URL(request.url);
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

    writeDebugLog(
      `Session present: ${!!session}, error: ${exchangeError ? exchangeError.message : "None"}`,
    );

    if (exchangeError) {
      console.error(
        "Auth callback failed during exchangeCodeForSession:",
        formatSupabaseError(exchangeError),
      );
      writeDebugLog(
        `Auth callback failed during exchangeCodeForSession: ${exchangeError.message}`,
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
        (refCookie?.value || refParam || "").trim(),
      ).toUpperCase();

      writeDebugLog(`refCookie: ${refCookie ? refCookie.value : "undefined"}`);
      writeDebugLog(`refParam: ${refParam || "undefined"}`);
      writeDebugLog(`normalized referrerCode: ${referrerCode}`);

      console.log("- refCookie value:", refCookie?.value);
      console.log("- refParam value:", refParam);
      console.log("- normalized referrerCode:", referrerCode);

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
      console.log(
        "- adminClient.auth.getUser() response id:",
        currentUser?.id,
        "error:",
        userError,
      );
      const authUid = currentUser?.id || user.id;

      console.log("STEP 5: Looking up profile. auth.uid() =", authUid);
      const { data: profileData, error: profileError } = await adminClient
        .from("profiles")
        .select("referral_code, email, full_name, avatar_url")
        .eq("id", authUid)
        .maybeSingle();

      if (profileError) {
        console.error(
          "Profile lookup failed:",
          formatSupabaseError(profileError),
        );
      }

      console.log("STEP 6: Checking profile status...");
      if (!profileData) {
        const newProfile = {
          id: authUid,
          email: user.email || "",
          full_name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email ||
            "Partner",
          avatar_url:
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null,
          referral_code: generateReferralCode(),
        };
        await adminClient.from("profiles").insert(newProfile);
      } else if (!profileData.referral_code?.trim()) {
        const updatePayload = { referral_code: generateReferralCode() };
        await adminClient
          .from("profiles")
          .update(updatePayload)
          .eq("id", authUid);
      }

      // --- START REPLACED LOGIC ---
      console.log("🔥 REFERRAL DEBUG VALUES:", {
        cookie: refCookie?.value,
        urlRef: refParam,
        finalCode: referrerCode,
      });
      console.log("🚨 REFERRAL BLOCK STARTED", {
        referrerCode,
        authUid,
      });

      if (referrerCode) {
        console.log("STEP 7: Searching referrer profile:", referrerCode);

        const { data: referrerProfile, error: referrerProfileError } =
          await adminClient
            .from("profiles")
            .select("id")
            .eq("referral_code", referrerCode)
            .maybeSingle();

        console.log("🔥 REFERRER RESULT:", {
          referrerProfile,
          referrerProfileError,
        });

        if (referrerProfile?.id) {
          if (referrerProfile.id === authUid) {
            console.log("❌ SELF REFERRAL BLOCKED");
          } else {
            const { data: existingReferral, error: existingError } =
              await adminClient
                .from("referrals")
                .select("id")
                .eq("referred_user_id", authUid)
                .maybeSingle();

            console.log("🔥 EXISTING REFERRAL:", {
              existingReferral,
              existingError,
            });

            if (!existingReferral) {
              const referralPayload = {
                referrer_id: referrerProfile.id,
                referred_user_id: authUid,
                status: "completed",
              };

              console.log("🔥 INSERTING REFERRAL:", referralPayload);

              const { data: insertReferralData, error: referralInsertError } =
                await adminClient
                  .from("referrals")
                  .insert(referralPayload)
                  .select();

              console.log("🔥 REFERRAL DATABASE RESPONSE:", {
                insertReferralData,
                referralInsertError,
              });
            } else {
              console.log("⚠️ Referral already exists");
            }
          }
        } else {
          console.log("❌ Referrer code not found:", referrerCode);
        }
      } else {
        console.log("❌ No referral code found");
      }
      // --- END REPLACED LOGIC ---

      console.log(
        "STEP 11: Redirecting user to next page and clearing cookie.",
      );
      const response = NextResponse.redirect(
        buildRedirectUrl(nextParam, origin, request.url),
      );
      response.cookies.set("bizgrow_referrer", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  console.log(
    "STEP 12: No code or user found. Redirecting to /referral-program.",
  );
  return NextResponse.redirect(`${origin}/referral-program`);
}

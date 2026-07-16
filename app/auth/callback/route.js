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
    return nextUrl.origin === origin ? nextUrl.href : `${origin}/referral-program`;
  } catch {
    return `${origin}/referral-program`;
  }
}

function generateReferralCode() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
}

export async function GET(request) {
  console.log("STEP 1: Auth callback route GET started.");
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/referral-program";
  
  console.log("STEP 1 Params: code present =", !!code, "next =", nextParam, "origin =", origin);

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

    console.log("Query Name: exchangeCodeForSession");
    console.log("- Execution time:", sessionDuration, "ms");
    console.log("- Returned session present:", !!session);
    console.log("- Returned session user:", session?.user ? { id: session.user.id, email: session.user.email } : null);
    console.log("- Returned error:", exchangeError ? formatSupabaseError(exchangeError) : null);

    if (exchangeError) {
      console.error("Auth callback failed during exchangeCodeForSession:", formatSupabaseError(exchangeError));
      return NextResponse.redirect(`${origin}/referral-program`);
    }

    const user = session?.user;
    if (user) {
      console.log("STEP 4: User authenticated. Fetching referral cookies/params.");
      const cookieStore = await cookies();
      const refCookie = cookieStore.get("bizgrow_referrer");
      const refParam = searchParams.get("ref");
      const referrerCode = decodeURIComponent(
        (refCookie?.value || refParam || "").trim(),
      ).toUpperCase();

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
        // Fall back to redirect to prevent server crash, but log the error clearly
        return NextResponse.redirect(`${origin}/referral-program`);
      }

      // Verify auth.uid() using adminClient.auth.getUser() or fallback to session
      const { data: { user: currentUser }, error: userError } = await adminClient.auth.getUser();
      console.log("- adminClient.auth.getUser() response id:", currentUser?.id, "error:", userError);
      const authUid = currentUser?.id || user.id;

      console.log("STEP 5: Looking up profile. auth.uid() =", authUid);
      console.log("Query Name: adminClient.profiles.select(referral_code, email, full_name, avatar_url).eq(id, auth.uid())");
      const { data: profileData, error: profileError } = await adminClient
        .from("profiles")
        .select("referral_code, email, full_name, avatar_url")
        .eq("id", authUid)
        .maybeSingle();

      console.log("- Returned data:", profileData);
      console.log("- Returned error:", profileError ? formatSupabaseError(profileError) : null);

      if (profileError) {
        console.error("Profile lookup failed:", formatSupabaseError(profileError));
      }

      console.log("STEP 6: Checking profile status...");
      if (!profileData) {
        console.log("- Profile does not exist. Creating new profile. auth.uid() =", authUid);
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
        console.log("- Profile insert payload:", newProfile);
        console.log("Query Name: adminClient.profiles.insert(newProfile)");
        
        const { data: insertData, error: insertError } = await adminClient.from("profiles").insert(newProfile).select();
        console.log("- Returned data:", insertData);
        console.log("- Returned error:", insertError ? formatSupabaseError(insertError) : null);

        if (insertError) {
          console.error("Profile insert failed:", formatSupabaseError(insertError));
        }
      } else if (!profileData.referral_code?.trim()) {
        console.log("- Profile exists but lacks referral code. Updating. auth.uid() =", authUid);
        const updatePayload = { referral_code: generateReferralCode() };
        if (!profileData.email && user.email) updatePayload.email = user.email;
        if (!profileData.full_name && (user.user_metadata?.full_name || user.user_metadata?.name)) {
          updatePayload.full_name = user.user_metadata?.full_name || user.user_metadata?.name;
        }
        if (!profileData.avatar_url && (user.user_metadata?.avatar_url || user.user_metadata?.picture)) {
          updatePayload.avatar_url = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        }

        console.log("- Profile update payload:", updatePayload);
        console.log("Query Name: adminClient.profiles.update(updatePayload).eq(id, auth.uid())");
        const { data: updateData, error: updateError } = await adminClient
          .from("profiles")
          .update(updatePayload)
          .eq("id", authUid)
          .select();

        console.log("- Returned data:", updateData);
        console.log("- Returned error:", updateError ? formatSupabaseError(updateError) : null);

        if (updateError) {
          console.error("Profile update failed:", formatSupabaseError(updateError));
        }
      } else {
        console.log("- Profile exists with code:", profileData.referral_code);
      }

      if (referrerCode) {
        console.log("STEP 7: Referral code detected. Finding referrer's profile ID...");
        console.log("auth.uid() =", authUid);
        console.log("Query Name: adminClient.profiles.select(id).eq(referral_code, referrerCode)");
        const { data: referrerProfile, error: referrerProfileError } = await adminClient
          .from("profiles")
          .select("id")
          .eq("referral_code", referrerCode)
          .maybeSingle();

        console.log("- Returned data:", referrerProfile);
        console.log("- Returned error:", referrerProfileError ? formatSupabaseError(referrerProfileError) : null);

        if (referrerProfileError) {
          console.error(
            "Referrer profile lookup failed:",
            formatSupabaseError(referrerProfileError),
          );
        }

        if (referrerProfile?.id) {
          console.log("STEP 8: Referrer found with ID:", referrerProfile.id);

          if (referrerProfile.id === authUid) {
            console.log("STEP 8 Decision: Self referral blocked", authUid);
          } else {
            console.log("STEP 9: Checking for existing referral to avoid duplicates. auth.uid() =", authUid);
            console.log("Query Name: adminClient.referrals.select(id).eq(referred_user_id, auth.uid())");
            const { data: existingReferral, error: existingReferralError } = await adminClient
              .from("referrals")
              .select("id")
              .eq("referred_user_id", authUid)
              .maybeSingle();

            console.log("- Returned data:", existingReferral);
            console.log("- Returned error:", existingReferralError ? formatSupabaseError(existingReferralError) : null);

            if (existingReferralError) {
              console.error(
                "Referral existing check failed:",
                formatSupabaseError(existingReferralError),
              );
            }

            if (existingReferral) {
              console.log("STEP 9 Decision: Duplicate referral skipped for referred_user_id:", authUid);
            } else {
              console.log("STEP 10: Inserting new referral record. auth.uid() =", authUid);
              const referralPayload = {
                referrer_id: referrerProfile.id,
                referred_user_id: authUid,
                status: "active",
              };
              console.log("- Referral insert payload:", referralPayload);
              console.log("Query Name: adminClient.referrals.insert(referralPayload)");
              const { data: insertReferralData, error: referralInsertError } = await adminClient
                .from("referrals")
                .insert(referralPayload)
                .select();

              console.log("- Returned data:", insertReferralData);
              console.log("- Returned error:", referralInsertError ? formatSupabaseError(referralInsertError) : null);

              if (referralInsertError) {
                console.error(
                  "Failed to record referral:",
                  formatSupabaseError(referralInsertError),
                );
              } else {
                console.log("Referral inserted successfully:", insertReferralData);
              }
            }
          }
        } else {
          console.log("STEP 8 Decision: Referrer code not found in profiles:", referrerCode);
        }
      } else {
        console.log(
          "STEP 7 Decision: No referral code found in cookie or query param for callback.",
        );
      }

      console.log("STEP 11: Redirecting user to next page and clearing cookie.");
      const response = NextResponse.redirect(buildRedirectUrl(nextParam, origin, request.url));
      response.cookies.set("bizgrow_referrer", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  console.log("STEP 12: No code or user found. Redirecting to /referral-program.");
  return NextResponse.redirect(`${origin}/referral-program`);
}

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
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/referral-program";

  if (code) {
    const supabase = await createClient({ serviceRole: true });
    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback failed:", formatSupabaseError(error));
      return NextResponse.redirect(`${origin}/referral-program`);
    }

    const user = session?.user;
    if (user) {
      const cookieStore = await cookies();
      const refCookie = cookieStore.get("bizgrow_referrer");
      const refParam = searchParams.get("ref");
      const referrerCode = decodeURIComponent(
        (refCookie?.value || refParam || "").trim(),
      ).toUpperCase();

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("referral_code, email, full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile lookup failed:", formatSupabaseError(profileError));
      }

      if (!profileData) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
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
        });

        if (insertError) {
          console.error("Profile insert failed:", formatSupabaseError(insertError));
        }
      } else if (!profileData.referral_code?.trim()) {
        const updatePayload = { referral_code: generateReferralCode() };
        if (!profileData.email && user.email) updatePayload.email = user.email;
        if (!profileData.full_name && (user.user_metadata?.full_name || user.user_metadata?.name)) {
          updatePayload.full_name = user.user_metadata?.full_name || user.user_metadata?.name;
        }
        if (!profileData.avatar_url && (user.user_metadata?.avatar_url || user.user_metadata?.picture)) {
          updatePayload.avatar_url = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        }

        const { error: updateError } = await supabase
          .from("profiles")
          .update(updatePayload)
          .eq("id", user.id);

        if (updateError) {
          console.error("Profile update failed:", formatSupabaseError(updateError));
        }
      }

      if (referrerCode) {
        console.log("Referral cookie detected:", referrerCode);

        const { data: referrerProfile, error: referrerProfileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("referral_code", referrerCode)
          .maybeSingle();

        if (referrerProfileError) {
          console.error(
            "Referrer profile lookup failed:",
            formatSupabaseError(referrerProfileError),
          );
        }

        if (referrerProfile?.id) {
          console.log("Referrer found:", referrerProfile.id);

          if (referrerProfile.id === user.id) {
            console.log("Self referral blocked", user.id);
          } else {
            const { data: existingReferral, error: existingReferralError } = await supabase
              .from("referrals")
              .select("id")
              .eq("referred_user_id", user.id)
              .maybeSingle();

            if (existingReferralError) {
              console.error(
                "Referral existing check failed:",
                formatSupabaseError(existingReferralError),
              );
            }

            if (existingReferral) {
              console.log("Duplicate referral skipped for referred_user_id:", user.id);
            } else {
              const { error: referralInsertError } = await supabase.from("referrals").insert({
                referrer_id: referrerProfile.id,
                referred_user_id: user.id,
                status: "active",
              });

              if (referralInsertError) {
                console.error(
                  "Failed to record referral:",
                  formatSupabaseError(referralInsertError),
                );
              } else {
                console.log("Referral inserted:", {
                  referrer_id: referrerProfile.id,
                  referred_user_id: user.id,
                });
              }
            }
          }
        } else {
          console.log("Referral code not found in profiles:", referrerCode);
        }
      } else {
        console.log(
          "No referral code found in cookie or query param for callback.",
        );
      }

      const response = NextResponse.redirect(buildRedirectUrl(nextParam, origin, request.url));
      response.cookies.set("bizgrow_referrer", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/referral-program`);
}

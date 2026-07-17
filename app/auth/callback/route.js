import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function generateReferralCode() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/referral-program";

  if (!code) return NextResponse.redirect(`${origin}/referral-program`);

  const authClient = await createClient({ serviceRole: false });
  const adminClient = await createClient({ serviceRole: true });

  const { data: { session }, error: exchangeError } = await authClient.auth.exchangeCodeForSession(code);
  
  if (exchangeError || !session?.user) {
    return NextResponse.redirect(`${origin}/referral-program`);
  }

  const user = session.user;
  const cookieStore = await cookies();
  const refCookie = cookieStore.get("bizgrow_referrer");
  const refParam = searchParams.get("ref");
  
  const rawReferrerCode = (refParam || refCookie?.value || "").trim();
  const referrerCode = decodeURIComponent(rawReferrerCode).toUpperCase();

  // 1. Sync Profile
  const { data: existingUser } = await adminClient
    .from("profiles")
    .select("id, referral_code")
    .eq("id", user.id)
    .maybeSingle();

  const userReferralCode = existingUser?.referral_code || generateReferralCode();

  await adminClient.from("profiles").upsert({
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || "Partner",
    referral_code: userReferralCode,
  }, { onConflict: 'id' });

  // 2. Referral Logic
  let clearCookie = false;
  if (referrerCode && referrerCode !== userReferralCode) {
    const { data: referrer, error: refLookupError } = await adminClient
      .from("profiles")
      .select("id")
      .ilike("referral_code", referrerCode)
      .maybeSingle();

    if (refLookupError) console.error("Referrer Lookup Error:", refLookupError);

    if (referrer && referrer.id !== user.id) {
      const { data: existingRef } = await adminClient
        .from("referrals")
        .select("id")
        .eq("referred_user_id", user.id)
        .maybeSingle();

      if (!existingRef) {
        const { error: insertError } = await adminClient.from("referrals").insert({
          referrer_id: referrer.id,
          referred_user_id: user.id,
          status: "completed"
        });

        if (insertError) {
          console.error("REFERRAL INSERT FAILED:", insertError);
        } else {
          console.log("SUCCESS: Referral recorded for", user.id);
          clearCookie = true;
        }
      } else {
        clearCookie = true;
      }
    }
  }

  // 3. Cleanup
  const response = NextResponse.redirect(new URL(nextParam, origin));
  if (clearCookie) {
    response.cookies.set("bizgrow_referrer", "", { maxAge: 0, path: "/" });
  }

  return response;
}
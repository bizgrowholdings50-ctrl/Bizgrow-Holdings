import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/referral-program");
  }

  // Database se status check karein
  const { data: referral } = await supabase
    .from("referrals")
    .select("status")
    .eq("referred_user_id", user.id)
    .maybeSingle();

  // Wajah: Yahan se woh "if (referral && status !== completed) redirect..." hata diya hai
  // Taake loop khatam ho jaye.
  const referralStatus = referral ? referral.status : "completed";

  // Ab status client component ko bhej dein taake woh UI handle kar sake
  return <DashboardClient initialReferralStatus={referralStatus} />;
}
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// Helper function to keep error reporting consistent
function formatSupabaseError(error) {
  if (!error) return null
  return {
    message: error.message || error.code || String(error),
    code: error.code || null,
    details: error.details || null,
    raw: error,
  }
}

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const nextParam = searchParams.get('next') ?? '/referral-program'

  const buildRedirectUrl = (destination) => {
    try {
      const nextUrl = new URL(destination, request.url)
      return nextUrl.origin === origin ? nextUrl.href : `${origin}/referral-program`
    } catch {
      return `${origin}/referral-program`
    }
  }

  if (code) {
    const supabase = await createClient({ serviceRole: true })
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Auth callback failed:', formatSupabaseError(error))
      return NextResponse.redirect(`${origin}/referral-program`)
    }

    const user = session?.user
    if (user) {
      // 1. Profile fetch and create logic
      const { data: profileData } = await supabase
        .from('profiles')
        .select('referral_code, email, full_name, avatar_url')
        .eq('id', user.id)
        .maybeSingle()

      if (!profileData?.referral_code) {
        const { error: upsertError } = await supabase.from('profiles').upsert({
          id: user.id,
          email: profileData?.email || user.email,
          full_name: profileData?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || 'Partner',
          avatar_url: profileData?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture,
          referral_code: Math.random().toString(36).slice(2, 12).toUpperCase(),
        }, { onConflict: 'id' })
        
        if (upsertError) console.error('Upsert failed:', upsertError)
      }

      // 2. Referral logic (Check cookie and insert into the separate referrals table)
      const cookieStore = await cookies()
      const refCookie = cookieStore.get('bizgrow_referrer')

      if (refCookie?.value) {
        const referrerCode = decodeURIComponent(refCookie.value).trim()

        // Pehle check karo ke kya is user ko pehle hi koi refer kar chuka hai (taakay duplicate entry na ho)
        const { data: existingReferral } = await supabase
          .from('referrals')
          .select('id')
          .eq('referred_user_id', user.id)
          .maybeSingle()

        if (!existingReferral) {
          // Referrer ki profile ID dhondo referral_code ke zariye (jo profiles table mein store hoti hai)
          const { data: referrerProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('referral_code', referrerCode)
            .maybeSingle()

          // Agr referrer mila aur wo khud current user nahi hai, toh referrals table mein record insert karo
          if (referrerProfile && referrerProfile.id !== user.id) {
            const { error: referralInsertError } = await supabase
              .from('referrals')
              .insert({
                referrer_id: referrerProfile.id,
                referred_user_id: user.id,
                status: 'active'
              })

            if (referralInsertError) {
              console.error('Failed to record referral:', formatSupabaseError(referralInsertError))
            }
          }
        }
      }

      // 3. Clear cookie and redirect
      const response = NextResponse.redirect(buildRedirectUrl(nextParam))
      response.cookies.set('bizgrow_referrer', '', { maxAge: 0, path: '/' })
      return response
    }
  }

  return NextResponse.redirect(`${origin}/referral-program`)
}
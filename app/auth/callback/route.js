import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const nextParam = searchParams.get('next') ?? '/referral-program'

  const buildRedirectUrl = (destination) => {
    try {
      const nextUrl = new URL(destination, request.url)
      if (nextUrl.origin !== origin) {
        return `${origin}/referral-program`
      }
      return nextUrl.href
    } catch (error) {
      return `${origin}/referral-program`
    }
  }

  if (code) {
    const supabase = await createClient()
    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const user = session?.user

      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('referral_code, email, full_name, avatar_url')
          .eq('id', user.id)
          .maybeSingle()

        if (profileError) {
          console.error('Profile lookup failed:', profileError)
        }

        if (!profileData?.referral_code) {
          const referralCode = Math.random()
            .toString(36)
            .slice(2, 12)
            .toUpperCase()

          const full_name =
            profileData?.full_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email ||
            'Partner'
          const avatar_url =
            profileData?.avatar_url ||
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null
          const email = profileData?.email || user.email || ''

          const { error: upsertError } = await supabase.from('profiles').upsert(
            {
              id: user.id,
              email,
              full_name,
              avatar_url,
              referral_code: referralCode,
            },
            { onConflict: 'id' }
          )

          if (upsertError) {
            console.error('Referral code upsert failed:', upsertError)
          }
        }

        const cookieStore = await cookies()
        const refCookie = cookieStore.get('bizgrow_referrer')

        if (refCookie?.value) {
          const referrerCode = decodeURIComponent(refCookie.value).trim()

          if (referrerCode) {
            const { data: referrerProfile, error: referrerError } = await supabase
              .from('profiles')
              .select('id')
              .eq('referral_code', referrerCode)
              .maybeSingle()

            if (referrerError) {
              console.error('Referrer lookup failed:', referrerError)
            }

            if (referrerProfile) {
              const { error: updateError } = await supabase
                .from('profiles')
                .update({ referred_by: referrerProfile.id })
                .eq('id', user.id)

              if (updateError) {
                console.error('Failed to set referred_by:', updateError)
              }
            }
          }

          const response = NextResponse.redirect(buildRedirectUrl(nextParam))
          response.cookies.set('bizgrow_referrer', '', {
            maxAge: 0,
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
          })
          return response
        }
      }

      return NextResponse.redirect(buildRedirectUrl(nextParam))
    }
  }

  return NextResponse.redirect(`${origin}/referral-program`)
}
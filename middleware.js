import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

function createSupabaseClient(request) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(({ name, value }) => ({
            name,
            value,
          }))
        },
        setAll() {
          // Middleware does not need to write cookies here.
        },
      },
    }
  )
}

export async function middleware(request) {
  const supabase = createSupabaseClient(request)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role || ''

  if (profileError || role !== 'admin') {
    return NextResponse.redirect(new URL('/referral-program', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  const { data: { user } } = await supabase.auth.getUser();

  // Protected paths check
  if (!user && (pathname.startsWith('/admin') || pathname.startsWith('/referral-program/dashboard') || pathname.startsWith('/onboarding'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, onboarding_completed')
      .eq('id', user.id)
      .maybeSingle();

    const role = profile?.role || '';
    const onboardingDone = profile?.onboarding_completed ?? false;

    // Admin Route Protection
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/referral-program/dashboard', request.url));
    }

    // Referral Dashboard Protection - Agar onboarding complete nahi hai toh /onboarding par bhejo
    if (pathname.startsWith('/referral-program/dashboard') && !onboardingDone) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    // Onboarding Protection - Agar onboarding ho chuki hai toh seedha dashboard par bhejo
    if (pathname.startsWith('/onboarding') && onboardingDone) {
      return NextResponse.redirect(new URL('/referral-program/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/referral-program/dashboard/:path*',
    '/onboarding/:path*',
  ],
};
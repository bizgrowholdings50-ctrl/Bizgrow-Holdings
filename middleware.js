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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Agar user logged in nahi hai aur protected routes access kar raha hai
  if (
    !user &&
    (pathname.startsWith('/admin') ||
      pathname.startsWith('/referral-program/dashboard') ||
      pathname.startsWith('/onboarding'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Agar user logged in hai, toh profile data fetch karke checks perform karein
  if (user) {
    // Agar user /onboarding par hai aur onboarding pehle hi complete ho chuki hai
    if (pathname.startsWith('/onboarding')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single();

      if (profile?.onboarding_completed) {
        return NextResponse.redirect(new URL('/referral-program/dashboard', request.url));
      }
    }

    // Agar user /admin page access kar raha hai, toh sirf 'admin' role wale hi allow honge
    if (pathname.startsWith('/admin')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
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
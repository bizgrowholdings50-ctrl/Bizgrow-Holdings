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

  // ==========================================================
  // AUTH CHECK ONLY — koi database (profiles table) query nahi
  // ==========================================================
  //
  // IMPORTANT:
  // Role-based (admin) aur partner_status-based (rejected)
  // checks yahan se hata diye gaye hain taake middleware har
  // request pe extra database round-trip na le — is se
  // production mein slow/blank page ka masla ban raha tha.
  //
  // Ye checks ab page/component level par honge:
  //   - Admin check    -> /admin ke server component mein
  //   - Rejected check -> DashboardClient.jsx (locked screen)
  //      mein already maujood hai
  // ==========================================================

  if (
    !user &&
    (pathname.startsWith('/admin') ||
      pathname.startsWith('/referral-program/dashboard') ||
      pathname.startsWith('/onboarding'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Agar user logged in hai aur onboarding page par hai, toh check karein ke kahin pehle se onboarding complete to nahi
  if (user && pathname.startsWith('/onboarding')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single();

    if (profile?.onboarding_completed) {
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
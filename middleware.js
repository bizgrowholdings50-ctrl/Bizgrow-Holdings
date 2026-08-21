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
        getAll() { return request.cookies.getAll(); },
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

  // 1. Protected routes check (Unauthenticated users)
  if (!user && (pathname.startsWith('/admin') || pathname.startsWith('/referral-program/dashboard'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, partner_status') // onboarding_completed hata diya
      .eq('id', user.id)
      .maybeSingle();

    const role = profile?.role || '';
    const partnerStatus = profile?.partner_status || null;

    // 2. Admin protection
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/referral-program/dashboard', request.url));
    }

    // 3. Dashboard protection (NO ONBOARDING GATE)
    // Sirf 'rejected' status walo ko dashboard se bahar nikalo
    if (pathname.startsWith('/referral-program/dashboard') && partnerStatus === 'rejected') {
      return NextResponse.redirect(new URL('/referral-program', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/referral-program/dashboard/:path*',
    // '/onboarding/:path*'  <-- Ye hata diya kyunki ab iski zaroorat nahi
  ],
};
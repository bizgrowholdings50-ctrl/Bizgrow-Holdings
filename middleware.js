import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request) {
  // 1. Initial response object create karo
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Supabase client initialize karo
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Cookies update karo
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 3. User session check karo
  const { data: { user }, error } = await supabase.auth.getUser();

  // 4. Authentication check
  if (error || !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 5. Admin role check
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role || '';

  if (profileError || role !== 'admin') {
    return NextResponse.redirect(new URL('/referral-program', request.url));
  }

  // 6. Sab sahi hai, toh update ki gayi cookies ke sath response return karo
  return response;
}

// Config matcher
export const config = {
  matcher: ['/admin/:path*'],
};
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

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

  // ==========================================================
  // GET CURRENT USER
  // ==========================================================

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("MIDDLEWARE:", {
    pathname,
    userId: user?.id,
    userEmail: user?.email,
    userError: userError?.message,
  });

  // ==========================================================
  // PROTECTED ROUTES
  // ==========================================================

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith(
    "/referral-program/dashboard"
  );
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  const isProtectedRoute =
    isAdminRoute ||
    isDashboardRoute ||
    isOnboardingRoute;

  // ==========================================================
  // NOT LOGGED IN
  // ==========================================================

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // ==========================================================
  // LOGGED IN USER
  // ==========================================================

  if (user) {
    // ========================================================
    // ADMIN ROUTE
    // ========================================================

    if (isAdminRoute) {
      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

      console.log("ADMIN MIDDLEWARE CHECK:", {
        userId: user.id,
        role: profile?.role,
        profileError: profileError?.message,
      });

      // Profile not found OR not admin
      if (profileError || !profile || profile.role !== "admin") {
        return NextResponse.redirect(
          new URL("/", request.url)
        );
      }

      // ADMIN → DIRECTLY ALLOW /admin
      return response;
    }

    // ========================================================
    // ONBOARDING
    // ========================================================

    if (isOnboardingRoute) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.onboarding_completed) {
        return NextResponse.redirect(
          new URL(
            "/referral-program/dashboard",
            request.url
          )
        );
      }
    }
  }

  // ==========================================================
  // EVERYTHING ELSE
  // ==========================================================

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/referral-program/dashboard/:path*",
    "/onboarding/:path*",
  ],
};
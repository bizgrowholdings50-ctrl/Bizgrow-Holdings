import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient({ serviceRole = false, cookieSink } = {}) {
  const cookieStore = typeof cookies === 'function' ? await cookies() : cookies

  console.log("==========================================");
  console.log("createClient() called");
  console.log("serviceRole =", serviceRole);

  console.log(
    "SUPABASE_SERVICE_ROLE_KEY exists =",
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY exists =",
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (serviceRole && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing. Administrative operations require the service role key."
    );
  }

  const key = serviceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log(
    "Key being used =",
    key ? key.substring(0, 20) + "..." : "NULL"
  );

  console.log(
    "Key type =",
    key?.startsWith("sb_secret_")
      ? "SERVICE ROLE"
      : key?.startsWith("sb_publishable_")
      ? "PUBLISHABLE"
      : "JWT / OLD FORMAT"
  );

  console.log("==========================================");

  const cookiesAdapter = {
    getAll() {
      try {
        if (cookieStore && typeof cookieStore.getAll === "function") {
          const all = cookieStore.getAll();

          console.log("Cookies:");
          console.dir(all, { depth: null });

          return Array.isArray(all)
            ? all.map((c) => ({
                name: c?.name || c?.key || "",
                value: c?.value || "",
              }))
            : [];
        }

        return [];
      } catch (e) {
        console.error("Cookie getAll failed:", e);
        return [];
      }
    },

    setAll(cookiesToSet) {
      try {
        console.log("Setting Cookies:");
        console.dir(cookiesToSet, { depth: null });

        // ------------------------------------------------------
        // IMPORTANT (production fix):
        //
        // If a cookieSink array was provided by the caller (e.g.
        // a route handler that is about to build its own
        // NextResponse.redirect(...)), push the cookies there so
        // the caller can attach them DIRECTLY to that exact
        // response object via response.cookies.set(...).
        //
        // Relying only on cookieStore.set() below is NOT reliable
        // in production/serverless: those mutations go onto the
        // next/headers cookie store, which does not always get
        // merged into a manually-constructed NextResponse that a
        // route handler returns. That mismatch is what causes the
        // "works on localhost, blank until refresh in production"
        // bug for auth callback redirects.
        // ------------------------------------------------------

        if (cookieSink && Array.isArray(cookieSink)) {
          cookiesToSet.forEach((cookie) => {
            cookieSink.push(cookie);
          });
        }

        if (!cookieStore) return;

        if (typeof cookieStore.set === "function") {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
          return;
        }

        if (typeof cookieStore.setAll === "function") {
          cookieStore.setAll(cookiesToSet);
        }
      } catch (e) {
        console.error("Cookie setAll failed:", e);
      }
    },
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    key,
    {
      cookies: cookiesAdapter,
    
    }
  );
}
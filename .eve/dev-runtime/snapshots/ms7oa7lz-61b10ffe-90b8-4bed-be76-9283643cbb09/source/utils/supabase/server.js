import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient({ serviceRole = false } = {}) {
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
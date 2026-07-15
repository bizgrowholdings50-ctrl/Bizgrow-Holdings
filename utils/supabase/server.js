import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Create a Supabase server client with a resilient cookie adapter.
 * The Next.js `cookies()` shape can differ depending on context (middleware, route, server component).
 * This adapter normalizes available methods into the `{ getAll, setAll }` shape expected by `@supabase/ssr`.
 */
export async function createClient({ serviceRole = false } = {}) {
  // Attempt to obtain the cookie store for the current execution context.
  // `cookies` is a function exported by Next.js and can be async; await it when present.
  const cookieStore = typeof cookies === 'function' ? await cookies() : cookies

  const key = serviceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (serviceRole && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      'SUPABASE_SERVICE_ROLE_KEY is not set; falling back to anon key for server client.'
    )
  }

  const cookiesAdapter = {
    getAll() {
      try {
        // Next.js Cookies object usually has `getAll()` returning cookie objects
        if (cookieStore && typeof cookieStore.getAll === 'function') {
          const all = cookieStore.getAll()
          // Normalize to { name, value } entries expected by supabase
          return Array.isArray(all)
            ? all.map((c) => ({ name: c?.name || c?.key || '', value: c?.value || '' }))
            : []
        }

        // In some contexts cookieStore may expose a plain map-like interface
        if (cookieStore && typeof cookieStore.get === 'function') {
          // There's no portable way to list all names here — return empty and let middleware handle writes
          return []
        }

        return []
      } catch (e) {
        return []
      }
    },
    setAll(cookiesToSet) {
      try {
        if (!cookieStore) return

        // Preferred API: cookieStore.set(name, value, options)
        if (typeof cookieStore.set === 'function') {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
          return
        }

        // Fallback: if cookieStore exposes setAll, call it directly
        if (typeof cookieStore.setAll === 'function') {
          cookieStore.setAll(cookiesToSet)
          return
        }
      } catch (e) {
        // swallow cookie write errors in server components
      }
    },
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    key,
    {
      cookies: cookiesAdapter,
    }
  )
}
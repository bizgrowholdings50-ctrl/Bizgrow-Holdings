import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient({ serviceRole = false } = {}) {
  const cookieStore = await cookies()
  const key = serviceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (serviceRole && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      'SUPABASE_SERVICE_ROLE_KEY is not set; falling back to anon key for server client.'
    )
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component cookie error ignore karein
          }
        },
      },
    }
  )
}
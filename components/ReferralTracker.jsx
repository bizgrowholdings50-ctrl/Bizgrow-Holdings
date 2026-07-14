'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function ReferralTracker() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')

    if (!ref) return

    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''

    document.cookie = `bizgrow_referrer=${encodeURIComponent(ref)}; expires=${expires}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax${secure}`

    if (pathname !== '/referral-program') {
      router.replace('/referral-program')
    }
  }, [pathname, router])

  return null
}

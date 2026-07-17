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
    const sameSite = window.location.protocol === 'https:' ? 'SameSite=None' : 'SameSite=Lax'
    const hostname = window.location.hostname
    const domain = hostname.includes('.') && !hostname.includes('localhost')
      ? `; Domain=.${hostname.replace(/^www\./, '')}`
      : ''

    console.log('Referral cookie detected on client:', ref)

    document.cookie = `bizgrow_referrer=${encodeURIComponent(ref)}; expires=${expires}; path=/; max-age=${30 * 24 * 60 * 60}; ${sameSite}${secure}${domain}`

    const normalizedPath = pathname.replace(/\/$/, '')
    if (normalizedPath !== '/referral-program') {
      router.replace(`/referral-program/?ref=${encodeURIComponent(ref)}`)
    }
  }, [pathname, router])

  return null
}

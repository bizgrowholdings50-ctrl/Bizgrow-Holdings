'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'
import { useRouter } from 'next/navigation'

const NAVY = '#12066a'
const GOLD = '#997819'

export function ReferralBox({ referralCode }) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const referralLink =
    mounted && referralCode && referralCode !== '—'
      ? `${window.location.origin}/referral-program/?ref=${referralCode}`
      : ''

  const handleCopy = async () => {
    if (!referralLink) return

    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (error) {
      console.error('Failed to copy referral link:', error)
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCopy}
        disabled={!referralLink}
        className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#997819] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
        style={{ borderColor: copied ? GOLD : '#e2e8f0' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>
              Referral Link
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-slate-800">
              {referralLink || 'Your referral code is being prepared…'}
            </p>
          </div>
          <div className="rounded-full border border-slate-200 p-2 text-slate-500">
            {copied ? (
              <span className="text-xs font-semibold" style={{ color: GOLD }}>
                Copied!
              </span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </div>
        </div>
      </button>

      <div className="rounded-xl bg-slate-50 px-4 py-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Your code
        </p>
        <p className="mt-1 text-lg font-bold" style={{ color: NAVY }}>
          {referralCode || '—'}
        </p>
      </div>
    </div>
  )
}

function getReferralCookieValue() {
  if (typeof document === 'undefined') return ''

  const cookieValue = document.cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith('bizgrow_referrer='))

  return cookieValue ? decodeURIComponent(cookieValue.split('=')[1] || '').trim() : ''
}

function getReferralQueryParam() {
  if (typeof window === 'undefined') return ''

  const params = new URLSearchParams(window.location.search)
  return params.get('ref')?.trim() || ''
}

function setReferralCookie(referralCode) {
  if (typeof document === 'undefined' || !referralCode) return

  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  const sameSite = window.location.protocol === 'https:' ? 'SameSite=None' : 'SameSite=Lax'
  const hostname = window.location.hostname
  const domain = hostname.includes('.') && !hostname.includes('localhost')
    ? `; Domain=.${hostname.replace(/^www\./, '')}`
    : ''
  document.cookie = `bizgrow_referrer=${encodeURIComponent(referralCode)}; expires=${expires}; path=/; max-age=${30 * 24 * 60 * 60}; ${sameSite}${secure}${domain}`
}

export function ReferralCookieNotice() {
  const [hasReferralCookie, setHasReferralCookie] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hasReferral = Boolean(getReferralCookieValue() || getReferralQueryParam())
    setHasReferralCookie(hasReferral)
  }, [])

  if (!hasReferralCookie) return null

  return (
    <div className="mb-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800 shadow-sm">
      <p className="font-semibold">You&apos;ve been invited! Complete registration to join the network.</p>
    </div>
  )
}

export function GoogleLoginButton() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || ''

    const referralCode = getReferralCookieValue() || getReferralQueryParam()
    if (referralCode) {
      setReferralCookie(referralCode)
    }

    // Yahan callback URL ke sath referral code preserve kar diya gaya hai
    // Take jab auth callback par jaye toh ref code lose na ho
    const redirectTo = origin
      ? `${origin.replace(/\/$/, '')}/auth/callback/${referralCode ? `?ref=${encodeURIComponent(referralCode)}` : ''}`
      : '/auth/callback/'

    try {
      console.log("Current origin:", typeof window !== 'undefined' ? window.location.origin : '')
      console.log("redirectTo:", redirectTo)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
        },
      })

      console.log("OAuth URL:", data?.url)

      if (error) {
        console.error('Google sign-in failed:', error)
        setLoading(false)
        return
      }

      if (data?.url) {
        window.location.href = data.url
        return
      }

      const base = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      if (base) {
        const fallback = `${base.replace(/\/$/, '')}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(
          redirectTo
        )}`
        window.location.href = fallback
        return
      }
    } catch (err) {
      console.error('Exception during Google OAuth:', err)
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <ReferralCookieNotice />
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 font-semibold text-slate-900 shadow-sm transition duration-150 ease-in-out hover:bg-slate-50 disabled:opacity-70"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
          <svg viewBox="0 0 533.5 544.3" className="h-4.5 w-4.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272.1v95.4h147.1c-6.3 34.4-25.3 63.5-54 83.1v68.8h87.4c51.2-47.1 80.9-116.4 80.9-196.9z"/>
            <path fill="#34a853" d="M272.1 544.3c73.4 0 135-24.2 180-65.8l-87.4-68.8c-24.3 16.3-55.5 25.9-92.6 25.9-71 0-131.2-47.9-152.7-112.4H31.2v70.7c44.8 88.3 136.7 150.4 240.9 150.4z"/>
            <path fill="#fbbc04" d="M119.4 323.2c-10.4-30.7-10.4-63.8 0-94.5V158c-32.8 65.7-32.8 143.4 0 209.1l102.6-43.9z"/>
            <path fill="#ea4335" d="M272.1 107.1c39.9-.6 78 14.6 106.8 40.9l80.2-80.2C408.3 24.7 344.6-.3 272.1 0 168 0 76.1 62.1 31.2 150.4l102.6 70.7c21.4-64.6 81.7-112.4 138.3-113z"/>
          </svg>
        </span>
        {loading ? 'Loading...' : 'Continue with Google'}
      </button>
    </div>
  )
}

export function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/referral-program')
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full rounded-2xl border border-slate-200 bg-4 px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.99]"
      style={{ borderColor: `${GOLD}33` }}
    >
      Sign Out
    </button>
  )
}
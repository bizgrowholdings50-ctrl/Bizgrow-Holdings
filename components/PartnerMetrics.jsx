'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'

export default function PartnerMetrics({ userId, initialDirectCount = 0, initialNetworkSize = 0, initialDirectReferrals = [] }) {
  const supabase = createClient()
  const [directCount, setDirectCount] = useState(initialDirectCount)
  const [networkSize, setNetworkSize] = useState(initialNetworkSize)
  const [directReferrals, setDirectReferrals] = useState(initialDirectReferrals)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    if (!userId) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const directRes = await supabase
          .from('referrals')
          .select('id', { count: 'exact', head: true })
          .eq('referrer_id', userId)

        if (!mounted) return

        if (directRes.error) {
          console.error('Direct referrals count failed:', directRes.error)
        } else {
          setDirectCount(directRes.count || 0)
        }

        const networkRes = await supabase
          .from('referrals')
          .select('referred_user_id')
          .eq('referrer_id', userId)

        if (!mounted) return
        if (networkRes.error) {
          console.error('Network size query failed:', networkRes.error)
        } else {
          setNetworkSize(networkRes.data?.length || 0)
        }

        if (!initialDirectReferrals || initialDirectReferrals.length === 0) {
          const listRes = await supabase
            .from('referrals')
            .select('referred_user_id, created_at')
            .eq('referrer_id', userId)
            .order('created_at', { ascending: false })

          if (!mounted) return
          if (!listRes.error && listRes.data) {
            const referredIds = listRes.data.map((ref) => ref.referred_user_id).filter(Boolean)
            if (referredIds.length) {
              const { data: profileData, error: profileDataError } = await supabase
                .from('profiles')
                .select('id, full_name, email')
                .in('id', referredIds)

              if (profileDataError) {
                console.error('Direct referrals profile lookup failed:', profileDataError)
              } else if (profileData) {
                const profileMap = profileData.reduce((acc, item) => {
                  if (item?.id) acc[item.id] = item
                  return acc
                }, {})

                setDirectReferrals(
                  listRes.data.map((ref) => ({
                    id: ref.referred_user_id,
                    full_name: profileMap[ref.referred_user_id]?.full_name || '',
                    email: profileMap[ref.referred_user_id]?.email || '',
                    created_at: ref.created_at,
                  }))
                )
              }
            }
          }
        }
      } catch (err) {
        console.error('PartnerMetrics fetch error:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [userId])

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200/60 rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-500">Partner Network</p>
            <h4 className="mt-3 text-2xl font-bold" style={{ color: '#12066a' }}>Direct referrals</h4>
          </div>
          <div className="rounded-3xl bg-[#12066a] px-3 py-2 text-sm font-semibold text-white">
            {loading ? '—' : directCount}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {directReferrals && directReferrals.length ? (
            directReferrals.map((ref) => (
              <div key={ref.id} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">{ref.full_name}</p>
                <p className="text-xs text-slate-500 mt-1 break-all">{ref.email}</p>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200/70 bg-[#f8f7ff] p-5 text-sm text-slate-600">
              {loading ? 'Loading referrals…' : 'No referrals yet. Share your link to start building your network.'}
            </div>
          )}

        </div>

        <div className="mt-6 rounded-3xl border border-slate-200/70 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Network size</p>
          <p className="mt-2 text-3xl font-bold" style={{ color: '#12066a' }}>{loading ? '—' : networkSize}</p>
        </div>
      </div>
    </div>
  )
}

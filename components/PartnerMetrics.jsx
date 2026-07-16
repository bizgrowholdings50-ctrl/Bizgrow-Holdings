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
        // Direct referrals count using head+count
        const directRes = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('referrer_id', userId)

        if (!mounted) return

        if (directRes.error) {
          console.error('Direct referrals count failed:', directRes.error)
        } else {
          setDirectCount(directRes.count || 0)
        }

        // Network size via RPC
        const rpcRes = await supabase.rpc('get_total_network_size', { user_id: userId })
        if (!mounted) return
        if (rpcRes.error) {
          console.error('Network size RPC failed:', rpcRes.error)
        } else if (Array.isArray(rpcRes.data) && rpcRes.data.length && typeof rpcRes.data[0].get_total_network_size === 'number') {
          // some RPCs return [{ get_total_network_size: 5 }]
          setNetworkSize(rpcRes.data[0].get_total_network_size)
        } else if (rpcRes.data && typeof rpcRes.data === 'number') {
          setNetworkSize(rpcRes.data)
        } else if (rpcRes.data && rpcRes.data.value) {
          setNetworkSize(Number(rpcRes.data.value) || 0)
        }

        // Fetch direct referrals list if initial was empty
        if (!initialDirectReferrals || initialDirectReferrals.length === 0) {
          const listRes = await supabase
            .from('profiles')
            .select('id, full_name, email, created_at')
            .eq('referrer_id', userId)
            .order('created_at', { ascending: false })

          if (!mounted) return
          if (!listRes.error && listRes.data) setDirectReferrals(listRes.data)
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

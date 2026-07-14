'use client'

import { useMemo, useState } from 'react'

export default function AvatarWithFallback({ src, name, size = 80, borderColor = '#b48c1e' }) {
  const [failed, setFailed] = useState(false)

  const initials = useMemo(() => {
    const text = name?.trim() || 'U'
    const parts = text.split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }, [name])

  const fallbackStyle = {
    backgroundColor: '#f8f8fa',
    color: '#12103e',
    width: size,
    height: size,
    borderRadius: '9999px',
    border: `2px solid ${borderColor}`,
    display: 'grid',
    placeItems: 'center',
    fontWeight: 700,
    fontSize: size * 0.4,
  }

  if (!src || failed) {
    return <div style={fallbackStyle}>{initials}</div>
  }

  return (
    <img
      src={src}
      alt={name || 'Avatar'}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className="rounded-full object-cover shadow-md"
      style={{ border: `2px solid ${borderColor}`, width: size, height: size }}
    />
  )
}

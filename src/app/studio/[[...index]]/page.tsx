'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path will handle this file
 *
 * Studio is mounted only after the first paint to avoid React 19 "flushSync was called
 * from inside a lifecycle method" when Sanity's VirtualizedArrayList runs during initial render.
 */
import { useEffect, useState } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1a1a1a' }}>
        <div style={{ color: '#fff', fontSize: 14 }}>Loading Studio…</div>
      </div>
    )
  }

  return <NextStudio config={config} />
}

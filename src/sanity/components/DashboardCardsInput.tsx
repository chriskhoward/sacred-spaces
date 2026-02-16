'use client'

/**
 * Custom array input for Teacher Collective Dashboard cards.
 * Defers rendering the default (virtualized) array input until after mount
 * to avoid React 19 "flushSync was called from inside a lifecycle method"
 * when opening this document in Studio.
 */
import { useEffect, useState } from 'react'
import { type ArrayOfObjectsInputProps } from 'sanity'

export function DashboardCardsInput(props: ArrayOfObjectsInputProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 6, color: '#9ca3af', fontSize: 13 }}>
        Loading…
      </div>
    )
  }

  return <>{props.renderDefault(props)}</>
}

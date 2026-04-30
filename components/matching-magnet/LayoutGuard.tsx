'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export function HideOnMatchingMagnet({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/matching-magnet')) return null
  return <>{children}</>
}

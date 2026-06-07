'use client'

import { useEffect } from 'react'
import type { SiteSettings } from '@/lib/types'

interface Props {
  settings: SiteSettings
  children: React.ReactNode
}

export default function ThemeWrapper({ settings, children }: Props) {
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-density', settings.density)
    root.setAttribute('data-fontsize', settings.fontSize)
    root.setAttribute('data-font', settings.fontFamily)
    root.style.setProperty('--accent', settings.accentColor)
    const hex = settings.accentColor
    root.style.setProperty('--accent-hover', lighten(hex, 20))

    if (settings.theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [settings])

  return <>{children}</>
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, (num >> 16) + amount)
  const g = Math.min(255, ((num >> 8) & 0xff) + amount)
  const b = Math.min(255, (num & 0xff) + amount)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Sidebar — sourced from Figma nodes 60:923 (layout) and 47:286 (menu item states).
 *
 * state="expanded"  — 212 px wide: logo wordmark + icon + label nav items
 * state="collapsed" — 48 px wide:  icon-only logo + icon-only nav items
 *
 * Nav item states (per Figma node 47:286):
 *   Default  — transparent bg · dark icon · dark label
 *   Hovered  — bg-brand-tint-blue · cyan icon · cyan label (#2bc7e0)
 *   Selected — bg-primary (cyan) · brand-indigo icon · brand-indigo label · shadow-100
 *
 * Typography: TT Norms Pro Medium · 16 px · tracking 0.1px · leading 1.4
 */

import { useState } from 'react'
import Logo from '../Logo/Logo'
import { ICON_MENU_ASSETS } from '../IconMenu/IconMenu'
import type { IconMenuName } from '../IconMenu/IconMenu'

export type SidebarState = 'expanded' | 'collapsed'

export type SidebarProps = {
  state?: SidebarState
}

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS: { icon: IconMenuName; label: string }[] = [
  { icon: 'dashboard',           label: 'Dashboard' },
  { icon: 'hash',                label: 'Topics' },
  { icon: 'message-square-text', label: 'All Messages' },
  { icon: 'window',              label: 'Phishing' },
  { icon: 'shield-check',        label: 'Wiki-Defender' },
  { icon: 'bot',                 label: 'A.I. Safety' },
  { icon: 'seeding',             label: 'C.R.O.W.S' },
  { icon: 'scan-face',           label: 'Face Detection' },
]

// Icon + label colours from Figma tokens
const COLOR_DEFAULT  = '#334155' // colour/text/default
const COLOR_HOVER    = '#2bc7e0' // colour/icon/primary
const COLOR_SELECTED = '#085b92' // color/brand/indigo

function NavIcon({ src, color }: { src: string; color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block size-6 shrink-0"
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Sidebar({ state = 'expanded' }: SidebarProps) {
  const collapsed = state === 'collapsed'
  const [selected, setSelected] = useState<number | null>(null)
  const [hovered,  setHovered]  = useState<number | null>(null)

  return (
    <div
      className={[
        'flex flex-col items-start py-4 bg-surface-white h-full transition-all duration-200',
        collapsed ? 'w-12' : 'w-[212px]',
      ].join(' ')}
    >
      {/* Logo */}
      <div
        className={[
          'flex items-center shrink-0 w-full overflow-hidden',
          collapsed ? 'justify-center px-[10px]' : 'px-4',
        ].join(' ')}
      >
        <Logo variant={collapsed ? 'icon' : 'primary'} />
      </div>

      {/* Divider */}
      <hr className="w-full border-t border-greyscale-300 my-4" />

      {/* Nav */}
      <nav className="flex flex-col gap-2 w-full">
        {NAV_ITEMS.map(({ icon, label }, idx) => {
          const isSelected = idx === selected
          const isHovered  = idx === hovered && !isSelected

          const iconColor =
            isSelected ? COLOR_SELECTED :
            isHovered  ? COLOR_HOVER    : COLOR_DEFAULT

          const labelClass =
            isSelected ? 'text-brand-indigo' :
            isHovered  ? 'text-primary'       : 'text-text-default'

          const bgClass =
            isSelected ? 'bg-primary shadow-100' :
            isHovered  ? 'bg-brand-tint-blue'    : ''

          return (
            <button
              key={icon}
              type="button"
              onClick={() => setSelected(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={[
                'flex items-center h-12 w-full rounded-lg transition-colors cursor-pointer',
                collapsed ? 'justify-center px-2' : 'gap-4 px-4',
                bgClass,
              ].join(' ')}
            >
              <NavIcon src={ICON_MENU_ASSETS[icon]} color={iconColor} />
              {!collapsed && (
                <span
                  className={[
                    'font-display font-medium text-[16px] leading-[1.4] tracking-[0.1px] whitespace-nowrap transition-colors',
                    labelClass,
                  ].join(' ')}
                >
                  {label}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

/**
 * Sidebar — sourced from Figma nodes 55:169 (layout) and 47:286 (menu item states).
 *
 * state="expanded"  — 212 px wide: logo wordmark + icon + label nav items
 * state="collapsed" — 48 px wide:  icon-only logo + icon-only nav items
 *
 * Nav item states (WCAG AA — text/icon use colour/text/default #0F172A on all states):
 *   Default  — transparent bg · icon-default · text-default
 *   Hovered  — bg-brand-tint-blue · icon-default · text-default
 *   Selected — bg-primary · icon-default · text-default · shadow-100
 *
 * Typography: Inter Medium 15 px · tracking 0.2px · leading 24 (Body 1 Medium)
 */

import { useState } from 'react'
import Logo from '../Logo/Logo'
import { ICON_COLOR_DEFAULT } from '../Icon/Icon'
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

// Nav icon + label use text/icon default on every state (Figma 55:169)
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

          const iconColor = ICON_COLOR_DEFAULT
          const labelClass = 'text-text-default'

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
                    'font-body font-medium text-[15px] leading-6 tracking-[0.2px] whitespace-nowrap transition-colors',
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

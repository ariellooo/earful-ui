/**
 * Sidebar — sourced from Figma nodes 55:169 (layout) and 47:286 (menu item states).
 *
 * state="expanded"  — 212 px wide: logo wordmark + icon + label nav items
 * state="collapsed" — 48 px wide:  icon-only logo + icon-only nav items
 *
 * Logo shell is exactly 88 px (Side pt-24 + inner py-16 + logo-32 + gap-16),
 * with the divider flush on the bottom edge — matches Header shell height.
 *
 * Nav item states (WCAG AA — text/icon use colour/text/default #0F172A on all states):
 *   Default  — transparent bg · icon-default · text-default
 *   Hovered  — bg-brand-tint-blue · icon-default · text-default
 *   Selected — bg-primary · icon-default · text-default · shadow-100
 *
 * Typography: Inter Medium 15 px · tracking 0.2px · leading 24 (Body 1 Medium)
 *
 * Toggle (Figma 5445:3335 menu/Default/Full · 47:286 menu/Default/Short):
 *   expanded  — 48 px row · px-16 · chevron-right · no label
 *   collapsed — 48 px row · px-8  · chevron-left  · icon centered
 */

import { useState } from 'react'
import Logo from '../../foundations/Logo/Logo'
import IconMenu from '../../foundations/Icons/Menu/IconMenu'
import { ChevronLeft, ChevronRight } from '../../components/Button'
import type { IconMenuName } from '../../foundations/Icons/Menu/IconMenu'

export type SidebarState = 'expanded' | 'collapsed'

export type SidebarProps = {
  state?:    SidebarState
  onToggle?: () => void
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

// ─── Component ────────────────────────────────────────────────────────────────

/** Logo + divider shell — 88 px, divider on the bottom edge (Figma 626:6146). */
const LOGO_SHELL_HEIGHT = 'h-[88px]'

export default function Sidebar({ state = 'expanded', onToggle }: SidebarProps) {
  const collapsed = state === 'collapsed'
  const [selected, setSelected]       = useState<number | null>(null)
  const [hovered,  setHovered]        = useState<number | null>(null)
  const [toggleHovered, setToggleHovered] = useState(false)

  return (
    <div
      className={[
        'flex flex-col items-start pb-4 bg-surface-white h-full transition-all duration-200',
        collapsed ? 'w-12' : 'w-[212px]',
      ].join(' ')}
    >
      {/* Logo shell — fixed 88 px; divider sits on the bottom edge */}
      <div className={['relative w-full shrink-0', LOGO_SHELL_HEIGHT].join(' ')}>
        <div
          className={[
            'absolute top-10 flex h-8 items-center',
            collapsed ? 'left-[10px]' : 'left-4',
          ].join(' ')}
        >
          <Logo variant={collapsed ? 'icon' : 'primary'} />
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-greyscale-300"
        />
      </div>

      {/* Nav — 16 px below divider (Figma sidebar gap after logo shell) */}
      <nav className="mt-4 flex flex-1 flex-col gap-2 w-full">
        {NAV_ITEMS.map(({ icon, label }, idx) => {
          const isSelected = idx === selected
          const isHovered  = idx === hovered && !isSelected

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
              <IconMenu name={icon} size={24} />
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

      {/* Toggle — Figma 5445:3335 (Full) · 47:286 style=Short */}
      {onToggle && (
        <button
          type="button"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onToggle}
          onMouseEnter={() => setToggleHovered(true)}
          onMouseLeave={() => setToggleHovered(false)}
          className={[
            'flex h-12 w-full shrink-0 items-center rounded-lg transition-colors cursor-pointer',
            'text-text-default',
            collapsed ? 'justify-center px-2' : 'px-4',
            toggleHovered ? 'bg-brand-tint-blue' : '',
          ].join(' ')}
        >
          {collapsed ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      )}
    </div>
  )
}

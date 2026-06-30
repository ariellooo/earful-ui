/**
 * Pagination — sourced from Figma node 775:4022 (Earful 2026).
 *
 * version="default"   — "Showing X to Y of Z entries" on the left
 * version="show-rows" — "Show rows: [N Rows ↓]" selector on the left
 *
 * Right side: chevron-left · page buttons · chevron-right
 * Current page: bg-primary + white text
 * Ellipsis cells: non-interactive "…"
 */

import { useState } from 'react'
import { IconGlyph, type IconName } from '../../foundations/Icons/Function/IconFunction'

export type PaginationVersion = 'default' | 'show-rows'

export type PaginationProps = {
  version?:             PaginationVersion
  totalItems?:          number
  defaultItemsPerPage?: number
}

// ─── Page window builder ──────────────────────────────────────────────────────

function buildPages(current: number, total: number): (number | '…')[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1)

  const delta = 2
  const left  = current - delta
  const right = current + delta

  const middle: number[] = []
  for (let i = Math.max(2, left); i <= Math.min(total - 1, right); i++) {
    middle.push(i)
  }

  const pages: (number | '…')[] = [1]
  if (left > 2)        pages.push('…')
  pages.push(...middle)
  if (right < total - 1) pages.push('…')
  pages.push(total)

  return pages
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const PAGE_BTN = 'flex items-center justify-center size-9 rounded-lg border shadow-100 shrink-0 ' +
  'font-body font-medium text-[15px] leading-6 tracking-[0.2px] transition-colors'

function PageButton({
  label, active, disabled, onClick,
}: { label: string | number; active?: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        PAGE_BTN,
        active
          ? 'bg-primary border-primary text-white'
          : 'bg-surface-white border-greyscale-300 text-text-default hover:bg-surface-primary',
        disabled ? 'opacity-40 cursor-default pointer-events-none' : 'cursor-pointer',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function ChevronButton({
  icon, label, disabled, onClick,
}: { icon: IconName; label: string; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex items-center justify-center size-12 rounded-lg transition-colors',
        disabled ? 'opacity-30 cursor-default pointer-events-none' : 'cursor-pointer hover:bg-surface-primary',
      ].join(' ')}
    >
      <IconGlyph name={icon} size={24} />
    </button>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const ROW_OPTIONS = [5, 10, 20, 50]

export default function Pagination({
  version             = 'default',
  totalItems          = 36,
  defaultItemsPerPage = 10,
}: PaginationProps) {
  const [currentPage,  setCurrentPage]  = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  // clamp current page when itemsPerPage changes
  const safeCurrent = Math.min(currentPage, totalPages)

  const from = (safeCurrent - 1) * itemsPerPage + 1
  const to   = Math.min(safeCurrent * itemsPerPage, totalItems)

  const pages = buildPages(safeCurrent, totalPages)

  function go(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="flex items-center justify-between px-4 w-full">

      {/* Left */}
      <div className="flex items-center h-12 gap-4">
        {version === 'default' ? (
          <span className="font-body font-medium text-[12px] leading-6 tracking-[0.2px] text-text-default whitespace-nowrap">
            Showing {from} to {to} of {totalItems} entries
          </span>
        ) : (
          <>
            <span className="font-body font-medium text-[12px] leading-6 tracking-[0.2px] text-text-default whitespace-nowrap">
              Show rows:
            </span>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1) }}
                className={[
                  'h-9 pl-4 pr-8 appearance-none cursor-pointer',
                  'bg-surface-white border border-greyscale-300 rounded-lg shadow-100',
                  'font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default',
                  'focus:outline-none focus:border-greyscale-500 transition-colors',
                ].join(' ')}
              >
                {ROW_OPTIONS.map(n => (
                  <option key={n} value={n}>{n} Rows</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                <IconGlyph name="chevron-down" size={24} />
              </span>
            </div>
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 shrink-0">
        <ChevronButton
          icon="chevron-left" label="Previous page"
          disabled={safeCurrent === 1}
          onClick={() => go(safeCurrent - 1)}
        />

        <div className="flex items-center gap-2">
          {pages.map((p, i) =>
            p === '…' ? (
              <PageButton key={`ellipsis-${i}`} label="…" disabled />
            ) : (
              <PageButton
                key={p}
                label={p}
                active={p === safeCurrent}
                onClick={() => go(p as number)}
              />
            )
          )}
        </div>

        <ChevronButton
          icon="chevron-right" label="Next page"
          disabled={safeCurrent === totalPages}
          onClick={() => go(safeCurrent + 1)}
        />
      </div>

    </div>
  )
}

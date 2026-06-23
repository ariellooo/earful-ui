/**
 * DayPicker — sourced from Figma (Earful 2026).
 *
 * state="default" — outlined trigger button: calendar icon + "Select Day" label
 * state="open"    — full dropdown panel: preset shortcuts + calendar grid
 */

import { useState } from 'react'

export type DayPickerState = 'default' | 'open' | 'select-day' | 'select-range'

export type DayPickerProps = {
  state?: DayPickerState
  text?:  string
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden className="shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// ─── Calendar helpers ─────────────────────────────────────────────────────────

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

/** Returns a 6-row × 7-col grid of Date objects for a given month (Mon-start). */
function buildCalendarDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1)
  // Monday-based: getDay() 0=Sun → shift so Mon=0
  const startOffset = (first.getDay() + 6) % 7
  const start = new Date(year, month, 1 - startOffset)
  const days: Date[] = []
  for (let i = 0; i < 35; i++) {
    days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  }
  // If the last row still contains days from the current month, extend to 42
  const last = days[days.length - 1]
  if (last.getMonth() === month) {
    for (let i = 35; i < 42; i++) {
      days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
    }
  }
  return days
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function normalizeDate(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function offsetDays(base: Date, offset: number): Date {
  const d = normalizeDate(base)
  d.setDate(d.getDate() + offset)
  return d
}

function computePresetRange(label: string, today: Date): { start: Date; end: Date } | null {
  if (label === 'Last 7 Days') {
    return { start: offsetDays(today, -6), end: normalizeDate(today) }
  }
  if (label === 'Last 14 Days') {
    return { start: offsetDays(today, -13), end: normalizeDate(today) }
  }
  if (label === 'Last Month') {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const end   = new Date(today.getFullYear(), today.getMonth(), 0)
    return { start, end }
  }
  return null
}

// ─── Panel ────────────────────────────────────────────────────────────────────

const PRESETS = ['Today', 'Last 7 Days', 'Last 14 Days', 'Last Month']

function DayPickerPanel({ initialPreset }: { initialPreset?: string }) {
  const today = normalizeDate(new Date())

  const initRange = initialPreset ? computePresetRange(initialPreset, today) : null

  const [viewYear,     setViewYear]     = useState(() => {
    if (initialPreset === 'Last Month') return (new Date(today.getFullYear(), today.getMonth() - 1, 1)).getFullYear()
    return today.getFullYear()
  })
  const [viewMonth,    setViewMonth]    = useState(() => {
    if (initialPreset === 'Last Month') return (new Date(today.getFullYear(), today.getMonth() - 1, 1)).getMonth()
    return today.getMonth()
  })
  // rangeStart/rangeEnd cover all selections — presets, manual ranges, and single days
  // (Today = rangeStart === rangeEnd)
  const [rangeStart,    setRangeStart]    = useState<Date | null>(
    initialPreset === 'Today' ? today : (initRange?.start ?? null)
  )
  const [rangeEnd,      setRangeEnd]      = useState<Date | null>(
    initialPreset === 'Today' ? today : (initRange?.end ?? null)
  )
  // pendingStart holds the first click of a manual range before the second click
  const [pendingStart,  setPendingStart]  = useState<Date | null>(null)
  const [activePreset,  setActivePreset]  = useState<string | null>(initialPreset ?? null)

  const days = buildCalendarDays(viewYear, viewMonth)

  // Group flat array into rows of 7 (one per week)
  const weeks: Date[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function handlePreset(label: string) {
    setActivePreset(label)
    setPendingStart(null)
    if (label === 'Today') {
      setRangeStart(today)
      setRangeEnd(today)
      setViewYear(today.getFullYear())
      setViewMonth(today.getMonth())
    } else {
      const range = computePresetRange(label, today)
      if (range) {
        setRangeStart(range.start)
        setRangeEnd(range.end)
        if (label === 'Last Month') {
          setViewYear(range.start.getFullYear())
          setViewMonth(range.start.getMonth())
        } else {
          setViewYear(range.end.getFullYear())
          setViewMonth(range.end.getMonth())
        }
      }
    }
  }

  function handleClear() {
    setRangeStart(null)
    setRangeEnd(null)
    setPendingStart(null)
    setActivePreset(null)
  }

  function handleDayClick(d: Date) {
    const nd = normalizeDate(d)
    if (pendingStart) {
      // Second click — complete the range (order start ≤ end)
      const start = nd < pendingStart ? nd : pendingStart
      const end   = nd < pendingStart ? pendingStart : nd
      setRangeStart(start)
      setRangeEnd(end)
      setPendingStart(null)
      setActivePreset(null)
    } else {
      // First click — begin a new selection
      setPendingStart(nd)
      setRangeStart(null)
      setRangeEnd(null)
      setActivePreset(null)
    }
  }

  const isPending      = (d: Date) => !!pendingStart && d.toDateString() === pendingStart.toDateString()
  const isCurrentMonth = (d: Date) => d.getMonth() === viewMonth

  function isInRange(d: Date): boolean {
    if (!rangeStart || !rangeEnd) return false
    const n = normalizeDate(d)
    return n >= rangeStart && n <= rangeEnd
  }

  // A row gets the full grey band only when every date in that row is within the range
  // (not applicable for single-day ranges where rangeStart === rangeEnd)
  function rowIsFullyInRange(week: Date[]): boolean {
    if (!rangeStart || !rangeEnd || rangeStart.toDateString() === rangeEnd.toDateString()) return false
    return week.every(d => isInRange(d))
  }

  // A date in a partial-boundary row (or a single-day selection) shows individual grey
  function showIndividualRange(d: Date, week: Date[]): boolean {
    return isInRange(d) && !rowIsFullyInRange(week)
  }

  const hasSelection = pendingStart !== null || rangeStart !== null

  return (
    <div className="inline-flex items-center bg-surface-white rounded-lg shadow-100 border border-greyscale-300 overflow-hidden">
      {/* Left: presets */}
      <div className="flex flex-col justify-center w-[125px] py-2 border-r border-greyscale-300 self-stretch">
        {PRESETS.map(label => {
          const isActive = label === activePreset
          return (
            <button
              key={label}
              type="button"
              onClick={() => handlePreset(label)}
              className={[
                'text-left px-4 h-9 rounded-lg mx-1 transition-colors cursor-pointer whitespace-nowrap',
                'font-body font-medium text-[15px] leading-6 tracking-[0.2px]',
                isActive
                  ? 'bg-secondary text-text-invert shadow-200'
                  : 'text-text-default hover:bg-surface-primary',
              ].join(' ')}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Right: calendar */}
      <div className="flex flex-col gap-4 p-4 w-[286px]">
        {/* Month nav */}
        <div className="flex items-center justify-between">
          <button type="button" onClick={prevMonth}
            className="text-text-default cursor-pointer">
            <ChevronLeft />
          </button>
          <span className="font-body font-bold text-[15px] leading-6 tracking-[0.2px] text-secondary">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button type="button" onClick={nextMonth}
            className="text-text-default cursor-pointer">
            <ChevronRight />
          </button>
        </div>

        {/* Divider */}
        <hr className="border-t border-greyscale-300 -mt-2" />

        {/* Day grid */}
        <div className="flex flex-col">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map(d => (
              <div key={d} className="flex items-center justify-center h-10 w-full
                font-body font-bold text-[10px] leading-4 text-text-default text-center">
                {d}
              </div>
            ))}
          </div>
          {/* Week rows — row div carries the grey band for full-range rows */}
          {weeks.map((week, wi) => (
            <div
              key={wi}
              className={[
                'grid grid-cols-7',
                rowIsFullyInRange(week) ? 'bg-surface-primary rounded-lg' : '',
              ].join(' ')}
            >
              {week.map((d, di) => (
                <button
                  key={di}
                  type="button"
                  onClick={() => handleDayClick(d)}
                  className={[
                    'flex items-center justify-center h-10 w-full',
                    'font-body font-normal text-[10px] leading-4 text-center',
                    'cursor-pointer transition-colors',
                    isPending(d) || showIndividualRange(d, week)
                      ? 'bg-surface-primary rounded-lg text-text-default'
                      : isCurrentMonth(d)
                        ? 'rounded-full text-text-default hover:bg-surface-primary'
                        : 'rounded-full text-greyscale-300 hover:bg-surface-primary',
                  ].join(' ')}
                >
                  {d.getDate()}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end">
          <button type="button"
            onClick={handleClear}
            className="h-9 px-4 font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default hover:bg-surface-primary rounded-lg transition-colors cursor-pointer">
            Clear
          </button>
          <button type="button"
            className={[
              'h-9 px-4 font-body font-medium text-[15px] leading-6 tracking-[0.2px] rounded-lg transition-colors cursor-pointer',
              hasSelection
                ? 'bg-secondary text-text-invert shadow-200'
                : 'text-text-default border border-greyscale-300 bg-surface-white shadow-100 hover:bg-surface-primary',
            ].join(' ')}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DayPicker({
  state = 'default',
  text  = 'Select Day',
}: DayPickerProps) {
  if (state === 'open')          return <DayPickerPanel />
  if (state === 'select-day')   return <DayPickerPanel initialPreset="Today" />
  if (state === 'select-range') return <DayPickerPanel initialPreset="Last 7 Days" />

  return (
    <button
      type="button"
      className={[
        'inline-flex h-12 items-center gap-2 pl-3 pr-4 py-2',
        'rounded-lg border border-greyscale-300 bg-surface-white shadow-100',
        'font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default',
        'cursor-pointer transition-colors hover:bg-surface-primary whitespace-nowrap',
      ].join(' ')}
    >
      <CalendarIcon />
      <span>{text}</span>
    </button>
  )
}

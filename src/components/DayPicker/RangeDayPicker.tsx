/**
 * RangeDayPicker — sourced from Figma (Earful 2026).
 *
 * state="default" — outlined trigger button: calendar icon + "Select Day" label
 * state="open"    — full dropdown panel: preset shortcuts + calendar grid
 */

import { useState } from 'react'
import Button from '../Button/Button/Button'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'
import { IconGlyph } from '../../foundations/Icons/Function/IconFunction'
import {
  MONTH_NAMES,
  WEEKDAYS,
  buildCalendarDays,
  computePresetRange,
  normalizeDate,
} from './calendarHelpers'

export type RangeDayPickerState = 'default' | 'open'

export type DateRange = {
  start: Date
  end:   Date
}

export type RangeDayPickerProps = {
  state?:    RangeDayPickerState
  text?:     string
  onApply?:  (range: DateRange) => void
  onClear?:  () => void
}

// ─── Panel ────────────────────────────────────────────────────────────────────

const PRESETS = ['Today', 'Last 7 Days', 'Last 14 Days', 'Last Month']

function RangeDayPickerPanel({
  onApply,
  onClear,
}: {
  onApply?: (range: DateRange) => void
  onClear?: () => void
}) {
  const today = normalizeDate(new Date())

  const [viewYear,    setViewYear]    = useState(() => today.getFullYear())
  const [viewMonth,   setViewMonth]   = useState(() => today.getMonth())
  const [rangeStart,  setRangeStart]  = useState<Date | null>(null)
  const [rangeEnd,    setRangeEnd]    = useState<Date | null>(null)
  const [pendingStart, setPendingStart] = useState<Date | null>(null)
  const [activePreset, setActivePreset] = useState<string | null>(null)

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
    onClear?.()
  }

  function handleApply() {
    if (!hasSelection) return
    if (rangeStart && rangeEnd) {
      onApply?.({ start: rangeStart, end: rangeEnd })
    } else if (pendingStart) {
      onApply?.({ start: pendingStart, end: pendingStart })
    }
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
                  ? 'bg-secondary text-text-default shadow-200'
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
          <div className="flex size-10 shrink-0 items-center justify-center">
            <ButtonSquare
              type="icon"
              icon="chevron-left"
              size="s"
              onClick={prevMonth}
            />
          </div>
          <span className="font-body font-bold text-[15px] leading-6 tracking-[0.2px] text-brand-indigo">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <div className="flex size-10 shrink-0 items-center justify-center">
            <ButtonSquare
              type="icon"
              icon="chevron-right"
              size="s"
              onClick={nextMonth}
            />
          </div>
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
                        ? 'rounded-lg text-text-default hover:bg-surface-primary'
                        : 'rounded-lg text-greyscale-300 hover:bg-surface-primary',
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
          <Button
            label="Clear"
            level="tertiary"
            size="m"
            onClick={handleClear}
          />
          <Button
            label="Apply"
            level={hasSelection ? 'primary' : 'secondary'}
            size="m"
            primaryColor={hasSelection ? 'orange' : undefined}
            onClick={handleApply}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RangeDayPicker({
  state   = 'default',
  text    = 'Select Day',
  onApply,
  onClear,
}: RangeDayPickerProps) {
  if (state === 'open') return <RangeDayPickerPanel onApply={onApply} onClear={onClear} />

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
      <IconGlyph name="calendar" size={20} />
      <span>{text}</span>
    </button>
  )
}

/**
 * SingleDayPicker — Figma node 902:5345 (Earful 2026).
 *
 * Compact 240 px calendar panel: month nav, day grid, Clear + Apply.
 */

import { useState } from 'react'
import Button from '../Button/Button/Button'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'
import {
  MONTH_NAMES,
  WEEKDAYS,
  buildCalendarDays,
  normalizeDate,
} from './calendarHelpers'

export type SingleDayPickerProps = {
  /** Selected day (date-only, local time). */
  selectedDate?: Date | null
  onSelectDate?: (date: Date) => void
  onClear?:      () => void
  onApply?:      () => void
  className?:    string
}

export default function SingleDayPicker({
  selectedDate = null,
  onSelectDate,
  onClear,
  onApply,
  className = '',
}: SingleDayPickerProps) {
  const initialView = selectedDate ?? normalizeDate(new Date())

  const [viewYear,  setViewYear]  = useState(() => initialView.getFullYear())
  const [viewMonth, setViewMonth] = useState(() => initialView.getMonth())

  const days = buildCalendarDays(viewYear, viewMonth)
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

  function handleDayClick(d: Date) {
    onSelectDate?.(normalizeDate(d))
  }

  const isSelected = (d: Date) =>
    !!selectedDate && normalizeDate(d).toDateString() === selectedDate.toDateString()

  const isCurrentMonth = (d: Date) => d.getMonth() === viewMonth
  const hasSelection = selectedDate !== null

  return (
    <div
      className={[
        'inline-flex w-[240px] flex-col items-start rounded-lg',
        'border border-greyscale-300 bg-surface-white py-2 shadow-100',
        className,
      ].join(' ')}
    >
      <div className="flex w-full flex-col gap-2 px-2">
        {/* Month nav */}
        <div className="flex h-9 w-full items-center">
          <div className="flex size-10 shrink-0 items-center justify-center">
            <ButtonSquare
              type="icon"
              icon="chevron-left"
              size="s"
              onClick={prevMonth}
            />
          </div>
          <span className="flex-1 text-center font-body text-[15px] font-bold leading-6 tracking-[0.2px] text-brand-indigo">
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

        <hr className="w-full border-t border-greyscale-300" />

        {/* Day grid */}
        <div className="flex w-full flex-col">
          <div className="grid grid-cols-7">
            {WEEKDAYS.map(d => (
              <div
                key={d}
                className="flex h-10 items-center justify-center font-body text-[10px] font-bold leading-4 text-text-default"
              >
                {d}
              </div>
            ))}
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((d, di) => (
                <button
                  key={di}
                  type="button"
                  onClick={() => handleDayClick(d)}
                  className={[
                    'flex h-10 w-full items-center justify-center',
                    'font-body text-[10px] font-normal leading-4',
                    'cursor-pointer transition-colors',
                    isSelected(d)
                      ? 'rounded-lg bg-surface-primary text-text-default'
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
        <div className="flex h-9 w-full items-center justify-end gap-2">
          <Button
            label="Clear"
            level="tertiary"
            size="m"
            onClick={onClear}
          />
          <Button
            label="Apply"
            level={hasSelection ? 'primary' : 'secondary'}
            size="m"
            primaryColor={hasSelection ? 'orange' : undefined}
            onClick={onApply}
          />
        </div>
      </div>
    </div>
  )
}

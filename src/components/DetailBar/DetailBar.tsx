/**
 * DetailBar — Figma node 404:3896 (Earful 2026).
 *
 * Board row: add · label · language · topics · comments · launch date · close
 * Panels open 8 px below the bar (dropdown / day picker).
 */

import Button from '../Button/Button'
import ButtonSquare from '../ButtonSquare/ButtonSquare'
import SingleDayPicker from '../DayPicker/SingleDayPicker'
import NumberPicker from '../NumberPicker/NumberPicker'
import { normalizeDate } from '../DayPicker/calendarHelpers'

export type DetailBarVariant = 'board'

export type DetailBarPanel = 'language' | 'launchDate' | null

export const LANGUAGE_OPTIONS = ['English', '繁體中文', '简体中文'] as const
export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number]

export type DetailBarProps = {
  variant?:           DetailBarVariant
  openPanel?:         DetailBarPanel
  label?:             string
  language?:          LanguageOption
  topicsCount?:       number | null
  commentsCount?:     number | null
  launchDate?:        Date | null
  onPanelChange?:     (panel: DetailBarPanel) => void
  onLanguageChange?:  (language: LanguageOption) => void
  onTopicsChange?:    (value: number | null) => void
  onCommentsChange?:  (value: number | null) => void
  onLaunchDateChange?: (date: Date | null) => void
  onAdd?:             () => void
  onClose?:           () => void
  className?:         string
}

function formatLaunchDateLabel(date: Date | null): string {
  if (!date) return 'Launch Date'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function LanguageMenu({
  selected,
  onSelect,
}: {
  selected: LanguageOption
  onSelect: (language: LanguageOption) => void
}) {
  return (
    <div
      className={[
        'flex w-[191px] flex-col rounded-lg border border-greyscale-300',
        'bg-surface-white py-2 shadow-200',
      ].join(' ')}
      role="menu"
      aria-label="Language"
    >
      <div className="flex w-full flex-col px-2">
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            role="menuitemradio"
            aria-checked={option === selected}
            onClick={() => onSelect(option)}
            className={[
              'flex h-9 w-full items-center rounded px-2 text-left',
              'font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default',
              'hover:bg-surface-primary transition-colors focus:outline-none',
              option === selected && 'bg-surface-primary',
            ].join(' ')}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function DetailBar({
  variant           = 'board',
  openPanel         = null,
  label             = '',
  language          = 'English',
  topicsCount       = null,
  commentsCount     = null,
  launchDate        = null,
  onPanelChange,
  onLanguageChange,
  onTopicsChange,
  onCommentsChange,
  onLaunchDateChange,
  onAdd,
  onClose,
  className         = '',
}: DetailBarProps) {
  if (variant !== 'board') return null

  const togglePanel = (panel: NonNullable<DetailBarPanel>) => {
    onPanelChange?.(openPanel === panel ? null : panel)
  }

  const closePanel = () => onPanelChange?.(null)

  const launchDateLabel = formatLaunchDateLabel(launchDate)

  return (
    <div className={['flex w-full max-w-[1140px] flex-col gap-2', className].join(' ')}>
      <div className="flex h-9 w-full items-center justify-between gap-2">
        {/* Add */}
        <Button
          iconLeft="plus"
          label=""
          level="primary"
          size="m"
          primaryColor="orange"
          onClick={onAdd}
          className="!size-9 shrink-0 !justify-center !gap-0 !p-0 [&>span:empty]:hidden"
        />

        {/* Controls row */}
        <div className="flex min-w-0 flex-1 items-center justify-between">
          <Button
            label={label}
            level="secondary"
            size="m"
            className="min-w-[194px] shrink-0"
          />

          <Button
            label={language}
            level="secondary"
            size="m"
            iconLeft="languages"
            iconRight="chevron-down"
            onClick={() => togglePanel('language')}
          />

          <NumberPicker
            variant="topics"
            value={topicsCount}
            onChange={onTopicsChange}
          />

          <NumberPicker
            variant="comments"
            value={commentsCount}
            onChange={onCommentsChange}
          />

          <Button
            label={launchDateLabel}
            level="secondary"
            size="m"
            iconLeft="calendar"
            iconRight="chevron-down"
            onClick={() => togglePanel('launchDate')}
          />
        </div>

        {/* Close */}
        <ButtonSquare
          type="icon"
          icon="delete"
          size="m"
          onClick={onClose}
        />
      </div>

      {/* Open panels — 8 px gap from bar via flex-col gap-2 */}
      {openPanel === 'language' && (
        <div className="self-start">
          <LanguageMenu
            selected={language}
            onSelect={(next) => {
              onLanguageChange?.(next)
              closePanel()
            }}
          />
        </div>
      )}

      {openPanel === 'launchDate' && (
        <div className="self-start">
          <SingleDayPicker
            selectedDate={launchDate}
            onSelectDate={(date) => onLaunchDateChange?.(normalizeDate(date))}
            onClear={() => onLaunchDateChange?.(null)}
            onApply={closePanel}
          />
        </div>
      )}
    </div>
  )
}

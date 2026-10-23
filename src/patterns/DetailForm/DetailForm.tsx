/**
 * DetailForm — Figma node 1034:4693 (Earful 2026).
 *
 * Include Context panel · language · launch date range · topics · comments
 * Component frame 550 × 280 · px 64 · default (1034:4614) and filled (5576:5792)
 */

import Button from '../../components/Button/Button/Button'
import ButtonSquare from '../../components/Button/ButtonSquare/ButtonSquare'
import RangeDayPicker from '../../components/DayPicker/RangeDayPicker'
import { normalizeDate } from '../../components/DayPicker/calendarHelpers'
import NumberPicker from '../../components/NumberPicker/NumberPicker'
import {
  LANGUAGE_OPTIONS,
  type LanguageOption,
} from '../DetailBar/DetailBar'

export type DetailFormPanel = 'language' | 'launchDate' | null

export type DetailFormProps = {
  language?:            LanguageOption | null
  launchStart?:         Date | null
  launchEnd?:           Date | null
  topicsCount?:         number | null
  commentsCount?:       number | null
  openPanel?:           DetailFormPanel
  onPanelChange?:       (panel: DetailFormPanel) => void
  onLanguageChange?:    (language: LanguageOption) => void
  onLaunchDateChange?:  (start: Date | null, end: Date | null) => void
  onTopicsChange?:      (value: number | null) => void
  onCommentsChange?:    (value: number | null) => void
  onNewContext?:        () => void
  onClose?:             () => void
  className?:           string
}

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDayMonth(date: Date): string {
  return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]}`
}

/** Filled launch date reads "1 May - 6 May, 25". */
function formatLaunchRange(start: Date | null, end: Date | null): string {
  if (!start) return 'Launch Date'
  const endDate = end ?? start
  const year = String(endDate.getFullYear()).slice(-2)
  if (start.toDateString() === endDate.toDateString()) {
    return `${formatDayMonth(start)}, ${year}`
  }
  return `${formatDayMonth(start)} - ${formatDayMonth(endDate)}, ${year}`
}

function Divider() {
  return (
    <div className="relative h-0 w-full" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-px bg-line-default" />
    </div>
  )
}

function FieldLabel({ children }: { children: string }) {
  return (
    <p className="h-6 font-body font-bold text-[18px] leading-8 tracking-[0.1px] text-text-default">
      {children}
    </p>
  )
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

export default function DetailForm({
  language           = null,
  launchStart        = null,
  launchEnd          = null,
  topicsCount        = null,
  commentsCount      = null,
  openPanel          = null,
  onPanelChange,
  onLanguageChange,
  onLaunchDateChange,
  onTopicsChange,
  onCommentsChange,
  onNewContext,
  onClose,
  className          = '',
}: DetailFormProps) {
  const togglePanel = (panel: NonNullable<DetailFormPanel>) => {
    onPanelChange?.(openPanel === panel ? null : panel)
  }

  const closePanel = () => onPanelChange?.(null)

  const languageSelected = language != null
  const dateSelected = launchStart != null

  return (
    <div
      className={[
        'flex w-[550px] flex-col gap-1 rounded-lg bg-surface-white px-16 pb-2 pt-2',
        className,
      ].join(' ')}
    >
      {/* Header — Figma 1033:6383 */}
      <div className="flex h-12 w-full items-center justify-between px-1">
        <div className="flex min-w-0 flex-1 items-center px-4 py-2">
          <h2 className="font-body font-bold text-2xl leading-[1.25] tracking-[0.2px] text-brand-indigo">
            Include Context
          </h2>
        </div>
        <div className="flex size-16 shrink-0 items-center justify-center p-2">
          <ButtonSquare type="icon" icon="delete" size="m" onClick={onClose} aria-label="Close" />
        </div>
      </div>

      <Divider />

      {/* Language + Launch Date — Figma 1033:6404 */}
      <div className="flex h-20 w-full items-center px-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <FieldLabel>Select Language</FieldLabel>
          <Button
            label={language ?? 'Language'}
            level="secondary"
            size="l"
            iconLeft="languages"
            iconRight={languageSelected ? undefined : 'chevron-down'}
            onClick={() => togglePanel('language')}
            className="w-[191px] !gap-4"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <FieldLabel>Select Launch Date</FieldLabel>
          <Button
            label={formatLaunchRange(launchStart, launchEnd)}
            level="secondary"
            size="l"
            iconLeft="calendar"
            iconRight={dateSelected ? undefined : 'chevron-down'}
            onClick={() => togglePanel('launchDate')}
            className={dateSelected ? 'w-full' : 'w-[191px]'}
          />
        </div>
      </div>

      {/* Topics + comments per topic — Figma 1033:6397 */}
      <div className="flex h-20 w-full items-center gap-4 px-4">
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
      </div>

      <Divider />

      {/* New Context — Figma 1034:4602 */}
      <div className="flex w-full items-center px-4">
        <Button
          label="New Context"
          level="tertiary"
          size="m"
          iconLeft="plus"
          onClick={onNewContext}
        />
      </div>

      {openPanel === 'language' && (
        <div className="px-4">
          <LanguageMenu
            selected={language ?? 'English'}
            onSelect={(next) => {
              onLanguageChange?.(next)
              closePanel()
            }}
          />
        </div>
      )}

      {openPanel === 'launchDate' && (
        <div className="px-4">
          <RangeDayPicker
            state="open"
            onApply={({ start, end }) => {
              onLaunchDateChange?.(normalizeDate(start), normalizeDate(end))
              closePanel()
            }}
            onClear={() => onLaunchDateChange?.(null, null)}
          />
        </div>
      )}
    </div>
  )
}

export { LANGUAGE_OPTIONS }

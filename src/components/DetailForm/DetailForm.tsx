/**
 * DetailForm — Figma node 1034:4693 (Earful 2026).
 *
 * Include Context panel · board · language · launch date · topics · comments
 */

import Button from '../Button/Button'
import ButtonSquare from '../ButtonSquare/ButtonSquare'
import DropdownDatePicker from '../DayPicker/DropdownDatePicker'
import { normalizeDate } from '../DayPicker/calendarHelpers'
import NumberPicker from '../NumberPicker/NumberPicker'
import {
  LANGUAGE_OPTIONS,
  type LanguageOption,
} from '../DetailBar/DetailBar'

export type DetailFormPanel = 'language' | 'launchDate' | null

export type DetailFormProps = {
  boardName?:           string
  language?:            LanguageOption | null
  launchDateLabel?:     string
  launchDate?:          Date | null
  topicsCount?:         number | null
  commentsCount?:       number | null
  openPanel?:           DetailFormPanel
  onPanelChange?:       (panel: DetailFormPanel) => void
  onBoardNameChange?:   (value: string) => void
  onLanguageChange?:    (language: LanguageOption) => void
  onLaunchDateChange?:  (date: Date | null) => void
  onTopicsChange?:      (value: number | null) => void
  onCommentsChange?:    (value: number | null) => void
  onNewContext?:        () => void
  onClose?:             () => void
  className?:           string
}

const INPUT_FIELD =
  'w-full bg-surface-white border border-greyscale-300 rounded-lg px-4 py-2 shadow-100 ' +
  'font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default ' +
  'focus:outline-none focus:border-greyscale-500 transition-colors h-12'

function Divider() {
  return <div className="h-px w-full bg-line-default" aria-hidden />
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
  boardName          = '',
  language           = null,
  launchDateLabel,
  launchDate         = null,
  topicsCount        = null,
  commentsCount      = null,
  openPanel          = null,
  onPanelChange,
  onBoardNameChange,
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

  const languageLabel = language ?? 'Language'
  const dateLabel = launchDateLabel ?? (launchDate
    ? launchDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    : 'Launch Date')

  return (
    <div
      className={[
        'flex w-full max-w-[494px] flex-col gap-1 rounded-lg bg-surface-white pb-2 pt-2',
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
          <ButtonSquare type="icon" icon="delete" size="m" onClick={onClose} />
        </div>
      </div>

      <Divider />

      {/* Add Board — Figma 1033:6389 */}
      <div className="flex h-20 w-full items-center px-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <FieldLabel>Add Board</FieldLabel>
          <input
            type="text"
            value={boardName}
            onChange={(event) => onBoardNameChange?.(event.target.value)}
            className={INPUT_FIELD}
            aria-label="Add Board"
          />
        </div>
      </div>

      {/* Language + Launch Date — Figma 1033:6404 */}
      <div className="flex h-20 w-full items-center gap-4 px-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <FieldLabel>Select Language</FieldLabel>
          <Button
            label={languageLabel}
            level="secondary"
            size="m"
            iconLeft="languages"
            iconRight={language ? undefined : 'chevron-down'}
            onClick={() => togglePanel('language')}
            className={language ? 'w-fit' : 'w-[191px]'}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <FieldLabel>Select Launch Date</FieldLabel>
          <Button
            label={dateLabel}
            level="secondary"
            size="m"
            iconLeft="calendar"
            iconRight={launchDate || launchDateLabel ? undefined : 'chevron-down'}
            onClick={() => togglePanel('launchDate')}
            className={launchDate || launchDateLabel ? 'w-fit' : 'w-[191px]'}
          />
        </div>
      </div>

      {/* Topics + Comments — Figma 1033:6397 */}
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
          <DropdownDatePicker
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

export { LANGUAGE_OPTIONS }

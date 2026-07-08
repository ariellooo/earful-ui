/**
 * TopBar — Figma node 651:4138 (Earful 2026).
 *
 * variant="default" — Filter · Date · Search | Customise · Download
 * variant="action"  — Strategy · Status · Launched Date · Search | New Task
 *
 * Trailing actions are right-aligned with pr-6 (24 px) from the bar edge.
 *
 * Open panels render in an absolute layer (top-full · z-20) so dropdowns overlay
 * chart content. Header panels use z-30 and sit above TopBar in dashboard shells.
 */

import Button from '../../components/Button/Button/Button'
import ButtonSquare from '../../components/Button/ButtonSquare/ButtonSquare'
import ButtonStar from '../../components/Button/ButtonStar/ButtonStar'
import Dropdown, {
  CUSTOMISE_ITEMS,
  STRATEGY_ITEMS,
  type DropdownCustomiseItem,
  type DropdownStatusItem,
  type DropdownStrategyItem,
} from '../../components/Dropdown/Dropdown'
import RangeDayPicker from '../../components/DayPicker/RangeDayPicker'
import SearchBar from '../../components/SearchBar/SearchBar'
import { normalizeDate } from '../../components/DayPicker/calendarHelpers'

export type TopBarVariant = 'default' | 'action'

export type TopBarPanel =
  | 'filter'
  | 'date'
  | 'strategy'
  | 'status'
  | 'launchedDate'
  | 'search'
  | 'customise'
  | null

const DEFAULT_STRATEGY_ITEMS: DropdownStrategyItem[] = STRATEGY_ITEMS.map(item => ({
  ...item,
  checked: false,
}))

const DEFAULT_STATUS_ITEMS: DropdownStatusItem[] = [
  { label: 'Draft',     checked: false },
  { label: 'Inactive',  checked: false },
  { label: 'Launched',  checked: false },
  { label: 'Completed', checked: false },
]

const DEFAULT_CUSTOMISE_ITEMS: DropdownCustomiseItem[] = CUSTOMISE_ITEMS.map(item => ({
  ...item,
  checked: true,
}))

function formatStrategyLabel(items: DropdownStrategyItem[]): string {
  const checked = items.filter(item => item.checked)
  const total   = items.length
  if (checked.length === 0) return 'Strategy: All'
  if (checked.length === total) return 'Strategy: all selected'
  if (checked.length === 1) return `Strategy: ${checked[0].label}`
  return `Strategy: ${checked.length} selected`
}

function formatStatusLabel(items: DropdownStatusItem[]): string {
  const checked = items.filter(item => item.checked)
  const total   = items.length
  if (checked.length === 0) return 'Status: All'
  if (checked.length === total) return 'Status: all selected'
  if (checked.length === 1) return `Status: ${checked[0].label}`
  return `Status: ${checked.length} selected`
}

function formatDateLabel(date: Date | null, fallback: string): string {
  if (!date) return fallback
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDateRangeLabel(
  start: Date | null,
  end:   Date | null,
  fallback: string,
): string {
  if (!start) return fallback
  if (!end || start.toDateString() === end.toDateString()) {
    return formatDateLabel(start, fallback)
  }
  return `${formatDateLabel(start, fallback)} – ${formatDateLabel(end, fallback)}`
}

export type TopBarProps = {
  variant?:           TopBarVariant
  openPanel?:         TopBarPanel
  strategyItems?:     DropdownStrategyItem[]
  selectedDate?:      Date | null
  selectedDateEnd?:   Date | null
  launchedDate?:         Date | null
  launchedDateEnd?:      Date | null
  statusItems?:          DropdownStatusItem[]
  customiseItems?:       DropdownCustomiseItem[]
  /** Show a starred-filter toggle at the start of the action-variant left controls. */
  showStarFilter?:         boolean
  /** Whether the starred filter is currently active (filled star). */
  starFilterActive?:       boolean
  onPanelChange?:            (panel: TopBarPanel) => void
  onStrategyItemsChange?:    (items: DropdownStrategyItem[]) => void
  onDateRangeChange?:        (start: Date | null, end: Date | null) => void
  onLaunchedDateRangeChange?: (start: Date | null, end: Date | null) => void
  onStatusItemsChange?:      (items: DropdownStatusItem[]) => void
  onCustomiseItemsChange?:   (items: DropdownCustomiseItem[]) => void
  onStarFilterChange?:       (active: boolean) => void
  className?:         string
}

export default function TopBar({
  variant            = 'default',
  openPanel          = null,
  strategyItems      = DEFAULT_STRATEGY_ITEMS,
  selectedDate       = null,
  selectedDateEnd    = null,
  launchedDate       = null,
  launchedDateEnd    = null,
  statusItems        = DEFAULT_STATUS_ITEMS,
  customiseItems     = DEFAULT_CUSTOMISE_ITEMS,
  showStarFilter     = false,
  starFilterActive   = false,
  onPanelChange,
  onStrategyItemsChange,
  onDateRangeChange,
  onLaunchedDateRangeChange,
  onStatusItemsChange,
  onCustomiseItemsChange,
  onStarFilterChange,
  className          = '',
}: TopBarProps) {
  const togglePanel = (panel: NonNullable<TopBarPanel>) => {
    onPanelChange?.(openPanel === panel ? null : panel)
  }

  const closePanel = () => onPanelChange?.(null)

  const strategyLabel = formatStrategyLabel(strategyItems)
  const statusLabel   = formatStatusLabel(statusItems)
  const dateLabel     = formatDateRangeLabel(selectedDate, selectedDateEnd, 'Date')
  const launchedLabel = formatDateRangeLabel(launchedDate, launchedDateEnd, 'Launched Date')

  return (
    <div className={['relative w-full', className].join(' ')}>
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2">
          {variant === 'default' ? (
            <>
              <Button
                label="Filter"
                level="secondary"
                size="l"
                iconLeft="list-filter"
                iconRight="chevron-down"
                onClick={() => togglePanel('filter')}
              />
              <Button
                label={dateLabel}
                level="secondary"
                size="l"
                iconLeft="calendar"
                iconRight="chevron-down"
                onClick={() => togglePanel('date')}
              />
              <ButtonSquare
                type="icon"
                icon="search"
                size="l"
                onClick={() => togglePanel('search')}
              />
            </>
          ) : (
            <>
              {showStarFilter && (
                <ButtonStar
                  state={starFilterActive ? 'starred' : 'default'}
                  className="border border-line-default shadow-100 bg-surface-white"
                  onClick={() => onStarFilterChange?.(!starFilterActive)}
                />
              )}
              <Button
                label={strategyLabel}
                level="secondary"
                size="l"
                iconRight="chevron-down"
                onClick={() => togglePanel('strategy')}
              />
              <Button
                label={statusLabel}
                level="secondary"
                size="l"
                iconRight="chevron-down"
                onClick={() => togglePanel('status')}
              />
              <Button
                label={launchedLabel}
                level="secondary"
                size="l"
                iconLeft="calendar"
                iconRight="chevron-down"
                onClick={() => togglePanel('launchedDate')}
              />
              <ButtonSquare
                type="icon"
                icon="search"
                size="l"
                onClick={() => togglePanel('search')}
              />
            </>
          )}
        </div>

        {/* Right — Customise · Download (default) or New Task (action) */}
        <div className="flex shrink-0 items-center gap-2 pr-6">
          {variant === 'default' ? (
            <>
              <Button
                label="Customise"
                level="secondary"
                size="l"
                iconLeft="wand-sparkles"
                onClick={() => togglePanel('customise')}
              />
              <Button
                label="Download"
                level="secondary"
                size="l"
                iconLeft="download"
              />
            </>
          ) : (
            <Button
              label="New Task"
              level="primary"
              size="l"
              iconLeft="plus"
              primaryColor="orange"
            />
          )}
        </div>
      </div>

      {/* Open panels — absolute overlay, 8 px below bar (Figma gap-2) */}
      {openPanel === 'search' && (
        <div className="absolute top-full left-0 z-20 mt-2">
          <SearchBar />
        </div>
      )}

      {openPanel === 'filter' && (
        <div className="absolute top-full left-0 z-20 mt-2">
          <Dropdown
            variant="status"
            title="Filter"
            statusItems={statusItems}
            onClose={closePanel}
            onStatusChange={(item, checked) => {
              onStatusItemsChange?.(
                statusItems.map(row =>
                  row.label === item.label ? { ...row, checked } : row,
                ),
              )
            }}
          />
        </div>
      )}

      {openPanel === 'date' && (
        <div className="absolute top-full left-0 z-20 mt-2">
          <RangeDayPicker
            state="open"
            onApply={({ start, end }) => {
              onDateRangeChange?.(normalizeDate(start), normalizeDate(end))
              closePanel()
            }}
            onClear={() => onDateRangeChange?.(null, null)}
          />
        </div>
      )}

      {openPanel === 'strategy' && (
        <div className="absolute top-full left-0 z-20 mt-2">
          <Dropdown
            variant="strategy"
            strategyLayout="compact"
            strategyItems={strategyItems}
            onStrategyChange={(item, checked) => {
              onStrategyItemsChange?.(
                strategyItems.map(row =>
                  row.label === item.label ? { ...row, checked } : row,
                ),
              )
            }}
          />
        </div>
      )}

      {openPanel === 'status' && (
        <div className="absolute top-full left-0 z-20 mt-2">
          <Dropdown
            variant="status"
            title="Status"
            statusLayout="compact"
            statusItems={statusItems}
            onStatusChange={(item, checked) => {
              onStatusItemsChange?.(
                statusItems.map(row =>
                  row.label === item.label ? { ...row, checked } : row,
                ),
              )
            }}
          />
        </div>
      )}

      {openPanel === 'launchedDate' && (
        <div className="absolute top-full left-0 z-20 mt-2">
          <RangeDayPicker
            state="open"
            onApply={({ start, end }) => {
              onLaunchedDateRangeChange?.(normalizeDate(start), normalizeDate(end))
              closePanel()
            }}
            onClear={() => onLaunchedDateRangeChange?.(null, null)}
          />
        </div>
      )}

      {openPanel === 'customise' && (
        <div className="absolute top-full right-6 z-20 mt-2">
          <Dropdown
            variant="customise"
            title="Customise"
            customiseItems={customiseItems}
            onClose={closePanel}
            onCustomiseChange={(item, checked) => {
              onCustomiseItemsChange?.(
                customiseItems.map(row =>
                  row.label === item.label ? { ...row, checked } : row,
                ),
              )
            }}
          />
        </div>
      )}
    </div>
  )
}

export { DEFAULT_STATUS_ITEMS, DEFAULT_STRATEGY_ITEMS, DEFAULT_CUSTOMISE_ITEMS }

/**
 * ContentSeedingOverview — Figma node 632:16760 (Earful 2026).
 *
 * Full-page C.R.O.W.S shell:
 *   Sidebar (expanded, C.R.O.W.S selected) · Header · TopBar (action + star filter) ·
 *   TableContentSeeding · Pagination
 */

import { useState } from 'react'
import Sidebar from '../../patterns/Sidebar/Sidebar'
import Header, { type HeaderPanel } from '../../patterns/Header/Header'
import TopBar, {
  DEFAULT_STATUS_ITEMS,
  DEFAULT_STRATEGY_ITEMS,
  type TopBarPanel,
} from '../../patterns/TopBar/TopBar'
import type {
  DropdownStatusItem,
  DropdownStrategyItem,
} from '../../components/Dropdown/Dropdown'
import TableContentSeeding, {
  type ContentSeedingRow,
} from '../../components/Table/TableContentSeeding'
import Pagination from '../../components/Pagination/Pagination'
import { normalizeDate } from '../../components/DayPicker/calendarHelpers'

// ─── Default dataset — 36 total entries, 10 visible (page 1) ─────────────────
// Approximated from Figma node 632:16760

export const DEFAULT_CONTENT_SEEDING_ROWS: ContentSeedingRow[] = [
  { id: '1',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Dilution',          credit: 0,   status: 'Completed', launchedDate: null,         starred: true  },
  { id: '2',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Distraction',        credit: -4,  status: 'Launched',  launchedDate: '2025-03-18', starred: false },
  { id: '3',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Market Intelligence', credit: 0,   status: 'Draft',     launchedDate: null,         starred: false },
  { id: '4',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Neutralization',      credit: 0,   status: 'Completed', launchedDate: null,         starred: false },
  { id: '5',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Neutralization',      credit: -8,  status: 'Launched',  launchedDate: '2025-02-16', starred: false },
  { id: '6',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Exposure',            credit: 0,   status: 'Completed', launchedDate: null,         starred: false },
  { id: '7',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Distraction',         credit: 0,   status: 'Inactive',  launchedDate: '2024-08-10', starred: false },
  { id: '8',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Dilution',            credit: -14, status: 'Launched',  launchedDate: '2024-07-15', starred: true  },
  { id: '9',  campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Distraction',         credit: -6,  status: 'Launched',  launchedDate: '2024-07-10', starred: true  },
  { id: '10', campaignId: 100, campaignName: 'Lorem ipsum dolor sit amet', client: 'Lorem ipsum dolor sit amet', strategy: 'Market Intelligence', credit: -10, status: 'Launched',  launchedDate: '2024-05-01', starred: false },
]

// ─── Filter helpers ───────────────────────────────────────────────────────────

type CheckboxFilterItem = { label: string; checked?: boolean }

/** Mirrors TopBar label logic: none or all checked → no filter; partial → match labels. */
function matchesCheckboxFilter(
  value: string,
  items: CheckboxFilterItem[],
): boolean {
  const checked = items.filter(item => item.checked)
  if (checked.length === 0 || checked.length === items.length) return true
  return checked.some(item => item.label === value)
}

function filterVisibleRows(
  rows: ContentSeedingRow[],
  {
    starFilter,
    strategyItems,
    statusItems,
  }: {
    starFilter:      boolean
    strategyItems:   DropdownStrategyItem[]
    statusItems:     DropdownStatusItem[]
  },
): ContentSeedingRow[] {
  return rows.filter(row =>
    (!starFilter || row.starred) &&
    matchesCheckboxFilter(row.strategy, strategyItems) &&
    matchesCheckboxFilter(row.status, statusItems),
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export type ContentSeedingOverviewProps = {
  showCredit?:       boolean
  showLaunchedDate?: boolean
  starFilterActive?: boolean
}

export default function ContentSeedingOverview({
  showCredit       = true,
  showLaunchedDate = true,
  starFilterActive: initialStarFilter = false,
}: ContentSeedingOverviewProps) {
  const [sidebarState,    setSidebarState]    = useState<'expanded' | 'collapsed'>('expanded')
  const [headerPanel,     setHeaderPanel]     = useState<HeaderPanel>(null)
  const [topBarPanel,     setTopBarPanel]     = useState<TopBarPanel>(null)
  const [strategyItems,   setStrategyItems]   = useState<DropdownStrategyItem[]>(DEFAULT_STRATEGY_ITEMS)
  const [statusItems,     setStatusItems]     = useState<DropdownStatusItem[]>(DEFAULT_STATUS_ITEMS)
  const [launchedDate,    setLaunchedDate]    = useState<Date | null>(null)
  const [launchedDateEnd, setLaunchedDateEnd] = useState<Date | null>(null)
  const [starFilter,      setStarFilter]      = useState(initialStarFilter)
  const [rows,            setRows]            = useState(DEFAULT_CONTENT_SEEDING_ROWS)

  const visibleRows = filterVisibleRows(rows, {
    starFilter,
    strategyItems,
    statusItems,
  })

  function handleStar(id: string) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, starred: !r.starred } : r))
  }

  return (
    <div className="flex h-screen bg-surface-primary overflow-hidden">

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <div className="flex-none shadow-200 z-10">
        <Sidebar
          state={sidebarState}
          defaultSelectedIndex={6}
          onToggle={() => setSidebarState(s => s === 'expanded' ? 'collapsed' : 'expanded')}
        />
      </div>

      {/* ── Main panel ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

        {/* Header — z-30; dropdowns overlay everything below */}
        <div className="relative z-30 shrink-0 overflow-visible bg-surface-white pl-6 pb-4 pt-6 shadow-200">
          <Header
            title="Content Seeding"
            openPanel={headerPanel}
            onPanelChange={setHeaderPanel}
          />
        </div>

        {/* TopBar — z-20; action variant + starred filter */}
        <div className="relative z-20 shrink-0 pl-6 pt-4">
          <TopBar
            variant="action"
            openPanel={topBarPanel}
            strategyItems={strategyItems}
            statusItems={statusItems}
            launchedDate={launchedDate}
            launchedDateEnd={launchedDateEnd}
            showStarFilter
            starFilterActive={starFilter}
            onPanelChange={setTopBarPanel}
            onStrategyItemsChange={setStrategyItems}
            onStatusItemsChange={setStatusItems}
            onLaunchedDateRangeChange={(s, e) => {
              setLaunchedDate(s ? normalizeDate(s) : null)
              setLaunchedDateEnd(e ? normalizeDate(e) : null)
            }}
            onStarFilterChange={setStarFilter}
          />
        </div>

        {/* Scrollable table area */}
        <div className="relative z-0 flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden px-6 pt-4">
          <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
            <TableContentSeeding
              rows={visibleRows}
              showCredit={showCredit}
              showLaunchedDate={showLaunchedDate}
              onStar={handleStar}
              className="rounded-lg shadow-100"
            />
          </div>

          {/* Pagination — aligned with table width */}
          <div className="shrink-0 py-4">
            <Pagination
              version="default"
              totalItems={visibleRows.length}
              defaultItemsPerPage={10}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

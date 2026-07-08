/**
 * DashboardOverview — Figma node 626:6146 (Earful 2026).
 *
 * Full-page dashboard shell:
 *   Sidebar (expanded) · Header · TopBar (default) · 2-column chart grid
 *
 * Left column  (flex-[2]):  BarChart (Sentiment Analysis) · LineChart (Buzz Trend) · BarChart (Overall Analysis)
 * Right column (flex-[1]):  PieChart (Share of Voice)
 */

import { useEffect, useState } from 'react'
import Sidebar from '../../patterns/Sidebar/Sidebar'
import Header, { type HeaderPanel } from '../../patterns/Header/Header'
import TopBar, {
  DEFAULT_STATUS_ITEMS,
  DEFAULT_STRATEGY_ITEMS,
  type TopBarPanel,
} from '../../patterns/TopBar/TopBar'
import type { DropdownCustomiseItem } from '../../components/Dropdown/Dropdown'
import BarChart from '../../components/Chart/BarChart'
import LineChart from '../../components/Chart/LineChart'
import PieChart from '../../components/Chart/PieChart'
import type { BarChartDatum } from '../../components/Chart/types'

// ─── Overall Analysis data — approximated from Figma node 706:3275 ────────────
// 6 topic-based bars (vs. the 7 date-based bars in Sentiment Analysis)

const OVERALL_ANALYSIS_DATA: BarChartDatum[] = [
  { label: 'Finance',  positive: 15,  negative: 7,  neutral: 99,  mixed: 34, undetermined: 16 },
  { label: 'National', positive: 50,  negative: 29, neutral: 35,  mixed: 12, undetermined: 16 },
  { label: 'NSL',      positive: 13,  negative: 9,  neutral: 194, mixed: 38, undetermined: 9  },
  { label: 'Talent',   positive: 53,  negative: 7,  neutral: 194, mixed: 12, undetermined: 16 },
  { label: 'Phishing', positive: 10,  negative: 16, neutral: 109, mixed: 12, undetermined: 16 },
  { label: 'Wiki-D',   positive: 66,  negative: 7,  neutral: 109, mixed: 37, undetermined: 9  },
]

// ─── Customise helpers ────────────────────────────────────────────────────────

function buildCustomiseItems({
  sentiment,
  buzzTrend,
  overallAnalysis,
  shareOfVoice,
}: {
  sentiment?:       boolean
  buzzTrend?:       boolean
  overallAnalysis?: boolean
  shareOfVoice?:    boolean
}): DropdownCustomiseItem[] {
  return [
    { label: 'Sentiment',        checked: sentiment ?? true },
    { label: 'Buzz Trend',       checked: buzzTrend ?? true },
    { label: 'Overall Analysis', checked: overallAnalysis ?? true },
    { label: 'Share Of Voice',   checked: shareOfVoice ?? true },
  ]
}

function isCustomiseVisible(
  items: DropdownCustomiseItem[],
  label: string,
): boolean {
  return items.find(item => item.label === label)?.checked ?? true
}

// ─── Component ────────────────────────────────────────────────────────────────

export type DashboardOverviewProps = {
  sentiment?:        boolean
  buzzTrend?:        boolean
  overallAnalysis?:  boolean
  shareOfVoice?:     boolean
  onCustomiseChange?: (values: {
    sentiment:       boolean
    buzzTrend:       boolean
    overallAnalysis: boolean
    shareOfVoice:    boolean
  }) => void
}

export default function DashboardOverview({
  sentiment        = true,
  buzzTrend        = true,
  overallAnalysis  = true,
  shareOfVoice     = true,
  onCustomiseChange,
}: DashboardOverviewProps) {
  const [sidebarState,  setSidebarState]  = useState<'expanded' | 'collapsed'>('expanded')
  const [headerPanel,   setHeaderPanel]   = useState<HeaderPanel>(null)
  const [topBarPanel,   setTopBarPanel]   = useState<TopBarPanel>(null)
  const [strategyItems, setStrategyItems] = useState(DEFAULT_STRATEGY_ITEMS)
  const [statusItems,     setStatusItems]     = useState(DEFAULT_STATUS_ITEMS)
  const [customiseItems,  setCustomiseItems]  = useState(() =>
    buildCustomiseItems({ sentiment, buzzTrend, overallAnalysis, shareOfVoice }),
  )
  const [dateStart,       setDateStart]       = useState<Date | null>(null)
  const [dateEnd,         setDateEnd]         = useState<Date | null>(null)

  useEffect(() => {
    setCustomiseItems(
      buildCustomiseItems({ sentiment, buzzTrend, overallAnalysis, shareOfVoice }),
    )
  }, [sentiment, buzzTrend, overallAnalysis, shareOfVoice])

  const showSentiment       = isCustomiseVisible(customiseItems, 'Sentiment')
  const showBuzzTrend       = isCustomiseVisible(customiseItems, 'Buzz Trend')
  const showOverallAnalysis = isCustomiseVisible(customiseItems, 'Overall Analysis')
  const showShareOfVoice    = isCustomiseVisible(customiseItems, 'Share Of Voice')

  const hasLeftCharts  = showSentiment || showBuzzTrend || showOverallAnalysis
  const hasRightCharts = showShareOfVoice

  return (
    <div className="flex h-screen bg-surface-primary overflow-hidden">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <div className="flex-none shadow-200 z-10">
        <Sidebar
          state={sidebarState}
          onToggle={() => setSidebarState(s => s === 'expanded' ? 'collapsed' : 'expanded')}
        />
      </div>

      {/* ── Main panel ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

        {/* Header — top layer (z-30); dropdowns overlay TopBar and charts */}
        <div className="relative z-30 shrink-0 overflow-visible bg-surface-white pl-6 pb-4 pt-6 shadow-200">
          <Header
            title="Dashboard"
            openPanel={headerPanel}
            onPanelChange={setHeaderPanel}
          />
        </div>

        {/* TopBar — z-20; panels overlay charts only */}
        <div className="relative z-20 shrink-0 pl-6 pt-4">
          <TopBar
            variant="default"
            openPanel={topBarPanel}
            strategyItems={strategyItems}
            statusItems={statusItems}
            customiseItems={customiseItems}
            selectedDate={dateStart}
            selectedDateEnd={dateEnd}
            onPanelChange={setTopBarPanel}
            onStrategyItemsChange={setStrategyItems}
            onStatusItemsChange={setStatusItems}
            onCustomiseItemsChange={(items) => {
              setCustomiseItems(items)
              onCustomiseChange?.({
                sentiment:       isCustomiseVisible(items, 'Sentiment'),
                buzzTrend:       isCustomiseVisible(items, 'Buzz Trend'),
                overallAnalysis: isCustomiseVisible(items, 'Overall Analysis'),
                shareOfVoice:    isCustomiseVisible(items, 'Share Of Voice'),
              })
            }}
            onDateRangeChange={(s, e) => { setDateStart(s); setDateEnd(e) }}
          />
        </div>

        {/* Scrollable charts */}
        <div className="relative z-0 flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden px-6 py-4">
          {(hasLeftCharts || hasRightCharts) && (
          <div className="flex items-start gap-8">
            {hasLeftCharts && (
            <div className={[
              'flex flex-col gap-4 min-w-0',
              hasRightCharts ? 'flex-[2]' : 'flex-1',
            ].join(' ')}>
              {showSentiment && (
              <BarChart
                title="Sentiment Analysis by Topic"
                subtitle="Calculated by number of messages"
                className="rounded-lg shadow-100"
              />
              )}
              {showBuzzTrend && (
              <LineChart
                title="Buzz Trend"
                subtitle="Calculated by number of messages"
                className="rounded-lg shadow-100"
              />
              )}
              {showOverallAnalysis && (
              <BarChart
                title="Overall Analysis by Topic"
                subtitle="Calculated by number of messages"
                data={OVERALL_ANALYSIS_DATA}
                className="rounded-lg shadow-100"
              />
              )}
            </div>
            )}

            {hasRightCharts && (
            <div className={[
              'flex flex-col gap-4 min-w-0',
              hasLeftCharts ? 'flex-[1]' : 'flex-1',
            ].join(' ')}>
              <PieChart
                title="Relative Share of Voice"
                subtitle="Calculated by number of messages and comments"
                className="rounded-lg shadow-100"
              />
            </div>
            )}

          </div>
          )}
        </div>
      </div>
    </div>
  )
}

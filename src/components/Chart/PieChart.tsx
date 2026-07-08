/**
 * PieChart — Figma node 315:1638 (Earful 2026).
 *
 * Share-of-voice pie (Recharts) · summary stats · legend · download action
 */

import { useState } from 'react'
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  type PieLabelRenderProps,
  type PieSectorDataItem,
} from 'recharts'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'
import {
  DEFAULT_PIE_CHART_SLICES,
  DEFAULT_PIE_TOTAL_CONVERSATIONS,
  PIE_END_ANGLE,
  PIE_START_ANGLE,
  type PieChartSlice,
} from './types'

export type PieChartProps = {
  title?:              string
  subtitle?:           string
  totalConversations?: number
  slices?:             PieChartSlice[]
  onDownload?:         () => void
  className?:          string
}

const PIE_TOOLTIP_ORDER: PieChartSlice['key'][] = [
  'financePolicy',
  'nationalGames',
  'nsl',
  'talent',
]

function PieTooltip({
  active,
  payload,
}: {
  active?:  boolean
  payload?: Array<{ payload: PieChartSlice }>
}) {
  if (!active || !payload?.length) return null

  const slice = payload[0].payload as PieChartSlice

  return (
    <div className="rounded-lg border border-line-default bg-surface-white px-3 py-2 shadow-200">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className={['size-2.5 shrink-0 rounded-full', slice.dotClass].join(' ')}
        />
        <span className="font-body font-bold text-xs leading-6 text-text-default">
          {slice.label}: {slice.value}%
        </span>
      </div>
    </div>
  )
}

function findExtremeSlices(slices: PieChartSlice[]) {
  let most = slices[0]
  let least = slices[0]

  for (const slice of slices) {
    if (slice.value > most.value) most = slice
    if (slice.value < least.value) least = slice
  }

  return { most, least }
}

function SummaryStat({
  label,
  slice,
  className = 'w-24',
}: {
  label: string
  slice: PieChartSlice
  className?: string
}) {
  return (
    <div className={['flex flex-col gap-1', className].join(' ')}>
      <p className="font-body font-normal text-[10px] leading-4 text-text-default">
        {label}
      </p>
      <div className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden
          className={['size-2.5 shrink-0 rounded-full', slice.dotClass].join(' ')}
        />
        <span className="min-w-0 font-body font-bold text-xs leading-6 text-text-default @[15rem]/summary:truncate">
          {slice.label}
        </span>
      </div>
    </div>
  )
}

function ChartLegend({ slices }: { slices: PieChartSlice[] }) {
  const ordered = PIE_TOOLTIP_ORDER
    .map((key) => slices.find((slice) => slice.key === key))
    .filter((slice): slice is PieChartSlice => slice != null)

  return (
    <div className="flex w-full flex-col items-start">
      {ordered.map((slice) => (
        <div key={slice.key} className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden
            className={['size-2.5 shrink-0 rounded-full', slice.dotClass].join(' ')}
          />
          <span className="min-w-0 truncate font-body font-bold text-xs leading-6 text-text-default">
            {slice.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function PieChart({
  title              = 'Relative Share of Voice',
  subtitle           = 'Calculated by number of messages and comments',
  totalConversations = DEFAULT_PIE_TOTAL_CONVERSATIONS,
  slices             = DEFAULT_PIE_CHART_SLICES,
  onDownload,
  className          = '',
}: PieChartProps) {
  const { most, least } = findExtremeSlices(slices)
  const [activeIndex, setActiveIndex] = useState<number | undefined>()

  const hoverLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    value = 0,
    index = 0,
  }: PieLabelRenderProps) => {
    if (index !== activeIndex) return null

    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="var(--color-text-invert)"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fontWeight={700}
        fontFamily="Inter, system-ui, sans-serif"
        pointerEvents="none"
      >
        {`${value}%`}
      </text>
    )
  }

  return (
    <div
      className={[
        'flex w-full min-w-0 flex-col gap-6 overflow-x-hidden bg-surface-white px-6 py-4',
        className,
      ].join(' ')}
    >
      {/* Header — Figma 278:1728 */}
      <div className="flex w-full min-w-0 items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="font-body font-bold text-[18px] leading-8 tracking-[0.1px] text-text-default">
            {title}
          </h2>
          <p className="font-body font-normal text-[10px] leading-4 text-text-default">
            {subtitle}
          </p>
        </div>
        <div className="shrink-0">
          <ButtonSquare
            type="icon"
            icon="download"
            size="m"
            onClick={onDownload}
          />
        </div>
      </div>

      {/* Chart body — Figma 278:1742 */}
      <div className="flex w-full min-w-0 flex-col items-start">
        <div className="flex w-full min-w-0 flex-col gap-4">
          {/* Summary — Figma 279:1862 · 626:6156
              Wide:  Total on row 1 · Most | Least on row 2
              Narrow: Total · Most · Least stacked */}
          <div className="@container/summary flex w-full min-w-0 flex-col gap-2 rounded-lg bg-surface-primary px-4 py-2">
            <div className="flex w-full flex-col gap-1">
              <p className="font-body font-normal text-[10px] leading-4 text-text-default">
                Total Conversation
              </p>
              <p className="font-body font-bold text-2xl leading-[1.25] tracking-[0.2px] text-text-default">
                {totalConversations}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 @[15rem]/summary:flex-row @[15rem]/summary:gap-3">
              <SummaryStat label="Most Talked" slice={most} className="w-full @[15rem]/summary:w-24" />
              <SummaryStat
                label="Least Talked"
                slice={least}
                className="w-full @[15rem]/summary:w-[120px]"
              />
            </div>
          </div>

          {/* Pie — Figma 278:1744 · 279:1779 · 24px inset via card px-6 */}
          <div className="flex w-full min-w-0 justify-center overflow-visible">
            <div className="aspect-square w-full min-h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={slices}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius="95%"
                    innerRadius={0}
                    startAngle={PIE_START_ANGLE}
                    endAngle={PIE_END_ANGLE}
                    paddingAngle={0}
                    stroke="none"
                    labelLine={false}
                    label={hoverLabel}
                    activeShape={(props: PieSectorDataItem) => {
                      const { outerRadius = 0, ...rest } = props
                      return (
                        <Sector
                          {...rest}
                          outerRadius={Number(outerRadius) + 6}
                        />
                      )
                    }}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(undefined)}
                    isAnimationActive={false}
                  >
                    {slices.map((slice) => (
                      <Cell key={slice.key} fill={slice.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} cursor={{ fill: 'transparent' }} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <ChartLegend slices={slices} />
        </div>
      </div>
    </div>
  )
}

export { DEFAULT_PIE_CHART_SLICES, DEFAULT_PIE_TOTAL_CONVERSATIONS }

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
  Tooltip,
  type PieLabelRenderProps,
} from 'recharts'
import ButtonSquare from '../ButtonSquare/ButtonSquare'
import {
  DEFAULT_PIE_CHART_SLICES,
  DEFAULT_PIE_TOTAL_CONVERSATIONS,
  PIE_CHART_PLOT_HEIGHT,
  PIE_CHART_SIZE,
  PIE_END_ANGLE,
  PIE_OUTER_RADIUS,
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
        <span className="font-body font-bold text-xs leading-6 text-text-default whitespace-nowrap">
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
      <p className="font-body font-normal text-[10px] leading-4 text-text-default whitespace-nowrap">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className={['size-2.5 shrink-0 rounded-full', slice.dotClass].join(' ')}
        />
        <span className="font-body font-bold text-xs leading-6 text-text-default whitespace-nowrap">
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
    <div className="flex flex-col items-start">
      {ordered.map((slice) => (
        <div key={slice.key} className="flex items-center gap-2">
          <span
            aria-hidden
            className={['size-2.5 shrink-0 rounded-full', slice.dotClass].join(' ')}
          />
          <span className="font-body font-bold text-xs leading-6 text-text-default whitespace-nowrap">
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
  const center = PIE_CHART_SIZE / 2
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
        'flex w-full max-w-[372px] flex-col gap-6 bg-surface-white px-6 py-4',
        className,
      ].join(' ')}
    >
      {/* Header — Figma 278:1728 */}
      <div className="flex w-full items-center justify-between">
        <div className="flex h-12 flex-col gap-1">
          <h2 className="font-body font-bold text-[18px] leading-8 tracking-[0.1px] text-text-default">
            {title}
          </h2>
          <p className="font-body font-normal text-[10px] leading-4 text-text-default">
            {subtitle}
          </p>
        </div>
        <ButtonSquare
          type="icon"
          icon="download"
          size="m"
          onClick={onDownload}
        />
      </div>

      {/* Chart body — Figma 278:1742 */}
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full flex-col gap-4">
          {/* Summary — Figma 279:1862 */}
          <div className="flex w-full flex-wrap items-start gap-x-4 gap-y-2 rounded-lg bg-surface-primary px-4 py-2">
            <div className="flex w-24 flex-col gap-1">
              <p className="font-body font-normal text-[10px] leading-4 text-text-default whitespace-nowrap">
                Total Conversation
              </p>
              <p className="font-body font-bold text-2xl leading-[1.25] tracking-[0.2px] text-text-default">
                {totalConversations}
              </p>
            </div>
            <div className="flex gap-3">
              <SummaryStat label="Most Talked" slice={most} />
              <SummaryStat
                label="Least Talked"
                slice={least}
                className="w-[120px]"
              />
            </div>
          </div>

          {/* Pie — Figma 278:1744 · 279:1779 */}
          <div className="flex w-full justify-center px-6 py-6">
            <RechartsPieChart
              width={PIE_CHART_SIZE}
              height={PIE_CHART_PLOT_HEIGHT}
            >
              <Pie
                data={slices}
                dataKey="value"
                nameKey="label"
                cx={center}
                cy={center}
                outerRadius={PIE_OUTER_RADIUS}
                innerRadius={0}
                startAngle={PIE_START_ANGLE}
                endAngle={PIE_END_ANGLE}
                paddingAngle={0}
                stroke="none"
                labelLine={false}
                label={hoverLabel}
                activeShape={{ outerRadius: PIE_OUTER_RADIUS + 6 }}
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
          </div>

          <ChartLegend slices={slices} />
        </div>
      </div>
    </div>
  )
}

export { DEFAULT_PIE_CHART_SLICES, DEFAULT_PIE_TOTAL_CONVERSATIONS }

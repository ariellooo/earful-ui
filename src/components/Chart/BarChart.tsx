/**
 * BarChart — Figma node 315:1636 (Earful 2026).
 *
 * Stacked sentiment bars (Recharts) · y-axis 0–300 · legend · download action
 */

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ButtonSquare from '../ButtonSquare/ButtonSquare'
import {
  BAR_CHART_Y_MAX,
  BAR_CHART_Y_TICKS,
  DEFAULT_BAR_CHART_DATA,
  SENTIMENT_COLORS,
  SENTIMENT_FILLS,
  SENTIMENT_LABELS,
  SENTIMENT_STACK_BOTTOM_TO_TOP,
  SENTIMENT_STACK_ORDER,
  type BarChartDatum,
  type SentimentKey,
} from './types'

export type BarChartProps = {
  title?:       string
  subtitle?:    string
  data?:        BarChartDatum[]
  yMax?:        number
  onDownload?:  () => void
  className?:   string
}

/** Figma 315:1636 — plot 612 × 204 · bars 51 px · y-axis column 48 px */
const PLOT_WIDTH   = 612
const PLOT_HEIGHT  = 204
const BAR_SIZE     = 51
const Y_AXIS_WIDTH = 48
const CHART_WIDTH  = Y_AXIS_WIDTH + PLOT_WIDTH
const X_AXIS_HEIGHT = 24

/** Gap between 7 bars when distributed across 612 px (justify-between). */
const BAR_CATEGORY_GAP = (PLOT_WIDTH - BAR_SIZE * 7) / 6

const TICK_STYLE = {
  fill:      '#334155',
  fontSize:  10,
  fontFamily: 'Inter, system-ui, sans-serif',
}

function ChartLegend() {
  return (
    <div className="flex items-center gap-[37px]">
      {SENTIMENT_STACK_ORDER.map((key) => (
        <div key={key} className="flex items-center gap-2">
          <span
            aria-hidden
            className={['size-2.5 shrink-0 rounded-full', SENTIMENT_COLORS[key]].join(' ')}
          />
          <span className="font-body font-bold text-xs leading-6 text-text-default whitespace-nowrap">
            {SENTIMENT_LABELS[key]}
          </span>
        </div>
      ))}
    </div>
  )
}

function BarTooltip({
  active,
  payload,
  label,
}: {
  active?:  boolean
  payload?: Array<{ dataKey: string; value: number; color: string }>
  label?:   string
}) {
  if (!active || !payload?.length) return null

  const entry = payload[0]
  const key = entry.dataKey as SentimentKey

  return (
    <div className="rounded-lg border border-line-default bg-surface-white px-3 py-2 shadow-200">
      <p className="font-body font-normal text-[10px] leading-4 text-text-default">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <p className="font-body font-bold text-xs leading-6 text-text-default">
          {SENTIMENT_LABELS[key]}: {entry.value}
        </p>
      </div>
    </div>
  )
}

export default function BarChart({
  title      = 'Sentiment Analysis by Topic',
  subtitle   = 'Calculated by number of messages',
  data       = DEFAULT_BAR_CHART_DATA,
  yMax       = BAR_CHART_Y_MAX,
  onDownload,
  className  = '',
}: BarChartProps) {
  return (
    <div
      className={[
        'flex w-full flex-col gap-6 bg-surface-white px-6 py-4',
        className,
      ].join(' ')}
    >
      {/* Header — Figma 274:4451 */}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
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

      {/* Chart body — Figma 276:1690 */}
      <div className="flex w-full flex-col items-center gap-2">
        <RechartsBarChart
          accessibilityLayer
          data={data}
          width={CHART_WIDTH}
          height={PLOT_HEIGHT + X_AXIS_HEIGHT}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          barSize={BAR_SIZE}
          barCategoryGap={BAR_CATEGORY_GAP}
        >
          <CartesianGrid
            vertical={false}
            stroke="#cbd5e1"
            strokeWidth={1}
          />
          <YAxis
            type="number"
            domain={[0, yMax]}
            ticks={[...BAR_CHART_Y_TICKS]}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            width={Y_AXIS_WIDTH}
            tick={TICK_STYLE}
            tickMargin={4}
          />
          <XAxis
            dataKey="label"
            axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
            tickLine={false}
            tick={TICK_STYLE}
            tickMargin={8}
            height={X_AXIS_HEIGHT}
            interval={0}
          />
          {SENTIMENT_STACK_BOTTOM_TO_TOP.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="sentiment"
              fill={SENTIMENT_FILLS[key]}
              isAnimationActive={false}
            />
          ))}
          <Tooltip
            content={<BarTooltip />}
            shared={false}
            cursor={{ fill: 'var(--color-surface-primary)', opacity: 0.6 }}
          />
        </RechartsBarChart>

        <ChartLegend />
      </div>
    </div>
  )
}

export { DEFAULT_BAR_CHART_DATA }

/**
 * BarChart — Figma node 315:1636 (Earful 2026).
 *
 * Stacked sentiment bars (Recharts) · y-axis 0–300 · legend · download action
 */

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'
import {
  CHART_TICK_STYLE,
  CHART_Y_AXIS_WIDTH,
} from './chartShared'
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

/** Figma 315:1636 — bars 51 px max width */
const BAR_MAX_SIZE     = 51
const X_AXIS_HEIGHT    = 24

function ChartLegend() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-[37px] gap-y-2">
      {SENTIMENT_STACK_ORDER.map((key) => (
        <div key={key} className="flex items-center gap-2">
          <span
            aria-hidden
            className={['size-2.5 shrink-0 rounded-full', SENTIMENT_COLORS[key]].join(' ')}
          />
          <span className="font-body font-bold text-xs leading-6 text-text-default">
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
        'flex w-full min-w-0 flex-col gap-6 overflow-hidden bg-surface-white px-6 py-4',
        className,
      ].join(' ')}
    >
      {/* Header — Figma 274:4451 */}
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

      {/* Chart body — Figma 276:1690 */}
      <div className="flex w-full min-w-0 flex-col items-center gap-2">
        <div className="h-[228px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              accessibilityLayer
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              maxBarSize={BAR_MAX_SIZE}
              barCategoryGap="15%"
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
                width={CHART_Y_AXIS_WIDTH}
                tick={CHART_TICK_STYLE}
                tickMargin={4}
              />
              <XAxis
                dataKey="label"
                axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                tickLine={false}
                tick={CHART_TICK_STYLE}
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
          </ResponsiveContainer>
        </div>

        <ChartLegend />
      </div>
    </div>
  )
}

export { DEFAULT_BAR_CHART_DATA }

/**
 * LineChart — Figma node 315:1637 (Earful 2026).
 *
 * Multi-series trend lines (Recharts) · y-axis 0–140 · legend · download action
 */

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'
import {
  CHART_LEGEND_GAP,
  CHART_PLOT_HEIGHT,
  CHART_TICK_STYLE,
  CHART_WIDTH,
  CHART_X_AXIS_HEIGHT,
  CHART_Y_AXIS_WIDTH,
} from './chartShared'
import {
  DEFAULT_LINE_CHART_DATA,
  LINE_CHART_Y_MAX,
  LINE_CHART_Y_TICKS,
  LINE_SERIES,
  type LineChartDatum,
} from './types'

export type LineChartProps = {
  title?:       string
  subtitle?:    string
  data?:        LineChartDatum[]
  yMax?:        number
  onDownload?:  () => void
  className?:   string
}

function ChartLegend() {
  return (
    <div className="flex items-center" style={{ gap: CHART_LEGEND_GAP }}>
      {LINE_SERIES.map((series) => (
        <div key={series.key} className="flex items-center gap-2">
          <span
            aria-hidden
            className={['size-2.5 shrink-0 rounded-full', series.dotClass].join(' ')}
          />
          <span className="font-body font-bold text-xs leading-6 text-text-default whitespace-nowrap">
            {series.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function LineTooltip({
  active,
  payload,
}: {
  active?:  boolean
  payload?: Array<{ dataKey: string; value: number }>
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-line-default bg-surface-white px-3 py-2 shadow-200">
      <div className="flex flex-col gap-1">
        {LINE_SERIES.map((series) => {
          const entry = payload.find((item) => item.dataKey === series.key)
          if (!entry) return null

          return (
            <div key={series.key} className="flex items-center gap-2">
              <span
                aria-hidden
                className={['size-2.5 shrink-0 rounded-full', series.dotClass].join(' ')}
              />
              <p className="font-body font-bold text-xs leading-6 text-text-default whitespace-nowrap">
                {series.label}: {entry.value}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function LineChart({
  title      = 'Buzz Trend',
  subtitle   = 'Calculated by number of messages',
  data       = DEFAULT_LINE_CHART_DATA,
  yMax       = LINE_CHART_Y_MAX,
  onDownload,
  className  = '',
}: LineChartProps) {
  return (
    <div
      className={[
        'flex w-full flex-col gap-6 bg-surface-white px-6 py-4',
        className,
      ].join(' ')}
    >
      {/* Header — Figma 276:1791 */}
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

      {/* Chart body — Figma 276:1796 */}
      <div className="flex w-full flex-col items-center gap-2">
        <div className="w-full overflow-x-auto">
          <div className="mx-auto" style={{ width: CHART_WIDTH }}>
          <RechartsLineChart
            accessibilityLayer
            data={data}
            width={CHART_WIDTH}
            height={CHART_PLOT_HEIGHT + CHART_X_AXIS_HEIGHT}
            margin={{ top: 0, right: 12, bottom: 0, left: 0 }}
          >
          <CartesianGrid
            vertical={false}
            stroke="#cbd5e1"
            strokeWidth={1}
          />
          <YAxis
            type="number"
            domain={[0, yMax]}
            ticks={[...LINE_CHART_Y_TICKS]}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            width={CHART_Y_AXIS_WIDTH}
            tick={CHART_TICK_STYLE}
            tickMargin={4}
          />
          <XAxis
            dataKey="label"
            type="category"
            scale="point"
            padding={{ left: 28, right: 28 }}
            axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
            tickLine={false}
            tick={CHART_TICK_STYLE}
            tickMargin={8}
            height={CHART_X_AXIS_HEIGHT}
            interval={0}
            minTickGap={0}
          />
          {LINE_SERIES.map((series) => (
            <Line
              key={series.key}
              type="monotone"
              dataKey={series.key}
              stroke={series.stroke}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: series.stroke }}
              isAnimationActive={false}
            />
          ))}
          <Tooltip content={<LineTooltip />} cursor={false} />
          </RechartsLineChart>
          </div>
        </div>

        <ChartLegend />
      </div>
    </div>
  )
}

export { DEFAULT_LINE_CHART_DATA }

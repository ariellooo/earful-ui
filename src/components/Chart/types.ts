export type ChartType = 'bar' | 'line' | 'pie'

export type SentimentKey =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'mixed'
  | 'undetermined'

export type BarChartDatum = {
  label:        string
  positive:     number
  negative:     number
  neutral:      number
  mixed:        number
  undetermined: number
}

/** Top → bottom in stacked column (legend order). */
export const SENTIMENT_STACK_ORDER: SentimentKey[] = [
  'positive',
  'negative',
  'neutral',
  'mixed',
  'undetermined',
]

/** Bottom → top for Recharts `<Bar>` stack (first bar = baseline). */
export const SENTIMENT_STACK_BOTTOM_TO_TOP: SentimentKey[] = [
  'undetermined',
  'mixed',
  'neutral',
  'negative',
  'positive',
]

export const SENTIMENT_COLORS: Record<SentimentKey, string> = {
  positive:     'bg-semantic-green',
  negative:     'bg-semantic-red',
  neutral:      'bg-primary',
  mixed:        'bg-semantic-yellow',
  undetermined: 'bg-greyscale-500',
}

/** SVG / Recharts fill — matches tokens.css semantic + brand colours. */
export const SENTIMENT_FILLS: Record<SentimentKey, string> = {
  positive:     '#009e36',
  negative:     '#d20032',
  neutral:      '#2bc7e0',
  mixed:        '#eaac00',
  undetermined: '#64748b',
}

export const SENTIMENT_LABELS: Record<SentimentKey, string> = {
  positive:     'Positive',
  negative:     'Negative',
  neutral:      'Neutral',
  mixed:        'Mixed',
  undetermined: 'Undetermined',
}

/** Default data derived from Figma node 315:1636 bar segment heights. */
export const DEFAULT_BAR_CHART_DATA: BarChartDatum[] = [
  { label: 'Dec 25', positive: 35, negative: 16, neutral: 194, mixed: 12, undetermined: 16 },
  { label: 'Dec 26', positive: 35, negative: 4,  neutral: 143, mixed: 4,  undetermined: 10 },
  { label: 'Dec 27', positive: 35, negative: 16, neutral: 210, mixed: 12, undetermined: 16 },
  { label: 'Dec 28', positive: 10, negative: 16, neutral: 194, mixed: 12, undetermined: 16 },
  { label: 'Dec 29', positive: 35, negative: 16, neutral: 210, mixed: 9,  undetermined: 16 },
  { label: 'Dec 30', positive: 51, negative: 16, neutral: 138, mixed: 12, undetermined: 16 },
  { label: 'Dec 31', positive: 35, negative: 16, neutral: 104, mixed: 12, undetermined: 29 },
]

export const BAR_CHART_Y_MAX   = 300
export const BAR_CHART_Y_TICKS = [300, 250, 200, 150, 100, 50, 0] as const

// ── Line chart — Figma 315:1637 ───────────────────────────────────────────────

export type LineSeriesKey =
  | 'financePolicy'
  | 'nationalGames'
  | 'nsl'
  | 'talent'

export type LineChartDatum = {
  label:         string
  financePolicy: number
  nationalGames: number
  nsl:           number
  talent:        number
}

export type LineSeriesConfig = {
  key:        LineSeriesKey
  label:      string
  stroke:     string
  dotClass:   string
}

export const LINE_SERIES: LineSeriesConfig[] = [
  {
    key:      'financePolicy',
    label:    'BHK-Finance Policy 2025',
    stroke:   '#2bc7e0',
    dotClass: 'bg-primary',
  },
  {
    key:      'nationalGames',
    label:    'BHK-national games 2025',
    stroke:   '#ff801a',
    dotClass: 'bg-secondary',
  },
  {
    key:      'nsl',
    label:    'BHK-NSL',
    stroke:   '#9278ff',
    dotClass: 'bg-brand-purple',
  },
  {
    key:      'talent',
    label:    'BHK-talent',
    stroke:   '#6ade94',
    dotClass: 'bg-brand-mint',
  },
]

/** Default data approximated from Figma node 315:1637 line paths. */
export const DEFAULT_LINE_CHART_DATA: LineChartDatum[] = [
  { label: 'Dec 25', financePolicy: 108, nationalGames: 4,  nsl: 14, talent: 24 },
  { label: 'Dec 26', financePolicy: 82,  nationalGames: 6,  nsl: 10, talent: 26 },
  { label: 'Dec 27', financePolicy: 128, nationalGames: 2,  nsl: 16, talent: 21 },
  { label: 'Dec 28', financePolicy: 92,  nationalGames: 4,  nsl: 11, talent: 27 },
  { label: 'Dec 29', financePolicy: 68,  nationalGames: 3,  nsl: 13, talent: 23 },
  { label: 'Dec 30', financePolicy: 42,  nationalGames: 5,  nsl: 9,  talent: 32 },
  { label: 'Dec 31', financePolicy: 8,   nationalGames: 2,  nsl: 6,  talent: 75 },
]

export const LINE_CHART_Y_MAX   = 140
export const LINE_CHART_Y_STEP  = 20
export const LINE_CHART_Y_TICKS = Array.from(
  { length: LINE_CHART_Y_MAX / LINE_CHART_Y_STEP + 1 },
  (_, i) => LINE_CHART_Y_MAX - i * LINE_CHART_Y_STEP,
) as readonly number[]

// ── Pie chart — Figma 315:1638 ────────────────────────────────────────────────

export type PieChartSlice = {
  key:      LineSeriesKey
  label:    string
  value:    number
  fill:     string
  dotClass: string
}

/** Slice order — clockwise from top (Figma 279:1780): NSL → Finance → Talent → National. */
export const DEFAULT_PIE_CHART_SLICES: PieChartSlice[] = [
  {
    key:      'nsl',
    label:    'BHK-NSL',
    value:    30,
    fill:     'var(--color-brand-purple)',
    dotClass: 'bg-brand-purple',
  },
  {
    key:      'financePolicy',
    label:    'BHK-Finance Policy 2025',
    value:    20,
    fill:     'var(--color-primary)',
    dotClass: 'bg-primary',
  },
  {
    key:      'talent',
    label:    'BHK-talent',
    value:    35,
    fill:     'var(--color-brand-mint)',
    dotClass: 'bg-brand-mint',
  },
  {
    key:      'nationalGames',
    label:    'BHK-national games 2025',
    value:    15,
    fill:     'var(--color-secondary)',
    dotClass: 'bg-secondary',
  },
]

export const DEFAULT_PIE_TOTAL_CONVERSATIONS = 3616

/** Pie diameter ~188px with 24px inset so the full circle is visible (not clipped). */
export const PIE_OUTER_RADIUS      = 94
export const PIE_PADDING           = 24
export const PIE_CHART_SIZE        = PIE_OUTER_RADIUS * 2 + PIE_PADDING * 2
export const PIE_CHART_PLOT_HEIGHT = PIE_CHART_SIZE
export const PIE_START_ANGLE       = 270
export const PIE_END_ANGLE         = -90

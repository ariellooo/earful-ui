/**
 * BadgesStrategy — sourced from Figma node 618:4061 (Earful 2026).
 *
 * A small non-interactive strategy tag badge.
 * 24 px tall · 8 px horizontal padding · 4 px radius · Inter Medium 12 px
 * Uses brand tint (bg) + brand shade (text) colour pairs.
 *
 * strategy           bg-tint        text-shade
 * ──────────────────────────────────────────────────
 * Dilution           tint-blue      shade-blue
 * Distraction        tint-orange    shade-orange
 * Exposure           tint-indigo    shade-indigo
 * Neutralization     tint-purple    shade-purple
 * Market Intelligence tint-mint     shade-mint
 */

export type BadgesStrategyValue =
  | 'Dilution'
  | 'Distraction'
  | 'Exposure'
  | 'Neutralization'
  | 'Market Intelligence'

export type BadgesStrategyProps = {
  strategy?: BadgesStrategyValue
}

const STRATEGY_STYLES: Record<BadgesStrategyValue, { bg: string; text: string }> = {
  'Dilution':            { bg: 'bg-brand-tint-blue',   text: 'text-brand-shade-blue' },
  'Distraction':         { bg: 'bg-brand-tint-orange', text: 'text-brand-shade-orange' },
  'Exposure':            { bg: 'bg-brand-tint-indigo', text: 'text-brand-shade-indigo' },
  'Neutralization':      { bg: 'bg-brand-tint-purple', text: 'text-brand-shade-purple' },
  'Market Intelligence': { bg: 'bg-brand-tint-mint',   text: 'text-brand-shade-mint' },
}

export default function BadgesStrategy({ strategy = 'Dilution' }: BadgesStrategyProps) {
  const { bg, text } = STRATEGY_STYLES[strategy]
  return (
    <span
      className={[
        'inline-flex items-center h-6 px-2 rounded',
        'font-body font-medium text-[12px] leading-6 tracking-[0.2px] whitespace-nowrap',
        bg, text,
      ].join(' ')}
    >
      {strategy}
    </span>
  )
}

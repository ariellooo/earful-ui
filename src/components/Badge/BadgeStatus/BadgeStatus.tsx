/**
 * BadgesStatus — sourced from Figma node 624:5317 (Earful 2026).
 *
 * A small non-interactive status badge.
 * 24 px tall · 8 px horizontal padding · 4 px radius · Inter Medium 12 px
 *
 * status   bg                  label
 * ─────────────────────────────────────────
 * Draft    semantic-yellow     Draft
 * Inactive greyscale-500       Inactive
 * Launched semantic-green      Launched
 * Completed brand-orange       Completed
 */

export type BadgesStatusValue = 'Draft' | 'Inactive' | 'Launched' | 'Completed'

export type BadgesStatusProps = {
  status?: BadgesStatusValue
}

const STATUS_STYLES: Record<BadgesStatusValue, string> = {
  Draft:     'bg-semantic-yellow',
  Inactive:  'bg-greyscale-500',
  Launched:  'bg-semantic-green',
  Completed: 'bg-secondary',
}

export default function BadgesStatus({ status = 'Draft' }: BadgesStatusProps) {
  return (
    <span
      className={[
        'inline-flex items-center h-6 px-2 rounded',
        'font-body font-medium text-[12px] leading-6 tracking-[0.2px] whitespace-nowrap',
        'text-text-invert',
        STATUS_STYLES[status],
      ].join(' ')}
    >
      {status}
    </span>
  )
}

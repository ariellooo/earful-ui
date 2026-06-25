/**
 * ButtonCircle — fully circular buttons.
 *
 * type:
 *   number — 36×36 cyan filled circle, shows a number
 *   tick   — 36×36 green filled circle with a checkmark (default state only)
 *
 * disabled: boolean — hover/pressed use native CSS interaction (number only)
 */

export type ButtonCircleType = 'number' | 'tick'

export type ButtonCircleProps = {
  type?:     ButtonCircleType
  disabled?: boolean
  /** Displayed number for type=number */
  number?:   number
}

// ─── Checkmark SVG ────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ButtonCircle({
  type     = 'number',
  disabled = false,
  number   = 1,
}: ButtonCircleProps) {
  // ── tick ───────────────────────────────────────────────────────────────────
  if (type === 'tick') {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center size-9 rounded-full bg-semantic-green text-white shadow-100 cursor-pointer p-[6px]"
      >
        <CheckIcon />
      </button>
    )
  }

  // ── number ─────────────────────────────────────────────────────────────────
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center size-9 rounded-full',
        'font-body font-medium text-[15px] leading-6 tracking-[0.2px]',
        'transition-colors select-none',
        disabled
          ? 'bg-surface-disable text-text-invert cursor-not-allowed opacity-60'
          : 'bg-primary text-text-default hover:bg-brand-tint-blue active:bg-brand-shade-blue cursor-pointer',
      ].join(' ')}
    >
      {number}
    </button>
  )
}

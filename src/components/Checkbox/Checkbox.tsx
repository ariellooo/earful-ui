/**
 * Checkbox — Figma nodes 160:1497 (uncheck) · 160:1499 (checked) · 370:1416 (checked all).
 *
 * 24 × 24 px hit area · 18 × 18 px inner box (12.5% inset)
 * checked:     semantic-green fill + check vector 160:1501 (8 × 5 px)
 * checked-all: semantic-green fill + 8 × 1.5 px dash
 */

export type CheckboxStatus = 'uncheck' | 'checked' | 'checked-all'

export type CheckboxProps = {
  status?:    CheckboxStatus
  disabled?:  boolean
  /** Visual-only — defers interaction to a parent (e.g. menu row). */
  readOnly?:  boolean
  className?: string
  label?:     string
  onClick?:   () => void
}

/** Figma vector 160:1501 — path exported from Earful 2026 */
function CheckMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 9.5 6.5"
      fill="none"
      preserveAspectRatio="none"
      overflow="visible"
      className="absolute left-1/3 top-[calc(50%+0.5px)] z-10 h-[5px] w-2 -translate-y-1/2"
    >
      <path
        d="M0.75 3.25L3.41667 5.75L8.75 0.75"
        stroke="var(--color-text-invert)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Figma line 370:1420 — 8 × 1.5 px indeterminate dash */
function IndeterminateMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 9.5 1.5"
      fill="none"
      preserveAspectRatio="none"
      overflow="visible"
      className="absolute left-1/3 top-1/2 z-10 h-[1.5px] w-2 -translate-y-1/2"
    >
      <path
        d="M0.75 0.75H8.75"
        stroke="var(--color-text-invert)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Checkbox({
  status    = 'uncheck',
  disabled  = false,
  readOnly  = false,
  className = '',
  label,
  onClick,
}: CheckboxProps) {
  const isChecked       = status === 'checked' || status === 'checked-all'
  const isIndeterminate = status === 'checked-all'

  const box = (
    <>
      <span
        aria-hidden
        className={[
          'absolute inset-[12.5%] rounded-[2px]',
          isChecked
            ? 'border border-semantic-green bg-semantic-green'
            : 'border border-greyscale-700 bg-surface-white',
        ].join(' ')}
      />
      {status === 'checked' && <CheckMark />}
      {status === 'checked-all' && <IndeterminateMark />}
    </>
  )

  const sharedClass = [
    'relative inline-flex size-6 shrink-0',
    !readOnly && disabled && 'cursor-not-allowed opacity-50',
    !readOnly && !disabled && 'cursor-pointer',
    className,
  ].join(' ')

  if (readOnly) {
    return (
      <span aria-hidden className={sharedClass}>
        {box}
      </span>
    )
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : isChecked}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={sharedClass}
    >
      {box}
    </button>
  )
}

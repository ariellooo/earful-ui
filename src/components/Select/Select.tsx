/**
 * Select — sourced from Figma node 433:2108 (Earful 2026).
 *
 * Pre-set dropdown trigger: outlined button with label + chevron-down.
 * 212 × 48 px · white bg · line-default border · shadow-100
 */

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export type SelectProps = {
  label?:     string
  onClick?:   () => void
  className?: string
}

export default function Select({
  label     = 'Select',
  onClick,
  className = '',
}: SelectProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex h-12 w-[212px] items-center justify-between',
        'rounded-lg border border-greyscale-300 bg-surface-white shadow-100',
        'pl-4 pr-3 py-2',
        'font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default',
        'cursor-pointer transition-colors hover:bg-surface-primary',
        className,
      ].join(' ')}
    >
      <span className="whitespace-nowrap">{label}</span>
      <ChevronDownIcon />
    </button>
  )
}

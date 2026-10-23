/**
 * Tabs — Earful 2026.
 *
 * default — Figma node 5621:7454
 *   120 × 48, white surface, 8 px top corners,
 *   orange label, 4 px orange underline
 * disable — Figma node 5621:7456
 *   black label, no underline, no fill
 */

export type TabsVariant = 'default' | 'disable'

export type TabsProps = {
  label?:      string
  variant?:    TabsVariant
  className?:  string
  onClick?:    () => void
  /** Passed to the underlying button when interactive. */
  selected?:   boolean
}

export default function Tabs({
  label     = 'Facebook',
  variant   = 'default',
  className = '',
  onClick,
  selected,
}: TabsProps) {
  const isActive = variant === 'default'

  const rootClass = [
    'relative flex h-12 w-[120px] shrink-0 flex-col items-center justify-center',
    isActive
      ? 'rounded-t-lg border-b-4 border-solid border-secondary bg-surface-white'
      : '',
    className,
  ].join(' ')

  const labelClass = [
    'font-body font-bold text-[18px] leading-8 tracking-[0.1px] whitespace-nowrap',
    isActive ? 'text-secondary' : 'text-text-default',
  ].join(' ')

  if (onClick) {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={selected ?? isActive}
        onClick={onClick}
        className={rootClass}
      >
        <span className={labelClass}>{label}</span>
      </button>
    )
  }

  return (
    <div role="tab" aria-selected={selected ?? isActive} className={rootClass}>
      <span className={labelClass}>{label}</span>
    </div>
  )
}

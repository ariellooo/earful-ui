/**
 * Toggle — Figma node 213:1082 (Earful 2026).
 *
 * 32 × 18 px track · 12 px thumb · on = semantic-green · off = surface-secondary
 */

import { useState } from 'react'

export type ToggleProps = {
  checked?:        boolean
  defaultChecked?:   boolean
  disabled?:         boolean
  onChange?:         (checked: boolean) => void
  className?:        string
  'aria-label'?:     string
}

export default function Toggle({
  checked:        controlledChecked,
  defaultChecked = false,
  disabled       = false,
  onChange,
  className      = '',
  'aria-label':  ariaLabel = 'Toggle',
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isChecked = controlledChecked ?? internalChecked

  const toggle = () => {
    if (disabled) return
    const next = !isChecked
    if (controlledChecked === undefined) setInternalChecked(next)
    onChange?.(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={toggle}
      className={[
        'relative h-[18px] w-8 shrink-0 overflow-hidden rounded-full transition-colors',
        isChecked ? 'bg-semantic-green' : 'bg-surface-secondary',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].join(' ')}
    >
      <span
        aria-hidden
        className={[
          'absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full',
          'bg-surface-white transition-[left]',
          isChecked ? 'left-[calc(50%+7px)]' : 'left-[calc(50%-7px)]',
        ].join(' ')}
      />
    </button>
  )
}

/**
 * ButtonSquare — square-shaped buttons (8 px radius).
 *
 * type:
 *   number — 36×36 outlined square, shows a number
 *   icon   — square icon button; l = secondary outlined · m/s = tertiary ghost
 *
 * disabled: boolean — hover/pressed use native CSS interaction
 */

import { IconGlyph, ICON_COLOR_DEFAULT, ICON_COLOR_INVERT, type IconName } from '../../../foundations/Icons/Function/IconFunction'

export type ButtonSquareType  = 'number' | 'icon'
export type ButtonSquareLevel = 'secondary' | 'tertiary'
export type ButtonSquareSize  = 'l' | 'm' | 's'

export type ButtonSquareProps = {
  type?:     ButtonSquareType
  size?:     ButtonSquareSize
  disabled?: boolean
  /** Displayed number for type=number */
  number?:   number
  /** Icon name (from Icon/Icon.tsx) for type=icon */
  icon?:     IconName
  onClick?:  () => void
  'aria-label'?: string
}

// ─── Icon ─────────────────────────────────────────────────────────────────────

function SqIcon({ name, color }: { name: IconName; color: string }) {
  return <IconGlyph name={name} size={20} color={color} />
}

// ─── Style helpers ────────────────────────────────────────────────────────────

function getIconClasses(
  level:    ButtonSquareLevel,
  size:     ButtonSquareSize,
  disabled: boolean,
): string {
  const dim =
    size === 'l' ? 'size-12' :
    size === 'm' ? 'size-9'  : 'size-6'

  const radius =
    size === 's' ? 'rounded' : 'rounded-lg'

  const base = `inline-flex items-center justify-center shrink-0 ${dim} ${radius} transition-colors`

  if (level === 'secondary') {
    if (disabled) return `${base} bg-surface-disable shadow-100 cursor-not-allowed`
    return [
      base,
      'bg-surface-white border border-greyscale-300 shadow-100',
      'hover:border-greyscale-500 active:bg-surface-primary',
      'cursor-pointer',
    ].join(' ')
  }

  // tertiary — ghost
  if (disabled) return `${base} cursor-not-allowed`
  return [
    base,
    'hover:bg-surface-primary active:bg-surface-disable',
    'cursor-pointer',
  ].join(' ')
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ButtonSquare({
  type     = 'number',
  size     = 'm',
  disabled = false,
  number   = 1,
  icon     = 'download',
  onClick,
  'aria-label': ariaLabel,
}: ButtonSquareProps) {
  // ── number ─────────────────────────────────────────────────────────────────
  if (type === 'number') {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        className={[
          'inline-flex items-center justify-center size-9 rounded-lg',
          'font-body font-medium text-[15px] leading-6 tracking-[0.2px]',
          'shadow-100 transition-colors select-none',
          disabled
            ? 'bg-surface-disable border border-greyscale-300 text-text-invert cursor-not-allowed'
            : [
                'bg-surface-white border border-greyscale-300 text-text-default',
                'hover:border-greyscale-500 active:bg-surface-primary',
                'cursor-pointer',
              ].join(' '),
        ].join(' ')}
      >
        {number}
      </button>
    )
  }

  // ── icon ───────────────────────────────────────────────────────────────────
  const iconLevel: ButtonSquareLevel = size === 'l' ? 'secondary' : 'tertiary'
  const iconColor = disabled
    ? iconLevel === 'secondary' ? ICON_COLOR_INVERT : 'var(--color-text-disable)'
    : ICON_COLOR_DEFAULT
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={getIconClasses(iconLevel, size, disabled)}
    >
      <SqIcon name={icon} color={iconColor} />
    </button>
  )
}

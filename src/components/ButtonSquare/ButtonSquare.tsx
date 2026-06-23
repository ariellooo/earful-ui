/**
 * ButtonSquare — square-shaped buttons (8 px radius).
 *
 * type:
 *   number — 36×36 outlined square, shows a number
 *   icon   — square icon button; l = secondary outlined · m/s = tertiary ghost
 *
 * disabled: boolean — hover/pressed use native CSS interaction
 */

import { ICON_ASSETS, type IconName } from '../Icon/Icon'

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
}

// ─── Icon via mask ────────────────────────────────────────────────────────────

function SqIcon({ name, color }: { name: IconName; color: string }) {
  return (
    <span
      aria-hidden
      style={{
        display:            'inline-block',
        width:              20,
        height:             20,
        flexShrink:         0,
        backgroundColor:    color,
        WebkitMaskImage:    `url(${ICON_ASSETS[name]})`,
        maskImage:          `url(${ICON_ASSETS[name]})`,
        WebkitMaskSize:     'contain',
        maskSize:           'contain',
        WebkitMaskRepeat:   'no-repeat',
        maskRepeat:         'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition:       'center',
      }}
    />
  )
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
}: ButtonSquareProps) {
  // ── number ─────────────────────────────────────────────────────────────────
  if (type === 'number') {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={[
          'inline-flex items-center justify-center size-9 rounded-lg',
          'font-body font-medium text-[15px] leading-6 tracking-[0.2px]',
          'shadow-100 transition-colors select-none',
          disabled
            ? 'bg-surface-disable border border-greyscale-300 text-text-disable cursor-not-allowed'
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
    ? iconLevel === 'secondary' ? '#f8fafc' : '#cbd5e1' // invert on disable bg · disable on ghost
    : '#334155'
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={getIconClasses(iconLevel, size, disabled)}
    >
      <SqIcon name={icon} color={iconColor} />
    </button>
  )
}

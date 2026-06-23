/**
 * Button — Figma nodes 618:4608 (Earful 2026).
 *
 * iconLeft  : icon rendered before the label
 * iconRight : icon rendered after the label
 * level     : 'primary' | 'secondary' | 'tertiary'
 * size      : 'l' (48 px) | 'm' (36 px)
 * disabled  : boolean
 *
 * Color logic (Figma):
 *   primary + no icon + size=l → cyan  (brand-blue)
 *   primary + icon or size=m   → orange (brand-secondary)
 *   secondary                  → outlined (white bg + border)
 *   tertiary                   → ghost (no bg, no border)
 */

import { ICON_ASSETS, type IconName } from '../Icon/Icon'

export type ButtonLevel = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize  = 'l' | 'm'

export type ButtonProps = {
  label?:     string
  /** Icon placed before the label */
  iconLeft?:  IconName
  /** Icon placed after the label */
  iconRight?: IconName
  level?:     ButtonLevel
  size?:      ButtonSize
  disabled?:  boolean
  onClick?:   () => void
}

// ─── Icon image ───────────────────────────────────────────────────────────────
// Icons are raster images — use CSS mask so they inherit the button text color.

function BtnIcon({ name, color }: { name: IconName; color: string }) {
  return (
    <span
      aria-hidden
      style={{
        display:              'inline-block',
        width:                20,
        height:               20,
        flexShrink:           0,
        backgroundColor:      color,
        WebkitMaskImage:      `url(${ICON_ASSETS[name]})`,
        maskImage:            `url(${ICON_ASSETS[name]})`,
        WebkitMaskSize:       'contain',
        maskSize:             'contain',
        WebkitMaskRepeat:     'no-repeat',
        maskRepeat:           'no-repeat',
        WebkitMaskPosition:   'center',
        maskPosition:         'center',
      }}
    />
  )
}

// ─── Style helper ─────────────────────────────────────────────────────────────

function getClasses(
  level:    ButtonLevel,
  size:     ButtonSize,
  disabled: boolean,
  hasLeft:  boolean,
  hasRight: boolean,
): string {
  const h   = size === 'l' ? 'h-12' : 'h-9'
  const pad =
    hasLeft && hasRight ? 'px-3' :
    hasLeft             ? 'pl-3 pr-4' :
    hasRight            ? 'pl-4 pr-3' :
    'px-4'

  const base = [
    'inline-flex items-center gap-2',
    'font-body font-medium text-[15px] leading-6 tracking-[0.2px]',
    'rounded-lg transition-colors select-none whitespace-nowrap',
    h, pad,
  ]

  if (disabled) {
    return [...base, 'bg-surface-disable text-text-invert cursor-not-allowed opacity-60'].join(' ')
  }

  if (level === 'primary') {
    const usesOrange = hasLeft || hasRight || size === 'm'
    const bg = usesOrange
      ? 'bg-secondary hover:bg-brand-tint-orange active:bg-brand-shade-orange'
      : 'bg-primary  hover:bg-brand-tint-blue   active:bg-brand-shade-blue'
    return [...base, bg, 'text-text-invert shadow-200 cursor-pointer'].join(' ')
  }

  if (level === 'secondary') {
    return [
      ...base,
      'bg-surface-white border border-greyscale-300 shadow-100',
      'hover:border-greyscale-500 active:bg-surface-primary',
      'text-text-default cursor-pointer',
    ].join(' ')
  }

  // tertiary — ghost
  return [
    ...base,
    'hover:bg-surface-primary active:bg-surface-disable',
    'text-text-default cursor-pointer',
  ].join(' ')
}

// ─── Component ────────────────────────────────────────────────────────────────

// Icon color matches the text color for each button level
const ICON_COLOR: Record<ButtonLevel, string> = {
  primary:   '#f8fafc', // text-invert (white — on cyan/orange bg)
  secondary: '#334155', // text-default (dark — on white bg)
  tertiary:  '#334155', // text-default (dark — on transparent bg)
}
const ICON_COLOR_DISABLED = '#f8fafc' // text-invert (white — on disabled bg)

export default function Button({
  label    = 'Button Label',
  iconLeft,
  iconRight,
  level    = 'primary',
  size     = 'l',
  disabled = false,
  onClick,
}: ButtonProps) {
  const iconColor = disabled ? ICON_COLOR_DISABLED : ICON_COLOR[level]

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={getClasses(level, size, disabled, !!iconLeft, !!iconRight)}
    >
      {iconLeft  && <BtnIcon name={iconLeft}  color={iconColor} />}
      <span>{label}</span>
      {iconRight && <BtnIcon name={iconRight} color={iconColor} />}
    </button>
  )
}

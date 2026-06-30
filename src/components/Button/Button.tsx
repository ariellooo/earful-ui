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

import { IconGlyph, ICON_COLOR_DEFAULT, ICON_COLOR_INVERT, type IconName } from '../Icon/Icon'

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
  /** Forces primary fill color when level is primary (default: auto from icons/size) */
  primaryColor?: 'blue' | 'orange'
  className?:   string
  onClick?:   () => void
}

// ─── Icon ───────────────────────────────────────────────────────────────────────

function BtnIcon({ name, color }: { name: IconName; color: string }) {
  return <IconGlyph name={name} size={20} color={color} />
}

// ─── Style helper ─────────────────────────────────────────────────────────────

function getClasses(
  level:    ButtonLevel,
  size:     ButtonSize,
  disabled: boolean,
  hasLeft:  boolean,
  hasRight: boolean,
  primaryColor?: 'blue' | 'orange',
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
    const usesOrange = primaryColor === 'orange' || (primaryColor !== 'blue' && (hasLeft || hasRight || size === 'm'))
    const bg = usesOrange
      ? 'bg-secondary hover:bg-brand-tint-orange active:bg-brand-shade-orange'
      : 'bg-primary  hover:bg-brand-tint-blue   active:bg-brand-shade-blue'
    return [...base, bg, 'text-text-default shadow-200 cursor-pointer'].join(' ')
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
  primary:   ICON_COLOR_DEFAULT,
  secondary: ICON_COLOR_DEFAULT,
  tertiary:  ICON_COLOR_DEFAULT,
}
const ICON_COLOR_DISABLED = ICON_COLOR_INVERT

export default function Button({
  label    = 'Button Label',
  iconLeft,
  iconRight,
  level    = 'primary',
  size     = 'l',
  disabled = false,
  primaryColor,
  className,
  onClick,
}: ButtonProps) {
  const iconColor = disabled ? ICON_COLOR_DISABLED : ICON_COLOR[level]

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={[getClasses(level, size, disabled, !!iconLeft, !!iconRight, primaryColor), className].filter(Boolean).join(' ')}
    >
      {iconLeft  && <BtnIcon name={iconLeft}  color={iconColor} />}
      <span>{label}</span>
      {iconRight && <BtnIcon name={iconRight} color={iconColor} />}
    </button>
  )
}

/**
 * Shared icon glyphs used by Button-family components.
 * Figma menu/Default/Full (5445:3335) — 24 px chevrons in 48 px rows.
 */

import { IconGlyph, ICON_COLOR_DEFAULT } from '../../foundations/Icons/Function/IconFunction'

export type ChevronIconProps = {
  size?:  number
  color?: string
  className?: string
}

export function ChevronLeft({
  size      = 24,
  color     = ICON_COLOR_DEFAULT,
  className = '',
}: ChevronIconProps) {
  return (
    <IconGlyph
      name="chevron-left"
      size={size}
      color={color}
      className={className}
    />
  )
}

export function ChevronRight({
  size      = 24,
  color     = ICON_COLOR_DEFAULT,
  className = '',
}: ChevronIconProps) {
  return (
    <IconGlyph
      name="chevron-right"
      size={size}
      color={color}
      className={className}
    />
  )
}

/**
 * System status icons — local SVGs from src/assets/icons_system.
 *
 * type    : triangle-alert | octagon-warning | circle-info | circle-success | circle-help
 * variant : default | fill | outline
 *
 * SVG hex values are mapped to design tokens at render time (no inline styles).
 */

import triangleAlertDefault from '../../assets/icons_system/triangle-alert-default.svg?raw'
import triangleAlertFill from '../../assets/icons_system/triangle-alert-fill.svg?raw'
import triangleAlertOutline from '../../assets/icons_system/triangle-alert-outline.svg?raw'
import octagonWarningDefault from '../../assets/icons_system/octagon-warning-default.svg?raw'
import octagonWarningFill from '../../assets/icons_system/octagon-warning-fill.svg?raw'
import octagonWarningOutline from '../../assets/icons_system/octagon-warning-outline.svg?raw'
import circleInfoDefault from '../../assets/icons_system/circle-info-default.svg?raw'
import circleInfoFill from '../../assets/icons_system/circle-info-fill.svg?raw'
import circleInfoOutline from '../../assets/icons_system/circle-info-outline.svg?raw'
import circleSuccessDefault from '../../assets/icons_system/circle-success-default.svg?raw'
import circleSuccessFill from '../../assets/icons_system/circle-success-fill.svg?raw'
import circleSuccessOutline from '../../assets/icons_system/circle-success-outline.svg?raw'
import circleHelpDefault from '../../assets/icons_system/circle-help-default.svg?raw'
import circleHelpFill from '../../assets/icons_system/circle-help-fill.svg?raw'
import circleHelpOutline from '../../assets/icons_system/circle-help-outline.svg?raw'

export type IconSystemType    = 'triangle-alert' | 'octagon-warning' | 'circle-info' | 'circle-success' | 'circle-help'
export type IconSystemVariant = 'default' | 'fill' | 'outline'

export const ICON_SYSTEM_TYPES    = [
  'triangle-alert',
  'octagon-warning',
  'circle-info',
  'circle-success',
  'circle-help',
] as const satisfies readonly IconSystemType[]

export const ICON_SYSTEM_VARIANTS = ['default', 'fill', 'outline'] as const

const ICON_SYSTEM_ASSETS: Record<`${IconSystemType}-${IconSystemVariant}`, string> = {
  'triangle-alert-default':  triangleAlertDefault,
  'triangle-alert-fill':     triangleAlertFill,
  'triangle-alert-outline':  triangleAlertOutline,
  'octagon-warning-default': octagonWarningDefault,
  'octagon-warning-fill':    octagonWarningFill,
  'octagon-warning-outline': octagonWarningOutline,
  'circle-info-default':     circleInfoDefault,
  'circle-info-fill':        circleInfoFill,
  'circle-info-outline':     circleInfoOutline,
  'circle-success-default':  circleSuccessDefault,
  'circle-success-fill':     circleSuccessFill,
  'circle-success-outline':  circleSuccessOutline,
  'circle-help-default':     circleHelpDefault,
  'circle-help-fill':        circleHelpFill,
  'circle-help-outline':     circleHelpOutline,
}

/** Hex / keyword values in SVG assets → token vars from tokens.css */
const SVG_COLOR_TOKENS: ReadonlyArray<[string, string]> = [
  ['#EAAC00', 'var(--color-icon-system-warning)'],
  ['#FF801A', 'var(--color-icon-system-critical)'],
  ['#2BC7E0', 'var(--color-icon-system-info)'],
  ['#009E36', 'var(--color-icon-system-success)'],
  ['#D20032', 'var(--color-icon-system-help)'],
  ['#0F172A', 'var(--color-icon-default)'],
  ['#334155', 'var(--color-greyscale-700)'],
  ['#CBD5E1', 'var(--color-greyscale-300)'],
  ['#F8FAFC', 'var(--color-icon-invert)'],
  ['white',   'var(--color-surface-white)'],
]

const ICON_SYSTEM_SIZE_CLASSES: Record<number, string> = {
  16: 'size-4',
  20: 'size-5',
  24: 'size-6',
  28: 'size-7',
  32: 'size-8',
  36: 'size-9',
  40: 'size-10',
  48: 'size-12',
  56: 'size-14',
  64: 'size-16',
}

/** Lucide outline assets use currentColor — set semantic stroke via Tailwind text-* */
const OUTLINE_CURRENT_COLOR_CLASS: Partial<Record<IconSystemType, string>> = {
  'circle-success': 'text-icon-system-success',
  'circle-help':    'text-icon-system-help',
}

function tokenizeSvgMarkup(markup: string): string {
  let svg = markup
    .replace(/\swidth="[^"]*"/, '')
    .replace(/\sheight="[^"]*"/, '')
    .replace(/\sclass="[^"]*"/g, '')

  for (const [value, token] of SVG_COLOR_TOKENS) {
    const pattern = new RegExp(value.replace('#', '#'), 'gi')
    svg = svg.replace(pattern, token)
  }

  return svg
}

function iconSystemKey(type: IconSystemType, variant: IconSystemVariant): `${IconSystemType}-${IconSystemVariant}` {
  return `${type}-${variant}`
}

function sizeClass(size: number): string {
  return ICON_SYSTEM_SIZE_CLASSES[size] ?? 'size-6'
}

export type IconSystemGlyphProps = {
  type:      IconSystemType
  variant?:  IconSystemVariant
  size?:     number
  className?: string
}

export function IconSystemGlyph({
  type,
  variant = 'default',
  size    = 24,
  className = '',
}: IconSystemGlyphProps) {
  const markup = tokenizeSvgMarkup(ICON_SYSTEM_ASSETS[iconSystemKey(type, variant)])
  const currentColorClass = variant === 'outline' ? OUTLINE_CURRENT_COLOR_CLASS[type] : undefined

  return (
    <span
      aria-hidden
      className={[
        'inline-block shrink-0 [&>svg]:block [&>svg]:size-full',
        sizeClass(size),
        currentColorClass,
        className,
      ].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export type IconSystemProps = {
  type:      IconSystemType
  variant?:  IconSystemVariant
  /** Size in px — Figma baseline is 24 */
  size?:     number
  className?: string
  /** Accessible label; omit for purely decorative icons */
  label?:    string
}

export default function IconSystem({
  type,
  variant = 'default',
  size      = 24,
  className = '',
  label,
}: IconSystemProps) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
      className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')}
    >
      <IconSystemGlyph type={type} variant={variant} size={size} />
    </span>
  )
}

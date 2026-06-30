/**
 * Icon assets — local SVGs (Lucide stroke icons).
 * Rendered inline so stroke="currentColor" inherits --color-icon-default.
 */

import arrowDown from '../../assets/icons_function/arrow-down.svg?raw'
import arrowLeft from '../../assets/icons_function/arrow-left.svg?raw'
import arrowRight from '../../assets/icons_function/arrow-right.svg?raw'
import arrowUp from '../../assets/icons_function/arrow-up.svg?raw'
import bell from '../../assets/icons_function/bell.svg?raw'
import bellDot from '../../assets/icons_function/bell-dot.svg?raw'
import calendar from '../../assets/icons_function/calendar.svg?raw'
import check from '../../assets/icons_function/check.svg?raw'
import chevronDown from '../../assets/icons_function/chevron-down.svg?raw'
import chevronLeft from '../../assets/icons_function/chevron-left.svg?raw'
import chevronRight from '../../assets/icons_function/chevron-right.svg?raw'
import chevronUp from '../../assets/icons_function/chevron-up.svg?raw'
import commentSquarePlus from '../../assets/icons_function/comment-square-plus.svg?raw'
import deleteIcon from '../../assets/icons_function/delete.svg?raw'
import dollarSign from '../../assets/icons_function/dollar-sign.svg?raw'
import dot from '../../assets/icons_function/dot.svg?raw'
import download from '../../assets/icons_function/download.svg?raw'
import ellipsisVertical from '../../assets/icons_function/ellipsis-vertical.svg?raw'
import externalLink from '../../assets/icons_function/external-link.svg?raw'
import image from '../../assets/icons_function/image.svg?raw'
import languages from '../../assets/icons_function/languages.svg?raw'
import link from '../../assets/icons_function/link.svg?raw'
import listFilter from '../../assets/icons_function/list-filter.svg?raw'
import logOut from '../../assets/icon_menu/log-out.svg?raw'
import pencil from '../../assets/icons_function/pencil.svg?raw'
import plus from '../../assets/icons_function/plus.svg?raw'
import repeat from '../../assets/icons_function/repeat.svg?raw'
import save from '../../assets/icons_function/save.svg?raw'
import search from '../../assets/icons_function/search.svg?raw'
import setting from '../../assets/icon_menu/settings.svg?raw'
import star from '../../assets/icons_function/star.svg?raw'
import stickyNoteComment from '../../assets/icons_function/sticky-note.svg?raw'
import trash from '../../assets/icons_function/trash-2.svg?raw'
import upload from '../../assets/icons_function/upload.svg?raw'
import wandSparkles from '../../assets/icons_function/wand-sparkles.svg?raw'

export const ICON_ASSETS = {
  'arrow-down':           arrowDown,
  'arrow-left':           arrowLeft,
  'arrow-right':          arrowRight,
  'arrow-up':             arrowUp,
  'bell':                 bell,
  'bell-dot':             bellDot,
  'calendar':             calendar,
  'check':                check,
  'chevron-down':         chevronDown,
  'chevron-left':         chevronLeft,
  'chevron-right':        chevronRight,
  'chevron-up':           chevronUp,
  'comment-square-plus':  commentSquarePlus,
  'delete':               deleteIcon,
  'dollar-sign':          dollarSign,
  'dot':                  dot,
  'download':             download,
  'ellipsis-vertical':    ellipsisVertical,
  'external-link':        externalLink,
  'image':                image,
  'languages':            languages,
  'link':                 link,
  'list-filter':          listFilter,
  'log-out':              logOut,
  'pencil':               pencil,
  'plus':                 plus,
  'repeat':               repeat,
  'save':                 save,
  'search':               search,
  'setting':              setting,
  'star':                 star,
  'sticky-note-comment':  stickyNoteComment,
  'trash':                trash,
  'upload':               upload,
  'wand-sparkles':        wandSparkles,
} as const

export type IconName = keyof typeof ICON_ASSETS

export const ICON_NAMES = Object.keys(ICON_ASSETS) as IconName[]

export const ICON_COLOR_DEFAULT = 'var(--color-icon-default)'
export const ICON_COLOR_INVERT = 'var(--color-icon-invert)'

export type IconGlyphProps = {
  name:       IconName
  size?:      number
  color?:     string
  className?: string
}

/** Inline SVG glyph — stroke inherits `color` (use icon tokens). */
export function IconGlyph({
  name,
  size      = 24,
  color     = ICON_COLOR_DEFAULT,
  className = '',
}: IconGlyphProps) {
  return (
    <span
      aria-hidden
      className={[
        'inline-block shrink-0 [&>svg]:block [&>svg]:size-full',
        className,
      ].join(' ')}
      style={{ width: size, height: size, color }}
      dangerouslySetInnerHTML={{ __html: ICON_ASSETS[name] }}
    />
  )
}

export type IconProps = {
  name: IconName
  /** Size in px — Figma baseline is 24 */
  size?: number
  className?: string
  /** Accessible label; omit for decorative icons */
  label?: string
}

export default function Icon({ name, size = 24, className = '', label }: IconProps) {
  return (
    <div
      className={[
        'inline-flex items-center justify-center rounded-xl p-3 bg-white',
        className,
      ].join(' ')}
    >
      <span
        role={label ? 'img' : undefined}
        aria-label={label ?? undefined}
        aria-hidden={label ? undefined : true}
      >
        <IconGlyph name={name} size={size} />
      </span>
    </div>
  )
}

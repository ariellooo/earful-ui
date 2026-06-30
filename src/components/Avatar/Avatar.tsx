/**
 * Avatar — Figma node 5172:8442 (Earful 2026).
 *
 * type: image · initials
 * size: s (48 px) · m (96 px)
 */

import avatarSample from '../../assets/images/avatar-sample.jpg'

export type AvatarType = 'image' | 'initials'
export type AvatarSize = 's' | 'm'

export type AvatarProps = {
  type?:      AvatarType
  size?:      AvatarSize
  /** Up to 2 characters — used when type is initials */
  initials?:  string
  /** Image URL — used when type is image */
  src?:       string
  alt?:       string
  className?: string
}

const SIZE_CLASS: Record<AvatarSize, string> = {
  s: 'size-12',
  m: 'size-24',
}

const INITIALS_TEXT_CLASS: Record<AvatarSize, string> = {
  s: 'font-body font-bold text-[18px] leading-8 tracking-[0.1px]',
  m: 'font-body font-bold text-[32px] leading-[1.25] tracking-[0.25px]',
}

const SHELL_CLASS = [
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
  'border border-greyscale-300 shadow-200',
].join(' ')

export function formatAvatarInitials(value: string, fallback = 'TK'): string {
  const trimmed = value.trim().toUpperCase()
  if (!trimmed) return fallback
  return trimmed.slice(0, 2)
}

export default function Avatar({
  type      = 'image',
  size      = 'm',
  initials  = 'TK',
  src       = avatarSample,
  alt       = 'User avatar',
  className = '',
}: AvatarProps) {
  const sizeClass = SIZE_CLASS[size]

  if (type === 'initials') {
    const label = formatAvatarInitials(initials)

    return (
      <div
        className={[
          SHELL_CLASS,
          'bg-surface-invert',
          sizeClass,
          className,
        ].join(' ')}
        role="img"
        aria-label={alt || `Avatar initials ${label}`}
      >
        <span
          className={[
            INITIALS_TEXT_CLASS[size],
            'select-none text-text-invert whitespace-nowrap',
          ].join(' ')}
        >
          {label}
        </span>
      </div>
    )
  }

  return (
    <div className={[SHELL_CLASS, sizeClass, className].join(' ')}>
      <img
        src={src}
        alt={alt}
        className="size-full object-cover"
      />
    </div>
  )
}

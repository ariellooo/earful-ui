/**
 * Avatar — sourced from Figma node 5172:8442 (Earful 2026).
 *
 * Circular profile photo with shadow-200.
 *
 * size: s (48 px) · m (96 px) · l (144 px)
 */

import avatarSample from '../../assets/images/avatar-sample.jpg'

export type AvatarSize = 's' | 'm' | 'l'

export type AvatarProps = {
  size?:      AvatarSize
  /** Image URL — defaults to local sample photo */
  src?:       string
  alt?:       string
  className?: string
}

const SIZE_PX: Record<AvatarSize, number> = {
  s: 48,
  m: 96,
  l: 144,
}

export default function Avatar({
  size      = 'm',
  src       = avatarSample,
  alt       = 'User avatar',
  className = '',
}: AvatarProps) {
  const dim = SIZE_PX[size]

  return (
    <div
      className={[
        'shrink-0 overflow-hidden rounded-full border border-greyscale-300 shadow-200',
        className,
      ].join(' ')}
      style={{ width: dim, height: dim }}
    >
      <img
        src={src}
        alt={alt}
        className="size-full object-cover"
        width={dim}
        height={dim}
      />
    </div>
  )
}

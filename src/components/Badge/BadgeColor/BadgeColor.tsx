/**
 * ButtonColor — sourced from Figma node 618:4061 (Earful 2026).
 *
 * A solid-filled label badge ("Active") in a chosen colour.
 * Three sizes:
 *   s  24 px tall · 8 px padding  · 4 px radius · 12 px text
 *   m  36 px tall · 16/8 px px/py · 8 px radius · 15 px text
 *   l  48 px tall · 16/8 px px/py · 8 px radius · 15 px text
 */

export type ButtonColorValue = 'green' | 'grey' | 'yellow' | 'red' | 'orange' | 'blue'
export type ButtonColorSize  = 's' | 'm' | 'l'

export type ButtonColorProps = {
  colour?: ButtonColorValue
  size?:   ButtonColorSize
  label?:  string
}

const COLOUR_BG: Record<ButtonColorValue, string> = {
  green:  'bg-semantic-green',
  grey:   'bg-greyscale-500',
  yellow: 'bg-semantic-yellow',
  red:    'bg-semantic-red',
  orange: 'bg-secondary',
  blue:   'bg-primary',
}

export default function ButtonColor({
  colour = 'green',
  size   = 's',
  label  = 'Active',
}: ButtonColorProps) {
  const bg = COLOUR_BG[colour]

  const sizeClasses =
    size === 's' ? 'h-6 px-2 rounded text-[12px]' :
    size === 'm' ? 'h-9 px-4 py-2 rounded-lg text-[15px]' :
                   'h-12 px-4 py-2 rounded-lg text-[15px]'

  return (
    <span
      className={[
        'inline-flex items-center justify-center',
        'font-body font-medium leading-6 tracking-[0.2px] whitespace-nowrap',
        'text-text-invert',
        bg, sizeClasses,
      ].join(' ')}
    >
      {label}
    </span>
  )
}

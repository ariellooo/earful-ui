/**
 * ButtonStar — Figma node 651:5931 (Earful 2026).
 *
 * state="default"  — outline star · greyscale-500 · ghost button
 * state="starred"  — filled star · semantic-yellow · ghost button
 * state="label"    — filled star · semantic-yellow · non-interactive
 * state="main"     — filled star · semantic-yellow · white card + border + shadow-100
 *
 * 48 × 48 px hit area · 8 px padding · 24 px icon · 8 px radius
 */

import star from '../../../assets/icons/function/star.svg?raw'

export type ButtonStarState = 'default' | 'starred' | 'label' | 'main'

export type ButtonStarProps = {
  state?:     ButtonStarState
  className?: string
  onClick?:   () => void
}

const BASE = [
  'inline-flex shrink-0 items-center justify-center',
  'size-12 rounded-lg p-2',
].join(' ')

const INTERACTIVE = [
  'cursor-pointer transition-colors',
  'hover:bg-surface-primary active:bg-surface-disable',
].join(' ')

function starMarkup(filled: boolean): string {
  const svg = star.replace(/\sclass="[^"]*"/g, '')
  if (!filled) return svg
  return svg.replace('fill="none"', 'fill="currentColor"')
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <span
      aria-hidden
      className={[
        'inline-block size-6 shrink-0 [&>svg]:block [&>svg]:size-full',
        filled ? 'text-semantic-yellow' : 'text-greyscale-500',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: starMarkup(filled) }}
    />
  )
}

export default function ButtonStar({
  state     = 'default',
  className = '',
  onClick,
}: ButtonStarProps) {
  if (state === 'main') {
    return (
      <div
        className={[
          BASE,
          'bg-surface-white border border-greyscale-300 shadow-100',
          className,
        ].join(' ')}
        aria-hidden
      >
        <StarIcon filled />
      </div>
    )
  }

  if (state === 'label') {
    return (
      <div className={[BASE, className].join(' ')} aria-hidden>
        <StarIcon filled />
      </div>
    )
  }

  const starred = state === 'starred'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={starred ? 'Remove star' : 'Add star'}
      aria-pressed={starred}
      className={[BASE, INTERACTIVE, className].join(' ')}
    >
      <StarIcon filled={starred} />
    </button>
  )
}

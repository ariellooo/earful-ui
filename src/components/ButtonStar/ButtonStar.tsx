/**
 * ButtonStar — star / favourite button.
 *
 * state="default"  — outline star, transparent bg (interactive)
 * state="starred"  — filled star, transparent bg (interactive)
 * state="label"    — filled star, transparent bg (non-interactive display)
 * state="main"     — filled star, white card with border + shadow (non-interactive display)
 */

import star from '../../assets/icons_function/star.svg?raw'
import { ICON_COLOR_DEFAULT } from '../Icon/Icon'

export type ButtonStarState = 'default' | 'starred' | 'label' | 'main'

export type ButtonStarProps = {
  state?:   ButtonStarState
  onClick?: () => void
}

const STAR_FILLED_COLOR = 'var(--color-secondary)'

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block size-6 shrink-0 [&>svg]:block [&>svg]:size-full"
      style={{ color: filled ? STAR_FILLED_COLOR : ICON_COLOR_DEFAULT }}
      dangerouslySetInnerHTML={{ __html: star }}
    />
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const BASE = 'flex items-center justify-center size-12 rounded-lg p-2'

export default function ButtonStar({ state = 'default', onClick }: ButtonStarProps) {
  if (state === 'main') {
    return (
      <div className={`${BASE} bg-surface-white border border-greyscale-300 shadow-100`}>
        <StarIcon filled />
      </div>
    )
  }

  if (state === 'label') {
    return (
      <div className={BASE}>
        <StarIcon filled />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BASE} cursor-pointer`}
    >
      <StarIcon filled={state === 'starred'} />
    </button>
  )
}

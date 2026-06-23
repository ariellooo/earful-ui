/**
 * ButtonStar — star / favourite button.
 *
 * state="default"  — outline star, transparent bg (interactive)
 * state="starred"  — filled star, transparent bg (interactive)
 * state="label"    — filled star, transparent bg (non-interactive display)
 * state="main"     — filled star, white card with border + shadow (non-interactive display)
 */

export type ButtonStarState = 'default' | 'starred' | 'label' | 'main'

export type ButtonStarProps = {
  state?:   ButtonStarState
  onClick?: () => void
}

// ─── Star icons ───────────────────────────────────────────────────────────────

const STAR_OUTLINE = 'https://www.figma.com/api/mcp/asset/ff71f359-804d-4ecb-9683-a19ccee8589f'
const STAR_FILLED  = 'https://www.figma.com/api/mcp/asset/55629572-e5e3-49a0-83d4-5e037bd4066d'

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <img
      src={filled ? STAR_FILLED : STAR_OUTLINE}
      alt=""
      aria-hidden
      className="block size-6 shrink-0"
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

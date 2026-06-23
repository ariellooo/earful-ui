/**
 * Earful logo sourced from Figma (node 60:686).
 * variant="primary" — icon + "EARFUL" wordmark
 *   outer frame: 114 × 32 px
 *   image content: 114.248 × 24 px, centred vertically
 * variant="icon"    — icon mark only
 *   outer frame: 32 × 32 px
 *   image content: 24 × 24 px, centred
 * Hosted URLs expire after 7 days — replace with local SVGs when ready.
 */
const LOGO_ASSETS = {
  primary: 'https://www.figma.com/api/mcp/asset/a99f7931-3b66-4f32-84b5-091e1e1b676d',
  icon:    'https://www.figma.com/api/mcp/asset/70bb86f4-6a36-494c-ad7f-c2dfeb50030f',
} as const

export type LogoVariant = keyof typeof LOGO_ASSETS

export type LogoProps = {
  /** primary = icon + wordmark · icon = icon only */
  variant?: LogoVariant
  className?: string
}

export default function Logo({ variant = 'primary', className = '' }: LogoProps) {
  if (variant === 'icon') {
    // Icon: 32 × 32 outer frame, mark centred at 24 × 24
    return (
      <div
        className={`relative shrink-0 overflow-hidden ${className}`}
        style={{ width: 32, height: 32 }}
      >
        <img
          src={LOGO_ASSETS.icon}
          alt="Earful"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block"
          style={{ width: 24, height: 24 }}
        />
      </div>
    )
  }

  // Primary: 114 × 32 outer frame, image centred at 114.248 × 24
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: 114, height: 32 }}
    >
      <img
        src={LOGO_ASSETS.primary}
        alt="Earful"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block"
        style={{ width: 114.248, height: 24 }}
      />
    </div>
  )
}

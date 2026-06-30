/**
 * Earful logo — local SVGs from src/assets/logos.
 *
 * variant="primary" — icon + "EARFUL" wordmark · 115 × 32
 * variant="icon"    — icon mark only · 32 × 32
 */

import primaryLogo from '../../assets/logos/earful_primary_logo.svg'
import iconLogo from '../../assets/logos/earful_icon_logo.svg'

const LOGO_ASSETS = {
  primary: primaryLogo,
  icon:    iconLogo,
} as const

export type LogoVariant = keyof typeof LOGO_ASSETS

export type LogoProps = {
  /** primary = icon + wordmark · icon = icon only */
  variant?: LogoVariant
  className?: string
}

export default function Logo({ variant = 'primary', className = '' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <img
        src={LOGO_ASSETS.icon}
        alt="Earful"
        width={32}
        height={32}
        className={`block shrink-0 ${className}`}
      />
    )
  }

  return (
    <img
      src={LOGO_ASSETS.primary}
      alt="Earful"
      width={115}
      height={32}
      className={`block shrink-0 ${className}`}
    />
  )
}

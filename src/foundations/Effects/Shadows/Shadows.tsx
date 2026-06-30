/**
 * Shadows — sourced from Figma node 624:4268 (Earful 2026).
 *
 * variant 100 — single layer · rgba(12,12,13,0.05)
 * variant 200 — two layers · rgba(12,12,13,0.1) + rgba(12,12,13,0.05)
 *
 * Preview: 100×100 px surface-primary square with the shadow applied.
 */

export type ShadowsVariant = '100' | '200'

export type ShadowsProps = {
  variant?: ShadowsVariant
}

const SHADOW_CLASS: Record<ShadowsVariant, string> = {
  '100': 'shadow-100',
  '200': 'shadow-200',
}

export default function Shadows({ variant = '100' }: ShadowsProps) {
  return (
    <div
      className={[
        'size-[100px] shrink-0 bg-surface-primary',
        SHADOW_CLASS[variant],
      ].join(' ')}
    />
  )
}

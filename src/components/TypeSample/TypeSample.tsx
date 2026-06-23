const SAMPLE_PANGRAM = 'The quick brown fox jumps over the lazy dog'
const SAMPLE_LOREM =
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."

export type TypeSampleProps = {
  /** Display name, e.g. "H1 / Heading 1" */
  name: string
  /** Human-readable font description, e.g. "TT Norms Pro (Bold)" */
  fontDescription: string
  /** Human-readable size label, e.g. "40px" */
  sizeLabel: string
  /** Which font family token to use */
  fontFamily: 'display' | 'body'
  /** Font size in px */
  fontSize: number
  /** Font weight */
  fontWeight: 400 | 500 | 700
  /** Line height — unitless ratio or fixed px value */
  lineHeight: number | string
  /** Letter spacing in px */
  letterSpacing?: number
  /** Override the default sample text */
  sample?: string
}

export default function TypeSample({
  name,
  fontDescription,
  sizeLabel,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing = 0,
  sample,
}: TypeSampleProps) {
  const defaultSample = fontSize >= 24 ? SAMPLE_PANGRAM : SAMPLE_LOREM
  const displaySample = sample ?? defaultSample

  const sampleStyle: React.CSSProperties = {
    fontFamily:
      fontFamily === 'display'
        ? 'var(--font-display)'
        : 'var(--font-body)',
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    color: 'var(--color-text-default)',
  }

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-8 py-8">
        {/* Left: metadata */}
        <div className="flex flex-col gap-4 shrink-0 w-[260px]">
          <p className="font-display font-bold text-[22px] leading-[1.25] tracking-[0.2px] text-text-default">
            {name}
          </p>
          <div className="flex flex-col gap-2 font-body font-normal text-greyscale-500">
            <p className="text-[20px] leading-[1.25]">{fontDescription}</p>
            <p className="text-[16px] leading-[1.6] tracking-[0.1px]">{sizeLabel}</p>
          </div>
        </div>

        {/* Right: specimen */}
        <p className="flex-1 text-right" style={sampleStyle}>
          {displaySample}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-t border-greyscale-300 m-0" />
    </div>
  )
}

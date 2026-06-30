type ColorSwatchProps = {
  /** Display label, e.g. "Blue", "900" */
  label: string
  /** Hex string shown below the swatch, e.g. "#2BC7E0" */
  hex: string
  /** Whether to show a border (for near-white swatches) */
  bordered?: boolean
}

export type ColorSwatchItem = {
  label:    string
  hex:      string
  bordered?: boolean
}

export type ColorGroupProps = {
  title:  string
  colors: ColorSwatchItem[]
}

export default function ColorSwatch({ label, hex, bordered = false }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-4 shrink-0">
      <div
        className={[
          'h-[120px] w-[220px] rounded-lg',
          bordered ? 'border border-line-default' : '',
        ].join(' ')}
        style={{ backgroundColor: hex }}
      />
      <div className="flex items-center justify-between w-[220px] text-sm leading-[1.6]">
        <span className="font-body font-bold text-greyscale-900">{label}</span>
        <span className="font-body font-normal text-greyscale-500">{hex}</span>
      </div>
    </div>
  )
}

export function ColorGroup({ title, colors }: ColorGroupProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-body font-bold text-2xl leading-[1.25] tracking-[0.2px] text-brand-indigo">
        {title}
      </h2>
      <div className="flex flex-wrap items-start gap-6">
        {colors.map((color) => (
          <ColorSwatch key={color.label} {...color} />
        ))}
      </div>
    </div>
  )
}

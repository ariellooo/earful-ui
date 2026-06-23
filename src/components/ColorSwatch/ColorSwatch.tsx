type ColorSwatchProps = {
  /** Display label, e.g. "Blue", "900" */
  label: string
  /** Hex string shown below the swatch, e.g. "#2BC7E0" */
  hex: string
  /** Whether to show a border (for near-white swatches) */
  bordered?: boolean
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

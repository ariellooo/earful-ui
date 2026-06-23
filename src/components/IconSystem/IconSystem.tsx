/**
 * System / status icons — Figma node 1069:3628 (Earful 2026).
 *
 * Each icon is a 24×24 composited image built from overlapping vector layers,
 * matching the Figma export exactly.
 *
 * type    : triangle-alert | octagon-warning | circle-info | circle-success | circle-help
 * variant : default | fill | outline
 */

const BASE = 'https://www.figma.com/api/mcp/asset/'
const u = (id: string) => BASE + id

// ─── Asset registry ───────────────────────────────────────────────────────────

const A = {
  // triangle-alert bodies
  ta_dflt: u('7d64df65-8824-4d81-903a-f4d0adedcc68'),
  ta_fill: u('d88385ec-9ac1-4fad-b402-a5cce00749bb'),
  ta_outl: u('455d016a-a283-4201-a90c-1037c693068d'),
  // octagon-warning bodies
  ow_dflt: u('6c69fc52-4afb-4920-972d-c9a26da2aa49'),
  ow_fill: u('415e9b40-daa4-4a9c-9bc0-1862c0f98d75'),
  ow_outl: u('8f9cb6d5-c555-4c35-aa2f-268041f48ab3'),
  // circle-info bodies
  ci_dflt: u('b1cb94f8-bffb-4642-a783-e027bfb24b1f'),
  ci_fill: u('a7d4d8e0-3ada-46a9-b175-d5aab4698ba1'),
  ci_outl: u('92e56238-d9f2-48f8-b1b3-18d002660087'),
  // circle-success bodies + checkmarks
  cs_dflt_body: u('8b926d6d-66be-444e-82e2-05b12d825c8c'),
  cs_fill_body: u('f553f0b5-9f8d-4ef7-9f71-95dd8551feca'),
  cs_outl_body: u('bb84b411-2c65-40c3-bf74-27a1095cc22a'),
  cs_dflt_chk:  u('04edc8e1-05ce-4c64-af5d-13336484bb14'),
  cs_fill_chk:  u('7207f3db-2eaf-4cad-9300-ffcd8e8ad8ac'),
  cs_outl_chk:  u('a78e63a7-17a5-434f-b4b3-86c5a6e94fb4'),
  // circle-help bodies + marks
  ch_dflt: u('b1cb94f8-bffb-4642-a783-e027bfb24b1f'), // same body as ci_dflt
  ch_fill: u('1b2a9dc8-f15c-43f2-a255-e40203790d4b'),
  ch_outl: u('92e56238-d9f2-48f8-b1b3-18d002660087'), // same body as ci_outl
  ch_q_dflt:   u('9969ef54-77b5-4611-be02-8f39a9d7b2c2'), // ? glyph (default + outline)
  ch_q_fill:   u('0af2c513-b663-474c-a641-5245c2cf2c00'), // ? glyph (fill)
  ch_dot_fill: u('18b6859a-e2f5-49bf-b055-e2846d875100'), // dot under ? (fill)
  // shared detail vectors
  stem:        u('b64c99f5-54eb-487e-a3de-131554ff91e0'), // dark vertical stem (!  body)
  dot:         u('ca3a04e5-45ad-4ec4-a216-9a01d635e783'), // dark horizontal dot (! and i)
  ci_i:        u('3f9ecdeb-c216-4b12-907e-a1b1c3614115'), // circle-info "i" stroke
  outl_line_1: u('ed2b6ee5-7720-4bb7-be67-c3885197bdef'), // outline stroke set 1
  outl_line_2: u('b4a126b8-690a-4373-b9c4-45580820c7ee'), // outline stroke set 2
} as const

// ─── Layer type ───────────────────────────────────────────────────────────────

type Layer = {
  url:   string
  outer: string  // absolute-positioning classes for the outer container
  inner: string  // absolute-positioning classes for the inner image wrapper (bleed)
}

// ─── Shared position constants ────────────────────────────────────────────────

const CIR_BODY_OUTER = 'inset-[8.33%]'
const CIR_BODY_INNER = 'inset-[-3.75%]'
const TRI_BODY_OUTER = 'inset-[12.44%_8.34%_12.5%_8.26%]'
const TRI_BODY_INNER = 'inset-[-4.16%_-3.75%]'
const VLINE_INNER    = 'inset-[-18.75%_-0.75px]'
const HLINE_INNER    = 'inset-[-0.75px_-7499.83%]'
const CHK_INNER      = 'inset-[-15%_-9.38%]'
const HELP_Q_INNER   = 'inset-[-12.49%_-12.86%_-12.49%_-12.87%]'

// ─── Layer data per icon × variant ───────────────────────────────────────────

const LAYERS: Record<string, Record<string, Layer[]>> = {
  'triangle-alert': {
    default: [
      { url: A.ta_dflt, outer: TRI_BODY_OUTER, inner: TRI_BODY_INNER },
      { url: A.stem,    outer: 'bottom-[45.83%] left-1/2 right-[49.96%] top-[37.5%]',   inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]',   inner: HLINE_INNER },
    ],
    fill: [
      { url: A.ta_fill, outer: TRI_BODY_OUTER, inner: TRI_BODY_INNER },
      { url: A.stem,    outer: 'bottom-[45.83%] left-1/2 right-[49.96%] top-[37.5%]',   inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]',   inner: HLINE_INNER },
    ],
    outline: [
      { url: A.ta_outl,    outer: TRI_BODY_OUTER, inner: TRI_BODY_INNER },
      { url: A.outl_line_2, outer: 'bottom-[45.83%] left-1/2 right-[49.96%] top-[37.5%]', inner: VLINE_INNER },
      { url: A.outl_line_1, outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
  },
  'octagon-warning': {
    default: [
      { url: A.ow_dflt, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.dot,     outer: 'bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]',  inner: HLINE_INNER },
      { url: A.stem,    outer: 'left-1/2 bottom-1/2 right-1/2 top-[33.33%]',             inner: VLINE_INNER },
    ],
    fill: [
      { url: A.ow_fill, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.dot,     outer: 'bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]',  inner: HLINE_INNER },
      { url: A.stem,    outer: 'left-1/2 bottom-1/2 right-1/2 top-[33.33%]',             inner: VLINE_INNER },
    ],
    outline: [
      { url: A.ow_outl,    outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.outl_line_1, outer: 'bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]', inner: HLINE_INNER },
      { url: A.outl_line_2, outer: 'left-1/2 bottom-1/2 right-1/2 top-[33.33%]',           inner: VLINE_INNER },
    ],
  },
  'circle-info': {
    default: [
      { url: A.ci_dflt, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ci_i,    outer: 'bottom-[33.33%] left-1/2 right-1/2 top-1/2',            inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[66.67%] right-[49.96%] top-[33.33%]',  inner: HLINE_INNER },
    ],
    fill: [
      { url: A.ci_fill, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ci_i,    outer: 'bottom-[33.33%] left-1/2 right-1/2 top-1/2',            inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[66.67%] right-[49.96%] top-[33.33%]',  inner: HLINE_INNER },
    ],
    outline: [
      { url: A.ci_outl, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ci_i,    outer: 'bottom-[33.33%] left-1/2 right-1/2 top-1/2',            inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[66.67%] right-[49.96%] top-[33.33%]',  inner: HLINE_INNER },
    ],
  },
  'circle-success': {
    default: [
      { url: A.cs_dflt_body, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.cs_dflt_chk,  outer: '-translate-y-1/2 aspect-[6/4] left-[33.33%] right-[33.33%] top-[calc(50%+0.5px)]', inner: CHK_INNER },
    ],
    fill: [
      { url: A.cs_fill_body, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.cs_fill_chk,  outer: '-translate-y-1/2 aspect-[6/4] left-[33.33%] right-[33.33%] top-[calc(50%+0.5px)]', inner: CHK_INNER },
    ],
    outline: [
      { url: A.cs_outl_body, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.cs_outl_chk,  outer: '-translate-y-1/2 aspect-[6/4] left-[33.33%] right-[33.33%] top-[calc(50%+0.5px)]', inner: CHK_INNER },
    ],
  },
  'circle-help': {
    default: [
      { url: A.ch_dflt,    outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ch_q_dflt,  outer: 'inset-[29.15%_37.83%_45.83%_37.88%]',                inner: HELP_Q_INNER },
      { url: A.dot,        outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
    fill: [
      { url: A.ch_fill,     outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ch_q_fill,   outer: 'inset-[29.15%_37.83%_45.83%_37.88%]',                inner: HELP_Q_INNER },
      { url: A.ch_dot_fill, outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
    outline: [
      { url: A.ch_outl,   outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ch_q_dflt, outer: 'inset-[29.15%_37.83%_45.83%_37.88%]',                inner: HELP_Q_INNER },
      { url: A.dot,       outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
  },
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export type IconSystemType    = keyof typeof LAYERS
export type IconSystemVariant = 'default' | 'fill' | 'outline'

export const ICON_SYSTEM_TYPES = Object.keys(LAYERS) as IconSystemType[]

export type IconSystemProps = {
  type:      IconSystemType
  variant?:  IconSystemVariant
  /** Size in px — Figma baseline is 24 */
  size?:     number
  className?: string
  /** Accessible label; omit for purely decorative icons */
  label?:    string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function IconSystem({
  type,
  variant   = 'default',
  size      = 24,
  className = '',
  label,
}: IconSystemProps) {
  const layers = LAYERS[type][variant]

  return (
    <div
      className={`relative overflow-hidden inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {layers.map((layer, i) => (
        <div key={i} className={`absolute ${layer.outer}`}>
          <div className={`absolute ${layer.inner}`}>
            <img
              src={layer.url}
              alt=""
              aria-hidden
              className="block size-full"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

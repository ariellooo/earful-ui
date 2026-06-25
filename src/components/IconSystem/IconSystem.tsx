/**
 * System status icons — Figma node 1069:3628 (Earful 2026).
 *
 * type    : triangle-alert | octagon-warning | circle-info | circle-success | circle-help
 * variant : default | fill | outline
 *
 * Layer composites sourced from Figma export (hosted URLs expire after 7 days).
 * Semantic colours are defined in tokens.css as --color-icon-system-*.
 */

const BASE = 'https://www.figma.com/api/mcp/asset/'
const u = (id: string) => BASE + id

// ─── Asset registry (Figma 1069:3628 — Jun 2026 export) ───────────────────────

const A = {
  ta_dflt:  u('3bd69599-01fc-42aa-a760-b19002f128a8'),
  ta_fill:  u('92d3ffea-28c9-4887-8650-ccee1dd2eea0'),
  ta_outl:  u('17f63b21-9bf4-4fbc-8ecb-e6a98ce6cba7'),
  ow_dflt:  u('5adadffd-5fba-4f4f-9356-64f5d5b573a9'),
  ow_fill:  u('05794e01-bf9f-4b12-96c8-9db60a26b8bb'),
  ow_outl:  u('8c881a0d-5305-4e6b-8f73-5d66919add3d'),
  ci_dflt:  u('2f7dd8e7-f238-480c-9837-07195132c8bf'),
  ci_fill:  u('789defdc-7ba2-44e6-abdc-88c26f29c1b2'),
  ci_outl:  u('3429c103-c65a-438e-93bd-371c1900bfbb'),
  cs_dflt_body: u('ccdf0c58-7014-4c73-b36c-db3c1cc3b9c3'),
  cs_fill_body: u('585bb1d3-0b78-436a-bd9f-62ca64eb73e7'),
  cs_outl_body: u('8a224993-ca54-4d45-bf3c-b5f08b82dfb3'),
  cs_dflt_chk:  u('28676a32-79fd-4021-8d11-7c3213fe6ee1'),
  cs_fill_chk:  u('9a3ac258-a7bb-4b8c-a314-f6c519d74385'),
  cs_outl_chk:  u('379f4bda-3e28-4f7c-9826-55bff0f598fd'),
  ch_dflt:  u('2f7dd8e7-f238-480c-9837-07195132c8bf'),
  ch_fill:  u('d12fd9c3-146a-42b6-a0ce-6cf5146f41a3'),
  ch_outl:  u('3429c103-c65a-438e-93bd-371c1900bfbb'),
  ch_q:        u('4bac4f12-bc29-429f-91e0-61a4fbf83165'),
  ch_q_fill:   u('cd5a1cdb-cc20-40a2-bda7-30ba832e1387'),
  ch_dot_fill: u('52db6cb8-5d25-4bd7-8c8c-0b907a3465b4'),
  stem:        u('b48a4b38-fe44-44fb-a22b-600e13f6c277'),
  dot:         u('e43b3012-c55f-4a4a-90f9-694e1d823f53'),
  ci_i:        u('c70a5168-19ce-4df0-b7e2-e42aa8d0c6ad'),
  outl_line_1: u('40b73230-55ac-4fdb-a5f7-200e2f93ae14'),
  outl_line_2: u('641a7a37-05ea-49d1-a5d6-9b4b2459f1d1'),
} as const

// ─── Layer type ───────────────────────────────────────────────────────────────

type Layer = {
  url:   string
  outer: string
  inner: string
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
      { url: A.dot,     outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
    fill: [
      { url: A.ta_fill, outer: TRI_BODY_OUTER, inner: TRI_BODY_INNER },
      { url: A.stem,    outer: 'bottom-[45.83%] left-1/2 right-[49.96%] top-[37.5%]',   inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
    outline: [
      { url: A.ta_outl,     outer: TRI_BODY_OUTER, inner: TRI_BODY_INNER },
      { url: A.outl_line_2, outer: 'bottom-[45.83%] left-1/2 right-[49.96%] top-[37.5%]', inner: VLINE_INNER },
      { url: A.outl_line_1, outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
  },
  'octagon-warning': {
    default: [
      { url: A.ow_dflt, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.dot,     outer: 'bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]', inner: HLINE_INNER },
      { url: A.stem,    outer: 'left-1/2 bottom-1/2 right-1/2 top-[33.33%]',           inner: VLINE_INNER },
    ],
    fill: [
      { url: A.ow_fill, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.dot,     outer: 'bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]', inner: HLINE_INNER },
      { url: A.stem,    outer: 'left-1/2 bottom-1/2 right-1/2 top-[33.33%]',           inner: VLINE_INNER },
    ],
    outline: [
      { url: A.ow_outl,     outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.outl_line_1, outer: 'bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]', inner: HLINE_INNER },
      { url: A.outl_line_2, outer: 'left-1/2 bottom-1/2 right-1/2 top-[33.33%]',         inner: VLINE_INNER },
    ],
  },
  'circle-info': {
    default: [
      { url: A.ci_dflt, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ci_i,    outer: 'bottom-[33.33%] left-1/2 right-1/2 top-1/2',           inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[66.67%] right-[49.96%] top-[33.33%]', inner: HLINE_INNER },
    ],
    fill: [
      { url: A.ci_fill, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ci_i,    outer: 'bottom-[33.33%] left-1/2 right-1/2 top-1/2',           inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[66.67%] right-[49.96%] top-[33.33%]', inner: HLINE_INNER },
    ],
    outline: [
      { url: A.ci_outl, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ci_i,    outer: 'bottom-[33.33%] left-1/2 right-1/2 top-1/2',           inner: VLINE_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[66.67%] right-[49.96%] top-[33.33%]', inner: HLINE_INNER },
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
      { url: A.ch_dflt, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ch_q,    outer: 'inset-[29.15%_37.83%_45.83%_37.88%]',                inner: HELP_Q_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
    fill: [
      { url: A.ch_fill,     outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ch_q_fill,   outer: 'inset-[29.15%_37.83%_45.83%_37.88%]',                inner: HELP_Q_INNER },
      { url: A.ch_dot_fill, outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
    outline: [
      { url: A.ch_outl, outer: CIR_BODY_OUTER, inner: CIR_BODY_INNER },
      { url: A.ch_q,    outer: 'inset-[29.15%_37.83%_45.83%_37.88%]',                inner: HELP_Q_INNER },
      { url: A.dot,     outer: 'left-1/2 bottom-[29.17%] right-[49.96%] top-[70.83%]', inner: HLINE_INNER },
    ],
  },
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export type IconSystemType    = keyof typeof LAYERS
export type IconSystemVariant = 'default' | 'fill' | 'outline'

export const ICON_SYSTEM_TYPES    = Object.keys(LAYERS) as IconSystemType[]
export const ICON_SYSTEM_VARIANTS = ['default', 'fill', 'outline'] as const

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

function IconLayer({ layer }: { layer: Layer }) {
  return (
    <div className={`absolute ${layer.outer}`}>
      <div className={`absolute ${layer.inner}`}>
        <img src={layer.url} alt="" aria-hidden className="block size-full max-w-none" />
      </div>
    </div>
  )
}

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
      {layers.map((layer, i) => <IconLayer key={i} layer={layer} />)}
    </div>
  )
}

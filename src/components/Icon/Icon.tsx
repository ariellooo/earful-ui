/**
 * Icon assets sourced from Figma (node 67:567).
 * These hosted URLs expire after 7 days — replace with local SVGs or an
 * icon library once you have them exported.
 */
export const ICON_ASSETS = {
  'arrow-down':           'https://www.figma.com/api/mcp/asset/dfba6150-3127-462a-b8bf-c6c73371f2d2',
  'arrow-left':           'https://www.figma.com/api/mcp/asset/2871aed7-b03e-4db5-a648-1def86e721f2',
  'arrow-right':          'https://www.figma.com/api/mcp/asset/6776a3cc-934a-4cc9-87fe-d8d954275338',
  'arrow-up':             'https://www.figma.com/api/mcp/asset/4a4c3009-d4f1-4534-add2-2921920a7b76',
  'bell':                 'https://www.figma.com/api/mcp/asset/b44ad1c9-1841-4bf6-b34e-529e0168b64a',
  'bell-dot':             'https://www.figma.com/api/mcp/asset/96798621-fd26-4edc-b685-444cb6f33500',
  'calendar':             'https://www.figma.com/api/mcp/asset/aef1409c-a5e7-42bd-a6d6-80096af6227f',
  'check':                'https://www.figma.com/api/mcp/asset/2265f70e-56d4-4718-bd26-58d3476451b1',
  'chevron-down':         'https://www.figma.com/api/mcp/asset/3125d198-98d3-4f4b-af82-6cedd54e4497',
  'chevron-left':         'https://www.figma.com/api/mcp/asset/40cb3ba0-5e63-4a01-ae04-35b58a44bf3a',
  'chevron-right':        'https://www.figma.com/api/mcp/asset/8d881f0a-cc3b-456a-931d-641853db39d8',
  'chevron-up':           'https://www.figma.com/api/mcp/asset/9d18aa37-1a2c-4171-92ac-54163a774f56',
  'comment-square-plus':  'https://www.figma.com/api/mcp/asset/bbdf7490-78bc-419b-986d-33748ac782cc',
  'delete':               'https://www.figma.com/api/mcp/asset/04fb4be1-9afe-45e6-bc20-188a390ae8f6',
  'dollar-sign':          'https://www.figma.com/api/mcp/asset/d942c895-9f77-48c2-9294-c78521e418c0',
  'dot':                  'https://www.figma.com/api/mcp/asset/5159f145-7c53-46b3-9183-22159008d736',
  'download':             'https://www.figma.com/api/mcp/asset/da1d71ce-0cb0-4b73-a742-ba7f89f084cf',
  'ellipsis-vertical':    'https://www.figma.com/api/mcp/asset/4d4cb22a-1a31-4b81-87c1-9a84c9534933',
  'external-link':        'https://www.figma.com/api/mcp/asset/0bde88df-adc0-4ab8-9f7a-3ec4f1f0cb1d',
  'image':                'https://www.figma.com/api/mcp/asset/0774c186-9ece-47e4-b509-9e7e1ecce7b2',
  'languages':            'https://www.figma.com/api/mcp/asset/2672ea86-dc6c-452f-9c4e-10db05e72dc0',
  'link':                 'https://www.figma.com/api/mcp/asset/1ca03094-a5a0-4e51-a270-bf4d9f175b84',
  'list-filter':          'https://www.figma.com/api/mcp/asset/b9023892-18ea-4fb1-b4a1-0a371327b0bb',
  'log-out':              'https://www.figma.com/api/mcp/asset/53441955-6a72-46bb-a6e9-d4ba87d2802e',
  'pencil':               'https://www.figma.com/api/mcp/asset/ac9ca70b-ce4f-4b5b-b239-e824c922dd6c',
  'plus':                 'https://www.figma.com/api/mcp/asset/c75f3ab7-a122-4452-96fb-b9ca4331802e',
  'repeat':               'https://www.figma.com/api/mcp/asset/83013050-57d1-4508-a67b-0fb5c8c89e64',
  'save':                 'https://www.figma.com/api/mcp/asset/5f29b2cb-f668-49a0-ad42-39d712d0d6a8',
  'search':               'https://www.figma.com/api/mcp/asset/71ddfb5a-7e0d-419f-96b0-443eb1e20171',
  'setting':              'https://www.figma.com/api/mcp/asset/7ae89a10-8d6b-437c-96ae-809b46d9d61d',
  'star':                 'https://www.figma.com/api/mcp/asset/b0b5ab03-ee9d-479b-a9e9-236c4b2668fe',
  'sticky-note-comment':  'https://www.figma.com/api/mcp/asset/e31338fc-38bd-432e-8444-26f2fec7fd92',
  'trash':                'https://www.figma.com/api/mcp/asset/46e7b75e-221f-4480-a735-f0e637738841',
  'upload':               'https://www.figma.com/api/mcp/asset/26eca616-7074-4156-b178-0c510a80c2bf',
  'wand-sparkles':        'https://www.figma.com/api/mcp/asset/ac1b4811-b7dd-40ed-a61d-925359267d99',
} as const

export type IconName = keyof typeof ICON_ASSETS

export const ICON_NAMES = Object.keys(ICON_ASSETS) as IconName[]

export const ICON_COLOR_DEFAULT = 'var(--color-icon-default)'
export const ICON_COLOR_INVERT = 'var(--color-icon-invert)'

export type IconProps = {
  name: IconName
  /** Size in px — Figma baseline is 24 */
  size?: number
  className?: string
  /** Accessible label; omit for decorative icons */
  label?: string
}

export default function Icon({ name, size = 24, className = '', label }: IconProps) {
  return (
    <div
      className={[
        'inline-flex items-center justify-center rounded-xl p-3 bg-white',
        className,
      ].join(' ')}
    >
      <span
        role={label ? 'img' : undefined}
        aria-label={label ?? undefined}
        aria-hidden={label ? undefined : true}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          flexShrink: 0,
          backgroundColor: ICON_COLOR_DEFAULT,
          WebkitMaskImage: `url(${ICON_ASSETS[name]})`,
          maskImage: `url(${ICON_ASSETS[name]})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    </div>
  )
}

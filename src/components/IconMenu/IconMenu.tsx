/**
 * Sidebar navigation icons sourced from Figma (node 41:138).
 * state="light" — dark icon on a light background (inactive sidebar item)
 * state="dark"  — white icon on the brand-indigo background (dark sidebar)
 * Hosted URLs expire after 7 days — replace with local SVGs when ready.
 */
export const ICON_MENU_ASSETS = {
  dashboard:              'https://www.figma.com/api/mcp/asset/83ed3148-88dc-47ea-9a40-9953a3711f73',
  window:                 'https://www.figma.com/api/mcp/asset/7a77e796-ff51-4af7-9c36-4df34d6ae0c2',
  bot:                    'https://www.figma.com/api/mcp/asset/58e82a14-0d43-472f-87f2-77e8178f070f',
  'shield-check':         'https://www.figma.com/api/mcp/asset/faf94f40-21c3-4dd2-a91a-bfe54065ca7c',
  'message-square-text':  'https://www.figma.com/api/mcp/asset/3715fff4-2db4-4765-a9ed-41aaeb73bbc9',
  hash:                   'https://www.figma.com/api/mcp/asset/5be5fdcb-d8ce-4674-9f16-59a68bcbd4d8',
  user:                   'https://www.figma.com/api/mcp/asset/3a108417-cd1f-4174-881a-a09e95d7f83f',
  seeding:                'https://www.figma.com/api/mcp/asset/1891bca2-dd5d-4a84-abcc-a722c1c53136',
  'scan-face':            'https://www.figma.com/api/mcp/asset/9c185b4f-fa77-4dc8-b785-80b7629a2bdc',
} as const

export type IconMenuName  = keyof typeof ICON_MENU_ASSETS
export type IconMenuState = 'light' | 'dark'

export const ICON_MENU_NAMES = Object.keys(ICON_MENU_ASSETS) as IconMenuName[]

export type IconMenuProps = {
  name: IconMenuName
  /** light = dark icon on white bg · dark = white icon on indigo bg */
  state?: IconMenuState
  /** Size in px — Figma baseline is 24 */
  size?: number
  className?: string
  /** Accessible label; omit for decorative icons */
  label?: string
}

export default function IconMenu({
  name,
  state = 'light',
  size = 24,
  className = '',
  label,
}: IconMenuProps) {
  const isDark = state === 'dark'

  return (
    <div
      className={[
        'inline-flex items-center justify-center rounded-xl p-3',
        isDark ? 'bg-brand-indigo' : 'bg-white',
        className,
      ].join(' ')}
    >
      <img
        src={ICON_MENU_ASSETS[name]}
        alt={label ?? ''}
        aria-hidden={label ? undefined : true}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          filter: isDark ? 'brightness(0) invert(1)' : 'none',
        }}
      />
    </div>
  )
}

/**
 * Sidebar navigation icons — local SVGs from src/assets/icon_menu.
 */
import { ICON_COLOR_DEFAULT } from '../Function/IconFunction'

import layoutDashboard from '../../../assets/icons/menu/layout-dashboard.svg?raw'
import appWindow from '../../../assets/icons/menu/app-window.svg?raw'
import bot from '../../../assets/icons/menu/bot.svg?raw'
import shieldCheck from '../../../assets/icons/menu/shield-check.svg?raw'
import messageSquareText from '../../../assets/icons/menu/message-square-text.svg?raw'
import hash from '../../../assets/icons/menu/hash.svg?raw'
import user from '../../../assets/icons/menu/user.svg?raw'
import seeding from '../../../assets/icons/menu/seeding.svg?raw'
import scanFace from '../../../assets/icons/menu/scan-face.svg?raw'

export const ICON_MENU_ASSETS = {
  dashboard:              layoutDashboard,
  window:                 appWindow,
  bot:                    bot,
  'shield-check':         shieldCheck,
  'message-square-text':  messageSquareText,
  hash:                   hash,
  user:                   user,
  seeding:                seeding,
  'scan-face':            scanFace,
} as const

export type IconMenuName = keyof typeof ICON_MENU_ASSETS

export const ICON_MENU_NAMES = Object.keys(ICON_MENU_ASSETS) as IconMenuName[]

export type IconMenuProps = {
  name: IconMenuName
  /** Size in px — Figma baseline is 24 */
  size?: number
  className?: string
  /** Accessible label; omit for decorative icons */
  label?: string
}

export default function IconMenu({ name, size = 24, className = '', label }: IconMenuProps) {
  return (
    <span
      className={['inline-flex items-center justify-center', className].join(' ')}
      style={{ width: size, height: size }}
    >
      <span
        role={label ? 'img' : undefined}
        aria-label={label ?? undefined}
        aria-hidden={label ? undefined : true}
        className="inline-block shrink-0 size-full [&>svg]:block [&>svg]:size-full"
        style={{ color: ICON_COLOR_DEFAULT }}
        dangerouslySetInnerHTML={{ __html: ICON_MENU_ASSETS[name] }}
      />
    </span>
  )
}

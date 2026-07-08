/**
 * Header — sourced from Figma node 156:561 (Earful 2026).
 *
 * Page title on the left · SearchBar + ButtonSquare (bell) + Avatar on the right.
 * Trailing actions are right-aligned with pr-6 (24 px) from the header edge.
 * 16 px gap between search · bell · avatar.
 *
 * Dashboard shell: outer wrapper uses h-[88px] pt-6 pb-4 so the bar bottom
 * aligns with the Sidebar divider (Figma 626:6146).
 *
 * Bell opens notification dropdown · Avatar opens profile dropdown (right-aligned).
 * Panels render in an absolute layer (top-full · z-30) so they overlay TopBar and content.
 */

import SearchBar from '../SearchBar/SearchBar'
import ButtonSquare from '../../components/Button/ButtonSquare/ButtonSquare'
import Avatar from '../../components/Avatar/Avatar'
import Dropdown, {
  PROFILE_ITEMS,
  type DropdownItem,
  type DropdownNotificationItem,
} from '../../components/Dropdown/Dropdown'

export type HeaderPanel = 'profile' | 'notification' | null

export type HeaderProps = {
  title?:               string
  searchPlaceholder?:   string
  openPanel?:           HeaderPanel
  onPanelChange?:       (panel: HeaderPanel) => void
  onProfileSelect?:     (item: DropdownItem) => void
  onNotification?:    (item: DropdownNotificationItem) => void
  className?:           string
}

export default function Header({
  title             = 'Dashboard',
  searchPlaceholder = 'Search',
  openPanel         = null,
  onPanelChange,
  onProfileSelect,
  onNotification,
  className         = '',
}: HeaderProps) {
  const togglePanel = (panel: NonNullable<HeaderPanel>) => {
    onPanelChange?.(openPanel === panel ? null : panel)
  }

  const closePanel = () => onPanelChange?.(null)

  return (
    <div className={['relative w-full', className].join(' ')}>
      <header className="flex h-12 min-h-12 w-full items-center justify-between">
        <h1 className="font-body font-bold text-[32px] leading-[1.25] tracking-[0.25px] text-text-default whitespace-nowrap">
          {title}
        </h1>

        <div className="flex shrink-0 items-center gap-4 pr-6">
          <SearchBar placeholder={searchPlaceholder} />
          <ButtonSquare
            type="icon"
            size="m"
            icon="bell-dot"
            onClick={() => togglePanel('notification')}
          />
          <button
            type="button"
            aria-label="Open profile menu"
            aria-expanded={openPanel === 'profile'}
            onClick={() => togglePanel('profile')}
            className="rounded-full cursor-pointer focus:outline-none"
          >
            <Avatar size="s" />
          </button>
        </div>
      </header>

      {openPanel === 'notification' && (
        <div className="absolute top-full right-0 z-30 mt-2 pr-6">
          <Dropdown
            variant="notification"
            onClose={closePanel}
            onNotification={onNotification}
          />
        </div>
      )}

      {openPanel === 'profile' && (
        <div className="absolute top-full right-0 z-30 mt-2 pr-6">
          <Dropdown
            variant="profile"
            items={PROFILE_ITEMS}
            onClose={closePanel}
            onSelect={onProfileSelect}
          />
        </div>
      )}
    </div>
  )
}

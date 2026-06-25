/**
 * Header — sourced from Figma node 156:561 (Earful 2026).
 *
 * Page title on the left · SearchBar + ButtonSquare (bell) + Avatar on the right.
 * 1116 px wide · 16 px gap between trailing actions.
 *
 * Bell opens notification dropdown · Avatar opens profile dropdown (right-aligned).
 */

import SearchBar from '../SearchBar/SearchBar'
import ButtonSquare from '../ButtonSquare/ButtonSquare'
import Avatar from '../Avatar/Avatar'
import Dropdown, {
  PROFILE_ITEMS,
  type DropdownItem,
  type DropdownNotificationItem,
} from '../Dropdown/Dropdown'

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
    <div className={['flex w-full max-w-[1116px] flex-col gap-2', className].join(' ')}>
      <header className="flex w-full items-center justify-between">
        <h1 className="font-body font-bold text-[32px] leading-[1.25] tracking-[0.25px] text-text-default whitespace-nowrap">
          {title}
        </h1>

        <div className="flex shrink-0 items-center gap-4">
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
        <div className="self-end">
          <Dropdown
            variant="notification"
            onClose={closePanel}
            onNotification={onNotification}
          />
        </div>
      )}

      {openPanel === 'profile' && (
        <div className="self-end">
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

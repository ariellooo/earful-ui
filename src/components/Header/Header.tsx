/**
 * Header — sourced from Figma node 156:561 (Earful 2026).
 *
 * Page title on the left · SearchBar + ButtonSquare (bell) + Avatar on the right.
 * 1116 px wide · 16 px gap between trailing actions.
 */

import SearchBar from '../SearchBar/SearchBar'
import ButtonSquare from '../ButtonSquare/ButtonSquare'
import Avatar from '../Avatar/Avatar'

export type HeaderProps = {
  title?:               string
  searchPlaceholder?:   string
  className?:           string
}

export default function Header({
  title             = 'Dashboard',
  searchPlaceholder = 'Search',
  className         = '',
}: HeaderProps) {
  return (
    <header
      className={[
        'flex w-full max-w-[1116px] items-center justify-between',
        className,
      ].join(' ')}
    >
      <h1 className="font-body font-bold text-[32px] leading-[1.25] tracking-[0.25px] text-text-default whitespace-nowrap">
        {title}
      </h1>

      <div className="flex shrink-0 items-center gap-4">
        <SearchBar placeholder={searchPlaceholder} />
        <ButtonSquare type="icon" size="m" icon="bell-dot" />
        <Avatar size="s" />
      </div>
    </header>
  )
}

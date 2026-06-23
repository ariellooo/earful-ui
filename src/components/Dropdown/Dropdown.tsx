/**
 * Dropdown — Figma nodes 906:5783 (profile) · 900:3699 (notification) · 918:7213 (edit) · 901:4668 (status).
 *
 * profile:      212 px · header + icon rows
 * notification: 528 px · header + message + date + unread dot
 * edit:         130 px · icon rows only (no header)
 * status:       212 px · checkbox rows (24 px row height)
 *               · default: header + close · compact: no header (5217:4017)
 * strategy:     212 px · checkbox rows (24 px row height)
 *               · default: header + close (5218:4293) · compact: no header
 */

import type { ReactNode } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import { ICON_ASSETS, type IconName } from '../Icon/Icon'

export type DropdownVariant = 'profile' | 'notification' | 'edit' | 'status' | 'strategy'

/** Checkbox dropdown sub-layout — Status 5217:4017 · Strategy 5218:4293. */
export type StatusLayout = 'default' | 'compact'

export type StrategyLayout = StatusLayout

export type DropdownItem = {
  icon:  IconName
  label: string
}

export type DropdownStatusItem = {
  label:    string
  checked?: boolean
}

/** Same shape as status rows — used by the strategy variant. */
export type DropdownStrategyItem = DropdownStatusItem

export type DropdownNotificationItem = {
  message: string
  date:    string
  unread?: boolean
}

export type DropdownProps = {
  variant?:        DropdownVariant
  title?:          string
  items?:          DropdownItem[]
  statusItems?:    DropdownStatusItem[]
  /** Only applies when `variant="status"`. */
  statusLayout?:   StatusLayout
  strategyItems?: DropdownStrategyItem[]
  /** Only applies when `variant="strategy"`. */
  strategyLayout?: StrategyLayout
  /** Notification row placeholder — used when `notifications` is omitted. */
  message?:        string
  date?:           string
  notifications?:  DropdownNotificationItem[]
  onClose?:        () => void
  onSelect?:       (item: DropdownItem) => void
  onStatusChange?:   (item: DropdownStatusItem, checked: boolean) => void
  onStrategyChange?: (item: DropdownStrategyItem, checked: boolean) => void
  onNotification?: (item: DropdownNotificationItem) => void
  className?:      string
}

const PROFILE_ITEMS: DropdownItem[] = [
  { icon: 'pencil',      label: 'Edit Profile' },
  { icon: 'dollar-sign', label: 'Credit Balance' },
  { icon: 'setting',     label: 'Setting' },
  { icon: 'log-out',     label: 'Log Out' },
]

const EDIT_ITEMS: DropdownItem[] = [
  { icon: 'pencil', label: 'Edit' },
  { icon: 'trash',  label: 'Delete' },
]

const STATUS_ITEMS: DropdownStatusItem[] = [
  { label: 'Draft' },
  { label: 'Inactive' },
  { label: 'Launched' },
  { label: 'Completed' },
]

const STRATEGY_ITEMS: DropdownStrategyItem[] = [
  { label: 'Dilution' },
  { label: 'Distraction' },
  { label: 'Exposure' },
  { label: 'Neutralization' },
  { label: 'Market Intelligence' },
]

const DEFAULT_MESSAGE = 'Lorem ipsum dolor sit amet'
const DEFAULT_DATE    = '03-18'

const WIDTH: Record<DropdownVariant, string> = {
  profile:      'w-[212px]',
  notification: 'w-[528px]',
  edit:         'w-[130px]',
  status:       'w-[212px]',
  strategy:     'w-[212px]',
}

function buildNotifications(
  message: string,
  date: string,
  notifications?: DropdownNotificationItem[],
): DropdownNotificationItem[] {
  if (notifications) return notifications
  return [
    { message, date, unread: true },
    { message, date, unread: true },
  ]
}

// ─── Icon via mask ────────────────────────────────────────────────────────────

function MaskIcon({
  name,
  size  = 24,
  color = '#334155',
}: {
  name:  IconName
  size?: number
  color?: string
}) {
  return (
    <span
      aria-hidden
      style={{
        display:            'inline-block',
        width:              size,
        height:             size,
        flexShrink:         0,
        backgroundColor:    color,
        WebkitMaskImage:    `url(${ICON_ASSETS[name]})`,
        maskImage:          `url(${ICON_ASSETS[name]})`,
        WebkitMaskSize:     'contain',
        maskSize:           'contain',
        WebkitMaskRepeat:   'no-repeat',
        maskRepeat:         'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition:       'center',
      }}
    />
  )
}

// ─── Shared shell ─────────────────────────────────────────────────────────────

function DropdownShell({
  title,
  widthClass,
  onClose,
  children,
  className,
  showHeader = true,
}: {
  title?:      string
  widthClass:  string
  onClose?:    () => void
  children:    ReactNode
  className?:  string
  showHeader?: boolean
}) {
  return (
    <div
      className={[
        'flex flex-col items-start rounded-lg border border-greyscale-300',
        'bg-surface-white py-2 shadow-200',
        widthClass,
        className,
      ].join(' ')}
      role="menu"
      aria-label={title ?? 'Menu'}
    >
      <div className="flex w-full flex-col gap-2 px-2">
        {showHeader && title && (
          <>
            <div className="flex h-9 w-full items-center">
              <p className="flex-1 p-2 font-body font-bold text-[15px] leading-6 tracking-[0.2px] text-brand-indigo">
                {title}
              </p>
              <div className="flex size-10 shrink-0 items-center justify-center p-2">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={onClose}
                  className="inline-flex size-6 items-center justify-center rounded hover:bg-surface-primary transition-colors focus:outline-none"
                >
                  <MaskIcon name="delete" />
                </button>
              </div>
            </div>
            <div className="h-px w-full bg-greyscale-300" />
          </>
        )}
        {children}
      </div>
    </div>
  )
}

function CheckboxMenuRows({
  items,
  onChange,
}: {
  items:    DropdownStatusItem[]
  onChange?: (item: DropdownStatusItem, checked: boolean) => void
}) {
  return items.map((item) => {
    const checked = item.checked ?? false

    return (
      <button
        key={item.label}
        type="button"
        role="menuitemcheckbox"
        aria-checked={checked}
        onClick={() => onChange?.(item, !checked)}
        className="flex h-6 w-full items-center bg-surface-white hover:bg-surface-primary transition-colors focus:outline-none"
      >
        <div className="flex h-6 w-10 shrink-0 items-center justify-center pl-2">
          <Checkbox
            readOnly
            status={checked ? 'checked' : 'uncheck'}
          />
        </div>
        <span className="min-w-0 flex-1 py-0 pl-0 pr-2 text-left font-body font-normal text-[15px] leading-6 text-text-default">
          {item.label}
        </span>
      </button>
    )
  })
}

function IconMenuRows({
  items,
  onSelect,
}: {
  items:    DropdownItem[]
  onSelect?: (item: DropdownItem) => void
}) {
  return items.map((item) => (
    <button
      key={item.label}
      type="button"
      role="menuitem"
      onClick={() => onSelect?.(item)}
      className="flex h-9 w-full items-center bg-surface-white hover:bg-surface-primary transition-colors focus:outline-none"
    >
      <div className="flex size-10 shrink-0 items-center justify-center p-2">
        <MaskIcon name={item.icon} />
      </div>
      <span className="min-w-0 flex-1 p-2 text-left font-body font-normal text-[15px] leading-6 text-text-default">
        {item.label}
      </span>
    </button>
  ))
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Dropdown({
  variant         = 'profile',
  title,
  items,
  statusItems     = STATUS_ITEMS,
  statusLayout    = 'default',
  strategyItems   = STRATEGY_ITEMS,
  strategyLayout  = 'default',
  message         = DEFAULT_MESSAGE,
  date            = DEFAULT_DATE,
  notifications,
  onClose,
  onSelect,
  onStatusChange,
  onStrategyChange,
  onNotification,
  className       = '',
}: DropdownProps) {
  const resolvedItems =
    items ?? (variant === 'edit' ? EDIT_ITEMS : PROFILE_ITEMS)

  const resolvedTitle =
    title ??
    (variant === 'notification'
      ? 'Notification'
      : variant === 'status'
        ? 'Status'
        : variant === 'strategy'
          ? 'Strategy'
          : 'Profile')

  if (variant === 'edit') {
    return (
      <DropdownShell
        title="Edit"
        widthClass={WIDTH.edit}
        showHeader={false}
        className={className}
      >
        <IconMenuRows items={resolvedItems} onSelect={onSelect} />
      </DropdownShell>
    )
  }

  if (variant === 'notification') {
    const rows = buildNotifications(message, date, notifications)

    return (
      <DropdownShell
        title={resolvedTitle}
        widthClass={WIDTH.notification}
        onClose={onClose}
        className={className}
      >
        {rows.map((item, index) => (
          <button
            key={`${item.message}-${item.date}-${index}`}
            type="button"
            role="menuitem"
            onClick={() => onNotification?.(item)}
            className="flex h-9 w-full items-center bg-surface-white hover:bg-surface-primary transition-colors focus:outline-none"
          >
            <span className="min-w-0 flex-1 truncate p-2 text-left font-body font-normal text-[15px] leading-6 text-text-default">
              {item.message}
            </span>
            <span className="flex min-w-[80px] shrink-0 items-center justify-end p-2 font-body font-normal text-[10px] leading-4 text-text-default">
              {item.date}
            </span>
            <div className="flex size-10 shrink-0 items-center justify-center p-2">
              {item.unread !== false && (
                <MaskIcon name="dot" color="#2bc7e0" />
              )}
            </div>
          </button>
        ))}
      </DropdownShell>
    )
  }

  if (variant === 'status') {
    const showHeader = statusLayout !== 'compact'

    return (
      <DropdownShell
        title={resolvedTitle}
        widthClass={WIDTH.status}
        onClose={onClose}
        showHeader={showHeader}
        className={className}
      >
        <CheckboxMenuRows items={statusItems} onChange={onStatusChange} />
      </DropdownShell>
    )
  }

  if (variant === 'strategy') {
    const showHeader = strategyLayout !== 'compact'

    return (
      <DropdownShell
        title={resolvedTitle}
        widthClass={WIDTH.strategy}
        onClose={onClose}
        showHeader={showHeader}
        className={className}
      >
        <CheckboxMenuRows items={strategyItems} onChange={onStrategyChange} />
      </DropdownShell>
    )
  }

  return (
    <DropdownShell
      title={resolvedTitle}
      widthClass={WIDTH.profile}
      onClose={onClose}
      className={className}
    >
      <IconMenuRows items={resolvedItems} onSelect={onSelect} />
    </DropdownShell>
  )
}

export { STATUS_ITEMS, STRATEGY_ITEMS }

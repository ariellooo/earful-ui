/**
 * Table — Figma nodes 164:835 (table-1) · 314:1436 (table-2) · 314:1620 (table-3).
 *
 * Columns: checkbox · Topics · Owner · Create at · Update time ·
 *           [Last sent at] · [Test] · [Log] · Status · actions
 * Header 64 px · body rows 48 px · 8 px row gap · white rounded header
 */

import Checkbox, { type CheckboxStatus } from '../Checkbox/Checkbox'
import Icon from '../Icon/Icon'
import Toggle from '../Toggle/Toggle'

export type TableRow = {
  id:           string
  topic:        string
  owner:        string
  createdAt:    string
  updatedAt:    string
  lastSentAt?:  string
  status:       boolean
  selected?:    boolean
}

export type TableProps = {
  rows?:              TableRow[]
  showLastSentAt?:    boolean
  showTest?:          boolean
  showLog?:           boolean
  selectAllStatus?:   CheckboxStatus
  onSelectAll?:       () => void
  onSelectRow?:       (id: string) => void
  onTest?:            (id: string) => void
  onLog?:             (id: string) => void
  onStatusChange?:    (id: string, status: boolean) => void
  onMore?:            (id: string) => void
  className?:         string
}

const HEADER_TEXT = [
  'font-body font-bold text-[15px] leading-6 tracking-[0.2px]',
  'text-text-default break-words flex-1 min-w-0',
].join(' ')

const BODY_TEXT = [
  'font-body font-normal text-[15px] leading-6',
  'text-text-default break-words flex-1 min-w-0',
].join(' ')

const COLOUR_BTN = [
  'inline-flex h-6 shrink-0 items-center justify-center rounded',
  'px-3 py-1.5 shadow-200',
  'font-body font-normal text-[10px] leading-4 text-text-invert whitespace-nowrap',
  'transition-colors active:opacity-90',
].join(' ')

function MoreButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="More actions"
      className={[
        'flex size-10 shrink-0 items-center justify-center rounded-lg p-1.5',
        'hover:bg-surface-primary transition-colors',
      ].join(' ')}
    >
      <Icon
        name="ellipsis-vertical"
        size={24}
        className="rotate-90 bg-transparent p-0 rounded-none"
      />
    </button>
  )
}

function TestButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        COLOUR_BTN,
        'w-[60px] bg-primary hover:bg-brand-tint-blue',
      ].join(' ')}
    >
      Test
    </button>
  )
}

function LogButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        COLOUR_BTN,
        'w-14 bg-semantic-green hover:bg-brand-shade-mint',
      ].join(' ')}
    >
      Log
    </button>
  )
}

function TableHeader({
  selectAllStatus,
  showLastSentAt,
  showTest,
  showLog,
  onSelectAll,
}: {
  selectAllStatus:  CheckboxStatus
  showLastSentAt?:  boolean
  showTest?:        boolean
  showLog?:         boolean
  onSelectAll?:     () => void
}) {
  return (
    <div
      className="flex w-full shrink-0 items-start rounded-lg bg-surface-white"
      role="row"
    >
      <div className="flex size-16 shrink-0 items-center justify-center p-2" role="columnheader">
        <Checkbox status={selectAllStatus} label="Select all rows" onClick={onSelectAll} />
      </div>
      <div className="flex h-16 w-[230px] shrink-0 items-center p-2" role="columnheader">
        <span className={HEADER_TEXT}>Topics</span>
      </div>
      <div className="flex h-16 min-w-0 flex-1 items-center p-2" role="columnheader">
        <span className={HEADER_TEXT}>Owner</span>
      </div>
      <div className="flex h-16 min-w-0 flex-1 items-center p-2" role="columnheader">
        <span className={HEADER_TEXT}>Create at</span>
      </div>
      <div className="flex h-16 min-w-0 flex-1 items-center p-2" role="columnheader">
        <span className={HEADER_TEXT}>Update time</span>
      </div>
      {showLastSentAt && (
        <div className="flex h-16 min-w-0 flex-1 items-center p-2" role="columnheader">
          <span className={HEADER_TEXT}>Last sent at</span>
        </div>
      )}
      {showTest && (
        <div className="flex h-16 w-20 shrink-0 items-center p-2" role="columnheader">
          <span className={HEADER_TEXT}>Test</span>
        </div>
      )}
      {showLog && (
        <div className="flex h-16 w-20 shrink-0 items-center p-2" role="columnheader">
          <span className={HEADER_TEXT}>Log</span>
        </div>
      )}
      <div className="flex h-16 w-[72px] shrink-0 items-center p-2" role="columnheader">
        <span className={HEADER_TEXT}>Status</span>
      </div>
      <div className="h-16 w-12 shrink-0" role="columnheader" aria-hidden />
    </div>
  )
}

function TableRowItem({
  row,
  showLastSentAt,
  showTest,
  showLog,
  onSelect,
  onTest,
  onLog,
  onStatusChange,
  onMore,
}: {
  row:              TableRow
  showLastSentAt?:  boolean
  showTest?:        boolean
  showLog?:         boolean
  onSelect?:        () => void
  onTest?:          () => void
  onLog?:           () => void
  onStatusChange?:  (status: boolean) => void
  onMore?:          () => void
}) {
  return (
    <div className="flex w-full shrink-0 items-start" role="row">
      <div className="flex h-10 w-16 shrink-0 items-center justify-center p-2" role="cell">
        <Checkbox
          status={row.selected ? 'checked' : 'uncheck'}
          label={`Select ${row.topic}`}
          onClick={onSelect}
        />
      </div>
      <div className="flex h-10 w-[230px] shrink-0 items-center p-2" role="cell">
        <span className={BODY_TEXT}>{row.topic}</span>
      </div>
      <div className="flex h-10 min-w-0 flex-1 items-center p-2" role="cell">
        <span className={BODY_TEXT}>{row.owner}</span>
      </div>
      <div className="flex h-10 min-w-0 flex-1 items-center p-2" role="cell">
        <span className={BODY_TEXT}>{row.createdAt}</span>
      </div>
      <div className="flex h-10 min-w-0 flex-1 items-center p-2" role="cell">
        <span className={BODY_TEXT}>{row.updatedAt}</span>
      </div>
      {showLastSentAt && (
        <div className="flex h-10 min-w-0 flex-1 items-center p-2" role="cell">
          <span className={BODY_TEXT}>{row.lastSentAt ?? row.updatedAt}</span>
        </div>
      )}
      {showTest && (
        <div className="flex h-10 w-20 shrink-0 items-center justify-center p-2" role="cell">
          <TestButton onClick={onTest} />
        </div>
      )}
      {showLog && (
        <div className="flex h-10 w-20 shrink-0 items-center justify-center p-2" role="cell">
          <LogButton onClick={onLog} />
        </div>
      )}
      <div className="flex h-10 w-[72px] shrink-0 items-center justify-center p-2" role="cell">
        <Toggle
          checked={row.status}
          onChange={onStatusChange}
          aria-label={`Status for ${row.topic}`}
        />
      </div>
      <div className="flex h-10 w-12 shrink-0 items-center justify-center p-2" role="cell">
        <MoreButton onClick={onMore} />
      </div>
    </div>
  )
}

export const DEFAULT_TABLE_ROWS: TableRow[] = [
  {
    id: '1',
    topic: 'BHK-finance',
    owner: 'admin_agent',
    createdAt: '2023-08-16 11:20:57',
    updatedAt: '2023-08-16 11:20:57',
    lastSentAt: '2023-08-16 11:20:57',
    status: true,
  },
  {
    id: '2',
    topic: 'BHK-finance',
    owner: 'admin_agent',
    createdAt: '2023-08-16 11:20:57',
    updatedAt: '2023-08-16 11:20:57',
    lastSentAt: '2023-08-16 11:20:57',
    status: true,
  },
  {
    id: '3',
    topic: 'BHK-finance',
    owner: 'admin_agent',
    createdAt: '2023-08-16 11:20:57',
    updatedAt: '2023-08-16 11:20:57',
    lastSentAt: '2023-08-16 11:20:57',
    status: true,
  },
]

export default function Table({
  rows             = DEFAULT_TABLE_ROWS,
  showLastSentAt   = false,
  showTest         = false,
  showLog          = false,
  selectAllStatus  = 'uncheck',
  onSelectAll,
  onSelectRow,
  onTest,
  onLog,
  onStatusChange,
  onMore,
  className        = '',
}: TableProps) {
  return (
    <div
      className={['flex w-full max-w-[1140px] flex-col gap-2', className].join(' ')}
      role="table"
    >
      <TableHeader
        selectAllStatus={selectAllStatus}
        showLastSentAt={showLastSentAt}
        showTest={showTest}
        showLog={showLog}
        onSelectAll={onSelectAll}
      />
      {rows.map((row) => (
        <TableRowItem
          key={row.id}
          row={row}
          showLastSentAt={showLastSentAt}
          showTest={showTest}
          showLog={showLog}
          onSelect={() => onSelectRow?.(row.id)}
          onTest={() => onTest?.(row.id)}
          onLog={() => onLog?.(row.id)}
          onStatusChange={(status) => onStatusChange?.(row.id, status)}
          onMore={() => onMore?.(row.id)}
        />
      ))}
    </div>
  )
}

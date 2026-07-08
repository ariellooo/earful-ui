/**
 * Table — Figma nodes 164:835 (table-1) · 314:1436 (table-2) · 314:1620 (table-3).
 *
 * Columns: checkbox · Topics · Owner · Create at · Update time ·
 *           [Last sent at] · [Test] · [Log] · Status · actions
 * Header 64 px · body rows 48 px · 8 px row gap · white rounded header
 */

import type { ReactNode } from 'react'
import Checkbox, { type CheckboxStatus } from '../Checkbox/Checkbox'
import Toggle from '../Toggle/Toggle'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'

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

export type TableColumnVisibility = {
  showLastSentAt?: boolean
  showTest?:       boolean
  showLog?:        boolean
}

export type TableProps = TableColumnVisibility & {
  rows?:              TableRow[]
  selectAllStatus?:   CheckboxStatus
  onSelectAll?:       () => void
  onSelectRow?:       (id: string) => void
  onTest?:            (id: string) => void
  onLog?:             (id: string) => void
  onStatusChange?:    (id: string, status: boolean) => void
  onMore?:            (id: string) => void
  className?:         string
}

type TableHeaderProps = TableColumnVisibility & {
  selectAllStatus: CheckboxStatus
  onSelectAll?:    () => void
}

type TableRowItemProps = TableColumnVisibility & {
  row:             TableRow
  onSelect?:       () => void
  onTest?:         () => void
  onLog?:          () => void
  onStatusChange?: (status: boolean) => void
  onMore?:         () => void
}

type OptionalColumnKey = keyof TableColumnVisibility

type OptionalColumnDef = {
  flag:       OptionalColumnKey
  label:      string
  widthClass: string
  centerCell: boolean
  renderCell: (props: Pick<TableRowItemProps, 'row' | 'onTest' | 'onLog'>) => ReactNode
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

const OPTIONAL_COLUMNS: OptionalColumnDef[] = [
  {
    flag:       'showLastSentAt',
    label:      'Last sent at',
    widthClass: 'min-w-0 flex-1',
    centerCell: false,
    renderCell: ({ row }) => (
      <span className={BODY_TEXT}>{row.lastSentAt ?? row.updatedAt}</span>
    ),
  },
  {
    flag:       'showTest',
    label:      'Test',
    widthClass: 'w-20',
    centerCell: true,
    renderCell: ({ onTest }) => <TestButton onClick={onTest} />,
  },
  {
    flag:       'showLog',
    label:      'Log',
    widthClass: 'w-20',
    centerCell: true,
    renderCell: ({ onLog }) => <LogButton onClick={onLog} />,
  },
]

function columnCellClass(height: 'header' | 'body', widthClass: string, center: boolean) {
  const h = height === 'header' ? 'h-16' : 'h-10'
  return [
    'flex shrink-0 items-center p-2',
    h,
    widthClass,
    center ? 'justify-center' : '',
  ].join(' ')
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

function OptionalColumns({
  columns,
  height,
  rowProps,
}: {
  columns:   TableColumnVisibility
  height:    'header' | 'body'
  rowProps?: Pick<TableRowItemProps, 'row' | 'onTest' | 'onLog'>
}) {
  const role = height === 'header' ? 'columnheader' : 'cell'

  return OPTIONAL_COLUMNS.map((col) => {
    if (!columns[col.flag]) return null

    return (
      <div
        key={col.flag}
        className={columnCellClass(height, col.widthClass, col.centerCell)}
        role={role}
      >
        {height === 'header'
          ? <span className={HEADER_TEXT}>{col.label}</span>
          : rowProps && col.renderCell(rowProps)}
      </div>
    )
  })
}

function TableHeader({
  selectAllStatus,
  showLastSentAt,
  showTest,
  showLog,
  onSelectAll,
}: TableHeaderProps) {
  const columns: TableColumnVisibility = { showLastSentAt, showTest, showLog }

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
      <OptionalColumns columns={columns} height="header" />
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
}: TableRowItemProps) {
  const columns: TableColumnVisibility = { showLastSentAt, showTest, showLog }

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
      <OptionalColumns
        columns={columns}
        height="body"
        rowProps={{ row, onTest, onLog }}
      />
      <div className="flex h-10 w-[72px] shrink-0 items-center justify-center p-2" role="cell">
        <Toggle
          checked={row.status}
          onChange={onStatusChange}
          aria-label={`Status for ${row.topic}`}
        />
      </div>
      <div className="flex h-10 w-12 shrink-0 items-center justify-center p-2" role="cell">
        <ButtonSquare
          type="icon"
          icon="ellipsis-vertical"
          size="m"
          onClick={onMore}
          aria-label="More actions"
        />
      </div>
    </div>
  )
}

export default function Table({
  rows             = [],
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
  const columns: TableColumnVisibility = { showLastSentAt, showTest, showLog }

  return (
    <div
      className={['flex w-full flex-col gap-2', className].join(' ')}
      role="table"
    >
      <TableHeader
        selectAllStatus={selectAllStatus}
        {...columns}
        onSelectAll={onSelectAll}
      />
      {rows.map((row) => (
        <TableRowItem
          key={row.id}
          row={row}
          {...columns}
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

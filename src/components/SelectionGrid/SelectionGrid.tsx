/**
 * SelectionGrid — Figma node 714:4594 (table/8-channel · Earful 2026).
 *
 * Dual-column checkbox picker · section title (H3 indigo) · 1 px divider ·
 * checkbox + label pairs · 48 px rows · white card · 8 px radius
 */

import { useId } from 'react'
import Checkbox from '../Checkbox/Checkbox'

export type SelectionGridItem = {
  id:       string
  label:    string
  checked?: boolean
}

export type SelectionGridProps = {
  title?:     string
  items?:     SelectionGridItem[]
  columns?:   number
  onToggle?:  (id: string) => void
  className?: string
}

const TITLE_TEXT = [
  'font-body font-bold text-2xl leading-[1.25] tracking-[0.2px]',
  'text-brand-indigo break-words',
].join(' ')

const LABEL_TEXT = [
  'font-body font-normal text-[15px] leading-6',
  'text-text-default break-words flex-1 min-w-0',
].join(' ')

function chunkItems<T>(items: T[], columns: number): (T | null)[][] {
  const rows: (T | null)[][] = []
  for (let i = 0; i < items.length; i += columns) {
    const row: (T | null)[] = []
    for (let col = 0; col < columns; col += 1) {
      row.push(items[i + col] ?? null)
    }
    rows.push(row)
  }
  return rows
}

function SelectionGridCell({
  item,
  onToggle,
}: {
  item:      SelectionGridItem
  onToggle?: () => void
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center">
      <div className="flex h-10 w-16 shrink-0 items-center justify-center p-2">
        <Checkbox
          status={item.checked ? 'checked' : 'uncheck'}
          label={item.label}
          onClick={onToggle}
        />
      </div>
      <div className="flex h-10 min-w-0 flex-1 items-center p-2">
        <span className={LABEL_TEXT}>{item.label}</span>
      </div>
    </div>
  )
}

function SelectionGridRow({
  cells,
  onToggle,
}: {
  cells:     (SelectionGridItem | null)[]
  onToggle?: (id: string) => void
}) {
  return (
    <div className="flex h-12 w-full shrink-0 items-center">
      {cells.map((item, index) =>
        item ? (
          <SelectionGridCell
            key={item.id}
            item={item}
            onToggle={() => onToggle?.(item.id)}
          />
        ) : (
          <div key={`empty-${index}`} className="flex min-w-0 flex-1" aria-hidden />
        ),
      )}
    </div>
  )
}

export default function SelectionGrid({
  title     = '',
  items     = [],
  columns   = 2,
  onToggle,
  className = '',
}: SelectionGridProps) {
  const titleId = useId()
  const rows = chunkItems(items, columns)

  return (
    <section
      role="group"
      aria-labelledby={titleId}
      className={[
        'flex w-full flex-col gap-1 rounded-lg bg-surface-white py-2',
        className,
      ].join(' ')}
    >
      <h3
        id={titleId}
        className={['flex h-12 w-full items-center px-4 py-2', TITLE_TEXT].join(' ')}
      >
        {title}
      </h3>
      <div className="w-full border-t border-line-default" aria-hidden />
      <div className="flex w-full flex-col">
        {rows.map((cells, rowIndex) => (
          <SelectionGridRow
            key={cells.map((cell) => cell?.id ?? `empty-${rowIndex}`).join('-')}
            cells={cells}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  )
}

/**
 * TableContentSeeding — Figma nodes 374:2966 (table) · 374:2903 (header).
 *
 * Columns: star · ID · Campaign Name · Client · Strategy · Credit · Status · Launched Date · actions
 * Header 48 px with indigo text + 1 px bottom separator · body rows 48 px · 8 px row gap
 * Full width · white bg · 8 px radius
 */

import BadgesStatus, { type BadgesStatusValue } from '../Badge/BadgeStatus/BadgeStatus'
import BadgesStrategy, { type BadgesStrategyValue } from '../Badge/BadgeStrategy/BadgeStrategy'
import ButtonStar from '../Button/ButtonStar/ButtonStar'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'

export type ContentSeedingRow = {
  id:             string
  campaignId:     number
  campaignName:   string
  client:         string
  strategy:       BadgesStrategyValue
  credit:         number
  status:         BadgesStatusValue
  launchedDate:   string | null
  starred?:       boolean
}

export type TableContentSeedingProps = {
  rows?:          ContentSeedingRow[]
  onStar?:        (id: string) => void
  onMore?:        (id: string) => void
  className?:     string
}

// ─── Shared text styles ───────────────────────────────────────────────────────

const HEADER_TEXT = [
  'font-body font-bold text-[15px] leading-6 tracking-[0.2px]',
  'text-brand-indigo flex-1 min-w-0 break-words',
].join(' ')

const BODY_TEXT = [
  'font-body font-normal text-[15px] leading-6',
  'text-text-default flex-1 min-w-0 break-words',
].join(' ')

const CELL_BASE = 'flex shrink-0 h-10 items-center p-2'

// ─── Header ───────────────────────────────────────────────────────────────────

function SeedingHeader() {
  return (
    <div className="flex w-full shrink-0 flex-col">
      <div className="flex w-full h-12 items-center" role="row">
        <div className={`${CELL_BASE} w-12 justify-center`} role="columnheader" aria-hidden>
          <ButtonStar state="label" />
        </div>
        <div className={`${CELL_BASE} w-16`} role="columnheader">
          <span className={HEADER_TEXT}>ID</span>
        </div>
        <div className={`flex h-10 flex-1 min-w-0 items-center p-2`} role="columnheader">
          <span className={HEADER_TEXT}>Campaign Name</span>
        </div>
        <div className={`flex h-10 flex-1 min-w-0 items-center p-2`} role="columnheader">
          <span className={HEADER_TEXT}>Client</span>
        </div>
        <div className={`${CELL_BASE} w-40`} role="columnheader">
          <span className={HEADER_TEXT}>Strategy</span>
        </div>
        <div className={`${CELL_BASE} w-[72px]`} role="columnheader">
          <span className={HEADER_TEXT}>Credit</span>
        </div>
        <div className={`${CELL_BASE} w-[120px]`} role="columnheader">
          <span className={HEADER_TEXT}>Status</span>
        </div>
        <div className={`${CELL_BASE} w-[140px]`} role="columnheader">
          <span className={HEADER_TEXT}>Launched Date</span>
        </div>
        <div className="h-10 w-12 shrink-0" role="columnheader" aria-hidden />
      </div>
      <div className="w-full border-t border-line-default" />
    </div>
  )
}

// ─── Row ─────────────────────────────────────────────────────────────────────

function SeedingRow({
  row,
  onStar,
  onMore,
}: {
  row:     ContentSeedingRow
  onStar?: () => void
  onMore?: () => void
}) {
  const creditStr = row.credit === 0 ? '0' : row.credit > 0 ? `${row.credit}` : `${row.credit}`

  return (
    <div className="flex w-full shrink-0 items-center" role="row">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center p-2" role="cell">
        <ButtonStar
          state={row.starred ? 'starred' : 'default'}
          onClick={onStar}
        />
      </div>
      <div className={`${CELL_BASE} w-16`} role="cell">
        <span className={BODY_TEXT}>{row.campaignId}</span>
      </div>
      <div className="flex h-10 flex-1 min-w-0 items-center p-2" role="cell">
        <span className={BODY_TEXT}>{row.campaignName}</span>
      </div>
      <div className="flex h-10 flex-1 min-w-0 items-center p-2" role="cell">
        <span className={BODY_TEXT}>{row.client}</span>
      </div>
      <div className={`${CELL_BASE} w-40`} role="cell">
        <BadgesStrategy strategy={row.strategy} />
      </div>
      <div className={`${CELL_BASE} w-[72px]`} role="cell">
        <span className={BODY_TEXT}>{creditStr}</span>
      </div>
      <div className={`${CELL_BASE} w-[120px]`} role="cell">
        <BadgesStatus status={row.status} />
      </div>
      <div className={`${CELL_BASE} w-[140px]`} role="cell">
        <span className={BODY_TEXT}>{row.launchedDate ?? '--'}</span>
      </div>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center p-2" role="cell">
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

// ─── Default data ─────────────────────────────────────────────────────────────

export const DEFAULT_SEEDING_ROWS: ContentSeedingRow[] = [
  {
    id:           '1',
    campaignId:   100,
    campaignName: 'Lorem ipsum dolor sit amet',
    client:       'Lorem ipsum dolor sit amet',
    strategy:     'Dilution',
    credit:       0,
    status:       'Completed',
    launchedDate: null,
    starred:      true,
  },
  {
    id:           '2',
    campaignId:   100,
    campaignName: 'Lorem ipsum dolor sit amet',
    client:       'Lorem ipsum dolor sit amet',
    strategy:     'Distraction',
    credit:       -4,
    status:       'Launched',
    launchedDate: '2025-03-18',
    starred:      false,
  },
  {
    id:           '3',
    campaignId:   100,
    campaignName: 'Lorem ipsum dolor sit amet',
    client:       'Lorem ipsum dolor sit amet',
    strategy:     'Market Intelligence',
    credit:       0,
    status:       'Draft',
    launchedDate: null,
    starred:      false,
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function TableContentSeeding({
  rows      = DEFAULT_SEEDING_ROWS,
  onStar,
  onMore,
  className = '',
}: TableContentSeedingProps) {
  return (
    <div
      className={[
        'flex w-full max-w-[1116px] flex-col gap-2',
        className,
      ].join(' ')}
      role="table"
    >
      <div className="flex flex-col gap-0 px-2">
        <SeedingHeader />
        <div className="flex flex-col gap-2 pt-2">
          {rows.map((row) => (
            <SeedingRow
              key={row.id}
              row={row}
              onStar={() => onStar?.(row.id)}
              onMore={() => onMore?.(row.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

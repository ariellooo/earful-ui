import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import type { CheckboxStatus } from '../Checkbox/Checkbox'
import Table, { type TableRow, type TableProps } from './Table'

const DEFAULT_TABLE_ROWS: TableRow[] = [
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

type StoryArgs = {
  lastSentAt: boolean
  test:       boolean
  log:        boolean
  rows:       TableRow[]
}

const booleanToggle = {
  control: 'boolean' as const,
}

function deriveSelectAllStatus(rows: TableRow[]): CheckboxStatus {
  const selectedCount = rows.filter((row) => row.selected).length
  if (selectedCount === 0) return 'uncheck'
  if (selectedCount === rows.length) return 'checked'
  return 'checked-all'
}

function cycleSelectAll(current: CheckboxStatus): TableRow[] {
  const selectAll = current !== 'checked'
  return DEFAULT_TABLE_ROWS.map((row) => ({
    ...row,
    selected: selectAll,
  }))
}

const meta: Meta<StoryArgs & TableProps> = {
  title: 'Components/Table/Topics',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Topics data table with per-row selection, status toggles, and optional extra columns (Last Sent At, Test, Log). Toggle the boolean controls to show or hide those columns.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1140px]">
        <Story />
      </div>
    ),
  ],
  args: {
    lastSentAt: false,
    test:       false,
    log:        false,
    rows:       DEFAULT_TABLE_ROWS,
  },
  argTypes: {
    lastSentAt: {
      ...booleanToggle,
      name: 'Last sent at',
      description: 'Toggles visibility of the "Last Sent At" column.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    test: {
      ...booleanToggle,
      name: 'Test',
      description: 'Toggles visibility of the "Test" column.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    log: {
      ...booleanToggle,
      name: 'Log',
      description: 'Toggles visibility of the "Log" column.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    rows:             { table: { disable: true } },
    showLastSentAt:   { table: { disable: true } },
    showTest:         { table: { disable: true } },
    showLog:          { table: { disable: true } },
    selectAllStatus:  { table: { disable: true } },
    onSelectAll:      { table: { disable: true } },
    onSelectRow:      { table: { disable: true } },
    onTest:           { table: { disable: true } },
    onLog:            { table: { disable: true } },
    onStatusChange:   { table: { disable: true } },
    onMore:           { table: { disable: true } },
    className:        { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()
    const rows = args.rows ?? DEFAULT_TABLE_ROWS

    return (
      <Table
        rows={rows}
        showLastSentAt={args.lastSentAt}
        showTest={args.test}
        showLog={args.log}
        selectAllStatus={deriveSelectAllStatus(rows)}
        onSelectAll={() => {
          const next = cycleSelectAll(deriveSelectAllStatus(rows))
          updateArgs({ rows: next })
        }}
        onSelectRow={(id) => {
          updateArgs({
            rows: rows.map((row) =>
              row.id === id ? { ...row, selected: !row.selected } : row,
            ),
          })
        }}
        onStatusChange={(id, status) => {
          updateArgs({
            rows: rows.map((row) =>
              row.id === id ? { ...row, status } : row,
            ),
          })
        }}
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

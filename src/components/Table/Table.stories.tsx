import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import type { CheckboxStatus } from '../Checkbox/Checkbox'
import Table, { DEFAULT_TABLE_ROWS, type TableRow } from './Table'

type StoryArgs = {
  lastSentAt: boolean
  test:       boolean
  log:        boolean
  rows:       TableRow[]
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

const meta: Meta<StoryArgs> = {
  title: 'Design System/Table',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1140px] rounded-xl bg-white p-10">
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
    lastSentAt: { control: 'boolean', name: 'Last sent at' },
    test:       { control: 'boolean', name: 'Test' },
    log:        { control: 'boolean', name: 'Log' },
    rows:       { table: { disable: true } },
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
type Story = StoryObj<StoryArgs>

export const Default: Story = {
  name: 'Default',
}

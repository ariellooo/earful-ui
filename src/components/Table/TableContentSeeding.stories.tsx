import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import TableContentSeeding, {
  DEFAULT_SEEDING_ROWS,
  type TableContentSeedingProps,
} from './TableContentSeeding'

type StoryArgs = {
  credit:       boolean
  launchedDate: boolean
}

const booleanToggle = {
  control: 'boolean' as const,
}

const meta: Meta<StoryArgs & TableContentSeedingProps> = {
  title: 'Components/Table/Content Seeding',
  component: TableContentSeeding,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Content-seeding table variant with per-row star/bookmark actions for flagging content items. Columns include campaign metadata, strategy badges, credit, status, and row actions.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full min-w-0">
        <Story />
      </div>
    ),
  ],
  args: {
    credit:       true,
    launchedDate: true,
  },
  argTypes: {
    credit: {
      ...booleanToggle,
      name: 'Credit',
      description: 'Toggles visibility of the "Credit" column.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    launchedDate: {
      ...booleanToggle,
      name: 'Launched Date',
      description: 'Toggles visibility of the "Launched Date" column.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    rows:             { table: { disable: true } },
    showCredit:       { table: { disable: true } },
    showLaunchedDate: { table: { disable: true } },
    onStar:           { table: { disable: true } },
    onMore:           { table: { disable: true } },
    className:        { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs & TableContentSeedingProps>()
    const rows = args.rows ?? DEFAULT_SEEDING_ROWS

    return (
      <TableContentSeeding
        rows={rows}
        showCredit={args.credit}
        showLaunchedDate={args.launchedDate}
        onStar={(id) => {
          updateArgs({
            rows: rows.map((row) =>
              row.id === id ? { ...row, starred: !row.starred } : row,
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

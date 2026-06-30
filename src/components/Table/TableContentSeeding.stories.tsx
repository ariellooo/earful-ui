import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import TableContentSeeding, { DEFAULT_SEEDING_ROWS } from './TableContentSeeding'

const meta: Meta = {
  title: 'Components/Table',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1140px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const ContentSeeding: Story = {
  name: 'Content-Seeding',
  parameters: {
    controls: { disable: true },
  },
  render: function Render() {
    const [rows, setRows] = useState(DEFAULT_SEEDING_ROWS)

    return (
      <TableContentSeeding
        rows={rows}
        onStar={(id) => {
          setRows((prev) =>
            prev.map((row) =>
              row.id === id ? { ...row, starred: !row.starred } : row,
            ),
          )
        }}
      />
    )
  },
}

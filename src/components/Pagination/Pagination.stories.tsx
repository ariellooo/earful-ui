import type { Meta, StoryObj } from '@storybook/react'
import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
  args: {
    version:             'default',
    totalItems:          36,
    defaultItemsPerPage: 10,
  },
  argTypes: {
    version:             { table: { disable: true } },
    totalItems:          { control: { type: 'number', min: 1 }, name: 'total items' },
    defaultItemsPerPage: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Default — shows "Showing X to Y of Z entries" ─────────────────────────────
export const Default: Story = {
  args: { version: 'default', totalItems: 36, defaultItemsPerPage: 10 },
}

// ── Show Rows — shows rows-per-page selector ───────────────────────────────────
export const ShowRows: Story = {
  name: 'Show Rows',
  args: { version: 'show-rows', totalItems: 36, defaultItemsPerPage: 10 },
}

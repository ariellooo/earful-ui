import type { Meta, StoryObj } from '@storybook/react'
import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Controls for navigating paginated data sets. The default variant shows a range summary ("Showing X to Y of Z entries"); the show-rows variant adds a rows-per-page selector.',
      },
    },
  },
  args: {
    version:             'default',
    totalItems:          36,
    defaultItemsPerPage: 10,
  },
  argTypes: {
    version:             { table: { disable: true } },
    totalItems: {
      description: 'Total number of records across all pages.',
      control: { type: 'number', min: 1 },
      name: 'total items',
      table: { type: { summary: 'number' }, defaultValue: { summary: '36' } },
    },
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

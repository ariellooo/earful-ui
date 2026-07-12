/**
 * Content Seeding template — Figma node 632:16760 (Earful 2026).
 *
 * Full-page C.R.O.W.S shell composed from Sidebar, Header, TopBar (action variant),
 * TableContentSeeding and Pagination.
 */

import type { Meta, StoryObj } from '@storybook/react'
import ContentSeedingOverview from './ContentSeedingOverview'

const meta: Meta<typeof ContentSeedingOverview> = {
  title: 'Templates/Content Seeding',
  component: ContentSeedingOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page C.R.O.W.S layout composed from Sidebar, Header, TopBar (action variant with starred filter), TableContentSeeding and Pagination. TopBar strategy and status selections filter table rows; column visibility can be toggled via the controls below.',
      },
    },
  },
  args: {
    showCredit:       true,
    showLaunchedDate: true,
    starFilterActive: false,
  },
  argTypes: {
    showCredit: {
      name: 'Credit',
      description: 'Show the "Credit" column in the table.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    showLaunchedDate: {
      name: 'Launched Date',
      description: 'Show the "Launched Date" column in the table.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    starFilterActive: {
      name: 'Starred Filter',
      description: 'Show only starred rows (mirrors the star toggle in the TopBar).',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  render: function Render(args) {
    return (
      <ContentSeedingOverview
        showCredit={args.showCredit}
        showLaunchedDate={args.showLaunchedDate}
        starFilterActive={args.starFilterActive}
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}

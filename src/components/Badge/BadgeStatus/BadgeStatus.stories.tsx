import type { Meta, StoryObj } from '@storybook/react'
import BadgeStatus from './BadgeStatus'

const meta: Meta<typeof BadgeStatus> = {
  title: 'Components/Badge/Status',
  component: BadgeStatus,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status badge representing the lifecycle stage of a campaign or topic. Each value maps to a distinct colour and label.',
      },
    },
  },
  argTypes: {
    status: {
      description: 'Lifecycle stage of the item.',
      control: 'radio',
      options: ['Draft', 'Inactive', 'Launched', 'Completed'],
      table: {
        type: { summary: "'Draft' | 'Inactive' | 'Launched' | 'Completed'" },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Draft:     Story = { args: { status: 'Draft' } }
export const Inactive:  Story = { args: { status: 'Inactive' } }
export const Launched:  Story = { args: { status: 'Launched' } }
export const Completed: Story = { args: { status: 'Completed' } }

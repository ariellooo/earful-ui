import type { Meta, StoryObj } from '@storybook/react'
import BadgesStatus from './BadgesStatus'

const meta: Meta<typeof BadgesStatus> = {
  title: 'Design System/Badges/Status',
  component: BadgesStatus,
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'radio', options: ['Draft', 'Inactive', 'Launched', 'Completed'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Draft:     Story = { args: { status: 'Draft' } }
export const Inactive:  Story = { args: { status: 'Inactive' } }
export const Launched:  Story = { args: { status: 'Launched' } }
export const Completed: Story = { args: { status: 'Completed' } }

import type { Meta, StoryObj } from '@storybook/react'
import BadgeStatus from './BadgeStatus'

const meta: Meta<typeof BadgeStatus> = {
  title: 'Components/Badge/Status',
  component: BadgeStatus,
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

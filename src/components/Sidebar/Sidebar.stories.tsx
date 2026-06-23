import type { Meta, StoryObj } from '@storybook/react'
import Sidebar from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Design System/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  args: { state: 'expanded' },
  argTypes: {
    state: { control: 'radio', options: ['expanded', 'collapsed'] },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-surface-primary p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Expanded:  Story = { args: { state: 'expanded' } }
export const Collapsed: Story = { args: { state: 'collapsed' } }

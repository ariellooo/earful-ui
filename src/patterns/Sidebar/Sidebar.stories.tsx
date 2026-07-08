import type { Meta, StoryObj } from '@storybook/react'
import Sidebar from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Patterns/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Primary app navigation rail with logo and section links. Supports expanded (212px with labels) and collapsed (48px icon-only) layouts for shell layouts.',
      },
    },
  },
  args: { state: 'expanded' },
  argTypes: {
    state: {
      description: 'Navigation rail width and label visibility.',
      control: 'radio',
      options: ['expanded', 'collapsed'],
      table: {
        type: { summary: "'expanded' | 'collapsed'" },
        defaultValue: { summary: 'expanded' },
      },
    },
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

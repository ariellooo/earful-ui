import type { Meta, StoryObj } from '@storybook/react'
import Header from './Header'

const meta: Meta<typeof Header> = {
  title: 'Design System/Header',
  component: Header,
  parameters: { layout: 'padded' },
  args: {
    title:             'Dashboard',
    searchPlaceholder: 'Search',
  },
  argTypes: {
    title:             { control: 'text' },
    searchPlaceholder: { control: 'text' },
    className:         { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1116px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

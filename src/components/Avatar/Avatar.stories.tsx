import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Design System/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  args: {
    size: 'm',
  },
  argTypes: {
    size:      { control: 'radio', options: ['s', 'm', 'l'] },
    src:       { table: { disable: true } },
    alt:       { table: { disable: true } },
    className: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

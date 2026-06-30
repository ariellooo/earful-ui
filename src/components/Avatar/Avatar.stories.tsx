import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    type:     'image',
    size:     'm',
    initials: 'TK',
    alt:      'User avatar',
  },
  argTypes: {
    type:      { control: 'radio', options: ['image', 'initials'] },
    size:      { control: 'radio', options: ['s', 'm'] },
    initials:  { control: 'text', name: 'Initials' },
    src:       { table: { disable: true } },
    alt:       { control: 'text' },
    className: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {
  name: 'Image',
  args: { type: 'image' },
}

export const Initials: Story = {
  name: 'Initials',
  args: { type: 'initials', initials: 'TK' },
}

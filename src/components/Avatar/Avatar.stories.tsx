import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'User identity element that displays either a profile photo or an initials fallback. Available in two sizes.',
      },
    },
  },
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
    type: {
      description: 'Whether to display a photo or an initials fallback.',
      control: 'radio',
      options: ['image', 'initials'],
      table: {
        type: { summary: "'image' | 'initials'" },
        defaultValue: { summary: 'image' },
      },
    },
    size: {
      description: 'Physical size of the avatar.',
      control: 'radio',
      options: ['s', 'm'],
      table: {
        type: { summary: "'s' | 'm'" },
        defaultValue: { summary: 'm' },
      },
    },
    initials: {
      description: 'One or two characters displayed when `type` is `"initials"`.',
      control: 'text',
      name: 'Initials',
      table: { type: { summary: 'string' } },
    },
    src:       { table: { disable: true } },
    alt: {
      description: 'Accessible alt text for the image.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
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

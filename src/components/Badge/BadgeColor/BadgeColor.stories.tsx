import type { Meta, StoryObj } from '@storybook/react'
import BadgeColor from './BadgeColor'

const meta: Meta<typeof BadgeColor> = {
  title: 'Components/Badge/Color',
  component: BadgeColor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Colour-coded label badge for surfacing status, category, or classification at a glance. Available in six semantic colours and three sizes.',
      },
    },
  },
  args: { colour: 'green', size: 's', label: 'Active' },
  argTypes: {
    colour: {
      description: 'Semantic colour variant.',
      control: 'radio',
      options: ['green', 'grey', 'yellow', 'red', 'orange', 'blue'],
      table: {
        type: { summary: "'green' | 'grey' | 'yellow' | 'red' | 'orange' | 'blue'" },
        defaultValue: { summary: 'green' },
      },
    },
    size: {
      description: 'Physical size of the badge.',
      control: 'radio',
      options: ['s', 'm', 'l'],
      table: {
        type: { summary: "'s' | 'm' | 'l'" },
        defaultValue: { summary: 's' },
      },
    },
    label: {
      description: 'Text displayed inside the badge.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { colour: 'green' } }

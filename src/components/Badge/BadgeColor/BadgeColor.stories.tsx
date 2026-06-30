import type { Meta, StoryObj } from '@storybook/react'
import BadgeColor from './BadgeColor'

const meta: Meta<typeof BadgeColor> = {
  title: 'Components/Badge/Color',
  component: BadgeColor,
  parameters: { layout: 'centered' },
  args: { colour: 'green', size: 's', label: 'Active' },
  argTypes: {
    colour: { control: 'radio', options: ['green', 'grey', 'yellow', 'red', 'orange', 'blue'] },
    size:   { control: 'radio', options: ['s', 'm', 'l'] },
    label:  { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { colour: 'green' } }

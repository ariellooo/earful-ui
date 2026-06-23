import type { Meta, StoryObj } from '@storybook/react'
import ButtonColor from './ButtonColor'

const meta: Meta<typeof ButtonColor> = {
  title: 'Design System/Badges/Color',
  component: ButtonColor,
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

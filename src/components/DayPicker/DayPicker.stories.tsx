import type { Meta, StoryObj } from '@storybook/react'
import DayPicker from './DayPicker'

const meta: Meta<typeof DayPicker> = {
  title: 'Design System/Day Picker',
  component: DayPicker,
  parameters: { layout: 'centered' },
  args: {
    state: 'default',
    text:  'Select Day',
  },
  argTypes: {
    state: { control: 'radio', options: ['default', 'open', 'select-day', 'select-range'] },
    text:  { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { state: 'default' } }
export const Open:    Story = {
  args: { state: 'open' },
  argTypes: { text: { table: { disable: true } } },
}
export const SelectDay: Story = {
  name: 'Select Day',
  args: { state: 'select-day' },
  argTypes: { text: { table: { disable: true } } },
}
export const SelectRange: Story = {
  name: 'Select Range',
  args: { state: 'select-range' },
  argTypes: { text: { table: { disable: true } } },
}

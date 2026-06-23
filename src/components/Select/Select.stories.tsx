import type { Meta, StoryObj } from '@storybook/react'
import Select from './Select'

const meta: Meta<typeof Select> = {
  title: 'Design System/Select',
  component: Select,
  parameters: { layout: 'centered' },
  args: { label: 'Select' },
  argTypes: {
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { label: 'Select' } }

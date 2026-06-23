import type { Meta, StoryObj } from '@storybook/react'
import InputField from './InputField'

const meta: Meta<typeof InputField> = {
  title: 'Design System/Input Field',
  component: InputField,
  parameters: { layout: 'centered' },
  args: {
    placeholder: 'Type something...',
    helperText:  'Information',
  },
  argTypes: {
    variant:      { table: { disable: true } },
    placeholder:  { control: 'text' },
    helperText:   { control: 'text' },
    defaultValue: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── 1. Single line ────────────────────────────────────────────────────────────
export const Single: Story = {
  args: { variant: 'single' },
}

// ── 2. Multi line (expanded) ──────────────────────────────────────────────────
export const Multi: Story = {
  args: { variant: 'multi' },
}

import type { Meta, StoryObj } from '@storybook/react'
import InputField from './InputField'

const meta: Meta<typeof InputField> = {
  title: 'Components/Input Field',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text input field supporting single-line and multi-line (expanded textarea) variants with a helper-text slot for instructions or validation hints.',
      },
    },
  },
  args: {
    placeholder: 'Type something...',
    helperText:  'Information',
  },
  argTypes: {
    variant: {
      description: 'Determines single-line input or multi-line textarea layout.',
      table: {
        type: { summary: "'single' | 'multi'" },
        disable: true,
      },
    },
    placeholder: {
      description: 'Ghost text shown when the field is empty.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    helperText: {
      description: 'Instructional or validation text displayed below the field.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
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

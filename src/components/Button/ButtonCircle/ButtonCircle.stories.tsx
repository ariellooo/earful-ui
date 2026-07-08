import type { Meta, StoryObj } from '@storybook/react'
import ButtonCircle from './ButtonCircle'

const meta: Meta<typeof ButtonCircle> = {
  title: 'Components/Button/Circle',
  component: ButtonCircle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Compact circular button for step counts or confirmation ticks. Switches between a numeric label and a tick icon via the `type` prop.',
      },
    },
  },
  args: {
    type:     'number',
    disabled: false,
    number:   1,
  },
  argTypes: {
    type: { table: { disable: true } },
    disabled: {
      description: 'Prevents interaction and applies muted styling.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    number: {
      description: 'Displayed numeral — only relevant when `type` is `"number"`.',
      control: 'number',
      table: { type: { summary: 'number' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Number ────────────────────────────────────────────────────────────────────
export const Number: Story = {
  name: 'Number',
  args: { type: 'number' },
}

// ── Tick ──────────────────────────────────────────────────────────────────────
export const Tick: Story = {
  name: 'Tick',
  args: { type: 'tick' },
  argTypes: {
    disabled: { table: { disable: true } },
    number:   { table: { disable: true } },
  },
}

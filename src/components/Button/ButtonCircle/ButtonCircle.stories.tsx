import type { Meta, StoryObj } from '@storybook/react'
import ButtonCircle from './ButtonCircle'

const meta: Meta<typeof ButtonCircle> = {
  title: 'Components/Button/Circle',
  component: ButtonCircle,
  parameters: { layout: 'centered' },
  args: {
    type:     'number',
    disabled: false,
    number:   1,
  },
  argTypes: {
    type:     { table: { disable: true } },
    disabled: { control: 'boolean' },
    number:   { control: 'number' },
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

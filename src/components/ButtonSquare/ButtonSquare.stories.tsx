import type { Meta, StoryObj } from '@storybook/react'
import ButtonSquare from './ButtonSquare'
import { ICON_NAMES } from '../Icon/Icon'

const meta: Meta<typeof ButtonSquare> = {
  title: 'Design System/Buttons/Square',
  component: ButtonSquare,
  parameters: { layout: 'centered' },
  args: {
    size:     'l',
    disabled: false,
    number:   1,
    icon:     'download',
  },
  argTypes: {
    type:     { table: { disable: true } },
    disabled: { control: 'boolean' },
    number:   { control: 'number' },
    icon:     { control: 'select', options: ICON_NAMES, name: 'icon' },
    size:     { control: 'radio', options: ['l', 'm', 's'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Number ────────────────────────────────────────────────────────────────────
export const Number: Story = {
  name: 'Number',
  args: { type: 'number' },
  argTypes: {
    icon: { table: { disable: true } },
    size: { table: { disable: true } },
  },
}

// ── Icon ──────────────────────────────────────────────────────────────────────
export const Icon: Story = {
  name: 'Icon',
  args: { type: 'icon', size: 'l' },
  argTypes: {
    number: { table: { disable: true } },
  },
}

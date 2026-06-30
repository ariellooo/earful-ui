import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'
import { ICON_NAMES } from '../../../foundations/Icons/Function/IconFunction'

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: {
    label:    'Button Label',
    level:    'primary',
    size:     'l',
    disabled: false,
  },
  argTypes: {
    label:     { control: 'text' },
    disabled:  { control: 'boolean' },
    level:     { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size:      { control: 'radio',  options: ['l', 'm'] },
    iconLeft:  { control: 'select', options: ICON_NAMES, name: 'icon left' },
    iconRight: { control: 'select', options: ICON_NAMES, name: 'icon right' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── 1. Text Only ──────────────────────────────────────────────────────────────
export const TextOnly: Story = {
  name: 'Text Only',
  argTypes: {
    iconLeft:  { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
}

// ── 2. Icon Left ──────────────────────────────────────────────────────────────
export const IconLeft: Story = {
  name: 'Icon Left',
  args: { iconLeft: 'plus' },
  argTypes: {
    iconLeft:  { control: 'select', options: ICON_NAMES, name: 'icon' },
    iconRight: { table: { disable: true } },
  },
}

// ── 3. Icon Right ─────────────────────────────────────────────────────────────
export const IconRight: Story = {
  name: 'Icon Right',
  args: { iconRight: 'chevron-down', level: 'secondary' },
  argTypes: {
    iconLeft:  { table: { disable: true } },
    iconRight: { control: 'select', options: ICON_NAMES, name: 'icon' },
  },
}

// ── 4. Icon Both ──────────────────────────────────────────────────────────────
export const IconBoth: Story = {
  name: 'Icon Both',
  args: { iconLeft: 'calendar', iconRight: 'chevron-down', level: 'secondary' },
}

import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'
import { ICON_NAMES } from '../../../foundations/Icons/Function/IconFunction'

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Versatile action trigger with text and optional icon slots. Supports primary, secondary, and tertiary hierarchy levels, two sizes, and optional leading or trailing icons.',
      },
    },
  },
  args: {
    label:    'Button Label',
    level:    'primary',
    size:     'l',
    disabled: false,
  },
  argTypes: {
    label: {
      description: 'Visible text content of the button.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      description: 'Prevents interaction and applies muted styling.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    level: {
      description: 'Visual hierarchy tier — maps to brand token tiers.',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      table: {
        type: { summary: "'primary' | 'secondary' | 'tertiary'" },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Physical footprint of the button.',
      control: 'radio',
      options: ['l', 'm'],
      table: {
        type: { summary: "'l' | 'm'" },
        defaultValue: { summary: 'l' },
      },
    },
    iconLeft: {
      description: 'Icon rendered to the left of the label.',
      control: 'select',
      options: ICON_NAMES,
      name: 'icon left',
      table: { type: { summary: 'IconName' } },
    },
    iconRight: {
      description: 'Icon rendered to the right of the label.',
      control: 'select',
      options: ICON_NAMES,
      name: 'icon right',
      table: { type: { summary: 'IconName' } },
    },
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

import type { Meta, StoryObj } from '@storybook/react'
import ButtonSquare from './ButtonSquare'
import { ICON_NAMES } from '../../../foundations/Icons/Function/IconFunction'

const meta: Meta<typeof ButtonSquare> = {
  title: 'Components/Button/Square',
  component: ButtonSquare,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Square-format button for icon actions or numeric badges in toolbars and tables. The `type` prop switches between an icon variant and a number-badge variant.',
      },
    },
  },
  args: {
    size:     'l',
    disabled: false,
    number:   1,
    icon:     'download',
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
    icon: {
      description: 'Icon name from the icon library — only relevant when `type` is `"icon"`.',
      control: 'select',
      options: ICON_NAMES,
      name: 'icon',
      table: { type: { summary: 'IconName' } },
    },
    size: {
      description: 'Physical size of the button.',
      control: 'radio',
      options: ['l', 'm', 's'],
      table: {
        type: { summary: "'l' | 'm' | 's'" },
        defaultValue: { summary: 'l' },
      },
    },
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

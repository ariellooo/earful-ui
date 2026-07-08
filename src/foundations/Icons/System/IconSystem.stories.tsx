import type { Meta, StoryObj } from '@storybook/react'
import IconSystem, { ICON_SYSTEM_TYPES, ICON_SYSTEM_VARIANTS } from './IconSystem'

const meta: Meta<typeof IconSystem> = {
  title: 'Foundations/Icons/System',
  component: IconSystem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Status and feedback icons for alerts, warnings, info, success, and help states. Each type supports default, fill, and outline variants mapped to semantic colour tokens.',
      },
    },
  },
  args: { type: 'triangle-alert', variant: 'default', size: 24 },
  argTypes: {
    type: {
      description: 'System icon shape and semantic meaning.',
      control: 'select',
      options: ICON_SYSTEM_TYPES,
      table: { type: { summary: 'IconSystemType' } },
    },
    variant: {
      description: 'Visual treatment — default, filled, or outline.',
      control: 'radio',
      options: ICON_SYSTEM_VARIANTS,
      table: {
        type: { summary: "'default' | 'fill' | 'outline'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      description: 'Rendered width and height in pixels.',
      control: { type: 'range', min: 16, max: 64, step: 4 },
      table: { type: { summary: 'number' }, defaultValue: { summary: '24' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const TriangleAlert:   Story = { args: { type: 'triangle-alert' } }
export const OctagonWarning:  Story = { args: { type: 'octagon-warning' } }
export const CircleInfo:      Story = { args: { type: 'circle-info' } }
export const CircleSuccess:   Story = { args: { type: 'circle-success' } }
export const CircleHelp:      Story = { args: { type: 'circle-help' } }

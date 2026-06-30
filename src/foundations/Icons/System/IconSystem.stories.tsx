import type { Meta, StoryObj } from '@storybook/react'
import IconSystem, { ICON_SYSTEM_TYPES, ICON_SYSTEM_VARIANTS } from './IconSystem'

const meta: Meta<typeof IconSystem> = {
  title: 'Foundations/Icons/System',
  component: IconSystem,
  parameters: { layout: 'centered' },
  args: { type: 'triangle-alert', variant: 'default', size: 24 },
  argTypes: {
    type:    { control: 'select', options: ICON_SYSTEM_TYPES },
    variant: { control: 'radio',  options: ICON_SYSTEM_VARIANTS },
    size:    { control: { type: 'range', min: 16, max: 64, step: 4 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const TriangleAlert:   Story = { args: { type: 'triangle-alert' } }
export const OctagonWarning:  Story = { args: { type: 'octagon-warning' } }
export const CircleInfo:      Story = { args: { type: 'circle-info' } }
export const CircleSuccess:   Story = { args: { type: 'circle-success' } }
export const CircleHelp:      Story = { args: { type: 'circle-help' } }

import type { Meta, StoryObj } from '@storybook/react'
import Shadows from './Shadows'

const meta: Meta<typeof Shadows> = {
  title: 'Foundations/Effects/Shadows',
  component: Shadows,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Elevation shadow tokens for lifting surfaces above the page background.',
      },
    },
  },
  args: { variant: '100' },
  argTypes: {
    variant: {
      description: 'Shadow depth token mapped to utility classes `shadow-100` and `shadow-200`.',
      control: 'radio',
      options: ['100', '200'],
      table: {
        type: { summary: "'100' | '200'" },
        defaultValue: { summary: '100' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { variant: '100' } }

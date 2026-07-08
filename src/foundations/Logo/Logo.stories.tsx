import type { Meta, StoryObj } from '@storybook/react'
import Logo from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Foundations/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Earful brand mark in full wordmark or icon-only formats. Use the primary variant in headers and marketing surfaces; use the icon variant where horizontal space is limited.',
      },
    },
  },
  args: { variant: 'primary' },
  argTypes: {
    variant: {
      description: 'Logo format — full wordmark or icon mark only.',
      control: 'radio',
      options: ['primary', 'icon'],
      table: {
        type: { summary: "'primary' | 'icon'" },
        defaultValue: { summary: 'primary' },
      },
    },
    className: {
      description: 'Optional class name applied to the logo image.',
      table: { type: { summary: 'string' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }
export const Icon:    Story = { args: { variant: 'icon' } }

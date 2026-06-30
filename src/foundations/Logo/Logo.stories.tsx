import type { Meta, StoryObj } from '@storybook/react'
import Logo from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Foundations/Logo',
  component: Logo,
  parameters: { layout: 'centered' },
  args: { variant: 'primary' },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'icon'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }
export const Icon:    Story = { args: { variant: 'icon' } }

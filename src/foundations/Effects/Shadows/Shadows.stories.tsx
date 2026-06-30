import type { Meta, StoryObj } from '@storybook/react'
import Shadows from './Shadows'

const meta: Meta<typeof Shadows> = {
  title: 'Foundations/Effects/Shadows',
  component: Shadows,
  parameters: { layout: 'centered' },
  args: { variant: '100' },
  argTypes: {
    variant: { control: 'radio', options: ['100', '200'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { variant: '100' } }

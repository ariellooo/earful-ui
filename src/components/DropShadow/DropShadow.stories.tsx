import type { Meta, StoryObj } from '@storybook/react'
import DropShadow from './DropShadow'

const meta: Meta<typeof DropShadow> = {
  title: 'Design System/Effects/Drop Shadow',
  component: DropShadow,
  parameters: { layout: 'centered' },
  args: { variant: '100' },
  argTypes: {
    variant: { control: 'radio', options: ['100', '200'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { variant: '100' } }

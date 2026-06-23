import type { Meta, StoryObj } from '@storybook/react'
import ButtonStar from './ButtonStar'

const meta: Meta<typeof ButtonStar> = {
  title: 'Design System/Buttons/Star',
  component: ButtonStar,
  parameters: { layout: 'centered' },
  args: { state: 'default' },
  argTypes: {
    state: {
      control: 'radio',
      options: ['default', 'starred', 'label', 'main'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { state: 'default' } }
export const Starred: Story = { args: { state: 'starred' } }
export const Label:   Story = { args: { state: 'label' } }
export const Main:    Story = { args: { state: 'main' } }

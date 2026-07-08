import type { Meta, StoryObj } from '@storybook/react'
import ButtonStar from './ButtonStar'

const meta: Meta<typeof ButtonStar> = {
  title: 'Components/Button/Star',
  component: ButtonStar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Bookmark/star button used on content rows to flag items as starred or promoted. Cycles through default, starred, label, and main visual states.',
      },
    },
  },
  args: { state: 'default' },
  argTypes: {
    state: {
      description: 'Visual state of the star button.',
      control: 'radio',
      options: ['default', 'starred', 'label', 'main'],
      table: {
        type: { summary: "'default' | 'starred' | 'label' | 'main'" },
        defaultValue: { summary: 'default' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { state: 'default' } }
export const Starred: Story = { args: { state: 'starred' } }
export const Label:   Story = { args: { state: 'label' } }
export const Main:    Story = { args: { state: 'main' } }

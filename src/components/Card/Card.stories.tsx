import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  args: {
    type:           'alert',
    heading:        'Login Failed',
    body:           'We couldn\u2019t find your credentials in the system. Please check and try again.',
    secondaryButton: 'Get Help',
    primaryButton:   'Try Again',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['info', 'alert', 'warning', 'success'],
    },
    heading:        { control: 'text' },
    body:           { control: 'text' },
    secondaryButton: { control: 'text', name: 'Secondary button' },
    primaryButton:   { control: 'text', name: 'Primary button' },
    onPrimary:      { table: { disable: true } },
    onSecondary:    { table: { disable: true } },
    className:      { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default',
}

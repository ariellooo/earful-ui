import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Feedback card for displaying contextual alerts, warnings, info, and success messages with optional primary and secondary action buttons.',
      },
    },
  },
  args: {
    type:           'alert',
    heading:        'Login Failed',
    body:           'We couldn\u2019t find your credentials in the system. Please check and try again.',
    secondaryButton: 'Get Help',
    primaryButton:   'Try Again',
  },
  argTypes: {
    type: {
      description: 'Semantic tone — determines icon and colour theming.',
      control: 'radio',
      options: ['info', 'alert', 'warning', 'success'],
      table: {
        type: { summary: "'info' | 'alert' | 'warning' | 'success'" },
        defaultValue: { summary: 'alert' },
      },
    },
    heading: {
      description: 'Title text displayed at the top of the card.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    body: {
      description: 'Detailed message body below the heading.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    secondaryButton: {
      description: 'Label for the secondary (left) action button.',
      control: 'text',
      name: 'Secondary button',
      table: { type: { summary: 'string' } },
    },
    primaryButton: {
      description: 'Label for the primary (right) CTA button.',
      control: 'text',
      name: 'Primary button',
      table: { type: { summary: 'string' } },
    },
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

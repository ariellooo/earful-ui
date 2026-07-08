import type { Meta, StoryObj } from '@storybook/react'
import BadgeStrategy from './BadgeStrategy'

const meta: Meta<typeof BadgeStrategy> = {
  title: 'Components/Badge/Strategy',
  component: BadgeStrategy,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Strategy-specific badge that maps each strategy to a consistent visual tag with its own colour and label.',
      },
    },
  },
  argTypes: {
    strategy: {
      description: 'The strategy name displayed in the badge.',
      control: 'radio',
      options: ['Dilution', 'Distraction', 'Exposure', 'Neutralization', 'Market Intelligence'],
      table: {
        type: { summary: "'Dilution' | 'Distraction' | 'Exposure' | 'Neutralization' | 'Market Intelligence'" },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Dilution:            Story = { args: { strategy: 'Dilution' } }
export const Distraction:         Story = { args: { strategy: 'Distraction' } }
export const Exposure:            Story = { args: { strategy: 'Exposure' } }
export const Neutralization:      Story = { args: { strategy: 'Neutralization' } }
export const MarketIntelligence: Story = {
  name: 'Market Intelligence',
  args: { strategy: 'Market Intelligence' },
}

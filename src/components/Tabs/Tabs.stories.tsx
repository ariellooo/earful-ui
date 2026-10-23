import type { Meta, StoryObj } from '@storybook/react'
import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'white',
      options: {
        white: { name: 'white', value: '#ffffff' },
      },
    },
    docs: {
      description: {
        component:
          'Single social-platform tab cell from the Earful form chrome. **Default** is the selected tab (orange label and underline). **Disable** is the inactive state (black label, no underline).',
      },
    },
  },
  args: {
    label:   'Facebook',
    variant: 'default',
  },
  argTypes: {
    label: {
      description: 'Platform or section title shown in the tab.',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Facebook' } },
    },
    variant: {
      description: 'Visual state — matches Figma Default / Disable variants.',
      control: 'radio',
      options: ['default', 'disable'],
      table: {
        type: { summary: "'default' | 'disable'" },
        defaultValue: { summary: 'default' },
      },
    },
    onClick:  { table: { disable: true } },
    selected: { table: { disable: true } },
    className: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/** Figma node 5621:7454 — active tab (Facebook). */
export const Default: Story = {
  name: 'Default',
  args: {
    label:   'Facebook',
    variant: 'default',
  },
}

/** Figma variant `Disable` — inactive tab (Threads). */
export const Disable: Story = {
  name: 'Disable',
  args: {
    label:   'Threads',
    variant: 'disable',
  },
}

/** Default and Disable side by side — Figma node 815:5686. */
export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex items-center" role="tablist" aria-label="Social media">
      <Tabs label="Facebook" variant="default" />
      <Tabs label="Threads" variant="disable" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default and Disable in a row.',
      },
    },
  },
}

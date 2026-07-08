import type { Meta, StoryObj } from '@storybook/react'
import SearchBar from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Patterns/Search Bar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact search input with a leading search icon, used in headers, toolbars, and filter rows. Fixed 328px width with focus-state border treatment.',
      },
    },
  },
  args: { placeholder: 'Search' },
  argTypes: {
    placeholder: {
      description: 'Ghost text shown when the field is empty and unfocused.',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Search' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

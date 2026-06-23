import type { Meta, StoryObj } from '@storybook/react'
import SearchBar from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Design System/Search Bar',
  component: SearchBar,
  parameters: { layout: 'centered' },
  args: { placeholder: 'Search' },
  argTypes: {
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { placeholder: 'Search' } }

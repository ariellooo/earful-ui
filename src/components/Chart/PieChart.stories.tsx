import type { Meta, StoryObj } from '@storybook/react'
import PieChart from './PieChart'

const meta: Meta<typeof PieChart> = {
  title: 'Design System/Chart',
  component: PieChart,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[372px] rounded-xl bg-white">
        <Story />
      </div>
    ),
  ],
  args: {
    title:    'Relative Share of Voice',
    subtitle: 'Calculated by number of messages and comments',
  },
  argTypes: {
    title:              { control: 'text' },
    subtitle:           { control: 'text' },
    totalConversations: { control: 'number' },
    slices:             { table: { disable: true } },
    onDownload:         { table: { disable: true } },
    className:          { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const PieChartStory: Story = {
  name: 'Pie Chart',
}

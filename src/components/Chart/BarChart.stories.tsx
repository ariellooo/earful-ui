import type { Meta, StoryObj } from '@storybook/react'
import BarChart from './BarChart'

const meta: Meta<typeof BarChart> = {
  title: 'Design System/Chart',
  component: BarChart,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[708px] rounded-xl bg-white p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    title:    'Sentiment Analysis by Topic',
    subtitle: 'Calculated by number of messages',
  },
  argTypes: {
    title:      { control: 'text' },
    subtitle:   { control: 'text' },
    data:       { table: { disable: true } },
    yMax:       { table: { disable: true } },
    onDownload: { table: { disable: true } },
    className:  { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BarChartStory: Story = {
  name: 'Bar Chart',
}

import type { Meta, StoryObj } from '@storybook/react'
import LineChart from './LineChart'

const meta: Meta<typeof LineChart> = {
  title: 'Components/Chart/Line',
  component: LineChart,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[780px] rounded-xl bg-white p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    title:    'Buzz Trend',
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

export const LineChartStory: Story = {
  name: 'Line Chart',
}

import type { Meta, StoryObj } from '@storybook/react'
import LineChart from './LineChart'

const meta: Meta<typeof LineChart> = {
  title: 'Components/Chart/Line',
  component: LineChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Time-series line chart for trend analysis across topics or time ranges. Supply time-stamped data via the `data` prop.',
      },
    },
  },
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
    title: {
      description: 'Chart heading displayed above the visualisation.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    subtitle: {
      description: 'Supporting context shown below the heading.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
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

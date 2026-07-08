import type { Meta, StoryObj } from '@storybook/react'
import BarChart from './BarChart'

const meta: Meta<typeof BarChart> = {
  title: 'Components/Chart/Bar',
  component: BarChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Grouped bar chart for comparing sentiment or volume across topics. Supply data via the `data` prop; use `title` and `subtitle` for chart labelling.',
      },
    },
  },
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

export const BarChartStory: Story = {
  name: 'Bar Chart',
}

import type { Meta, StoryObj } from '@storybook/react'
import PieChart from './PieChart'

const meta: Meta<typeof PieChart> = {
  title: 'Components/Chart/Pie',
  component: PieChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Donut pie chart for relative share-of-voice across data sources. The centre displays the total conversation count, overridable via `totalConversations`.',
      },
    },
  },
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
    totalConversations: {
      description: 'Override for the total count shown at the centre of the donut.',
      control: 'number',
      table: { type: { summary: 'number' } },
    },
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

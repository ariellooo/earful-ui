/**
 * Dashboard template — Figma node 626:6146 (Earful 2026).
 *
 * Full-page shell composed from Sidebar, Header, TopBar, and chart components.
 * Layout: expanded sidebar | header bar + scrollable chart grid.
 */

import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import DashboardOverview from './DashboardOverview'

type StoryArgs = {
  sentiment:       boolean
  buzzTrend:       boolean
  overallAnalysis: boolean
  shareOfVoice:    boolean
}

const meta: Meta<typeof DashboardOverview> = {
  title: 'Templates/Dashboard',
  component: DashboardOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page dashboard layout composed from Sidebar, Header, TopBar and various charts (BarChart, LineChart, and PieChart). Chart customization can be toggled via **Customise** button',
      },
    },
  },
  args: {
    sentiment:       true,
    buzzTrend:       true,
    overallAnalysis: true,
    shareOfVoice:    true,
  },
  argTypes: {
    sentiment: {
      name: 'Sentiment',
      description: 'Show the Sentiment Analysis by Topic bar chart.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    buzzTrend: {
      name: 'Buzz Trend',
      description: 'Show the Buzz Trend line chart.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    overallAnalysis: {
      name: 'Overall Analysis',
      description: 'Show the Overall Analysis by Topic bar chart.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    shareOfVoice: {
      name: 'Share Of Voice',
      description: 'Show the Relative Share of Voice pie chart.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    onCustomiseChange: { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()

    return (
      <DashboardOverview
        sentiment={args.sentiment}
        buzzTrend={args.buzzTrend}
        overallAnalysis={args.overallAnalysis}
        shareOfVoice={args.shareOfVoice}
        onCustomiseChange={({ sentiment, buzzTrend, overallAnalysis, shareOfVoice }) =>
          updateArgs({ sentiment, buzzTrend, overallAnalysis, shareOfVoice })
        }
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}

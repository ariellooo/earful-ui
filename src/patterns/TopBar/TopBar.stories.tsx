import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import TopBar, {
  DEFAULT_STATUS_ITEMS,
  DEFAULT_STRATEGY_ITEMS,
  type TopBarPanel,
  type TopBarProps,
} from './TopBar'
import { normalizeDate } from '../../components/DayPicker/calendarHelpers'
import type { DropdownStatusItem, DropdownStrategyItem } from '../../components/Dropdown/Dropdown'

type StoryArgs = {
  variant:           'default' | 'action'
  openPanel:         TopBarPanel
  strategyItems:     DropdownStrategyItem[]
  selectedDate:      string | null
  selectedDateEnd:   string | null
  launchedDate:      string | null
  launchedDateEnd:   string | null
  statusItems:       DropdownStatusItem[]
}

function parseStoryDate(value: string | null | undefined): Date | null {
  if (!value) return null
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  return normalizeDate(new Date(y, m - 1, d))
}

function formatStoryDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const meta: Meta<StoryArgs & TopBarProps> = {
  title: 'Patterns/Top Bar',
  component: TopBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toolbar for list and table views with filter, date, search, and action controls. The default variant exposes filter and export actions; the action variant adds strategy, status, and launched-date filters plus a primary task button.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1116px] rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    variant:         'default',
    openPanel:       null,
    strategyItems:   DEFAULT_STRATEGY_ITEMS,
    selectedDate:    null,
    selectedDateEnd: null,
    launchedDate:    null,
    launchedDateEnd: null,
    statusItems:     DEFAULT_STATUS_ITEMS,
  },
  argTypes: {
    variant: {
      description: 'Toolbar layout — filter/export controls or campaign action filters.',
      control: 'radio',
      options: ['default', 'action'],
      table: {
        type: { summary: "'default' | 'action'" },
        defaultValue: { summary: 'default' },
      },
    },
    openPanel:                { table: { disable: true } },
    strategyItems:            { table: { disable: true } },
    selectedDate:             { table: { disable: true } },
    selectedDateEnd:          { table: { disable: true } },
    launchedDate:             { table: { disable: true } },
    launchedDateEnd:          { table: { disable: true } },
    statusItems:              { table: { disable: true } },
    onPanelChange:            { table: { disable: true } },
    onStrategyItemsChange:    { table: { disable: true } },
    onDateRangeChange:        { table: { disable: true } },
    onLaunchedDateRangeChange: { table: { disable: true } },
    onStatusItemsChange:      { table: { disable: true } },
    className:                { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()

    const setPanel = (panel: TopBarPanel) => updateArgs({ openPanel: panel })

    return (
      <TopBar
        variant={args.variant}
        openPanel={args.openPanel}
        strategyItems={args.strategyItems}
        selectedDate={parseStoryDate(args.selectedDate)}
        selectedDateEnd={parseStoryDate(args.selectedDateEnd)}
        launchedDate={parseStoryDate(args.launchedDate)}
        launchedDateEnd={parseStoryDate(args.launchedDateEnd)}
        statusItems={args.statusItems}
        onPanelChange={setPanel}
        onStrategyItemsChange={(strategyItems) => updateArgs({ strategyItems })}
        onDateRangeChange={(start, end) =>
          updateArgs({
            selectedDate:    start ? formatStoryDate(start) : null,
            selectedDateEnd: end ? formatStoryDate(end) : null,
          })
        }
        onLaunchedDateRangeChange={(start, end) =>
          updateArgs({
            launchedDate:    start ? formatStoryDate(start) : null,
            launchedDateEnd: end ? formatStoryDate(end) : null,
          })
        }
        onStatusItemsChange={(statusItems) => updateArgs({ statusItems })}
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { variant: 'default' } }
export const Action:  Story = { args: { variant: 'action' } }

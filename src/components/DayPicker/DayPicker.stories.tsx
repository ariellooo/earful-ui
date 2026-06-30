import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import RangeDayPicker from './RangeDayPicker'
import SingleDayPicker from './SingleDayPicker'
import { normalizeDate } from './calendarHelpers'

type StoryArgs = {
  variant:      'single' | 'range'
  selectedDate: string | number | null
}

/** Storybook may pass a timestamp, ISO string, or null. */
function parseStoryDate(value: string | number | null | undefined): Date | null {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'number') return normalizeDate(new Date(value))
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split('-').map(Number)
    return normalizeDate(new Date(y, m - 1, d))
  }
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : normalizeDate(parsed)
}

function formatStoryDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const meta: Meta<StoryArgs> = {
  title: 'Components/Day Picker',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    variant:      'single',
    selectedDate: null,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['single', 'range'],
    },
    selectedDate: { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()

    if (args.variant === 'range') {
      return <RangeDayPicker state="open" />
    }

    const selectedDate = parseStoryDate(args.selectedDate)

    return (
      <SingleDayPicker
        selectedDate={selectedDate}
        onSelectDate={(date) => updateArgs({ selectedDate: formatStoryDate(date) })}
        onClear={() => updateArgs({ selectedDate: null })}
        onApply={() => undefined}
      />
    )
  },
}

export default meta
type Story = StoryObj<StoryArgs>

export const Compact: Story = {
  name: 'Single',
  args: { variant: 'single' },
}

export const Range: Story = {
  name: 'Range',
  args: { variant: 'range' },
}

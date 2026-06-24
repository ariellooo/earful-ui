import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import DetailBar, {
  LANGUAGE_OPTIONS,
  type DetailBarPanel,
  type LanguageOption,
} from './DetailBar'
import { normalizeDate } from '../DayPicker/calendarHelpers'

type StoryArgs = {
  openPanel:     DetailBarPanel
  label:         string
  language:      LanguageOption
  topicsCount:   number | null
  commentsCount: number | null
  launchDate:    string | null
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

const meta: Meta<StoryArgs> = {
  title: 'Design System/Detail Bar',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1140px] rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    openPanel:     null,
    label:         '',
    language:      'English',
    topicsCount:   null,
    commentsCount: null,
    launchDate:    null,
  },
  argTypes: {
    openPanel:     { table: { disable: true } },
    label:         { control: 'text' },
    language:      { control: 'select', options: [...LANGUAGE_OPTIONS] },
    topicsCount:   { control: { type: 'number', min: 1, max: 99 } },
    commentsCount: { control: { type: 'number', min: 1, max: 99 } },
    launchDate:    { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()

    const setPanel = (panel: DetailBarPanel) => updateArgs({ openPanel: panel })

    return (
      <DetailBar
        openPanel={args.openPanel}
        label={args.label}
        language={args.language}
        topicsCount={args.topicsCount}
        commentsCount={args.commentsCount}
        launchDate={parseStoryDate(args.launchDate)}
        onPanelChange={setPanel}
        onLanguageChange={(language) => updateArgs({ language })}
        onTopicsChange={(topicsCount) => updateArgs({ topicsCount })}
        onCommentsChange={(commentsCount) => updateArgs({ commentsCount })}
        onLaunchDateChange={(date) =>
          updateArgs({ launchDate: date ? formatStoryDate(date) : null })
        }
      />
    )
  },
}

export default meta
type Story = StoryObj<StoryArgs>

export const Default: Story = {
  name: 'Default',
}

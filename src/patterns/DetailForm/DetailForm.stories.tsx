import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import DetailForm, {
  LANGUAGE_OPTIONS,
  type DetailFormPanel,
} from './DetailForm'
import { type LanguageOption } from '../DetailBar/DetailBar'
import { normalizeDate } from '../../components/DayPicker/calendarHelpers'

type StoryArgs = {
  openPanel:       DetailFormPanel
  boardName:       string
  language:        LanguageOption | null
  launchDateLabel: string
  launchDate:      string | null
  topicsCount:     number | null
  commentsCount:   number | null
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
  title: 'Patterns/Detail Form',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[534px] rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    openPanel:       null,
    boardName:       '',
    language:        null,
    launchDateLabel: '',
    launchDate:      null,
    topicsCount:     null,
    commentsCount:   null,
  },
  argTypes: {
    openPanel:       { table: { disable: true } },
    boardName:       { control: 'text' },
    language:        { control: 'select', options: [null, ...LANGUAGE_OPTIONS] },
    launchDateLabel: { control: 'text' },
    launchDate:      { table: { disable: true } },
    topicsCount:     { control: 'number' },
    commentsCount:   { control: 'number' },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()

    const setPanel = (panel: DetailFormPanel) => updateArgs({ openPanel: panel })

    return (
      <DetailForm
        openPanel={args.openPanel}
        boardName={args.boardName}
        language={args.language}
        launchDateLabel={args.launchDateLabel || undefined}
        launchDate={parseStoryDate(args.launchDate)}
        topicsCount={args.topicsCount}
        commentsCount={args.commentsCount}
        onPanelChange={setPanel}
        onBoardNameChange={(boardName) => updateArgs({ boardName })}
        onLanguageChange={(language) => updateArgs({ language })}
        onLaunchDateChange={(date) =>
          updateArgs({
            launchDate: date ? formatStoryDate(date) : null,
            launchDateLabel: '',
          })
        }
        onTopicsChange={(topicsCount) => updateArgs({ topicsCount })}
        onCommentsChange={(commentsCount) => updateArgs({ commentsCount })}
      />
    )
  },
}

export default meta
type Story = StoryObj<StoryArgs>

export const Default: Story = {
  name: 'Default',
}

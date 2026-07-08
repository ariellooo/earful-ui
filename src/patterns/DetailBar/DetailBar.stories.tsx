import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import DetailBar, {
  LANGUAGE_OPTIONS,
  type DetailBarPanel,
  type DetailBarProps,
  type LanguageOption,
} from './DetailBar'
import { normalizeDate } from '../../components/DayPicker/calendarHelpers'

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

const meta: Meta<StoryArgs & DetailBarProps> = {
  title: 'Patterns/Detail Bar',
  component: DetailBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Inline board configuration bar for setting label, language, topic count, comment count, and launch date. Opens language and date panels below the bar.',
      },
    },
  },
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
    label: {
      description: 'Board label text shown in the bar.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    language: {
      description: 'Selected content language.',
      control: 'select',
      options: [...LANGUAGE_OPTIONS],
      table: { type: { summary: 'LanguageOption' }, defaultValue: { summary: 'English' } },
    },
    topicsCount: {
      description: 'Number of topics — pass null for the empty placeholder state.',
      control: { type: 'number', min: 1, max: 99 },
      table: { type: { summary: 'number | null' }, defaultValue: { summary: 'null' } },
    },
    commentsCount: {
      description: 'Number of comments — pass null for the empty placeholder state.',
      control: { type: 'number', min: 1, max: 99 },
      table: { type: { summary: 'number | null' }, defaultValue: { summary: 'null' } },
    },
    openPanel:         { table: { disable: true } },
    launchDate:        { table: { disable: true } },
    variant:           { table: { disable: true } },
    onPanelChange:     { table: { disable: true } },
    onLanguageChange:  { table: { disable: true } },
    onTopicsChange:    { table: { disable: true } },
    onCommentsChange:  { table: { disable: true } },
    onLaunchDateChange: { table: { disable: true } },
    onAdd:             { table: { disable: true } },
    onClose:           { table: { disable: true } },
    className:         { table: { disable: true } },
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
type Story = StoryObj<typeof meta>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import DetailForm, {
  LANGUAGE_OPTIONS,
  type DetailFormPanel,
} from './DetailForm'
import { type LanguageOption } from '../DetailBar/DetailBar'
import { normalizeDate } from '../../components/DayPicker/calendarHelpers'

type StoryArgs = {
  openPanel:    DetailFormPanel
  language:     LanguageOption | null
  launchStart:  string | null
  launchEnd:    string | null
  topicsCount:  number | null
  commentsCount: number | null
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

const meta = {
  title: 'Patterns/Detail Form',
  component: DetailForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Include Context panel for language, a launch-date range, topic count, and comments per topic. Default shows placeholders; filled shows a selected language, date range, and counts.',
      },
    },
  },
  args: {
    openPanel:     null,
    language:      null,
    launchStart:   null,
    launchEnd:     null,
    topicsCount:   null,
    commentsCount: null,
  },
  argTypes: {
    language: {
      description: 'Selected content language — null shows the placeholder state.',
      control: 'select',
      options: [null, ...LANGUAGE_OPTIONS],
      table: { type: { summary: 'LanguageOption | null' }, defaultValue: { summary: 'null' } },
    },
    launchStart: {
      description: 'Range start as YYYY-MM-DD. Empty shows the Launch Date placeholder.',
      control: 'text',
      table: { type: { summary: 'string | null' } },
    },
    launchEnd: {
      description: 'Range end as YYYY-MM-DD.',
      control: 'text',
      table: { type: { summary: 'string | null' } },
    },
    topicsCount: {
      description: 'Number of topics — pass null for the empty placeholder state.',
      control: 'number',
      table: { type: { summary: 'number | null' }, defaultValue: { summary: 'null' } },
    },
    commentsCount: {
      description: 'Comments per topic — pass null for the empty placeholder state.',
      control: 'number',
      table: { type: { summary: 'number | null' }, defaultValue: { summary: 'null' } },
    },
    openPanel:          { table: { disable: true } },
    onPanelChange:      { table: { disable: true } },
    onLanguageChange:   { table: { disable: true } },
    onLaunchDateChange: { table: { disable: true } },
    onTopicsChange:     { table: { disable: true } },
    onCommentsChange:   { table: { disable: true } },
    onNewContext:       { table: { disable: true } },
    onClose:            { table: { disable: true } },
    className:          { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()

    const setPanel = (panel: DetailFormPanel) => updateArgs({ openPanel: panel })

    return (
      <DetailForm
        openPanel={args.openPanel}
        language={args.language}
        launchStart={parseStoryDate(args.launchStart)}
        launchEnd={parseStoryDate(args.launchEnd)}
        topicsCount={args.topicsCount}
        commentsCount={args.commentsCount}
        onPanelChange={setPanel}
        onLanguageChange={(language) => updateArgs({ language })}
        onLaunchDateChange={(start, end) =>
          updateArgs({
            launchStart: start ? formatStoryDate(start) : null,
            launchEnd: end ? formatStoryDate(end) : null,
          })
        }
        onTopicsChange={(topicsCount) => updateArgs({ topicsCount })}
        onCommentsChange={(commentsCount) => updateArgs({ commentsCount })}
      />
    )
  },
} as Meta<StoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    language:      'English',
    launchStart:   '2025-05-01',
    launchEnd:     '2025-05-06',
    topicsCount:   1,
    commentsCount: 2,
  },
}

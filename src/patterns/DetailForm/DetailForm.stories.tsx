import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import DetailForm, {
  LANGUAGE_OPTIONS,
  type DetailFormPanel,
  type DetailFormProps,
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

const meta: Meta<StoryArgs & DetailFormProps> = {
  title: 'Patterns/Detail Form',
  component: DetailForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Include Context panel for configuring board name, language, launch date, topic count, and comment count in a stacked form layout. Used when adding or editing campaign context details.',
      },
    },
  },
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
    boardName: {
      description: 'Name of the board or context being configured.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    language: {
      description: 'Selected content language — null shows the placeholder state.',
      control: 'select',
      options: [null, ...LANGUAGE_OPTIONS],
      table: { type: { summary: 'LanguageOption | null' }, defaultValue: { summary: 'null' } },
    },
    launchDateLabel: {
      description: 'Override label for the launch date field.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    topicsCount: {
      description: 'Number of topics — pass null for the empty placeholder state.',
      control: 'number',
      table: { type: { summary: 'number | null' }, defaultValue: { summary: 'null' } },
    },
    commentsCount: {
      description: 'Number of comments — pass null for the empty placeholder state.',
      control: 'number',
      table: { type: { summary: 'number | null' }, defaultValue: { summary: 'null' } },
    },
    openPanel:          { table: { disable: true } },
    launchDate:         { table: { disable: true } },
    onPanelChange:      { table: { disable: true } },
    onBoardNameChange:  { table: { disable: true } },
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
type Story = StoryObj<typeof meta>

export const Default: Story = {}

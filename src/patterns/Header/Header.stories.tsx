import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import Header, { type HeaderPanel, type HeaderProps } from './Header'

type StoryArgs = {
  title:             string
  searchPlaceholder: string
  openPanel:         HeaderPanel
}

const meta: Meta<StoryArgs & HeaderProps> = {
  title: 'Patterns/Header',
  component: Header,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Page header with a title, search field, notification bell, and profile avatar. Opens profile and notification dropdown panels from the trailing actions.',
      },
    },
  },
  args: {
    title:             'Dashboard',
    searchPlaceholder: 'Search',
    openPanel:         null,
  },
  argTypes: {
    title: {
      description: 'Page title displayed on the left.',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Dashboard' } },
    },
    searchPlaceholder: {
      description: 'Placeholder text for the embedded search field.',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Search' } },
    },
    openPanel:         { table: { disable: true } },
    onPanelChange:     { table: { disable: true } },
    onProfileSelect:   { table: { disable: true } },
    onNotification:    { table: { disable: true } },
    className:         { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="w-full rounded-xl bg-white py-10 pl-10">
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()

    const setPanel = (panel: HeaderPanel) => updateArgs({ openPanel: panel })

    return (
      <Header
        title={args.title}
        searchPlaceholder={args.searchPlaceholder}
        openPanel={args.openPanel}
        onPanelChange={setPanel}
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

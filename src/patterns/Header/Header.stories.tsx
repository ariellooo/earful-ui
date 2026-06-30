import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import Header, { type HeaderPanel } from './Header'

type StoryArgs = {
  title:             string
  searchPlaceholder: string
  openPanel:         HeaderPanel
}

const meta: Meta<StoryArgs> = {
  title: 'Patterns/Header',
  parameters: { layout: 'padded' },
  args: {
    title:             'Dashboard',
    searchPlaceholder: 'Search',
    openPanel:         null,
  },
  argTypes: {
    title:             { control: 'text' },
    searchPlaceholder: { control: 'text' },
    openPanel:         { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1116px] rounded-xl bg-white p-10">
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
type Story = StoryObj<StoryArgs>

export const Default: Story = {}

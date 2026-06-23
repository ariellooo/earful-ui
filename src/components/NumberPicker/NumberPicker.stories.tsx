import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import NumberPicker from './NumberPicker'

const meta: Meta<typeof NumberPicker> = {
  title: 'Design System/Number Picker',
  component: NumberPicker,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'topics',
    value:   1,
    min:     1,
    max:     99,
  },
  argTypes: {
    variant:      { control: 'radio', options: ['topics', 'comments'] },
    value:        { control: 'number' },
    min:          { table: { disable: true } },
    max:          { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange:     { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <NumberPicker
        {...args}
        onChange={(value) => updateArgs({ value })}
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Topics ────────────────────────────────────────────────────────────────────
export const Topics: Story = {
  name: 'Topics',
  args: { variant: 'topics' },
}

// ── Comments ──────────────────────────────────────────────────────────────────
export const Comments: Story = {
  name: 'Comments',
  args: { variant: 'comments' },
}

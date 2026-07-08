import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import NumberPicker from './NumberPicker'

const meta: Meta<typeof NumberPicker> = {
  title: 'Components/Number Picker',
  component: NumberPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Inline stepper for picking a numeric value within a configurable min/max range. Supports topic-count and comment-count context variants.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'topics',
    value:   null,
    min:     1,
    max:     99,
  },
  argTypes: {
    variant: {
      description: 'Context variant — affects label and empty-state text.',
      control: 'radio',
      options: ['topics', 'comments'],
      table: {
        type: { summary: "'topics' | 'comments'" },
        defaultValue: { summary: 'topics' },
      },
    },
    value: {
      description: 'Current numeric value. Pass `null` to show the empty/placeholder state.',
      control: { type: 'number', min: 1, max: 99 },
      table: { type: { summary: 'number | null' }, defaultValue: { summary: 'null' } },
    },
    emptyLabel: {
      description: 'Placeholder text displayed when no value is selected.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
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

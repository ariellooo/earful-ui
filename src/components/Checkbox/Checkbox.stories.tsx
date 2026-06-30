import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import Checkbox, { type CheckboxStatus } from './Checkbox'

function nextStatus(current: CheckboxStatus): CheckboxStatus {
  if (current === 'checked-all') return 'checked'
  return current === 'checked' ? 'uncheck' : 'checked'
}

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    status:    { table: { disable: true } },
    disabled:  { control: 'boolean' },
    label:     { table: { disable: true } },
    onClick:   { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <Checkbox
        {...args}
        onClick={() => {
          if (args.disabled) return
          updateArgs({ status: nextStatus(args.status ?? 'uncheck') })
        }}
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Uncheck: Story = {
  name: 'Uncheck',
  args: { status: 'uncheck' },
}

export const Checked: Story = {
  name: 'Checked',
  args: { status: 'checked' },
}

export const CheckedAll: Story = {
  name: 'Checked All',
  args: { status: 'checked-all' },
}

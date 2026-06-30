import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import Toggle from './Toggle'

type StoryArgs = {
  checked:  'off' | 'on'
  disabled: boolean
}

const meta: Meta<StoryArgs> = {
  title: 'Components/Toggle',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    checked:  'off',
    disabled: false,
  },
  argTypes: {
    checked: {
      control: { type: 'radio' },
      options: ['off', 'on'],
    },
    disabled: { control: 'boolean' },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<StoryArgs>()
    return (
      <Toggle
        checked={args.checked === 'on'}
        disabled={args.disabled}
        onChange={(checked) => updateArgs({ checked: checked ? 'on' : 'off' })}
      />
    )
  },
}

export default meta
type Story = StoryObj<StoryArgs>

export const On: Story = {
  name: 'On',
  args: { checked: 'on' },
}

export const Off: Story = {
  name: 'Off',
  args: { checked: 'off' },
}

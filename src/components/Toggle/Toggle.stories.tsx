import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import Toggle from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Design System/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    checked:        { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    disabled:       { control: 'boolean' },
    onChange:       { table: { disable: true } },
    className:      { table: { disable: true } },
    'aria-label':   { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    return (
      <Toggle
        {...args}
        onChange={(checked) => updateArgs({ checked })}
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const On: Story = {
  name: 'On',
  args: { checked: true },
}

export const Off: Story = {
  name: 'Off',
  args: { checked: false },
}

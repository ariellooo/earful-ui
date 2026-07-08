import type { Meta, StoryObj } from '@storybook/react'
import Form from './Form'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Full campaign form layout with tab navigation and a topic creation workflow. Wrap in a max-width container for correct proportions.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1140px] p-10">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onTabChange: { table: { disable: true } },
    onNewTopic:  { table: { disable: true } },
    className:   { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default',
  args: {
    title: 'English',
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import UploadImage from './UploadImage'

const meta: Meta<typeof UploadImage> = {
  title: 'Components/Upload Image',
  component: UploadImage,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-white p-10">
        <Story />
      </div>
    ),
  ],
  args: {
    layout:     'vertical',
    helperText:
      'Image format .jpg .jpeg .png and maximum size per file is 5 MB.',
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    label:      { control: 'text' },
    helperText: { control: 'text', name: 'Helper text' },
    disabled:   { table: { disable: true } },
    accept:     { table: { disable: true } },
    onChange:   { table: { disable: true } },
    className:  { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  name: 'Vertical',
  args: { layout: 'vertical' },
}

export const Horizontal: Story = {
  name: 'Horizontal',
  args: { layout: 'horizontal' },
}

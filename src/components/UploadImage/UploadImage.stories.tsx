import type { Meta, StoryObj } from '@storybook/react'
import UploadImage from './UploadImage'

const meta: Meta<typeof UploadImage> = {
  title: 'Components/Upload Image',
  component: UploadImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'File upload field for images with vertical and horizontal layout variants. Accepts configurable file formats via the `accept` prop and exposes a helper-text slot for size/format constraints.',
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
    layout:     'vertical',
    helperText:
      'Image format .jpg .jpeg .png and maximum size per file is 5 MB.',
  },
  argTypes: {
    layout: {
      description: 'Stacks the drop-zone and meta vertically, or places them side-by-side horizontally.',
      control: 'radio',
      options: ['vertical', 'horizontal'],
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' },
      },
    },
    label: {
      description: 'Label text shown above the upload area.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    helperText: {
      description: 'Format and size constraints shown below the drop-zone.',
      control: 'text',
      name: 'Helper text',
      table: { type: { summary: 'string' } },
    },
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

import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import ProgressBar, { type ProgressStep } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Stepped progress indicator for multi-step form flows. Displays the current step out of four and exposes back/next navigation callbacks.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1116px]">
        <Story />
      </div>
    ),
  ],
  args: {
    step: 1,
  },
  argTypes: {
    step: {
      description: 'Active step number. Step 4 shows the launch confirmation state.',
      control: 'radio',
      options: [1, 2, 3, 4],
      name:    'Step',
      table: {
        type: { summary: '1 | 2 | 3 | 4' },
        defaultValue: { summary: '1' },
      },
    },
    onBack:   { table: { disable: true } },
    onSave:   { table: { disable: true } },
    onNext:   { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()

    const setStep = (next: ProgressStep) => updateArgs({ step: next })

    const step = args.step ?? 1

    return (
      <ProgressBar
        {...args}
        step={step}
        onBack={() => setStep(Math.max(1, step - 1) as ProgressStep)}
        onNext={() => setStep(Math.min(4, step + 1) as ProgressStep)}
        onSave={() => undefined}
      />
    )
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Step2: Story = {
  args: { step: 2 },
}

export const Step3: Story = {
  args: { step: 3 },
}

export const Step4: Story = {
  name: 'Step 4 (Launch)',
  args: { step: 4 },
}

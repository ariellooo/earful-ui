import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SelectionGrid, { type SelectionGridItem } from './SelectionGrid'

const FORUM_ITEMS: SelectionGridItem[] = [
  { id: 'reddit',       label: 'Reddit',                  checked: false },
  { id: 'quora',        label: 'Quora',                   checked: false },
  { id: 'ign',          label: 'IGN',                     checked: false },
  { id: '4chan',        label: '4Chan',                   checked: false },
  { id: 'lihkg',        label: 'LIHKG (HK)',              checked: false },
  { id: 'baby-kingdom', label: 'Baby Kingdom',            checked: false },
  { id: 'hk-discuss',   label: 'HK Discuss',              checked: false },
  { id: 'dcinside',     label: 'Dcinside (디시인사이드)', checked: false },
  { id: 'daum-cafe',    label: 'Daum Cafe (다음 카페)',   checked: false },
  { id: 'instiz',       label: 'Instiz (인스티즈)',       checked: false },
]

const meta: Meta<typeof SelectionGrid> = {
  title: 'Components/Selection Grid',
  component: SelectionGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Multi-select grid of labeled items used for toggling data sources such as forums. Each item carries its own checked state and fires `onToggle` with the item id.',
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
    title:   'Forum',
    items:   FORUM_ITEMS,
    columns: 2,
  },
  argTypes: {
    title: {
      description: 'Heading displayed above the grid.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    columns: {
      description: 'Number of columns in the grid layout.',
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: '2' } },
    },
    items: { table: { disable: true } },
    onToggle: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Forum: Story = {
  name: 'Forum',
  render: function Render(args) {
    const [items, setItems] = useState(args.items ?? FORUM_ITEMS)

    return (
      <SelectionGrid
        {...args}
        items={items}
        onToggle={(id) => {
          setItems((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, checked: !item.checked } : item,
            ),
          )
        }}
      />
    )
  },
}

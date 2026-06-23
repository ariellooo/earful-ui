import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import Dropdown, { type DropdownStatusItem } from './Dropdown'

const DEFAULT_STATUS_ITEMS: DropdownStatusItem[] = [
  { label: 'Draft',     checked: false },
  { label: 'Inactive',  checked: false },
  { label: 'Launched',  checked: false },
  { label: 'Completed', checked: false },
]

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:         { table: { disable: true } },
    title:           { control: 'text' },
    message:         { control: 'text' },
    date:            { control: 'text' },
    items:           { table: { disable: true } },
    statusItems:     { table: { disable: true } },
    notifications:   { table: { disable: true } },
    onClose:         { table: { disable: true } },
    onSelect:        { table: { disable: true } },
    onStatusChange:  { table: { disable: true } },
    onNotification:  { table: { disable: true } },
    className:       { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Profile ───────────────────────────────────────────────────────────────────
export const Profile: Story = {
  name: 'Profile',
  args: {
    variant: 'profile',
    title:   'Profile',
  },
  argTypes: {
    message: { table: { disable: true } },
    date:    { table: { disable: true } },
  },
}

// ── Notification ──────────────────────────────────────────────────────────────
export const Notification: Story = {
  name: 'Notification',
  args: {
    variant: 'notification',
    title:   'Notification',
    message: 'Lorem ipsum dolor sit amet',
    date:    '03-18',
  },
}

// ── Edit ──────────────────────────────────────────────────────────────────────
export const Edit: Story = {
  name: 'Edit',
  args: {
    variant: 'edit',
  },
  argTypes: {
    title:   { table: { disable: true } },
    message: { table: { disable: true } },
    date:    { table: { disable: true } },
  },
}

// ── Status ────────────────────────────────────────────────────────────────────
export const Status: Story = {
  name: 'Status',
  args: {
    variant:     'status',
    title:       'Status',
    statusItems: DEFAULT_STATUS_ITEMS,
  },
  argTypes: {
    message: { table: { disable: true } },
    date:    { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<typeof args>()
    const items = args.statusItems ?? DEFAULT_STATUS_ITEMS

    return (
      <Dropdown
        {...args}
        statusItems={items}
        onStatusChange={(item, checked) => {
          updateArgs({
            statusItems: items.map((row) =>
              row.label === item.label ? { ...row, checked } : row,
            ),
          })
        }}
      />
    )
  },
}

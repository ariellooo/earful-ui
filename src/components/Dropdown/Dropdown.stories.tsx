import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Dropdown, { STRATEGY_ITEMS, type DropdownStatusItem, type DropdownStrategyItem } from './Dropdown'

const STATUS_ITEMS: DropdownStatusItem[] = [
  { label: 'Draft',     checked: false },
  { label: 'Inactive',  checked: false },
  { label: 'Launched',  checked: false },
  { label: 'Completed', checked: false },
]

const DEFAULT_STRATEGY_ITEMS: DropdownStrategyItem[] = STRATEGY_ITEMS.map(item => ({
  ...item,
  checked: false,
}))

const layoutControlHidden = {
  statusLayout:   { control: false, table: { disable: true } },
  strategyLayout: { control: false, table: { disable: true } },
} as const

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:         { table: { disable: true } },
    title:           { control: 'text' },
    message:         { control: 'text' },
    date:            { control: 'text' },
    items:           { table: { disable: true } },
    statusItems:     { table: { disable: true } },
    strategyItems:   { table: { disable: true } },
    notifications:   { table: { disable: true } },
    onClose:         { table: { disable: true } },
    onSelect:        { table: { disable: true } },
    onStatusChange:  { table: { disable: true } },
    onStrategyChange: { table: { disable: true } },
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
    ...layoutControlHidden,
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
  argTypes: layoutControlHidden,
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
    ...layoutControlHidden,
  },
}

// ── Status ────────────────────────────────────────────────────────────────────
export const Status: Story = {
  name: 'Status',
  args: {
    statusLayout: 'default',
  },
  parameters: {
    controls: { include: ['statusLayout'] },
  },
  argTypes: {
    statusLayout: {
      control: 'radio',
      options: ['default', 'compact'],
    },
  },
  render: function Render(args) {
    const [items, setItems] = useState(STATUS_ITEMS)

    return (
      <Dropdown
        variant="status"
        title="Status"
        statusLayout={args.statusLayout ?? 'default'}
        statusItems={items}
        onStatusChange={(item, checked) => {
          setItems((prev) =>
            prev.map((row) =>
              row.label === item.label ? { ...row, checked } : row,
            ),
          )
        }}
      />
    )
  },
}

// ── Strategy ──────────────────────────────────────────────────────────────────
export const Strategy: Story = {
  name: 'Strategy',
  args: {
    strategyLayout: 'default',
  },
  parameters: {
    controls: { include: ['strategyLayout'] },
  },
  argTypes: {
    strategyLayout: {
      control: 'radio',
      options: ['default', 'compact'],
    },
  },
  render: function Render(args) {
    const [items, setItems] = useState(DEFAULT_STRATEGY_ITEMS)

    return (
      <Dropdown
        variant="strategy"
        title="Strategy"
        strategyLayout={args.strategyLayout ?? 'default'}
        strategyItems={items}
        onStrategyChange={(item, checked) => {
          setItems((prev) =>
            prev.map((row) =>
              row.label === item.label ? { ...row, checked } : row,
            ),
          )
        }}
      />
    )
  },
}

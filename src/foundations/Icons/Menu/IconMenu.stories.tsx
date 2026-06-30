import type { Meta, StoryObj } from '@storybook/react'
import IconMenu, { ICON_MENU_NAMES } from './IconMenu'

const meta: Meta<typeof IconMenu> = {
  title: 'Foundations/Icons/Menu',
  component: IconMenu,
  parameters: { layout: 'centered' },
  args: { name: 'dashboard', size: 24 },
  argTypes: {
    name:  { control: 'select', options: ICON_MENU_NAMES },
    size:  { control: { type: 'range', min: 16, max: 64, step: 4 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard:           Story = { args: { name: 'dashboard' } }
export const Window:              Story = { args: { name: 'window' } }
export const Bot:                 Story = { args: { name: 'bot' } }
export const ShieldCheck:         Story = { args: { name: 'shield-check' } }
export const MessageSquareText:   Story = { args: { name: 'message-square-text' } }
export const Hash:                Story = { args: { name: 'hash' } }
export const User:                Story = { args: { name: 'user' } }
export const Seeding:             Story = { args: { name: 'seeding' } }
export const ScanFace:            Story = { args: { name: 'scan-face' } }

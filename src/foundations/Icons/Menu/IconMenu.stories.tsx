import type { Meta, StoryObj } from '@storybook/react'
import IconMenu, { ICON_MENU_NAMES } from './IconMenu'

const meta: Meta<typeof IconMenu> = {
  title: 'Foundations/Icons/Menu',
  component: IconMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sidebar navigation icons for app sections and menu items. Sized for nav rails and compact menus across the product shell.',
      },
    },
  },
  args: { name: 'dashboard', size: 24 },
  argTypes: {
    name: {
      description: 'Icon name from the menu icon library.',
      control: 'select',
      options: ICON_MENU_NAMES,
      table: { type: { summary: 'IconMenuName' } },
    },
    size: {
      description: 'Rendered width and height in pixels.',
      control: { type: 'range', min: 16, max: 64, step: 4 },
      table: { type: { summary: 'number' }, defaultValue: { summary: '24' } },
    },
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

import type { Meta, StoryObj } from '@storybook/react'
import Icon, { ICON_NAMES } from './IconFunction'

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icons/Function',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Lucide-based function icons for actions, navigation, and UI controls. Icons inherit from the icon-default token and scale cleanly from 12px to 64px.',
      },
    },
  },
  args: { name: 'search', size: 24 },
  argTypes: {
    name: {
      description: 'Icon name from the function icon library.',
      control: 'select',
      options: ICON_NAMES,
      table: { type: { summary: 'IconName' } },
    },
    size: {
      description: 'Rendered width and height in pixels.',
      control: { type: 'range', min: 12, max: 64, step: 4 },
      table: { type: { summary: 'number' }, defaultValue: { summary: '24' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── UI Controls ───────────────────────────────────────────────────────────────
export const Search: Story           = { args: { name: 'search' } }
export const ListFilter: Story       = { args: { name: 'list-filter' } }
export const EllipsisVertical: Story = { args: { name: 'ellipsis-vertical' } }
export const Setting: Story          = { args: { name: 'setting' } }

// ── Navigation ────────────────────────────────────────────────────────────────
export const ChevronLeft: Story    = { args: { name: 'chevron-left' } }
export const ChevronRight: Story   = { args: { name: 'chevron-right' } }
export const ChevronUp: Story      = { args: { name: 'chevron-up' } }
export const ChevronDown: Story    = { args: { name: 'chevron-down' } }
export const ArrowLeft: Story      = { args: { name: 'arrow-left' } }
export const ArrowRight: Story     = { args: { name: 'arrow-right' } }
export const ArrowUp: Story        = { args: { name: 'arrow-up' } }
export const ArrowDown: Story      = { args: { name: 'arrow-down' } }

// ── Actions ───────────────────────────────────────────────────────────────────
export const Plus: Story           = { args: { name: 'plus' } }
export const Check: Story          = { args: { name: 'check' } }
export const Trash: Story          = { args: { name: 'trash' } }
export const Delete: Story         = { args: { name: 'delete' } }
export const Pencil: Story         = { args: { name: 'pencil' } }
export const Save: Story           = { args: { name: 'save' } }
export const Download: Story       = { args: { name: 'download' } }
export const Upload: Story         = { args: { name: 'upload' } }
export const Repeat: Story         = { args: { name: 'repeat' } }
export const ExternalLink: Story   = { args: { name: 'external-link' } }

// ── Communication ─────────────────────────────────────────────────────────────
export const Bell: Story              = { args: { name: 'bell' } }
export const BellDot: Story           = { args: { name: 'bell-dot' } }
export const StickyNoteComment: Story = { args: { name: 'sticky-note-comment' } }
export const CommentSquarePlus: Story = { args: { name: 'comment-square-plus' } }

// ── Content ───────────────────────────────────────────────────────────────────
export const Star: Story           = { args: { name: 'star' } }
export const WandSparkles: Story   = { args: { name: 'wand-sparkles' } }
export const Calendar: Story       = { args: { name: 'calendar' } }
export const Image: Story          = { args: { name: 'image' } }
export const Link: Story           = { args: { name: 'link' } }
export const Dot: Story            = { args: { name: 'dot' } }

// ── Misc ──────────────────────────────────────────────────────────────────────
export const Languages: Story      = { args: { name: 'languages' } }
export const LogOut: Story         = { args: { name: 'log-out' } }
export const DollarSign: Story     = { args: { name: 'dollar-sign' } }

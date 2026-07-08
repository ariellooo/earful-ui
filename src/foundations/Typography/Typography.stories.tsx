import type { Meta, StoryObj } from '@storybook/react'
import Typography from './Typography'

const meta: Meta<typeof Typography> = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Type scale preview for display (TT Norms Pro) and body (Inter) styles. Use these tokens for headings, subtitles, and body copy across product screens.',
      },
    },
  },
  argTypes: {
    name: {
      description: 'Display name of the type style, e.g. "H1 / Heading 1".',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    fontDescription: {
      description: 'Human-readable font family and weight label.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    sizeLabel: {
      description: 'Human-readable size label shown in the spec row.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    fontFamily: {
      description: 'Token-backed font family role.',
      control: 'radio',
      options: ['display', 'body'],
      table: {
        type: { summary: "'display' | 'body'" },
        defaultValue: { summary: 'body' },
      },
    },
    fontSize: {
      description: 'Font size in pixels.',
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    fontWeight: {
      description: 'Font weight for the style.',
      control: 'radio',
      options: [400, 500, 700],
      table: { type: { summary: '400 | 500 | 700' } },
    },
    lineHeight: {
      description: 'Line height as a unitless ratio or fixed pixel value.',
      control: 'text',
      table: { type: { summary: 'number | string' } },
    },
    letterSpacing: {
      description: 'Letter spacing in pixels.',
      control: 'number',
      table: { type: { summary: 'number' } },
    },
    sample: {
      description: 'Optional override for the preview sample text.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Headings & Subtitles (TT Norms Pro) ───────────────────────────────────────

export const H1: Story = {
  args: {
    name: 'H1 / Heading 1',
    fontDescription: 'TT Norms Pro (Bold)',
    sizeLabel: '40px',
    fontFamily: 'display',
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: 0.25,
  },
}

export const H2: Story = {
  args: {
    name: 'H2 / Heading 2',
    fontDescription: 'TT Norms Pro (Bold)',
    sizeLabel: '32px',
    fontFamily: 'display',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: 0.25,
  },
}

export const H3: Story = {
  args: {
    name: 'H3 / Heading 3',
    fontDescription: 'TT Norms Pro (Bold)',
    sizeLabel: '24px',
    fontFamily: 'display',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: 0.2,
  },
}

export const Subtitle1: Story = {
  args: {
    name: 'Subtitle 1',
    fontDescription: 'TT Norms Pro (Bold)',
    sizeLabel: '18px font size',
    fontFamily: 'display',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '32px',
    letterSpacing: 0.1,
  },
}

// ── Body 1 — 15px (Inter) ──────────────────────────────────────────────────────

export const Body1Bold: Story = {
  args: {
    name: 'Body 1 Bold',
    fontDescription: 'Inter (Bold)',
    sizeLabel: '15px',
    fontFamily: 'body',
    fontSize: 15,
    fontWeight: 700,
    lineHeight: '24px',
    letterSpacing: 0.2,
  },
}

export const Body1Medium: Story = {
  args: {
    name: 'Body 1 Medium',
    fontDescription: 'Inter (Medium)',
    sizeLabel: '15px font size',
    fontFamily: 'body',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: 0.2,
  },
}

export const Body1Regular: Story = {
  args: {
    name: 'Body 1 Regular',
    fontDescription: 'Inter (Regular)',
    sizeLabel: '15px font size',
    fontFamily: 'body',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '24px',
  },
}

// ── Body 2 — 12px (Inter) ──────────────────────────────────────────────────────

export const Body2Bold: Story = {
  args: {
    name: 'Body 2 Bold',
    fontDescription: 'Inter (Bold)',
    sizeLabel: '12px font size',
    fontFamily: 'body',
    fontSize: 12,
    fontWeight: 700,
    lineHeight: '24px',
  },
}

export const Body2Medium: Story = {
  args: {
    name: 'Body 2 Medium',
    fontDescription: 'Inter (Medium)',
    sizeLabel: '12px font size',
    fontFamily: 'body',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: 0.2,
  },
}

export const Body2Regular: Story = {
  args: {
    name: 'Body 2 Regular',
    fontDescription: 'Inter (Regular)',
    sizeLabel: '12px font size',
    fontFamily: 'body',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '24px',
  },
}

// ── Body 3 — 10px (Inter) ──────────────────────────────────────────────────────

export const Body3Bold: Story = {
  args: {
    name: 'Body 3 Bold',
    fontDescription: 'Inter (Bold)',
    sizeLabel: '10px font size',
    fontFamily: 'body',
    fontSize: 10,
    fontWeight: 700,
    lineHeight: '16px',
  },
}

export const Body3Regular: Story = {
  args: {
    name: 'Body 3 Regular',
    fontDescription: 'Inter (Regular)',
    sizeLabel: '10px font size',
    fontFamily: 'body',
    fontSize: 10,
    fontWeight: 400,
    lineHeight: '16px',
  },
}

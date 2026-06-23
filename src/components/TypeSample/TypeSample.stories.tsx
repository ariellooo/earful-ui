import type { Meta, StoryObj } from '@storybook/react'
import TypeSample from './TypeSample'

const meta: Meta<typeof TypeSample> = {
  title: 'Design System/Type Sample',
  component: TypeSample,
  parameters: { layout: 'padded' },
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

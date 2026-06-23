import type { Meta, StoryObj } from '@storybook/react'
import ColorSwatch from './ColorSwatch'

const meta: Meta<typeof ColorSwatch> = {
  title: 'Design System/Color Swatch',
  component: ColorSwatch,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    hex: { control: 'color' },
    bordered: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Primary ───────────────────────────────────────────────────────────────────
export const Primary: Story = {
  args: { label: '000', hex: '#2BC7E0' },
}

// ── Secondary ─────────────────────────────────────────────────────────────────
export const Secondary: Story = {
  args: { label: '000', hex: '#FF801A' },
}

// ── Brand: Blue ───────────────────────────────────────────────────────────────
export const BrandBlue: Story = {
  args: { label: 'Blue', hex: '#2BC7E0' },
}

// ── Brand: Orange ─────────────────────────────────────────────────────────────
export const BrandOrange: Story = {
  args: { label: 'Orange', hex: '#FF801A' },
}

// ── Brand: Indigo ─────────────────────────────────────────────────────────────
export const BrandIndigo: Story = {
  args: { label: 'Indigo', hex: '#085B92' },
}

// ── Brand: Purple ─────────────────────────────────────────────────────────────
export const BrandPurple: Story = {
  args: { label: 'Purple', hex: '#9278FF' },
}

// ── Brand: Mint ───────────────────────────────────────────────────────────────
export const BrandMint: Story = {
  args: { label: 'Mint', hex: '#6ADE94' },
}

// ── Semantic: Red ─────────────────────────────────────────────────────────────
export const SemanticRed: Story = {
  args: { label: 'Red', hex: '#D20032' },
}

// ── Semantic: Yellow ──────────────────────────────────────────────────────────
export const SemanticYellow: Story = {
  args: { label: 'Yellow', hex: '#EAAC00' },
}

// ── Semantic: Green ───────────────────────────────────────────────────────────
export const SemanticGreen: Story = {
  args: { label: 'Green', hex: '#009E36' },
}

// ── Greyscale: 900 ────────────────────────────────────────────────────────────
export const Greyscale900: Story = {
  args: { label: '900', hex: '#0F172A' },
}

// ── Greyscale: 700 ────────────────────────────────────────────────────────────
export const Greyscale700: Story = {
  args: { label: '700', hex: '#334155' },
}

// ── Greyscale: 500 ────────────────────────────────────────────────────────────
export const Greyscale500: Story = {
  args: { label: '500', hex: '#64748B' },
}

// ── Greyscale: 300 ────────────────────────────────────────────────────────────
export const Greyscale300: Story = {
  args: { label: '300', hex: '#CBD5E1' },
}

// ── Greyscale: 100 ────────────────────────────────────────────────────────────
export const Greyscale100: Story = {
  args: { label: '100', hex: '#F1F5F9' },
}

// ── Greyscale: 50 ─────────────────────────────────────────────────────────────
export const Greyscale50: Story = {
  args: { label: '50', hex: '#F8FAFC' },
}

// ── Greyscale: 0 (white, bordered) ────────────────────────────────────────────
export const Greyscale0: Story = {
  args: { label: '0', hex: '#FFFFFF', bordered: true },
}

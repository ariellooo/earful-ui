import type { Meta, StoryObj } from '@storybook/react'
import { ColorGroup, type ColorSwatchItem } from './ColorSwatch'

const BRAND_COLORS: ColorSwatchItem[] = [
  { label: 'Blue',   hex: '#2BC7E0' },
  { label: 'Orange', hex: '#FF801A' },
  { label: 'Indigo', hex: '#085B92' },
  { label: 'Purple', hex: '#9278FF' },
  { label: 'Mint',   hex: '#6ADE94' },
]

const SEMANTIC_COLORS: ColorSwatchItem[] = [
  { label: 'Red',    hex: '#D20032' },
  { label: 'Yellow', hex: '#EAAC00' },
  { label: 'Green',  hex: '#009E36' },
]

const PRIMARY_COLORS: ColorSwatchItem[] = [
  { label: 'Primary', hex: '#2BC7E0' },
]

const SECONDARY_COLORS: ColorSwatchItem[] = [
  { label: 'Secondary', hex: '#FF801A' },
]

const GREYSCALE_COLORS: ColorSwatchItem[] = [
  { label: '900', hex: '#0F172A' },
  { label: '700', hex: '#334155' },
  { label: '500', hex: '#64748B' },
  { label: '300', hex: '#CBD5E1' },
  { label: '100', hex: '#F1F5F9' },
  { label: '50',  hex: '#F8FAFC' },
  { label: '0',   hex: '#FFFFFF', bordered: true },
]

const meta: Meta<typeof ColorGroup> = {
  title: 'Foundations/Colors',
  component: ColorGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Design token colour palette covering brand, primary, secondary, semantic, and greyscale roles. Reference these hex values when binding colour tokens in components and layouts.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Group heading shown above the swatch row.',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    colors: {
      description: 'Swatches to render in the group.',
      table: { type: { summary: 'ColorSwatchItem[]' }, disable: true },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BrandColor: Story = {
  name: 'Brand Color',
  render: () => <ColorGroup title="Brand Color" colors={BRAND_COLORS} />,
}

export const PrimaryColor: Story = {
  name: 'Primary Color',
  render: () => <ColorGroup title="Primary Color" colors={PRIMARY_COLORS} />,
}

export const SecondaryColor: Story = {
  name: 'Secondary Color',
  render: () => <ColorGroup title="Secondary Color" colors={SECONDARY_COLORS} />,
}

export const SemanticColor: Story = {
  name: 'Semantic Color',
  render: () => <ColorGroup title="Semantic Color" colors={SEMANTIC_COLORS} />,
}

export const Greyscale: Story = {
  name: 'Greyscale',
  render: () => <ColorGroup title="Greyscale" colors={GREYSCALE_COLORS} />,
}

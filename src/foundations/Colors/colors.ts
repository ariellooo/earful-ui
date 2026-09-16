import type { ColorSwatchItem } from './ColorSwatch'

export const BRAND_COLORS: ColorSwatchItem[] = [
  { label: 'Blue',   hex: '#2BC7E0' },
  { label: 'Orange', hex: '#FF801A' },
  { label: 'Indigo', hex: '#085B92' },
  { label: 'Purple', hex: '#9278FF' },
  { label: 'Mint',   hex: '#6ADE94' },
]

export const PRIMARY_COLORS: ColorSwatchItem[] = [
  { label: 'Primary', hex: '#2BC7E0' },
]

export const SECONDARY_COLORS: ColorSwatchItem[] = [
  { label: 'Secondary', hex: '#FF801A' },
]

export const SEMANTIC_COLORS: ColorSwatchItem[] = [
  { label: 'Red',    hex: '#D20032' },
  { label: 'Yellow', hex: '#EAAC00' },
  { label: 'Green',  hex: '#009E36' },
]

export const GREYSCALE_COLORS: ColorSwatchItem[] = [
  { label: '900', hex: '#0F172A' },
  { label: '700', hex: '#334155' },
  { label: '500', hex: '#64748B' },
  { label: '300', hex: '#CBD5E1' },
  { label: '100', hex: '#F1F5F9' },
  { label: '50',  hex: '#F8FAFC' },
  { label: '0',   hex: '#FFFFFF', bordered: true },
]

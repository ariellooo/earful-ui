/**
 * SearchBar — sourced from Figma node 374:2084 (Earful 2026).
 *
 * 328 px wide · 48 px tall · white bg · greyscale-300 border · shadow-100 · 8 px radius
 * Search icon on the left · Inter Medium 15 px · no helper text
 */

import { useState } from 'react'
import { IconGlyph } from '../Icon/Icon'

export type SearchBarProps = {
  placeholder?: string
}

export default function SearchBar({ placeholder = 'Search' }: SearchBarProps) {
  const [value, setValue]   = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex items-center gap-2 pl-3 pr-4 h-12 w-[328px]
      bg-surface-white border border-greyscale-300 rounded-lg shadow-100
      focus-within:border-greyscale-500 transition-colors cursor-text">
      <IconGlyph name="search" size={24} className="shrink-0" />
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused || value ? '' : placeholder}
        className="flex-1 min-w-0 bg-transparent
          focus:outline-none focus:ring-0 focus-visible:outline-none
          font-body font-medium text-[15px] leading-6 tracking-[0.2px]
          text-text-default placeholder:text-[#94a3b8]"
      />
    </div>
  )
}

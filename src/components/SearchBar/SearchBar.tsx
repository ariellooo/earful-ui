/**
 * SearchBar — sourced from Figma node 374:2084 (Earful 2026).
 *
 * 328 px wide · 48 px tall · white bg · greyscale-300 border · shadow-100 · 8 px radius
 * Search icon on the left · Inter Medium 15 px · no helper text
 */

import { useState } from 'react'

export type SearchBarProps = {
  placeholder?: string
}

function SearchIcon() {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden className="shrink-0 text-text-default"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  )
}

export default function SearchBar({ placeholder = 'Search' }: SearchBarProps) {
  const [value, setValue]   = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex items-center gap-2 pl-3 pr-4 h-12 w-[328px]
      bg-surface-white border border-greyscale-300 rounded-lg shadow-100
      focus-within:border-greyscale-500 transition-colors cursor-text">
      <SearchIcon />
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

/**
 * InputField — sourced from Figma node 386:2562 (Earful 2026).
 *
 * variant="single"  — 48 px single-line <input>
 * variant="multi"   — 160 px multi-line <textarea>
 *
 * Both: 312 px wide · white bg · greyscale-300 border · shadow-100 · 8 px radius
 * Helper text: Inter Regular 10 px · text-default · below the field
 */

import { useState } from 'react'

export type InputFieldVariant = 'single' | 'multi'

export type InputFieldProps = {
  variant?:    InputFieldVariant
  placeholder?: string
  helperText?:  string
  defaultValue?: string
}

const SHARED_FIELD =
  'w-full bg-surface-white border border-greyscale-300 rounded-lg px-4 py-2 shadow-100 ' +
  'font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default ' +
  'placeholder:text-[#94a3b8] placeholder:text-[16px] ' +
  'focus:outline-none focus:border-greyscale-500 transition-colors'

export default function InputField({
  variant     = 'single',
  placeholder = 'Type something...',
  helperText  = 'Information',
  defaultValue,
}: InputFieldProps) {
  const [value, setValue] = useState(defaultValue ?? '')

  return (
    <div className="flex flex-col gap-1 items-start w-[312px]">
      {variant === 'single' ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`${SHARED_FIELD} h-12`}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className={`${SHARED_FIELD} h-[160px] resize-none items-start`}
        />
      )}
      {helperText && (
        <p className="font-body font-normal text-[10px] leading-4 text-text-default w-full">
          {helperText}
        </p>
      )}
    </div>
  )
}

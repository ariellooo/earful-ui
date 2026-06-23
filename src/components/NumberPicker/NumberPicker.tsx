/**
 * NumberPicker — sourced from Figma nodes 1033:6284 / 1033:6275 (Earful 2026).
 *
 * Field: 80 × 48 px · surface-primary · "No." · chevron-up/down (12 px)
 * Suffix: "topics" | "comments per topic"
 */

import { useState } from 'react'
import { ICON_ASSETS, type IconName } from '../Icon/Icon'

export type NumberPickerVariant = 'topics' | 'comments'

export type NumberPickerProps = {
  variant?:       NumberPickerVariant
  value?:         number
  defaultValue?:  number
  min?:           number
  max?:           number
  onChange?:      (value: number) => void
}

const SUFFIX_LABEL: Record<NumberPickerVariant, string> = {
  topics:   'topics',
  comments: 'comments per topic',
}

/** Figma 1033:6275 — 80×48 · surface-primary · px/py 8/16 · 8 px radius */
const PICKER_FIELD =
  'box-border flex h-[48px] w-[80px] shrink-0 items-center justify-between ' +
  'rounded-[8px] px-[8px] py-[16px] bg-surface-primary'

// ─── Chevron icon via mask (12 px) ────────────────────────────────────────────

function PickerIcon({ name }: { name: Extract<IconName, 'chevron-up' | 'chevron-down'> }) {
  return (
    <span
      aria-hidden
      style={{
        display:            'inline-block',
        width:              12,
        height:             12,
        flexShrink:         0,
        backgroundColor:    '#334155',
        WebkitMaskImage:    `url(${ICON_ASSETS[name]})`,
        maskImage:          `url(${ICON_ASSETS[name]})`,
        WebkitMaskSize:     'contain',
        maskSize:           'contain',
        WebkitMaskRepeat:   'no-repeat',
        maskRepeat:         'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition:       'center',
      }}
    />
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NumberPicker({
  variant      = 'topics',
  value:        controlledValue,
  defaultValue = 1,
  min          = 1,
  max          = 99,
  onChange,
}: NumberPickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = controlledValue ?? internalValue

  const setValue = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next))
    if (clamped === value) return
    if (controlledValue === undefined) setInternalValue(clamped)
    onChange?.(clamped)
  }

  return (
    <div className="inline-flex items-center gap-1">
      {/* Number Picker field — Figma 1033:6275 */}
      <div
        className={PICKER_FIELD}
        style={{ backgroundColor: 'var(--color-surface-primary)' }}
        role="group"
        aria-label="Number picker"
        aria-valuenow={value}
      >
        <span className="font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default whitespace-nowrap shrink-0">
          {value}
        </span>

        <div className="flex h-9 w-3 shrink-0 flex-col items-start justify-center gap-2">
          <button
            type="button"
            aria-label="Increase"
            onClick={() => setValue(value + 1)}
            className="inline-flex size-3 items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
          >
            <PickerIcon name="chevron-up" />
          </button>
          <button
            type="button"
            aria-label="Decrease"
            onClick={() => setValue(value - 1)}
            className="inline-flex size-3 items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
          >
            <PickerIcon name="chevron-down" />
          </button>
        </div>
      </div>

      {/* Suffix label — Figma 1033:6267 */}
      <div className="flex h-9 shrink-0 items-center p-2">
        <span className="font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default whitespace-nowrap">
          {SUFFIX_LABEL[variant]}
        </span>
      </div>
    </div>
  )
}

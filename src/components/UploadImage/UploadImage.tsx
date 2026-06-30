/**
 * UploadImage — Figma nodes 5390:7311 · 5390:7298 (vertical) · 5390:7313 (horizontal).
 *
 * Vertical:   80 × 80 box · image icon · "Upload" · helper below (4 px gap)
 * Horizontal: 312 px wide · icon + "Upload an image" · helper below (4 px gap)
 */

import { useId, useRef, type ReactNode } from 'react'
import { IconGlyph } from '../../foundations/Icons/Function/IconFunction'

const DEFAULT_HELPER_TEXT =
  'Image format .jpg .jpeg .png and maximum size per file is 5 MB.'

export type UploadImageLayout = 'vertical' | 'horizontal'

export type UploadImageProps = {
  layout?:     UploadImageLayout
  label?:      string
  helperText?: string
  accept?:     string
  disabled?:   boolean
  onChange?:   (file: File | null) => void
  className?:  string
}

const HELPER_TEXT = [
  'font-body font-normal text-[10px] leading-4',
  'text-text-default break-words w-full',
].join(' ')

const UPLOAD_BOX = [
  'rounded-lg border border-greyscale-300 bg-surface-white shadow-100',
  'px-4 py-2 transition-colors',
].join(' ')

function UploadTrigger({
  disabled,
  onClick,
  className,
  children,
}: {
  disabled?:  boolean
  onClick?:   () => void
  className?: string
  children:   ReactNode
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="Upload image"
      onClick={onClick}
      className={[
        UPLOAD_BOX,
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:border-greyscale-500 active:bg-surface-primary',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default function UploadImage({
  layout     = 'vertical',
  label,
  helperText = DEFAULT_HELPER_TEXT,
  accept     = 'image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png',
  disabled   = false,
  onChange,
  className  = '',
}: UploadImageProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const isHorizontal = layout === 'horizontal'

  const buttonLabel = label ?? (isHorizontal ? 'Upload an image' : 'Upload')

  const openPicker = () => inputRef.current?.click()

  return (
    <div
      className={[
        'flex flex-col items-start gap-1',
        isHorizontal ? 'w-[312px]' : 'w-20',
        className,
      ].join(' ')}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        disabled={disabled}
        hidden
        tabIndex={-1}
        aria-hidden
        style={{ display: 'none' }}
        onChange={(event) => {
          onChange?.(event.target.files?.[0] ?? null)
        }}
      />

      {isHorizontal ? (
        <UploadTrigger
          disabled={disabled}
          onClick={openPicker}
          className="flex w-full items-center"
        >
          <span className="inline-flex items-center gap-2">
            <IconGlyph name="image" size={24} />
            <span className="font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-default whitespace-nowrap">
              {buttonLabel}
            </span>
          </span>
        </UploadTrigger>
      ) : (
        <UploadTrigger
          disabled={disabled}
          onClick={openPicker}
          className="flex size-20 flex-col items-center justify-end"
        >
          <span className="inline-flex flex-col items-center gap-2">
            <IconGlyph name="image" size={24} />
            <span className="font-body font-medium text-[12px] leading-6 tracking-[0.2px] text-text-default whitespace-nowrap">
              {buttonLabel}
            </span>
          </span>
        </UploadTrigger>
      )}

      {helperText ? <p className={HELPER_TEXT}>{helperText}</p> : null}
    </div>
  )
}

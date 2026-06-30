/**
 * Form — Figma nodes 423:2369 · 980:4645 (Earful 2026).
 *
 * Social tabs · language header · repeating topic+comment blocks.
 * "+ New Topic" appends a new block; "+ New Comment" appends within a block.
 */

import { useState } from 'react'
import Button from '../Button/Button/Button'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'
import UploadImage from '../UploadImage/UploadImage'

// ─── Public types ──────────────────────────────────────────────────────────────

export type FormTab = {
  id:    string
  label: string
}

export type FormProps = {
  tabs?:        FormTab[]
  activeTabId?: string
  title?:       string
  onTabChange?: (tabId: string) => void
  onNewTopic?:  () => void
  className?:   string
}

// ─── Internal types ────────────────────────────────────────────────────────────

type FormComment = {
  id:   string
  text: string
}

type FormBlock = {
  id:          string
  topicText:   string
  uploadSlots: number
  comments:    FormComment[]
}

// ─── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_TABS: FormTab[] = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'youtube',  label: 'YouTube' },
]

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'

let _uid = 0
function uid() { return String(++_uid) }

function makeBlock(): FormBlock {
  return {
    id:          uid(),
    topicText:   LOREM,
    uploadSlots: 3,
    comments:    [{ id: uid(), text: LOREM }],
  }
}

const INITIAL_BLOCK: FormBlock = {
  id:          '0',
  topicText:   LOREM,
  uploadSlots: 3,
  comments:    [
    { id: 'c1', text: LOREM },
    { id: 'c2', text: LOREM },
  ],
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px w-full shrink-0 bg-line-default" aria-hidden />
}

function FieldLabel({ children }: { children: string }) {
  return (
    <p className="font-body font-bold text-[18px] leading-8 tracking-[0.1px] text-text-default whitespace-nowrap">
      {children}
    </p>
  )
}

function LabelColumn({ label }: { label?: string }) {
  return (
    <div className="flex h-10 w-[120px] shrink-0 items-center px-4">
      {label ? <FieldLabel>{label}</FieldLabel> : null}
    </div>
  )
}

function FormTabButton({
  label,
  active,
  onClick,
}: {
  label:   string
  active:  boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="relative flex h-12 w-[120px] shrink-0 flex-col items-center justify-center"
    >
      <span
        className={[
          'font-body font-bold text-[18px] leading-8 tracking-[0.1px] whitespace-nowrap',
          active ? 'text-primary' : 'text-text-default',
        ].join(' ')}
      >
        {label}
      </span>
      {active ? (
        <span
          className="absolute bottom-0 left-1/2 h-1 w-[100px] -translate-x-1/2 bg-primary"
          aria-hidden
        />
      ) : null}
    </button>
  )
}

function EntryActions({
  label,
}: {
  label: string
}) {
  return (
    <div className="flex h-10 shrink-0 items-center justify-end gap-2 p-2">
      <ButtonSquare type="icon" icon="pencil"           size="m" aria-label={`Edit ${label}`}           />
      <ButtonSquare type="icon" icon="languages"        size="m" aria-label={`Translate ${label}`}      />
      <ButtonSquare type="icon" icon="ellipsis-vertical" size="m" aria-label={`More options for ${label}`} />
    </div>
  )
}

function TextEntry({
  text,
  actionLabel,
}: {
  text:        string
  actionLabel: string
}) {
  return (
    <div className="flex min-h-10 w-full items-start justify-between">
      <p className="min-w-0 flex-1 p-2 font-body font-normal text-[15px] leading-6 text-text-default break-words">
        {text}
      </p>
      <EntryActions label={actionLabel} />
    </div>
  )
}

// ─── Block ─────────────────────────────────────────────────────────────────────

function FormBlockSection({
  block,
  onAddComment,
  onAddUpload,
}: {
  block:        FormBlock
  onAddComment: () => void
  onAddUpload:  () => void
}) {
  return (
    <div className="flex w-full flex-col">
      {/* Topic row */}
      <div className="flex w-full items-start gap-4">
        <LabelColumn label="Topic" />
        <div className="flex min-w-0 flex-1 flex-col gap-2 py-2">
          <TextEntry text={block.topicText} actionLabel="topic" />
          <div className="flex w-full items-center gap-2 px-2">
            {Array.from({ length: block.uploadSlots }, (_, i) => (
              <UploadImage key={i} layout="vertical" helperText="" />
            ))}
            <ButtonSquare
              type="icon"
              icon="plus"
              size="m"
              aria-label="Add image"
              onClick={onAddUpload}
            />
          </div>
        </div>
      </div>

      {/* Comment section */}
      <div className="flex w-full flex-col px-2">
        <Divider />

        <div className="flex w-full flex-col">
          {block.comments.map((comment, index) => (
            <div key={comment.id} className="flex w-full flex-col">
              <div className="flex w-full items-start gap-4">
                <LabelColumn label={index === 0 ? 'Comment' : undefined} />
                <div className="flex min-w-0 flex-1 flex-col py-2">
                  <TextEntry text={comment.text} actionLabel="comment" />
                  {index < block.comments.length - 1 ? <Divider /> : null}
                </div>
              </div>
            </div>
          ))}

          {/* New Comment */}
          <div className="flex w-full items-start gap-4">
            <LabelColumn />
            <div className="py-2">
              <Button
                label="New Comment"
                level="tertiary"
                size="m"
                iconLeft="plus"
                onClick={onAddComment}
              />
            </div>
          </div>
        </div>
      </div>

      <Divider />
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function Form({
  tabs        = DEFAULT_TABS,
  activeTabId: initialActiveTabId = 'facebook',
  title       = 'English',
  onTabChange,
  onNewTopic,
  className   = '',
}: FormProps) {
  const [activeTabId, setActiveTabId] = useState(initialActiveTabId)
  const [blocks, setBlocks] = useState<FormBlock[]>([INITIAL_BLOCK])

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId)
    onTabChange?.(tabId)
  }

  const handleNewTopic = () => {
    setBlocks((prev) => [...prev, makeBlock()])
    onNewTopic?.()
  }

  const handleAddComment = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, comments: [...b.comments, { id: uid(), text: LOREM }] }
          : b,
      ),
    )
  }

  const handleAddUpload = (blockId: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId ? { ...b, uploadSlots: b.uploadSlots + 1 } : b,
      ),
    )
  }

  return (
    <div className={['flex w-full flex-col', className].join(' ')}>
      {/* Tabs */}
      <div className="flex" role="tablist" aria-label="Social media">
        {tabs.map((tab) => (
          <FormTabButton
            key={tab.id}
            label={tab.label}
            active={tab.id === activeTabId}
            onClick={() => handleTabChange(tab.id)}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex w-full flex-col gap-2">
        <div className="flex h-12 w-full items-center justify-between px-4 py-2">
          <h2 className="min-w-0 font-body font-bold text-2xl leading-[1.25] tracking-[0.2px] text-brand-indigo">
            {title}
          </h2>
          <Button
            label="New Topic"
            level="primary"
            size="m"
            iconLeft="plus"
            primaryColor="blue"
            onClick={handleNewTopic}
            className="shrink-0"
          />
        </div>

        <Divider />

        {/* Blocks */}
        <div className="flex w-full flex-col">
          {blocks.map((block) => (
            <FormBlockSection
              key={block.id}
              block={block}
              onAddComment={() => handleAddComment(block.id)}
              onAddUpload={() => handleAddUpload(block.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

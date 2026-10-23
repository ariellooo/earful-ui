/**
 * Form — Figma node 630:8258 (Earful 2026).
 *
 * Social tabs · language header · repeating topic+comment blocks.
 * "+ New Topic" appends a new block; "+ New Comment" appends within a block.
 */

import { useState } from 'react'
import Button from '../Button/Button/Button'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'
import Tabs from '../Tabs/Tabs'
import UploadImage from '../UploadImage/UploadImage'
import topicImage1 from './assets/topic-1.jpg'
import topicImage2 from './assets/topic-2.jpg'
import topicImage3 from './assets/topic-3.jpg'
import {
  CAMPAIGN_421_CONTENT,
  CAMPAIGN_421_NEW_TOPIC,
  type CampaignFormContent,
} from './campaign421Content'

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
  id:              string
  topicText:       string
  uploadSlots:     number
  /** Thumbnail srcs for the first upload slots. Extra slots stay empty. */
  images:          string[]
  comments:        FormComment[]
  queuedComments:  FormComment[]
}

// ─── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_TABS: FormTab[] = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'threads',  label: 'Threads' },
]

const DEFAULT_TOPIC_IMAGES = [topicImage1, topicImage2, topicImage3]

let _uid = 0
function uid() { return String(++_uid) }

const DEFAULT_VISIBLE_COMMENTS = 2

function blockFromContent(
  content: CampaignFormContent,
  id = uid(),
  images: string[] = [],
): FormBlock {
  const comments = content.comments.map((comment) => ({
    id:   `${id}-c${comment.id}`,
    text: comment.content,
  }))

  return {
    id,
    topicText:      content.topic.content,
    uploadSlots:    Math.max(3, images.length),
    images,
    comments:       comments.slice(0, DEFAULT_VISIBLE_COMMENTS),
    queuedComments: comments.slice(DEFAULT_VISIBLE_COMMENTS),
  }
}

function makeBlock(): FormBlock {
  return blockFromContent(CAMPAIGN_421_NEW_TOPIC)
}

const INITIAL_BLOCK: FormBlock = blockFromContent(
  CAMPAIGN_421_CONTENT,
  '0',
  DEFAULT_TOPIC_IMAGES,
)

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
              <UploadImage
                key={i}
                layout="vertical"
                helperText=""
                previewSrc={block.images[i]}
                previewAlt={block.images[i] ? `Topic image ${i + 1}` : ''}
              />
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
      prev.map((b) => {
        if (b.id !== blockId || b.queuedComments.length === 0) return b
        const [next, ...queuedComments] = b.queuedComments
        return { ...b, comments: [...b.comments, next], queuedComments }
      }),
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
      <div className="flex items-center" role="tablist" aria-label="Social media">
        {tabs.map((tab) => {
          const selected = tab.id === activeTabId
          return (
            <Tabs
              key={tab.id}
              label={tab.label}
              variant={selected ? 'default' : 'disable'}
              selected={selected}
              onClick={() => handleTabChange(tab.id)}
            />
          )
        })}
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

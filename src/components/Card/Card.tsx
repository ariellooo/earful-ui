/**
 * Card — Figma nodes 1067:4933 (Login Failed) · 1076:2755 (variants) (Earful 2026).
 *
 * type:
 *   info    — circle-info fill · secondary + primary buttons
 *   alert   — triangle-alert fill · secondary + primary buttons
 *   warning — octagon-warning fill · secondary + primary buttons
 *   success — circle-success fill · primary button only
 *
 * Min 444 × 240 px · white bg · greyscale-300 border · shadow-200 · rounded-lg
 */

import Button from '../Button/Button/Button'
import IconSystem from '../../foundations/Icons/System/IconSystem'
import type { IconSystemType } from '../../foundations/Icons/System/IconSystem'

export type CardType = 'info' | 'alert' | 'warning' | 'success'

export type CardProps = {
  type?:            CardType
  heading?:         string
  body?:            string
  primaryButton?:   string
  secondaryButton?: string
  onPrimary?:       () => void
  onSecondary?:     () => void
  className?:       string
}

const ICON_TYPE: Record<CardType, IconSystemType> = {
  info:    'circle-info',
  alert:   'triangle-alert',
  warning: 'octagon-warning',
  success: 'circle-success',
}

const BTN = 'w-[125px] justify-center'

export default function Card({
  type            = 'alert',
  heading         = 'Login Failed',
  body            = 'We couldn\u2019t find your credentials in the system. Please check and try again.',
  primaryButton   = 'Try Again',
  secondaryButton = 'Get Help',
  onPrimary,
  onSecondary,
  className       = '',
}: CardProps) {
  const showSecondary = type !== 'success'

  return (
    <div
      className={[
        'flex min-h-[240px] min-w-[444px] flex-col gap-4',
        'rounded-lg border border-greyscale-300 bg-surface-white shadow-200',
        'pl-[23px] pr-[25px] pt-[23px] pb-[25px]',
        className,
      ].join(' ')}
    >
      <div className="flex min-h-[128px] flex-col gap-3">
        <div className="flex items-center gap-3">
          <IconSystem type={ICON_TYPE[type]} variant="fill" size={24} />
          <h3 className="font-body font-bold text-2xl leading-[1.25] tracking-[0.2px] text-text-default">
            {heading}
          </h3>
        </div>
        <p className="font-body font-normal text-[15px] leading-6 text-text-default">
          {body}
        </p>
      </div>

      <div className="flex h-12 items-center justify-end gap-4">
        {showSecondary ? (
          <Button
            label={secondaryButton}
            level="secondary"
            size="l"
            className={BTN}
            onClick={onSecondary}
          />
        ) : null}
        <Button
          label={primaryButton}
          level="primary"
          size="l"
          primaryColor="blue"
          className={BTN}
          onClick={onPrimary}
        />
      </div>
    </div>
  )
}

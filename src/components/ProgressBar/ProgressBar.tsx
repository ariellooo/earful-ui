/**
 * ProgressBar — Figma node 626:5705 (Earful 2026).
 *
 * Multi-step wizard header: back control, step indicators, Save + Next/Launch.
 */

import Button from '../Button/Button/Button'
import ButtonCircle from '../Button/ButtonCircle/ButtonCircle'
import ButtonSquare from '../Button/ButtonSquare/ButtonSquare'

export type ProgressStep = 1 | 2 | 3 | 4

const STEPS = [
  { number: 1, label: 'Basic Information' },
  { number: 2, label: 'Platform' },
  { number: 3, label: 'Content' },
  { number: 4, label: 'Confirm' },
] as const

type StepStatus = 'completed' | 'active' | 'pending'

function getStepStatus(stepNumber: number, currentStep: ProgressStep): StepStatus {
  if (stepNumber < currentStep) return 'completed'
  if (stepNumber === currentStep) return 'active'
  return 'pending'
}

function StepIndicator({ status, number }: { status: StepStatus; number: number }) {
  if (status === 'completed') {
    return (
      <span className="inline-flex shrink-0 pointer-events-none" aria-hidden>
        <ButtonCircle type="tick" />
      </span>
    )
  }

  if (status === 'active') {
    return (
      <span className="inline-flex shrink-0 pointer-events-none" aria-hidden>
        <ButtonCircle type="number" number={number} />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-disable font-body font-medium text-[15px] leading-6 tracking-[0.2px] text-text-invert"
    >
      {number}
    </span>
  )
}

export type ProgressBarProps = {
  step?:      ProgressStep
  onBack?:    () => void
  onSave?:    () => void
  onNext?:    () => void
  className?: string
}

export default function ProgressBar({
  step      = 1,
  onBack,
  onSave,
  onNext,
  className = '',
}: ProgressBarProps) {
  const nextLabel = step === 4 ? 'Launch' : 'Next'

  return (
    <div
      className={[
        'flex w-full items-center justify-between',
        className,
      ].join(' ')}
    >
      <div className="flex min-w-0 items-center gap-6">
        <ButtonSquare
          type="icon"
          icon="arrow-left"
          size="m"
          onClick={onBack}
          disabled={step === 1}
        />

        <div className="flex min-w-0 items-center gap-6">
          {STEPS.map(({ number, label }) => (
            <div key={number} className="flex items-center gap-2">
              <StepIndicator
                status={getStepStatus(number, step)}
                number={number}
              />
              <span className="whitespace-nowrap font-body text-[15px] font-bold leading-6 tracking-[0.2px] text-text-default">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          label="Save"
          level="primary"
          size="l"
          primaryColor="blue"
          onClick={onSave}
          className="w-24 justify-center"
        />
        <Button
          label={nextLabel}
          level="primary"
          size="l"
          primaryColor="orange"
          onClick={onNext}
          className="w-24 justify-center"
        />
      </div>
    </div>
  )
}

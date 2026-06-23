export const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Returns a Mon-start grid of Date objects for a given month (35 or 42 cells). */
export function buildCalendarDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1)
  const startOffset = (first.getDay() + 6) % 7
  const start = new Date(year, month, 1 - startOffset)
  const days: Date[] = []
  for (let i = 0; i < 35; i++) {
    days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  }
  const last = days[days.length - 1]
  if (last.getMonth() === month) {
    for (let i = 35; i < 42; i++) {
      days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
    }
  }
  return days
}

export function normalizeDate(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function offsetDays(base: Date, offset: number): Date {
  const d = normalizeDate(base)
  d.setDate(d.getDate() + offset)
  return d
}

export function computePresetRange(label: string, today: Date): { start: Date; end: Date } | null {
  if (label === 'Last 7 Days') {
    return { start: offsetDays(today, -6), end: normalizeDate(today) }
  }
  if (label === 'Last 14 Days') {
    return { start: offsetDays(today, -13), end: normalizeDate(today) }
  }
  if (label === 'Last Month') {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const end   = new Date(today.getFullYear(), today.getMonth(), 0)
    return { start, end }
  }
  return null
}

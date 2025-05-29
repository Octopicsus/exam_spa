export type DateFormat = 'day-month' | 'day-month-year' | 'month-only' | 'month-year'

export function formatDate(dateString: string, format: DateFormat = 'day-month'): string {
  const date = new Date(dateString)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  switch (format) {
    case 'day-month':
      return `${day} ${month}`
    case 'day-month-year':
      return `${day} ${month} ${year}`
    case 'month-only':
      return month
    case 'month-year':
      return `${month} ${year}`
    default:
      return `${day} ${month}`
  }
}
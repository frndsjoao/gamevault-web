export function stringToDate(dateString?: string | null): Date | undefined {
  if (!dateString) return undefined
  const date = new Date(dateString + "T00:00:00")
  return isNaN(date.getTime()) ? undefined : date
}

export function dateToString(date?: Date): string | null {
  if (!date) return null
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getTodayString = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

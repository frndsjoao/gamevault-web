import { clsx, type ClassValue } from "clsx"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showErrorToast(error: string | string[]) {
  const errors = Array.isArray(error) ? error : [error]
  errors.forEach((item) =>
    toast(item, {
      type: "error",
    }),
  )
}

export function formatDateToString(date?: Date) {
  if (!date) return null

  const formattedDate = new Date(date)
  if (isNaN(date.getTime())) return null

  const year = formattedDate.getFullYear()
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0")
  const day = String(formattedDate.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

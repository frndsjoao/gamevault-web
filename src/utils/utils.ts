import { clsx, type ClassValue } from "clsx"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showErrorToast(error: string | string[]) {
  const errors = Array.isArray(error) ? error : [error]
  errors.forEach((item) => {
    if (item) {
      toast(item, {
        type: "error",
      })
    }
  })
}

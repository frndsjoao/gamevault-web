import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Icon, { IconName } from "./Icon"
import { format } from "date-fns"
import { dateToString, stringToDate } from "@/utils/dateHandler"

interface DatePickerProps {
  label?: string
  placeholder?: string
  value?: string | null
  onChange?: (date: string | null) => void
  disabled?: boolean
  className?: string
  icon?: IconName
}

export default function DatePicker({
  label,
  placeholder = "Select a date",
  value,
  onChange,
  disabled = false,
  className = "",
  icon,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(stringToDate(value))

  useEffect(() => {
    setDate(stringToDate(value))
  }, [value])

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onChange?.(dateToString(selectedDate))
  }

  return (
    <div className={`my-1 flex flex-col ${className}`}>
      {label && (
        <label className="mb-1 text-sm font-normal text-text-light">
          {label}
        </label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <button
            disabled={disabled}
            className="flex items-center justify-between gap-2 rounded-md border border-border bg-btn-dark px-3 py-2 text-left transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-btn-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <Icon
                name={icon as IconName}
                className="mb-1 text-text-light"
                size={16}
              />
              <span
                className={`${!date ? "text-text-medium" : "text-text-light"} text-md`}
              >
                {date ? format(date, "dd/MM/yyyy") : placeholder}
              </span>
            </div>
            <Icon name="chevron-down" className="text-text-light" size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto border-border bg-bg-dark p-0 shadow-lg"
          align="start"
        >
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => date > new Date()}
            className="rounded-md bg-bg-dark p-3 text-text-light"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

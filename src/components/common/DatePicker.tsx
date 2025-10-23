import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Icon, { IconName } from "./Icon"
import { format } from "date-fns"

interface DatePickerProps {
  label?: string
  placeholder?: string
  value?: Date
  onChange?: (date: Date | undefined) => void
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
  const [date, setDate] = useState<Date | undefined>(value)

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onChange?.(selectedDate)
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
                {date ? format(date, "PPP") : placeholder}
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
            selected={date}
            onSelect={handleSelect}
            className="rounded-md bg-bg-dark text-text-light"
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              month_caption:
                "flex justify-center pt-1 relative items-center text-text-light",
              caption_label: "text-sm font-medium text-text-light",
              nav: "space-x-1 flex items-center",
              button_previous:
                "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-gray-700 rounded-md",
              button_next:
                "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-gray-700 rounded-md",
              table: "w-full border-collapse space-y-1",
              weekdays: "flex",
              weekday:
                "text-text-medium rounded-md w-9 font-normal text-[0.8rem]",
              week: "flex w-full mt-2",
              day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day_button:
                "h-9 w-9 p-0 font-normal text-text-light hover:bg-gray-700 hover:text-text-light rounded-md transition-colors aria-selected:opacity-100 aria-selected:bg-btn-light aria-selected:text-text-dark aria-selected:hover:bg-btn-medium aria-selected:hover:text-text-dark",
              range_end: "day-range-end",
              selected:
                "bg-btn-light text-text-dark hover:bg-btn-medium hover:text-text-dark focus:bg-btn-light focus:text-text-dark",
              today: "bg-btn-dark text-text-light border border-border",
              outside:
                "day-outside text-text-medium opacity-50 aria-selected:bg-accent/50 aria-selected:text-text-medium aria-selected:opacity-30",
              disabled: "text-text-medium opacity-50",
              range_middle:
                "aria-selected:bg-accent aria-selected:text-accent-foreground",
              hidden: "invisible",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

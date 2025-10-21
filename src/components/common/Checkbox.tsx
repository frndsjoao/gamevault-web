import { InputHTMLAttributes } from "react";
import Icon, { IconName } from "./Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: IconName
}

export default function Checkbox(props: InputProps) {
  return (
    <div className={`my-2 flex flex-row items-center gap-3 ${props.className}`}>
      <input
        {...props}
        type="checkbox"
        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-border bg-btn-dark transition-all duration-200 checked:bg-white checked:after:flex checked:after:h-full checked:after:items-center checked:after:justify-center checked:after:text-black checked:after:content-['✓']"
      />
      <div className="flex flex-row items-start gap-2">
        {props.icon && (<Icon name={props.icon} size={16} className="text-text-light" />)}
        <label className={`${props.checked ? "font-bold" : "font-light"} text-sm text-text-light`}>
          {props.label}
        </label>
      </div>
    </div>
  )
}

import { InputHTMLAttributes } from "react";
import Icon, { IconName } from "./Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconName;
  isLoading?: boolean;
  isInvalid?: boolean;
}

export default function Input(props: InputProps) {
  return (
    <div className="my-1 flex flex-col">
      <label className="mb-1 text-sm font-normal text-text-light">
        {props.label}
      </label>

      <div className="flex items-center gap-2 rounded-md border border-border bg-btn-dark px-3 py-2 focus-within:ring-2 focus-within:ring-btn-light">
        {props.icon && (<Icon name={props.icon} className="text-text-light" />)}

        <input
          {...props}
          className="placeholder:text-text_placeholder text-md text-text_input w-full bg-transparent focus:outline-none"
        />
      </div>
    </div>
  )
}

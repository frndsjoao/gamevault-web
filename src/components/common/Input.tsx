import { InputHTMLAttributes } from "react";
import { IconName, icons } from "./Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: IconName;
  isLoading?: boolean;
  isInvalid?: boolean;
}

export default function Input(props: InputProps) {
  const IconComponent = props.icon ? icons[props.icon] : null;

  return (
    <div className="my-1 flex flex-col">
      <label className="mb-1 text-sm font-normal text-text_primary">
        {props.label}
      </label>

      <div className="flex items-center gap-2 rounded-md border border-border_DEFAULT bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-primary-600">
        {IconComponent && (
          <IconComponent size={20} className="shrink-0 text-text_input" />
        )}

        <input
          {...props}
          className="placeholder:text-text_placeholder text-md w-full bg-transparent text-text_input focus:outline-none"
        />
      </div>
    </div>
  )
}

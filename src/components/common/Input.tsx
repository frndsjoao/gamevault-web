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

      <div className="flex items-center gap-2 rounded-md border border-border bg-btn_secondary px-3 py-2 focus-within:ring-2 focus-within:ring-btn_primary">
        {IconComponent && (
          <IconComponent size={20} className="text-text_input shrink-0" />
        )}

        <input
          {...props}
          className="placeholder:text-text_placeholder text-md text-text_input w-full bg-transparent focus:outline-none"
        />
      </div>
    </div>
  )
}

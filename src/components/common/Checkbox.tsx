import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox(props: InputProps) {

  return (
    <div className="my-1 flex flex-row items-center gap-2">
      <input
        {...props}
        type="checkbox"
        className="bg-transparent hover:cursor-pointer"
      />
      <label className="text-sm font-light text-text_primary">
        {props.label}
      </label>
    </div>
  )
}

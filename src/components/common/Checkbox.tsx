import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox(props: InputProps) {
  return (
    <div className="my-2 flex flex-row items-center gap-2">
      <input
        {...props}
        type="checkbox"
        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-border bg-btn-dark transition-all duration-200 checked:bg-white checked:after:flex checked:after:h-full checked:after:items-center checked:after:justify-center checked:after:text-black checked:after:content-['✓']"
      />
      <label className="text-sm font-light text-text-light">
        {props.label}
      </label>
    </div>
  )
}

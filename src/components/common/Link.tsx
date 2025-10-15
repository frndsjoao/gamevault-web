import { ButtonHTMLAttributes } from "react";

interface LinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Link(props: LinkProps) {
  return (
    <button {...props}>
      <label className="text-sm font-semibold text-text_primary transition-all hover:cursor-pointer hover:text-primary-500">
        {props.label}
      </label>
    </button>
  )
}

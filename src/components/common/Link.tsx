import { ButtonHTMLAttributes } from "react";

interface LinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Link(props: LinkProps) {
  return (
    <button {...props}>
      <label className="h relative text-sm font-semibold text-text_primary transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 after:content-[''] hover:cursor-pointer hover:tracking-wide hover:after:w-full">
        {props.label}
      </label>
    </button>
  )
}

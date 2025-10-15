import { ButtonHTMLAttributes } from "react";
import { IconName, icons } from "../Icon";
import { baseStyles, ButtonVariants, variants } from "./styles";
import { LuLoaderCircle } from "react-icons/lu";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  isLoading?: boolean;
  label?: string;
  icon?: IconName;
}


export default function Button({ variant = "primary", isLoading, ...rest }: ButtonProps) {
  const IconComponent = rest.icon ? icons[rest.icon] : null;

  return (
    <button
      {...rest}
      disabled={rest.disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${rest.className}`}
    >
      <div className="flex items-center gap-2">
        {IconComponent && !isLoading && (
          <IconComponent size={20} className="shrink-0 text-text_input" />
        )}
        {isLoading && (
          <LuLoaderCircle size={20} className="animate-spin text-white" />
        )}

        {rest.label && (
          <label className="text-md font-semibold text-text_primary hover:cursor-pointer">
            {rest.label}
          </label>
        )}
      </div>
    </button>
  )
}

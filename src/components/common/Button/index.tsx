import { ButtonHTMLAttributes } from "react";
import Icon, { IconName } from "../Icon";
import { baseStyles, ButtonVariants, textVariants, variants } from "./styles";
import { LuLoaderCircle } from "react-icons/lu";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  isLoading?: boolean;
  label?: string;
  icon?: IconName;
}


export default function Button({ variant = "primary", isLoading, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={rest.disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${rest.className}`}
    >
      <div className="flex items-center gap-2">
        {rest.icon && !isLoading && (<Icon name={rest.icon} />)}
        {isLoading && (
          <LuLoaderCircle size={20} className="animate-spin text-white" />
        )}

        {rest.label && (
          <label className={`${textVariants[variant]} text-sm font-semibold hover:cursor-pointer`}>
            {rest.label}
          </label>
        )}
      </div>
    </button>
  )
}

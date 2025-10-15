export type ButtonVariants = 'primary' | 'outline' | 'danger'

export const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-md transition-all
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:bg-gray-500 disabled:cursor-not-allowed
      w-full px-4 py-2 text-base my-2
    `;

export const variants = {
  primary: `bg-btn_primary hover:bg-btn_primary_hover ring-none`,
  outline: `bg-transparent border-2 border-btn_primary hover:bg-btn_secondary focus:ring-primary-500`,
  danger: `bg-accent-error-500 hover:bg-accent-error-600 active:bg-accent-error-700 focus:ring-accent-error-500`,
};

export const textVariants = {
  primary: `text-text_tertiary`,
  outline: `text-text_primary`,
  danger: `text-text_primary`,
};
export type ButtonVariants = 'primary' | 'outline' | 'danger'

export const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-md transition-all
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:bg-gray-500 disabled:cursor-not-allowed
      w-full px-4 py-2 text-base my-2
    `;

export const variants = {
  primary: `bg-btn-light hover:bg-btn-medium ring-none`,
  outline: `bg-transparent border-2 border-btn-light hover:bg-btn-dark focus:ring-primary-500`,
  danger: `bg-accent-error-500 hover:bg-accent-error-600 active:bg-accent-error-700 focus:ring-accent-error-500`,
};

export const textVariants = {
  primary: `text-text-dark`,
  outline: `text-text-light`,
  danger: `text-text-light`,
};
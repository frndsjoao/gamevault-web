export type ButtonVariants = 'primary' | 'outline' | 'danger'

export const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-md transition-all
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:bg-gray-500 disabled:cursor-not-allowed
      w-full px-4 py-3 text-base my-2
    `;

export const variants = {
  primary: `
        bg-primary-600 hover:bg-primary-700 active:bg-primary-700
        ring-none
      `,
  outline: `
        bg-transparent hover:bg-primary-900
        border-2 border-primary-500
         active:bg-primary-100
        focus:ring-primary-500
      `,
  danger: `
        bg-accent-error-500 text-white
        hover:bg-accent-error-600 active:bg-accent-error-700
        focus:ring-accent-error-500
      `,
};
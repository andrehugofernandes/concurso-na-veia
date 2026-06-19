import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default';
}

export function buttonVariants({
  variant = 'primary',
  size = 'md',
}: {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default';
} = {}) {
  const baseStyles = 'font-medium rounded-lg transition-colors inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 dark:border-slate-600 bg-transparent text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 focus:ring-gray-500',
    link: 'underline bg-transparent text-primary hover:bg-transparent focus:ring-transparent',
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
    default: 'px-4 py-2 text-base',
  };

  const v = variantStyles[variant as keyof typeof variantStyles] || variantStyles.default;
  const s = sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.default;

  return `${baseStyles} ${v} ${s}`;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${buttonVariants({ variant, size })} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

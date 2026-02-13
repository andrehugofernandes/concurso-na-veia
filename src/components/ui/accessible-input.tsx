import * as React from 'react';

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  description?: string;
  showPasswordToggle?: boolean;
}

export const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  (
    {
      id,
      label,
      error,
      description,
      className = '',
      showPasswordToggle = false,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;
    const hasError = !!error;
    const hasDescription = !!description;
    const isPasswordField = showPasswordToggle && type === 'password';

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const handleTogglePasswordVisibility = () => {
      setIsPasswordVisible((previous) => !previous);
    };

    const inputType = isPasswordField && isPasswordVisible ? 'text' : type;

    return (
      <div className="space-y-1">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>

        <div className="relative">
          <input
            id={id}
            ref={ref}
            {...(hasError ? { 'aria-invalid': true } : {})}
            aria-describedby={
              [hasError ? errorId : undefined, hasDescription ? descriptionId : undefined]
                .filter(Boolean)
                .join(' ') || undefined
            }
            {...props}
            type={inputType}
            className={`
              w-full rounded border px-3 py-2 text-sm
              bg-white text-gray-900
              dark:bg-slate-900 dark:text-slate-50
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
              ${hasError ? 'border-red-500' : 'border-gray-300'}
              ${isPasswordField ? 'pr-10' : ''}
              ${className}
            `}
          />

          {isPasswordField && (
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
            </button>
          )}
        </div>

        {description && !hasError && (
          <p
            id={descriptionId}
            className="mt-1 text-xs text-gray-500 dark:text-gray-400"
          >
            {description}
          </p>
        )}

        {hasError && (
          <p
            id={errorId}
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;

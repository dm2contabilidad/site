import { type ComponentProps, forwardRef } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, hint, optional, id, className = '', ...props }, ref) {
    const inputId = id || label.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-800"
        >
          {label}
          {optional && (
            <span className="text-neutral-400 font-normal ml-1">(opcional)</span>
          )}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 rounded-md border text-base
            bg-white text-navy-900
            border-[color:var(--color-border-soft)]
            placeholder:text-neutral-400
            focus:border-navy-800 focus:ring-2 focus:ring-gold-500/30
            focus:outline-none
            transition-colors duration-150
            ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : ''}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error-500" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

import { type ComponentProps, forwardRef } from 'react';

interface TextareaProps extends ComponentProps<'textarea'> {
  label: string;
  error?: string;
  optional?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, optional, id, className = '', ...props }, ref) {
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
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={`
            w-full px-4 py-3 rounded-md border text-base
            bg-white text-navy-900
            border-[color:var(--color-border-soft)]
            placeholder:text-neutral-400
            focus:border-navy-800 focus:ring-2 focus:ring-gold-500/30
            focus:outline-none
            transition-colors duration-150
            resize-y min-h-[120px]
            ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : ''}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

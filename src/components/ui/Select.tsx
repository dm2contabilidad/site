import { type ComponentProps, forwardRef } from 'react';

interface SelectProps extends ComponentProps<'select'> {
  label: string;
  error?: string;
  optional?: boolean;
  options: readonly { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ label, error, optional, options, id, className = '', ...props }, ref) {
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
        <select
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 rounded-md border text-base
            bg-white text-navy-900 appearance-none
            border-[color:var(--color-border-soft)]
            focus:border-navy-800 focus:ring-2 focus:ring-gold-500/30
            focus:outline-none
            transition-colors duration-150
            bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2336556A%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]
            bg-no-repeat bg-[right_12px_center]
            pr-10
            ${error ? 'border-error-500' : ''}
            ${className}
          `}
          aria-invalid={!!error}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-error-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

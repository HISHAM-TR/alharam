import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error = false,
  errorText,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-3 py-2 bg-white border rounded-md text-right
          focus:outline-none focus:ring-2 focus:border-primary-300
          ${error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:ring-primary-200'}
          ${className}
        `}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 text-right">{helperText}</p>
      )}
      {error && errorText && (
        <p className="mt-1 text-sm text-red-600 text-right">{errorText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

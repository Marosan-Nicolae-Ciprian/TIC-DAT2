import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './utils';

interface SimpleSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const SimpleSelect = forwardRef<HTMLSelectElement, SimpleSelectProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10',
              'text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
              'disabled:bg-gray-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    );
  }
);

SimpleSelect.displayName = 'SimpleSelect';

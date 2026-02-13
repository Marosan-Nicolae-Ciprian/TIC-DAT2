import { HTMLAttributes, forwardRef } from 'react';
import { cn } from './utils';

interface SimpleBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'pluie' | 'gel' | 'vent' | 'grave' | 'faible' | 'moyen' | 'élevé' | 'default';
}

export const SimpleBadge = forwardRef<HTMLSpanElement, SimpleBadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          {
            'bg-blue-100 text-blue-800': variant === 'pluie',
            'bg-cyan-100 text-cyan-800': variant === 'gel',
            'bg-teal-100 text-teal-800': variant === 'vent',
            'bg-red-100 text-red-800': variant === 'grave',
            'bg-green-100 text-green-800': variant === 'faible',
            'bg-yellow-100 text-yellow-800': variant === 'moyen',
            'bg-orange-100 text-orange-800': variant === 'élevé',
            'bg-gray-100 text-gray-800': variant === 'default',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SimpleBadge.displayName = 'SimpleBadge';

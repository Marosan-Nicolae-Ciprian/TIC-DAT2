import { forwardRef } from 'react';
import { Card as ShadCard, CardHeader as ShadCardHeader, CardContent as ShadCardContent } from './card';
import { cn } from './utils';

interface SimpleCardProps extends React.ComponentProps<'div'> {
  variant?: 'default' | 'outlined' | 'elevated';
}

export const SimpleCard = forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ variant = 'default', className, ...props }, ref) => {
    return (
      <ShadCard
        ref={ref}
        className={cn(
          {
            'shadow-none': variant === 'default',
            'border-2': variant === 'outlined',
            'shadow-md': variant === 'elevated',
          },
          className
        )}
        {...props}
      />
    );
  }
);

SimpleCard.displayName = 'SimpleCard';

export const SimpleCardHeader = ShadCardHeader;
export const SimpleCardContent = ShadCardContent;

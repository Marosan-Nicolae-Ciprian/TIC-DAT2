import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button as ShadButton } from './button';

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const SimpleButton = forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    const shadVariant = variant === 'primary' ? 'default' : variant === 'secondary' ? 'secondary' : 'ghost';
    const shadSize = size === 'md' ? 'default' : size;
    
    return <ShadButton ref={ref} variant={shadVariant} size={shadSize} {...props} />;
  }
);

SimpleButton.displayName = 'SimpleButton';

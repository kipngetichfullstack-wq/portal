'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

// Define valid HTML input types
type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'file'
  | 'checkbox'
  | 'radio'
  | 'range'
  | 'color'
  | 'hidden';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType; // Restrict type to valid HTML input types
  'aria-label'?: string; // Encourage accessibility
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        aria-label={ariaLabel} // Pass aria-label for accessibility
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  'aria-label'?: string; 
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, 'aria-label': ariaLabel, rows = 4, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
          className
        )}
        ref={ref}
        aria-label={ariaLabel} 
        rows={rows} 
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
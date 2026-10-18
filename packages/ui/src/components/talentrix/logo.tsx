import * as React from 'react';
import { cn } from '../../lib/utils';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md', className, ...props }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg tracking-tight',
    md: 'text-xl tracking-tight',
    lg: 'text-2xl tracking-tight',
  };

  return (
    <div
      className={cn('flex items-center font-bold font-sans select-none', sizeClasses[size], className)}
      {...props}
    >
      <span className="text-foreground">Talent</span>
      <span className="text-primary">rix</span>
      <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
    </div>
  );
}

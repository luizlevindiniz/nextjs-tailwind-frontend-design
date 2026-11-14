import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

/**
 * The content column: 1120 px wide at most, with 20 px (mobile) or 80 px
 * (desktop) gutters. `box-content` keeps the gutters outside the 1120 px.
 */
export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'mx-auto box-content max-w-content px-5 lg:px-20',
        className,
      )}
      {...props}
    />
  );
}

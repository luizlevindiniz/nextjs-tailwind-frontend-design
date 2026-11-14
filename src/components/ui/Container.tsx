import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  // box-content keeps the gutters outside max-w-content.
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

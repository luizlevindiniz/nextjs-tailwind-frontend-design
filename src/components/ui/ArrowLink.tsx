import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

import { ArrowRightIcon } from '@/assets/icons';

interface ArrowLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  tone?: 'light' | 'onBlue';
}
export function ArrowLink({
  tone = 'light',
  className,
  children,
  ...props
}: ArrowLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-mobile-body-1 font-bold underline-offset-4 hover:underline lg:text-desktop-body-1',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        tone === 'light'
          ? 'text-text-primary outline-primary-blue'
          : 'text-text-white-primary outline-text-white-primary',
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRightIcon aria-hidden className='size-5 shrink-0' />
    </a>
  );
}

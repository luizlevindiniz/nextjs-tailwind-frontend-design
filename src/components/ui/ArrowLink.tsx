import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

import { linkClasses } from '@/components/ui/linkStyles';

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
      className={linkClasses(
        tone === 'light' ? 'light' : 'dark',
        cn(
          'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-mobile-body-1 font-bold lg:text-desktop-body-1',
          tone === 'light' ? 'text-text-primary' : 'text-text-white-primary',
          className,
        ),
      )}
      {...props}
    >
      {children}
      <ArrowRightIcon aria-hidden className='size-5 shrink-0' />
    </a>
  );
}

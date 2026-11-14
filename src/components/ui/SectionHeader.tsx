import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  id: string;
  overline: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'start' | 'center';
  tone?: 'light' | 'onBlue';
  className?: string;
}
export function SectionHeader({
  id,
  overline,
  title,
  lead,
  align = 'start',
  tone = 'light',
  className,
}: SectionHeaderProps) {
  const onBlue = tone === 'onBlue';

  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <p
        className={cn(
          'text-mobile-overline uppercase lg:text-desktop-overline',
          onBlue ? 'text-text-white-primary' : 'text-primary-blue',
        )}
      >
        {overline}
      </p>
      <h2
        id={id}
        className={cn(
          'mt-4 font-heading text-mobile-h3 lg:text-desktop-h3',
          onBlue ? 'text-text-white-primary' : 'text-text-primary',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            onBlue
              ? 'mt-5 text-mobile-subtitle-2 text-text-white-primary lg:text-desktop-subtitle-2'
              : 'mt-4 text-mobile-subtitle-1 text-text-secondary lg:text-desktop-subtitle-1',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

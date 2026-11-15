import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  id: string;
  overline: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'start' | 'center';
  tone?: 'light' | 'onBlue';
  spacing?: 'even' | 'grouped';
  className?: string;
}
export function SectionHeader({
  id,
  overline,
  title,
  lead,
  align = 'start',
  tone = 'light',
  spacing = 'even',
  className,
}: SectionHeaderProps) {
  const onBlue = tone === 'onBlue';
  const grouped = spacing === 'grouped';

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
          'font-heading text-mobile-h3 lg:text-desktop-h3',
          grouped ? 'mt-2' : 'mt-4',
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
            grouped && 'mt-6 lg:mt-8',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

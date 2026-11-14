import type { ReactNode } from 'react';

import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { buttonClasses } from '@/components/ui/buttonStyles';

const MAIN_ID = 'main';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href={`#${MAIN_ID}`}
        className={buttonClasses(
          'primary',
          // not-sr-only also resets padding, so the button's is restored.
          'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-7 focus:py-3.5',
        )}
      >
        Skip to content
      </a>
      <Header />
      {/* tabIndex lets browsers that don't move focus to a fragment target do so. */}
      <main id={MAIN_ID} tabIndex={-1} className='outline-none'>
        {children}
      </main>
      <Footer />
    </>
  );
}

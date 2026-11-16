'use client';

import { type FocusEvent, useId, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { type DismissReason, useDismiss } from '@/hooks/useDismiss';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { logInLink, mainNav, startLearningLink } from '@/data/navigation';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';

import { CloseIcon, MenuIcon } from '@/assets/icons';

import { navLinkClasses } from './navLinkStyles';

// Tailwind's `lg` breakpoint.
const DESKTOP_QUERY = '(min-width: 64rem)';

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // The panel is hidden from `lg` up; close it there so it doesn't reopen on the way back.
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  if (isDesktop && open) setOpen(false);

  useDismiss(rootRef, {
    enabled: open,
    onDismiss: (reason: DismissReason) => {
      setOpen(false);
      if (reason === 'escape') toggleRef.current?.focus();
    },
  });

  const close = () => setOpen(false);

  // relatedTarget is null for clicks on non-focusable content; pointerdown handles those.
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next && !event.currentTarget.contains(next)) close();
  };

  const Icon = open ? CloseIcon : MenuIcon;

  return (
    <nav ref={rootRef} aria-label='Main' onBlur={onBlur} className={className}>
      <button
        ref={toggleRef}
        type='button'
        aria-label='Menu'
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className='block rounded-sm p-1.5 text-text-primary outline-primary-blue focus-visible:outline-2'
      >
        <Icon aria-hidden className='size-6' />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className='absolute inset-x-0 top-full z-40 mt-px border-b border-line-1 bg-background-light-yellow shadow-floating motion-safe:transition motion-safe:starting:-translate-y-2 motion-safe:starting:opacity-0'
      >
        <Container className='pt-2 pb-6'>
          <ul>
            {mainNav.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={close}
                  className={cn(navLinkClasses, 'block py-2.5')}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className='mt-4 flex flex-col gap-3 border-t border-line-1 pt-6'>
            <ButtonLink
              href={logInLink.href}
              variant='secondary'
              onClick={close}
            >
              {logInLink.label}
            </ButtonLink>
            <ButtonLink href={startLearningLink.href} onClick={close}>
              {startLearningLink.label}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </nav>
  );
}

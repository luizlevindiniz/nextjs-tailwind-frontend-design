'use client';

import { type FocusEvent, useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { logInLink, mainNav, startLearningLink } from '@/data/navigation';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';

import { CloseIcon, MenuIcon } from '@/assets/icons';

import { navLinkClasses } from './navLinkStyles';

export function MobileMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

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

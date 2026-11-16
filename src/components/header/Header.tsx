import Link from 'next/link';

import { cn } from '@/lib/utils';

import { logInLink, mainNav, startLearningLink } from '@/data/navigation';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';

import { LogoIcon } from '@/assets/icons';

import { MobileMenu } from './MobileMenu';
import { navLinkClasses } from './navLinkStyles';

export function Header() {
  return (
    <header className='relative border-b border-line-1 bg-background-light-yellow'>
      <Container className='flex h-17 items-center justify-between lg:h-17.25'>
        <div className='lg:flex-1'>
          <Link
            href='/'
            prefetch={false}
            aria-label='Luma home'
            className='block rounded-sm text-text-primary outline-primary-blue focus-visible:outline-2 focus-visible:outline-offset-4'
          >
            <LogoIcon aria-hidden className='block h-4.25 w-13.5' />
          </Link>
        </div>
        <nav aria-label='Main' className='hidden lg:block'>
          <ul className='flex gap-8'>
            {mainNav.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={navLinkClasses}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:gap-2'>
          <a
            href={logInLink.href}
            className={cn(navLinkClasses, 'rounded-lg px-4 py-2.5')}
          >
            {logInLink.label}
          </a>
          <ButtonLink href={startLearningLink.href} className='px-5 py-2.5'>
            {startLearningLink.label}
          </ButtonLink>
        </div>
        <MobileMenu className='lg:hidden' />
      </Container>
    </header>
  );
}

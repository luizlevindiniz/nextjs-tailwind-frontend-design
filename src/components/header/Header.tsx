import Link from 'next/link';

import { Container } from '@/components/ui/Container';

import { LogoIcon } from '@/assets/icons';

export function Header() {
  return (
    <header className='border-b border-line-1 bg-background-light-yellow'>
      <Container className='flex h-17 items-center lg:h-17.25'>
        <Link
          href='/'
          aria-label='Luma home'
          className='rounded-sm text-text-primary outline-primary-blue focus-visible:outline-2 focus-visible:outline-offset-4'
        >
          <LogoIcon aria-hidden className='block h-4.25 w-13.5' />
        </Link>
      </Container>
    </header>
  );
}

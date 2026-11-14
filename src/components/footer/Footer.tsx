import { Container } from '@/components/ui/Container';

import { LogoIcon } from '@/assets/icons';

export function Footer() {
  return (
    <footer className='bg-background-darkblue pt-15 pb-5 lg:pt-20 lg:pb-10'>
      <Container>
        <LogoIcon
          role='img'
          aria-label='Luma'
          className='block h-4.25 w-13.5 text-text-white-primary'
        />
        <p className='mt-3 text-mobile-body-1 text-text-white-tertiary lg:max-w-60 lg:text-desktop-body-1'>
          Practical learning for curious people.
        </p>
        <p className='mt-12 border-t border-text-secondary pt-6 text-center text-caption text-text-white-secondary lg:mt-16 lg:text-left'>
          © 2026 Luma Learning
        </p>
      </Container>
    </footer>
  );
}

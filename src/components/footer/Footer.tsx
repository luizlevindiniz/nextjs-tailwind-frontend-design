import { footerNav } from '@/data/footer';

import { Container } from '@/components/ui/Container';
import { linkClasses } from '@/components/ui/linkStyles';

import { LogoIcon } from '@/assets/icons';

export function Footer() {
  return (
    <footer className='bg-background-darkblue pt-15 pb-5 lg:pt-20 lg:pb-10'>
      <Container>
        <div className='flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:gap-8'>
          <div className='lg:col-span-2'>
            <LogoIcon
              role='img'
              aria-label='Luma'
              className='block h-4.25 w-13.5 text-text-white-primary'
            />
            <p className='mt-3 text-mobile-body-1 text-text-white-tertiary lg:max-w-60 lg:text-desktop-body-1'>
              Practical learning for curious people.
            </p>
          </div>
          <nav
            aria-label='Footer'
            className='grid grid-cols-2 gap-10 md:grid-cols-3 lg:col-span-3 lg:gap-8'
          >
            {footerNav.map(({ title, links }) => {
              const titleId = `footer-${title.toLowerCase()}`;
              return (
                <div key={title}>
                  <h2
                    id={titleId}
                    className='text-mobile-overline text-text-white-secondary uppercase lg:text-desktop-overline'
                  >
                    {title}
                  </h2>
                  <ul
                    aria-labelledby={titleId}
                    className='mt-4 flex flex-col gap-3'
                  >
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          className={linkClasses(
                            'dark',
                            'block w-fit rounded-sm text-mobile-body-1 text-text-white-tertiary lg:text-desktop-body-1',
                          )}
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>
        <p className='mt-12 border-t border-text-secondary pt-6 text-center text-caption text-text-white-secondary lg:mt-16 lg:text-left'>
          © 2026 Luma Learning
        </p>
      </Container>
    </footer>
  );
}

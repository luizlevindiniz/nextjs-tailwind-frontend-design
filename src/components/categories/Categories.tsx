import { categories } from '@/data/categories';

import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

import { ArrowRightIcon } from '@/assets/icons';

export function Categories() {
  return (
    <section
      id='categories'
      aria-labelledby='categories-title'
      className='bg-background-white py-15 lg:py-25'
    >
      <Container>
        <SectionHeader
          id='categories-title'
          overline='Find your next skill'
          title='Learn something worth knowing.'
          lead='Short, practical courses designed around skills you can put to work immediately.'
          className='max-w-140'
        />
        <ul className='mt-12 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5'>
          {categories.map(({ title, description, href }, i) => (
            <li
              key={title}
              className='group relative flex min-h-50 flex-col justify-between rounded-2xl border border-line-1 bg-background-white p-6 outline-primary-blue hover:border-text-tertiary has-focus-visible:outline-2 has-focus-visible:outline-offset-2 motion-safe:transition-colors lg:min-h-65 lg:p-7'
            >
              <div>
                <p
                  aria-hidden
                  className='mt-0.5 w-fit rounded-md bg-primary-blue-light px-2 py-1 text-mobile-overline text-primary-blue lg:text-desktop-overline'
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className='mt-5 font-heading text-mobile-h5 lg:text-desktop-h5'>
                  {title}
                </h3>
                <p className='mt-3 text-mobile-body-1 text-text-tertiary lg:text-desktop-body-1'>
                  {description}
                </p>
              </div>
              {/* The ::after stretches the link over the whole card. */}
              <a
                href={href}
                className='mt-6 flex h-5 w-fit items-center gap-2 text-mobile-body-1 font-bold underline-offset-4 outline-none group-hover:underline after:absolute after:inset-0 after:rounded-2xl lg:text-desktop-body-1'
              >
                Explore<span className='sr-only'> {title}</span>
                <ArrowRightIcon aria-hidden className='size-5 shrink-0' />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

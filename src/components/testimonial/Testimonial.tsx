import Image from 'next/image';

import { stats } from '@/data/stats';

import { Container } from '@/components/ui/Container';

import { QuoteIcon } from '@/assets/icons';
import alexMorgan from '@/assets/images/avatars/alex-morgan.jpg';

export function Testimonial() {
  return (
    <section
      id='testimonial'
      aria-labelledby='testimonial-title'
      className='py-15 lg:py-25'
    >
      <Container className='flex flex-col gap-15 lg:flex-row lg:items-center lg:justify-between'>
        <h2 id='testimonial-title' className='sr-only'>
          What learners say
        </h2>
        <figure className='max-w-150 lg:flex-1'>
          <QuoteIcon aria-hidden className='h-5.5 w-6 text-primary-blue' />
          <blockquote className='mt-4'>
            <p className='font-heading text-mobile-quote lg:text-desktop-quote'>
              The lessons are short enough to fit into my week, but detailed
              enough that I actually leave with something I can use.
            </p>
          </blockquote>
          <figcaption className='mt-8 flex items-center gap-4'>
            <Image
              src={alexMorgan}
              alt=''
              width={48}
              height={48}
              className='size-12 rounded-full bg-primary-blue-light object-cover'
            />
            <div>
              <p className='text-mobile-subtitle-1 font-bold lg:text-desktop-subtitle-2'>
                Alex Morgan
              </p>
              <p className='text-mobile-body-1 text-text-secondary lg:text-desktop-body-1'>
                Product Manager
              </p>
            </div>
          </figcaption>
        </figure>

        <ul className='flex flex-wrap gap-y-6 lg:w-100.25 lg:flex-col lg:gap-5 lg:border-l lg:border-line-1 lg:pl-12'>
          {stats.map(({ value, label }) => (
            <li key={label} className='min-w-min flex-1 pr-4 lg:pr-0'>
              <p className='font-heading text-mobile-h1 text-primary-blue lg:text-desktop-h1'>
                {value}
              </p>
              <p className='mt-1 text-mobile-body-1 text-text-tertiary lg:text-desktop-body-1'>
                {label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import Image from 'next/image';

import { cn } from '@/lib/utils';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';

import { StarIcon } from '@/assets/icons';
import learner1 from '@/assets/images/avatars/learner-1.jpg';
import learner2 from '@/assets/images/avatars/learner-2.jpg';
import learner3 from '@/assets/images/avatars/learner-3.jpg';
import heroLearner from '@/assets/images/hero-learner.jpg';

const avatars = [learner1, learner2, learner3];
const badge =
  'absolute flex items-center rounded-xl bg-background-white px-4 py-3 text-mobile-body-1 whitespace-nowrap shadow-floating lg:text-desktop-body-1';

export function Hero() {
  return (
    <section
      id='hero'
      aria-labelledby='hero-title'
      className='bg-background-light-yellow py-15 lg:py-25'
    >
      <Container className='flex flex-col-reverse gap-10 lg:flex-row lg:items-start lg:gap-15'>
        <div className='lg:min-w-md lg:flex-1'>
          <p className='text-mobile-overline text-primary-blue uppercase lg:text-desktop-overline'>
            Learn at your own pace
          </p>
          <h1
            id='hero-title'
            className='mt-4 font-heading text-mobile-h1 lg:text-desktop-h1'
          >
            Build skills that actually move you forward.
          </h1>
          <p className='mt-6 max-w-120 text-mobile-subtitle-1 text-text-secondary lg:text-desktop-subtitle-1'>
            Practical courses taught by people who do the work every day. Learn
            design, technology, business and more — one focused lesson at a
            time.
          </p>
          <div className='mt-8 flex max-w-90.5 flex-col gap-3 lg:max-w-none lg:flex-row'>
            <ButtonLink href='#categories'>Explore courses</ButtonLink>
            <ButtonLink href='#how-it-works' variant='secondary'>
              See how it works
            </ButtonLink>
          </div>
          <div className='mt-8 flex max-w-90.5 items-center justify-center gap-3 lg:max-w-none lg:justify-start'>
            <div className='flex -space-x-2'>
              {avatars.map((avatar) => (
                <Image
                  key={avatar.src}
                  src={avatar}
                  alt=''
                  width={32}
                  height={32}
                  className='size-8 rounded-full border-2 border-background-light-yellow bg-primary-blue-light object-cover'
                />
              ))}
            </div>
            <p className='text-mobile-body-1 lg:text-desktop-body-1'>
              <strong className='font-bold'>Trusted by 24,000+</strong>{' '}
              <span className='text-text-secondary'>learners</span>
            </p>
          </div>
        </div>

        <div className='relative h-95 w-full max-w-90.5 lg:aspect-25/26 lg:h-auto lg:w-125 lg:max-w-none'>
          <div className='absolute top-6 -right-2.5 bottom-3.5 left-25 rounded-2xl bg-background-orange lg:-right-9.75 lg:bottom-7 lg:left-auto lg:w-22.25' />
          <div className='absolute bottom-3 -left-2.5 size-16 rounded-full bg-primary-blue-light lg:bottom-2.75 lg:-left-11.25 lg:size-26.5' />
          <div className='absolute inset-x-2 inset-y-0 overflow-hidden rounded-2xl bg-primary-blue-light lg:inset-x-0 lg:rounded-3xl'>
            <Image
              src={heroLearner}
              alt='Person focused on learning at their laptop'
              fill
              loading='eager'
              fetchPriority='high'
              sizes='(min-width: 1024px) min(500px, calc(100vw - 668px)), min(346px, calc(100vw - 56px))'
              className='object-cover'
            />
          </div>
          <p
            className={cn(badge, 'top-1.5 left-0 gap-3 lg:top-4 lg:-left-5.5')}
          >
            <span className='flex h-8 items-center rounded-lg bg-primary-blue-light px-1 font-bold text-primary-blue'>
              120+
            </span>{' '}
            expert-led courses
          </p>
          <p
            className={cn(badge, '-right-2.75 bottom-9 gap-2 lg:-right-14.25')}
          >
            <span className='flex gap-0.5 text-secondary-yellow'>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} aria-hidden className='size-3.5' />
              ))}
            </span>
            4.9 avg rating
          </p>
        </div>
      </Container>
    </section>
  );
}

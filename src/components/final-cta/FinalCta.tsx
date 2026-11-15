import Image from 'next/image';

import { cn } from '@/lib/utils';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';

import {
  DecoChatIcon,
  DecoCubeIcon,
  DecoDropIcon,
  DecoLetterBIcon,
  DecoPanelsIcon,
} from '@/assets/icons';
import learner1 from '@/assets/images/avatars/learner-1.jpg';
import learner2 from '@/assets/images/avatars/learner-2.jpg';
import learner3 from '@/assets/images/avatars/learner-3.jpg';
import learner4 from '@/assets/images/avatars/learner-4.jpg';

const avatars = [learner1, learner2, learner3, learner4];

const ring = 'absolute rounded-full border-2 border-current';
const tile = 'absolute rotate-12 rounded-lg';
const shapes = [
  cn(ring, 'top-4 left-5.5 size-27'),
  cn(ring, 'top-10.75 left-219.25 size-8'),
  cn(ring, 'top-107.25 left-302 size-8'),
  'absolute top-93.25 left-14 size-30 rounded-full bg-current',
  'absolute top-117 left-266 size-10 rounded-full bg-current',
  cn(tile, '-top-3.25 left-288.75 size-28.75 bg-current'),
  cn(tile, 'top-58.75 -left-7 size-14 bg-current'),
  cn(tile, 'top-12 left-80.5 size-14 border border-current'),
];

export function FinalCta() {
  return (
    <section
      id='get-started'
      aria-labelledby='get-started-title'
      className='relative overflow-hidden bg-background-yellow py-15 lg:py-25'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-y-0 left-1/2 hidden w-320 -translate-x-1/2 text-background-orange xl:block'
      >
        {shapes.map((shape) => (
          <div key={shape} className={shape} />
        ))}
        <DecoLetterBIcon className='absolute top-92.25 left-70.25 size-20.75 rotate-15' />
        <DecoChatIcon className='absolute top-53.5 left-35.25 size-8' />
        <DecoDropIcon className='absolute top-20.5 left-254 size-15.25' />
        <DecoCubeIcon className='absolute top-45 left-270 size-40' />
        <DecoPanelsIcon className='absolute top-95.25 left-240.75 size-12' />
      </div>

      <Container className='relative'>
        <div className='mx-auto flex max-w-164 flex-col items-center text-center'>
          <div className='flex -space-x-2'>
            {avatars.map((avatar) => (
              <Image
                key={avatar.src}
                src={avatar}
                alt=''
                width={40}
                height={40}
                className='size-10 rounded-full border-2 border-secondary-yellow bg-primary-blue-light object-cover'
              />
            ))}
          </div>
          <h2
            id='get-started-title'
            className='mt-8 font-heading text-mobile-h2 lg:text-desktop-h2'
          >
            What will you learn next?
          </h2>
          <p className='mt-4 text-mobile-subtitle-1 text-text-secondary lg:text-desktop-subtitle-1'>
            Start with one course. Build from there.
          </p>
          <div className='mt-10 flex w-full flex-col gap-3 md:w-auto md:flex-row'>
            <ButtonLink href='#categories'>Explore all courses</ButtonLink>
            <ButtonLink href='#' variant='secondary'>
              Join Luma
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

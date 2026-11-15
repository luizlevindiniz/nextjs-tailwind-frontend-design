import Image, { type StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

import graduate from '@/assets/images/people/graduate.jpg';
import groupStudy from '@/assets/images/people/group-study.jpg';
import homeDesk from '@/assets/images/people/home-desk.jpg';
import musicLesson from '@/assets/images/people/music-lesson.jpg';
import onlineClass from '@/assets/images/people/online-class.jpg';
import studentCampus from '@/assets/images/people/student-campus.jpg';
import studentCoffee from '@/assets/images/people/student-coffee.jpg';
import studentLibrary from '@/assets/images/people/student-library.jpg';
import studentReading from '@/assets/images/people/student-reading.jpg';
import videoCall from '@/assets/images/people/video-call.jpg';

const widths = {
  narrow: {
    className: 'w-18 xl:w-25.75',
    sizes: '(min-width: 1280px) 103px, 72px',
  },
  medium: {
    className: 'w-22 xl:w-32',
    sizes: '(min-width: 1280px) 128px, 88px',
  },
  wide: {
    className: 'w-23.5 xl:w-34.5',
    sizes: '(min-width: 1280px) 138px, 94px',
  },
};

interface Photo {
  src: StaticImageData;
  width: keyof typeof widths;
  height: string;
}

const columns: readonly { className: string; photos: readonly Photo[] }[] = [
  {
    className: 'items-end pt-12 xl:pt-16',
    photos: [
      { src: onlineClass, width: 'narrow', height: 'h-24 xl:h-38.5' },
      { src: groupStudy, width: 'wide', height: 'h-32.25 xl:h-51.75' },
    ],
  },
  {
    className: 'xl:pt-6.5',
    photos: [
      { src: studentLibrary, width: 'narrow', height: 'h-26.5 xl:h-42.5' },
      { src: musicLesson, width: 'narrow', height: 'h-27 xl:h-43.25' },
      { src: studentReading, width: 'narrow', height: 'h-20 xl:h-32' },
    ],
  },
  {
    className: '',
    photos: [
      { src: graduate, width: 'narrow', height: 'h-21.5 xl:h-34.25' },
      { src: homeDesk, width: 'narrow', height: 'h-21.5 xl:h-34.5' },
      { src: videoCall, width: 'narrow', height: 'h-24 xl:h-38.5' },
    ],
  },
  {
    className: '',
    photos: [
      { src: studentCampus, width: 'medium', height: 'h-32 xl:h-51.25' },
      { src: studentCoffee, width: 'narrow', height: 'h-20.75 xl:h-33' },
    ],
  },
];

export function People() {
  return (
    <section
      id='people'
      aria-labelledby='people-title'
      className='bg-background-light-yellow py-15 lg:py-25'
    >
      <Container className='flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-15'>
        <div className='max-w-140 lg:flex-1'>
          <SectionHeader
            id='people-title'
            overline='The people'
            title='Meet international students & teachers'
            lead='Learn next to people from all over the world, taught by practitioners who do this work every day. Share your projects, ask questions in the open and get feedback from a community building the same skills as you.'
            spacing='grouped'
          />
          <ButtonLink href='#' variant='secondary' className='mt-6 lg:mt-8'>
            Explore teachers and students
          </ButtonLink>
        </div>

        <div
          aria-hidden
          className='relative mx-auto flex w-full max-w-90.5 items-center justify-between lg:flex-1 xl:max-w-none xl:justify-start xl:gap-4'
        >
          <div className='absolute top-1/2 left-1/2 aspect-square w-82.5 max-w-full -translate-1/2 rounded-full bg-primary-blue-light xl:w-125' />
          {columns.map(({ className, photos }, i) => (
            <div
              key={i}
              className={cn(
                'relative flex flex-col gap-2 xl:gap-3.25',
                className,
              )}
            >
              {photos.map(({ src, width, height }) => (
                <Image
                  key={src.src}
                  src={src}
                  alt=''
                  sizes={`auto, ${widths[width].sizes}`}
                  className={cn(
                    'rounded-sm object-cover shadow-dark-m',
                    widths[width].className,
                    height,
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

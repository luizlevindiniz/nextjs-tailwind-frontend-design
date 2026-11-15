import Image from 'next/image';

import { ArrowLink } from '@/components/ui/ArrowLink';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

import featuredCourse from '@/assets/images/featured-course.jpg';

const details = ['8 lessons', '2h 40min', 'Intermediate'];

export function FeaturedCourse() {
  return (
    <section
      id='featured-course'
      aria-labelledby='featured-course-title'
      className='bg-primary-blue py-15 lg:py-25'
    >
      <Container className='grid gap-10 md:grid-cols-2 md:items-center lg:gap-15'>
        <div className='relative'>
          <div className='relative aspect-13/10 overflow-hidden rounded-2xl bg-primary-blue-light'>
            <Image
              src={featuredCourse}
              alt='Student working on interface designs at a desk'
              fill
              sizes='auto, (min-width: 1024px) min(530px, calc(50vw - 110px)), (min-width: 768px) calc(50vw - 40px), calc(100vw - 40px)'
              className='object-cover'
            />
          </div>
          <p className='absolute -top-3 -left-3 rounded-md bg-secondary-yellow px-3 py-1.5 text-mobile-overline text-text-primary uppercase lg:text-desktop-overline'>
            Featured course
          </p>
        </div>

        <div>
          <SectionHeader
            id='featured-course-title'
            overline='Most popular this month'
            title='Designing products people understand.'
            lead='Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.'
            tone='onBlue'
          />
          <p className='mt-6 text-mobile-subtitle-2 text-text-white-primary lg:text-desktop-subtitle-2'>
            with Maya Chen · Senior Product Designer
          </p>
          <ul className='mt-6 flex flex-wrap gap-3'>
            {details.map((detail) => (
              <li
                key={detail}
                className='rounded-lg border border-line-1 px-3.5 py-1.5 text-mobile-body-1 text-text-white-primary lg:text-desktop-body-1'
              >
                {detail}
              </li>
            ))}
          </ul>
          <div className='mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap'>
            <ButtonLink href='#' variant='onBlue'>
              View course
            </ButtonLink>
            <ArrowLink href='#categories' tone='onBlue'>
              Browse all courses
            </ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

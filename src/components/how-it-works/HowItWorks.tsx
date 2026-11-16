import { type StepIconName, steps } from '@/data/steps';

import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface StepIconProps {
  icon: StepIconName;
}

function StepIcon({ icon }: StepIconProps) {
  switch (icon) {
    case 'focus':
      return (
        <div
          aria-hidden
          className='relative size-14 rounded-full bg-primary-blue-light'
        >
          <div className='absolute top-2 left-2 size-6 rounded-md bg-primary-blue' />
        </div>
      );
    case 'experience':
      return (
        <div aria-hidden className='relative size-14'>
          <div className='absolute inset-0 rotate-12 rounded-lg bg-background-orange' />
          <div className='absolute top-6 left-6 size-7 rounded-full bg-primary-orange' />
        </div>
      );
    case 'practice':
      return (
        <div
          aria-hidden
          className='relative size-14 rounded-xl bg-background-yellow'
        >
          <div className='absolute top-7 left-2 size-5 rounded-full bg-accent-yellow-dark' />
        </div>
      );
  }
}

export function HowItWorks() {
  return (
    <section
      id='how-it-works'
      aria-labelledby='how-it-works-title'
      className='bg-background-light-yellow py-15 lg:py-25'
    >
      <Container>
        <SectionHeader
          id='how-it-works-title'
          overline='How Luma works'
          title='Less browsing. More learning.'
          align='center'
        />
        <ol className='mt-10 md:mx-auto md:max-w-xl lg:mt-20 lg:grid lg:max-w-none lg:grid-cols-3 lg:gap-20 lg:py-7'>
          {steps.map(({ title, description, icon }, i) => (
            <li
              key={title}
              className='relative not-last:pb-19 not-last:after:absolute not-last:after:bottom-0 not-last:after:left-7 not-last:after:h-12.5 not-last:after:w-px not-last:after:bg-line-1 lg:not-last:pb-0 lg:not-last:after:top-7 lg:not-last:after:-right-27 lg:not-last:after:bottom-auto lg:not-last:after:left-14 lg:not-last:after:h-px lg:not-last:after:w-auto'
            >
              <StepIcon icon={icon} />
              <p className='mt-6 text-mobile-overline text-text-secondary uppercase lg:text-desktop-overline'>
                Step {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className='mt-2 font-heading text-mobile-h5 lg:text-desktop-h5'>
                {title}
              </h3>
              <p className='mt-3 text-mobile-subtitle-2 text-text-secondary lg:text-desktop-subtitle-2'>
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

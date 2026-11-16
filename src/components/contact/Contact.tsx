import type { ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { linkClasses } from '@/components/ui/linkStyles';
import { SectionHeader } from '@/components/ui/SectionHeader';

import { ClockIcon, MessageIcon } from '@/assets/icons';

import { ContactForm } from './ContactForm';

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  valueClassName?: string;
  children: ReactNode;
}

function InfoCard({ icon, label, valueClassName, children }: InfoCardProps) {
  return (
    <li className='flex items-center gap-4 rounded-xl bg-background-light-yellow p-4 lg:p-5'>
      <span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-blue-light text-primary-blue'>
        {icon}
      </span>
      <div className='flex flex-col gap-0.5 text-mobile-body-1 lg:gap-1 lg:text-desktop-body-1'>
        <p className='text-text-primary'>{label}</p>
        <p className={valueClassName}>{children}</p>
      </div>
    </li>
  );
}

export function Contact() {
  return (
    <section
      id='contact'
      aria-labelledby='contact-title'
      className='py-15 lg:py-25'
    >
      <Container className='flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex flex-col gap-8 lg:max-w-120 lg:flex-1 lg:gap-10'>
          <SectionHeader
            id='contact-title'
            overline='Contact'
            title='Get in touch'
            lead='Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.'
            leadSize='compact'
          />
          <ul className='flex flex-col gap-4 md:grid md:grid-cols-2 lg:flex'>
            <InfoCard
              icon={<MessageIcon aria-hidden='true' className='size-6' />}
              label='Email'
            >
              <a
                href='mailto:contact@luma.com'
                className={linkClasses('light', 'text-primary-blue')}
              >
                contact@luma.com
              </a>
            </InfoCard>
            <InfoCard
              icon={<ClockIcon aria-hidden='true' className='size-5' />}
              label='Response Time'
              valueClassName='text-text-secondary'
            >
              Up to 24 hours on business days
            </InfoCard>
          </ul>
        </div>

        <div className='rounded-2xl bg-background-white px-5 py-6 shadow-card inset-ring inset-ring-line-1 lg:max-w-135 lg:flex-1 lg:p-10 forced-colors:border'>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

import { render, screen } from '@testing-library/react';

import { SectionHeader } from '@/components/ui/SectionHeader';

describe('SectionHeader', () => {
  it('renders the title as a level-2 heading that names its section', () => {
    render(
      <section aria-labelledby='contact-title'>
        <SectionHeader
          id='contact-title'
          overline='Contact'
          title='Get in touch'
        />
      </section>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Get in touch' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: 'Get in touch' }),
    ).toBeInTheDocument();
  });

  it('sets the title in the H3 type style at both sizes', () => {
    render(<SectionHeader id='t' overline='Contact' title='Get in touch' />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveClass(
      'text-mobile-h3',
      'lg:text-desktop-h3',
      'text-text-primary',
    );
  });

  it('renders the overline and the lead', () => {
    render(
      <SectionHeader
        id='t'
        overline='Contact'
        title='Get in touch'
        lead='Have a question?'
      />,
    );

    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Have a question?')).toBeInTheDocument();
  });

  it('leaves the lead out when there is none', () => {
    const { container } = render(
      <SectionHeader id='t' overline='How Luma works' title='Less browsing.' />,
    );

    expect(container.querySelectorAll('p')).toHaveLength(1);
  });

  it('centers its text when asked', () => {
    render(
      <SectionHeader
        id='t'
        overline='How Luma works'
        title='Less browsing.'
        align='center'
      />,
    );

    expect(screen.getByRole('heading', { level: 2 }).parentElement).toHaveClass(
      'text-center',
    );
  });

  it('groups the overline with the title and sets the lead apart when asked', () => {
    render(
      <SectionHeader
        id='t'
        overline='The people'
        title='Meet the community'
        lead='Learn together.'
        spacing='grouped'
      />,
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('mt-2');
    expect(screen.getByText('Learn together.')).toHaveClass('mt-6', 'lg:mt-8');
  });

  it('sets a compact lead in body 1 on mobile when asked', () => {
    render(
      <SectionHeader
        id='t'
        overline='Contact'
        title='Get in touch'
        lead='Have a question?'
        leadSize='compact'
      />,
    );

    expect(screen.getByText('Have a question?')).toHaveClass(
      'text-mobile-body-1',
      'lg:text-desktop-subtitle-1',
    );
  });

  it('switches every line to white on blue', () => {
    render(
      <SectionHeader
        id='t'
        overline='Most popular this month'
        title='Designing products people understand.'
        lead='Learn how.'
        tone='onBlue'
      />,
    );

    for (const text of [
      'Most popular this month',
      'Designing products people understand.',
      'Learn how.',
    ]) {
      expect(screen.getByText(text)).toHaveClass('text-text-white-primary');
    }
  });
});

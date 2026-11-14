import { render, screen } from '@testing-library/react';

import { ArrowLink } from '@/components/ui/ArrowLink';

describe('ArrowLink', () => {
  it('is named by its text alone, with the arrow hidden from assistive tech', () => {
    render(<ArrowLink href='#'>Browse all courses</ArrowLink>);

    const link = screen.getByRole('link', { name: 'Browse all courses' });
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('uses dark text on light backgrounds by default', () => {
    render(<ArrowLink href='#'>Explore</ArrowLink>);

    expect(screen.getByRole('link', { name: 'Explore' })).toHaveClass(
      'text-text-primary',
    );
  });

  it('uses white text on blue', () => {
    render(
      <ArrowLink href='#' tone='onBlue'>
        Browse all courses
      </ArrowLink>,
    );

    expect(
      screen.getByRole('link', { name: 'Browse all courses' }),
    ).toHaveClass('text-text-white-primary');
  });
});

import { render, screen, within } from '@testing-library/react';

import { FeaturedCourse } from '@/components/featured-course/FeaturedCourse';

describe('FeaturedCourse', () => {
  it('is a section named by its heading', () => {
    render(<FeaturedCourse />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Designing products people understand.',
    });
    const section = screen.getByRole('region', { name: heading.textContent! });
    expect(section).toHaveAttribute('id', 'featured-course');
  });

  it('describes the course photo', () => {
    render(<FeaturedCourse />);

    expect(
      screen.getByRole('img', {
        name: 'Student working on interface designs at a desk',
      }),
    ).toBeInTheDocument();
  });

  it('lists the course details', () => {
    render(<FeaturedCourse />);

    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual([
      '8 lessons',
      '2h 40min',
      'Intermediate',
    ]);
  });

  it('links to the course and to the course categories', () => {
    render(<FeaturedCourse />);

    expect(screen.getByRole('link', { name: 'View course' })).toHaveAttribute(
      'href',
      '#',
    );
    expect(
      screen.getByRole('link', { name: 'Browse all courses' }),
    ).toHaveAttribute('href', '#categories');
  });
});

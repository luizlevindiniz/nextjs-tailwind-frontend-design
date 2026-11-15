import { render, screen, within } from '@testing-library/react';

import { Footer } from '@/components/footer/Footer';

describe('Footer', () => {
  it('groups its links under a footer navigation, one titled list per column', () => {
    render(<Footer />);

    const nav = screen.getByRole('navigation', { name: 'Footer' });
    const titles = within(nav)
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual(['Explore', 'Company', 'Support']);

    expect(
      within(nav)
        .getAllByRole('list')
        .map((list) => within(list).getAllByRole('link').length),
    ).toEqual([4, 3, 4]);
    expect(
      within(screen.getByRole('list', { name: 'Company' })).getAllByRole(
        'link',
      )[0],
    ).toHaveTextContent('About');
  });

  it('points links to the matching section, or to # when there is none', () => {
    render(<Footer />);

    const hrefs = Object.fromEntries(
      screen
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')]),
    );
    expect(hrefs).toEqual({
      Courses: '#categories',
      Categories: '#categories',
      Instructors: '#people',
      'For Teams': '#',
      About: '#',
      Careers: '#',
      Journal: '#',
      'Help Center': '#',
      Contact: '#contact',
      Terms: '#',
      Privacy: '#',
    });
  });
});

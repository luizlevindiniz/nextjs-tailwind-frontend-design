import { render, screen } from '@testing-library/react';

import { People } from '@/components/people/People';

describe('People', () => {
  it('is the section the header "Community" link targets, named by its heading', () => {
    render(<People />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Meet international students & teachers',
    });
    const section = screen.getByRole('region', { name: heading.textContent! });
    expect(section).toHaveAttribute('id', 'people');
    expect(section).toContainElement(heading);
  });

  it('replaces the placeholder copy and links to the community', () => {
    render(<People />);

    expect(
      screen.getByText(/^Learn next to people from all over the world/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Explore teachers and students' }),
    ).toHaveAttribute('href', '#');
  });

  it('hides the photo collage from assistive tech', () => {
    const { container } = render(<People />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    const photos = container.querySelectorAll('img');
    expect(photos).toHaveLength(10);
    photos.forEach((photo) => {
      expect(photo).toHaveAttribute('alt', '');
      expect(photo.closest('[aria-hidden="true"]')).not.toBeNull();
    });
  });

  it('sizes each photo from its frame width, not its laid-out box', () => {
    const { container } = render(<People />);

    container.querySelectorAll('img').forEach((photo) => {
      expect(photo.getAttribute('sizes')).toMatch(
        /^\(min-width: 1280px\) \d+px, \d+px$/,
      );
    });
  });
});

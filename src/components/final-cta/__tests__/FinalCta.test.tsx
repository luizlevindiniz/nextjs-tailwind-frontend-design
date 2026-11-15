import { render, screen } from '@testing-library/react';

import { FinalCta } from '@/components/final-cta/FinalCta';

describe('FinalCta', () => {
  it('is a section named by its heading', () => {
    render(<FinalCta />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'What will you learn next?',
    });
    expect(
      screen.getByRole('region', { name: heading.textContent! }),
    ).toContainElement(heading);
  });

  it('links "Explore all courses" to the categories', () => {
    render(<FinalCta />);

    expect(
      screen.getByRole('link', { name: 'Explore all courses' }),
    ).toHaveAttribute('href', '#categories');
    expect(screen.getByRole('link', { name: 'Join Luma' })).toHaveAttribute(
      'href',
      '#',
    );
  });

  it('hides the learner avatars and the decorative shapes', () => {
    const { container } = render(<FinalCta />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    const avatars = container.querySelectorAll('img');
    expect(avatars).toHaveLength(4);
    avatars.forEach((avatar) => expect(avatar).toHaveAttribute('alt', ''));
    const icons = container.querySelectorAll('svg');
    expect(icons).toHaveLength(5);
    icons.forEach((icon) =>
      expect(icon.closest('[aria-hidden="true"]')).not.toBeNull(),
    );
  });
});

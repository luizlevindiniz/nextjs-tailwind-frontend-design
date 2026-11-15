import { render, screen } from '@testing-library/react';

import { Hero } from '@/components/hero/Hero';

describe('Hero', () => {
  it('is a section named by the page heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Build skills that actually move you forward.',
    });
    expect(
      screen.getByRole('region', { name: heading.textContent! }),
    ).toContainElement(heading);
  });

  it('links its calls to action to the matching sections', () => {
    render(<Hero />);

    expect(
      screen.getByRole('link', { name: 'Explore courses' }),
    ).toHaveAttribute('href', '#categories');
    expect(
      screen.getByRole('link', { name: 'See how it works' }),
    ).toHaveAttribute('href', '#how-it-works');
  });

  it('loads the described photo early, as the largest paint', () => {
    render(<Hero />);

    const photo = screen.getByRole('img', {
      name: 'Person focused on learning at their laptop',
    });
    expect(photo).toHaveAttribute('loading', 'eager');
    expect(photo).toHaveAttribute('fetchpriority', 'high');
    expect(photo).toHaveAttribute('sizes');
  });

  it('hides the learner avatars and rating stars from assistive tech', () => {
    render(<Hero />);

    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('states the social proof as text', () => {
    render(<Hero />);

    const paragraph = (text: string) =>
      screen.getByText(
        (_, el) => el?.tagName === 'P' && el.textContent === text,
      );
    expect(paragraph('120+ expert-led courses')).toBeInTheDocument();
    expect(paragraph('4.9 avg rating')).toBeInTheDocument();
    expect(paragraph('Trusted by 24,000+ learners')).toBeInTheDocument();
  });
});

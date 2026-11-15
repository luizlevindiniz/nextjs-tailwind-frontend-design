import { render, screen, within } from '@testing-library/react';

import { stats } from '@/data/stats';

import { Testimonial } from '@/components/testimonial/Testimonial';

describe('Testimonial', () => {
  it('is a section named by a heading only assistive tech sees', () => {
    render(<Testimonial />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'What learners say',
    });
    expect(heading).toHaveClass('sr-only');
    expect(
      screen.getByRole('region', { name: 'What learners say' }),
    ).toContainElement(heading);
  });

  it('quotes the learner and credits them in the caption', () => {
    render(<Testimonial />);

    const figure = screen.getByRole('figure');
    const quote = within(figure).getByText(
      /^The lessons are short enough to fit into my week/,
    );
    expect(quote.closest('blockquote')).toBeInTheDocument();
    const caption = figure.querySelector('figcaption');
    expect(caption).toHaveTextContent('Alex Morgan');
    expect(caption).toHaveTextContent('Product Manager');
  });

  it('hides the quote mark and the avatar, which the caption already names', () => {
    render(<Testimonial />);

    const figure = screen.getByRole('figure');
    expect(within(figure).queryByRole('img')).not.toBeInTheDocument();
    // An unlabelled <svg> has no img role, so the query above can't see it.
    expect(figure.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('lists every stat with its value and label', () => {
    render(<Testimonial />);

    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(stats.length);
    stats.forEach(({ value, label }, i) => {
      expect(items[i]).toHaveTextContent(`${value}${label}`);
    });
  });
});

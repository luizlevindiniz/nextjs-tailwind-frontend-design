import { render, screen, within } from '@testing-library/react';

import { steps } from '@/data/steps';

import { HowItWorks } from '@/components/how-it-works/HowItWorks';

describe('HowItWorks', () => {
  it('is the section the hero "See how it works" link targets, named by its heading', () => {
    render(<HowItWorks />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Less browsing. More learning.',
    });
    const section = screen.getByRole('region', { name: heading.textContent! });
    expect(section).toHaveAttribute('id', 'how-it-works');
    expect(section).toContainElement(heading);
  });

  it('lists the steps in order, numbered 01 to 03, with title and description', () => {
    render(<HowItWorks />);

    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(steps.length);
    steps.forEach(({ title, description }, i) => {
      expect(within(items[i]).getByText(`Step 0${i + 1}`)).toBeInTheDocument();
      expect(
        within(items[i]).getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
      expect(within(items[i]).getByText(description)).toBeInTheDocument();
    });
  });

  it('hides the decorative step icons from assistive tech', () => {
    render(<HowItWorks />);

    screen.getAllByRole('listitem').forEach((item) => {
      expect(item.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

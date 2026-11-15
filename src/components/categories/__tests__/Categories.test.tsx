import { render, screen, within } from '@testing-library/react';

import { categories } from '@/data/categories';

import { Categories } from '@/components/categories/Categories';

describe('Categories', () => {
  it('is the section the header "Courses" link targets, named by its heading', () => {
    render(<Categories />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Learn something worth knowing.',
    });
    const section = screen.getByRole('region', { name: heading.textContent! });
    expect(section).toHaveAttribute('id', 'categories');
    expect(section).toContainElement(heading);
  });

  it('lists every category with its title and description', () => {
    render(<Categories />);

    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(categories.length);
    categories.forEach(({ title, description }, i) => {
      expect(
        within(items[i]).getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
      expect(within(items[i]).getByText(description)).toBeInTheDocument();
    });
  });

  it('gives each card one link named after its category', () => {
    render(<Categories />);

    const items = screen.getAllByRole('listitem');
    categories.forEach(({ title, href }, i) => {
      const links = within(items[i]).getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAccessibleName(`Explore ${title}`);
      expect(links[0]).toHaveAttribute('href', href);
    });
  });

  it('hides the decorative card numbers from assistive tech', () => {
    render(<Categories />);

    screen.getAllByRole('listitem').forEach((item, i) => {
      const number = within(item).getByText(String(i + 1).padStart(2, '0'));
      expect(number.closest('[aria-hidden="true"]')).not.toBeNull();
    });
  });
});

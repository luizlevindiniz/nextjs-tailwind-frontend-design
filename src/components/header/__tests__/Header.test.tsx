import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Header } from '@/components/header/Header';

const renderHeader = () => {
  const user = userEvent.setup();
  render(
    <>
      <Header />
      <p>Page content</p>
      <a href='#after'>After the header</a>
    </>,
  );
  const toggle = screen.getByRole('button', { name: 'Menu' });
  const panel = () =>
    document.getElementById(toggle.getAttribute('aria-controls')!)!;
  return { user, toggle, panel };
};

describe('Header', () => {
  it('links the main navigation to page sections or placeholders', () => {
    renderHeader();

    const nav = screen.getByRole('navigation', { name: 'Main' });
    const href = (name: string) =>
      within(nav).getByRole('link', { name }).getAttribute('href');
    expect(href('Courses')).toBe('#categories');
    expect(href('For Teams')).toBe('#');
    expect(href('Community')).toBe('#people');
    expect(href('About')).toBe('#');
    expect(screen.getByRole('link', { name: 'Log in' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Start learning' }),
    ).toBeInTheDocument();
  });

  describe('mobile menu', () => {
    it('starts closed', () => {
      const { toggle, panel } = renderHeader();

      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      expect(panel()).not.toBeVisible();
    });

    it('opens with the nav links and account actions, and closes again', async () => {
      const { user, toggle, panel } = renderHeader();

      await user.click(toggle);

      expect(toggle).toHaveAttribute('aria-expanded', 'true');
      expect(panel()).toBeVisible();
      const menu = within(panel());
      for (const name of [
        'Courses',
        'For Teams',
        'Community',
        'About',
        'Log in',
        'Start learning',
      ]) {
        expect(menu.getByRole('link', { name })).toBeInTheDocument();
      }

      await user.click(toggle);

      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      expect(panel()).not.toBeVisible();
    });

    it('closes on Escape and returns focus to the toggle', async () => {
      const { user, toggle, panel } = renderHeader();
      await user.click(toggle);
      await user.tab();
      expect(
        within(panel()).getByRole('link', { name: 'Courses' }),
      ).toHaveFocus();

      await user.keyboard('{Escape}');

      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      expect(toggle).toHaveFocus();
    });

    it('closes when a link is followed', async () => {
      const { user, toggle, panel } = renderHeader();
      await user.click(toggle);

      await user.click(
        within(panel()).getByRole('link', { name: 'Community' }),
      );

      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes on a click outside', async () => {
      const { user, toggle } = renderHeader();
      await user.click(toggle);

      await user.click(screen.getByText('Page content'));

      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes when focus leaves the menu', async () => {
      const { user, toggle, panel } = renderHeader();
      await user.click(toggle);
      const links = within(panel()).getAllByRole('link');
      links.at(-1)!.focus();

      await user.tab();

      expect(
        screen.getByRole('link', { name: 'After the header' }),
      ).toHaveFocus();
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });
  });
});

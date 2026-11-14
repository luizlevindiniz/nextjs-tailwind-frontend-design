import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SiteShell } from '@/components/layout/SiteShell';

const renderShell = () =>
  render(
    <SiteShell>
      <h1>Page</h1>
    </SiteShell>,
  );

describe('SiteShell', () => {
  it('wraps the page in banner, main and contentinfo landmarks', () => {
    renderShell();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toContainElement(
      screen.getByRole('heading', { level: 1 }),
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('makes the skip link the first Tab stop and points it at main', async () => {
    renderShell();

    await userEvent.tab();

    const skip = screen.getByRole('link', { name: 'Skip to content' });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute('href', `#${screen.getByRole('main').id}`);
  });

  it('links the header logo to the home page', () => {
    renderShell();

    expect(screen.getByRole('link', { name: 'Luma home' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('shows the brand, tagline and copyright in the footer', () => {
    renderShell();

    const footer = screen.getByRole('contentinfo');
    expect(footer).toContainElement(screen.getByRole('img', { name: 'Luma' }));
    expect(footer).toHaveTextContent('Practical learning for curious people.');
    expect(footer).toHaveTextContent('© 2026 Luma Learning');
  });
});

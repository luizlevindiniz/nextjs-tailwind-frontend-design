import { render, screen } from '@testing-library/react';

import { SiteShell } from '@/components/layout/SiteShell';

import HomePage from '@/app/page';

const renderPage = () =>
  render(
    <SiteShell>
      <HomePage />
    </SiteShell>,
  );

describe('HomePage', () => {
  it('renders one level-1 heading', () => {
    renderPage();

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('points every in-page link at an element that exists', () => {
    const { container } = renderPage();

    const targets = [...container.querySelectorAll('a[href^="#"]')]
      .map((link) => link.getAttribute('href')!)
      .filter((href) => href !== '#');

    expect(targets.length).toBeGreaterThan(0);
    const missing = targets.filter(
      (href) => !container.querySelector(`[id="${href.slice(1)}"]`),
    );
    expect(missing).toEqual([]);
  });

  it('never skips a heading level', () => {
    renderPage();

    const levels = screen
      .getAllByRole('heading')
      .map((heading) => Number(heading.tagName.slice(1)));
    const skips = levels.filter(
      (level, index) => index > 0 && level > levels[index - 1] + 1,
    );
    expect(skips).toEqual([]);
  });
});

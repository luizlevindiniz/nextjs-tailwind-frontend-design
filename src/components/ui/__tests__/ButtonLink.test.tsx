import { render, screen } from '@testing-library/react';

import { ButtonLink } from '@/components/ui/ButtonLink';

describe('ButtonLink', () => {
  it('renders a link to its target', () => {
    render(<ButtonLink href='#how-it-works'>See how it works</ButtonLink>);

    expect(
      screen.getByRole('link', { name: 'See how it works' }),
    ).toHaveAttribute('href', '#how-it-works');
  });

  it.each([
    ['primary', ['bg-primary-blue', 'text-text-white-primary']],
    ['secondary', ['bg-background-white', 'inset-ring-line-1']],
    ['onBlue', ['bg-secondary-yellow', 'text-text-primary']],
  ] as const)('applies the %s variant', (variant, classes) => {
    render(
      <ButtonLink href='#' variant={variant}>
        Go
      </ButtonLink>,
    );

    expect(screen.getByRole('link', { name: 'Go' })).toHaveClass(...classes);
  });

  it('lets a section stretch it to full width', () => {
    render(
      <ButtonLink href='#' className='w-full'>
        Go
      </ButtonLink>,
    );

    expect(screen.getByRole('link', { name: 'Go' })).toHaveClass('w-full');
  });
});

import { render } from '@testing-library/react';

import { ArrowRightIcon } from '@/assets/icons';

describe('icons', () => {
  it('render as SVG elements that accept SVG props', () => {
    const { container } = render(<ArrowRightIcon aria-hidden />);

    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('reject props an SVG does not take', () => {
    // @ts-expect-error checked by `pnpm typecheck`, not Jest
    const icon = <ArrowRightIcon titel='Next' />;

    expect(icon).toBeTruthy();
  });
});

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
    // `pnpm typecheck` fails if the icons lose their types and this line compiles.
    // @ts-expect-error `titel` is not an SVG prop
    const icon = <ArrowRightIcon titel='Next' />;

    expect(icon).toBeTruthy();
  });
});

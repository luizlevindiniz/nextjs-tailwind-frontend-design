import { ArrowRightIcon } from '@/assets/icons';

describe('icons', () => {
  it('reject props an SVG does not take', () => {
    // @ts-expect-error checked by `pnpm typecheck`, not Jest
    const icon = <ArrowRightIcon titel='Next' />;

    expect(icon).toBeTruthy();
  });
});

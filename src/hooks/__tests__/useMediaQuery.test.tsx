import { renderHook } from '@testing-library/react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { mockMatchMedia } from '@/__mocks__/matchMedia';

describe('useMediaQuery', () => {
  it('returns whether the query matches now', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery('(min-width: 64rem)'));

    expect(result.current).toBe(true);
  });

  it('updates when the query starts or stops matching', () => {
    const media = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 64rem)'));

    media.setMatches(true);
    expect(result.current).toBe(true);

    media.setMatches(false);
    expect(result.current).toBe(false);
  });

  it('stops listening on unmount', () => {
    const media = mockMatchMedia(false);
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 64rem)'));
    expect(media.listenerCount()).toBe(1);

    unmount();

    expect(media.listenerCount()).toBe(0);
  });
});

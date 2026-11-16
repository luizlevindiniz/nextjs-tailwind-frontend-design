import { act } from '@testing-library/react';

type Listener = (event: { matches: boolean }) => void;

// jsdom has no matchMedia. Every query reports the same `matches`, which
// `setMatches` flips while notifying the subscribed listeners.
export function mockMatchMedia(initial = false) {
  let matches = initial;
  const listeners = new Set<Listener>();

  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    get matches() {
      return matches;
    },
    media: query,
    addEventListener: (_: string, listener: Listener) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: Listener) =>
      listeners.delete(listener),
  }));

  return {
    setMatches: (next: boolean) =>
      act(() => {
        matches = next;
        listeners.forEach((listener) => listener({ matches }));
      }),
    listenerCount: () => listeners.size,
  };
}

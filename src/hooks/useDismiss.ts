import { type RefObject, useEffect, useEffectEvent } from 'react';

export type DismissReason = 'escape' | 'outside';

interface DismissOptions {
  enabled: boolean;
  onDismiss: (reason: DismissReason) => void;
}

export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  { enabled, onDismiss }: DismissOptions,
) {
  const dismiss = useEffectEvent(onDismiss);

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss('escape');
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) dismiss('outside');
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [enabled, ref]);
}

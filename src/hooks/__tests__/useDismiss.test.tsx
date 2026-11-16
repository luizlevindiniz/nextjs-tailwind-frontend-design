import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';

import { type DismissReason, useDismiss } from '@/hooks/useDismiss';

function Popup({
  enabled,
  onDismiss,
}: {
  enabled: boolean;
  onDismiss: (reason: DismissReason) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, { enabled, onDismiss });
  return (
    <>
      <div ref={ref}>Inside</div>
      <p>Outside</p>
    </>
  );
}

describe('useDismiss', () => {
  it('dismisses on Escape', async () => {
    const onDismiss = jest.fn();
    render(<Popup enabled onDismiss={onDismiss} />);

    await userEvent.keyboard('{Escape}');

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledWith('escape');
  });

  it('dismisses on a pointer down outside, not inside', async () => {
    const onDismiss = jest.fn();
    render(<Popup enabled onDismiss={onDismiss} />);

    await userEvent.click(screen.getByText('Inside'));
    expect(onDismiss).not.toHaveBeenCalled();

    await userEvent.click(screen.getByText('Outside'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledWith('outside');
  });

  it('ignores other keys', async () => {
    const onDismiss = jest.fn();
    render(<Popup enabled onDismiss={onDismiss} />);

    await userEvent.keyboard('{Enter}a');

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('does nothing while disabled', async () => {
    const onDismiss = jest.fn();
    render(<Popup enabled={false} onDismiss={onDismiss} />);

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByText('Outside'));

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('calls the latest handler without resubscribing', async () => {
    const first = jest.fn();
    const latest = jest.fn();
    const add = jest.spyOn(document, 'addEventListener');
    const { rerender } = render(<Popup enabled onDismiss={first} />);
    const subscriptions = add.mock.calls.length;

    rerender(<Popup enabled onDismiss={latest} />);
    expect(add.mock.calls.length).toBe(subscriptions);
    add.mockRestore();

    await userEvent.keyboard('{Escape}');

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledWith('escape');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorPage from '@/app/error';

describe('ErrorPage', () => {
  let logError: jest.SpyInstance;

  beforeEach(() => {
    logError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('retries the segment when the user asks to try again', async () => {
    const retry = jest.fn();
    render(<ErrorPage error={new Error('boom')} retry={retry} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it('accepts a thrown value that is not an Error', () => {
    render(<ErrorPage error='plain string' retry={jest.fn()} />);

    expect(logError).toHaveBeenCalledWith('plain string');
  });
});

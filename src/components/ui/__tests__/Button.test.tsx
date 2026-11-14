import { render, screen } from '@testing-library/react';

import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders a button that does not submit forms by default', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('keeps an explicit submit type', () => {
    render(<Button type='submit'>Send message</Button>);

    expect(
      screen.getByRole('button', { name: 'Send message' }),
    ).toHaveAttribute('type', 'submit');
  });

  it('uses the primary variant by default', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(
      'bg-primary-blue',
      'text-text-white-primary',
    );
  });

  it('passes native attributes through', () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });
});

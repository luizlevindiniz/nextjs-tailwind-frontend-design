import { render, screen } from '@testing-library/react';

import { Container } from '@/components/ui/Container';

describe('Container', () => {
  it('renders its children in the centered content column', () => {
    render(
      <Container>
        <p>Inside</p>
      </Container>,
    );

    const column = screen.getByText('Inside').parentElement;
    expect(column).toHaveClass('mx-auto', 'max-w-content');
  });

  it('lets a section override its classes', () => {
    render(<Container className='py-25'>Inside</Container>);

    expect(screen.getByText('Inside')).toHaveClass('py-25', 'max-w-content');
  });
});
